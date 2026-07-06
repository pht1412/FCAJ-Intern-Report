---
title: "Jenkins Preparation"
date: 2026-07-02
weight: 41
chapter: false
pre: "<b>5.4.1. </b>"
---

## Objective of this Lab

In this lab, you will prepare your local **Jenkins CI/CD environment** for deploying applications to AWS.

Instead of installing every available plugin, you will optimize Jenkins by keeping only the plugins required for this workshop. You will also configure **AWS Credentials** securely using the Jenkins Credentials Store and verify that Jenkins can successfully communicate with your AWS account.

---

## Learning Objectives

After completing this lab, you will be able to:

- Optimize Jenkins by keeping only the required plugins
- Configure secure **AWS Credentials** in Jenkins
- Verify Jenkins connectivity with AWS
- Configure the required build tools for Windows
- Prepare Jenkins for the Backend and Frontend deployment pipelines

---

## Tools & Resources Used

| Tool / Resource | Purpose |
|-----------------|---------|
| Jenkins Plugin Manager | Install, update, and remove Jenkins plugins |
| Jenkins Credentials Store | Securely store AWS keys and secrets |
| Global Tool Configuration | Configure build tools (Maven, JDK, etc.) |
| Pipeline Job | Jenkins Pipeline as Code execution |
| AWS CLI | Command-line access to AWS services |
| IAM User Access Keys | Programmatic authentication to AWS |

---

# Step 1 – Review Installed Plugins

Before configuring Jenkins, review the installed plugins to ensure your environment is lightweight, secure, and production-ready.

Navigate to:

```text
Manage Jenkins
    └── Plugins
            └── Installed Plugins
```

![Installed Jenkins Plugins](/images/5-Workshop/5.4-Phase2-CICD-Setup/InstalledJenkins.png)
<center><i>Review the installed plugins before configuring Jenkins.</i></center>

Review your plugins using the following recommendations.

## Keep Required Plugins

Retain the following plugins:

| Plugin | Purpose |
|--------|---------|
| Pipeline | Enables Pipeline as Code (Jenkinsfile) |
| Credentials Binding | Securely injects credentials into build steps |
| Config File Provider | Manages configuration files across pipelines |
| Git | Source code management integration |
| Amazon Web Services SDK 2 | AWS API access from Jenkins |
| JUnit | Test result reporting |

## Remove Unused Plugins

If they are not required in your environment, consider removing plugins such as:

- Ant
- Gradle
- Other unused plugins

Also review plugins that display security warnings and update or remove them whenever possible.

## Update Plugins

Select **Update All** to install the latest security patches and bug fixes before continuing.

---

# Step 2 – Configure AWS Credentials

Jenkins requires AWS credentials to provision infrastructure and deploy applications.

Navigate to:

```text
Manage Jenkins
    └── Credentials
            └── System
                    └── Global Credentials
```

![Open Jenkins Credentials](/images/5-Workshop/5.4-Phase2-CICD-Setup/ConfigCred_1.png)
<center><i>Navigate to the Global Credentials page where Jenkins securely stores sensitive information.</i></center>

Click **Add Credentials**.

Configure the credential using the following settings:

| Field | Value |
|-------|-------|
| Kind | AWS Credentials |
| Access Key ID | Your AWS Access Key |
| Secret Access Key | Your AWS Secret Key |
| ID | `aws-credentials` |
| Description | AWS Credentials for MiniSocial |

![Configure AWS Credentials](/images/5-Workshop/5.4-Phase2-CICD-Setup/ConfigCred_2.png)
<center><i>Configure AWS Credentials using the IAM Access Key and Secret Access Key created during the Prerequisites phase.</i></center>

Click **Create** to save the credential.

{{% notice warning %}}
**Never** hard-code your AWS Access Key or Secret Access Key inside a Jenkinsfile.
Always store sensitive information using **Jenkins Credentials**.
{{% /notice %}}

---

# Step 3 – Verify Windows Environment Variables

Because Jenkins is installed directly on your local Windows machine, it automatically inherits the system **Environment Variables (PATH)**.

Before creating any deployment pipelines, verify that the required command-line tools are accessible from Windows.

Open **Command Prompt (CMD)** or **PowerShell**, then run:

```cmd
docker --version
aws --version
mvn --version
git --version
java --version
```

Each command should return its corresponding version number without any errors.

{{% notice info %}}
Jenkins Windows Services inherit the system **PATH** environment variable.
If any command returns **'is not recognized as an internal or external command'**, verify that the software is installed correctly and its installation directory has been added to the Windows **PATH** environment variable.
{{% /notice %}}

---

# Step 4 – Verify System Readiness

Before proceeding to the Backend Pipeline lab, perform one final verification to ensure your Jenkins environment is fully configured.

## Verify AWS Credentials

Navigate to:

```text
Manage Jenkins
    └── Credentials
            └── System
                    └── Global Credentials
```

Confirm that an AWS credential exists with the following ID:

```text
aws-credentials
```

This is the credential referenced throughout the Jenkins Pipelines in this workshop.

---

## Verify Plugin Security

Navigate to:

```text
Manage Jenkins
    └── Plugins
```

Ensure that:

- No critical security warnings are displayed
- Installed plugins are up to date
- No unnecessary plugins remain installed

Keeping Jenkins updated reduces security risks and improves pipeline stability.

---

## Verification Checklist

Before continuing, verify that:

- ✅ AWS Credentials (`aws-credentials`) have been created
- ✅ Docker, AWS CLI, Maven, Git, and Java are available from the Windows command line
- ✅ Jenkins plugins are fully updated
- ✅ No critical plugin security warnings are present
- ✅ Jenkins is ready to execute Windows batch commands (`bat`) inside Pipeline jobs

{{% notice tip %}}
Once this lab is complete, Jenkins is fully prepared to build source code, create Docker images, and deploy applications to AWS automatically in the upcoming **Backend and Frontend Pipeline** labs.
{{% /notice %}}