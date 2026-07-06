---
title: "Pipeline CI/CD cho Frontend"
date: 2026-07-02
weight: 562
chapter: false
pre: "<b>5.6.2. </b>"
---

## Mục tiêu của bài lab

Trong bài Lab này, bạn sẽ cấu hình Jenkins để tự động hóa việc triển khai Frontend cho MiniSocial.

Bạn sẽ tạo AWS Credentials cần thiết cho pipeline, cập nhật Jenkinsfile với các giá trị output từ bài Lab trước, cấu hình Jenkins Pipeline Job, và thực thi một quy trình CI/CD hoàn chỉnh để build ứng dụng React, tải lên Amazon S3 và tự động xóa cache (invalidate) trên Amazon CloudFront.

---

## Mục tiêu học tập

Sau khi hoàn thành bài Lab này, bạn sẽ có thể:

- Cấu hình AWS Credentials cho Frontend Jenkins Pipeline
- Cập nhật Frontend Jenkinsfile bằng CloudFormation Outputs
- Tạo Jenkins Pipeline Job cho ứng dụng React
- Tự động build mã nguồn Frontend bằng Jenkins
- Triển khai website tĩnh (static website) lên Amazon S3
- Tự động xóa cache CloudFront sau mỗi lần triển khai

---

## Công cụ & Tài nguyên sử dụng

| Công cụ / Dịch vụ | Mục đích |
|-------------------|----------|
| Jenkins | Máy chủ tự động hóa CI/CD |
| Jenkins Pipeline | Thực thi Pipeline as Code |
| GitHub | Quản lý mã nguồn |
| Node.js & npm | Môi trường chạy JavaScript và quản lý package |
| Amazon S3 | Đích đến lưu trữ các tệp tĩnh đã build |
| Amazon CloudFront | Phân phối nội dung và xóa cache |
| AWS CLI | Tương tác với AWS trong pipeline |

---

# Bước 1 – Tạo AWS Credentials cho Frontend Pipeline

Mặc dù chúng ta đã có AWS Credentials cho Backend, **frontend/Jenkinsfile** sử dụng một Credentials ID hoàn toàn khác.

Truy cập:

```text
Manage Jenkins
    └── Credentials
            └── System
                    └── Global Credentials
```

Nhấn:

```text
Add Credentials
```

Cấu hình chứng chỉ với các thông số sau:

| Thiết lập | Giá trị |
|-----------|---------|
| Kind | AWS Credentials |
| Access Key ID | Access Key của IAM User AWS |
| Secret Access Key | Secret Key của IAM User AWS |
| ID | `aws-frontend-creds` |
| Description | AWS Credentials cho Frontend Pipeline |

Nhấn:

```text
Create
```

---
**Khuyến nghị về Credentials**

{{% notice tip %}}
Bạn hoàn toàn có thể dùng chung bộ IAM User Access Key đã dùng cho Backend.
Quan trọng nhất: Jenkins Credential ID phải được đặt chính xác là **`aws-frontend-creds`**.
ID này được gọi trực tiếp bên trong file **frontend/Jenkinsfile**. Nếu đặt sai, Jenkins sẽ không thể xác thực với AWS.
{{% /notice %}}

---

# Bước 2 – Cập nhật Frontend Jenkinsfile

File **frontend/Jenkinsfile** hiện tại đang chứa các giá trị mẫu cho S3 Bucket và CloudFront. Bạn cần cập nhật chúng bằng các Outputs thu được từ CloudFormation Stack ở **Lab 5.6.1**.

Mở file:

```text
frontend/Jenkinsfile
```

Tìm khối **environment** sau:

```groovy
environment {
    AWS_REGION         = "us-east-1"

    S3_BUCKET_NAME     = "minisocial-frontend-xxxxxxxx"

    CLOUDFRONT_DIST_ID = "XXXXXXXXXXXX"

    VITE_API_BASE_URL  = "https://api.minisocial-network.id.vn"
}
```

Cập nhật lại các biến như sau:

| Biến số | Thay bằng |
|---------|-----------|
| AWS_REGION | `us-east-1` |
| S3_BUCKET_NAME | Giá trị `FrontendBucketName` từ CloudFormation Outputs |
| CLOUDFRONT_DIST_ID | Giá trị `CloudFrontDistributionId` từ CloudFormation Outputs |
| VITE_API_BASE_URL | Tên miền Backend API của bạn |

---
**Kiểm tra kỹ trước khi tiếp tục:**

{{% notice warning %}}
- Biến `AWS_REGION = "us-east-1"` phải được thiết lập đúng.
- Cả ACM Certificate và Frontend Stack đều phải nằm ở **`us-east-1`**.
**Nhắc lại:** Amazon CloudFront chỉ hỗ trợ chứng chỉ ACM ở region N. Virginia.
{{% /notice %}}

---

Sau khi đã sửa Jenkinsfile:

- Commit thay đổi.
- Push mã nguồn mới nhất lên GitHub.

---

# Bước 3 – Cấu hình Frontend Pipeline Job

Quay lại màn hình Jenkins Dashboard.

Nhấn:

```text
New Item
```

Tạo một project **Pipeline** mới. Ví dụ:

```text
MiniSocial-Frontend-Pipeline
```

---

Trong phần **Pipeline**, cấu hình như sau:

| Thiết lập | Giá trị |
|-----------|---------|
| Definition | Pipeline script from SCM |
| SCM | Git |
| Repository URL | Đường dẫn GitHub Repository của bạn |
| Credentials | GitHub Credentials của bạn |
| Branch | main (hoặc nhánh đang sử dụng) |
| Script Path | frontend/Jenkinsfile |

Điền cấu hình Pipeline theo hình minh họa dưới đây.

![Configure Jenkins Pipeline](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ConfigPipeline.png)
<center><i>Cấu hình Pipeline để Jenkins lấy trực tiếp Jenkinsfile từ GitHub bằng tùy chọn Pipeline script from SCM.</i></center>

Sau khi hoàn tất, nhấn:

```text
Apply
```

Sau đó nhấn:

```text
Save
```

---

{{% notice tip %}}
Sử dụng **Pipeline script from SCM** đảm bảo Jenkins luôn tải về và chạy file Jenkinsfile mới nhất trên GitHub thay vì phải copy paste code thủ công.
{{% /notice %}}

---

Quay trở lại màn hình chính của Jenkins (Dashboard), bạn sẽ thấy Pipeline vừa tạo đã xuất hiện và sẵn sàng hoạt động.

![Jenkins Dashboard](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/DashboardJenkins.png)
<center><i>Giao diện Jenkins Dashboard hiển thị Pipeline đã được khởi tạo thành công.</i></center>

---

# Bước 4 – Chạy Frontend Pipeline

Trước khi chạy Pipeline, hãy đảm bảo:

- Jenkins đang chạy.
- Docker Desktop đang chạy.
- Máy tính có kết nối Internet.
- Đã push file Jenkinsfile mới nhất lên GitHub.

---

### Xác minh Region

{{% notice warning %}}
**Xác minh Region**
Trước khi chạy, hãy chắc chắn rằng `AWS_REGION = "us-east-1"` đã được lưu trong **frontend/Jenkinsfile**.
S3 bucket và CloudFront cũng phải nằm ở **us-east-1**. Nếu sai region, các file tĩnh sẽ bị upload nhầm bucket.
{{% /notice %}}

---

Nhấn:

```text
Build Now
```

Theo dõi Console Output. Nếu mọi thứ cấu hình đúng, Jenkins sẽ chạy các bước sau:

1. Clone mã nguồn từ GitHub.
2. Cài đặt các Node.js dependencies (`npm install`).
3. Build ứng dụng React/Vite (`npm run build`).
4. Upload toàn bộ thư mục **dist/** lên Amazon S3.
5. Dọn dẹp các tệp cũ trên S3 bucket.
6. Xóa cache CloudFront (`/*`).

Khi Pipeline chạy thành công, giao diện sẽ hiển thị màu xanh:

![Successful Frontend Pipeline](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/BuildSuccess_FE.png)
<center><i>Frontend Pipeline đã tự động build React app, tải lên S3 và xóa cache CloudFront thành công.</i></center>

---

## Kiểm tra kết quả

Trước khi tiếp tục, hãy xác nhận:

- ✅ Frontend Pipeline hoàn thành thành công
- ✅ Ứng dụng React build không lỗi
- ✅ Các tệp tĩnh đã được đẩy lên S3
- ✅ File cũ trên S3 đã bị xóa
- ✅ Quá trình Invalidate Cache CloudFront thành công

---

## Xác minh Website Frontend

Mở trình duyệt và truy cập tên miền Frontend của bạn.
Ví dụ:

```text
https://minisocial-network.id.vn
```

Nếu thành công:

- Giao diện MiniSocial sẽ hiển thị đầy đủ.
- Các file tĩnh (HTML, CSS, JS) được tải cực nhanh qua CloudFront.
- Có thể thao tác (Đăng nhập, xem feed) và kết nối với Backend API thành công.

---

{{% notice tip %}}
Chúc mừng! Bạn đã hoàn thành Frontend CI/CD Pipeline. Từ giờ trở đi, Jenkins sẽ tự động build ứng dụng React, đồng bộ file lên S3 và refresh CloudFront cache để người dùng luôn nhận được giao diện mới nhất mỗi khi bạn commit code.
{{% /notice %}}
