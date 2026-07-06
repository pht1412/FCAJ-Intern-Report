---
title: "Chuẩn bị tiền đề (ECR & SSM)"
date: 2026-07-02
weight: 51
chapter: false
pre: "<b>5.5.1. </b>"
---

## Mục tiêu của bài lab

Trong bài Lab này, bạn sẽ chuẩn bị các tiền đề bắt buộc để triển khai Backend. Công việc bao gồm: khởi tạo kho lưu trữ Docker Image (**Amazon ECR**) và lưu trữ bảo mật các thông tin nhạy cảm của ứng dụng vào **AWS Systems Manager (SSM) Parameter Store**.

---

## Mục tiêu học tập

Sau khi hoàn thành bài Lab này, bạn sẽ có thể:

- Tạo Amazon ECR repository để lưu trữ Docker images
- Lưu trữ an toàn các secrets của ứng dụng bằng SSM Parameter Store
- Hiểu vai trò của ECR và SSM trong quy trình CI/CD

---

## Dịch vụ AWS sử dụng

| Dịch vụ | Mục đích |
|---------|----------|
| Amazon ECR | Registry lưu trữ Docker image |
| AWS Systems Manager Parameter Store | Lưu trữ bảo mật thông tin nhạy cảm |

---

# Bước 1 – Khởi tạo kho lưu trữ ECR

Hệ thống CI/CD cần một nơi để đẩy (push) Docker Image lên trước khi triển khai xuống ECS.

1. Truy cập vào giao diện **Amazon Elastic Container Registry (ECR)** trên AWS Console.

![ECR Dashboard](/images/5-Workshop/5.5-Phase3-Backend-Deployment/DashboardECR.png)
<center><i>Amazon ECR Console – Giao diện tổng quan.</i></center>

2. Nhấn vào nút **Create repository**.

3. Nhập tên kho lưu trữ vào ô **Repository name**.

{{% notice warning %}}
Bạn **bắt buộc** phải đặt tên là `minisocial-backend`. Tên này phải khớp hoàn toàn với biến `ECR_REPO_NAME` đã được khai báo trong Jenkinsfile.
{{% /notice %}}

![Create ECR Repository](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateRepo.png)
<center><i>Tạo ECR repository với tên bắt buộc.</i></center>

4. Giữ nguyên các thông số mặc định khác và nhấn **Create repository**.

---

# Bước 2 – Tạo các tham số bảo mật (SSM Parameter Store)

Ứng dụng Spring Boot cần kết nối đến Database và các dịch vụ khác. Để bảo mật, chúng ta lưu vào SSM Parameter Store thay vì ghi trực tiếp vào code.

1. Truy cập vào **AWS Systems Manager** → **Parameter Store**.

![SSM Dashboard](/images/5-Workshop/5.5-Phase3-Backend-Deployment/DashboardSSM.png)
<center><i>AWS Systems Manager – Giao diện Parameter Store.</i></center>

2. Nhấn nút **Create parameter**.

3. Khởi tạo lần lượt các tham số dưới đây. Đảm bảo chọn Type là **SecureString**:

| Tên tham số | Mô tả |
|-------------|-------|
| `/minisocial/backend/db-password` | Mật khẩu Database RDS |
| `/minisocial/backend/jwt-secret` | Chuỗi bí mật mã hóa JWT |
| `/minisocial/backend/aws-access-key` | Access Key của IAM User |
| `/minisocial/backend/aws-secret-key` | Secret Key của IAM User |
| `/minisocial/backend/grafana-token` | Token kết nối Grafana Cloud |
| `/minisocial/backend/mail-password` | Mật khẩu ứng dụng Gmail SMTP |
| `/minisocial/acm/certificate-arn` | Chứng chỉ SSL cho Backend |

![Create SSM Parameter](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateSSM.png)
<center><i>Tạo tham số SecureString trong SSM Parameter Store.</i></center>

4. Lặp lại bước trên cho đến khi hoàn tất danh sách.

---

## Kiểm tra kết quả

Trước khi tiếp tục, hãy xác nhận:

- ✅ Kho lưu trữ ECR tên `minisocial-backend` đã được tạo thành công
- ✅ Toàn bộ các tham số bảo mật đã xuất hiện trong Parameter Store
- ✅ Tất cả tham số đều ở định dạng **SecureString**

![SSM Parameters Done](/images/5-Workshop/5.5-Phase3-Backend-Deployment/DashboardSSM_DONE.png)
<center><i>Tất cả SSM parameters đã được tạo thành công.</i></center>