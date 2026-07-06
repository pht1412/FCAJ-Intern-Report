---
title: "Nhật ký công việc (Worklog)"
date: 2026-07-06
weight: 1
chapter: false
pre: " <b> 1. </b> "
---

Chào mừng bạn đến với **Nhật ký công việc (Worklog)**! Tài liệu này là một cuốn nhật ký ghi chép lại toàn bộ hành trình 3 tháng (12 tuần) thực tập của nhóm.

Trong suốt chương trình thực tập này, nhóm đã ghi chép lại một cách tỉ mỉ tiến độ công việc, các thách thức kỹ thuật và sự phối hợp nhịp nhàng giữa các thành viên. Dưới đây là lộ trình tổng quan về những thành tựu nhóm đã đạt được trong 12 tuần qua.

### Lộ trình dự án & Cột mốc hàng tuần

**Tuần 1:** [Nền tảng AWS IAM & Amazon EC2](1.1-Week1/)  
Nắm vững các nguyên tắc bảo mật của AWS IAM (Users, Groups, Roles, Assume Role) và khởi tạo các máy chủ EC2 đầu tiên.

**Tuần 2:** [Kiến trúc mạng Hybrid & Khởi tạo Cơ sở dữ liệu](1.2-Week2/)  
Thiết lập mạng Site-to-Site VPN, xử lý lỗi phân quyền IAM cho EC2 và khởi tạo hệ quản trị cơ sở dữ liệu MariaDB trên Linux thông qua SSH.

**Tuần 3:** [AWS CLI, Phục hồi thảm họa & Tích hợp CI/CD Jenkins](1.3-Week3/)  
Tự động hóa sao lưu bằng AWS Backup, thiết lập Amazon Managed Grafana và xây dựng luồng CI/CD Jenkins tích hợp với GitHub.

**Tuần 4:** [AWS Systems Manager, VPC Endpoints & Triển khai ECS Fargate thủ công](1.4-Week4/)  
Quản lý tập trung EC2 bằng Systems Manager, bảo mật truy cập bằng PrivateLink và triển khai thủ công (ClickOps) Backend lên Amazon ECS Fargate. (Họp nhóm offline 15/05).

**Tuần 5:** [Infrastructure as Code, Serverless & Tích hợp ChatOps](1.5-Week5/)  
Sử dụng AWS CDK để triển khai hạ tầng, xây dựng các luồng Serverless (API Gateway, Lambda) và tích hợp thông báo tự động lên Slack (ChatOps).

**Tuần 6:** [Bảo mật AWS & Tự động hóa CI/CD cho Containers](1.6-Week6/)  
Bật Amazon GuardDuty để dò quét lỗ hổng, quản lý mật khẩu an toàn với Secrets Manager và tự động hóa quy trình đẩy Docker Image lên ECR/ECS. (Họp nhóm offline 29/05).

**Tuần 7:** [Tự động hóa hạ tầng bằng CloudFormation & Triển khai RDS](1.7-Week7/)  
Chuyển đổi sang phương pháp IaC: lập trình tự động hóa cấu trúc mạng VPC, khởi tạo Amazon RDS bảo mật và triển khai ECS Backend bằng CloudFormation. (Họp nhóm offline 04/06).

**Tuần 8:** [Kiểm thử Hiệu năng Hệ thống & Phân tích Nút thắt cổ chai](1.8-Week8/)  
Vẽ lại sơ đồ kiến trúc 3-Tier, thực hiện kiểm thử chịu tải bằng công cụ K6 và phân tích dữ liệu log để tìm ra giới hạn của hệ thống.

**Tuần 9:** [Nâng cấp Ứng dụng Full-stack & Duy trì CI/CD](1.9-Week9/)  
Tối ưu hóa trải nghiệm người dùng (UX) trên ứng dụng và duy trì việc triển khai mã nguồn mới không gián đoạn qua Jenkins. (Họp nhóm offline 12/06).

**Tuần 10:** [Kiến trúc chuẩn Enterprise, FinOps & Tên miền tùy chỉnh](1.10-Week10/)  
Nâng cấp hạ tầng lên Multi-AZ (HA), ứng dụng FinOps bằng EventBridge Scheduler để tối ưu chi phí và bảo mật lưu lượng qua Route53 cùng chứng chỉ ACM. (Họp nhóm offline 19/06).

**Tuần 11:** [Kiểm thử Chịu tải Nâng cao & Giả lập Tấn công DDoS](1.11-Week11/)  
Triển khai tính năng Gacha, kiểm thử khắt khe K6 với luồng tải tệp 5MB và giả lập tấn công HTTP Flood Layer 7 để lấy baseline cho WAF. (Họp nhóm offline 03/07).

**Tuần 12:** [Báo cáo Kiểm thử JaCoCo & Tổng hợp Internal Report](1.12-Week12/)  
Xây dựng báo cáo kiểm thử phần mềm bằng JaCoCo (Code Coverage) với kiểm thử 2 tầng Controller (MockMvc) và Service (Mockito), đồng thời tổng hợp toàn bộ nội dung để hoàn thiện Internal Report trên Hugo.