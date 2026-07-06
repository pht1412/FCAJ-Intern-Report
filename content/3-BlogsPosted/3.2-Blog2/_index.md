---
title: "Blog 2: Cloud Deployment Journey – From a $35 Lesson to a Cost-Optimized Architecture"
date: 2024-01-02
weight: 2
chapter: false
pre: " <b> 3.2. </b> "
---

> **Context:** This article chronicles the team's practical journey in optimizing the AWS infrastructure for the "Mini Social Network" project. From classic mistakes regarding network costs and performance bottlenecks, the team broke down tasks by specialized roles to successfully restructure the system. The article was shared and actively discussed in the **AWS Study Group VN** community.

---

# The Journey to Optimize a Cloud-Native Architecture

During the development of the "Mini Social Network" internal system, our team faced a common question: *"Why not just rent a Virtual Private Server (VPS) and deploy the entire source code there for simplicity, instead of configuring complex services on AWS?"*. Initially, the team shared this exact mindset. However, upon officially migrating the entire project architecture to the Cloud, we learned some highly valuable practical lessons.

---

## I. PAST MISTAKES (THE "BEFORE")

In previous small projects or academic assignments, our deployment mindset was quite simple and followed the traditional path: *"Bundle everything into a single server."* We typically rented a single Virtual Private Server (VPS), manually configured MySQL, ran the Spring Boot Backend directly, and configured Nginx to serve the React Frontend build on the same machine.

More critically, sensitive information such as database passwords and JWT encryption keys were stored as plaintext directly in the `.env` configuration file.

At that time, since the system ran stably after pointing the domain to the Public IP, we mistakenly believed the design was complete. In reality, this architecture harbored massive security risks: there was absolutely no security isolation between layers, and if the database layer encountered an issue, the entire application would immediately crash (Single Point of Failure).

---

## II. THE TURNING POINT

When migrating the system to AWS, mechanically applying the textbook "3-Tier Architecture" exposed several major limitations:

* **Suboptimal Infrastructure Costs:** Placing the ECS Fargate compute cluster in a Private Subnet (following security best practices) forced the system to maintain a NAT Gateway so containers could reach the Internet to pull Docker Images. As a result, the NAT Gateway incurred a fixed cost of ~$35/month, consuming over 1/3 of the total project budget despite low testing traffic.
* **SPA Routing Errors:** When deploying the Frontend on S3 Static Website Hosting, if a user refreshed the page at a sub-path (e.g., `/profile`), the browser immediately returned an `HTTP 404 Not Found` error because S3 does not natively understand client-side routing mechanisms.
* **Performance Bottlenecks:** Load testing with K6 (simulating 500 concurrent users) pushed the Fargate container's CPU usage (0.5 vCPU instance) to 100%. The system was completely bottlenecked during the JWT signature decryption phase, while the underlying database layer remained unaffected.

From these challenges, the team realized the system required a clearly separated architecture and deeper specialization for each component.

---

## III. SOLUTIONS & CORE KNOWLEDGE: CLOUD-NATIVE ARCHITECTURE OPTIMIZATION

Instead of patching minor bugs, the team decided to comprehensively restructure the system in alignment with the Cloud-Native model. Here is how each specialized role addressed their specific challenges:

### 1. Infrastructure (Cloud/Ops) – Network Cost & Performance Optimization
* **Challenge:** The excessive cost of maintaining the NAT Gateway and container CPU overload when processing a high volume of cryptographic authentications.
* **Solution:** The team reconfigured the ECS Fargate cluster, moving it to Public Subnets (enabling the `AssignPublicIp: ENABLED` attribute) to entirely eliminate the NAT Gateway, saving $35/month. To uphold *Zero-Trust* security principles, the Fargate cluster was secured with strict Security Groups: only accepting traffic forwarded from the Application Load Balancer (ALB).
* Meanwhile, the Amazon RDS database remained completely isolated in the Private Subnet. For secure database administration, the team provisioned a Free Tier `t2.micro` EC2 instance as a Bastion Host in the Public Subnet. Additionally, Amazon EventBridge was used to schedule automatic shutdowns of the Database and scale ECS containers down to 0 at 23:00, then automatically restart them at 7:00 the next morning, bringing idle costs down to $0.

### 2. Frontend (UI/UX) – Routing Handling & CDN Integration
* **Challenge:** 404 errors on page reloads on S3, lack of HTTPS support in native S3, and geographic delivery speed limitations.
* **Solution:** The team configured the *Error Document* property on S3 to point back to `index.html`, handing full routing control back to the React Router library. To optimize page load speeds and apply SSL/TLS certificates, the Amazon CloudFront Content Delivery Network (CDN) was integrated at the edge layer. The entire Frontend packaging process was then automated using a Jenkins CI/CD server (running on EC2), automatically pulling source code from GitHub upon changes for rapid S3 deployment.

### 3. Observability – Proactive Alert Management
* **Challenge:** The system needed an automated tracking mechanism to avoid manual monitoring, but also had to solve the "Email Storm" issue during cyberattacks.
* **Solution:** After instrumenting the Spring Boot source code with OpenTelemetry (OTLP) to push data to AWS CloudWatch and Grafana, the team set up *Metric Filters* in CloudWatch to scan application logs for the `{$.type = "SECURITY"}` condition. The system only triggers a *CloudWatch Alarm* when vulnerability scanning behaviors (SQL Injection, XSS) exceed the threshold of 1 event/minute. The *Alert Grouping* feature in Grafana was also configured to aggregate individual alerts into a single summary notification before pushing it via Amazon SNS, enabling swift responses without exceeding AWS's 1,000 free email quota.

### 4. Security (DevSecOps) – Secure by Design
* **Challenge:** The OWASP ZAP tool returned numerous False Positives, the source code still contained plaintext credentials, and containers crashed when switched to using environment variables.
* **Solution:** Applying the *Shift-left Security* approach, the team removed all sensitive information from the source code and centrally managed it in AWS Systems Manager (SSM) Parameter Store. The container crash issue was completely resolved by adding the `ssm:GetParameters` permission to the ECS Task's execution IAM Role. At the network edge, AWS WAF firewalls were deployed in parallel across two layers: protecting the static interface on CloudFront and the dynamic API traffic on the ALB. Combined with the SonarCloud static code analysis platform, security vulnerabilities were detected and fixed right from the coding phase.

---

## IV. SUMMARY & NEXT STEPS

The process of migrating the "Mini Social Network" to the cloud has given the team a profound understanding of balancing infrastructure cost optimization, operational automation, and end-user security.

However, this architectural model is still being refined. To ensure the system meets the highest operational security standards, the project is entering the **Code Freeze & Security Audit** phase. The entire infrastructure configuration will undergo a comprehensive review before the team officially finalizes the architecture.

---

## V. SYSTEM ARCHITECTURE DIAGRAMS

The system structure has significantly shifted after applying practical solutions to optimize costs and enhance security:

#### 1. Initial Deployment Architecture
![Initial Deployment Architecture](/images/3-BlogsPosted/Architecture_Diagram_V1.png)

#### 2. Cost-Optimized & Hardened Architecture
![Cost-Optimized Architecture](/images/3-BlogsPosted/MiniSocial-Architect_Cost.png)

---

### VI. RESULTS & LESSONS LEARNED FROM COMMUNITY FEEDBACK

After sharing the post, it sparked lively discussions and multifaceted feedback from system engineers in the AWS Study Group VN community. These practical contributions helped the team identify blind spots in the current infrastructure design and extract 4 major lessons for future optimization phases:

**1. The Trade-off Between Network Security Risks and NAT Gateway Costs**
* **Flaw in the current architecture:** To eliminate the ~$35/month fixed cost of the NAT Gateway, the team moved the ECS Fargate cluster from the Private Subnet to a Public Subnet (enabling `AssignPublicIp`). The community pointed out that this is a massive security risk. If the Security Group is accidentally modified, the entire Backend cluster would be exposed to the Internet. Furthermore, compliance regulations in many specific industries mandate that core resources (Backend, Database) remain isolated in Private Subnets. Traffic between Public and Private Subnets is essentially Local (free of charge); the system is only billed for NAT when ECS connects to the Internet for external tasks.
* **Proposed solutions:** To safely return ECS Fargate to the Private Subnet while keeping costs optimized, the community suggested two approaches:
    * Instead of a NAT Gateway, implement **VPC Endpoints (for S3, ECR, CloudWatch)**. This allows ECS to pull images and push logs entirely via the AWS internal network, which is significantly cheaper than a NAT Gateway.
    * Use a self-hosted **NAT Instance** with a micro-configuration (`t3.nano` / `t4g.nano`), activating it only when outbound Internet access is truly necessary to pull resources.

**2. Optimizing the Firewall (WAF) Model and Early Warning (Observability) Mindset**
* **Firewall structure:** The team's current architecture uses two AWS WAFs in parallel (one for CloudFront and one for ALB), which is redundant and wastes fixed costs (WebACL pricing). The recommended standardized model requires **only 1 WAF attached to CloudFront** at the network edge. The standard traffic flow should be: `User -> CloudFront (WAF) -> VPC Origin -> Private ALB -> ECS`. This CloudFront distribution will also handle serving resources for S3.
* **Monitoring mechanism:** The team currently bases attack alerts on application logs (`$.type = "SECURITY"`). However, if the Spring Boot logs record a security error, it proves the attack has already bypassed the firewall and penetrated the application code. To achieve true early warning, the system must configure **CloudWatch Alarms directly on AWS WAF metrics** at CloudFront to detect and block XSS or SQL Injection scanning behaviors right at the edge.

**3. Overcoming the JWT Performance Bottleneck and Serverless Orientation**
* **Handling the Bottleneck:** Regarding the Fargate container hitting 100% CPU due to JWT signature decryption during the 500-user load test, the optimal solution for scaling up is to offload the entire Authentication process to an independent **Lambda Authorizer**. This relieves the computational burden on the Fargate cluster, allowing it to focus on business logic.
* **Serverless Orientation:** Given the project's early stage with relatively low traffic, instead of maintaining a fixed container infrastructure, transitioning to a pure Serverless architecture—utilizing **AWS Lambda combined with Amazon DynamoDB**—would be the most radical cost optimization strategy (approaching $0 thanks to the Pay-as-you-go model).

**4. Standardizing the Cloud-Native CI/CD Pipeline and OIDC Security**
* **Limitations of Jenkins:** Self-hosting a Jenkins server on EC2 creates an additional burden of OS and configuration maintenance, and poses security risks if the server lacks regular patch updates.
* **Alternatives:** The team should deprecate Jenkins and fully transition to **GitHub Actions** (if hosting code on GitHub) or the native **AWS CodePipeline + AWS CodeBuild** ecosystem (if using AWS CodeCommit). Notably, when using GitHub Actions, the team should implement **OIDC (OpenID Connect)** authentication to establish direct access with AWS without needing to store long-term AWS Credentials on the repository, ensuring a closed and highly secure CI/CD pipeline.

---

> **References & Links:**
> * Original Architecture Diagram (Initial): [View details here](https://mini-social-architect.s3.ap-southeast-1.amazonaws.com/MiniSocial-Architect.png)
> * Refined Architecture Diagram (Optimized): [View details here](https://mini-social-architect.s3.ap-southeast-1.amazonaws.com/MiniSocial-Architect-ToiUuChiPhi.png)
> * Original post on AWS Study Group VN: [Access the post here](https://www.facebook.com/groups/awsstudygroupfcj/permalink/2198727654225528)