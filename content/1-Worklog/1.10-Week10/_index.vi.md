---
title: "Worklog Tuần 10"
date: 2026-06-28
weight: 10
chapter: false
pre: " <b> 1.10. </b> "
---

Báo cáo tuần này đánh dấu bước hoàn thiện cuối cùng của dự án, tập trung vào việc nâng cấp kiến trúc đám mây chuẩn doanh nghiệp, triển khai chiến lược FinOps tối ưu chi phí và áp dụng mô hình bảo mật Zero-Trust. Nhóm đã cấu hình thành công tên miền tùy chỉnh, bảo mật HTTPS cho môi trường Production, và tự động hóa toàn bộ quy trình CI/CD.

### Mục tiêu Tuần 10:
- Nâng cấp hạ tầng đám mây lên kiến trúc chuẩn doanh nghiệp (Enterprise Architecture) với khả năng triển khai Multi-AZ và tính sẵn sàng cao (High Availability).
- Triển khai chiến lược FinOps nhằm tối ưu chi phí đám mây bằng AWS Fargate Spot và tự động hóa lịch trình hoạt động của tài nguyên.
- Áp dụng mô hình bảo mật Zero-Trust bằng cách loại bỏ hoàn toàn các thông tin xác thực được mã hóa cứng (Hardcoded Secrets) thông qua AWS Systems Manager Parameter Store và CloudFront Origin Access Control (OAC).
- Cấu hình tên miền tùy chỉnh bằng AWS Route53 và bảo vệ toàn bộ lưu lượng truy cập với chứng chỉ ACM SSL/TLS.
- Hoàn thiện quy trình CI/CD bằng Jenkinsfile nhằm tự động hóa việc triển khai hạ tầng và ứng dụng.

### Các công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Ngày 1-7 | - Hạ tầng doanh nghiệp (IaC) <br>&emsp;+ Triển khai 4 CloudFormation Stack gồm: Network, Database, Backend và Frontend. | 22/06/2026 | 28/06/2026 | [AWS CloudFormation](https://cloudjourney.awsstudygroup.com/) |
| Ngày 1-7 | - Triển khai Bảo mật & FinOps <br>&emsp;+ Tích hợp AWS Systems Manager Parameter Store để quản lý mật khẩu Database và JWT Secret.<br>&emsp;+ Cấu hình EventBridge Scheduler kết hợp ECS Auto Scaling để tự động tắt tài nguyên vào ban đêm. | 22/06/2026 | 28/06/2026 | [AWS SSM & EventBridge](https://cloudjourney.awsstudygroup.com/) |
| Ngày 1-7 | - Tên miền tùy chỉnh & CI/CD <br>&emsp;+ Mua tên miền `minisocial-network.id.vn`, cấu hình Route53 và AWS Certificate Manager (ACM).<br>&emsp;+ Xây dựng Jenkinsfile để tự động hóa toàn bộ quy trình triển khai. | 22/06/2026 | 28/06/2026 | [AWS Route53 & Jenkins](https://cloudjourney.awsstudygroup.com/) |

### Thành tựu Tuần 10:
- Hoàn thành việc chuyển đổi hệ thống sang môi trường AWS Cloud sẵn sàng cho Production.
- Giảm đáng kể chi phí vận hành hằng tháng bằng cách sử dụng AWS Fargate Spot kết hợp lịch trình tự động tắt Amazon RDS và ECS vào ban đêm.
- Nâng cao mức độ bảo mật bằng cách loại bỏ hoàn toàn Hardcoded Secrets và lưu trữ toàn bộ thông tin nhạy cảm trong AWS Systems Manager Parameter Store.
- Bảo vệ hoàn toàn S3 Bucket của Frontend khỏi truy cập công khai thông qua CloudFront Origin Access Control (OAC).
- Triển khai thành công tên miền Production với kết nối HTTPS được bảo vệ bởi chứng chỉ AWS Certificate Manager (ACM).
- Hoàn thiện Jenkins CI/CD Pipeline phục vụ tự động hóa triển khai hạ tầng và ứng dụng.

### Minh chứng thực hiện:

#### 1. Các CloudFormation Stack theo kiến trúc doanh nghiệp
Triển khai thành công hạ tầng Production trên hai AWS Region (ap-southeast-1 và us-east-1). Việc phân tách tài nguyên theo từng Region tuân thủ các Best Practices của AWS, đồng thời đảm bảo tính sẵn sàng cao và tối ưu khả năng phân phối nội dung trên phạm vi toàn cầu.
![CloudFormation Stacks](/images/1-Worklog/Week10/CFN_Enterprise_Stacks.png)

#### 2. FinOps: Chiến lược tối ưu hóa chi phí (Golden Snippet)
Triển khai chiến lược ECS Capacity Provider kết hợp giữa **AWS Fargate On-Demand** và **AWS Fargate Spot** nhằm giảm đáng kể chi phí vận hành. Ngoài ra, AWS EventBridge Scheduler được sử dụng để tự động tạm dừng dịch vụ vào ban đêm, trong khi ECS Auto Scaling sẽ khởi động lại dịch vụ vào buổi sáng.
```yaml
# ECS Capacity Strategy
CapacityProviderStrategy:
  - CapacityProvider: FARGATE
    Base: 1
    Weight: 1

  - CapacityProvider: FARGATE_SPOT
    Weight: 1

# EventBridge RDS Scheduler
StopRDSSchedule:
  Type: AWS::Scheduler::Schedule
  Properties:
    ScheduleExpression: "cron(0 22 * * ? *)"   # 10:00 PM ICT
    Target:
      Arn: "arn:aws:scheduler:::aws-sdk:rds:stopDBInstance"
```

#### 3. Bảo mật Zero-Trust & Quản lý Secret (Golden Snippet)
Loại bỏ hoàn toàn các thông tin xác thực được mã hóa cứng trong mã nguồn. Các thông tin nhạy cảm như Mật khẩu Database và JWT Secret được lưu trữ an toàn trong **AWS Systems Manager Parameter Store** và được ECS tự động inject vào container trong thời gian chạy (Runtime).
```yaml
Secrets:
  - Name: SPRING_DATASOURCE_PASSWORD
    ValueFrom: !Sub "arn:aws:ssm:${AWS::Region}:${AWS::AccountId}:parameter/minisocial/backend/db-password"

  - Name: JWT_SECRET
    ValueFrom: !Sub "arn:aws:ssm:${AWS::Region}:${AWS::AccountId}:parameter/minisocial/backend/jwt-secret"
```

#### 4. Phân phối Frontend bảo mật với CloudFront OAC (Golden Snippet)
S3 Bucket chứa Frontend được cấu hình ở chế độ riêng tư hoàn toàn. Toàn bộ nội dung tĩnh được phân phối thông qua Amazon CloudFront sử dụng **Origin Access Control (OAC)**, ngăn chặn hoàn toàn việc truy cập trực tiếp đến các đối tượng trong S3.
```yaml
CloudFrontOriginAccessControl:
  Type: AWS::CloudFront::OriginAccessControl
  Properties:
    OriginAccessControlConfig:
      Name: !Sub "${ProjectName}-frontend-oac"
      OriginAccessControlOriginType: s3
      SigningBehavior: always
      SigningProtocol: sigv4
```

#### 5. Tên miền tùy chỉnh & Khởi chạy Production
Hoàn thành việc cấu hình tên miền Production `minisocial-network.id.vn` bằng các dịch vụ mạng của AWS. Tạo bản ghi DNS trên AWS Route53, xác thực chứng chỉ SSL/TLS bằng ACM, và điều hướng lưu lượng Backend thông qua ALB.
![Route53 Custom Domain](/images/1-Worklog/Week10/Route53_Custom_Domain.png)

#### 6. Tự động hóa Pipeline CI/CD (Jenkins)
Hoàn thiện và kiểm thử thành công quy trình Jenkins CI/CD. Declarative **Jenkinsfile** được xây dựng nhằm tự động hóa toàn bộ quá trình triển khai, bao gồm Build Docker Image, đẩy lên Amazon ECR và cập nhật ECS Service.
![Jenkins Auto Deploy](/images/1-Worklog/Week10/Jenkins_Auto_Deploy.png)

#### 7. Họp nhóm trực tiếp (Offline)
Thực hiện họp nhóm trực tiếp (offline) để đánh giá tài liệu thuyết trình cuối kỳ, kiểm tra lại chiến lược triển khai và tổng kết lại toàn bộ hành trình xây dựng dự án trên môi trường đám mây.
![Họp nhóm trực tiếp](/images/1-Worklog/Week10/1906_meeting_w10.jpg)