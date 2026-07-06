---
title: "Phase 4: Frontend Deployment"
date: 2026-07-02
weight: 6
chapter: true
pre: "<b>5.6.</b> "
---

# Phase 4 – Frontend Deployment

In this phase, you will deploy the **MiniSocial Frontend**, built with **React** and **Vite**, using a modern serverless architecture on AWS.

Instead of running a traditional web server, the frontend will be hosted as a **Single Page Application (SPA)** on Amazon S3 and distributed globally through Amazon CloudFront. Combined with Amazon Route 53 and AWS Certificate Manager (ACM), this architecture provides high availability, low latency, automatic HTTPS encryption, and virtually unlimited scalability.

---

## Frontend CI/CD Workflow

Unlike the backend deployment, the frontend pipeline focuses on distributing static content efficiently. The Jenkins Pipeline performs the following workflow automatically:

1. Clone the source code from GitHub.
2. Install Node.js dependencies.
3. Build the optimized React (Vite) application.
4. Synchronize the generated `dist/` folder to Amazon S3.
5. Remove outdated files from the S3 bucket.
6. Create a CloudFront cache invalidation so users immediately receive the latest version of the application.

---

## AWS Services Used

| Service | Purpose |
|---------|---------|
| Amazon S3 | Stores static website files (HTML, CSS, JS, images) |
| Amazon CloudFront | Serves the website through a global CDN with HTTPS |
| Origin Access Control (OAC) | Secures S3 bucket access to only CloudFront |
| AWS Certificate Manager (ACM) | SSL/TLS certificate for HTTPS encryption |
| Amazon Route 53 | DNS management for custom domain |
| AWS WAF | Web Application Firewall for frontend security |

---

## Hands-on Labs

- **[5.6.1 Frontend Infrastructure & Route 53](5.6.1-/)**
  - Request an ACM certificate, deploy the CloudFormation stack, and connect your custom domain using Amazon Route 53.

- **[5.6.2 Frontend CI/CD Pipeline](5.6.2-/)**
  - Configure Jenkins Pipeline, update the Jenkinsfile with CloudFormation outputs, and automatically build and deploy the React application.

- **[5.6.3 Frontend WAF Security](5.6.3-/)**
  - Create an AWS WAF Web ACL to protect the frontend CloudFront distribution from common web attacks.

---

## Expected Outcome

- After completing this phase, you will have:
  - A fully deployed **React Frontend** hosted on Amazon S3
  - **Global distribution** with low latency using Amazon CloudFront
  - **Secure HTTPS access** via ACM and Route 53
  - **Enterprise-grade security** with AWS WAF protecting the frontend
  - An automated **Jenkins CI/CD pipeline** for fast and repeatable deployments

{{% notice tip %}}
By the end of Phase 4, your MiniSocial application will be fully accessible through your own custom domain over HTTPS, completing the full-stack deployment!
{{% /notice %}}