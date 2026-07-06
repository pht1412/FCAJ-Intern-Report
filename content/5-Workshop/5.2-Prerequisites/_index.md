---
title: "Prerequisites"
date: 2026-07-02
weight: 2
chapter: false
pre: "<b>5.2.</b> "
---


## Objective of this Lab

Before starting this workshop, your local computer must be prepared to act as a **CI/CD server** capable of building and deploying applications to AWS.

This section walks you through every tool and account you need to set up before moving to the infrastructure and deployment phases.

---

## Learning Objectives

After completing this section, you will have:

- An AWS IAM User with administrator privileges
- A registered domain name ready for Route 53 and ACM configuration
- All required development tools installed and verified
- A local Jenkins server configured and accessible
- The MiniSocial source code cloned to your machine

---

## Prerequisites Overview

| Component | Purpose |
|-----------|---------|
| AWS IAM User | Allows Jenkins to deploy resources to AWS |
| Custom Domain | Required for Amazon Route 53, AWS Certificate Manager (ACM), HTTPS, Application Load Balancer, and Amazon CloudFront |
| GitHub Account | Required to fork, manage, and host the project source code |
| Git | Source code management |
| Java 17 | Build Spring Boot applications |
| Apache Maven | Backend build tool |
| Node.js (LTS) | Build React applications |
| Docker Desktop | Build and run containers |
| Jenkins | CI/CD automation server |
| Code Editor | Visual Studio Code, IntelliJ IDEA, or any preferred editor |

---

# Step 1 – Prepare AWS Account & IAM User

Because Jenkins will provision infrastructure and deploy applications on your behalf, it requires **programmatic access** to AWS.

## Create an IAM User

1. Sign in to the AWS Management Console.
2. Open **IAM (Identity and Access Management)**.
3. Navigate to **Users → Create user**.
4. Enter a username (for example: **MiniSocial-Admin**).
5. Do **not** enable AWS Management Console access.
6. Select **Attach policies directly**.
7. Attach the **AdministratorAccess** policy.
8. Finish creating the user.

![IAM User Permission](/images/5-Workshop/5.2-Prerequisite/PermissionIAM.png)
<center><i>Creating an IAM User with the AdministratorAccess policy.</i></center>

## Create Access Keys

1. Open the newly created IAM User.
2. Go to **Security credentials**.
3. Click **Create access key**.
4. Choose **Application running outside AWS**.
5. Download the **CSV file** or securely save the following:

- Access Key ID
- Secret Access Key

![AWS Access Key Creation](/images/5-Workshop/5.2-Prerequisite/SecretKey.png)
<center><i>Creating an AWS Access Key for an application running outside AWS.</i></center>

{{% notice warning %}}
These credentials will be required when configuring Jenkins in the CI/CD Setup phase. **Never share them publicly.**
{{% /notice %}}

---

# Step 2 – Prepare Domain Name & Code Editor

Before deploying the application to AWS, you need a valid domain name and a code editor for modifying configuration files.

## Custom Domain Name

This workshop deploys a production-ready environment secured with **HTTPS** using **AWS Certificate Manager (ACM)**.

A valid domain name is required because:

- Amazon Route 53 manages DNS records.
- AWS Certificate Manager (ACM) issues SSL/TLS certificates.
- Application Load Balancer (ALB) serves HTTPS traffic.
- Amazon CloudFront delivers content securely over HTTPS.

You may use:

- A domain purchased from Namecheap, GoDaddy, Hostinger, etc.
- A free or low-cost domain (for example, **.id.vn**) if available.

{{% notice info %}}
You must have permission to manage the DNS records of your domain, either through Amazon Route 53 or your domain registrar.
{{% /notice %}}

## Code Editor

Throughout this workshop, you will modify configuration files such as:

- Jenkinsfile
- CloudFormation YAML templates
- Environment configuration files

Install one of the following editors:

- Visual Studio Code (Recommended)
- IntelliJ IDEA
- Any text editor of your choice

---

# Step 3 – Install Local Development Tools

Since this workshop follows a **Build on Host** approach, Jenkins executes build commands directly on your Windows machine before packaging Docker images.

Install the following software:

| Software | Requirement |
|----------|-------------|
| Git | Git for Windows |
| Java | Oracle JDK 17 or Amazon Corretto 17 |
| Maven | Latest stable version |
| Node.js | LTS Version |
| Docker Desktop | Windows Edition |

Remember to configure:

- `JAVA_HOME`
- Windows `PATH`
- Docker Desktop running

## Verify Installation

Open **Command Prompt** and run:

```bash
git --version
java -version
mvn -version
node -v
docker -v
```

{{% notice info %}}
All five commands should return valid version numbers. If any command fails, revisit the installation steps before continuing.
{{% /notice %}}

---

# Step 4 – Install & Configure Jenkins

Download the Windows installer (.msi) from the official Jenkins website and complete the installation.

## Configure Docker Permissions

By default, Jenkins runs as the **Local System** account, which cannot communicate with Docker Desktop.

Update the Jenkins service to run under your Windows user account.

### Steps

1. Press **Win + R**
2. Run:

```text
services.msc
```

3. Open **Jenkins Properties**
4. Select the **Log On** tab
5. Choose **This account**
6. Browse and select your Windows user
7. Enter your Windows password
8. Apply changes
9. Restart the Jenkins service

![Configure Jenkins Windows Service](/images/5-Workshop/5.2-Prerequisite/Config_Jenkins.png)
<center><i>Configure the Jenkins Windows Service to run using the current Windows user account instead of the Local System account.</i></center>

---

## Complete Jenkins Setup

Visit:

```text
http://localhost:14124
```

Unlock Jenkins using:

```text
C:\ProgramData\Jenkins\.jenkins\secrets\initialAdminPassword
```

Then install the **Suggested Plugins**.

---

# Step 5 – Prepare Project Source Code

To follow this workshop, you first need a copy of the project repository in your own GitHub account.

## Official Repository

The source code for this workshop is available at:

```text
https://github.com/pht1412/Mini-social-network
```

## Fork the Repository

1. Open the repository above in your browser.
2. Click the **Fork** button in the upper-right corner.
3. Select your GitHub account as the destination.
4. Wait until GitHub finishes creating your copy.

## Clone Your Fork

Open your terminal and clone your forked repository:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Mini-social-network.git

cd Mini-social-network
```

Your local repository is now ready for the next phases of the workshop.

---

# Verification Checklist

Before continuing, confirm the following:

- ✅ AWS Access Key and Secret Key are safely stored.
- ✅ A registered domain name is available, and you have access to manage its DNS records.
- ✅ A code editor (Visual Studio Code or IntelliJ IDEA) is installed.
- ✅ Git, Java, Maven, Node.js and Docker are installed successfully.
- ✅ Jenkins Dashboard is accessible at **http://localhost:14124**.
- ✅ Mini-social-network source code has been cloned successfully.

{{% notice tip %}}
If every item above is completed, your development environment is ready for **Phase 1 – Foundation**.
{{% /notice %}}