---
title: "Giai đoạn 3: Triển khai Backend"
date: 2026-07-02
weight: 5
chapter: true
pre: "<b>5.5.</b> "
---

# Giai đoạn 3 – Triển khai Backend

Trong giai đoạn này, chúng ta sẽ triển khai khối xử lý logic của Mini Social Network (**Spring Boot API**) lên AWS, sử dụng kiến trúc container serverless (**Amazon ECS Fargate**).

---

## Chiến lược triển khai "Mồi Image" (Image Seeding)

Việc triển khai ứng dụng container qua IaC và CI/CD thường gặp bài toán "con gà và quả trứng":

- AWS CloudFormation (ECS) cần có sẵn Docker Image trong **Amazon ECR** để khởi tạo dịch vụ.
- Tuy nhiên, CI/CD Pipeline (Jenkins) lại chính là công cụ build và push image đó.

- Giải pháp — chiến thuật **"Mồi Image"**:
  - Khởi tạo một kho ECR trống hoàn toàn
  - Chạy Jenkins Pipeline lần đầu — build và push image thành công, nhưng **chắc chắn fail** ở bước Deploy vì hạ tầng ECS chưa tồn tại
  - Lấy URI của Image vừa push để làm tham số khởi tạo CloudFormation Backend Stack
  - Chạy Jenkins Pipeline lần thứ hai — thành công 100% và cập nhật ECS Service

---

## Dịch vụ AWS sử dụng

| Dịch vụ | Mục đích |
|---------|----------|
| Amazon ECR | Registry lưu trữ Docker image |
| Amazon ECS Fargate | Triển khai container serverless cho backend |
| AWS CloudFormation | Infrastructure as Code cho ECS |
| Application Load Balancer | Phân phối tải đến ECS tasks |
| Amazon S3 | Lưu trữ tệp do người dùng upload |
| AWS WAF | Tường lửa ứng dụng web |
| Amazon Route 53 | Quản lý DNS cho tên miền |
| Jenkins | Máy chủ CI/CD tự động hóa |

---

## Các bài thực hành

- **[5.5.1 Chuẩn bị tiền đề (ECR & SSM)](5.5.1-backend-preparation/)**
  - Tạo thủ công các thông tin bảo mật (SSM Parameters) và khởi tạo kho lưu trữ ECR.

- **[5.5.2 Cấu hình Jenkins & Chạy Pipeline lần 1](5.5.2-jenkins-config-and-initial-run/)**
  - Cấu hình Jenkins Managed Files và chạy Pipeline đầu tiên để "mồi" Docker Image lên AWS.

- **[5.5.3 Khởi tạo Stack Backend](5.5.3-/)**
  - Triển khai dịch vụ ECS Fargate, Task Definition và lịch trình Auto Scaling bằng CloudFormation.

- **[5.5.4 Chạy Pipeline & Kiểm tra Backend](5.5.4-/)**
  - Tạo S3 bucket upload, chạy lại Pipeline và kiểm tra API qua ALB.

- **[5.5.5 Thiết lập WAF & Route 53](5.5.5-/)**
  - Gắn AWS WAF vào ALB và cấu hình Amazon Route 53 cho tên miền riêng.

---

## Kết quả đạt được

- Sau khi hoàn thành giai đoạn này, bạn sẽ có:
  - **Spring Boot Backend** hoàn chỉnh trên Amazon ECS Fargate
  - Hệ thống **CI/CD pipeline** tự động build, push và deploy
  - **Kiến trúc tối ưu chi phí** với Fargate Spot và Scheduled Auto Scaling
  - **Bảo mật cấp Enterprise** với AWS WAF
  - **Tên miền riêng** với HTTPS qua Route 53 và ACM

{{% notice warning %}}
**Yêu cầu quan trọng:** Vì Jenkins chạy trên máy local, bạn **bắt buộc phải mở và chạy Docker Desktop** trong suốt quá trình thực thi Pipeline.
{{% /notice %}}