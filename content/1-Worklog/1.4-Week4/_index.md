---
title: "Week 4 Worklog"
date: 2026-05-08
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

This week's worklog covers the deployment and management of EC2 fleets via AWS Systems Manager, static website hosting on Amazon S3, and enforcing security with IAM region restrictions. We also established secure VPC Endpoints for SSM and successfully deployed our team project's backend using ECS Fargate and ALB.

### Week 4 Objectives:
- Deploy and manage EC2 fleets using AWS Systems Manager (Fleet Manager, Patch Manager, Run Command).
- Configure Amazon S3 for static website hosting.
- Implement IAM identity-based policies to restrict access by AWS Region.
- Set up AWS PrivateLink (VPC Endpoints) to securely access EC2 instances via SSM Session Manager without public IP addresses.
- **Team Project:** Deploy the application backend to AWS using manual provisioning (ClickOps) with Amazon ECS Fargate and ALB.

### Tasks to be carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Day 1  | - Session 1: Systems Manager & S3 Hosting <br>&emsp; + Provision VPC, subnets, IGW, and EC2 instances (`Window-Lab-SSM-1` & `Window-Lab-SSM-2`). <br>&emsp; + Manage nodes via Fleet Manager, view Patch Manager dashboard, and execute commands via Run Command. <br>&emsp; + Host a static website on S3 (uploaded images and `contact.html`). | 05/05/2026 | 05/05/2026 | [AWS SSM & S3 Docs](https://cloudjourney.awsstudygroup.com/) |
| Day 2  | - Session 2: IAM Region Restriction <br>&emsp; + Create `ec2-admin-restrict-region` policy to limit actions to specific regions. <br>&emsp; + Attach to an IAM user and verify access denial in unauthorized regions. | 05/06/2026 | 05/06/2026 | [AWS IAM Documentation](https://cloudjourney.awsstudygroup.com/) |
| Day 3  | - Session 3: SSM via VPC Endpoints <br>&emsp; + Provision network infrastructure (VPC, Private/Public subnets, Security Groups). <br>&emsp; + Create VPC Endpoints (AWS PrivateLink) for SSM. <br>&emsp; + Connect to EC2 via Session Manager and RDP, logging session data to S3. | 05/08/2026 | 05/08/2026 | [AWS PrivateLink & SSM Docs](https://cloudjourney.awsstudygroup.com/) |
| Day 3  | - **Team Project:** AWS ClickOps Deployment <br>&emsp; + Provision VPC, IGW, Route Tables, and Amazon RDS manually. <br>&emsp; + Pull Docker image from ECR and configure ECS Fargate Task Definition. <br>&emsp; + Expose the backend service using an Application Load Balancer (ALB) and verify via Postman. | 05/08/2026 | 05/08/2026 | [Project Repository](https://github.com/pht1412/Mini-Social-Network.git) |

### Week 4 Achievements:
- Successfully managed a fleet of instances using AWS Systems Manager for patching and command execution.
- Deployed a highly available static website using Amazon S3.
- Enforced strict security boundaries using Region-restricted IAM policies.
- Established secure, private connectivity to EC2 instances using VPC Endpoints and SSM Session Manager, effectively logging session data to S3.
- Successfully launched the team project's backend on AWS Cloud using Fargate, validating external connectivity and database integration via an Application Load Balancer.

### Task Evidence:

#### 1. AWS Systems Manager Fleet & Run Command
Successfully registered EC2 instances into SSM Fleet Manager and executed administrative tasks via Run Command.
![SSM Fleet and Run Command](/images/1-Worklog/Week4/SSM_Fleet_Patch_Run.png)

#### 2. Amazon S3 Static Website Hosting
Configured S3 buckets to host static web content (`contact.html` and images) and verified public access via the S3 website endpoint.
![S3 Static Website](/images/1-Worklog/Week4/S3_Static_Website.png)

#### 3. IAM Region Restriction
Tested the `ec2-admin-restrict-region` policy by logging in as the restricted IAM user. Access to resources outside the allowed region was successfully blocked (Access Denied).
![IAM Region Deny](/images/1-Worklog/Week4/IAM_Region_Restrict_Deny.png)

#### 4. Secure Access via SSM Session Manager & VPC Endpoints
Established a secure terminal session using AWS Systems Manager over VPC Endpoints (AWS PrivateLink) without needing public IPs. The session log (including executed commands like `ipconfig`) was successfully captured and exported to an S3 bucket for auditing purposes.
![SSM Session Log in S3](/images/1-Worklog/Week4/Screenshot%202026-05-08%20195301.png)

#### 5. Team Project: Application Deployment & ALB Routing (May 08)
Successfully deployed the application backend on AWS ECS Fargate using ClickOps. Verified external access and database connectivity by hitting the Application Load Balancer (ALB) endpoint via Postman, which returned an HTTP 200 OK status along with `Connected` database telemetry.
![Postman ALB Health Check](/images/1-Worklog/Week4/Postman_ALB_HealthCheck.png)

#### 6. Team Online Meeting
Conducted an online team meeting to discuss the project progress and assign tasks for the upcoming deployment.
![Team Meeting](/images/1-Worklog/Week4/1505_meeting_w4.jpg)