---
title: "Worklog Tuần 3"
date: 2026-05-08
weight: 3
chapter: false
pre: " <b> 1.3. </b> "
---

Báo cáo tuần này tập trung vào việc quản lý hạ tầng nhanh chóng qua AWS CLI, thiết lập chiến lược sao lưu tự động với AWS Backup, và giám sát trực quan bằng Amazon Managed Grafana. Nhóm cũng đã có buổi lên văn phòng AWS thực tế và tích hợp thành công Jenkins với GitHub để tự động hóa luồng CI/CD.

### Mục tiêu Tuần 3:
- Nắm vững các lệnh AWS CLI để cấp phát và dọn dẹp hạ tầng tự động.
- Triển khai chiến lược tự động sao lưu (Backup) qua AWS Backup, Amazon SNS và AWS CloudFormation.
- Cấu hình giám sát trực quan nâng cao bằng Amazon Managed Grafana kết hợp với Amazon CloudWatch.
- Học tập và giao lưu trực tiếp với đội ngũ AWS Support tại văn phòng AWS.
- **Dự án nhóm:** Tích hợp Jenkins với GitHub để thiết lập luồng CI/CD tự động build cho frontend và backend.

### Các công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Ngày 1  | - Cấp phát hạ tầng qua CLI <br>&emsp; + Khởi tạo và xóa VPC, Subnets, IGW, EC2 bằng AWS CLI. <br>&emsp; + Theo dõi thông số CPUUtilization qua CloudWatch. | 05/06/2026 | 05/06/2026 | [AWS CLI Reference](https://cloudjourney.awsstudygroup.com/) |
| Ngày 1  | - Lên văn phòng AWS <br>&emsp; + Gặp gỡ và làm việc trực tiếp với các anh/chị AWS Support. | 05/06/2026 | 05/06/2026 | Hoạt động ngoại khóa |
| Ngày 2  | - Phiên 1: Tự động hóa Backup <br>&emsp; + Tạo chủ đề SNS để nhận thông báo. <br>&emsp; + Triển khai AWS Backup Plan và Vault bằng file mẫu CloudFormation (YAML). <br>&emsp; + Kiểm chứng luồng backup qua EC2/S3 và email thông báo. | 05/07/2026 | 05/07/2026 | [AWS Backup Docs](https://cloudjourney.awsstudygroup.com/) |
| Ngày 2  | - Phiên 2: Giám sát với Grafana <br>&emsp; + Cấu hình hạ tầng mạng (VPC, IGW, RTB, SG) cơ bản. <br>&emsp; + Thiết lập phân quyền IAM để truy cập Amazon Managed Grafana. <br>&emsp; + Tích hợp CloudWatch làm nguồn dữ liệu để hiển thị biểu đồ trên Grafana. | 05/07/2026 | 05/07/2026 | [Amazon Managed Grafana Docs](https://cloudjourney.awsstudygroup.com/) |
| Ngày 3  | - **Dự án nhóm:** Tích hợp CI/CD Pipeline <br>&emsp; + Kết nối hệ thống Jenkins với kho lưu trữ mã nguồn GitHub. <br>&emsp; + Cấu hình pipeline tự động cho các dịch vụ frontend và backend. <br>&emsp; + Tự động hóa quá trình đóng gói (build) và đẩy (push) Docker images lên AWS ECR. | 05/08/2026 | 05/08/2026 | Project Repo |

### Thành tựu Tuần 3:
- Thao tác thuần thục với AWS CLI, hiểu rõ cách xử lý các lỗi ràng buộc tài nguyên (DependencyViolation) khi dọn dẹp.
- Ứng dụng thành công Infrastructure as Code (CloudFormation) để tự động hóa quy trình sao lưu.
- Xây dựng thành công hệ thống giám sát chéo dịch vụ với độ trực quan cao bằng Grafana.
- Mở rộng mạng lưới và học hỏi kinh nghiệm thực tiễn từ đội ngũ chuyên gia AWS.
- Tích hợp thành công Jenkins với GitHub, xây dựng luồng CI/CD tự động giúp rút ngắn thời gian triển khai container image lên Amazon ECR.

### Minh chứng thực hiện:

#### 1. Thao tác dòng lệnh CLI & Giám sát (Ngày 06/05)
Theo dõi thành công các chỉ số `CPUUtilization` trên bảng điều khiển Amazon CloudWatch.
![CloudWatch Metrics](/images/1-Worklog/Week3/Screenshot%202026-05-06%20101300.png)

Thực hành khởi tạo và dọn dẹp tài nguyên mạng (VPC, Subnet, IGW) bằng CLI. Xử lý thành công các báo lỗi ràng buộc phụ thuộc trong quá trình xóa tài nguyên.
![CLI Provisioning Error](/images/1-Worklog/Week3/Screenshot%202026-05-06%20152553.png)
![CLI Cleanup](/images/1-Worklog/Week3/Screenshot%202026-05-06%20153330.png)

#### 2. Chuyến đi thực tế tại văn phòng AWS (Ngày 06/05)
Trải nghiệm không gian làm việc và tham gia buổi chia sẻ chuyên sâu từ đội ngũ hỗ trợ kỹ thuật tại văn phòng AWS.
![AWS Office Visit](/images/1-Worklog/Week3/Screenshot%202026-06-30%20120726.png)

#### 3. Tự động hóa sao lưu và Thông báo (Ngày 07/05 - Phiên 1)
Sử dụng CloudFormation để tự động khởi tạo kiến trúc AWS Backup. Hệ thống SNS cấu hình thành công và đã gửi email thông báo trạng thái sao lưu tự động.
![CloudFormation Deploy](/images/1-Worklog/Week3/CFN_Backup_Deploy.png)
![SNS Email Notification](/images/1-Worklog/Week3/SNS_Backup_Email.png)

#### 4. Trực quan hóa dữ liệu với Amazon Managed Grafana (Ngày 07/05 - Phiên 2)
Cấu hình các chính sách IAM cần thiết để Grafana có thể truy cập an toàn vào hệ sinh thái AWS.
![Grafana IAM Setup](/images/1-Worklog/Week3/Grafana_IAM_Setup.png)

Kết nối thành công nguồn dữ liệu CloudWatch và xây dựng các biểu đồ giám sát trực quan ngay trên giao diện Grafana.
![Grafana Dashboard](/images/1-Worklog/Week3/Grafana_Dashboard_View.png)

#### 5. Dự án nhóm: Tích hợp CI/CD Pipeline (Ngày 08/05)
Kết nối thành công Jenkins với kho lưu trữ mã nguồn GitHub. Kiểm tra trực quan trên Dashboard cho thấy các pipeline (`mini-social-network-pipeline-backend` và `mini-social-network-pipeline-frontend`) đã được cấu hình và chạy ổn định.
![Jenkins Dashboard](/images/1-Worklog/Week3/Jenkins_Pipelines_Dashboard.png)

Kiểm tra chi tiết log (Console Output) của Jenkins pipeline, xác nhận quá trình build Docker image và đẩy (push) thành công lên kho lưu trữ Amazon ECR không xảy ra lỗi.
![Jenkins Pipeline Console](/images/1-Worklog/Week3/Jenkins_ECR_Push_Success.png)