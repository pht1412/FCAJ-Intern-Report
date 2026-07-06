---
title: "Cấu hình Jenkins & Chạy Pipeline lần đầu"
date: 2026-07-02
weight: 52
chapter: false
pre: "<b>5.5.2. </b>"
---

## Mục tiêu của bài lab

Trong bài Lab này, bạn sẽ cấu hình Jenkins để chuẩn bị cho Pipeline triển khai Backend đầu tiên.

Thay vì nhúng trực tiếp **Amazon ECS Task Definition** vào Jenkins Pipeline, chúng ta sẽ lưu trữ nó dưới dạng **Managed File** thông qua plugin **Config File Provider**. Sau đó, bạn sẽ tạo một Pipeline Job để lấy mã nguồn từ GitHub và thực hiện lần build tự động đầu tiên.

Trong lần thực thi này, ứng dụng sẽ được build thành công, đóng gói và đẩy lên **Amazon ECR**. Giai đoạn Deploy được dự kiến sẽ thất bại vì hạ tầng ECS vẫn chưa được tạo.

---

## Mục tiêu học tập

Sau khi hoàn thành bài Lab này, bạn sẽ có thể:

- Cấu hình mẫu ECS Task Definition bằng Jenkins Managed Files
- Tạo Jenkins Pipeline Job kết nối với GitHub
- Tự động build Docker Image
- Đẩy Docker Image lên Amazon ECR
- Kiểm tra toàn bộ quy trình CI trước khi triển khai hạ tầng

---

## Công cụ & Tài nguyên sử dụng

| Công cụ / Tài nguyên | Mục đích |
|-----------------------|----------|
| Jenkins Config File Provider | Lưu ECS Task Definition dạng Managed File |
| Jenkins Pipeline | Thực thi Pipeline as Code |
| GitHub Repository | Quản lý mã nguồn |
| Docker Desktop | Build Docker image cục bộ |
| Amazon ECR | Registry lưu trữ Docker image |
| AWS CLI | Truy cập AWS qua dòng lệnh |

---

# Bước 1 – Tạo Managed File cho ECS Task Definition

Thay vì nhúng trực tiếp ECS Task Definition vào Jenkinsfile, Jenkins sẽ tải nội dung này từ một **Managed File**.

Truy cập:

```text
Manage Jenkins
    └── Managed Files
```

Nhấn **Manage Jenkins**.

![Manage Jenkins](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ManageJenkins.png)

<center><i>Mở trang quản trị Jenkins để truy cập chức năng Managed Files.</i></center>

---

Mở **Managed Files**.

![Managed Files](/images/5-Workshop/5.5-Phase3-Backend-Deployment/Configfile_1.png)

<center><i>Điều hướng đến trang Managed Files được cung cấp bởi plugin Config File Provider.</i></center>

---

Nhấn:

```text
Add a new Config
```

Chọn:

```text
Custom file
```

Sau đó nhấn **Next**.

![Create Managed File](/images/5-Workshop/5.5-Phase3-Backend-Deployment/Configfile_2.png)

<center><i>Tạo một Custom Managed File mới để lưu mẫu ECS Task Definition.</i></center>

---

Cấu hình Managed File với các giá trị sau:

| Trường | Giá trị |
|-------|-------|
| ID | `ecs-task-def-template` |
| Tên | ECS Task Definition Template |
| Loại | Custom File |

Dán nội dung mẫu **ECS Task Definition** vào phần **Content**.

> **Quan trọng**
>
> Giữ nguyên placeholder dưới đây:
>
> ```text
> {{IMAGE_URI}}
> ```
>
> Jenkins sẽ tự động thay thế placeholder này bằng URI của Docker Image vừa được build trong mỗi lần Pipeline chạy.

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

Cuối cùng, nhấn **Submit** để lưu Managed File.

---

{{% notice info %}}

Sử dụng **Managed File** giúp Jenkinsfile gọn gàng hơn và cho phép cập nhật ECS Task Definition độc lập mà không cần chỉnh sửa Pipeline.

{{% /notice %}}

---

# Bước 2 – Cấu hình Jenkins Pipeline

Quay trở lại **Jenkins Dashboard**.

Nhấn:

```text
New Item
```

Tạo một dự án loại **Pipeline**.

Ví dụ:

```text
MiniSocial-Backend-Pipeline
```

---

Trong phần **Pipeline**, cấu hình như sau:

| Thiết lập | Giá trị |
|---------|-------|
| Definition | Pipeline script from SCM |
| SCM | Git |
| Repository URL | Đường dẫn GitHub Repository của bạn |
| Credentials | GitHub Credentials của bạn |
| Branch | main (hoặc nhánh đang sử dụng) |
| Script Path | backend/Jenkinsfile |

Điền cấu hình Pipeline theo hình minh họa dưới đây.

![Configure Jenkins Pipeline](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ConfigPipeline.png)

<center><i>Cấu hình Pipeline để Jenkins lấy trực tiếp Jenkinsfile từ GitHub bằng tùy chọn Pipeline script from SCM.</i></center>

Sau khi hoàn tất, nhấn:

```text
Apply
```

Sau đó nhấn:

```text
Save
```

---

{{% notice tip %}}

Sử dụng **Pipeline script from SCM** giúp Jenkins luôn thực thi phiên bản Jenkinsfile mới nhất được lưu trong GitHub Repository.

{{% /notice %}}

---

Quay trở lại màn hình chính của Jenkins (Dashboard), bạn sẽ thấy Pipeline vừa tạo đã xuất hiện và sẵn sàng hoạt động.

![Jenkins Dashboard](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/DashboardJenkins.png)
<center><i>Giao diện Jenkins Dashboard hiển thị Pipeline đã được khởi tạo thành công.</i></center>

---

# Bước 3 – Chạy Pipeline lần đầu

Trước khi chạy Pipeline, hãy đảm bảo:

- Docker Desktop đang hoạt động.
- Jenkins đang chạy.
- AWS Credentials đã được cấu hình.
- AWS CLI có thể sử dụng từ Command Prompt của Windows.

---

Mở Pipeline Job và nhấn:

```text
Build Now
```

Theo dõi **Console Output**.

Nếu mọi thứ được cấu hình chính xác, Jenkins sẽ thực hiện các giai đoạn sau:

1. Clone mã nguồn từ GitHub.
2. Build ứng dụng Spring Boot.
3. Build Docker Image.
4. Đẩy Docker Image lên Amazon ECR.
5. Thử triển khai ứng dụng lên Amazon ECS.

Console của Pipeline sẽ hiển thị tương tự như hình dưới đây.

![First Pipeline Build](/images/5-Workshop/5.5-Phase3-Backend-Deployment/BuildFalse.png)

<center><i>Lần chạy Pipeline đầu tiên build thành công ứng dụng và đẩy Docker Image lên Amazon ECR, tuy nhiên bước triển khai thất bại do hạ tầng Amazon ECS vẫn chưa được tạo.</i></center>

---

{{% notice warning %}}

Việc Pipeline **thất bại ở bước Deploy** trong bài Lab này là **hoàn toàn bình thường**.
Nguyên nhân là **Amazon ECS Service** và **Task** vẫn chưa được triển khai.
Sau khi hoàn thành bài Lab triển khai hạ tầng Amazon ECS tiếp theo, Pipeline sẽ có thể triển khai ứng dụng thành công.

{{% /notice %}}

---

## Kiểm tra kết quả

Trước khi chuyển sang bài Lab tiếp theo, hãy xác nhận:

- ✅ Jenkins đã clone thành công GitHub Repository
- ✅ Dự án Spring Boot đã được build thành công
- ✅ Docker đã build thành công Docker Image
- ✅ Docker Image đã được đẩy lên Amazon ECR
- ✅ Pipeline chỉ thất bại tại bước triển khai Amazon ECS

---

## Kiểm tra Amazon ECR

Mở **Amazon ECR Console**.

Tìm Repository:

```text
minisocial-backend
```

![Amazon ECR Repository](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ECR-With-image.png)

<center><i>Kiểm tra Repository Amazon ECR để xác nhận Jenkins đã đẩy thành công Docker Image trong lần chạy Pipeline đầu tiên.</i></center>

Docker Image này sẽ được Amazon ECS sử dụng trong bài Lab triển khai tiếp theo.

---

{{% notice tip %}}

Bạn đã hoàn thành Pipeline **Continuous Integration (CI)** đầu tiên.
Trong bài Lab tiếp theo, chúng ta sẽ triển khai hạ tầng **Amazon ECS** và biến Pipeline này thành một quy trình **Continuous Deployment (CD)** hoàn chỉnh.
{{% /notice %}}