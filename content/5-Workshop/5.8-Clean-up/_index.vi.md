---
title: "Dọn dẹp tài nguyên"
date: 2026-07-02
weight: 58
chapter: true
pre: "<b>5.8. </b>"
---

# DỌN DẸP TÀI NGUYÊN

Xin chúc mừng bạn đã hoàn thành xuất sắc Workshop triển khai hệ thống MiniSocial trên AWS!

Để tránh việc phát sinh chi phí không mong muốn, bước **bắt buộc** tiếp theo là phải dọn dẹp và xóa bỏ toàn bộ các tài nguyên đã tạo trong suốt quá trình thực hành. Hãy làm theo hướng dẫn từng bước dưới đây một cách cẩn thận.

---

## BƯỚC 1: Dọn dẹp dữ liệu (Bắt buộc trước khi xóa Stack)

AWS CloudFormation sẽ từ chối xóa Stack nếu Amazon S3 Bucket hoặc Amazon ECR Repository đang chứa dữ liệu. Dù quá trình xóa đã được tự động hóa, bạn vẫn phải thực hiện xóa dữ liệu thủ công trước.

### 1. Dọn dẹp Amazon S3 (Frontend Stack)
- Truy cập vào dịch vụ **Amazon S3**.
- Tìm Bucket chứa mã nguồn Frontend tĩnh của bạn.
- Chọn nút **Empty** để xóa sạch toàn bộ các file bên trong (`index.html`, `css`, `js`...).

![Empty S3 Bucket](/images/5-Workshop/5.8-Clean-up/S3.png)
<center><i>Làm rỗng S3 Bucket trước khi xóa Stack để tránh lỗi Dependency Violation.</i></center>

### 2. Dọn dẹp Amazon ECR (Backend Stack)
- Truy cập vào dịch vụ **Amazon ECR**.
- Tìm Repository có tên `minisocial-backend`.
- Chọn tất cả các Image tags bên trong và nhấn **Delete**.

![Empty ECR Repository](/images/5-Workshop/5.8-Clean-up/ECR.png)
<center><i>Xóa toàn bộ Docker Images bên trong ECR Repository.</i></center>

---

## BƯỚC 2: Thứ tự xóa các Stack trong CloudFormation

Truy cập vào giao diện **AWS CloudFormation**, chuyển sang phần **Stacks** và tiến hành xóa theo đúng thứ tự bắt buộc dưới đây.

{{% notice warning %}}
**Lưu ý Region:** Đảm bảo bạn đang đứng đúng Region trước khi thực hiện xóa.
{{% /notice %}}

### 1. Xóa Stack Frontend (US East - N. Virginia)
- Chuyển sang Region **N. Virginia (us-east-1)**.
- **Hành động:** Chọn stack **Frontend** → **Delete**.
- **Lý do:** Việc này giúp ngắt toàn bộ traffic từ người dùng. CloudFormation sẽ tiến hành xóa CloudFront Distribution (quá trình này có thể mất 5-10 phút để disable và delete hoàn toàn) và xóa S3 Bucket (đã được làm rỗng ở Bước 1).

![CloudFormation US East](/images/5-Workshop/5.8-Clean-up/Cloudformation_US.png)
<center><i>Xóa Stack Frontend tại Region US East (N. Virginia).</i></center>

---

### 2. Xóa Stack Backend (AP Southeast - Singapore)
- Chuyển sang Region **Singapore (ap-southeast-1)**.
- **Hành động:** Chọn stack **Backend** → **Delete**.
- **Lý do:** Khi xóa stack này, CloudFormation sẽ tắt các Fargate Tasks, xóa ECS Cluster, xóa ECR Repository (đã rỗng), và đặc biệt là xóa Target Group cùng Application Load Balancer (ALB). Việc này giúp giải phóng các Network Interfaces (ENI) và Security Groups đang kết nối trong VPC.

![CloudFormation Singapore](/images/5-Workshop/5.8-Clean-up/Cloudformation_Sing.png)
<center><i>Chuyển về Region Singapore để tiếp tục xóa các Stack còn lại.</i></center>

### 3. Xóa Stack DB
- Vẫn ở Region **Singapore (ap-southeast-1)**.
- **Hành động:** Chọn stack **DB** → **Delete**.
- **Lưu ý cực kỳ quan trọng:** Khi xóa Amazon RDS qua CloudFormation, mặc định AWS có thể sẽ cố gắng tạo một bản **Final Snapshot** (Bản sao lưu cuối cùng). Đừng lo lắng, chúng ta sẽ xóa thủ công bản Snapshot này ở Bước 3.

### 4. Xóa Stack Architect (Cuối cùng)
- Vẫn ở Region **Singapore (ap-southeast-1)**.
- **Hành động:** Chọn stack **Architect** → **Delete**.
- **Lý do:** Đây là tầng nền móng của hệ thống (bao gồm VPC, Subnets, Internet Gateway, NAT Gateway, Route Tables). Vì Backend và DB đã bị xóa, các Subnets lúc này hoàn toàn trống. CloudFormation sẽ dọn dẹp sạch sẽ NAT Gateway (tài nguyên tốn nhiều chi phí nhất) và xóa VPC trơn tru mà không gặp lỗi rỉ rác dữ liệu.

---

## BƯỚC 3: Dọn dẹp thủ công trên AWS Console

Sau khi CloudFormation xóa xong các Stack, một số tài nguyên ngoại vi vẫn cần phải được dọn dẹp bằng tay.

### 1. Xóa Amazon RDS Snapshot
- Truy cập vào dịch vụ **Amazon RDS** tại Region **Singapore**.
- Chọn mục **Snapshots** ở thanh menu bên trái.
- Chọn các bản sao lưu (snapshot) cuối cùng vừa được tự động tạo ra và nhấn **Delete**.

![RDS Snapshot](/images/5-Workshop/5.8-Clean-up/Snapshot_RDS.png)
<center><i>Xóa bản sao lưu RDS tự động để tránh phí lưu trữ phát sinh.</i></center>

### 2. Xóa AWS Certificate Manager (ACM)
- **Tại Region Singapore (ap-southeast-1):** 
  - Truy cập **AWS Certificate Manager** → **List certificates**.
  - Chọn các chứng chỉ (Certificates) đã tạo cho Backend và nhấn **Delete**.

![ACM Singapore](/images/5-Workshop/5.8-Clean-up/ACM_Sing.png)
<center><i>Xóa chứng chỉ ACM tại Region Singapore.</i></center>

- **Tại Region N. Virginia (us-east-1):** 
  - Chuyển Region sang **N. Virginia**.
  - Xóa các chứng chỉ (Certificates) đã tạo cho Frontend.

![ACM US East](/images/5-Workshop/5.8-Clean-up/ACM_US.png)
<center><i>Xóa chứng chỉ ACM tại Region N. Virginia.</i></center>

### 3. Xóa AWS Systems Manager - Parameter Store
- **Tại Region N. Virginia (us-east-1):**
  - Truy cập **AWS Systems Manager** → **Parameter Store**.
  - Xóa các parameters hiện tại.

![Parameter Store US East](/images/5-Workshop/5.8-Clean-up/Param_US.png)
<center><i>Dọn dẹp cấu hình Parameter Store tại N. Virginia.</i></center>

- **Tại Region Singapore (ap-southeast-1):**
  - Chuyển về Region **Singapore**.
  - Chọn toàn bộ các parameters của dự án MiniSocial và nhấn **Delete**.

![Parameter Store Singapore](/images/5-Workshop/5.8-Clean-up/Param_Sing.png)
<center><i>Dọn dẹp cấu hình Parameter Store tại Singapore.</i></center>

### 4. Xóa Amazon Route 53 Hosted Zone
- Truy cập vào dịch vụ **Amazon Route 53** (Global).
- Chọn **Hosted zones**.
- Chọn vào Hosted Zone đã tạo (ví dụ: `minisocial-network.id.vn`) và nhấn **Delete**. 
*(Lưu ý: Bạn phải xóa toàn bộ các bản ghi DNS bên trong Hosted Zone trước khi có thể xóa chính Hosted Zone đó).*

![Route 53 Hosted Zone](/images/5-Workshop/5.8-Clean-up/Route53.png)
<center><i>Xóa bản ghi và Hosted Zone trong Route 53 để kết thúc quy trình dọn dẹp.</i></center>

---

{{% notice tip %}}
**Hoàn tất!** Bạn đã dọn dẹp thành công và trả tài khoản AWS về trạng thái an toàn. Cảm ơn bạn đã tham gia MiniSocial Workshop!
{{% /notice %}}