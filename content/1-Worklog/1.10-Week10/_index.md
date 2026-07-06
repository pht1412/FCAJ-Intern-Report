---
title: "Week 10 Worklog"
date: 2026-06-28
weight: 10
chapter: false
pre: " <b> 1.10. </b> "
---

This week's worklog marks the culmination of our project, focusing on upgrading our cloud infrastructure to an Enterprise-grade Architecture, implementing FinOps strategies, and enforcing Zero-Trust Security. We successfully launched our production application with a custom domain, secured by SSL/TLS certificates, and fully automated our CI/CD pipelines.

### Week 10 Objectives:
- Upgrade the cloud infrastructure to an Enterprise-grade Architecture (Multi-AZ, High Availability).
- Implement FinOps (Cloud Cost Optimization) strategies using Spot Instances and Automated Resource Scheduling.
- Enforce Zero-Trust Security by eliminating hardcoded secrets using AWS SSM Parameter Store and CloudFront OAC.
- Configure a Custom Domain via AWS Route53 and secure traffic with ACM SSL/TLS Certificates.
- Finalize the CI/CD pipeline (Jenkinsfiles) for automated infrastructure updates and application deployments.

### Tasks to be carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Day 1-7 | - Enterprise Infrastructure (IaC) <br>&emsp;+ Deploy four optimized CloudFormation stacks (Network, Database, Backend, Frontend). | 06/22/2026 | 06/28/2026 | [AWS CloudFormation](https://cloudjourney.awsstudygroup.com/) |
| Day 1-7 | - Security & FinOps Implementation <br>&emsp;+ Integrate SSM Parameter Store for database passwords and JWT secrets. <br>&emsp;+ Configure EventBridge Scheduler and ECS Auto Scaling for night-time hibernation. | 06/22/2026 | 06/28/2026 | [AWS SSM & EventBridge](https://cloudjourney.awsstudygroup.com/) |
| Day 1-7 | - Custom Domain & CI/CD <br>&emsp;+ Purchase domain `minisocial-network.id.vn`, configure Route53 and ACM. <br>&emsp;+ Develop Jenkinsfiles for fully automated deployments. | 06/22/2026 | 06/28/2026 | [AWS Route53 & Jenkins](https://cloudjourney.awsstudygroup.com/) |

### Week 10 Achievements:
- Successfully transitioned the project into a production-ready AWS Cloud environment.
- Significantly reduced monthly cloud costs by implementing intelligent scheduling and AWS Fargate Spot.
- Achieved Zero-Trust security by removing hardcoded credentials and storing all sensitive configuration in AWS Systems Manager Parameter Store.
- Fully isolated the frontend S3 bucket from public access using CloudFront Origin Access Control (OAC).
- Successfully launched the production application with a custom domain secured by ACM SSL/TLS certificates.
- Completed the Jenkins CI/CD pipeline for automated infrastructure provisioning and application deployment.

### Task Evidence:

#### 1. Enterprise CloudFormation Stacks
Successfully provisioned the production infrastructure across multiple AWS Regions (ap-southeast-1 and us-east-1). This architecture separates regional resources according to AWS best practices while ensuring high availability and global content delivery.
![CloudFormation Stacks](/images/1-Worklog/Week10/CFN_Enterprise_Stacks.png)

#### 2. FinOps: Cost Optimization Strategy (Golden Snippet)
Implemented a hybrid ECS Capacity Provider strategy combining **AWS Fargate On-Demand** and **AWS Fargate Spot** to significantly reduce infrastructure costs. AWS EventBridge Scheduler automatically hibernates services every night, while ECS Auto Scaling restores them each morning.
```yaml
# ECS Capacity Strategy
CapacityProviderStrategy:
  - CapacityProvider: FARGATE
    Base: 1
    Weight: 1

  - CapacityProvider: FARGATE_SPOT
    Weight: 1

# EventBridge RDS Scheduler
StopRDSSchedule:
  Type: AWS::Scheduler::Schedule
  Properties:
    ScheduleExpression: "cron(0 22 * * ? *)"   # 10:00 PM ICT
    Target:
      Arn: "arn:aws:scheduler:::aws-sdk:rds:stopDBInstance"
```

#### 3. Zero-Trust Security & Secrets Management (Golden Snippet)
Completely removed hardcoded credentials from the application. Sensitive configuration values, including database passwords, JWT secrets, and API keys, are securely stored in **AWS Systems Manager Parameter Store** and injected into ECS containers during runtime.
```yaml
Secrets:
  - Name: SPRING_DATASOURCE_PASSWORD
    ValueFrom: !Sub "arn:aws:ssm:${AWS::Region}:${AWS::AccountId}:parameter/minisocial/backend/db-password"

  - Name: JWT_SECRET
    ValueFrom: !Sub "arn:aws:ssm:${AWS::Region}:${AWS::AccountId}:parameter/minisocial/backend/jwt-secret"
```

#### 4. Secure Frontend Delivery with CloudFront OAC (Golden Snippet)
The frontend S3 bucket is completely private. Static content is delivered exclusively through Amazon CloudFront using **Origin Access Control (OAC)**, preventing direct public access to S3 objects.
```yaml
CloudFrontOriginAccessControl:
  Type: AWS::CloudFront::OriginAccessControl
  Properties:
    OriginAccessControlConfig:
      Name: !Sub "${ProjectName}-frontend-oac"
      OriginAccessControlOriginType: s3
      SigningBehavior: always
      SigningProtocol: sigv4
```

#### 5. Custom Domain & Live Production
Successfully configured the production domain `minisocial-network.id.vn` using AWS networking services. Created DNS records in AWS Route53, validated ACM SSL/TLS certificates, and routed backend traffic through the Application Load Balancer (ALB).
![Route53 Custom Domain](/images/1-Worklog/Week10/Route53_Custom_Domain.png)

#### 6. CI/CD Pipeline Automation (Jenkins)
Finalized and executed the Jenkins CI/CD pipeline. A declarative **Jenkinsfile** automates the complete deployment workflow, including building artifacts, pushing images to Amazon ECR, and updating ECS services.
![Jenkins Auto Deploy](/images/1-Worklog/Week10/Jenkins_Auto_Deploy.png)

#### 7. Team Offline Meeting
Conducted an offline team meeting to review the final project presentation, evaluate the deployment strategy, and celebrate the successful launch of our cloud infrastructure.
![Team Offline Meeting](/images/1-Worklog/Week10/1906_meeting_w10.jpg)