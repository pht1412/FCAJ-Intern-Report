---
title: "Thiết lập Database Amazon RDS"
date: 2026-07-02
weight: 32
chapter: false
pre: "<b>5.3.2. </b>"
---

## Mục tiêu của bài lab

Trong bài Lab này, bạn sẽ triển khai hạ tầng cơ sở dữ liệu cho hệ thống **Mini Social Network** bằng **AWS CloudFormation**.

Để đảm bảo tính bảo mật và tối ưu chi phí vận hành, cơ sở dữ liệu sẽ được triển khai hoàn toàn trong **Private Subnet**. Đồng thời, hệ thống sẽ tích hợp **Amazon EventBridge Scheduler** để tự động bật/tắt cơ sở dữ liệu theo khung giờ định sẵn, giúp tiết kiệm chi phí AWS trong môi trường học tập và phát triển.

---

## Mục tiêu học tập

Sau khi hoàn thành bài Lab này, bạn sẽ có thể:

- Triển khai **Amazon RDS for SQL Server** theo kiến trúc chuẩn Enterprise
- Bảo vệ cơ sở dữ liệu trong **Private Subnet**, chỉ cho phép Backend (Amazon ECS) truy cập
- Cấu hình **Amazon EventBridge Scheduler** để tự động bật/tắt cơ sở dữ liệu
- Thiết lập cơ chế sao lưu tự động bằng **Backup Retention**
- Bảo vệ dữ liệu bằng **Storage Encryption**

---

## Dịch vụ AWS sử dụng

| Dịch vụ | Mục đích |
|---------|----------|
| Amazon RDS (SQL Server) | Cơ sở dữ liệu quan hệ được quản lý cho ứng dụng |
| DB Subnet Group | Đặt cơ sở dữ liệu trong private subnet |
| Security Group | Kiểm soát truy cập vào cơ sở dữ liệu (port 1433) |
| Amazon EventBridge Scheduler | Tự động bật/tắt cơ sở dữ liệu theo lịch trình |
| IAM Role | Cấp quyền cho EventBridge quản lý RDS instance |
| AWS CloudFormation | Infrastructure as Code – Khởi tạo tài nguyên tự động |

---

# Bước 1 – Chuẩn bị môi trường

Trước khi triển khai Database Stack, hãy hoàn thành các bước chuẩn bị sau.

1. Đăng nhập vào **AWS Management Console**.
2. Chuyển Region sang **ap-southeast-1 (Singapore)**.

{{% notice info %}}
📥 **Tệp CloudFormation**
Tải xuống template CloudFormation trước khi tiếp tục.
**[Tải xuống minisocial-db.yaml](/iac/final-minisocial-db.yaml)**
{{% /notice %}}

---

## Thu thập Output từ Stack 1

Database Stack cần sử dụng một số giá trị đầu ra được tạo từ **Stack VPC Networking** ở bài Lab trước.

Mở **MiniSocial-Network-Stack**, chuyển sang tab **Outputs** và ghi lại các thông tin sau:

- `VpcId`
- `PrivateSubnetComputeId`
- `PrivateSubnetDataId`
- `BackendSecurityGroupId`

![CloudFormation Stack Outputs](/images/5-Workshop/5.3-Phase1-Foundation/Output_Stack1.png)
<center><i>Stack 1 Outputs – các giá trị cần thiết cho việc triển khai database stack.</i></center>

---

# Bước 2 – Triển khai Database Stack

Chúng ta sẽ triển khai Database thông qua giao diện **AWS CloudFormation Console**.

Truy cập:

**CloudFormation → Stacks → Create stack → With new resources (standard)**

---

## Tải lên CloudFormation Template

Trong phần **Prerequisite**, chọn:

1. Chọn **Upload a template file**
2. Chọn file **final-minisocial-db.yaml**

![Upload Database Template](/images/5-Workshop/5.3-Phase1-Foundation/Create_Stack1.png)
<center><i>Tải lên tệp CloudFormation template cho database.</i></center>

Nhấn **Next**.

---

## Cấu hình Stack

Đặt tên Stack:

```text
MiniSocial-Database-Stack
```

Nhập các Parameter đã lấy từ **Stack 1**:

| Tham số | Nguồn |
|---------|-------|
| VpcId | Từ Stack 1 Outputs |
| PrivateSubnetComputeId | Từ Stack 1 Outputs |
| PrivateSubnetDataId | Từ Stack 1 Outputs |
| BackendSecurityGroupId | Từ Stack 1 Outputs |
| DBMasterPassword | Nhập mật khẩu mạnh |

{{% notice warning %}}
Không sử dụng các ký tự `/` hoặc `@` trong **DBMasterPassword**, vì có thể gây lỗi khi cấu hình JDBC URL trong các bước triển khai Backend sau này.
{{% /notice %}}

![Configure Stack Parameters](/images/5-Workshop/5.3-Phase1-Foundation/Create_Stack1_2.png)
<center><i>Nhập các tham số từ Stack 1 Outputs.</i></center>

Tiếp tục nhấn **Next** qua các bước cấu hình còn lại.

Kiểm tra lại toàn bộ thông tin rồi nhấn **Submit** để bắt đầu triển khai.

{{% notice info %}}
Quá trình triển khai thường mất **5–10 phút**. Không đóng trình duyệt trong khi stack đang được tạo.
{{% /notice %}}

---

# Bước 3 – Kiểm tra kết quả triển khai

Đợi đến khi CloudFormation Stack chuyển sang trạng thái **CREATE_COMPLETE**.

![CloudFormation Deployment Complete](/images/5-Workshop/5.3-Phase1-Foundation/Complete_Stack.png)
<center><i>Database Stack đã triển khai thành công.</i></center>

---

## Kiểm tra Amazon RDS

Truy cập **Amazon RDS Console**.

Tìm Database Instance có tên:

```text
minisocial-sqlserver
```

Xác nhận trạng thái là **Available**.

![Trạng thái Amazon RDS](/images/5-Workshop/5.3-Phase1-Foundation/CheckDB.png)
<center><i>Xác nhận cơ sở dữ liệu <strong>minisocial-sqlserver</strong> đang ở trạng thái <strong>Available</strong>.</i></center>

---

## Kiểm tra EventBridge Scheduler

Mở **Amazon EventBridge Scheduler**.

Đảm bảo đã xuất hiện hai lịch trình:

| Lịch trình | Trạng thái mong đợi |
|------------|---------------------|
| Auto Start Schedule | Enabled |
| Auto Stop Schedule | Enabled |

![Amazon EventBridge Scheduler](/images/5-Workshop/5.3-Phase1-Foundation/CheckEvtBridge.png)
<center><i>Xác nhận hai lịch trình <strong>Auto Start</strong> và <strong>Auto Stop</strong> đều ở trạng thái <strong>Enabled</strong>.</i></center>

---

## Kiểm tra múi giờ

Mở một trong hai Schedule và xác nhận múi giờ được cấu hình là:

```text
Asia/Ho_Chi_Minh
```

Điều này đảm bảo cơ sở dữ liệu được bật và tắt theo đúng giờ Việt Nam.

---

{{% notice info %}}
**DeletionPolicy: Snapshot**
Database Stack được cấu hình với `DeletionPolicy: Snapshot`. Nếu bạn xóa CloudFormation Stack, AWS sẽ tự động tạo một bản Snapshot cuối cùng của cơ sở dữ liệu trước khi xóa RDS, giúp tránh mất dữ liệu ngoài ý muốn.
{{% /notice %}}

---

## Kiểm tra kết quả

Trước khi chuyển sang bài Lab tiếp theo, hãy xác nhận:

- ✅ CloudFormation Stack ở trạng thái **CREATE_COMPLETE**
- ✅ RDS được triển khai trong Private Subnet
- ✅ Public Accessibility đã được tắt
- ✅ Storage Encryption đã được bật
- ✅ Chỉ **BackendSecurityGroup** được phép truy cập cổng **1433**
- ✅ EventBridge Scheduler đã được kích hoạt
- ✅ Lịch trình tự động tắt lúc **22:00** và bật lúc **07:00** (giờ Việt Nam)

---

### Xử lý sự cố

{{% notice warning %}}
Nếu CloudFormation Stack chuyển sang trạng thái **ROLLBACK_COMPLETE**, hãy kiểm tra:

- Mật khẩu **DBMasterPassword** không chứa các ký tự đặc biệt như `/` hoặc `@`.
- Các giá trị VPC ID, Subnet ID và Backend Security Group ID được lấy đúng từ **Stack 1**.
- File CloudFormation Template đã được tải lên đúng.
- Bạn đang triển khai tại Region **ap-southeast-1 (Singapore)**.
{{% /notice %}}

---

## Kết quả đạt được

Sau khi hoàn thành bài Lab này, hạ tầng cơ sở dữ liệu đã sẵn sàng cho các bước triển khai Backend, bao gồm:

- **Amazon RDS for SQL Server** (Express Edition)
- Cơ sở dữ liệu được bảo vệ trong **Private Subnet**
- Kiến trúc bảo mật chuẩn Enterprise với **Security Group** và **Storage Encryption**
- Cơ chế sao lưu tự động với **Backup Retention 7 ngày**
- Tối ưu chi phí nhờ **Amazon EventBridge Scheduler**
- Tự động tạo Snapshot khi xóa CloudFormation Stack để bảo vệ dữ liệu

{{% notice tip %}}
Endpoint của cơ sở dữ liệu được tạo trong bài Lab này sẽ được sử dụng ở giai đoạn tiếp theo khi triển khai ứng dụng **Spring Boot Backend** lên **Amazon ECS Fargate**.
{{% /notice %}}