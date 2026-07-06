---
title: "Giới thiệu"
date: 2026-07-02
weight: 1
chapter: false
pre: "<b>5.1.</b> "
---

## Mục tiêu của bài lab

**Mini Social Network (MiniSocial)** là một ứng dụng mạng xã hội **Full-stack** theo tiêu chuẩn **Enterprise**, được triển khai hoàn toàn trên nền tảng **Amazon Web Services (AWS)** với kiến trúc **Cloud-Native**.

Workshop này hướng dẫn bạn toàn bộ quy trình: từ khởi tạo hạ tầng, cấu hình CI/CD pipeline, triển khai backend và frontend, đến thiết lập hệ thống giám sát — tất cả đều tuân theo các phương pháp tốt nhất của Cloud Engineering hiện đại.

---

## Triết lý của Workshop

{{% notice info %}}
Workshop áp dụng triết lý **CI/CD First (Ưu tiên Tự động hóa)**.
Thay vì triển khai ứng dụng bằng các thao tác thủ công trên **AWS Management Console**, toàn bộ quá trình triển khai Backend và Frontend sẽ được tự động hóa thông qua **Jenkins Pipeline**.
Qua đó, người học có thể hiểu rõ quy trình triển khai hiện đại trong môi trường doanh nghiệp.
{{% /notice %}}

---

## Mục tiêu học tập

Sau khi hoàn thành workshop, bạn sẽ có thể:

- Khởi tạo **VPC đa Availability Zone** với public/private subnet bằng **AWS CloudFormation**
- Triển khai ứng dụng **Spring Boot** dưới dạng container trên **Amazon ECS Fargate**
- Lưu trữ ứng dụng **ReactJS** trên **Amazon S3** và phân phối toàn cầu qua **Amazon CloudFront**
- Cấu hình **Jenkins CI/CD Pipeline** để tự động hóa hoàn toàn quá trình triển khai
- Bảo vệ ứng dụng bằng **AWS WAF** trước các cuộc tấn công DDoS và lỗ hổng web phổ biến
- Giám sát tình trạng và hiệu suất ứng dụng bằng **CloudWatch** và **Grafana Cloud**

---

## Dịch vụ AWS sử dụng

| Dịch vụ | Mục đích |
|---------|----------|
| Amazon VPC | Mạng đa AZ với public/private subnet và NAT Gateway |
| AWS CloudFormation | Infrastructure as Code – Khởi tạo tài nguyên tự động |
| Amazon ECS Fargate | Điều phối container serverless cho backend Spring Boot |
| Amazon ECR | Registry lưu trữ Docker image |
| Amazon RDS SQL Server | Cơ sở dữ liệu quan hệ được quản lý bởi AWS |
| Amazon S3 | Lưu trữ tĩnh cho ứng dụng React frontend |
| Amazon CloudFront | Phân phối nội dung toàn cầu kết hợp Origin Access Control (OAC) |
| AWS WAF | Tường lửa ứng dụng web bảo vệ ALB và CloudFront |
| Amazon CloudWatch | Thu thập log và metrics tập trung |

## Công cụ & Framework

| Công cụ | Mục đích |
|---------|----------|
| Jenkins Pipeline | Pipeline CI/CD triển khai tự động |
| Docker | Đóng gói ứng dụng dưới dạng container |
| Spring Boot | Framework backend REST API |
| ReactJS | Framework ứng dụng Single Page Application |
| Grafana Cloud | Dashboard giám sát nâng cao và cảnh báo |

---

# Tổng quan Kiến trúc

Toàn bộ hạ tầng được khởi tạo bằng **AWS CloudFormation (Infrastructure as Code)** và được chia thành các lớp chính như sau:

| Thành phần | Mô tả |
|------------|-------|
| Mạng & Cơ sở dữ liệu | VPC đa Availability Zone, Public/Private Subnet, NAT Gateway và Amazon RDS SQL Server |
| Backend | Ứng dụng Spring Boot được đóng gói bằng Docker, triển khai trên Amazon ECS Fargate và phân phối tải qua Application Load Balancer (ALB) |
| Frontend | Ứng dụng React (SPA) được lưu trữ trên Amazon S3 và phân phối toàn cầu bằng Amazon CloudFront kết hợp Origin Access Control (OAC) |
| Bảo mật | AWS WAF Web ACL bảo vệ ALB và CloudFront trước các cuộc tấn công DDoS và các lỗ hổng web phổ biến |
| Giám sát | Thu thập log, metrics và theo dõi hệ thống bằng CloudWatch, Micrometer OTLP và Grafana Cloud |



---

# Lộ trình Workshop

Workshop được chia thành nhiều giai đoạn để giúp người học từng bước xây dựng một hệ thống Cloud-Native hoàn chỉnh.

| Giai đoạn | Mục tiêu |
|-----------|----------|
| **1. Chuẩn bị (Prerequisites)** | Thiết lập tài khoản AWS, GitHub và cài đặt các công cụ cần thiết |
| **2. Hạ tầng cơ sở (Foundation)** | Khởi tạo VPC, cơ sở dữ liệu và các tài nguyên nền tảng bằng CloudFormation |
| **3. Thiết lập CI/CD** | Cấu hình Jenkins Server và Pipeline tự động triển khai |
| **4. Triển khai Backend** | Phân tích Jenkinsfile, triển khai Spring Boot lên Amazon ECS Fargate và cấu hình AWS WAF |
| **5. Triển khai Frontend** | Phân tích Jenkinsfile, triển khai React lên Amazon S3 và CloudFront, đồng thời cấu hình AWS WAF |
| **6. Giám sát hệ thống** | Theo dõi logs, metrics và tình trạng ứng dụng thông qua CloudWatch và Grafana Cloud |
| **7. Dọn dẹp tài nguyên** | Xóa toàn bộ tài nguyên AWS an toàn nhằm tránh phát sinh chi phí ngoài ý muốn |

---

{{% notice tip %}}
Sau khi hoàn thành workshop, bạn sẽ xây dựng được một quy trình **CI/CD tự động hoàn chỉnh**, có khả năng triển khai ứng dụng theo kiến trúc **Cloud-Native** trên AWS theo cách gần với quy trình vận hành trong doanh nghiệp.
{{% /notice %}}