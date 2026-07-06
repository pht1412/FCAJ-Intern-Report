---
title: "Workshop"
date: 2026-07-02
weight: 5
chapter: false
pre: "<b>5.</b> "
---


#  Build and Deploy Mini Social Network on AWS (CI/CD First)

## Workshop Overview

This workshop guides you through the complete process of building, deploying, securing, and monitoring **Mini Social Network (MiniSocial)** on **Amazon Web Services (AWS)**.

MiniSocial is a **full-stack Cloud-Native application** integrated with **gamification features** and designed following enterprise best practices for scalability, availability, automation, and security.

Unlike traditional deployment methods that rely heavily on manual operations, this workshop adopts a **CI/CD First** philosophy, where the entire deployment lifecycle is automated using **Jenkins Pipelines**.

By the end of this workshop, you will have deployed both the backend and frontend applications into a production-like AWS environment with minimal manual intervention.

---

# Learning Objectives

After completing this workshop, you will be able to:

- Provision AWS infrastructure using **Infrastructure as Code (IaC)**.
- Build and package applications using **Docker**.
- Deploy containerized Spring Boot applications on **Amazon ECS Fargate**.
- Host React applications on **Amazon S3** with global content delivery through **Amazon CloudFront**.
- Protect applications using **AWS WAF**.
- Implement automated deployment pipelines using **Jenkins CI/CD**.
- Monitor applications through **CloudWatch**, **Micrometer OTLP**, and **Grafana Cloud**.

---

#  Technologies Covered

| Category | Technologies |
|-----------|--------------|
| Infrastructure | AWS CloudFormation, Amazon VPC, NAT Gateway |
| Backend | Spring Boot, Docker, Amazon ECS Fargate |
| Database | Amazon RDS SQL Server |
| Frontend | ReactJS, Amazon S3, Amazon CloudFront |
| Security | AWS WAF, Application Load Balancer (ALB), Origin Access Control (OAC), Parameter Store (AWS Systems Manager) |
| CI/CD | Jenkins Pipeline, Amazon ECR |
| Monitoring | CloudWatch, Micrometer OTLP, Grafana Cloud |

---

#  Workshop Roadmap

The workshop is divided into several practical phases.

| Phase | Description |
|--------|-------------|
| **[Introduction](/5-workshop/5.1-introduction/)** | Overview of the workshop objectives, architecture, and deployment strategy. |
| **[Prerequisites](/5-workshop/5.2-prerequisites/)** | Prepare AWS account, GitHub repository, and required software tools. |
| **[Phase 1 – Foundation](/5-workshop/5.3-phase1-foundation/)** | Provision networking resources, VPC, subnets, NAT Gateway, and Amazon RDS using AWS CloudFormation. |
| **[Phase 2 – CI/CD Setup](/5-workshop/5.4-phase2-cicd-setup/)** | Configure Jenkins server, credentials, pipelines, and deployment environment. |
| **[Phase 3 – Backend Deployment & WAF](/5-workshop/5.5-phase3-backend-deployment/)** | Build Docker images, push them to Amazon ECR, deploy Spring Boot to Amazon ECS Fargate, and secure the backend with AWS WAF. |
| **[Phase 4 – Frontend Deployment & WAF](/5-workshop/5.6-phase4-frontend-deployment/)** | Deploy the React application to Amazon S3, distribute it through Amazon CloudFront, and configure AWS WAF protection. |
| **[Phase 5 – Monitoring & Optimization](/5-workshop/5.7-phase5-monitoring/)** | Collect logs and metrics using CloudWatch, Micrometer OTLP, and Grafana Cloud for system monitoring and performance analysis. |
| **[Clean Up Resources](/5-workshop/5.8-clean-up/)** | Safely remove AWS resources to avoid unnecessary charges after completing the workshop. |

---

#  Expected Outcome

{{% notice info %}}

Upon completing this workshop, you will have built a complete **Cloud-Native deployment pipeline** capable of automatically delivering both backend and frontend applications to AWS.
The resulting architecture closely resembles a real-world enterprise deployment model by combining **Infrastructure as Code**, **Containerization**, **CI/CD**, **Content Delivery**, **Security**, and **Observability** into a unified production-ready solution.

{{% /notice %}}