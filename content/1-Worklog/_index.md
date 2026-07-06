---
title: "Worklog"
date: 2026-07-06
weight: 1
chapter: false
pre: " <b> 1. </b> "
---

Welcome to the official **Worklog** for the project! This document serves as a comprehensive weekly diary detailing our team's 3-month (12-week) journey.

Throughout this internship program, we meticulously documented our progress, technical challenges, and team collaboration. Below is the summarized roadmap of our accomplishments over the full 12 weeks.

### Project Roadmap & Weekly Milestones

**Week 1:** [AWS IAM & EC2 Foundations](1.1-Week1/)  
Mastered AWS IAM principles (Users, Groups, Roles, Assume Role) and deployed initial EC2 instances to verify network connectivity.

**Week 2:** [Hybrid Network Architecture & Database Initialization](1.2-Week2/)  
Configured an AWS Site-to-Site VPN, troubleshooted IAM permissions for EC2, and initialized a MariaDB database on Linux via SSH.

**Week 3:** [AWS CLI, Disaster Recovery & Jenkins CI/CD Setup](1.3-Week3/)  
Automated disaster recovery using AWS Backup, configured Amazon Managed Grafana, and established a Jenkins CI/CD pipeline integrated with GitHub.

**Week 4:** [AWS Systems Manager, VPC Endpoints & ECS Fargate ClickOps](1.4-Week4/)  
Managed EC2 fleets via Systems Manager, secured access via PrivateLink, and manually deployed the application backend to Amazon ECS Fargate (ClickOps). (Offline meeting May 15).

**Week 5:** [Infrastructure as Code, Serverless Workflows & ChatOps](1.5-Week5/)  
Deployed infrastructure using AWS CDK, implemented serverless workflows (API Gateway, Lambda), and integrated Slack ChatOps.

**Week 6:** [AWS Security Services & CI/CD Pipeline for Containers](1.6-Week6/)  
Enabled intelligent threat detection with GuardDuty, managed credentials via Secrets Manager, and fully automated container deployments to ECR/ECS. (Offline meeting May 29).

**Week 7:** [Automated Architecture Provisioning with CloudFormation & RDS](1.7-Week7/)  
Transitioned to Infrastructure as Code by codifying the VPC network topology, secure Amazon RDS, and backend ECS deployments using CloudFormation. (Offline meeting June 04).

**Week 8:** [System Performance Testing & Bottleneck Analysis](1.8-Week8/)  
Visualized the 3-Tier Architecture, conducted rigorous K6 Load Testing, and analyzed telemetry data to identify system bottlenecks.

**Week 9:** [Full-stack Application Enhancements & CI/CD Maintenance](1.9-Week9/)  
Implemented full-stack user experience improvements and ensured zero-downtime deployments via the automated Jenkins CI/CD pipeline. (Offline meeting June 12).

**Week 10:** [Enterprise Architecture, FinOps & Custom Domain Setup](1.10-Week10/)  
Upgraded to a Multi-AZ highly available infrastructure, implemented FinOps via EventBridge scheduling, and secured traffic with Route53 and ACM certificates. (Offline meeting June 19).

**Week 11:** [Advanced Load Testing & DDoS Simulation](1.11-Week11/)  
Deployed the interactive Gacha feature, conducted rigorous K6 performance testing (5MB file uploads), and simulated Layer 7 HTTP flood attacks to gather baseline metrics. (Offline meeting July 03).

**Week 12:** [JaCoCo Testing Report & Internal Report Consolidation](1.12-Week12/)  
Built a software testing report using JaCoCo for Code Coverage measurement across two layers — Controller (MockMvc) and Service (Mockito) — and consolidated all content into a complete Internal Report on Hugo.
