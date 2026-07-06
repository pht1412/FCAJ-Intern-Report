---
title: "Workshop"
date: 2026-07-02
weight: 5
chapter: false
pre: "<b>5.</b> "
---

#  Xây dựng và Triển khai Mini Social Network trên AWS (CI/CD First)

## Tổng quan Workshop

Workshop này hướng dẫn toàn bộ quy trình **xây dựng, triển khai, bảo mật và giám sát** hệ thống **Mini Social Network (MiniSocial)** trên nền tảng **Amazon Web Services (AWS)**.

MiniSocial là một ứng dụng mạng xã hội **Full-stack** được xây dựng theo kiến trúc **Cloud-Native**, tích hợp các tính năng **Gamification** và được thiết kế theo định hướng Enterprise nhằm đáp ứng các yêu cầu về khả năng mở rộng, tính sẵn sàng cao, tự động hóa và bảo mật.

Khác với cách triển khai truyền thống phải thao tác thủ công trên **AWS Management Console**, workshop áp dụng triết lý **CI/CD First (Ưu tiên Tự động hóa)**. Toàn bộ quy trình triển khai Backend và Frontend sẽ được tự động hóa bằng **Jenkins Pipeline**, giúp giảm thiểu thao tác thủ công và tăng tính nhất quán trong quá trình triển khai.

Sau khi hoàn thành workshop, bạn sẽ triển khai thành công một hệ thống hoàn chỉnh trên AWS theo quy trình gần với môi trường Production thực tế.

---

#  Mục tiêu đạt được

Sau khi hoàn thành workshop, bạn có thể:

- Khởi tạo hạ tầng AWS bằng **Infrastructure as Code (IaC)**.
- Đóng gói và quản lý ứng dụng bằng **Docker**.
- Triển khai ứng dụng **Spring Boot** trên **Amazon ECS Fargate**.
- Lưu trữ và phân phối ứng dụng **React** thông qua **Amazon S3** và **Amazon CloudFront**.
- Bảo vệ hệ thống bằng **AWS WAF**.
- Xây dựng quy trình **CI/CD tự động** với **Jenkins Pipeline**.
- Theo dõi logs, metrics và tình trạng hệ thống bằng **CloudWatch**, **Micrometer OTLP** và **Grafana Cloud**.

---

#  Công nghệ sử dụng

| Nhóm công nghệ | Thành phần |
|----------------|------------|
| Hạ tầng | AWS CloudFormation, Amazon VPC, NAT Gateway |
| Backend | Spring Boot, Docker, Amazon ECS Fargate |
| Cơ sở dữ liệu | Amazon RDS SQL Server |
| Frontend | ReactJS, Amazon S3, Amazon CloudFront |
| Bảo mật | AWS WAF, Application Load Balancer (ALB), Origin Access Control (OAC), Parameter Store (AWS Systems Manager) |
| CI/CD | Jenkins Pipeline, Amazon ECR |
| Giám sát | Amazon CloudWatch, Micrometer OTLP, Grafana Cloud |

---

#  Lộ trình Workshop

Workshop được chia thành nhiều giai đoạn nhằm giúp người học từng bước xây dựng một hệ thống Cloud-Native hoàn chỉnh.

| Giai đoạn | Nội dung |
|------------|----------|
| **[Giới thiệu](/5-workshop/5.1-introduction/)** | Tổng quan về hệ thống, kiến trúc và mục tiêu của workshop. |
| **[Chuẩn bị môi trường](/5-workshop/5.2-prerequisites/)** | Thiết lập tài khoản AWS, GitHub và cài đặt các công cụ cần thiết. |
| **[Giai đoạn 1 – Hạ tầng cơ sở](/5-workshop/5.3-phase1-foundation/)** | Khởi tạo VPC, Public/Private Subnet, NAT Gateway và Amazon RDS bằng AWS CloudFormation. |
| **[Giai đoạn 2 – Thiết lập CI/CD](/5-workshop/5.4-phase2-cicd-setup/)** | Cấu hình Jenkins Server, Credentials và Pipeline phục vụ triển khai tự động. |
| **[Giai đoạn 3 – Triển khai Backend & WAF](/5-workshop/5.5-phase3-backend-deployment/)** | Xây dựng Docker Image, đẩy lên Amazon ECR, triển khai Spring Boot lên Amazon ECS Fargate và cấu hình AWS WAF bảo vệ Backend. |
| **[Giai đoạn 4 – Triển khai Frontend & WAF](/5-workshop/5.6-phase4-frontend-deployment/)** | Triển khai ứng dụng React lên Amazon S3, phân phối thông qua Amazon CloudFront và cấu hình AWS WAF bảo vệ Frontend. |
| **[Giai đoạn 5 – Giám sát & Tối ưu hóa](/5-workshop/5.7-phase5-monitoring/)** | Thu thập logs, metrics và theo dõi hiệu năng hệ thống bằng Amazon CloudWatch, Micrometer OTLP và Grafana Cloud. |
| **[Dọn dẹp tài nguyên](/5-workshop/5.8-clean-up/)** | Xóa toàn bộ tài nguyên AWS an toàn nhằm tránh phát sinh chi phí ngoài ý muốn sau khi hoàn thành workshop. |

---

#  Kết quả đạt được

{{% notice info %}}

Sau khi hoàn thành workshop, bạn sẽ xây dựng được một quy trình **CI/CD tự động hoàn chỉnh** có khả năng triển khai cả Backend và Frontend lên AWS theo kiến trúc **Cloud-Native**.
Kiến trúc cuối cùng mô phỏng sát quy trình triển khai trong môi trường doanh nghiệp bằng cách kết hợp **Infrastructure as Code (IaC)**, **Containerization**, **CI/CD**, **Content Delivery**, **Security** và **Observability** thành một hệ thống Production hoàn chỉnh.

{{% /notice %}}