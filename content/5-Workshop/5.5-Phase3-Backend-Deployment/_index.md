---
title: "Phase 3: Backend Deployment"
date: 2026-07-02
weight: 5
chapter: true
pre: "<b>5.5.</b> "
---

# Phase 3 – Backend Deployment

In this phase, you will deploy the core logic of the Mini Social Network (**Spring Boot API**) onto AWS using a highly scalable, serverless container architecture (**Amazon ECS Fargate**).

---

## The "Image Seeding" Deployment Strategy

Deploying a containerized application using Infrastructure as Code (IaC) and CI/CD presents a classic "chicken-and-egg" problem:

- AWS CloudFormation (ECS) requires a valid Docker Image in **Amazon ECR** to provision the service.
- However, the CI/CD Pipeline (Jenkins) is the tool responsible for building and pushing that image.

- The solution — the **"Image Seeding"** strategy:
  - Create an empty ECR repository manually
  - Run the Jenkins Pipeline for the first time — it will build and push the image to ECR, but **deliberately fail** at the deployment stage because the ECS infrastructure doesn't exist yet
  - Use the newly pushed image URI to deploy the CloudFormation Backend Stack
  - Run the Jenkins Pipeline a second time — it will now succeed 100% and update the live ECS Service

---

## AWS Services Used

| Service | Purpose |
|---------|---------|
| Amazon ECR | Container image registry for Docker images |
| Amazon ECS Fargate | Serverless container deployment for the backend |
| AWS CloudFormation | Infrastructure as Code for ECS provisioning |
| Application Load Balancer | Distributes traffic to ECS tasks |
| Amazon S3 | Storage for user-uploaded files |
| AWS WAF | Web Application Firewall for security |
| Amazon Route 53 | DNS management for custom domain |
| Jenkins | CI/CD automation server |

---

## Hands-on Labs

- **[5.5.1 Backend Preparation (ECR & SSM)](5.5.1-backend-preparation/)**
  - Manually provision SSM Parameters for sensitive secrets and initialize the ECR repository.

- **[5.5.2 Jenkins Config & Initial Run](5.5.2-jenkins-config-and-initial-run/)**
  - Configure Jenkins Managed Files and execute the first pipeline run to seed the Docker image.

- **[5.5.3 Deploy the Backend Stack](5.5.3-/)**
  - Provision the ECS Fargate service, task definitions, and cost-optimized auto-scaling using CloudFormation.

- **[5.5.4 Action & Verify Backend](5.5.4-/)**
  - Create the S3 upload bucket, rerun the Jenkins pipeline, and verify the API via the ALB.

- **[5.5.5 WAF & Route 53 Configuration](5.5.5-/)**
  - Attach AWS WAF to the ALB and configure Amazon Route 53 for custom domain access.

---

## Expected Outcome

- After completing this phase, you will have:
  - A fully deployed **Spring Boot Backend** on Amazon ECS Fargate
  - A complete **CI/CD pipeline** that automatically builds, pushes, and deploys
  - **Cost-optimized architecture** with Fargate Spot and Scheduled Auto Scaling
  - **Enterprise-grade security** with AWS WAF
  - **Custom domain** with HTTPS via Route 53 and ACM

{{% notice warning %}}
**Important:** Since Jenkins is running on your local machine, **Docker Desktop must remain open and running** throughout the execution of these pipelines.
{{% /notice %}}