---
title: "Week 2 Worklog"
date: 2026-04-28
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

This week's worklog focuses on establishing a secure hybrid network architecture using AWS Site-to-Site VPN and managing foundational AWS compute resources. We also encountered and resolved IAM permission issues and began researching CI/CD pipeline automation with Jenkins.

### Week 2 Objectives:
- Design and implement a hybrid network architecture using AWS Site-to-Site VPN.
- Provision and manage Amazon EC2 instances, EBS volumes, and network interfaces.
- Configure and troubleshoot IAM user/group permissions and IAM Roles for EC2.
- Initialize database services (MariaDB) within a Linux environment via SSH.
- **Team Project:** Conduct a technical spike to research Jenkins for the upcoming CI/CD pipeline implementation.

### Tasks to be carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Day 1  | - Configure Site-to-Site VPN <br>&emsp; + Create VPC, Subnets, IGW, NAT, VGW, and CGW. <br>&emsp; + Establish VPN Connection and configure the customer gateway router via CLI. | 04/25/2026 | 04/25/2026 | [AWS VPN Documentation](https://cloudjourney.awsstudygroup.com/) |
| Day 1  | - Verify VPN Connectivity <br>&emsp; + Ensure both IPsec tunnels are in the UP state and perform a successful ping test across the VPN. | 04/25/2026 | 04/25/2026 | [AWS VPC Routing](https://cloudjourney.awsstudygroup.com/) |
| Day 2  | - IAM Setup & EC2 Provisioning <br>&emsp; + Create IAM Group `CostTest`, assign users, and create IAM Role `Windows-instance`. <br>&emsp; + Provision EC2 instances and EBS volumes. | 04/28/2026 | 04/28/2026 | [AWS EC2 & IAM Docs](https://cloudjourney.awsstudygroup.com/) |
| Day 2  | - Troubleshoot Launch & Access Permissions <br>&emsp; + Encounter and diagnose EC2 launch failures due to IAM explicit deny policies. <br>&emsp; + Verify S3 bucket access restrictions ("Access Denied"). | 04/28/2026 | 04/28/2026 | [AWS IAM Troubleshooting](https://cloudjourney.awsstudygroup.com/) |
| Day 2  | - OS Configuration & Database Initialization <br>&emsp; + Access Windows Server via RDP and Linux via SSH (MobaXterm). <br>&emsp; + Run `mysql_secure_installation` to initialize MariaDB. | 04/28/2026 | 04/28/2026 | [MariaDB Docs](https://cloudjourney.awsstudygroup.com/) |
| Day 2  | - **Team Project:** CI/CD Research (Technical Spike) <br>&emsp; + Research Jenkins architecture and its integration capabilities with GitHub. <br>&emsp; + Define prerequisites for automating the deployment pipeline. | 04/28/2026 | 04/28/2026 | Jenkins Official Docs |

### Week 2 Achievements:
- Successfully established and verified a secure Site-to-Site VPN connection.
- Gained hands-on experience troubleshooting IAM explicit deny policies during resource provisioning and service access.
- Successfully connected to cloud instances using RDP/SSH and configured a relational database service.
- Successfully completed the technical spike on Jenkins, laying the theoretical groundwork for the CI/CD pipeline implementation scheduled for next week.

### Task Evidence:

#### 1. AWS Site-to-Site VPN Setup & Verification
Provisioned the VPN infrastructure on the AWS console and configured the customer router. Successfully brought both IPsec tunnels to an **UP** state and verified cross-network routing via a Ping test.
![Create VPN Connection](/images/1-Worklog/Week2/Create_VPN%20Connection.png)
![Tunnel Configuration](/images/1-Worklog/Week2/cmd_2tunnel_active.png)
![VPN Tunnel UP](/images/1-Worklog/Week2/VPNConnection_2Tunnel_UP.png)
![Ping Test](/images/1-Worklog/Week2/Ping_Test.png)

#### 2. IAM Role Configuration for EC2
Created and reviewed the `Windows-instance` IAM role with the `AmazonSSMFullAccess` policy attached.
![Windows Instance Role](/images/1-Worklog/Week2/RDP_Windows_Instance.png)

#### 3. Troubleshooting: EC2 Launch Restriction & S3 Access Denied
Encountered an "Instance launch failed" error. Diagnosed the root cause as an explicit deny in the identity-based policy (`EC2_FamilyRestrict`), preventing the launch of specific instance types. 
![EC2 Launch Failed](/images/1-Worklog/Week2/EC2_FamilyRestrict.png)

Additionally, verified access controls by attempting to list S3 buckets, resulting in the expected "You don't have permissions" error.
![S3 Access Denied](/images/1-Worklog/Week2/S3_Access_Denied.png)

#### 4. Database Initialization via SSH
Connected to the Linux instance using MobaXterm and successfully ran the initial security script for MariaDB.
![MariaDB Init](/images/1-Worklog/Week2/MobaXterm_MariaDB_Init.png)