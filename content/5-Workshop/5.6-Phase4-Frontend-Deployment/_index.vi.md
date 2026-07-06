---
title: "Giai đoạn 4: Triển khai Frontend"
date: 2026-07-02
weight: 6
chapter: true
pre: "<b>5.6.</b> "
---

# Giai đoạn 4 – Triển khai Frontend

Trong giai đoạn này, bạn sẽ triển khai **Frontend của MiniSocial**, được xây dựng bằng **React** và **Vite**, trên AWS theo kiến trúc **Serverless** hiện đại.

Thay vì vận hành một máy chủ web truyền thống, Frontend sẽ được triển khai dưới dạng **Single Page Application (SPA)** trên Amazon S3 và phân phối toàn cầu thông qua Amazon CloudFront. Kết hợp với Amazon Route 53 và AWS Certificate Manager (ACM), kiến trúc này mang lại khả năng sẵn sàng cao, độ trễ thấp, mã hóa HTTPS tự động và khả năng mở rộng gần như không giới hạn.

---

## Quy trình CI/CD cho Frontend

Khác với Backend, Pipeline của Frontend tập trung vào việc triển khai các tệp tĩnh một cách nhanh chóng và hiệu quả. Jenkins Pipeline sẽ tự động thực hiện các bước sau:

1. Clone mã nguồn từ GitHub.
2. Cài đặt các thư viện Node.js.
3. Build ứng dụng React (Vite) đã được tối ưu hóa.
4. Đồng bộ thư mục `dist/` lên Amazon S3.
5. Xóa các tệp cũ không còn sử dụng trong S3 Bucket.
6. Thực hiện CloudFront Cache Invalidation để người dùng ngay lập tức nhận được phiên bản mới nhất của ứng dụng.

---

## Dịch vụ AWS sử dụng

| Dịch vụ | Mục đích |
|---------|----------|
| Amazon S3 | Lưu trữ toàn bộ các tệp tĩnh (HTML, CSS, JS, hình ảnh) |
| Amazon CloudFront | Mạng CDN phân phối website toàn cầu hỗ trợ HTTPS |
| Origin Access Control (OAC) | Đảm bảo S3 Bucket chỉ cho phép CloudFront truy cập |
| AWS Certificate Manager (ACM) | Cấp chứng chỉ SSL/TLS để kích hoạt HTTPS |
| Amazon Route 53 | Quản lý DNS và ánh xạ tên miền tùy chỉnh |
| AWS WAF | Tường lửa bảo vệ lớp Frontend |

---

## Các bài thực hành

- **[5.6.1 Hạ tầng Frontend & Route 53](5.6.1-/)**
  - Yêu cầu chứng chỉ ACM, triển khai CloudFormation Stack, và kết nối tên miền bằng Amazon Route 53.

- **[5.6.2 Pipeline CI/CD cho Frontend](5.6.2-/)**
  - Cấu hình Jenkins Pipeline, cập nhật Jenkinsfile với Output từ CloudFormation, và tự động hóa quá trình build và deploy ứng dụng React.

- **[5.6.3 Bảo mật Frontend với AWS WAF](5.6.3-/)**
  - Tạo AWS WAF Web ACL cho CloudFront để bảo vệ website khỏi các cuộc tấn công phổ biến.

---

## Kết quả đạt được

- Sau khi hoàn thành giai đoạn này, bạn sẽ có:
  - **Frontend React** được lưu trữ hoàn toàn trên Amazon S3
  - **Phân phối toàn cầu** với độ trễ thấp thông qua Amazon CloudFront
  - **Bảo mật kết nối HTTPS** với ACM và Route 53
  - **Bảo mật ứng dụng Web** bằng AWS WAF
  - Một **Jenkins CI/CD Pipeline** tự động giúp rút ngắn thời gian triển khai

{{% notice tip %}}
Sau khi hoàn thành **Giai đoạn 4**, ứng dụng MiniSocial sẽ được truy cập thông qua tên miền tùy chỉnh của bạn bằng giao thức **HTTPS**, hoàn tất toàn bộ quá trình triển khai Full-Stack!
{{% /notice %}}