---
title: "Grafana & CloudWatch Monitoring"
date: 2026-07-02
weight: 571
chapter: false
pre: "<b>5.7.1. </b>"
---

## Objective of this Lab

In this lab, you will integrate **Amazon CloudWatch** with **Grafana Cloud** to build a real-time monitoring dashboard for your **MiniSocial** application.

You will configure CloudWatch as a Grafana data source, create a dashboard to monitor your infrastructure, configure email alerts for abnormal traffic, and finally perform a load test using **K6** to observe how your application behaves under heavy traffic.

Upon completing this lab, you will have a centralized monitoring solution capable of visualizing application metrics, detecting abnormal traffic, and notifying administrators automatically.

---

## Learning Objectives

After completing this lab, you will be able to:

- Connect **Amazon CloudWatch** to **Grafana Cloud**
- Monitor metrics from ALB, Amazon ECS (Fargate), and Amazon RDS
- Build a real-time monitoring dashboard with multiple queries
- Configure automated email alerts
- Perform a load test using **K6**
- Analyze infrastructure performance and auto-scaling under heavy traffic

---

## AWS Services & Tools Used

| Service / Tool | Purpose |
|----------------|---------|
| Grafana Cloud | Centralized real-time monitoring dashboard |
| Amazon CloudWatch | Application and infrastructure metrics collection |
| Amazon ECS (Fargate) | Containerized application to be monitored |
| Amazon RDS | Database instance to be monitored |
| Application Load Balancer (ALB) | Traffic distribution to be monitored |
| IAM Access Keys | Grafana authentication to access CloudWatch securely |
| Grafana K6 | Open-source load testing tool |

---

# Step 1 – Create AWS Credentials for Grafana

Grafana requires AWS credentials with permission to read CloudWatch metrics.

Log in to the **AWS Management Console**, then navigate to:

```text
IAM
└── Users
    └── Your IAM User
        └── Security credentials
```

Scroll down to the **Access keys** section.

Click:

```text
Create access key
```

Choose:

```text
Third-party service
```

Generate the credentials and save the following values securely:

- Access Key ID
- Secret Access Key

{{% notice warning %}}
The **Secret Access Key** is displayed **only once**.
Store it securely before leaving this page.
{{% /notice %}}

---

# Step 2 – Connect Amazon CloudWatch to Grafana

Sign in to your **Grafana Cloud** account.

Navigate to:

```text
Connections
└── Data sources
    └── Add data source
```

Search for:

```text
CloudWatch
```

Configure the data source using the following settings:

| Setting | Value |
|----------|-------|
| Authentication Provider | Access & secret key |
| Access Key ID | Your AWS Access Key |
| Secret Access Key | Your AWS Secret Access Key |
| Default Region | ap-southeast-1 (or your deployment region) |

Click:

```text
Save & Test
```

If the configuration is successful, Grafana displays:

```text
Data source is working
```

---

# Step 3 – Build the Stress Test Dashboard

Navigate to:

```text
Dashboards
└── New dashboard
    └── Add visualization
```

Select the **CloudWatch** data source.

Create a new dashboard row named:

```text
Stress Test Panel
```

### Selecting the Correct Dimensions

{{% notice info %}}
Since you authenticated Grafana using the correct IAM Access Key and Secret Access Key, Grafana automatically discovers your AWS resources.
{{% /notice %}}

For every monitoring panel below:
- **Do not manually type resource names.**
- Click the **Dimension** dropdown.
- Select the corresponding resources that belong to your **MiniSocial** project.

These include:
- Application Load Balancer
- ECS Cluster
- ECS Service
- RDS Database Instance

Selecting an incorrect dimension (or leaving it empty) will prevent Grafana from displaying metrics.

---

## Panel 1 – ALB Throughput

Configure the following query:

| Setting | Value |
|----------|-------|
| Namespace | AWS/ApplicationELB |
| Metric | RequestCount |
| Dimension | LoadBalancer = *Select your MiniSocial ALB* |
| Statistic | Sum |
| Period | 1 minute |

---

## Panel 2 – ALB HTTP 5xx Errors

Create **two queries**.

### Query A
| Setting | Value |
|----------|-------|
| Namespace | AWS/ApplicationELB |
| Metric | HTTPCode_Target_5XX_Count |
| Dimension | LoadBalancer = *Select your MiniSocial ALB* |

### Query B
| Setting | Value |
|----------|-------|
| Namespace | AWS/ApplicationELB |
| Metric | HTTPCode_ELB_5XX_Count |
| Dimension | LoadBalancer = *Select your MiniSocial ALB* |

For both queries, use:
| Setting | Value |
|----------|-------|
| Statistic | Sum |
| Period | 1 minute |

---

## Panel 3 – Amazon ECS Compute Utilization

Create two queries to monitor ECS resource usage.

### CPU Utilization
| Setting | Value |
|----------|-------|
| Namespace | AWS/ECS |
| Metric | CPUUtilization |

### Memory Utilization
| Setting | Value |
|----------|-------|
| Namespace | AWS/ECS |
| Metric | MemoryUtilization |

Use the following dimensions for **both** queries:
| Dimension | Value |
|------------|-------|
| ClusterName | Select your ECS Cluster |
| ServiceName | Select your ECS Service |

Configure:
| Setting | Value |
|----------|-------|
| Statistic | Average |
| Period | 1 minute |

---

## Panel 4 – Amazon RDS Database Connections

Configure the panel as follows:

| Setting | Value |
|----------|-------|
| Namespace | AWS/RDS |
| Metric | DatabaseConnections |
| Dimension | DBInstanceIdentifier = *Select your RDS Instance* |
| Statistic | Average (or Maximum) |
| Period | 1 minute |

---

## Expected Dashboard

After completing all four panels, your dashboard should provide real-time visibility into:

- Incoming application traffic (ALB)
- HTTP 5xx errors
- ECS CPU utilization
- ECS memory utilization
- RDS Database connections

---

# Step 4 – Configure Email Alerts

Grafana can automatically notify administrators whenever traffic exceeds a specified threshold.

Navigate to:

```text
Alerting
└── Contact points
```

Click:

```text
Add contact point
```

Configure the contact point:

| Setting | Value |
|----------|-------|
| Integration | Email |
| Email Address | Your email address |

Click:

```text
Test
```

Confirm that the test email is received successfully. Save the contact point.

---

Next, navigate to:

```text
Alerting
└── Alert rules
    └── New alert rule
```

Create a new alert using the **RequestCount** query from **Panel 1**.

Configure the rule:

| Setting | Value |
|----------|-------|
| Condition | IS ABOVE |
| Threshold | 500000 |
| Evaluation Interval | 1 minute |
| Folder | LoadTest-Alerts |

Save the alert rule.

---

# Step 5 – Install K6 via Windows Terminal

To execute the load test, you need to install K6 on your local machine.

### 1. Open Windows Terminal
You can open the terminal using one of the following methods:
- Press the **Windows** key → type `Windows Terminal`.
- Or open **PowerShell**.
- Or open **Command Prompt (CMD)**.

*Running as Administrator is not required, but if you encounter permission errors, select **Run as administrator**.*

### 2. Check WinGet
Type the following command to verify WinGet:
```bash
winget --version
```
- If a version is displayed (e.g., `v1.12.350`), proceed to the next step.
- If the system returns `'winget' is not recognized...`, you need to install **App Installer** from the Microsoft Store before continuing.

### 3. Install K6
Run the following command to install K6:
```bash
winget install --id GrafanaLabs.k6 --exact
```
If prompted with `Do you agree?`, type `Y` and press **Enter**.
WinGet will automatically download K6, install it, and add it to your system PATH.

### 4. Verify Installation
- Close the current Terminal window.
- Open a new Terminal.
- Type the following command:
```bash
k6 version
```
If the output resembles `k6 v2.1.0`, the installation was successful.

### 5. Troubleshooting (If K6 is not found)
If you encounter the error `'k6' is not recognized...`, try the following solutions:
- **Solution 1:** Close all Terminal windows and open a new one.
- **Solution 2:** Restart your computer.
- **Solution 3:** Check the system PATH by running:
```bash
where k6
```
If the output shows `C:\Program Files\k6\k6.exe`, the PATH is configured correctly.

---

# Step 6 – Execute the K6 Load Test

To evaluate the monitoring dashboard, you will execute a load test against your **MiniSocial** application using the provided K6 script.

### 1. Prepare the Test File

Download the following files:
- **normal-flow.js** – Simulates typical user activity and generates realistic application traffic.
- **ddos-flow.js** *(Optional)* – Simulates a distributed denial-of-service attack.

{{% notice info %}}
**[Download the K6 load testing script before continuing.](/iac/final-minisocial-architect.yaml)**
{{% /notice %}}

Save the files to a directory on your computer. Open your Terminal and navigate to the folder containing the downloaded files.

For example, on Windows:
```bash
cd C:\Users\<YourUser>\Downloads
```

Verify that the file exists in the current directory:
```bash
dir
```
You should see `normal-flow.js` in the output list.

{{% notice warning %}}
Before running K6, ensure that your terminal is currently located in the same directory as **normal-flow.js**. Otherwise, K6 will not be able to locate the script.
{{% /notice %}}

### 2. Run K6

Execute the following command:
```bash
k6 run normal-flow.js
```

The K6 script will begin sending requests to your **Application Load Balancer**. If successful, you will see a progress report in the terminal similar to:

```text
execution: local
script: normal-flow.js

scenarios: ...

running...

✓ status is 200

checks................: 100.00%
http_req_duration.....
vus...................
iterations............
```

This represents the summary report after K6 finishes the load test.

### 3. Verify Dashboard and Alerts

Return to your **Grafana Dashboard**. During the load test, you should observe the following metrics updating in real time:

- ALB RequestCount
- ECS CPU Utilization
- ECS Memory Utilization
- Amazon RDS Database Connections

![K6 and Grafana Dashboard](/images/5-Workshop/5.7-Phase5-Monitoring/Picture47.png)
<center><i>The Grafana Dashboard and K6 Terminal displaying the sudden spike in network traffic and resource utilization under heavy load.</i></center>

If the incoming traffic exceeds the threshold configured in your Grafana Alert Rule, the alert status will transition through the following states:

1. **Pending**
2. **Firing**

Finally, check your email inbox. If the alert condition is triggered, Grafana will automatically send an email notification to the configured recipient.

---

## Verification Checklist

Before continuing, verify that:

- ✅ Amazon CloudWatch is successfully connected to Grafana Cloud
- ✅ The Stress Test Dashboard displays real-time data
- ✅ ALB throughput increases when running K6
- ✅ ECS CPU and Memory respond to the load
- ✅ RDS metrics display accurately
- ✅ The Grafana Alert Rule transitions to the **Firing** state
- ✅ An alert email was successfully received

---

{{% notice tip %}}
Congratulations! You have successfully integrated **Amazon CloudWatch** with **Grafana Cloud** to build a real-time monitoring solution.
Your **MiniSocial** platform can now visualize infrastructure metrics in real time, monitor application health, detect abnormal traffic automatically, and send email notifications when alert thresholds are exceeded. This monitoring stack provides greater operational visibility and helps ensure the reliability and availability of your application.
{{% /notice %}}
