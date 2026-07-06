---
title: "Worklog Tuần 4"
date: 2026-05-08
weight: 4
chapter: false
pre: " <b> 1.4. </b> "
---

Báo cáo tuần này trình bày việc quản lý hàng loạt máy chủ EC2 qua AWS Systems Manager, lưu trữ trang web tĩnh trên Amazon S3 và bảo mật hệ thống bằng chính sách giới hạn khu vực IAM. Nhóm cũng đã thiết lập kết nối an toàn qua VPC Endpoints và triển khai thành công backend của dự án bằng ECS Fargate kết hợp ALB.

### Mục tiêu Tuần 4:
- Triển khai và quản lý hàng loạt máy chủ EC2 thông qua AWS Systems Manager (Fleet Manager, Patch Manager, Run Command).
- Cấu hình lưu trữ và chạy trang web tĩnh (Static Website Hosting) trên Amazon S3.
- Thực thi bảo mật bằng chính sách IAM, giới hạn quyền truy cập theo khu vực (AWS Region).
- Thiết lập AWS PrivateLink (VPC Endpoints) để truy cập an toàn vào EC2 qua SSM Session Manager mà không cần Public IP.
- **Dự án nhóm:** Triển khai hạ tầng backend lên AWS bằng phương pháp thủ công (ClickOps) sử dụng Amazon ECS Fargate và ALB.

### Các công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Ngày 1  | - Phiên 1: Systems Manager & S3 Hosting <br>&emsp; + Khởi tạo VPC, subnets, IGW, và EC2 (`Window-Lab-SSM-1` & `Window-Lab-SSM-2`). <br>&emsp; + Quản lý EC2 qua Fleet Manager, kiểm tra biểu đồ Patch Manager và chạy lệnh từ xa qua Run Command. <br>&emsp; + Triển khai trang web tĩnh trên S3 (upload ảnh và `contact.html`). | 05/05/2026 | 05/05/2026 | [AWS SSM & S3 Docs](https://cloudjourney.awsstudygroup.com/) |
| Ngày 2  | - Phiên 2: Giới hạn khu vực bằng IAM <br>&emsp; + Tạo policy `ec2-admin-restrict-region` để giới hạn các thao tác tại khu vực chỉ định. <br>&emsp; + Gán quyền cho IAM User, đăng nhập và xác nhận bị chặn truy cập ở các khu vực khác. | 05/06/2026 | 05/06/2026 | [AWS IAM Documentation](https://cloudjourney.awsstudygroup.com/) |
| Ngày 3  | - Phiên 3: SSM qua VPC Endpoints <br>&emsp; + Khởi tạo hạ tầng mạng (VPC, Private/Public subnets, Security Groups). <br>&emsp; + Cấu hình VPC Endpoints (AWS PrivateLink) cho dịch vụ SSM. <br>&emsp; + Truy cập EC2 qua Session Manager & RDP, ghi log phiên làm việc vào S3. | 05/08/2026 | 05/08/2026 | [AWS PrivateLink & SSM Docs](https://cloudjourney.awsstudygroup.com/) |
| Ngày 3  | - **Dự án nhóm:** Triển khai Cloud thủ công (ClickOps) <br>&emsp; + Tự khởi tạo VPC, IGW, Route Tables và cơ sở dữ liệu Amazon RDS. <br>&emsp; + Lấy image từ ECR, tạo Task Definition và chạy Service trên Fargate. <br>&emsp; + Mở cổng giao tiếp qua Application Load Balancer (ALB) và kiểm thử bằng Postman. | 05/08/2026 | 05/08/2026 | Project Repo |

### Thành tựu Tuần 4:
- Quản lý thành công tập hợp máy chủ thông qua AWS Systems Manager (cập nhật bản vá, chạy lệnh tự động).
- Xuất bản thành công trang web tĩnh với độ sẵn sàng cao bằng Amazon S3.
- Củng cố bảo mật hệ thống bằng việc áp dụng các chính sách IAM giới hạn thao tác theo không gian địa lý.
- Thiết lập kết nối hoàn toàn riêng tư (Private) đến EC2 qua VPC Endpoints, kết hợp ghi log (auditing) phiên làm việc tự động lên S3.
- Triển khai thành công backend của dự án lên AWS Cloud thông qua Fargate, xác thực khả năng kết nối ngoại mạng và tích hợp cơ sở dữ liệu qua Application Load Balancer.

### Minh chứng thực hiện:

#### 1. Quản lý máy chủ với AWS Systems Manager
Đưa các máy ảo EC2 vào quản lý tập trung thông qua Fleet Manager và thực thi thành công các tác vụ quản trị tự động bằng Run Command.
![SSM Fleet and Run Command](/images/1-Worklog/Week4/SSM_Fleet_Patch_Run.png)

#### 2. Host trang web tĩnh trên Amazon S3
Cấu hình thành công S3 Bucket để làm Web Hosting. Tải lên tệp tin `contact.html` cùng tài nguyên ảnh, truy cập thành công qua Endpoint của S3.
![S3 Static Website](/images/1-Worklog/Week4/S3_Static_Website.png)

#### 3. Giới hạn phân quyền theo Khu vực (IAM Region Restrict)
Đăng nhập bằng IAM User được gán quyền `ec2-admin-restrict-region`. Kiểm tra thử thao tác ngoài khu vực cho phép và nhận được thông báo lỗi Access Denied đúng theo kịch bản bảo mật.
![IAM Region Deny](/images/1-Worklog/Week4/IAM_Region_Restrict_Deny.png)

#### 4. Truy cập an toàn qua SSM Session Manager & Lưu log trên S3
Thiết lập phiên kết nối bảo mật đến máy ảo qua AWS Systems Manager sử dụng VPC Endpoints (AWS PrivateLink). Toàn bộ thao tác dòng lệnh (ví dụ: `ipconfig`) trong phiên làm việc đã được tự động ghi lại (log) và lưu trữ thành tệp tin trên Amazon S3 phục vụ mục đích kiểm toán.
![SSM Session Log in S3](/images/1-Worklog/Week4/Screenshot%202026-05-08%20195301.png)

#### 5. Dự án nhóm: Triển khai ứng dụng & Định tuyến ALB (Ngày 08/05)
Triển khai thành công backend của dự án lên AWS ECS Fargate bằng phương pháp ClickOps. Xác nhận kết nối ngoại mạng và trạng thái cơ sở dữ liệu bằng cách gọi API trạng thái qua Application Load Balancer (ALB) trên Postman, kết quả trả về HTTP 200 OK.
![Postman ALB Health Check](/images/1-Worklog/Week4/Postman_ALB_HealthCheck.png)

#### 6. Họp nhóm trực tuyến
Thực hiện họp nhóm để thảo luận về tiến độ dự án và phân chia công việc cho đợt triển khai sắp tới.
![Họp nhóm trực tuyến](/images/1-Worklog/Week4/1505_meeting_w4.jpg)