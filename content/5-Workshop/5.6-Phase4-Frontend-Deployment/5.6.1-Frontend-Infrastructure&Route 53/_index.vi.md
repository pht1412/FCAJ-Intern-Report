---
title: "Hạ tầng Frontend & Route 53"
date: 2026-07-02
weight: 561
chapter: false
pre: "<b>5.6.1. </b>"
---

## Mục tiêu của bài lab

Trong bài Lab này, bạn sẽ triển khai hạ tầng Serverless cho Frontend bằng AWS CloudFormation. 

Hệ thống bao gồm một S3 Bucket đóng vai trò làm nơi lưu trữ tĩnh (được chặn public hoàn toàn) và CloudFront (CDN) để phân phối nội dung toàn cầu. Cuối cùng, bạn sẽ dùng Route 53 để trỏ tên miền chính thức về CloudFront.

---

## Mục tiêu học tập

Sau khi hoàn thành bài Lab này, bạn sẽ có thể:

- Yêu cầu chứng chỉ SSL/TLS bằng AWS Certificate Manager (ACM)
- Lưu trữ ARN của chứng chỉ vào AWS Systems Manager Parameter Store
- Triển khai hạ tầng Frontend bằng AWS CloudFormation
- Khởi tạo S3 Bucket và CloudFront Distribution
- Cấu hình Route 53 để trỏ tên miền tùy chỉnh về CloudFront

---

## Dịch vụ AWS sử dụng

| Dịch vụ | Mục đích |
|---------|----------|
| AWS Certificate Manager (ACM) | Cấp chứng chỉ SSL/TLS cho HTTPS |
| AWS Systems Manager Parameter Store | Lưu trữ ARN của chứng chỉ ACM an toàn |
| AWS CloudFormation | Triển khai hạ tầng dưới dạng Code |
| Amazon S3 | Lưu trữ các tệp tĩnh Frontend |
| Amazon CloudFront | Mạng phân phối nội dung (CDN) |
| Amazon Route 53 | Định tuyến DNS tới CloudFront |

---

{{% notice warning %}}
**LƯU Ý CỰC KỲ QUAN TRỌNG VỀ REGION:** 
Dịch vụ Amazon CloudFront **bắt buộc** chứng chỉ SSL/TLS (ACM) phải nằm ở region **US East (N. Virginia) `us-east-1`**. 
Để tránh lỗi không tìm thấy chứng chỉ, chúng ta sẽ thực hiện toàn bộ bài Lab Frontend này tại region **`us-east-1`**.
{{% /notice %}}

---

# Bước 1: Khởi tạo chứng chỉ ACM tại `us-east-1`

Nhìn lên góc trên bên phải của AWS Console, chuyển Region của bạn sang:

```text
US East (N. Virginia)
us-east-1
```

Truy cập vào:

```text
AWS Certificate Manager (ACM)
    └── Request a certificate
```

![Request ACM](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/RequestACM.png)
<center><i>Yêu cầu cấp mới chứng chỉ SSL/TLS công khai qua AWS Certificate Manager.</i></center>

---

Chọn:

```text
Request a public certificate
```

Nhấn **Next**.

Cấu hình chứng chỉ với các thông số sau:

| Thiết lập | Giá trị |
|-----------|---------|
| Fully qualified domain name | Nhập tên miền gốc của bạn (ví dụ: `minisocial-network.id.vn`) |
| Validation method | Chọn DNS validation (Khuyến nghị) |
| Key algorithm | Chọn RSA 2048 |

![Send Request ACM](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/SendRequestACM.png)
<center><i>Cấu hình chứng chỉ công khai với phương thức xác thực DNS.</i></center>

---

Nhấn:

```text
Request
```

Khi chứng chỉ đã được cấp (Issued), hãy vào trang chi tiết và **copy chuỗi ARN** của chứng chỉ.

![Dashboard ACM](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/DashboardACM.png)
<center><i>Sao chép chuỗi ARN của chứng chỉ ACM sau khi đã được cấp phát thành công.</i></center>

---

# Bước 2: Lưu ARN chứng chỉ vào SSM Parameter Store

Vẫn đang ở region **`us-east-1`**, chúng ta cần lưu ARN này lại để CloudFormation có thể tự động đọc được.

Truy cập:

```text
AWS Systems Manager
    └── Parameter Store
            └── Create parameter
```

Cấu hình thông số như sau:

| Thiết lập | Giá trị |
|-----------|---------|
| Name | `/minisocial/frontend/acm-certificate-arn` |
| Type | String |
| Value | Dán chuỗi ARN chứng chỉ bạn vừa copy ở Bước 1 |

Nhấn:

```text
Create parameter
```

---

{{% notice tip %}}
Việc lưu trữ ARN của chứng chỉ trong **AWS Systems Manager Parameter Store** giúp CloudFormation template có thể lấy chứng chỉ tự động mà không cần hardcode ID tài nguyên nhạy cảm vào source code.
{{% /notice %}}

---

# Bước 3: Chạy CloudFormation Stack cho Frontend

{{% notice info %}}
📥 **CloudFormation Template**
Tải xuống file CloudFormation template cho Frontend trước khi tiếp tục.**[Download minisocial-frontend+cloudfront.yaml](/iac/final-minisocial-frontend+cloudfront.yaml)**
{{% /notice %}}

Đảm bảo bạn vẫn đang ở **`us-east-1`**.

Truy cập:

```text
CloudFormation
    └── Stacks
            └── Create stack
                    └── With new resources (standard)
```

Chọn:

```text
Upload a template file
```

Tải lên tệp:

```text
minisocial-frontend+cloudfront.yaml
```

Nhấn **Next**.

![Create Stack FE](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/CreateStack_FE.png)
<center><i>Tải lên template CloudFormation cho Frontend.</i></center>

---

Điền các tham số cấu hình:

| Thiết lập | Giá trị |
|-----------|---------|
| Stack Name | `MiniSocial-Frontend-Stack` |
| FrontendDomainName | Nhập chính xác tên miền của bạn (ví dụ: `minisocial-network.id.vn`) |
| ACM Parameter Path | Giữ nguyên đường dẫn mặc định |

![Create Stack FE 2](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/CreateStack_FE_2.png)
<center><i>Cung cấp tên miền Frontend và giữ nguyên đường dẫn SSM Parameter.</i></center>

---

Nhấn **Next** qua các trang còn lại. Cuối cùng chọn:

```text
Submit
```

Chờ Stack đạt trạng thái:

```text
CREATE_COMPLETE
```

CloudFront distributions thường mất từ **5-10 phút** để hoàn tất việc khởi tạo.

---

**BƯỚC QUAN TRỌNG:** 
Chuyển sang tab **Outputs** của Stack, hãy ghi chú lại 2 giá trị:
- `FrontendBucketName`
- `CloudFrontDistributionId`

Bạn sẽ bắt buộc phải dùng 2 ID này để cấu hình file Jenkinsfile ở bài Lab kế tiếp!

---

# Bước 4: Cấu hình Route 53 trỏ về CloudFront

Truy cập:

```text
Amazon Route 53
    └── Hosted zones
```

Mở Hosted Zone mà bạn đã tạo ở **Phase 3**.

Nhấn:

```text
Create record
```

Cấu hình bản ghi như sau:

| Thiết lập | Giá trị |
|-----------|---------|
| Record Name | Bỏ trống (để sử dụng tên miền gốc) |
| Record Type | A – Routes traffic to an IPv4 address and some AWS resources |
| Alias | Bật (ON) |
| Route traffic to | Chọn **Alias to CloudFront distribution** |
| Value | Chọn CloudFront Distribution bạn vừa tạo |

![Dashboard R53](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/DashboardR53.png)
<center><i>Tạo bản ghi Alias A để trỏ tên miền tùy chỉnh về CloudFront distribution.</i></center>

---

Nhấn:

```text
Create records
```

---

## Kiểm tra kết quả

Trước khi tiếp tục, hãy xác nhận:

- ✅ Chứng chỉ ACM đã được cấp phát thành công
- ✅ Chuỗi ARN của chứng chỉ đã được lưu trong Parameter Store
- ✅ Stack CloudFormation Frontend ở trạng thái **CREATE_COMPLETE**
- ✅ Amazon S3 bucket đã được tạo
- ✅ Amazon CloudFront distribution đã được khởi tạo
- ✅ Bản ghi Route 53 Alias đã trỏ về CloudFront distribution
- ✅ Đã lưu lại Output **FrontendBucketName** và **CloudFrontDistributionId**

---

## Xác minh Frontend Endpoint

Đợi khoảng 1-2 phút để DNS cập nhật. Mở trình duyệt và truy cập:

```text
https://your-domain-name
```
(ví dụ: `https://minisocial-network.id.vn`)

Nếu bạn thấy thông báo **Access Denied** hoặc trang trắng thì xin chúc mừng, bạn đã làm đúng! 
Điều này xảy ra vì S3 Bucket hiện tại đang trống hoàn toàn.

Ở bài Lab tiếp theo, chúng ta sẽ dùng Jenkins Pipeline để Build mã nguồn React và lấp đầy khoảng trống này.

---

{{% notice tip %}}
Chúc mừng! Bạn đã cấp phát thành công toàn bộ hạ tầng Serverless cho MiniSocial Frontend. Trong bài Lab tới, bạn sẽ cấu hình Jenkins CI/CD Pipeline để tự động build ứng dụng React, tải lên Amazon S3 và xóa cache CloudFront sau mỗi lần triển khai.
{{% /notice %}}