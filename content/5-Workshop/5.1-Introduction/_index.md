---
title: "Introduction"
date: 2026-07-02
weight: 1
chapter: false
pre: "<b>5.1.</b> "
---


## Objective of this Lab

**MiniSocial** is a full-stack, enterprise-grade social networking application built entirely on **Amazon Web Services (AWS)** using a **Cloud-Native Architecture**.

This workshop guides you through the complete process of provisioning infrastructure, configuring CI/CD pipelines, deploying both backend and frontend services, and setting up monitoring — all following modern cloud engineering best practices.

---

## Workshop Philosophy

{{% notice info %}}
This workshop follows a **CI/CD First** philosophy.
Instead of manually deploying applications through the AWS Management Console, every deployment is performed automatically using **Jenkins Pipelines**.
By the end of this workshop, you will understand how to build an automated deployment workflow for both backend and frontend applications.
{{% /notice %}}

---

## Learning Objectives

After completing this workshop, you will be able to:

- Provision a **multi-AZ VPC** with public and private subnets using **AWS CloudFormation**
- Deploy a containerized **Spring Boot** backend on **Amazon ECS Fargate**
- Host a **ReactJS** frontend on **Amazon S3** and distribute it globally via **Amazon CloudFront**
- Configure **Jenkins CI/CD Pipelines** for fully automated deployments
- Protect your application using **AWS WAF** against DDoS and common web exploits
- Monitor application health and performance using **CloudWatch** and **Grafana Cloud**

---

## AWS Services Used

| Service | Purpose |
|---------|---------|
| Amazon VPC | Multi-AZ networking with public/private subnets and NAT Gateway |
| AWS CloudFormation | Infrastructure as Code for automated resource provisioning |
| Amazon ECS Fargate | Serverless container orchestration for the Spring Boot backend |
| Amazon ECR | Container image registry for Docker images |
| Amazon RDS SQL Server | Managed relational database for application data |
| Amazon S3 | Static hosting for the React frontend application |
| Amazon CloudFront | Global content delivery with Origin Access Control (OAC) |
| AWS WAF | Web Application Firewall protecting ALB and CloudFront |
| Amazon CloudWatch | Centralized logging and metrics collection |

## Tools & Frameworks

| Tool | Purpose |
|------|---------|
| Jenkins Pipeline | Automated CI/CD deployment pipeline |
| Docker | Application containerization |
| Spring Boot | Backend REST API framework |
| ReactJS | Frontend single-page application framework |
| Grafana Cloud | Advanced monitoring dashboards and alerting |

---

# Architecture Overview

All infrastructure is provisioned using **AWS CloudFormation (Infrastructure as Code)**.

The architecture consists of five major layers:

| Layer | Description |
|-------|-------------|
| Networking & Database | Multi-AZ VPC, Public/Private Subnets, NAT Gateway, Amazon RDS for SQL Server |
| Backend | Containerized Spring Boot application deployed on Amazon ECS Fargate behind an Application Load Balancer |
| Frontend | React Single Page Application hosted on Amazon S3 and distributed globally through Amazon CloudFront with Origin Access Control (OAC) |
| Security | AWS WAF Web ACL protects both ALB and CloudFront against DDoS attacks and common web exploits |
| Observability | Centralized logging and monitoring using CloudWatch, Micrometer OTLP, and Grafana Cloud |



---

# Workshop Roadmap

The workshop is divided into several practical phases, allowing you to gradually build a complete production-ready environment.

| Phase | Objective |
|-------|-----------|
| **1. Prerequisites** | Prepare AWS account, GitHub repository, and development tools |
| **2. Foundation** | Provision networking infrastructure and database using CloudFormation |
| **3. CI/CD Setup** | Configure Jenkins Server and deployment pipelines |
| **4. Backend Deployment** | Analyze the Backend Jenkinsfile, deploy Spring Boot to Amazon ECS Fargate, and secure the application using AWS WAF |
| **5. Frontend Deployment** | Analyze the Frontend Jenkinsfile, deploy React to Amazon S3 and CloudFront, and enable AWS WAF protection |
| **6. Monitoring** | Monitor logs, metrics, and application health using CloudWatch and Grafana Cloud |
| **7. Clean Up** | Remove AWS resources safely to avoid unnecessary costs |

---

{{% notice tip %}}
After completing this workshop, you will have built a fully automated **Cloud-Native deployment pipeline** capable of delivering production-ready applications on AWS with minimal manual intervention.
{{% /notice %}}