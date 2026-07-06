---
title: "Phase 2: Jenkins CI/CD"
date: 2026-07-02
weight: 4
chapter: true
pre: "<b>5.4.</b> "
---

# Phase 2 – Jenkins CI/CD Setup

In the previous phase, you provisioned the networking and database infrastructure using **AWS CloudFormation**. In this phase, you will build the automation engine that deploys your applications — **Jenkins CI/CD**.

Instead of manually building, packaging, and deploying applications, you will create **Pipeline as Code** workflows that automate the complete software delivery process.

---

## Learning Objectives

After completing this phase, you will be able to:

- Configure Jenkins for AWS deployments
- Secure sensitive information using **Jenkins Credentials**
- Build automated deployment pipelines for Backend and Frontend applications
- Deploy applications to AWS with minimal manual intervention
- Understand how CI/CD improves software quality, consistency, and deployment speed

---

## Why CI/CD Matters

Continuous Integration (CI) and Continuous Deployment (CD) are essential practices in modern DevOps.

- A well-designed CI/CD pipeline helps you:
  - Automate repetitive deployment tasks
  - Reduce human errors during releases
  - Ensure every deployment follows the same process
  - Execute testing before every deployment
  - Deliver applications consistently to AWS

By adopting **Pipeline as Code**, your deployment process becomes reproducible, version-controlled, and easy to maintain.

---

## Tools & Services Used

| Tool / Service | Purpose |
|----------------|---------|
| Jenkins | CI/CD automation server running on your local machine |
| Jenkins Pipeline | Pipeline as Code for automated build and deployment |
| Jenkins Credentials | Securely stores AWS keys, Docker credentials, and secrets |
| Amazon ECR | Container image registry for Docker images |
| Amazon ECS Fargate | Serverless container deployment for the backend |
| Amazon S3 | Static hosting for the React frontend |
| Amazon CloudFront | Global content delivery with cache invalidation |
| Docker | Application containerization |

---

## What You'll Build

Throughout this phase, Jenkins will automate the following workflow:

```text
Source Code
      │
      ▼
    Jenkins
      │
      ├── Build
      ├── Test
      ├── Docker Build
      ├── Push Image to Amazon ECR
      ├── Deploy to Amazon ECS Fargate
      └── Deploy Frontend to Amazon S3
                    │
                    ▼
             Amazon CloudFront
```

By the end of this phase, both the Backend and Frontend applications will be deployed automatically whenever the pipeline is executed.

---

## Hands-on Labs

- **[5.4.1 Jenkins Preparation](5.4.1-prepare/)**
  - Prepare Jenkins for production-ready CI/CD: install required plugins, configure Jenkins Credentials, set up AWS authentication, and apply security best practices.

---

## Expected Outcome

- After completing this phase, you will have:
  - A fully configured **Jenkins server** ready for AWS deployments
  - **Jenkins Credentials** securely storing AWS Access Keys and other secrets
  - Understanding of **Pipeline as Code** workflows for both Backend and Frontend

{{% notice tip %}}
By the end of this phase, you will have a **production-ready CI/CD pipeline** capable of deploying both Backend and Frontend applications to AWS automatically with a single click.
{{% /notice %}}