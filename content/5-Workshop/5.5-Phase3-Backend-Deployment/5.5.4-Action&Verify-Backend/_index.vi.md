---
title: "Chạy Pipeline & Kiểm tra Backend"
date: 2026-07-02
weight: 54
chapter: false
pre: "<b>5.5.4. </b>"
---

## Mục tiêu của bài lab

Trong bài Lab này, bạn sẽ hoàn tất quá trình triển khai Backend.

Đầu tiên, bạn sẽ tạo một Amazon S3 Bucket để lưu trữ các tệp do người dùng tải lên. Tiếp theo, bạn sẽ thực thi Jenkins Pipeline lần thứ hai. Vì hạ tầng Amazon ECS đã được triển khai, quá trình sẽ hoàn thành thành công.

Cuối cùng, bạn sẽ xác minh rằng ứng dụng Backend đang hoạt động chính xác thông qua API Health Check.

---

## Mục tiêu học tập

Sau khi hoàn thành bài Lab này, bạn sẽ có thể:

- Tạo Amazon S3 Bucket để lưu trữ tệp tải lên của ứng dụng
- Cấu hình Bucket lưu trữ được sử dụng bởi dịch vụ Backend
- Thực thi Jenkins Pipeline thành công
- Triển khai Docker Image mới nhất lên Amazon ECS
- Xác minh rằng API Backend có thể truy cập thông qua ALB

---

## Dịch vụ AWS sử dụng

| Dịch vụ | Mục đích |
|---------|----------|
| Amazon S3 | Lưu trữ tệp media do người dùng upload |
| Jenkins Pipeline | Tự động hóa CI/CD |
| Docker Desktop | Build Docker image cục bộ |
| Amazon ECS | Điều phối container |
| Amazon ECR | Registry lưu trữ Docker image |
| Application Load Balancer | Phân phối tải đến ECS tasks |

---

# Bước 1 – Tạo Amazon S3 Bucket lưu trữ Upload

Ứng dụng Spring Boot Backend sử dụng Amazon S3 để lưu trữ hình ảnh và các tệp do người dùng tải lên.

Điều hướng đến:

```text
Amazon S3
    └── Buckets
            └── Create bucket
```

![Bảng điều khiển Amazon S3](/images/5-Workshop/5.5-Phase3-Backend-Deployment/S3Dashboard.png)

<center><i>Mở Amazon S3 Console và tạo một Bucket mới để lưu trữ các tệp được tải lên.</i></center>

---

Cấu hình Bucket theo các thông số sau:

| Thiết lập | Giá trị |
|-----------|----------|
| Bucket Type | General purpose |
| Bucket Namespace | Account Regional namespace (recommended) |
| Bucket Name Prefix | minisocial-uploads |

AWS sẽ tự động thêm hậu tố của Region và tài khoản để tạo tên Bucket hoàn chỉnh.

Ví dụ:

```text
minisocial-uploads-254201323904-ap-southeast-1-an
```

---

{{% notice warning %}}

Tên Bucket được tạo phải trùng với giá trị của biến môi trường **AWS_BUCKET_NAME** đã cấu hình trong CloudFormation Template của Backend.
Nếu hai giá trị này không khớp, ứng dụng sẽ không thể tải tệp lên Amazon S3.

{{% /notice %}}

---

Giữ nguyên các thiết lập còn lại theo mặc định, sau đó nhấn:

```text
Create bucket
```

![Tạo Amazon S3 Bucket](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateS3.png)

<center><i>Tạo Bucket lưu trữ Upload được Backend sử dụng để lưu hình ảnh và các tệp đa phương tiện.</i></center>

---

# Bước 2 – Chạy lại Jenkins Pipeline

Bây giờ hạ tầng Amazon ECS đã được triển khai hoàn chỉnh nên Pipeline có thể thực thi thành công.

Mở Jenkins Dashboard.

Chọn:

```text
MiniSocial-Backend-Pipeline
```

![Pipeline Backend](/images/5-Workshop/5.5-Phase3-Backend-Deployment/DashboardPipeline_backend.png)

<center><i>Mở Pipeline Backend đã tạo trong bài Lab trước.</i></center>

---

Trước khi tiếp tục, hãy đảm bảo:

- Docker Desktop đang chạy.
- Jenkins đang hoạt động.
- AWS Credentials đã được cấu hình.
- Máy tính có kết nối Internet.

---

{{% notice warning %}}

Docker Desktop **phải luôn được mở** trong suốt quá trình Jenkins thực thi Pipeline.
Nếu Docker Desktop không chạy, Pipeline sẽ dừng ngay tại bước Docker Build.

{{% /notice %}}

---

Nhấn:

```text
Build Now
```

Theo dõi **Console Output**.

Lần này Jenkins sẽ thực hiện thành công các bước sau:

1. Clone mã nguồn từ GitHub.
2. Build ứng dụng Spring Boot.
3. Build Docker Image.
4. Push Docker Image lên Amazon ECR.
5. Đăng ký ECS Task Definition mới.
6. Cập nhật Amazon ECS Service.
7. Chờ Deployment hoàn tất.

Pipeline sẽ kết thúc với trạng thái **Success**.

![Pipeline thành công](/images/5-Workshop/5.5-Phase3-Backend-Deployment/BuildSuccess.png)

<center><i>Lần chạy Pipeline thứ hai hoàn tất thành công vì hạ tầng Amazon ECS đã được triển khai ở bài Lab trước.</i></center>

---

# Bước 3 – Kiểm tra Backend sau khi triển khai

Sau khi Pipeline hoàn tất thành công, hãy xác minh rằng dịch vụ Backend đang hoạt động chính xác.

Nếu bạn không còn nhớ DNS Name của Application Load Balancer, hãy lấy lại thông tin này từ phần **Outputs** của CloudFormation Stack được tạo trong **Lab 5.3.1**.

Điều hướng đến:

```text
CloudFormation
    └── Stacks
            └── MiniSocial-Architect
                    └── Outputs
```

Tìm Output có tên:

```text
ALBDNSName
```

Sao chép giá trị này.

---

Mở trình duyệt và truy cập:

```text
http://<ALB-DNS-NAME>/api/health/status
```

Thay thế:

```text
<ALB-DNS-NAME>
```

bằng giá trị **ALBDNSName** vừa sao chép từ CloudFormation Outputs.

Ví dụ:

```text
http://MiniSocial-ALB-xxxxxxxx.ap-southeast-1.elb.amazonaws.com/api/health/status
```

Nếu quá trình triển khai thành công, API sẽ trả về kết quả tương tự như hình dưới đây.

![Kiểm tra Health Check Backend](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ALBCheck.png)

<center><i>Xác minh rằng API Health Check của Backend có thể truy cập thông qua DNS Name của Application Load Balancer.</i></center>

---

Bạn sẽ nhận được phản hồi như:

```text
Healthy
```

hoặc

```text
OK
```

Điều này xác nhận rằng:

- Amazon ECS đang hoạt động bình thường.
- Application Load Balancer chuyển tiếp yêu cầu chính xác.
- Ứng dụng Spring Boot đã khởi động thành công.
- Dịch vụ Backend đã sẵn sàng phục vụ.

---

{{% notice tip %}}

Giá trị **ALBDNSName** được CloudFormation tự động tạo khi bạn triển khai Stack **MiniSocial-Architect** trong **Lab 5.3.1**.
Bạn luôn có thể lấy lại giá trị này từ tab **Outputs** của CloudFormation Stack mà không cần triển khai lại hạ tầng.

{{% /notice %}}

---

## Kiểm tra kết quả

Trước khi chuyển sang bài Lab tiếp theo, hãy xác nhận:

- ✅ Amazon S3 Upload Bucket đã được tạo
- ✅ Tên Bucket trùng với cấu hình của Backend
- ✅ Jenkins Pipeline hoàn thành thành công
- ✅ Docker Image đã được đẩy lên Amazon ECR
- ✅ Amazon ECS Service đã được cập nhật thành công
- ✅ API Health Check trả về phản hồi thành công

---

{{% notice tip %}}

**Chúc mừng!**
Bạn đã hoàn thành quy trình **Continuous Deployment (CD)** cho Backend.
Jenkins Pipeline của bạn hiện có thể tự động:
- Build mã nguồn.
- Đóng gói Docker Image.
- Push Image lên Amazon ECR.
- Triển khai phiên bản mới lên Amazon ECS.

{{% /notice %}}