---
title: "Deploy the Backend Stack"
date: 2026-07-02
weight: 53
chapter: false
pre: "<b>5.5.3. </b>"
---

## Objective of this Lab

In this lab, you will deploy the MiniSocial Backend application to **Amazon ECS Fargate** using **AWS CloudFormation**.

The deployment will use the Docker image that was pushed to **Amazon ECR** in the previous lab. You will also configure a cost-optimized architecture using **Fargate Spot** and **Scheduled Auto Scaling**.

---

## Learning Objectives

After completing this lab, you will be able to:

- Deploy the Backend application to Amazon ECS Fargate
- Use the Docker image stored in Amazon ECR
- Provision the Backend infrastructure using AWS CloudFormation
- Configure Scheduled Auto Scaling for automatic start and stop
- Understand how Fargate Spot helps reduce infrastructure costs

---

## AWS Services Used

| Service | Purpose |
|---------|----------|
| AWS CloudFormation | Infrastructure as Code for ECS provisioning |
| Amazon ECS Fargate | Serverless container compute |
| Amazon ECR | Docker image registry |
| Application Auto Scaling | Scheduled start/stop of ECS tasks |
| CloudWatch Logs | Container log aggregation |

---

# Step 1 – Retrieve the Docker Image URI

Before deploying the Backend Stack, obtain the Docker Image URI from Amazon ECR.

Navigate to:

```text
Amazon ECR
    └── Repositories
            └── minisocial-backend
```

Locate the repository created in the previous lab.

![Amazon ECR Repository](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ECR-With-image.png)

<center><i>Open the Amazon ECR repository containing the Docker image built by Jenkins.</i></center>

---

Select the image tagged:

```text
latest
```

Open the image details.

Click:

```text
Copy URI
```

Copy the complete Image URI.

This value will be required when creating the CloudFormation stack.

![Amazon ECR Image Details](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ECR_details.png)

<center><i>Copy the Docker Image URI from Amazon ECR. CloudFormation will use this image to create the ECS Task Definition.</i></center>

---

# Step 2 – Deploy the Backend Stack

{{% notice info %}}
📥 **CloudFormation Template**
Download the database CloudFormation template before continuing.
**[Download minisocial-backend.yaml](/iac/final-minisocial-backend.yaml)**
{{% /notice %}}


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
final-minisocial-backend.yaml
```

Then click **Next**.

![Create Backend Stack](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateStack-backend.png)

<center><i>Upload the Backend CloudFormation template to begin provisioning the Amazon ECS infrastructure.</i></center>

---

Configure the stack using the following information.

| Parameter | Description |
|-----------|-------------|
| Stack Name | MiniSocial-Backend-Stack |
| VPC ID | Output from the VPC Stack |
| Private Subnets | Output from the VPC Stack |
| Target Group ARN | Output from the Network Stack |
| RDS Endpoint | Output from the Database Stack |
| EcrImageUri | Docker Image URI copied from Amazon ECR |
| DbUser | Database username created in the RDS lab |

Fill in the parameters as shown below.

![Backend Stack Parameters](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateStack_backend2.png)

<center><i>Provide the required parameters collected from the previous CloudFormation stacks and the Docker Image URI from Amazon ECR.</i></center>

Continue clicking **Next** until the review page appears.

Finally, click:

```text
Submit
```

to begin provisioning the Backend infrastructure.

---

# Step 3 – Verify the Deployment and Auto Scaling

Wait until the CloudFormation stack reaches the status:

```text
CREATE_COMPLETE
```

![CloudFormation Complete](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateStack-backend.png)

<center><i>Wait until the Backend CloudFormation stack finishes provisioning successfully.</i></center>

---

## Verify the ECS Service

Navigate to:

```text
Amazon ECS
    └── Clusters
            └── MiniSocial-Cluster
                    └── Services
                            └── MiniSocial-Backend-Service
```

Confirm that:

- Service Status is **Active**
- Desired Tasks = **2**
- Running Tasks = **2**

---

## Verify Scheduled Auto Scaling

Inside the ECS Service, open:

```text
Service Auto Scaling
    └── View / Edit
```

Verify that two scheduled actions have been configured:

- Scale Down (22:00)
- Scale Up (07:00)

Both schedules should appear as configured.

![Scheduled Auto Scaling](/images/5-Workshop/5.5-Phase3-Backend-Deployment/Scheduled_Action.png)

<center><i>Verify that Scheduled Auto Scaling automatically scales the ECS service down at 22:00 and back up at 07:00 (Vietnam time).</i></center>

---

# Cost Optimization Architecture

This deployment incorporates several AWS cost optimization techniques.

## Amazon ECS Fargate Spot

The CloudFormation template uses a **Capacity Provider Strategy** combining:

- **FARGATE**
- **FARGATE_SPOT**

One task always runs on standard Fargate to ensure service availability, while the additional task uses **Fargate Spot**, reducing compute costs by up to approximately **70%** whenever spare capacity is available.

---

## Scheduled Auto Scaling

Instead of running continuously, the ECS Service automatically adjusts its desired task count according to a predefined schedule.

The service:

- Scales down to **0 tasks** at **22:00** (Vietnam Time)
- Scales back to **2 tasks** at **07:00** (Vietnam Time)

This approach significantly reduces operating costs for development, demonstration, and educational environments.

---

{{% notice info %}}

Scheduled Auto Scaling is an excellent cost optimization strategy for non-production environments where continuous availability is not required.

{{% /notice %}}

---

## Verification Checklist

Before proceeding to the next lab, confirm the following:

- ✅ CloudFormation Stack status is **CREATE_COMPLETE**
- ✅ Amazon ECS Service status is **Active**
- ✅ Desired Task Count is **2**
- ✅ Scheduled Auto Scaling contains both Scale Up and Scale Down actions
- ✅ CloudWatch Log Group `/ecs/minisocial-backend` has been created successfully

---

{{% notice tip %}}

Congratulations!
Your Backend application is now running on **Amazon ECS Fargate** using a production-style architecture powered by Infrastructure as Code.      
In the next lab, you will configure the Frontend deployment pipeline and complete the full Continuous Deployment (CD) workflow.

{{% /notice %}}