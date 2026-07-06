---
title: "Worklog Tuần 5"
date: 2026-05-15
weight: 5
chapter: false
pre: " <b> 1.5. </b> "
---

Báo cáo tuần này trình bày việc tự động hóa hạ tầng thông qua AWS CDK, triển khai kiến trúc serverless với API Gateway và Lambda, cũng như bảo mật dữ liệu bằng AWS KMS. Nhóm cũng đã tích hợp ChatOps qua Slack, cấu hình AWS Directory Service và phát triển các tính năng mới cho dự án như Giao diện Tối (Dark Mode) và Lịch sử bảo mật.

### Mục tiêu Tuần 5:
- Tự động hóa hạ tầng bằng Infrastructure as Code (IaC) thông qua AWS CDK và CloudFormation.
- Quản lý container với Amazon ECS và AWS Fargate.
- Triển khai kiến trúc serverless với API Gateway, AWS Lambda và EventBridge.
- Bảo mật dữ liệu bằng AWS KMS và kiểm toán hệ thống qua AWS CloudTrail & Amazon Athena.
- Tích hợp tự động hóa ChatOps thông qua AWS Lambda và Slack.
- Cấu hình AWS Directory Service và kiểm tra kết nối mạng nội bộ qua RDP.
- **Dự án nhóm:** Phát triển và tích hợp các tính năng mới bao gồm Giao diện Tối (Dark Mode), Lịch sử bảo mật và Bình luận ẩn danh.

### Các công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Ngày 1 (11/05) | - IaC & Serverless API <br>&emsp; + Khởi chạy CloudFormation qua AWS CDK. <br>&emsp; + Gọi API Gateway tải ảnh lên S3. | 05/11/2026 | 05/11/2026 | [AWS CDK & API Docs](https://cloudjourney.awsstudygroup.com/) |
| Ngày 2 (12/05) | - Quản lý IAM & Chi phí <br>&emsp; + Phân quyền IAM User xem Dashboard chi phí. | 05/12/2026 | 05/12/2026 | [AWS IAM & Billing Docs](https://cloudjourney.awsstudygroup.com/) |
| Ngày 3 (13/05) | - Security Hub & DLM <br>&emsp; + Thiết lập policy DLM sao lưu EBS tự động. <br>&emsp; + Đánh giá chuẩn bảo mật qua Security Hub. | 05/13/2026 | 05/13/2026 | [AWS Security Hub Docs](https://cloudjourney.awsstudygroup.com/) |
| Ngày 4 (14/05) | - Phiên 1: Bảo mật & Kiểm toán <br>&emsp; + Mã hóa S3 bằng Custom KMS Key và kiểm thử chặn truy cập (Access Denied). <br>&emsp; + Ghi log kiểm toán qua AWS CloudTrail. | 05/14/2026 | 05/14/2026 | [AWS KMS & CloudTrail](https://cloudjourney.awsstudygroup.com/) |
| Ngày 4 (14/05) | - Phiên 2: Tự động hóa & ChatOps <br>&emsp; + Cấu hình lịch trình EventBridge. <br>&emsp; + Kích hoạt Lambda quản lý EC2 và gửi thông báo hệ thống về kênh Slack. | 05/14/2026 | 05/14/2026 | [AWS EventBridge & Lambda](https://cloudjourney.awsstudygroup.com/) |
| Ngày 4 (14/05) | - Phiên 3: Directory Service <br>&emsp; + Khởi tạo hạ tầng mạng, AD-Manager và Bastion Host. <br>&emsp; + Cấu hình Directory Service và dùng RDP (lệnh ping) để kiểm tra kết nối mạng. | 05/14/2026 | 05/14/2026 | [AWS Directory Service](https://cloudjourney.awsstudygroup.com/) |
| Ngày 5 (15/05) | - **Dự án nhóm:** Phát triển tính năng <br>&emsp; + Triển khai giao diện Sáng/Tối (Dark Mode). <br>&emsp; + Xây dựng trang Lịch sử bảo mật quản lý phiên đăng nhập. <br>&emsp; + Phát triển tính năng Bình luận ẩn danh. | 05/15/2026 | 05/15/2026 | Project Repo |

### Thành tựu Tuần 5:
- Triển khai thành công kiến trúc hạ tầng phức tạp bằng AWS CDK.
- Tự động hóa các tác vụ vận hành và xây dựng thành công hệ thống thông báo ChatOps qua Slack.
- Làm chủ cơ chế mã hóa dữ liệu (KMS) và kiểm soát ranh giới bảo mật nghiêm ngặt.
- Cấu hình và kiểm chứng thành công các thành phần Active Directory một cách an toàn thông qua máy chủ Bastion.
- Hoàn thiện và tích hợp thành công các tính năng cốt lõi cho dự án bao gồm giao diện Dark Mode, theo dõi lịch sử thiết bị đăng nhập và hệ thống tương tác ẩn danh.

### Minh chứng thực hiện:

#### 1. AWS CloudFormation, S3 & API Gateway (Ngày 11/05)
Triển khai thành công các nhóm stack lồng nhau qua CDK và sử dụng API Gateway để tự động hóa quá trình đẩy dữ liệu lên S3.
![CloudFormation Stacks](/images/1-Worklog/Week5/CloudFormationStacks.png)
![API S3 Upload](/images/1-Worklog/Week5/APIS3Upload.png)

#### 2. Phân quyền IAM & Giám sát Chi phí (Ngày 12/05)
Cấu hình IAM bảo mật, cho phép giám sát thông số chi phí AWS Cost and Usage một cách an toàn.
![AWS Cost Dashboard](/images/1-Worklog/Week5/AWS_Cost_Dashboard.png)

#### 3. Sao lưu Tự động & Security Hub (Ngày 13/05)
Tự động hóa sao lưu EBS bằng Data Lifecycle Manager (DLM) và sử dụng Security Hub để kiểm tra độ tuân thủ bảo mật CIS.
![Data Lifecycle Manager](/images/1-Worklog/Week5/EBS_Lifecycle_Manager.png)
![Security Hub Dashboard](/images/1-Worklog/Week5/Security_Hub_Dashboard.png)

#### 4. Bảo mật Dữ liệu & Kiểm toán hệ thống (Ngày 14/05 - Phiên 1)
Sử dụng khóa KMS tùy chỉnh để giới hạn quyền truy cập S3. Kiểm chứng thành công việc chặn người dùng trái phép (Access Denied) và theo dõi log truy cập qua CloudTrail.
![S3 KMS Access Denied](/images/1-Worklog/Week5/S3_KMS_Access_Denied.png)
![CloudTrail Config](/images/1-Worklog/Week5/CloudTrail_KMS_Config.png)

#### 5. Tự động hóa & Tương tác qua Slack (Ngày 14/05 - Phiên 2)
Cấu hình thành công AWS EventBridge định kỳ kích hoạt hàm Lambda để giám sát EC2, đồng thời tích hợp API gửi cảnh báo trực tiếp về kênh Slack.
![EventBridge Rules](/images/1-Worklog/Week5/EventBridge_Scheduled_Rules.png)
![Slack Notification](/images/1-Worklog/Week5/Slack_Lambda_Notification.png)

#### 6. Directory Service & Định tuyến mạng (Ngày 14/05 - Phiên 3)
Thiết lập AWS Directory Service, truy cập an toàn vào máy chủ qua RDP và sử dụng lệnh Ping để xác nhận định tuyến mạng nội bộ giữa AD-Manager và Bastion Host.
![AWS Directory Service](/images/1-Worklog/Week5/AWS_Directory_Service.png)
![RDP Ping Connectivity](/images/1-Worklog/Week5/RDP_Ping_Connectivity.png)

#### 7. Dự án nhóm: Phát triển tính năng ứng dụng (Ngày 15/05)
Triển khai thành công giao diện quản lý Lịch sử bảo mật (Nơi bạn đã đăng nhập), cho phép người dùng theo dõi địa chỉ IP, thiết bị và chủ động đăng xuất khỏi các phiên hoạt động đáng ngờ.
![Security History](/images/1-Worklog/Week5/Project_Security_History.png)

Tích hợp thành công chế độ Giao diện Tối (Dark Mode) toàn hệ thống và tính năng Bình luận ẩn danh giúp tăng cường tính riêng tư và trải nghiệm người dùng.
![Dark Mode & Anonymous Comment](/images/1-Worklog/Week5/Project_DarkMode_Anonymous.png)