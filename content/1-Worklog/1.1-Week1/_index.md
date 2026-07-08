---
title: "Week 1 Worklog"
date: 2026-04-24
weight: 1
chapter: false
pre: " <b> 1.1. </b> "
---

This week's worklog covers the foundational setup for our AWS environment, focusing on IAM configurations and basic network testing. We also initiated our team project by conducting a preliminary security audit on our core application to identify vulnerabilities.

### Week 1 Objectives:
- Understand and manage AWS Identity and Access Management (IAM) resources.
- Implement basic security principles using Users, Groups, and Roles.
- Practice cross-role delegation (Assume Role) via the AWS Management Console.
- Deploy Amazon EC2 instances and verify internal network connectivity.
- **Team Project:** Initiate the project by performing manual testing and security audits on the core application.

### Tasks to be carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Day 1 | - Create AdminUser & OperatorUser <br>&emsp; + Create two distinct IAM users with appropriate access types for administrative and operational tasks. | 04/23/2026 | 04/23/2026 | [AWS IAM Documentation](https://cloudjourney.awsstudygroup.com/) |
| Day 1 | - Create AdminGroup <br>&emsp; + Setup an IAM user group intended for administrators. | 04/23/2026 | 04/23/2026 | [AWS IAM Documentation](https://cloudjourney.awsstudygroup.com/) |
| Day 1 | - Create AdminRole <br>&emsp; + Create an IAM role with specific trusted entities to allow delegated access. | 04/23/2026 | 04/23/2026 | [AWS IAM Documentation](https://cloudjourney.awsstudygroup.com/) |
| Day 1 | - Add AdminUser to AdminGroup <br>&emsp; + Attach the created user to the admin group to inherit policies like `AdministratorAccess`. | 04/23/2026 | 04/23/2026 | [AWS IAM Documentation](https://cloudjourney.awsstudygroup.com/) |
| Day 1 | - Check AdminUser on AdminGroup and Switch Role <br>&emsp; + Verify group membership and perform a Switch Role action from `OperatorUser` to `AdminRole` in the console. | 04/23/2026 | 04/23/2026 | [AWS IAM Documentation](https://cloudjourney.awsstudygroup.com/) |
| Day 2 | - Provision EC2 Instances & Test Connectivity <br>&emsp; + Deploy EC2 instances in private subnets and use the `ping` command to verify internal network communication. | 04/24/2026 | 04/24/2026 | [AWS EC2 & VPC Documentation](https://cloudjourney.awsstudygroup.com/) |
| Day 2 | - **Team Project:** Security Audit & Testing <br>&emsp; + Perform manual functional testing. <br>&emsp; + Compile `security_audit.log` by simulating web attacks via ngrok. <br>&emsp; + Synthesize functional and security vulnerabilities. | 04/24/2026 | 04/24/2026 | [Project Repository](https://github.com/pht1412/Mini-Social-Network.git) |

### Week 1 Achievements:
- Mastered how to manage IAM on the AWS Management Console.
- Understood basic permissions and authorization concepts.
- Successfully implemented and tested delegation (Assume Role) on the AWS Management Console.
- Successfully provisioned EC2 instances and verified private network connectivity.
- Successfully kicked off the team project by identifying and documenting critical security vulnerabilities (SQL Injection, XSS, Path Traversal).

### Task Evidence:

#### 1. Create AdminUser & OperatorUser
Successfully created both `AdminUser` and `OperatorUser` within the IAM Users console dashboard.
![Create AdminUser & OperatorUser](/images/1-Worklog/Week1/Create_AdminUser&OperatorUser.png)

#### 2. Create AdminGroup
Initialized the `AdminGroup` designated for handling administrator accounts.
![Create AdminGroup](/images/1-Worklog/Week1/Create_AdminGroup.png)

#### 3. Create AdminRole
Successfully provisioned the `AdminRole` specifying the core trusted account details.
![Create AdminRole](/images/1-Worklog/Week1/Create_AdminRole.png)

#### 4. Add AdminUser to AdminGroup
Assigned `AdminUser` to the `AdminGroup` to ensure proper permission inheritance including `AdministratorAccess`.
![Add AdminUser to AdminGroup](/images/1-Worklog/Week1/Add_AdminUser_TO_AdminGroup.png)

#### 5. Check AdminUser on AdminGroup & Switch Role
Verified that `AdminUser` is actively registered inside the `AdminGroup` membership listings.
![Check AdminUser on AdminGroup](/images/1-Worklog/Week1/Check_AdminUser_ON_AdminGroup.png)

Successfully validated cross-account delegation by performing a console Switch Role operation from `OperatorUser` to `AdminRole`.
![Switch Role](/images/1-Worklog/Week1/switch_Admin_Operator.png)

#### 6. Provision EC2 Instances & Test Connectivity
Deployed EC2 instances on AWS and verified successful network communication between private IP addresses (`10.10.4.143` to `10.11.1.46`) using ICMP ping. The results show 0% packet loss, confirming proper internal routing.
![Ping EC2 Instances](/images/1-Worklog/Week1/Screenshot%202026-04-24%20234230.png)

#### 7. Team Project: Security Audit & Manual Testing
Performed manual testing on the application hosted locally via ngrok. Successfully identified and logged critical vulnerabilities including SQL Injection, Path Traversal, and XSS attacks into `security_audit.log`.
```json
{"time":"2026-04-20T21:58:02", "level":"WARN", "type":"SECURITY", "msg":"type=SQL_INJECTION ip=42.119.86.124 method=GET uri=/ query=search=%27%20OR%202%3D2%20-- ua=curl/8.18.0"}
{"time":"2026-04-20T21:58:21", "level":"WARN", "type":"SECURITY", "msg":"type=PATH_TRAVERSAL ip=42.119.86.124 method=GET uri=/ query=file=../../../../etc/passwd ua=curl/8.18.0"}
{"time":"2026-04-20T21:58:14", "level":"WARN", "type":"SECURITY", "msg":"type=XSS_ATTACK ip=42.119.86.124 method=GET uri=/ query=username=%3Cscript%3Ealert(1)%3C/script%3E ua=curl/8.18.0"}
```

#### 8. Team Online Meeting (Google Meet)
Conducted an online team meeting via Google Meet to discuss the project and divide tasks.
![Google Meet Meeting](/images/1-Worklog/Week1/2604_meetingOnl_w1.png)