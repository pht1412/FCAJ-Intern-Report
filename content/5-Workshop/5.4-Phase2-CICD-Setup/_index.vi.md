---
title: "Giai đoạn 2: Thiết lập Jenkins CI/CD"
date: 2026-07-02
weight: 4
chapter: true
pre: "<b>5.4.</b> "
---

# Giai đoạn 2 – Thiết lập Jenkins CI/CD

Ở giai đoạn trước, bạn đã xây dựng hạ tầng mạng và cơ sở dữ liệu bằng **AWS CloudFormation**. Trong giai đoạn này, chúng ta sẽ xây dựng **trái tim của hệ thống tự động hóa** – Jenkins CI/CD.

Thay vì thực hiện thủ công các bước build, đóng gói và triển khai ứng dụng, bạn sẽ xây dựng các **Pipeline as Code** để tự động hóa toàn bộ quy trình triển khai phần mềm.

---

## Mục tiêu học tập

Sau khi hoàn thành giai đoạn này, bạn sẽ có thể:

- Cấu hình Jenkins để triển khai ứng dụng lên AWS
- Quản lý thông tin nhạy cảm bằng **Jenkins Credentials**
- Xây dựng Pipeline tự động cho Backend và Frontend
- Tự động triển khai ứng dụng lên AWS chỉ với một lần chạy Pipeline
- Hiểu rõ vai trò của CI/CD trong quy trình phát triển phần mềm hiện đại

---

## Tại sao CI/CD lại quan trọng?

CI/CD (Continuous Integration / Continuous Deployment) là nền tảng của quy trình DevOps hiện đại.

- Một hệ thống CI/CD giúp:
  - Tự động hóa các thao tác triển khai lặp đi lặp lại
  - Giảm thiểu lỗi do thao tác thủ công
  - Đảm bảo mọi lần triển khai đều tuân theo cùng một quy trình
  - Thực hiện kiểm thử trước khi triển khai
  - Triển khai ứng dụng lên AWS nhanh chóng và nhất quán

Khi sử dụng **Pipeline as Code**, toàn bộ quy trình triển khai sẽ được quản lý bằng mã nguồn, dễ dàng bảo trì và kiểm soát phiên bản.

---

## Công cụ & Dịch vụ sử dụng

| Công cụ / Dịch vụ | Mục đích |
|--------------------|----------|
| Jenkins | Máy chủ CI/CD chạy trên máy cục bộ |
| Jenkins Pipeline | Pipeline as Code cho quy trình build và triển khai tự động |
| Jenkins Credentials | Lưu trữ an toàn AWS keys, Docker credentials và các secrets |
| Amazon ECR | Registry lưu trữ Docker image |
| Amazon ECS Fargate | Triển khai container serverless cho backend |
| Amazon S3 | Lưu trữ tĩnh cho ứng dụng React frontend |
| Amazon CloudFront | Phân phối nội dung toàn cầu với cache invalidation |
| Docker | Đóng gói ứng dụng dưới dạng container |

---

## Bạn sẽ xây dựng gì?

Trong giai đoạn này, Jenkins sẽ tự động hóa toàn bộ quy trình triển khai sau:

```text
Mã nguồn
     │
     ▼
   Jenkins
     │
     ├── Build
     ├── Test
     ├── Docker Build
     ├── Push Image lên Amazon ECR
     ├── Deploy lên Amazon ECS Fargate
     └── Deploy Frontend lên Amazon S3
                     │
                     ▼
              Amazon CloudFront
```

Sau khi hoàn thành, cả Backend và Frontend sẽ có thể được triển khai hoàn toàn tự động chỉ bằng một lần chạy Pipeline.

---

## Các bài thực hành

- **[5.4.1 Thiết lập Jenkins](5.4.1-prepare/)**
  - Chuẩn bị Jenkins cho môi trường CI/CD chuẩn Production: cài đặt Plugin, cấu hình Jenkins Credentials, thiết lập xác thực AWS và áp dụng các khuyến nghị bảo mật.

---

## Kết quả đạt được

- Sau khi hoàn thành giai đoạn này, bạn sẽ có:
  - Một **Jenkins server** đã được cấu hình đầy đủ, sẵn sàng triển khai lên AWS
  - **Jenkins Credentials** lưu trữ an toàn AWS Access Keys và các secrets
  - Hiểu rõ quy trình **Pipeline as Code** cho cả Backend và Frontend

{{% notice tip %}}
Sau khi hoàn thành giai đoạn này, bạn sẽ sở hữu một **hệ thống CI/CD chuẩn Production**, có khả năng tự động triển khai cả Backend và Frontend lên AWS chỉ với một lần chạy Pipeline.
{{% /notice %}}