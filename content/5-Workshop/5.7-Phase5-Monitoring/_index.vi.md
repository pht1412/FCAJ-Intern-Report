---
title: "Giai đoạn 5: Giám sát & Tối ưu"
date: 2026-07-02
weight: 57
chapter: true
pre: "<b>5.7.</b> "
---

# Giai đoạn 5 – Giám sát & Tối ưu

Chào mừng bạn đến với Giai đoạn 5. Đưa ứng dụng lên môi trường thực tế mới chỉ là bước khởi đầu. Trong một hệ thống chuẩn Production, bạn cần phải có khả năng giám sát và theo dõi hiệu suất của hệ thống liên tục dưới các điều kiện tải khác nhau.

Trong giai đoạn này, chúng ta sẽ sử dụng **OpenTelemetry (OTLP)** để thu thập các số liệu (metrics) từ Spring Boot Backend. Thay vì chỉ đọc log theo cách thủ công, chúng ta sẽ trực quan hóa dữ liệu thông qua **Grafana** bằng các bảng điều khiển (Dashboard) theo dõi CPU, RAM và độ trễ API theo thời gian thực. Để kiểm tra giới hạn của kiến trúc và xác minh tính năng Auto Scaling của Amazon ECS đã thiết lập ở Giai đoạn 3, chúng ta sẽ dùng công cụ **Grafana K6** để bắn hàng ngàn request giả lập vào hệ thống.

---

## Dịch vụ & Công cụ sử dụng

| Công cụ / Dịch vụ | Mục đích |
|-------------------|----------|
| OpenTelemetry (OTLP) | Tích hợp thu thập thông số hiệu suất từ ứng dụng |
| Grafana Cloud | Xây dựng Dashboard trực quan hóa dữ liệu theo thời gian thực |
| Grafana K6 | Công cụ mã nguồn mở dùng để giả lập tải lượng lớn (Load Testing) |
| Amazon ECS & Fargate | Quan sát hành vi Auto-Scaling của container khi bị quá tải |

---

## Các bài thực hành

- **[5.7.1 Grafana & Thử tải hệ thống](5.7.1-/)**
  - Thiết lập thu thập OTLP Metrics, chạy kịch bản thử tải bằng K6, quan sát biểu đồ trên Grafana và xác minh quá trình Auto-Scaling tự động của Amazon ECS.

---

## Kết quả đạt được

- Sau khi hoàn thành giai đoạn này, bạn sẽ có:
  - Khả năng **giám sát toàn diện** (Observability) trạng thái của ứng dụng.
  - Một **Grafana Dashboard** chuyên nghiệp để theo dõi CPU, RAM, và số lượng Request.
  - Kinh nghiệm thực tế về **Load Testing** với công cụ K6.
  - Bằng chứng xác nhận hệ thống **Amazon ECS Auto Scaling** hoạt động chính xác khi có lượng lớn người truy cập.

{{% notice tip %}}
Sau khi hoàn thành **Giai đoạn 5**, bạn đã nâng cấp thành công một hệ thống cơ bản thành một kiến trúc hoàn thiện, sẵn sàng đối mặt và mở rộng tự động với mọi thách thức từ lưu lượng truy cập thực tế!
{{% /notice %}}