---
title: "Khởi tạo Stack Backend"
date: 2026-07-02
weight: 53
chapter: false
pre: "<b>5.5.3. </b>"
---

## Mục tiêu của bài lab

Trong bài Lab này, bạn sẽ triển khai ứng dụng Backend của MiniSocial lên **Amazon ECS Fargate** bằng **AWS CloudFormation**.

Quá trình triển khai sẽ sử dụng Docker Image đã được đẩy lên **Amazon ECR** ở bài Lab trước. Đồng thời, bạn sẽ cấu hình kiến trúc tối ưu chi phí với **Fargate Spot** và **Scheduled Auto Scaling**.

---

## Mục tiêu học tập

Sau khi hoàn thành bài Lab này, bạn sẽ có thể:

- Triển khai ứng dụng Backend lên Amazon ECS Fargate
- Sử dụng Docker Image được lưu trữ trong Amazon ECR
- Khởi tạo hạ tầng Backend bằng AWS CloudFormation
- Cấu hình Scheduled Auto Scaling để tự động bật và tắt dịch vụ
- Hiểu cách Fargate Spot giúp tối ưu chi phí vận hành

---

## Dịch vụ AWS sử dụng

| Dịch vụ | Mục đích |
|---------|----------|
| AWS CloudFormation | Infrastructure as Code cho ECS |
| Amazon ECS Fargate | Container serverless |
| Amazon ECR | Registry lưu trữ Docker image |
| Application Auto Scaling | Lịch trình tự động bật/tắt ECS tasks |
| CloudWatch Logs | Thu thập log từ container |

---

# Bước 1 – Lấy Docker Image URI

Trước khi triển khai Stack Backend, bạn cần lấy URI của Docker Image từ Amazon ECR.

Truy cập:

```text
Amazon ECR
    └── Repositories
            └── minisocial-backend
```

Chọn Repository đã được tạo ở bài Lab trước.

![Amazon ECR Repository](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ECR-With-image.png)

<center><i>Mở Repository Amazon ECR chứa Docker Image được Jenkins build và đẩy lên ở bài Lab trước.</i></center>

---

Chọn Docker Image có tag:

```text
latest
```

Mở trang chi tiết của Image.

Nhấn:

```text
Copy URI
```

Sao chép toàn bộ Docker Image URI.

Giá trị này sẽ được sử dụng khi tạo CloudFormation Stack.

![Amazon ECR Image Details](/images/5-Workshop/5.5-Phase3-Backend-Deployment/ECR_details.png)

<center><i>Sao chép Docker Image URI từ Amazon ECR để CloudFormation sử dụng khi tạo ECS Task Definition.</i></center>

---

# Bước 2 – Triển khai Stack Backend

{{% notice info %}}
📥 **CloudFormation Template**
Tải xuống file CloudFormation template cho Backend trước khi tiếp tục.**[Download minisocial-backend.yaml](/iac/final-minisocial-backend.yaml)**
{{% /notice %}}

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
final-minisocial-backend.yaml
```

Sau đó nhấn **Next**.

![Create Backend Stack](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateStack-backend.png)

<center><i>Tải lên CloudFormation Template để bắt đầu triển khai hạ tầng Backend trên Amazon ECS.</i></center>

---

Cấu hình Stack với các thông tin sau.

| Tham số | Mô tả |
|---------|------|
| Stack Name | MiniSocial-Backend-Stack |
| VPC ID | Output từ Stack VPC |
| Private Subnets | Output từ Stack VPC |
| Target Group ARN | Output từ Stack Network |
| RDS Endpoint | Output từ Stack Database |
| EcrImageUri | Docker Image URI lấy từ Amazon ECR |
| DbUser | Tên người dùng Database đã tạo ở Lab RDS |

Điền các tham số theo hình minh họa dưới đây.

![Backend Stack Parameters](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateStack_backend2.png)

<center><i>Điền các tham số được thu thập từ các CloudFormation Stack trước đó và Docker Image URI từ Amazon ECR.</i></center>

Tiếp tục nhấn **Next** cho đến trang xác nhận.

Cuối cùng nhấn:

```text
Submit
```

để bắt đầu triển khai hạ tầng Backend.

---

# Bước 3 – Kiểm tra quá trình triển khai và Auto Scaling

Đợi CloudFormation Stack chuyển sang trạng thái:

```text
CREATE_COMPLETE
```

![CloudFormation Complete](/images/5-Workshop/5.5-Phase3-Backend-Deployment/CreateStack-backend.png)

<center><i>Đợi CloudFormation hoàn tất việc khởi tạo toàn bộ hạ tầng Backend.</i></center>

---

## Kiểm tra ECS Service

Truy cập:

```text
Amazon ECS
    └── Clusters
            └── MiniSocial-Cluster
                    └── Services
                            └── MiniSocial-Backend-Service
```

Xác nhận:

- Service Status là **Active**
- Desired Tasks = **2**
- Running Tasks = **2**

---

## Kiểm tra Scheduled Auto Scaling

Trong ECS Service, mở:

```text
Service Auto Scaling
    └── View / Edit
```

Xác nhận đã có hai Scheduled Actions:

- Scale Down (22:00)
- Scale Up (07:00)

Hai lịch trình phải hiển thị đúng như cấu hình.

![Scheduled Auto Scaling](/images/5-Workshop/5.5-Phase3-Backend-Deployment/Scheduled_Action.png)

<center><i>Kiểm tra Scheduled Auto Scaling đã được cấu hình để tự động giảm số lượng Task lúc 22:00 và tăng trở lại lúc 07:00 theo giờ Việt Nam.</i></center>

---

# Phân tích kiến trúc tối ưu chi phí

Trong bài Lab này, chúng ta áp dụng nhiều kỹ thuật tối ưu chi phí của AWS.

## Amazon ECS Fargate Spot

CloudFormation Template sử dụng **Capacity Provider Strategy** kết hợp:

- **FARGATE**
- **FARGATE_SPOT**

Một Task luôn chạy trên Fargate tiêu chuẩn để đảm bảo hệ thống luôn sẵn sàng hoạt động, trong khi Task còn lại sử dụng **Fargate Spot**, giúp giảm chi phí điện toán lên đến khoảng **70%** khi AWS có tài nguyên nhàn rỗi.

---

## Scheduled Auto Scaling

Thay vì để dịch vụ hoạt động liên tục, ECS Service sẽ tự động điều chỉnh số lượng Task theo lịch trình định sẵn.

Cụ thể:

- Giảm xuống **0 Task** vào lúc **22:00** (giờ Việt Nam)
- Tăng lên **2 Task** vào lúc **07:00** (giờ Việt Nam)

Đây là giải pháp rất hiệu quả để tiết kiệm chi phí cho các môi trường học tập, thử nghiệm và phát triển.

---

{{% notice info %}}

Scheduled Auto Scaling là một trong những giải pháp tối ưu chi phí hiệu quả nhất cho các môi trường không yêu cầu hoạt động liên tục 24/7.

{{% /notice %}}

---

## Kiểm tra kết quả

Trước khi chuyển sang bài Lab tiếp theo, hãy xác nhận:

- ✅ CloudFormation Stack ở trạng thái **CREATE_COMPLETE**
- ✅ Amazon ECS Service ở trạng thái **Active**
- ✅ Desired Task Count bằng **2**
- ✅ Scheduled Auto Scaling đã có cả hai lịch Scale Up và Scale Down
- ✅ CloudWatch Log Group `/ecs/minisocial-backend` đã được tạo thành công

---

{{% notice tip %}}

 Chúc mừng!
Bạn đã triển khai thành công ứng dụng Backend lên **Amazon ECS Fargate** với kiến trúc đạt chuẩn Production được xây dựng hoàn toàn bằng **Infrastructure as Code (IaC)**.
Trong bài Lab tiếp theo, chúng ta sẽ triển khai Frontend và hoàn thiện quy trình **Continuous Deployment (CD)** cho toàn bộ hệ thống MiniSocial.

{{% /notice %}}