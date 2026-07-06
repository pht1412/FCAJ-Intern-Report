---
title: "Jenkins Config & Initial Run"
date: 2026-07-02
weight: 52
chapter: false
pre: "<b>5.5.2. </b>"
---

## Objective of this Lab

In this lab, you will configure Jenkins to prepare the first Backend deployment pipeline.

Instead of hardcoding the Amazon ECS Task Definition inside the Jenkins Pipeline, you will store it as a **Managed File** using the **Config File Provider** plugin. You will then configure a Pipeline Job that retrieves the source code from GitHub and performs the first automated build.

During this initial execution, the application will be successfully built, containerized, and pushed to **Amazon ECR**. The deployment stage is expected to fail because the ECS infrastructure has not yet been provisioned.

---

## Learning Objectives

After completing this lab, you will be able to:

- Configure an ECS Task Definition template using Jenkins Managed Files
- Configure a Jenkins Pipeline Job connected to GitHub
- Build a Docker image automatically
- Push the Docker image to Amazon ECR
- Verify that Jenkins can execute the complete CI pipeline before infrastructure deployment

---

## Tools & Resources Used

| Tool / Resource | Purpose |
|-----------------|----------|
| Jenkins Config File Provider | Store ECS Task Definition as a Managed File |
| Jenkins Pipeline | Pipeline as Code execution |
| GitHub Repository | Source code management |
| Docker Desktop | Local Docker image building |
| Amazon ECR | Container image registry |
| AWS CLI | AWS command-line access |

---

# Step 1 – Create an ECS Task Definition Managed File

Instead of embedding the ECS Task Definition directly inside the Jenkinsfile, Jenkins will load it from a **Managed File**.

Navigate to:

```text
Manage Jenkins
    └── Managed Files
```

Click **Manage Jenkins**.

![Manage Jenkins](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ManageJenkins.png)

<center><i>Open the Jenkins administration page to access Managed Files.</i></center>

---

Open **Managed Files**.

![Managed Files](/images/5-Workshop/5.5-Phase3-Backend-Deployment/Configfile_1.png)

<center><i>Navigate to the Managed Files page provided by the Config File Provider plugin.</i></center>

---

Click:

```text
Add a new Config
```

Select:

```text
Custom file
```

Then click **Next**.

![Create Managed File](/images/5-Workshop/5.5-Phase3-Backend-Deployment/Configfile_2.png)

<center><i>Create a new Custom Managed File for the ECS Task Definition template.</i></center>

---

Configure the Managed File using the following values.

| Field | Value |
|-------|-------|
| ID | `ecs-task-def-template` |
| Name | ECS Task Definition Template |
| Type | Custom File |

Paste the following ECS Task Definition template into the **Content** section.

> **Important**
>
> Keep the placeholder below unchanged:
>
> ```text
> {{IMAGE_URI}}
> ```
>
> Jenkins automatically replaces this placeholder with the newly built Docker image URI during each pipeline execution.

```json
{
    "family": "minisocial-backend-task",
    "executionRoleArn": "arn:aws:iam::{{AWS_ACCOUNT_ID}}:role/Minisocial-Backend-ECSTaskExecutionRole-0BTwsWbxtsTH",
    "networkMode": "awsvpc",
    "cpu": "512",
    "memory": "1024",
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "containerDefinitions": [
        {
            "name": "minisocial-backend-container",
            "image": "{{IMAGE_URI}}",
            "cpu": 512,
            "memory": 1024,
            "portMappings": [
                {
                    "containerPort": 8080,
                    "hostPort": 8080,
                    "protocol": "tcp",
                    "name": "minisocial-backend-container-8080-tcp"
                }
            ],
            "essential": true,
            "environment": [
                {
                    "name": "SPRING_DATASOURCE_URL",
                    "value": "jdbc:sqlserver:{{RDS_ENDPOINT}}:1433;databaseName=MiniSocialDB;encrypt=true;trustServerCertificate=true;"
                },
                {
                    "name": "SPRING_DATASOURCE_USERNAME",
                    "value": "Your_username"
                },
                {
                    "name": "APP_UPLOAD_DIR",
                    "value": "./uploads"
                },
                {
                    "name": "JWT_EXPIRATION",
                    "value": "86400000"
                },
                {
                    "name": "SWAGGER_API_DOCS_PATH",
                    "value": "/v3/api-docs"
                },
                {
                    "name": "SPRING_JPA_DATABASE",
                    "value": "sql_server"
                },
                {
                    "name": "SPRING_MAIL_PROPERTIES_MAIL_SMTP_AUTH",
                    "value": "true"
                },
                {
                    "name": "SPRING_JPA_SEND_STRING_PARAMETERS_AS_UNICODE",
                    "value": "true"
                },
                {
                    "name": "SPRING_JPA_SHOW_SQL",
                    "value": "false"
                },
                {
                    "name": "SPRING_MAIL_USERNAME",
                    "value": "offical.minisocialnetwork@gmail.com"
                },
                {
                    "name": "SPRING_MAIL_PORT",
                    "value": "587"
                },
                {
                    "name": "SPRING_JPA_DATABASE_PLATFORM",
                    "value": "org.hibernate.dialect.SQLServerDialect"
                },
                {
                    "name": "CORS_ALLOWED_ORIGINS",
                    "value": "{{DOMAIN_NAME}},http://localhost:5173,http://localhost:3000"
                },
                {
                    "name": "SERVER_PORT",
                    "value": "8080"
                },
                {
                    "name": "AWS_REGION",
                    "value": "ap-southeast-1"
                },
                {
                    "name": "SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE",
                    "value": "50MB"
                },
                {
                    "name": "AWS_BUCKET_NAME",
                    "value": "{{S3_BUCKET}}"
                },
                {
                    "name": "SPRING_JPA_HIBERNATE_DDL_AUTO",
                    "value": "update"
                },
                {
                    "name": "SERVER_SERVLET_ENCODING_CHARSET",
                    "value": "UTF-8"
                },
                {
                    "name": "SPRING_MAIL_PROPERTIES_MAIL_SMTP_STARTTLS_ENABLE",
                    "value": "true"
                },
                {
                    "name": "SPRING_DATASOURCE_DRIVER_CLASS_NAME",
                    "value": "com.microsoft.sqlserver.jdbc.SQLServerDriver"
                },
                {
                    "name": "SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE",
                    "value": "50MB"
                },
                {
                    "name": "SPRING_MAIL_HOST",
                    "value": "smtp.gmail.com"
                },
                {
                    "name": "JWT_REFRESH_EXPIRATION",
                    "value": "604800000"
                },
                {
                    "name": "STORAGE_TYPE",
                    "value": "s3"
                },
                {
                    "name": "SERVER_SERVLET_ENCODING_FORCE",
                    "value": "true"
                },
                {
                    "name": "SWAGGER_UI_PATH",
                    "value": "/swagger-ui.html"
                }
            ],
            "secrets": [
                {
                    "name": "AWS_ACCESS_KEY_ID",
                    "valueFrom": "arn:aws:ssm:ap-southeast-1:254201323904:parameter/minisocial/backend/aws-access-key"
                },
                {
                    "name": "AWS_SECRET_ACCESS_KEY",
                    "valueFrom": "arn:aws:ssm:ap-southeast-1:254201323904:parameter/minisocial/backend/aws-secret-key"
                },
                {
                    "name": "GRAFANA_OTLP_TOKEN",
                    "valueFrom": "arn:aws:ssm:ap-southeast-1:254201323904:parameter/minisocial/backend/grafana-token"
                },
                {
                    "name": "JWT_SECRET",
                    "valueFrom": "arn:aws:ssm:ap-southeast-1:254201323904:parameter/minisocial/backend/jwt-secret"
                },
                {
                    "name": "SPRING_DATASOURCE_PASSWORD",
                    "valueFrom": "arn:aws:ssm:ap-southeast-1:254201323904:parameter/minisocial/backend/db-password"
                },
                {
                    "name": "SPRING_MAIL_PASSWORD",
                    "valueFrom": "arn:aws:ssm:ap-southeast-1:254201323904:parameter/minisocial/backend/mail-password"
                }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "/ecs/minisocial-backend",
                    "awslogs-region": "ap-southeast-1",
                    "awslogs-stream-prefix": "ecs"
                }
            }
        }
    ]
}
```

Finally, click **Submit** to save the Managed File.

---

{{% notice info %}}

Using a Managed File keeps the Jenkinsfile clean and allows the ECS Task Definition to be updated independently without modifying the Pipeline itself.

{{% /notice %}}

---

# Step 2 – Configure the Jenkins Pipeline Job

Return to the Jenkins Dashboard.

Click:

```text
New Item
```

Create a new **Pipeline** project.

For example:

```text
MiniSocial-Backend-Pipeline
```

---

Under the **Pipeline** section, configure:

| Setting | Value |
|---------|-------|
| Definition | Pipeline script from SCM |
| SCM | Git |
| Repository URL | Your GitHub Repository |
| Credentials | Your GitHub Credentials |
| Branch | main (or your working branch) |
| Script Path | backend/Jenkinsfile |

Fill in the Pipeline configuration as shown below.

![Configure Jenkins Pipeline](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ConfigPipeline.png)

<center><i>Configure the Pipeline to retrieve the Jenkinsfile directly from your GitHub repository using Pipeline script from SCM.</i></center>

After completing the configuration, click:

```text
Apply
```

Then click:

```text
Save
```

---

{{% notice tip %}}

Using **Pipeline script from SCM** ensures Jenkins always executes the latest Jenkinsfile stored in your GitHub repository.

{{% /notice %}}

---

Return to the main Jenkins Dashboard. You should see the newly created Pipeline ready for execution.

![Jenkins Dashboard](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/DashboardJenkins.png)
<center><i>The Jenkins Dashboard displaying the successfully created Pipeline.</i></center>

---

# Step 3 – Trigger the First Pipeline Build

Before running the pipeline, ensure:

- Docker Desktop is running.
- Jenkins is running.
- AWS Credentials have been configured.
- The AWS CLI is available from Windows Command Prompt.

---

Open the Pipeline Job and click:

```text
Build Now
```

Monitor the Console Output.

If everything is configured correctly, Jenkins will perform the following stages:

1. Clone the GitHub repository.
2. Build the Spring Boot application.
3. Build the Docker image.
4. Push the image to Amazon ECR.
5. Attempt to deploy the application to Amazon ECS.

The pipeline console should look similar to the following example.

![First Pipeline Build](/images/5-Workshop/5.5-Phase3-Backend-Deployment/BuildFalse.png)

<center><i>The first pipeline execution successfully builds and pushes the Docker image to Amazon ECR, but the deployment stage fails because the ECS infrastructure has not yet been provisioned.</i></center>

---

{{% notice warning %}}

The deployment stage is **expected to fail** during this lab.
This behavior is completely normal because the Amazon ECS Service and Task infrastructure have not yet been created.
The deployment will succeed after completing the infrastructure deployment in the next lab.

{{% /notice %}}

---

## Verification Checklist

Before continuing, verify the following:

- ✅ Jenkins successfully cloned the GitHub repository
- ✅ The Spring Boot project compiled successfully
- ✅ Docker successfully built the application image
- ✅ The Docker image was pushed to Amazon ECR
- ✅ The pipeline failed only during the ECS deployment stage

---

## Verify Amazon ECR

Open the **Amazon ECR Console**.

Locate the repository:

```text
minisocial-backend
```

Confirm that a new image has been uploaded successfully.

![Amazon ECR Repository](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ECR-With-image.png)

<center><i>Verify that Jenkins successfully pushed the Docker image to the Amazon ECR repository during the first pipeline execution.</i></center>

This image will be used by Amazon ECS in the following deployment lab.

---

{{% notice tip %}}

Congratulations!
You have completed your first Continuous Integration (CI) pipeline.
In the next lab, you will provision the Amazon ECS infrastructure and transform this pipeline into a complete Continuous Deployment (CD) workflow.

{{% /notice %}}