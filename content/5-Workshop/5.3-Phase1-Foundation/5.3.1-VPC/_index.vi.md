---
title: "Thiết lập mạng VPC"
date: 2026-07-02
weight: 31
chapter: false
pre: "<b>5.3.1. </b>"
---

## Mục tiêu của bài lab

Trong bài Lab này, bạn sẽ triển khai toàn bộ hạ tầng mạng cho hệ thống **Mini Social Network** bằng **AWS CloudFormation**.

Thay vì tạo thủ công từng tài nguyên trên AWS Management Console, toàn bộ hạ tầng sẽ được khởi tạo bằng **Infrastructure as Code (IaC)**, giúp đảm bảo tính nhất quán, khả năng tái sử dụng và tuân thủ các kiến trúc được AWS khuyến nghị.

---

## Mục tiêu học tập

Sau khi hoàn thành bài Lab này, bạn sẽ có thể:

- Triển khai **Amazon VPC** theo kiến trúc Production
- Xây dựng hạ tầng mạng **Multi-AZ** nhằm tăng tính sẵn sàng
- Cấu hình **Internet Gateway**, **NAT Gateway** và **Application Load Balancer (ALB)**
- Khởi tạo **Amazon ECS Cluster**
- Cấu hình **Amazon S3 Gateway VPC Endpoint** để tối ưu chi phí sử dụng NAT Gateway

---

## Dịch vụ AWS sử dụng

| Dịch vụ | Mục đích |
|---------|----------|
| Amazon VPC | Mạng ảo Multi-AZ với public và private subnet |
| Internet Gateway | Truy cập Internet cho public subnet |
| NAT Gateway | Kết nối Internet an toàn cho private subnet |
| Application Load Balancer | Phân phối tải cho container backend |
| Amazon ECS Cluster | Điều phối container cho ứng dụng backend |
| S3 Gateway VPC Endpoint | Tối ưu truy cập S3 từ private subnet mà không qua NAT Gateway |
| AWS Certificate Manager | Chứng chỉ SSL/TLS cho HTTPS |
| AWS CloudFormation | Infrastructure as Code – Khởi tạo tài nguyên tự động |

---

# Bước 1 – Chuẩn bị môi trường

Trước khi triển khai CloudFormation Stack, hãy hoàn thành các bước chuẩn bị sau.

1. Đăng nhập vào **AWS Management Console**.
2. Chuyển Region sang **ap-southeast-1 (Singapore)**.

{{% notice info %}}
📥 **Tệp CloudFormation**
Vui lòng tải xuống tệp CloudFormation trước khi tiếp tục bài Lab.
**[Tải xuống minisocial-architect.yaml](/iac/final-minisocial-architect.yaml)**
{{% /notice %}}

---

## Tạo chứng chỉ SSL bằng AWS Certificate Manager (ACM)

Để Application Load Balancer hỗ trợ giao thức **HTTPS**, trước tiên bạn cần yêu cầu một chứng chỉ SSL/TLS công khai.

### 1. Truy cập AWS Certificate Manager

Đi tới:

**AWS Certificate Manager → List certificates → Request**

![AWS Certificate Manager Dashboard](/images/5-Workshop/5.3-Phase1-Foundation/DashboardACM.png)
<center><i>AWS Certificate Manager – Giao diện tổng quan.</i></center>

---

### 2. Chọn loại chứng chỉ

Thực hiện các lựa chọn sau:

- **Request a public certificate**

Sau đó nhấn **Next**.

![Request Public Certificate](/images/5-Workshop/5.3-Phase1-Foundation/Request1_ACM.png)
<center><i>Chọn loại chứng chỉ công khai.</i></center>

---

### 3. Cấu hình chứng chỉ

Điền các thông tin sau:

| Thiết lập | Giá trị |
|-----------|---------|
| Domain Name | `minisocial-network.id.vn` *(thay bằng tên miền của bạn)* |
| Validation Method | DNS Validation (Khuyến nghị) |
| Key Algorithm | RSA 2048 |

Nhấn **Request** để gửi yêu cầu.

Sau khi chứng chỉ được tạo thành công, hãy sao chép **Certificate ARN**, có định dạng tương tự:

```text
arn:aws:acm:ap-southeast-1:123456789012:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Bạn sẽ sử dụng ARN này ở bước tiếp theo.

![Certificate Details](/images/5-Workshop/5.3-Phase1-Foundation/Request2_ACM.png)
<center><i>Chi tiết chứng chỉ – sao chép ARN để sử dụng.</i></center>

---

# Bước 2 – Cấu hình ARN của chứng chỉ ACM

Lưu ARN của chứng chỉ vào **AWS Systems Manager Parameter Store**.

Thực hiện lệnh sau:

```bash
aws ssm put-parameter \
    --name "/minisocial/acm/certificate-arn" \
    --value "arn:aws:acm:ap-southeast-1:YOUR_ACCOUNT_ID:certificate/YOUR_CERTIFICATE_ID" \
    --type String \
    --overwrite
```

{{% notice info %}}
CloudFormation sẽ tự động đọc giá trị này trong quá trình triển khai thông qua kiểu tham số `AWS::SSM::Parameter::Value`.
{{% /notice %}}

---

# Bước 3 – Triển khai Stack 1 bằng AWS Console

Thay vì sử dụng AWS CLI, bạn có thể triển khai trực tiếp thông qua giao diện AWS Management Console.

Truy cập:

**CloudFormation → Stacks → Create stack → With new resources (standard)**

### Chuẩn bị Template

1. Chọn **Choose an existing template**
2. Chọn **Upload a template file**
3. Nhấn **Choose file**
4. Chọn tệp **final-minisocial-architect.yaml**

![Create CloudFormation Stack](/images/5-Workshop/5.3-Phase1-Foundation/Create_Stack.png)
<center><i>Tải lên tệp CloudFormation template.</i></center>

Nhấn **Next**.

---

### Cấu hình Stack

Nhập tên Stack:

```text
MiniSocial-Network-Stack
```

Tiếp tục nhấn **Next** ở các bước cấu hình còn lại.

Cuối cùng, kiểm tra lại toàn bộ thông tin và nhấn **Submit** để bắt đầu triển khai.

{{% notice info %}}
Quá trình triển khai thường mất **5–10 phút**. Không đóng trình duyệt trong khi stack đang được tạo.
{{% /notice %}}

---

# Bước 4 – Kiểm tra kết quả triển khai

Đợi đến khi CloudFormation Stack chuyển sang trạng thái **CREATE_COMPLETE**.

![CloudFormation Deployment Complete](/images/5-Workshop/5.3-Phase1-Foundation/Complete_Stack.png)
<center><i>CloudFormation Stack đã triển khai thành công.</i></center>

---

## Xem thông tin Outputs

Mở tab **Outputs** và ghi lại các thông tin sau để sử dụng trong những bài Lab tiếp theo:

- VPC ID
- Public Subnet IDs
- Private Subnet IDs
- Security Group IDs
- ALB DNS Name

![Stack Outputs](/images/5-Workshop/5.3-Phase1-Foundation/Output_Stack1.png)
<center><i>Tab Outputs hiển thị các thông tin tài nguyên đã triển khai.</i></center>

---

## Kiểm tra các tài nguyên AWS

Xác nhận các tài nguyên sau đã được tạo thành công:

| Tài nguyên | Trạng thái mong đợi |
|------------|---------------------|
| MiniSocial-VPC | Đã tạo |
| NAT Gateway | Available |
| Amazon ECS Cluster | Đã tạo |
| Application Load Balancer | Active |

---

### Kiểm tra nhanh

{{% notice info %}}
Mở **DNS Name** của Application Load Balancer trên trình duyệt.
Nếu cấu hình chính xác, hệ thống sẽ tự động chuyển hướng từ **HTTP (Port 80)** sang **HTTPS (Port 443)**.
{{% /notice %}}

---

## Kiểm tra kết quả

Trước khi chuyển sang bài Lab tiếp theo, hãy xác nhận các điều sau:

- ✅ CloudFormation Stack ở trạng thái **CREATE_COMPLETE**
- ✅ Đã tạo thành công **5 Subnet** trên **2 Availability Zones**
- ✅ Private Route Table định tuyến lưu lượng Internet thông qua NAT Gateway
- ✅ Amazon S3 Gateway VPC Endpoint đã được cấu hình thành công
- ✅ Application Load Balancer tự động chuyển hướng HTTP (80) sang HTTPS (443)
- ✅ Amazon ECS Cluster đã được tạo thành công

---

### Xử lý sự cố

{{% notice warning %}}
Nếu CloudFormation Stack chuyển sang trạng thái **ROLLBACK_COMPLETE**, hãy kiểm tra các nội dung sau:

- IAM User của bạn có đủ quyền để triển khai CloudFormation hay không.
- Certificate ARN trong AWS Systems Manager Parameter Store đã chính xác chưa.
- Chứng chỉ ACM có được tạo trong đúng Region **ap-southeast-1 (Singapore)** hay không.
- Tệp CloudFormation đã được tải lên đúng phiên bản hay chưa.
{{% /notice %}}

---

## Kết quả đạt được

Sau khi hoàn thành bài Lab này, bạn sẽ xây dựng thành công nền tảng mạng cho hệ thống Mini Social Network, bao gồm:

- **Amazon VPC** theo kiến trúc Production
- **Public Subnets** và **Private Subnets** theo mô hình Multi-AZ
- **Internet Gateway** và **NAT Gateway**
- **Application Load Balancer (ALB)** với chuyển hướng HTTPS
- **Amazon ECS Cluster**
- **Amazon S3 Gateway VPC Endpoint**
- Hạ tầng hỗ trợ HTTPS thông qua **AWS Certificate Manager**

{{% notice tip %}}
Đây sẽ là nền tảng để triển khai các thành phần tiếp theo của hệ thống như **Amazon RDS**, **Backend**, **Frontend** và **Monitoring** trong các bài Lab kế tiếp.
{{% /notice %}}