---
title: "Week 3 Worklog"
date: 2026-05-08
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

This week's worklog focuses on rapid infrastructure management with AWS CLI, automated disaster recovery using AWS Backup, and advanced observability with Amazon Managed Grafana. We also visited the AWS Office and integrated Jenkins with GitHub for automated CI/CD.

### Week 3 Objectives:
- Master AWS CLI for rapid infrastructure provisioning and teardown.
- Implement automated disaster recovery strategies using AWS Backup, Amazon SNS, and AWS CloudFormation.
- Set up advanced observability and dashboards using Amazon Managed Grafana integrated with Amazon CloudWatch.
- Engage directly with the AWS Support team during an exclusive office visit.
- **Team Project:** Integrate Jenkins with GitHub to establish an automated CI/CD pipeline for backend and frontend builds.

### Tasks to be carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Day 1  | - CLI Infrastructure Operations <br>&emsp; + Provision and clean up VPC, Subnets, IGW, and EC2 using AWS CLI. <br>&emsp; + Monitor EC2 CPUUtilization via CloudWatch. | 05/06/2026 | 05/06/2026 | [AWS CLI Reference](https://cloudjourney.awsstudygroup.com/) |
| Day 1  | - AWS Office Visit <br>&emsp; + Visit the AWS Office to interact and consult with the AWS Support & Engineering team. | 05/06/2026 | 05/06/2026 | Extracurricular |
| Day 2  | - Session 1: Automated Backup Setup <br>&emsp; + Create an SNS topic for notifications. <br>&emsp; + Deploy AWS Backup Vault and Plan using a CloudFormation YAML template. <br>&emsp; + Verify backup execution via S3/EC2 targets and SNS email alerts. | 05/07/2026 | 05/07/2026 | [AWS Backup Docs](https://cloudjourney.awsstudygroup.com/) |
| Day 2  | - Session 2: Grafana Observability <br>&emsp; + Set up network foundation (VPC, IGW, RTB, SG) for the workspace. <br>&emsp; + Configure IAM permissions for Amazon Managed Grafana. <br>&emsp; + Integrate CloudWatch as a data source and visualize metrics on Grafana. | 05/07/2026 | 05/07/2026 | [Amazon Managed Grafana Docs](https://cloudjourney.awsstudygroup.com/) |
| Day 3  | - **Team Project:** CI/CD Pipeline Integration <br>&emsp; + Connect Jenkins with GitHub source code repositories. <br>&emsp; + Configure automated CI/CD pipelines for frontend and backend services. <br>&emsp; + Automate the process of building and pushing Docker images to Amazon ECR. | 05/08/2026 | 05/08/2026 | [Project Repository](https://github.com/pht1412/Mini-Social-Network.git) |

### Week 3 Achievements:
- Successfully used AWS CLI to manage resources and troubleshoot dependency violations during cleanup.
- Automated backup workflows using Infrastructure as Code (CloudFormation).
- Built a cross-service monitoring dashboard using Grafana and CloudWatch.
- Gained valuable industry insights from the AWS Vietnam team.
- Successfully integrated Jenkins with GitHub, establishing an automated CI/CD pipeline to seamlessly build and push container images directly to Amazon ECR.

### Task Evidence:

#### 1. Command Line Operations & Monitoring (May 06)
Successfully tracked `CPUUtilization` metrics using Amazon CloudWatch.
![CloudWatch Metrics](/images/1-Worklog/Week3/Screenshot%202026-05-06%20101300.png)

Practiced provisioning and deleting networking components (VPC, Subnet, IGW, RTB) via AWS CLI, encountering and resolving dependency violation errors during the teardown process.
![CLI Provisioning Error](/images/1-Worklog/Week3/Screenshot%202026-05-06%20152553.png)
![CLI Cleanup](/images/1-Worklog/Week3/Screenshot%202026-05-06%20153330.png)

#### 2. AWS Office Visit (May 06)
Attended an exclusive session at the AWS Office, engaging with the support team to discuss cloud best practices.
![AWS Office Visit](/images/1-Worklog/Week3/Screenshot%202026-06-30%20120726.png)

#### 3. Automated Backup & Notifications (May 07 - Session 1)
Deployed a complete AWS Backup architecture via CloudFormation and successfully received automated backup status notifications via Amazon SNS.
![CloudFormation Deploy](/images/1-Worklog/Week3/CFN_Backup_Deploy.png)
![SNS Email Notification](/images/1-Worklog/Week3/SNS_Backup_Email.png)

#### 4. Observability with Amazon Managed Grafana (May 07 - Session 2)
Configured the necessary IAM permissions to securely attach CloudWatch as a data source.
![Grafana IAM Setup](/images/1-Worklog/Week3/Grafana_IAM_Setup.png)

Successfully queried and visualized AWS metrics on the Amazon Managed Grafana dashboard.
![Grafana Dashboard](/images/1-Worklog/Week3/Grafana_Dashboard_View.png)

#### 5. Team Project: CI/CD Pipeline Integration (May 08)
Successfully integrated Jenkins with the GitHub repository. Configured and executed automated CI/CD pipelines (`mini-social-network-pipeline-backend` and `mini-social-network-pipeline-frontend`).
![Jenkins Dashboard](/images/1-Worklog/Week3/Jenkins_Pipelines_Dashboard.png)

Verified the successful execution of the Jenkins pipeline, which automatically built the Docker image and pushed it securely to the Amazon ECR registry.
![Jenkins Pipeline Console](/images/1-Worklog/Week3/Jenkins_ECR_Push_Success.png)