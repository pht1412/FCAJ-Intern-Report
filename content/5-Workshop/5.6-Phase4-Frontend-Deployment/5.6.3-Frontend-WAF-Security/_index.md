---
title: "Frontend WAF Security"
date: 2026-07-02
weight: 563
chapter: false
pre: "<b>5.6.3. </b>"
---

## Objective of this Lab

In this final lab of Phase 4, you will secure your Serverless Frontend by attaching an AWS Web Application Firewall (WAF) to your CloudFront distribution. 

This will protect your React Single Page Application (SPA) from common web exploits, bots, and malicious traffic before it reaches your backend systems.

---

## Learning Objectives

After completing this lab, you will be able to:

- Create an AWS WAF Web ACL in the Global (CloudFront) scope
- Attach managed security rule groups to protect against common vulnerabilities
- Associate an AWS WAF Web ACL with an Amazon CloudFront distribution
- Verify the active protection of the frontend website

---

## AWS Services Used

| Service | Purpose |
|---------|----------|
| AWS WAF | Web Application Firewall for protecting the frontend |
| Amazon CloudFront | Content Delivery Network acting as the WAF integration point |

---

{{% notice warning %}}
**CRITICAL REGION & SCOPE REQUIREMENT:** 
Amazon CloudFront is a global service. Therefore, to attach a WAF to CloudFront, the Web ACL **MUST** be created in the **Global (CloudFront)** scope, which is centrally managed out of the **US East (N. Virginia) `us-east-1`** region. If you create a "Regional" WAF, you will not be able to attach it to your CloudFront distribution!
{{% /notice %}}

---

# Step 1 – Navigate to AWS WAF and Set the Scope

1. Log in to the AWS Management Console and ensure your region in the top right corner is set to **US East (N. Virginia) `us-east-1`**.
2. Search for and open **WAF & Shield**.
3. On the left navigation pane, click on **Web ACLs** (or Protection packs).
4. **CRITICAL:** Before clicking create, look at the **Region** dropdown menu (usually located near the top or next to the search bar) and select **Global (CloudFront)**.

---

# Step 2 – Create the Web ACL

1. Click the orange **Create protection pack (web ACL)** or **Create web ACL** button.
2. In the "Tell us about your app" section:
   - **App category:** Select the category that best fits your application (e.g., Social Networking or General Web).
   - **App focus:** Select **Both API and web** (as your frontend interacts heavily with the backend API).
   ![Create WAF Protection Pack](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/CreateWAF_Frontend.png)
   <center><i>Select the appropriate categories for your frontend application.</i></center>

3. **Select resources to protect:** Click **Add AWS resources**, choose **Amazon CloudFront distribution**, and select the `MiniSocial-Frontend` distribution you created in **Lab 5.6.1**.
4. **Name and describe:** Name your Web ACL exactly `MiniSocial-Frontend-WAF`.

---

# Step 3 – Configure Security Rules

AWS WAF operates based on rules. We will add a foundational managed rule set provided by AWS to block common vulnerabilities.

1. Proceed to the **Add rules and rule groups** section.
2. Click **Add rules** > **Managed rule groups**.
3. Expand **AWS managed rule groups**.
4. Find the **Core rule set** (often displayed as `AWS-AWSManagedRulesCommonRuleSet`) and toggle it to **Add to web ACL**. This rule set provides out-of-the-box protection against a wide variety of common threats, including the OWASP Top 10.
   ![WAF Rules Frontend](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/WAF_Frontend_Rules.png)
   <center><i>Add the Core rule set to protect against common web vulnerabilities.</i></center>

5. Scroll down to the default web ACL action and ensure it is set to **Allow** (this means traffic is allowed unless a rule specifically blocks it).
6. Click **Next** through the priority and metrics screens (leave as default).
7. Review your configuration and click **Create web ACL**.

---

## Verification Checklist

Before considering this phase complete, verify the following:

- ✅ Web ACL is created in the **Global (CloudFront)** scope
- ✅ The Web ACL is named `MiniSocial-Frontend-WAF`
- ✅ The Web ACL is actively associated with the Frontend CloudFront distribution
- ✅ The **Core rule set** is attached and enabled

---

## Verify Frontend Access

Open your browser and navigate to your custom domain:

```text
https://minisocial-network.id.vn
```

Your frontend should load normally, but it is now actively shielded by AWS WAF!

---

{{% notice tip %}}
Congratulations! You have successfully deployed, automated, and secured the frontend of the Mini Social Network. The entire system (Backend, Frontend, CI/CD, and Security) is now fully operational in the AWS Cloud.
{{% /notice %}}