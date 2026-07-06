---
title: "Week 5 Worklog"
date: 2026-05-15
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

This week's worklog covers infrastructure automation with AWS CDK, serverless workflows with API Gateway and Lambda, and data security using AWS KMS. We also integrated ChatOps via Slack, configured AWS Directory Service, and developed new features for our team project including Dark Mode and Security History.

### Week 5 Objectives:
- Use Infrastructure as Code (IaC) via AWS CDK and AWS CloudFormation to automate deployments.
- Deploy and manage containerized applications using Amazon ECS and AWS Fargate.
- Implement serverless workflows using Amazon API Gateway, AWS Lambda, and Amazon EventBridge.
- Enforce Data Security using AWS KMS and audit API activities via AWS CloudTrail and Amazon Athena.
- Integrate ChatOps automation by connecting AWS Lambda with Slack.
- Configure AWS Directory Service and validate internal network connectivity via RDP.
- **Team Project:** Develop and integrate new application features including Dark Mode, Security History, and Anonymous Comments.

### Tasks to be carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Day 1  | - IaC & Serverless API <br>&emsp; + Deploy CloudFormation via CDK. <br>&emsp; + Upload images to S3 via API Gateway. | 05/11/2026 | 05/11/2026 | [AWS CDK & API Docs](https://cloudjourney.awsstudygroup.com/) |
| Day 2  | - IAM & Cost Management <br>&emsp; + Configure IAM Users with `BillingViewAccess`. | 05/12/2026 | 05/12/2026 | [AWS IAM & Billing Docs](https://cloudjourney.awsstudygroup.com/) |
| Day 3  | - Security Hub & Backups <br>&emsp; + Deploy `FCJ-S3-LAB`. Automate snapshots via DLM. <br>&emsp; + Evaluate CSPM using Security Hub. | 05/13/2026 | 05/13/2026 | [AWS Security Hub Docs](https://cloudjourney.awsstudygroup.com/) |
| Day 4  | - Session 1: Security & Auditing <br>&emsp; + Host static web on S3. <br>&emsp; + Restrict S3 access using Custom KMS Keys and verify (Access Denied). <br>&emsp; + Audit activities using AWS CloudTrail. | 05/14/2026 | 05/14/2026 | [AWS KMS & CloudTrail](https://cloudjourney.awsstudygroup.com/) |
| Day 4  | - Session 2: Automation & ChatOps <br>&emsp; + Create EventBridge scheduled rules. <br>&emsp; + Trigger Lambda functions to manage EC2 and send alerts to Slack. | 05/14/2026 | 05/14/2026 | [AWS EventBridge & Lambda](https://cloudjourney.awsstudygroup.com/) |
| Day 4  | - Session 3: Directory Service <br>&emsp; + Provision VPC, AD-Manager, and Bastion Host. <br>&emsp; + Configure AWS Directory Service and verify connectivity via RDP (Ping). | 05/14/2026 | 05/14/2026 | [AWS Directory Service](https://cloudjourney.awsstudygroup.com/) |
| Day 5  | - **Team Project:** Feature Development <br>&emsp; + Implement Dark Mode UI toggle. <br>&emsp; + Develop Security History dashboard to track login sessions. <br>&emsp; + Build Anonymous Commenting functionality. | 05/15/2026 | 05/15/2026 | Project Repo |

### Week 5 Achievements:
- Successfully deployed complex infrastructure using AWS CDK.
- Validated serverless file uploads via API Gateway to S3.
- Automated operational tasks and integrated ChatOps (Slack) using Lambda and EventBridge.
- Mastered data encryption mechanisms (KMS) and enforced strict IAM boundaries.
- Configured and validated Active Directory components securely using Bastion Hosts.
- Successfully implemented core application features including Dark Mode, active login session tracking (Security History), and anonymous user interactions.

### Task Evidence:

#### 1. AWS CloudFormation, S3 & API Gateway (May 11)
Successfully deployed nested stacks via CDK, verified S3 buckets, and invoked API Gateway to upload files directly to S3.
![CloudFormation Stacks](/images/1-Worklog/Week5/CloudFormationStacks.png)
![API S3 Upload](/images/1-Worklog/Week5/APIS3Upload.png)

#### 2. IAM Configuration & Cost Monitoring (May 12)
Created IAM Users with `BillingViewAccess` to securely view Cost and Usage metrics.
![AWS Cost Dashboard](/images/1-Worklog/Week5/AWS_Cost_Dashboard.png)

#### 3. Automated Backups & Security Hub (May 13)
Configured DLM policies for EBS snapshots and evaluated the environment against CIS Benchmarks via Security Hub.
![Data Lifecycle Manager](/images/1-Worklog/Week5/EBS_Lifecycle_Manager.png)
![Security Hub Dashboard](/images/1-Worklog/Week5/Security_Hub_Dashboard.png)

#### 4. Data Security & Auditing (May 14 - Session 1)
Implemented Custom KMS keys. Successfully verified encryption policies by intentionally triggering an "Access Denied" error, while auditing the trails via CloudTrail.
![S3 KMS Access Denied](/images/1-Worklog/Week5/S3_KMS_Access_Denied.png)
![CloudTrail Config](/images/1-Worklog/Week5/CloudTrail_KMS_Config.png)

#### 5. Automation & ChatOps via Slack (May 14 - Session 2)
Configured EventBridge scheduled rules to trigger Lambda functions, successfully interacting with EC2 and sending operational notifications to a Slack channel.
![EventBridge Rules](/images/1-Worklog/Week5/EventBridge_Scheduled_Rules.png)
![Slack Notification](/images/1-Worklog/Week5/Slack_Lambda_Notification.png)

#### 6. Directory Service & Network Connectivity (May 14 - Session 3)
Provisioned AWS Directory Service and validated internal network routing by successfully executing ping commands from the AD-Manager to the Bastion host via RDP.
![AWS Directory Service](/images/1-Worklog/Week5/AWS_Directory_Service.png)
![RDP Ping Connectivity](/images/1-Worklog/Week5/RDP_Ping_Connectivity.png)

#### 7. Team Project: Application Feature Development (May 15)
Successfully developed and deployed the Security History dashboard, allowing users to monitor active login sessions, IP addresses, and manage their device access.
![Security History](/images/1-Worklog/Week5/Project_Security_History.png)

Integrated a system-wide Dark Mode UI and implemented the Anonymous Commenting feature to enhance user experience and privacy.
![Dark Mode & Anonymous Comment](/images/1-Worklog/Week5/Project_DarkMode_Anonymous.png)