---
title: "Worklog Tuần 6"
date: 2026-05-19
weight: 6
chapter: false
pre: " <b> 1.6. </b> "
---

Báo cáo tuần này trình bày việc triển khai hệ thống phát hiện mối đe dọa thông minh bằng Amazon GuardDuty và quản lý thông tin xác thực an toàn bằng AWS Secrets Manager. Đối với dự án nhóm, chúng tôi đã đạt được cột mốc quan trọng khi tự động hóa hoàn toàn việc triển khai ứng dụng container trên Amazon ECS Fargate, kết hợp quy trình kiểm thử tự động nghiêm ngặt để đảm bảo chất lượng.

### Mục tiêu Tuần 6:
- Triển khai hệ thống phát hiện mối đe dọa thông minh và giám sát liên tục với Amazon GuardDuty.
- Quản lý an toàn và tiêm (inject) các thông tin xác thực nhạy cảm (mật khẩu database) bằng AWS Secrets Manager.
- Tự động hóa quá trình triển khai ứng dụng container hóa sử dụng AWS CloudFormation, Amazon ECR, và Amazon ECS Fargate.
- **Dự án nhóm:** Thực hiện kiểm thử thủ công và tự động toàn diện cho các tính năng mới của ứng dụng nhằm đảm bảo chất lượng mã nguồn và tính ổn định của hệ thống.

### Các công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Ngày 1 | - Phiên 1: Phát hiện mối đe dọa (Threat Detection) <br>&emsp; + Triển khai stack `GuardDuty-Hands-On` qua CloudFormation. <br>&emsp; + Phân tích các phát hiện bảo mật (Findings) và kiểm tra bảng điều khiển Summary của GuardDuty. | 19/05/2026 | 19/05/2026 | [AWS GuardDuty Docs](https://docs.aws.amazon.com/guardduty/) |
| Ngày 1 | - Phiên 2: Quản lý Secret & Triển khai ECS <br>&emsp; + Tải tệp `RDSFargate.yml` lên Amazon S3. <br>&emsp; + Khởi tạo `dbsecret` trong AWS Secrets Manager để lưu thông tin đăng nhập CSDL. <br>&emsp; + Khởi chạy 4 CloudFormation stacks (gồm 3 stack `SecretManagerRDS` và 1 stack `smdemo`). <br>&emsp; + Tạo kho lưu trữ Amazon ECR với tên `smdemo`. <br>&emsp; + Build và push Docker image của ứng dụng lên ECR thông qua Terminal. <br>&emsp; + Dựng ECS Cluster `smdemo` và cấu hình 2 Fargate Task Definitions. | 19/05/2026 | 19/05/2026 | [AWS Secrets Manager & ECS Docs](https://docs.aws.amazon.com/ecs/) |
| Ngày 2 | - **Dự án nhóm:** Kiểm thử phần mềm (QA/QC) <br>&emsp; + Thực hiện kiểm thử thủ công (manual test) các tính năng mới. <br>&emsp; + Viết và chạy kịch bản kiểm thử tự động (automation test) cho backend. <br>&emsp; + Xuất và phân tích báo cáo độ bao phủ mã (Code Coverage) bằng JaCoCo. | 20/05/2026 | 20/05/2026 | [Project Repository](https://github.com/pht1412/Mini-Social-Network.git) |

### Thành tựu Tuần 6:
- Kích hoạt thành công Amazon GuardDuty để nhận diện và phân tích các mối đe dọa bảo mật giả lập trong môi trường AWS.
- Loại bỏ rủi ro lộ lọt thông tin bằng cách lưu trữ và quản lý hoàn toàn mật khẩu CSDL thông qua AWS Secrets Manager.
- Xây dựng thành công luồng làm việc cho ứng dụng container: từ việc đóng gói Docker image, lưu trữ trên ECR, đến việc triển khai vận hành tự động trên Amazon ECS Fargate bằng Infrastructure as Code.
- Kiểm chứng thành công các tính năng mới thông qua quy trình kiểm thử tự động và thủ công nghiêm ngặt, đạt tỷ lệ bao phủ mã (code coverage) xuất sắc (~99%) được xác nhận bởi báo cáo JaCoCo.

### Minh chứng thực hiện:

#### 1. Phát hiện mối đe dọa với Amazon GuardDuty
Triển khai hạ tầng cơ sở và xác nhận hệ thống GuardDuty đã phát sinh các cảnh báo bảo mật (Findings) thành công.
![GuardDuty Findings](/images/1-Worklog/Week6/GuardDuty_Findings.png)

#### 2. Cấu hình AWS Secrets Manager
Khởi tạo và lưu trữ an toàn khóa `dbsecret` để sẵn sàng cung cấp thông tin đăng nhập cho ứng dụng container.
![AWS Secrets Manager](/images/1-Worklog/Week6/Secrets_Manager_dbsecret.png)

#### 3. Triển khai Hạ tầng (IaC) qua CloudFormation
Sử dụng các stack lồng nhau để thiết lập thành công hệ thống cơ sở dữ liệu quan hệ và cụm ECS.
![CloudFormation Stacks](/images/1-Worklog/Week6/CloudFormation_Stacks.png)

#### 4. Amazon ECR & Đẩy Docker Image
Tạo kho lưu trữ `smdemo`, thực hiện xác thực, build và đẩy thành công Docker image lên ECR thông qua giao diện dòng lệnh.
![ECR Docker Push](/images/1-Worklog/Week6/ECR_Docker_Push.png)

#### 5. Cấu hình Amazon ECS Fargate Task Definitions
Triển khai ECS Cluster và xác nhận 2 Task Definitions cho ứng dụng `smdemo` đã được tạo và đăng ký thành công.
![ECS Task Definitions](/images/1-Worklog/Week6/ECS_Task_Definitions.png)

#### 6. Dự án nhóm: Kiểm thử tự động & Báo cáo bao phủ mã (Ngày 20/05)
Thực thi các bài kiểm thử đơn vị (Unit Tests) tự động cho dịch vụ backend và xuất báo cáo bằng công cụ JaCoCo. Kết quả cho thấy tỷ lệ bao phủ mã (Code Coverage) đạt mức rất cao (lên đến 99% cho các module cốt lõi), đảm bảo ứng dụng hoạt động ổn định và hạn chế tối đa lỗi phát sinh ở các tính năng mới.
![JaCoCo Code Coverage](/images/1-Worklog/Week6/Project_JaCoCo_Coverage_W6.png)

#### 7. Họp nhóm trực tiếp
Thực hiện họp nhóm trực tiếp để đánh giá quá trình tự động hóa luồng CI/CD và đảm bảo các tiêu chuẩn chất lượng mã nguồn trước lần triển khai cuối cùng.
![Họp nhóm trực tiếp](/images/1-Worklog/Week6/2905_meeting_w6.jpg)