---
title: "Thiết lập WAF & Route 53"
date: 2026-07-02
weight: 55
chapter: false
pre: "<b>5.5.5. </b>"
---

## Mục tiêu của bài lab

Trong bài Lab này, bạn sẽ tăng cường khả năng bảo mật và khả năng truy cập của hệ thống Backend.

Đầu tiên, bạn sẽ tạo một **AWS WAF Web ACL** để bảo vệ **ALB** khỏi các cuộc tấn công phổ biến trên web. Sau đó, bạn sẽ cấu hình **Amazon Route 53** để ánh xạ tên miền tới ALB, chuẩn bị cho HTTPS.

---

## Mục tiêu học tập

Sau khi hoàn thành bài Lab này, bạn sẽ có thể:

- Tạo AWS WAF Web ACL để bảo vệ Backend
- Liên kết Web ACL với Application Load Balancer
- Cấu hình các Managed Rules của AWS
- Tạo Public Hosted Zone trên Amazon Route 53
- Tạo bản ghi Alias trỏ tên miền tới ALB
- Lấy Name Servers (NS) để cấu hình tại nhà cung cấp tên miền

---

## Dịch vụ AWS sử dụng

| Dịch vụ | Mục đích |
|---------|----------|
| AWS WAF | Tường lửa ứng dụng web cho ALB |
| Application Load Balancer | Phân phối tải cho Backend |
| Amazon Route 53 | Quản lý DNS cho tên miền |
| Public Hosted Zone | Vùng DNS công khai |

---

# Bước 1 – Tạo AWS WAF Web ACL

Truy cập:

```text
AWS WAF
```

![AWS WAF Dashboard](/images/5-Workshop/5.5-Phase3-Backend-Deployment/DashboardWAF.png)

<center><i>Mở bảng điều khiển AWS WAF để tạo Web ACL bảo vệ Application Load Balancer.</i></center>

---

Nhấn:

```text
Create protection pack (Web ACL)
```

Sau đó cấu hình:

- **Application Category:** Both API and Web
- **Resource:** Chọn Application Load Balancer của Backend

![Create WAF](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateWAF_1.png)

<center><i>Liên kết Web ACL với Application Load Balancer để bảo vệ toàn bộ lưu lượng truy cập đến Backend.</i></center>

---

# Bước 2 – Cấu hình các Rule bảo mật

Trong phần **Rules**, chúng ta sẽ thêm 4 Rule (bao gồm 2 Custom Rules và 2 AWS Managed Rules).

### 2.1 Tạo Rule: PostAndProfile (Custom Rule)

Đầu tiên, bạn cần tạo Rule cho phép các API cụ thể đi qua WAF.
- Nhấn **Add Rule** → **Add my own rules and rule groups** (Custom Rule).
- Cấu hình theo các thông số sau:
  - **Rule Name**: `PostAndProfile`
  - **If a request**: `matches at least one of the statements (OR)`

![PostAndProfile Statement 1](/images/5-Workshop/5.5-Phase3-Backend-Deployment/RulePost%26Profile_1.png)
<center><i>Thiết lập Statement đầu tiên cho API profile.</i></center>

- **Statement 1**:
  - **Inspect**: `URI Path`
  - **Match type**: `Starts with string`
  - **String to match**: `/api/auth/profile`
- Nhấn **Add another statement** để thêm điều kiện thứ 2:
  - **Inspect**: `URI Path`
  - **Match type**: `Starts with string`
  - **String to match**: `/api/posts`

![PostAndProfile Statement 2](/images/5-Workshop/5.5-Phase3-Backend-Deployment/RulePost%26Profile_2.png)
<center><i>Thiết lập Statement thứ hai cho API posts và cấu hình Action Allow.</i></center>

- Nhấn **Add Rule** để hoàn thành tạo Rule.

---

### 2.2 Tạo Rule: Block-DDoS-Login (Rate-based Rule)

Rule này dùng để giới hạn số lượng request gọi vào API Login nhằm chống lại tấn công DDoS hoặc Brute Force.
- Nhấn **Add Rule** → **Add my own rules and rule groups** (Custom Rule).
- Chọn loại **Rate-based rule**.
- Cấu hình theo các thông số sau:
  - **Rule Name**: `Block-DDoS-Login`
  - **Rate limit**: `100` (Tối đa 100 request)
  - **Evaluation window**: `5 minutes` (Trong mỗi 5 phút)
  - **Request criteria**: Chọn `Only consider requests that match the criteria in a rule statement`

![Block DDoS Login 1](/images/5-Workshop/5.5-Phase3-Backend-Deployment/Block-DDoS-Login_1.png)
<center><i>Cấu hình giới hạn Rate limit cho API Login.</i></center>

- Ở phần Statement bên dưới:
  - **If a request**: `matches the statement`
  - **Inspect**: `URI path`
  - **Match type**: `Starts with string`
  - **String to match**: `/api/auth/login`

![Block DDoS Login 2](/images/5-Workshop/5.5-Phase3-Backend-Deployment/Block-DDoS-Login_2.png)
<center><i>Thiết lập Statement chặn các request vượt ngưỡng và chọn Action Block.</i></center>

- Nhấn **Add Rule** để hoàn thành tạo Rule.

---

### 2.3 Thêm AWS Managed Rules

Tiếp theo, thêm các bộ quy tắc (Managed Rules) có sẵn của AWS để bảo vệ hệ thống khỏi các lỗ hổng phổ biến:
- Nhấn **Add Rule** → **Add managed rule groups**.
- Thêm hai Rule sau vào Web ACL:
  - **AWS Managed Rules Common Rule Set**
  - **AWS Managed Rules SQL Injection Rule Set**

Sau khi hoàn tất, danh sách Rules của bạn sẽ bao gồm 4 Rule và có thứ tự tương tự như sau:

![WAF Rules](/images/5-Workshop/5.5-Phase3-Backend-Deployment/RuleWAF.png)
<center><i>Kết hợp các Custom Rules và Managed Rules để tăng cường bảo vệ cho Backend API.</i></center>

---

{{% notice tip %}}

AWS Managed Rules giúp bảo vệ ứng dụng khỏi nhiều mối đe dọa phổ biến như:
- SQL Injection
- Cross-site Scripting (XSS)
- Local File Inclusion
- HTTP Request bất thường
- Các lỗ hổng OWASP Top 10

{{% /notice %}}

---

# Bước 3 – Tạo Hosted Zone trên Amazon Route 53

Truy cập:

```text
Amazon Route 53
    └── Hosted zones
```

![Route 53 Dashboard](/images/5-Workshop/5.5-Phase3-Backend-Deployment/R53Dashboard.png)

<center><i>Mở Amazon Route 53 để quản lý DNS cho tên miền của bạn.</i></center>

---

Nhấn:

```text
Create hosted zone
```

Sau đó cấu hình:

| Thiết lập | Giá trị |
|-----------|----------|
| Domain name | Tên miền của bạn (ví dụ: minisocial-network.id.vn) |
| Type | Public Hosted Zone |

![Create Hosted Zone](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateR53.png)

<center><i>Tạo Public Hosted Zone để Route 53 quản lý DNS cho tên miền.</i></center>

---

Sau vài phút, Hosted Zone sẽ được tạo thành công.

![Hosted Zone Created](/images/5-Workshop/5.5-Phase3-Backend-Deployment/R53Dashboard_2.png)

<center><i>Hosted Zone sau khi được tạo thành công trên Amazon Route 53.</i></center>

---

{{% notice warning %}}

Sau khi Hosted Zone được tạo, hãy mở phần **Details** và sao chép **4 Name Servers (NS Records)**.
Bạn phải cập nhật 4 Name Servers này tại trang quản lý tên miền của nhà cung cấp (Registrar) để tên miền sử dụng hệ thống DNS của Amazon Route 53.
Nếu không thực hiện bước này, tên miền sẽ không thể phân giải đến AWS.

{{% /notice %}}

---

# Bước 4 – Tạo bản ghi Alias trỏ đến ALB

Trong Hosted Zone vừa tạo, nhấn:

```text
Create Record
```

Cấu hình:

| Thiết lập | Giá trị |
|-----------|----------|
| Record Name | Để trống (Root Domain) hoặc nhập subdomain |
| Record Type | A |
| Alias | Yes |
| Alias Target | Application Load Balancer của Backend |

![Create Route 53 Record](/images/5-Workshop/5.5-Phase3-Backend-Deployment/Create_Record.png)

<center><i>Tạo bản ghi Alias để ánh xạ tên miền đến Application Load Balancer.</i></center>

---

Sau khi tạo xong, Route 53 sẽ tự động định tuyến lưu lượng từ tên miền tới Application Load Balancer.

Sau khi quá trình cập nhật DNS hoàn tất, người dùng có thể truy cập Backend thông qua tên miền thay vì sử dụng trực tiếp địa chỉ ALB.

---

## Kiểm tra kết quả

Trước khi tiếp tục, hãy xác nhận các mục sau:

- ✅ AWS WAF Web ACL đã được tạo
- ✅ Web ACL đã được liên kết với ALB
- ✅ Các Managed Rules của AWS đã được thêm
- ✅ Public Hosted Zone đã được tạo
- ✅ Đã sao chép 4 Name Servers để cập nhật tại nhà cung cấp tên miền
- ✅ Bản ghi Alias đã trỏ tới ALB
- ✅ Tên miền đã sẵn sàng để cấu hình HTTPS

---

{{% notice tip %}}

Chúc mừng!
Backend của bạn hiện đã được bảo vệ bởi AWS WAF và có thể truy cập thông qua tên miền riêng bằng Amazon Route 53.
Ở bài Lab tiếp theo, chúng ta sẽ yêu cầu chứng chỉ SSL/TLS bằng AWS Certificate Manager (ACM) và cấu hình HTTPS để hoàn thiện hệ thống với kết nối bảo mật đầu cuối.

{{% /notice %}}