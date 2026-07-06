---
title: "Week 6 Worklog"
date: 2026-05-19
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

This week's worklog focuses on intelligent threat detection using Amazon GuardDuty and securely managing sensitive credentials via AWS Secrets Manager. We also achieved a significant milestone in our team project by automating our containerized application deployment on Amazon ECS Fargate using AWS CDK, backed by rigorous automated testing.

### Week 6 Objectives:
- Implement intelligent threat detection and continuous monitoring using Amazon GuardDuty.
- Securely manage and inject sensitive credentials (database secrets) using AWS Secrets Manager.
- Automate containerized application deployments using AWS CloudFormation, Amazon ECR, and Amazon ECS Fargate.
- **Team Project:** Execute comprehensive manual and automated testing for newly developed application features to ensure high code quality and reliability.

### Tasks to be carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Day 1 (05/19) | - Session 1: Threat Detection <br>&emsp; + Deploy `GuardDuty-Hands-On` stack via CloudFormation. <br>&emsp; + Analyze intelligent threat findings and review the GuardDuty Summary dashboard. | 05/19/2026 | 05/19/2026 | [AWS GuardDuty Docs](https://docs.aws.amazon.com/guardduty/) |
| Day 1 (05/19) | - Session 2: Secrets Management & ECS Deployment <br>&emsp; + Upload `RDSFargate.yml` to Amazon S3. <br>&emsp; + Create `dbsecret` in AWS Secrets Manager to store database credentials. <br>&emsp; + Deploy 4 CloudFormation stacks (3 `SecretManagerRDS` stacks, 1 `smdemo` stack). <br>&emsp; + Create an Amazon ECR repository named `smdemo`. <br>&emsp; + Build and push the application Docker image to ECR via CLI. <br>&emsp; + Provision ECS Cluster `smdemo` and configure 2 Fargate Task Definitions. | 05/19/2026 | 05/19/2026 | [AWS Secrets Manager & ECS Docs](https://docs.aws.amazon.com/ecs/) |
| Day 2 (05/20) | - **Team Project:** Application Testing & QA <br>&emsp; + Perform thorough manual testing for new functionalities (Dark Mode, Security History). <br>&emsp; + Write and execute automated unit tests for the backend. <br>&emsp; + Generate and analyze code coverage reports using JaCoCo. | 05/20/2026 | 05/20/2026 | Project Repo / JaCoCo Docs |

### Week 6 Achievements:
- Successfully enabled Amazon GuardDuty to identify and analyze simulated security threats within the AWS environment.
- Eliminated hardcoded credentials by securely storing and retrieving database passwords using AWS Secrets Manager.
- Successfully built a complete CI/CD-like workflow for containers: building Docker images, pushing them to Amazon ECR, and orchestrating them via Amazon ECS Fargate using Infrastructure as Code.
- Successfully validated new application features through rigorous manual and automated testing, achieving exceptional code coverage (~99%) as verified by JaCoCo reports.

### Task Evidence:

#### 1. Threat Detection with Amazon GuardDuty
Deployed the baseline infrastructure and verified the generation of security findings in the GuardDuty dashboard.
![GuardDuty Findings](/images/1-Worklog/Week6/GuardDuty_Findings.png)

#### 2. AWS Secrets Manager Configuration
Created and securely stored the `dbsecret` credentials to be consumed by the containerized application.
![AWS Secrets Manager](/images/1-Worklog/Week6/Secrets_Manager_dbsecret.png)

#### 3. Infrastructure as Code via CloudFormation
Successfully deployed the relational database and ECS cluster infrastructure using nested CloudFormation stacks.
![CloudFormation Stacks](/images/1-Worklog/Week6/CloudFormation_Stacks.png)

#### 4. Amazon ECR & Docker Image Push
Created the `smdemo` repository and successfully authenticated, built, and pushed the Docker image via the terminal.
![ECR Docker Push](/images/1-Worklog/Week6/ECR_Docker_Push.png)

#### 5. Amazon ECS Fargate Task Definitions
Deployed the ECS Cluster and verified the successful creation and registration of the Fargate Task Definitions for the `smdemo` application.
![ECS Task Definitions](/images/1-Worklog/Week6/ECS_Task_Definitions.png)

#### 6. Team Project: Automated Testing & Code Coverage (May 20)
Executed comprehensive automated unit tests for the backend services and generated detailed code coverage reports using JaCoCo. The results demonstrated excellent test coverage (up to 99% instruction coverage) across core modules, ensuring the robust reliability of newly implemented features.
![JaCoCo Code Coverage](/images/1-Worklog/Week6/Project_JaCoCo_Coverage_W6.png)

#### 7. Team Offline Meeting
Conducted an offline team meeting to review the CI/CD pipeline automation and ensure code quality standards before the final project release.
![Team Meeting](/images/1-Worklog/Week6/2905_meeting_w6.jpg)