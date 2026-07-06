---
title: "WAF & Route 53 Configuration"
date: 2026-07-02
weight: 55
chapter: false
pre: "<b>5.5.5. </b>"
---

## Objective of this Lab

In this lab, you will enhance the security and accessibility of the Backend application.

First, you will create an **AWS WAF Web ACL** to protect the Application Load Balancer against common web attacks. Next, you will configure **Amazon Route 53** to map your custom domain name to the ALB, enabling secure **HTTPS** access.

---

## Learning Objectives

After completing this lab, you will be able to:

- Protect the Backend ALB using AWS WAF
- Configure managed security rules for common web attacks
- Create a Public Hosted Zone using Amazon Route 53
- Map your custom domain name to the Application Load Balancer
- Prepare the backend for secure HTTPS access

---

## AWS Services Used

| Service | Purpose |
|---------|----------|
| AWS WAF | Web Application Firewall for ALB protection |
| Application Load Balancer | Backend traffic distribution |
| Amazon Route 53 | DNS management for custom domain |
| Amazon Certificate Manager (ACM) | SSL/TLS certificate management |

---

# Step 1 – Create an AWS WAF Web ACL

Navigate to:

```text
AWS WAF
```

![AWS WAF Dashboard](/images/5-Workshop/5.5-Phase3-Backend-Deployment/DashboardWAF.png)

<center><i>Open the AWS WAF console to create a new Web ACL for protecting the Backend Application Load Balancer.</i></center>

---

Click:

```text
Create protection pack (Web ACL)
```

Configure the Web ACL.

![Create Web ACL](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateWAF_1.png)

<center><i>Create a new Web ACL and associate it with the Backend Application Load Balancer.</i></center>

Configure the following options:

| Setting | Value |
|----------|-------|
| Name | MiniSocial-Backend-WAF |
| Resource Type | Application Load Balancer |
| Application Category | Both API and Web |
| Associated Resource | Backend Application Load Balancer |

---

# Step 2 – Configure Security Rules

In the **Rules** section, we will add 4 rules (2 Custom Rules and 2 AWS Managed Rules).

### 2.1 Create Rule: PostAndProfile (Custom Rule)

First, create a rule to explicitly allow specific APIs through the WAF.
- Click **Add Rule** → **Add my own rules and rule groups** (Custom Rule).
- Configure the following settings:
  - **Rule Name**: `PostAndProfile`
  - **If a request**: `matches at least one of the statements (OR)`

![PostAndProfile Statement 1](/images/5-Workshop/5.5-Phase3-Backend-Deployment/RulePost%26Profile_1.png)
<center><i>Configure the first statement for the profile API.</i></center>

- **Statement 1**:
  - **Inspect**: `URI Path`
  - **Match type**: `Starts with string`
  - **String to match**: `/api/auth/profile`
- Click **Add another statement** to add the second condition:
  - **Inspect**: `URI Path`
  - **Match type**: `Starts with string`
  - **String to match**: `/api/posts`

![PostAndProfile Statement 2](/images/5-Workshop/5.5-Phase3-Backend-Deployment/RulePost%26Profile_2.png)
<center><i>Configure the second statement for the posts API and set the Action to Allow.</i></center>

- Select **Add rule** to finish creating the rule.

---

### 2.2 Create Rule: Block-DDoS-Login (Rate-based Rule)

This rule limits the number of requests to the Login API to mitigate DDoS or Brute Force attacks.
- Click **Add Rule** → **Add my own rules and rule groups** (Custom Rule).
- Select **Rate-based rule**.
- Configure the following settings:
  - **Rule Name**: `Block-DDoS-Login`
  - **Rate limit**: `100` (Maximum 100 requests)
  - **Evaluation window**: `5 minutes`
  - **Request criteria**: Select `Only consider requests that match the criteria in a rule statement`

![Block DDoS Login 1](/images/5-Workshop/5.5-Phase3-Backend-Deployment/Block-DDoS-Login_1.png)
<center><i>Configure the rate limit specifically for the Login API.</i></center>

- In the Statement configuration below:
  - **If a request**: `matches the statement`
  - **Inspect**: `URI path`
  - **Match type**: `Starts with string`
  - **String to match**: `/api/auth/login`

![Block DDoS Login 2](/images/5-Workshop/5.5-Phase3-Backend-Deployment/Block-DDoS-Login_2.png)
<center><i>Define the matching statement and set the Action to Block for requests exceeding the limit.</i></center>

- Select **Add Rule** to finish creating the rule.

---

### 2.3 Add AWS Managed Rules

Next, add AWS Managed Rules to protect against common web exploits:
- Click **Add Rule** → **Add managed rule groups**.
- Add the following two rules:
  - **AWS Managed Rules Common Rule Set**
  - **AWS Managed Rules SQL Injection Rule Set**

Once completed, your Web ACL should list all 4 rules, similar to the following:

![WAF Rules](/images/5-Workshop/5.5-Phase3-Backend-Deployment/RuleWAF.png)
<center><i>Combine custom and managed rules to comprehensively protect the Backend API.</i></center>

---

{{% notice tip %}}

AWS Managed Rules are maintained automatically by AWS and receive regular security updates without requiring manual intervention.

{{% /notice %}}

---

# Step 3 – Create an Amazon Route 53 Hosted Zone

Navigate to:

```text
Amazon Route 53
    └── Hosted Zones
```

![Route 53 Dashboard](/images/5-Workshop/5.5-Phase3-Backend-Deployment/R53Dashboard.png)

<center><i>Open Amazon Route 53 and create a Hosted Zone for your domain.</i></center>

Click:

```text
Create hosted zone
```

Configure the Hosted Zone using the following values:

| Setting | Value |
|----------|-------|
| Domain Name | minisocial-network.id.vn |
| Type | Public Hosted Zone |

![Create Hosted Zone](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateR53.png)

<center><i>Create a Public Hosted Zone for your custom domain.</i></center>

Click:

```text
Create hosted zone
```

Wait until the Hosted Zone has been created successfully.

![Hosted Zone Created](/images/5-Workshop/5.5-Phase3-Backend-Deployment/R53Dashboard_2.png)

<center><i>The Hosted Zone is now ready for creating DNS records.</i></center>

---

{{% notice warning %}}

After creating the Hosted Zone, copy the four **Name Server (NS)** records displayed in the **Details** section.
Update these Name Servers at your domain registrar (where you purchased your domain name).
DNS propagation may take several minutes to several hours before the changes become effective worldwide.

{{% /notice %}}

---

# Step 4 – Create an Alias Record for the ALB

Open your Hosted Zone.

Click:

```text
Create record
```

Configure the record as follows:

| Setting | Value |
|----------|-------|
| Record Name | Leave blank (Root Domain) |
| Record Type | A |
| Alias | Yes |
| Route Traffic To | Alias to Application Load Balancer |
| Region | ap-southeast-1 |
| Load Balancer | MiniSocial ALB |

![Create DNS Record](/images/5-Workshop/5.5-Phase3-Backend-Deployment/Create_Record.png)

<center><i>Create an Alias A Record pointing your custom domain to the Backend Application Load Balancer.</i></center>

Click:

```text
Create records
```

---

## Verification Checklist

Verify the following before continuing:

- ✅ AWS WAF Web ACL has been created
- ✅ The Web ACL is associated with the Backend ALB
- ✅ Managed Rules are enabled
- ✅ Route 53 Hosted Zone has been created
- ✅ Alias Record points to the Application Load Balancer
- ✅ Four Name Server (NS) records have been updated at the domain registrar
- ✅ HTTPS is accessible using your custom domain

---

{{% notice tip %}}

Congratulations!
Your Backend application is now protected by **AWS WAF**, accessible through your own domain name using **Amazon Route 53**, and secured with **HTTPS** using the ACM certificate created earlier.
You have now completed a production-ready Backend deployment with networking, security, CI/CD, DNS, and SSL fully integrated.

{{% /notice %}}