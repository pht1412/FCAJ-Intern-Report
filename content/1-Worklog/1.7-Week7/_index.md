---
title: "Week 7 Worklog"
date: 2026-06-07
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

This week's worklog focuses on transitioning from manual provisioning to Infrastructure as Code (IaC) methodology. We automated the deployment of our network topology, secured a private Amazon RDS database, and orchestrated our backend container deployments using AWS CloudFormation and Amazon ECS Fargate.

### Week 7 Objectives:
- Transition from manual infrastructure provisioning (ClickOps) to Infrastructure as Code (IaC) methodology.
- Automate the deployment of a robust network topology including VPC, Subnets, NAT Gateway, and Application Load Balancer.
- Provision a secure, private relational database (Amazon RDS for SQL Server) completely isolated from the public internet.
- Orchestrate backend container deployments using AWS CloudFormation and Amazon ECS Fargate.

### Tasks to be carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Day 1 (06/01) | - Network & ALB Codification (IaC) <br>&emsp; + Write and execute CloudFormation template to build VPC, Public/Private Subnets, IGW, NAT Gateway, and ALB. | 06/01/2026 | 06/01/2026 | [AWS CloudFormation Docs](https://cloudjourney.awsstudygroup.com/) |
| Day 1 (06/01) | - Database Infrastructure (IaC) <br>&emsp; + Deploy Amazon RDS (SQL Server) into the Private Subnet, securing access via Security Groups. | 06/01/2026 | 06/01/2026 | [AWS RDS CloudFormation](https://cloudjourney.awsstudygroup.com/) |
| Day 1 (06/01) | - ECS Fargate Orchestration (IaC) <br>&emsp; + Provision ECS Cluster and define Fargate Task Definitions. <br>&emsp; + Map backend services to the Application Load Balancer Target Group. | 06/01/2026 | 06/01/2026 | [AWS ECS Documentation](https://cloudjourney.awsstudygroup.com/) |

### Week 7 Achievements:
- Successfully eliminated manual configuration errors (ClickOps) by codifying the entire 3-tier architecture.
- Secured the database layer by ensuring RDS instances are strictly placed within private subnets with `PubliclyAccessible: false`.
- Established a fully automated, scalable infrastructure foundation ready for continuous deployment (CI/CD) via ECS Fargate.

### Task Evidence:

#### 1. Complete Infrastructure as Code Deployment
Successfully executed three critical CloudFormation stacks (`MiniSocial-Arichtect`, `minisocial-db`, and `minisocial-backend`), bringing the entire system online via code.
![CloudFormation Stacks](/images/1-Worklog/Week7/CloudFormation_Project_Infrastructure.png)

#### 2. Network & Application Load Balancer (Golden Snippet)
Codified the network entry point, ensuring traffic from the internet is securely routed across multiple public subnets via an Application Load Balancer.
```yaml
  ApplicationLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: MiniSocial-ALB
      Scheme: internet-facing
      Subnets:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
      SecurityGroups:
        - !Ref ALBSecurityGroup
```

#### 3. Secure RDS Provisioning (Golden Snippet)
Deployed the SQL Server Express database strictly into a private subnet group. The property `PubliclyAccessible: false` guarantees absolute isolation from external threats.
```yaml
  MyRDSInstance:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: minisocial-sqlserver
      Engine: sqlserver-ex          # MS SQL Server Express Edition
      DBInstanceClass: db.t3.small  # Optimized for SQL Server
      DBSubnetGroupName: !Ref MyDBSubnetGroup
      PubliclyAccessible: false     # Isolated in Private Subnet
      MultiAZ: false
```

#### 4. Serverless Container Orchestration with Fargate (Golden Snippet)
Configured the ECS Task Definition to utilize AWS Fargate (`NetworkMode: awsvpc`), automatically injecting environment variables and database endpoints securely without provisioning underlying EC2 instances.
```yaml
  BackendTaskDefinition:
    Type: AWS::ECS::TaskDefinition
    Properties:
      Family: minisocial-backend-task
      Cpu: '512'
      Memory: '1024'
      NetworkMode: awsvpc
      RequiresCompatibilities:
        - FARGATE
      ContainerDefinitions:
        - Name: minisocial-backend-container
          Image: !Ref EcrImageUri
          PortMappings:
            - ContainerPort: 8080
              Protocol: tcp
```

#### 5. Team Offline Meeting
Conducted an offline team meeting to finalize the project deployment, review system architecture, and prepare for the final presentation.
![Team Offline Meeting](/images/1-Worklog/Week7/0406_meeting_w7.jpg)