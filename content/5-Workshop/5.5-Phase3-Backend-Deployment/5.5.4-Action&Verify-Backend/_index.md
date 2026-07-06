---
title: "Action & Verify Backend"
date: 2026-07-02
weight: 54
chapter: false
pre: "<b>5.5.4. </b>"
---

## Objective of this Lab

In this lab, you will complete the Backend deployment process.

First, you will create an Amazon S3 bucket for storing user-uploaded files. Next, you will execute the Jenkins Pipeline for a second time. Since the Amazon ECS infrastructure has already been provisioned, the deployment will complete successfully.

Finally, you will verify that the backend application is running correctly through its Health Check API.

---

## Learning Objectives

After completing this lab, you will be able to:

- Create an Amazon S3 bucket for application uploads
- Configure the storage bucket used by the Backend service
- Execute the Jenkins Pipeline successfully
- Deploy the latest Docker image to Amazon ECS
- Verify that the backend API is accessible through the Application Load Balancer

---

## AWS Services Used

| Service | Purpose |
|---------|----------|
| Amazon S3 | Storage for user-uploaded media files |
| Jenkins Pipeline | CI/CD automation |
| Docker Desktop | Local Docker image building |
| Amazon ECS | Container orchestration |
| Amazon ECR | Docker image registry |
| Application Load Balancer | Traffic distribution to ECS tasks |

---

# Step 1 – Create the Amazon S3 Upload Bucket

The Spring Boot backend stores uploaded images and files in Amazon S3.

Navigate to:

```text
Amazon S3
    └── Buckets
            └── Create bucket
```

![Amazon S3 Dashboard](/images/5-Workshop/5.5-Phase3-Backend-Deployment/S3Dashboard.png)

<center><i>Open the Amazon S3 console and create a new bucket for storing uploaded files.</i></center>

---

Configure the bucket using the following recommendations.

| Setting | Value |
|---------|-------|
| Bucket Type | General purpose |
| Bucket Namespace | Account Regional namespace (recommended) |
| Bucket Name Prefix | minisocial-uploads |

AWS automatically appends the regional suffix to generate the complete bucket name.

For example:

```text
minisocial-uploads-254201323904-ap-southeast-1-an
```

---

{{% notice warning %}}

The generated bucket name must match the value configured in the **AWS_BUCKET_NAME** environment variable inside your Backend CloudFormation template.
If these values are different, the application will not be able to upload files successfully.

{{% /notice %}}

---

Leave the remaining settings as their default values, then click:

```text
Create bucket
```

![Create Amazon S3 Bucket](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateS3.png)

<center><i>Create the upload bucket that will be used by the Backend application to store media files.</i></center>

---

# Step 2 – Execute the Jenkins Pipeline Again

Now that the Amazon ECS infrastructure has already been deployed, the pipeline can complete successfully.

Open your Jenkins dashboard.

Select:

```text
MiniSocial-Backend-Pipeline
```

![Backend Pipeline Dashboard](/images/5-Workshop/5.5-Phase3-Backend-Deployment/DashboardPipeline_backend.png)

<center><i>Open the Backend Pipeline created in the previous lab.</i></center>

---

Before continuing, verify the following:

- Docker Desktop is running.
- Jenkins is running.
- AWS Credentials are configured.
- Internet connectivity is available.

---

{{% notice warning %}}

Docker Desktop **must remain running** while Jenkins executes the pipeline.
If Docker is not running, the Docker Build stage will fail immediately.

{{% /notice %}}

---

Click:

```text
Build Now
```

Monitor the Console Output.

This time Jenkins will successfully perform the following stages:

1. Clone the GitHub repository.
2. Build the Spring Boot application.
3. Build the Docker image.
4. Push the image to Amazon ECR.
5. Register a new ECS Task Definition.
6. Update the Amazon ECS Service.
7. Wait for the deployment to finish.

The pipeline should finish successfully.

![Successful Pipeline Build](/images/5-Workshop/5.5-Phase3-Backend-Deployment/BuildSuccess.png)

<center><i>The second pipeline execution completes successfully because the Amazon ECS infrastructure already exists.</i></center>

---

# Step 3 – Verify the Backend Deployment

Once the pipeline has finished successfully, verify that the backend service is running correctly.

If you do not remember your Application Load Balancer DNS Name, retrieve it from the CloudFormation Outputs created in **Lab 5.3.1**.

Navigate to:

```text
CloudFormation
    └── Stacks
            └── MiniSocial-Architect
                    └── Outputs
```

Locate the output named:

```text
ALBDNSName
```

Copy its value.

---

Open your web browser and navigate to:

```text
http://<ALB-DNS-NAME>/api/health/status
```

Replace:

```text
<ALB-DNS-NAME>
```

with the **ALBDNSName** value copied from the CloudFormation Outputs.

For example:

```text
http://MiniSocial-ALB-xxxxxxxx.ap-southeast-1.elb.amazonaws.com/api/health/status
```

If the deployment succeeds, the API should return a healthy response such as:
![Backend Health Check](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ALBCheck.png)

<center><i>Verify that the backend Health Check endpoint is accessible through the Application Load Balancer DNS Name.</i></center>

---

```text
Healthy
```

or

```text
OK
```

This confirms that:

- Amazon ECS is running successfully.
- The Application Load Balancer is forwarding requests correctly.
- The Spring Boot application has started successfully.
- The backend service is now live.

---

{{% notice tip %}}

The **ALBDNSName** is generated automatically when you deploy the **MiniSocial-Architect** in **Lab 5.3.1**.
You can always retrieve it later from the **Outputs** tab of the CloudFormation stack without redeploying the infrastructure.

{{% /notice %}}

## Verification Checklist

Before continuing, verify the following:

- ✅ Amazon S3 upload bucket has been created
- ✅ Bucket name matches the Backend configuration
- ✅ Jenkins Pipeline completed successfully
- ✅ Docker image was pushed to Amazon ECR
- ✅ Amazon ECS Service was updated successfully
- ✅ Health Check API returns a successful response

---

{{% notice tip %}}

Congratulations!
You have successfully completed the Backend Continuous Deployment workflow.
Your Jenkins Pipeline now automatically builds, containerizes, pushes Docker images to Amazon ECR, and deploys new application versions to Amazon ECS.
In the next lab, you will deploy the Frontend application and complete the MiniSocial platform.

{{% /notice %}}