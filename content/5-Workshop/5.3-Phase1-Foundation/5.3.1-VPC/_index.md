---
title: "VPC Networking"
date: 2026-07-02
weight: 31
chapter: false
pre: "<b>5.3.1. </b>"
---

## Objective of this Lab

In this lab, you will deploy the complete networking infrastructure for the Mini Social Network application using **AWS CloudFormation**.

Instead of manually creating AWS resources through the Management Console, the entire environment will be provisioned using **Infrastructure as Code (IaC)**, ensuring consistency, repeatability, and compliance with AWS architectural best practices.

---

## Learning Objectives

After completing this lab, you will be able to:

- Deploy a production-ready **Amazon VPC**
- Build a highly available **Multi-AZ** networking architecture
- Configure an **Internet Gateway**, **NAT Gateway**, and **Application Load Balancer (ALB)**
- Provision an **Amazon ECS Cluster**
- Configure an **Amazon S3 Gateway VPC Endpoint** to reduce NAT Gateway traffic and optimize AWS costs

---

## AWS Services Used

| Service | Purpose |
|---------|---------|
| Amazon VPC | Multi-AZ virtual network with public and private subnets |
| Internet Gateway | Internet access for public subnets |
| NAT Gateway | Secure outbound Internet access for private subnets |
| Application Load Balancer | Distributes traffic across backend containers |
| Amazon ECS Cluster | Container orchestration for the backend application |
| S3 Gateway VPC Endpoint | Optimizes S3 access from private subnets without NAT Gateway |
| AWS Certificate Manager | SSL/TLS certificate for HTTPS |
| AWS CloudFormation | Infrastructure as Code for automated provisioning |

---

# Step 1 – Prepare the Environment

Before deploying the networking stack, complete the following prerequisites.

1. Sign in to the **AWS Management Console**.
2. Switch to the **ap-southeast-1 (Singapore)** region.

{{% notice info %}}
📥 **CloudFormation Template**
Download the CloudFormation template before continuing.
**[Download minisocial-architect.yaml](/iac/final-minisocial-architect.yaml)**
{{% /notice %}}

---

## Request an SSL Certificate using AWS Certificate Manager (ACM)

To enable HTTPS on the Application Load Balancer, you must first request a public SSL/TLS certificate.

### 1. Open AWS Certificate Manager

Navigate to:

**AWS Certificate Manager → List certificates → Request**

![AWS Certificate Manager Dashboard](/images/5-Workshop/5.3-Phase1-Foundation/DashboardACM.png)
<center><i>AWS Certificate Manager – Dashboard overview.</i></center>

---

### 2. Choose the Certificate Type

Select:

- **Request a public certificate**

Click **Next**.

![Request Public Certificate](/images/5-Workshop/5.3-Phase1-Foundation/Request1_ACM.png)
<center><i>Selecting the public certificate request option.</i></center>

---

### 3. Configure the Certificate

Complete the certificate request using the following settings:

| Setting | Value |
|---------|-------|
| Domain Name | `minisocial-network.id.vn` *(replace with your own domain)* |
| Validation Method | DNS Validation (Recommended) |
| Key Algorithm | RSA 2048 |

Click **Request**.

Once the certificate has been created, copy its **Certificate ARN**, which looks similar to:

```text
arn:aws:acm:ap-southeast-1:123456789012:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

This ARN will be used in the next step.

![Certificate Details](/images/5-Workshop/5.3-Phase1-Foundation/Request2_ACM.png)
<center><i>Certificate details showing the ARN to copy.</i></center>

---

# Step 2 – Configure the ACM Certificate ARN

Store the Certificate ARN inside **AWS Systems Manager Parameter Store**.

Run the following command:

```bash
aws ssm put-parameter \
    --name "/minisocial/acm/certificate-arn" \
    --value "arn:aws:acm:ap-southeast-1:YOUR_ACCOUNT_ID:certificate/YOUR_CERTIFICATE_ID" \
    --type String \
    --overwrite
```

{{% notice info %}}
The CloudFormation template will automatically retrieve this value during deployment using the `AWS::SSM::Parameter::Value` parameter type.
{{% /notice %}}

---

# Step 3 – Deploy Stack 1 Using the AWS Console

Instead of using the AWS CLI, you can deploy the infrastructure directly from the AWS Management Console.

Navigate to:

**CloudFormation → Stacks → Create stack → With new resources (standard)**

### Prepare Template

1. Select **Choose an existing template**
2. Choose **Upload a template file**
3. Click **Choose file**
4. Select **final-minisocial-architect.yaml**

![Create CloudFormation Stack](/images/5-Workshop/5.3-Phase1-Foundation/Create_Stack.png)
<center><i>Uploading the CloudFormation template file.</i></center>

Click **Next**.

---

### Configure Stack

Enter the following stack name:

```text
MiniSocial-Network-Stack
```

Continue clicking **Next** through the remaining configuration pages.

Finally, review all settings and click **Submit** to start the deployment.

{{% notice info %}}
Deployment typically takes **5–10 minutes**. Do not close the browser tab while the stack is being created.
{{% /notice %}}

---

# Step 4 – Verify the Deployment

Wait until the CloudFormation stack reaches the **CREATE_COMPLETE** status.

![CloudFormation Deployment Complete](/images/5-Workshop/5.3-Phase1-Foundation/Complete_Stack.png)
<center><i>CloudFormation stack deployment completed successfully.</i></center>

---

## Review Stack Outputs

Open the **Outputs** tab and record the following values for future labs:

- VPC ID
- Public Subnet IDs
- Private Subnet IDs
- Security Group IDs
- ALB DNS Name

![Stack Outputs](/images/5-Workshop/5.3-Phase1-Foundation/Output_Stack1.png)
<center><i>CloudFormation stack Outputs tab showing deployed resource identifiers.</i></center>

---

## Verify AWS Resources

Confirm that the following resources have been created successfully:

| Resource | Expected Status |
|----------|-----------------|
| MiniSocial-VPC | Created |
| NAT Gateway | Available |
| Amazon ECS Cluster | Created |
| Application Load Balancer | Active |

---

### Quick Verification

{{% notice info %}}
Open the **Application Load Balancer DNS Name** in your browser.
If everything has been configured correctly, requests sent to **HTTP (Port 80)** will automatically be redirected to **HTTPS (Port 443)**.
{{% /notice %}}

---

## Verification Checklist

Before continuing to the next lab, confirm the following:

- ✅ CloudFormation Stack status is **CREATE_COMPLETE**
- ✅ Five subnets have been created across two Availability Zones
- ✅ Private Route Tables route outbound traffic through the NAT Gateway
- ✅ Amazon S3 Gateway VPC Endpoint has been associated successfully
- ✅ The Application Load Balancer automatically redirects HTTP (80) to HTTPS (443)
- ✅ The ECS Cluster has been created successfully

---

### Troubleshooting

{{% notice warning %}}
If your CloudFormation stack enters the **ROLLBACK_COMPLETE** state, verify the following:

- Your IAM User has sufficient permissions.
- The ACM Certificate ARN stored in AWS Systems Manager Parameter Store is correct.
- The ACM certificate exists in the **ap-southeast-1 (Singapore)** region.
- The CloudFormation template was uploaded successfully.
{{% /notice %}}

---

## Expected Outcome

After completing this lab, you will have successfully deployed the networking foundation for the Mini Social Network application, including:

- A production-ready **Amazon VPC**
- Multi-AZ **Public and Private Subnets**
- **Internet Gateway** and **NAT Gateway**
- **Application Load Balancer (ALB)** with HTTPS redirect
- **Amazon ECS Cluster**
- **Amazon S3 Gateway VPC Endpoint**
- HTTPS-enabled infrastructure using **AWS Certificate Manager**

{{% notice tip %}}
This networking foundation will be used throughout the remaining phases of the workshop, including deploying the database, backend services, frontend application, and monitoring infrastructure.
{{% /notice %}}