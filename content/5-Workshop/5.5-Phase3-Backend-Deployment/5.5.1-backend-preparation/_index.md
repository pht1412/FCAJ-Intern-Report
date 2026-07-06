---
title: "Backend Preparation (ECR & SSM)"
date: 2026-07-02
weight: 51
chapter: false
pre: "<b>5.5.1. </b>"
---

## Objective of this Lab

In this lab, you will manually prepare the necessary prerequisites for the backend deployment. This includes creating an **Amazon Elastic Container Registry (ECR)** to store your Docker images and securely storing application secrets in **AWS Systems Manager (SSM) Parameter Store**.

---

## Learning Objectives

After completing this lab, you will be able to:

- Create an Amazon ECR repository for Docker images
- Store application secrets securely using SSM Parameter Store
- Understand the role of ECR and SSM in a CI/CD workflow

---

## AWS Services Used

| Service | Purpose |
|---------|---------|
| Amazon ECR | Container image registry for Docker images |
| AWS Systems Manager Parameter Store | Secure storage for application secrets |

---

# Step 1 – Create the ECR Repository

We need a place to store our Docker images before the CI/CD pipeline runs.

1. Navigate to the **Amazon Elastic Container Registry (ECR)** dashboard in the AWS Console.

![ECR Dashboard](/images/5-Workshop/5.5-Phase3-Backend-Deployment/DashboardECR.png)
<center><i>Amazon ECR Console – Dashboard overview.</i></center>

2. Click on the **Create repository** button.

3. Set the **Repository name**.

{{% notice warning %}}
You **must** name the repository exactly `minisocial-backend`. This name must match the `ECR_REPO_NAME` variable defined in your Jenkinsfile.
{{% /notice %}}

![Create ECR Repository](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateRepo.png)
<center><i>Creating the ECR repository with the required name.</i></center>

4. Leave other settings as default and click **Create repository**.

---

# Step 2 – Create Secure SSM Parameters

Our backend requires sensitive information (database passwords, secret keys) to function. We will store these securely using AWS Systems Manager.

1. Navigate to **AWS Systems Manager** → **Parameter Store**.

![SSM Dashboard](/images/5-Workshop/5.5-Phase3-Backend-Deployment/DashboardSSM.png)
<center><i>AWS Systems Manager – Parameter Store dashboard.</i></center>

2. Click **Create parameter**.

3. Create the following parameters one by one. For each parameter, use the **SecureString** type:

| Parameter Name | Description |
|----------------|-------------|
| `/minisocial/backend/db-password` | Your RDS database password |
| `/minisocial/backend/jwt-secret` | A strong random string for JWT |
| `/minisocial/backend/aws-access-key` | IAM User access key |
| `/minisocial/backend/aws-secret-key` | IAM User secret key |
| `/minisocial/backend/grafana-token` | Grafana Cloud token |
| `/minisocial/backend/mail-password` | SMTP Email App Password |
| `/minisocial/acm/certificate-arn` | SSL Certificate ARN for Backend |

![Create SSM Parameter](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateSSM.png)
<center><i>Creating a SecureString parameter in SSM Parameter Store.</i></center>

4. Repeat this process until all required secrets are created.

---

## Verification Checklist

Before continuing, verify that:

- ✅ ECR repository named `minisocial-backend` exists and is empty
- ✅ All required parameters appear in the Parameter Store list
- ✅ All parameters use **SecureString** type

![SSM Parameters Done](/images/5-Workshop/5.5-Phase3-Backend-Deployment/DashboardSSM_DONE.png)
<center><i>All SSM parameters created successfully.</i></center>