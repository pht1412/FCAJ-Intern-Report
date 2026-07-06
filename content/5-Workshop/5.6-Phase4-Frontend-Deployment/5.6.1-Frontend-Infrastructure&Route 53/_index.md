---
title: "Frontend Infrastructure & Route 53"
date: 2026-07-02
weight: 561
chapter: false
pre: "<b>5.6.1. </b>"
---

## Objective of this Lab

In this lab, you will deploy the serverless infrastructure required for the MiniSocial Frontend using AWS CloudFormation.

The deployment includes an Amazon S3 bucket for storing the static website files and an Amazon CloudFront distribution for global content delivery. Finally, you will configure Amazon Route 53 so that your custom domain points directly to the CloudFront distribution.

---

## Learning Objectives

After completing this lab, you will be able to:

- Request an SSL/TLS certificate using AWS Certificate Manager (ACM)
- Store the ACM Certificate ARN in AWS Systems Manager Parameter Store
- Deploy the Frontend infrastructure using AWS CloudFormation
- Provision an Amazon S3 bucket and Amazon CloudFront distribution
- Configure Amazon Route 53 to route your custom domain to CloudFront

---

## AWS Services Used

| Service | Purpose |
|---------|----------|
| AWS Certificate Manager (ACM) | Issue SSL/TLS certificate for HTTPS |
| AWS Systems Manager Parameter Store | Store ACM Certificate ARN securely |
| AWS CloudFormation | Infrastructure as Code |
| Amazon S3 | Store static frontend files |
| Amazon CloudFront | Content Delivery Network |
| Amazon Route 53 | DNS routing to CloudFront |

---

{{% notice warning %}}

**Critical Region Requirement:**
Amazon CloudFront only supports SSL/TLS certificates issued by AWS Certificate Manager (ACM) in the **US East (N. Virginia) (`us-east-1`)** Region.
For this reason, the entire Frontend infrastructure in this lab must be deployed in **`us-east-1`**.

{{% /notice %}}

---

# Step 1 – Request an ACM Certificate

Switch your AWS Console Region to:

```text
US East (N. Virginia)
us-east-1
```

Navigate to:

```text
AWS Certificate Manager (ACM)
    └── Request a certificate
```

![Request ACM Certificate](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/RequestACM.png)

<center><i>Request a new public SSL/TLS certificate using AWS Certificate Manager.</i></center>

---

Choose:

```text
Request a public certificate
```

Click **Next**.

Configure the certificate using the following values.

| Setting | Value |
|---------|-------|
| Fully qualified domain name | Your domain (for example: `minisocial-network.id.vn`) |
| Validation Method | DNS validation (Recommended) |
| Key Algorithm | RSA 2048 |

![Configure ACM Certificate](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/SendRequestACM.png)

<center><i>Configure the public certificate using DNS validation.</i></center>

---

Click:

```text
Request
```

After the certificate has been issued, open the ACM Dashboard.

Copy the **Certificate ARN**.

![ACM Dashboard](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/DashboardACM.png)

<center><i>Copy the ACM Certificate ARN after the certificate has been successfully issued.</i></center>

---

# Step 2 – Store the Certificate ARN in Parameter Store

Remain in the **US East (N. Virginia) (`us-east-1`)** Region.

Navigate to:

```text
AWS Systems Manager
    └── Parameter Store
            └── Create parameter
```

Create the parameter using the following values.

| Setting | Value |
|---------|-------|
| Name | `/minisocial/frontend/acm-certificate-arn` |
| Type | String |
| Value | Paste the ACM Certificate ARN copied from Step 1 |

Click:

```text
Create parameter
```

---

{{% notice tip %}}

Storing the Certificate ARN inside **AWS Systems Manager Parameter Store** allows CloudFormation templates to retrieve the certificate automatically without hardcoding sensitive resource identifiers.

{{% /notice %}}

---

# Step 3 – Deploy the Frontend CloudFormation Stack

{{% notice info %}}
📥 **CloudFormation Template**
Download the Frontend CloudFormation template before continuing.
**[Download minisocial-frontend+cloudfront.yaml](/iac/final-minisocial-frontend+cloudfront.yaml)**
{{% /notice %}}

Ensure that you are still using the **US East (N. Virginia) (`us-east-1`)** Region.

Navigate to:

```text
CloudFormation
    └── Stacks
            └── Create stack
                    └── With new resources (standard)
```

Choose:

```text
Upload a template file
```

Upload:

```text
minisocial-frontend+cloudfront.yaml
```

Click **Next**.

![Create Frontend Stack](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/CreateStack_FE.png)

<center><i>Upload the Frontend CloudFormation template.</i></center>

---

Configure the stack using the following values.

| Setting | Value |
|---------|-------|
| Stack Name | MiniSocial-Frontend-Stack |
| FrontendDomainName | Your custom domain (for example: `minisocial-network.id.vn`) |
| ACM Parameter Path | Keep the default value |

![Configure Frontend Stack](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/CreateStack_FE_2.png)

<center><i>Provide the Frontend domain name and keep the default SSM Parameter path.</i></center>

---

Click **Next** through the remaining pages.

Finally click:

```text
Submit
```

Wait until the stack reaches the following status:

```text
CREATE_COMPLETE
```

CloudFront distributions typically require **5–10 minutes** to finish deployment.

---

Open the **Outputs** tab of the CloudFormation stack.

Record the following values:

- FrontendBucketName
- CloudFrontDistributionId

These outputs will be required when configuring the Jenkins Pipeline in the next lab.

---

# Step 4 – Configure Amazon Route 53

Navigate to:

```text
Amazon Route 53
    └── Hosted zones
```

Open the Hosted Zone that you created during **Phase 3**.

Click:

```text
Create record
```

Configure the record using the following settings.

| Setting | Value |
|---------|-------|
| Record Name | Leave blank |
| Record Type | A – Routes traffic to an IPv4 address and some AWS resources |
| Alias | Enabled |
| Route Traffic To | Alias to CloudFront distribution |
| Value | Select your newly created CloudFront distribution |

![Configure Route 53](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/DashboardR53.png)

<center><i>Create an Alias A Record that routes your custom domain to the CloudFront distribution.</i></center>

---

Click:

```text
Create records
```

---

## Verification Checklist

Before continuing, verify the following:

- ✅ ACM Certificate has been successfully issued
- ✅ Certificate ARN has been stored in Parameter Store
- ✅ Frontend CloudFormation Stack status is **CREATE_COMPLETE**
- ✅ Amazon S3 bucket has been created
- ✅ Amazon CloudFront distribution has been deployed
- ✅ Route 53 Alias Record points to the CloudFront distribution
- ✅ CloudFormation Outputs include **FrontendBucketName** and **CloudFrontDistributionId**

---

## Verify the Frontend Endpoint

Wait several minutes for DNS propagation.

Open your web browser and navigate to:

```text
https://your-domain-name
```

For example:

```text
https://minisocial-network.id.vn
```

At this stage, you should see either an **Access Denied** message or a blank page.

This is expected because the Amazon S3 bucket has not yet received the frontend application files.

In the next lab, Jenkins will automatically build the React application and upload the generated files to the S3 bucket.

---

{{% notice tip %}}

Congratulations!
You have successfully provisioned the complete serverless infrastructure for the MiniSocial Frontend.
In the next lab, you will configure a Jenkins CI/CD Pipeline to automatically build the React application, upload it to Amazon S3, and invalidate the Amazon CloudFront cache after every deployment.

{{% /notice %}}