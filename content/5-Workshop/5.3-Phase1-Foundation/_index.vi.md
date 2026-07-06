---
title: "Giai đoạn 1: Nền tảng hạ tầng"
date: 2026-07-02
weight: 3
chapter: true
pre: "<b>5.3.</b> "
---

# Giai đoạn 1 – Nền tảng hạ tầng


Trong giai đoạn này, chúng ta sẽ xây dựng **toàn bộ hạ tầng cốt lõi trên AWS** làm nền tảng cho các bước triển khai tiếp theo. Thay vì tạo tài nguyên thủ công trên AWS Management Console, toàn bộ hạ tầng sẽ được khởi tạo bằng **Infrastructure as Code (IaC)** thông qua **AWS CloudFormation**, giúp việc triển khai nhất quán, dễ bảo trì và có thể tái sử dụng.

---

## Mục tiêu học tập

Sau khi hoàn thành giai đoạn này, bạn sẽ có thể:

- Thiết kế và triển khai **Amazon VPC** theo mô hình **Multi-AZ** nhằm đảm bảo tính sẵn sàng cao
- Phân tách tài nguyên thành **Public Subnet** và **Private Subnet** theo kiến trúc chuẩn của AWS
- Cấu hình kết nối Internet an toàn thông qua **Internet Gateway** và **NAT Gateway**
- Triển khai **Amazon RDS for SQL Server** trong Private Subnet để bảo vệ dữ liệu
- Áp dụng các nguyên tắc thiết kế mạng theo **AWS Well-Architected Framework**
- Tự động hóa toàn bộ quá trình triển khai hạ tầng bằng **AWS CloudFormation**

---

## Dịch vụ AWS sử dụng

| Dịch vụ | Mục đích |
|---------|----------|
| Amazon VPC | Mạng ảo Multi-AZ với các subnet cô lập |
| Internet Gateway | Cho phép truy cập Internet từ public subnet |
| NAT Gateway | Cho phép private subnet kết nối Internet một cách an toàn |
| Route Tables | Điều khiển định tuyến giữa các subnet và gateway |
| Security Groups | Quy tắc tường lửa cấp instance |
| Amazon RDS (SQL Server) | Cơ sở dữ liệu quan hệ được quản lý trong private subnet |
| AWS CloudFormation | Infrastructure as Code – Khởi tạo tài nguyên tự động |

---

## Các bài thực hành

- **[5.3.1 Thiết lập mạng VPC – Stack 1](5.3.1-vpc/)**
  - Xây dựng hạ tầng mạng gồm VPC, Subnet, Route Table, Internet Gateway và NAT Gateway.

- **[5.3.2 Triển khai Amazon RDS – Stack 2](5.3.2-rds/)**
  - Khởi tạo cơ sở dữ liệu SQL Server trong Private Subnet bằng AWS CloudFormation.

---

## Kết quả đạt được

- Sau khi hoàn thành giai đoạn này, bạn sẽ có:
  - Một hệ thống **Amazon VPC Multi-AZ** theo chuẩn Production
  - Kiến trúc mạng an toàn, tuân thủ các khuyến nghị của AWS
  - Một cơ sở dữ liệu **Amazon RDS** hoạt động trong Private Subnet
  - Các CloudFormation Stack có thể dễ dàng cập nhật hoặc xóa khi cần
  - Một nền tảng hạ tầng hoàn chỉnh để tiếp tục triển khai CI/CD ở các giai đoạn tiếp theo

{{% notice tip %}}
Toàn bộ tài nguyên trong giai đoạn này được khởi tạo qua **CloudFormation**. Nếu có lỗi xảy ra, bạn chỉ cần xóa stack và triển khai lại — không cần dọn dẹp thủ công.
{{% /notice %}}