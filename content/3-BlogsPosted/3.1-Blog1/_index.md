---
title: "Blog 1: Architectural Discussion of the Mini Social Network Project"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 3.1. </b> "
---

> **Context:** The following article was summarized by the team during the project implementation and published publicly in the **AWS Study Group VN** community. The goal is to share the architectural solution of the "Mini Social Network" project while gathering feedback and contributions from senior engineers and experts to optimize the system for the Production phase.

---

# Applying the 3-Tier Architecture Model on AWS

Our team is currently finalizing an internal social network project named "Mini Social Network". Applying the practical knowledge and design thinking acquired from the AWS FCAJ program, we decided to plan and deploy the entire project infrastructure on the AWS Cloud environment following the standard **3-Tier Architecture model** to ensure maximum data isolation and security.

To standardize the documentation in the AWS Whitepaper style, the logical architecture diagram is bounded within an AWS Region to strictly depict the network structure. The system is clearly separated into two main flows:

* **Data Plane (User Access & Data Flow):** Sequentially routed from `[1]` to `[7]`.
* **Control Plane (Operations & System Monitoring):** Marked with letters `[A]` to `[E]`.

Below is a detailed interpretation of the system's operational mechanism:

---

## I. DATA PLANE: USER ACCESS & DATA PROCESSING

### 1. Edge & User Access Layer
* **[1] Load Web App:** The Frontend interface (developed with React + Vite) is bundled and stored entirely as static files on Amazon S3 (Static Website). User browsers load UI resources directly from here, optimizing costs and completely reducing the load on the backend infrastructure.
* **[2] API Requests:** When users interact (posting, commenting, liking), API requests from the client are sent through the Internet Gateway (IGW) to enter the isolated Virtual Private Cloud (VPC).

### 2. Public Subnet & Security Control Layer
* **[3] Filter Malicious Traffic:** Traffic from the Internet Gateway must pass through AWS WAF (Web Application Firewall) for filtering. Here, the system applies Rulesets to block common attacks such as SQL Injection, Cross-Site Scripting (XSS), or spam requests.
* **[4] Route Traffic:** Clean and valid traffic is then forwarded to the Application Load Balancer (ALB) for load distribution.

### 3. Private Subnet & Core Processing Layer
* **[5] Process Backend Logic:** The ALB evenly distributes requests to the Amazon ECS Cluster. This is where Docker containers running the social network's application logic reside. They are completely isolated within the *Private Subnet - Compute* layer to prevent any unauthorized direct access from the Internet.
* **[6] Read / Write Data:** When it is necessary to query or write user information, the ECS cluster communicates with the Amazon RDS database. This DB layer is hidden in the deepest security tier: *Private Subnet - Data*.
* **[7] Upload Media Files:** For heavy resources like images and videos uploaded by users, the ECS cluster routes and pushes them directly to an independent Amazon S3 bucket (Media Storage) for archiving, avoiding capacity and bandwidth burdens on the main database.

---

## II. CONTROL PLANE: OPERATIONS, CI/CD & BACKGROUND MONITORING

This is the infrastructure backbone serving management and automation tasks, running entirely independently of the end-user experience:

* **[A] Outbound Traffic:** To allow container servers in the Private Subnet (which lack public IPs) to safely reach the Internet for necessary tasks, a NAT Gateway is deployed in the Public Subnet. From here, traffic is routed out through the Internet Gateway (IGW). This is a vital one-way traffic flow that allows the internal system to safely communicate externally (e.g., pulling Images from ECR or pushing logs to CloudWatch) without exposing the servers' true identities or real IP addresses.
* **[B] Push Logs & Metrics:** Through the NAT Gateway, the ECS cluster continuously collects and pushes system log data to Amazon CloudWatch.
* **[C] Visualize Dashboard:** Grafana Cloud is configured to connect directly to Amazon CloudWatch as a Data Source, visualizing infrastructure health and CPU/RAM resources via real-time monitoring charts.
* **[D] Build & Push Image:** The CI/CD pipeline starts with a Jenkins Server (responsible for automated testing and building backend source code into new Docker images) and proceeds to push them to the Amazon ECR registry.
* **[E] Pull Image & Deploy:** The ECS cluster uses the Outbound path to automatically pull the latest Image updates from ECR and executes a Rolling Update mechanism, ensuring the system remains uninterrupted (Zero-Downtime).

---

## III. FUTURE OPTIMIZATIONS & DISCUSSION QUESTIONS

Although the AWS Region boundary on the diagram is strictly framed for global planning, the Subnet structure inside the VPC is simplified (grouped into a single column) to optimize visual clarity. In the actual deployment via CloudFormation (IaC), the system runs on a **Multi-AZ (Multi-Availability Zone)** architecture—distributing Public/Private Subnets across two different physical Availability Zones to ensure High Reliability, combined with strict Security Group firewall configurations.

To upgrade the system from a PoC (Proof of Concept) to Production-ready standards, our team has outlined an optimization roadmap (Phase 2) and raised several discussion points with the community:

1. **Frontend Performance Upgrade (CloudFront):** Direct access to the S3 Static Website creates a global loading speed bottleneck and lacks SSL/TLS security. The next plan is to use Amazon CloudFront (CDN) as the front face. *Question raised: When integrating `CloudFront + WAF + S3`, what are the practical considerations regarding hidden costs or cache invalidation issues during frequent Frontend code deployments?*
2. **Trade-off - NAT Gateway vs. VPC Endpoints:** The ECS cluster currently uses the NAT Gateway to call AWS services (S3, ECR, CloudWatch). The team intends to switch to VPC Endpoints (Gateway/Interface) to optimize Data Transfer costs and enhance internal security. *Question raised: For small-to-medium-scale projects, at what traffic volume does the actual break-even point occur between the hourly fee of an Interface Endpoint and the Data Transfer fee of a NAT Gateway?*
3. **Migrating CI/CD to Cloud-Native:** The system currently self-hosts a Jenkins Server on EC2. In the long run, to completely cut maintenance burdens and optimize costs (Pay-as-you-go), the team plans to migrate the pipeline to GitHub Actions or AWS CodePipeline. *Question raised: Based on practical experience, what is the most optimal CI/CD solution for an ECS containerized system?*

### IV. RESULTS & LESSONS LEARNED FROM COMMUNITY FEEDBACK

Despite the highly specialized and specific nature of the article, the team was fortunate to receive extremely detailed and practical feedback from a senior engineer in the AWS community. Consequently, we extracted four major lessons to refine our architectural design:

**1. Refining AWS WAF Design Thinking**
* **Issue in the original diagram:** The current diagram depicted WAF as an *inline service* located in the Public Subnet, standing in front of the ALB. This easily causes misunderstandings about its network nature.
* **Practical lesson:** WAF is essentially a *layer inspection* attached directly to an ALB or CloudFront, rather than an independent checkpoint in the network. The team noted this error and will adjust the diagram to show WAF as a component coupled with the ALB.

**2. The "Mandatory" Nature of CloudFront & The Cache Problem**
* **Issue:** Initially, the team considered using CloudFront as an optional upgrade.
* **Practical lesson:** This is a **mandatory** requirement. Because S3 Static Web Hosting does not support custom SSL, if the Frontend calls the Backend API via ALB using HTTP, the browser will instantly block this communication (Mixed-Content error). The standard combo for real-world projects is always `Route53 + CloudFront + S3`.
* **Solving the Cache issue:** To prevent users from loading outdated UIs, instead of dealing with *cache invalidation* fees, the optimal solution is *cache-bursting*: configuring the CI/CD to automatically append a hash string to static file names after every build.

**3. The Answer to NAT Gateway vs. VPC Endpoints**
* **Practical lesson:** Since Amazon ECR and S3 are AWS Native services, the practical advice from the community is to **absolutely prioritize using VPC Endpoints**. This keeps data traffic entirely within the AWS internal network, drastically optimizing Data Transfer costs via the NAT Gateway.

**4. Choosing a Cloud-Native CI/CD Tool**
* **Practical lesson:** There is no absolute "best" tool; it depends on where the source code is hosted:
    * If code is hosted on **GitHub**: Using **GitHub Actions** combined with ECR and ECS Deploy is the smoothest and most popular workflow.
    * If code is hosted on **AWS CodeCommit**: The best solution is the native **AWS CodePipeline** ecosystem combined with CodeBuild.
* **Direction:** The team decided to migrate from Jenkins to a GitHub Actions deployment configuration in Phase 2 to save EC2 costs.

---
![Mini Social Network Architecture Diagram](/images/3-BlogsPosted/Architecture_Diagram_V1.png)

> **References:**
> * Logical Architecture Diagram (Full HD): [View details here](https://mini-social-architect.s3.ap-southeast-1.amazonaws.com/MiniSocial-Architect.png)
> * Original discussion post on AWS Study Group VN: [View original post](https://www.facebook.com/share/p/1TAE4d29vc/)