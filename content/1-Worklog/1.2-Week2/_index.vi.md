---
title: "Worklog Tuần 2"
date: 2026-04-28
weight: 2
chapter: false
pre: " <b> 1.2. </b> "
---

Báo cáo tuần này tập trung vào việc thiết lập kiến trúc mạng lai an toàn sử dụng AWS Site-to-Site VPN và quản lý các tài nguyên máy chủ cơ bản. Nhóm cũng đã thực hành xử lý các sự cố về phân quyền IAM và bắt đầu nghiên cứu về kiến trúc CI/CD với Jenkins.

### Mục tiêu Tuần 2:
- Thiết kế và triển khai kiến trúc mạng lai (hybrid network) bằng AWS Site-to-Site VPN.
- Khởi tạo, quản lý máy chủ ảo Amazon EC2, ổ cứng EBS và card mạng (ENI).
- Cấu hình và xử lý sự cố liên quan đến quyền hạn IAM (User/Group) và IAM Roles cho EC2.
- Khởi tạo dịch vụ cơ sở dữ liệu (MariaDB) trong môi trường Linux thông qua SSH.
- **Dự án nhóm:** Thực hiện nghiên cứu kỹ thuật (Technical Spike) về Jenkins để chuẩn bị xây dựng luồng CI/CD.

### Các công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Ngày 1  | - Thiết lập Site-to-Site VPN <br>&emsp; + Khởi tạo VPC, Subnets, IGW, NAT, VGW, và CGW. <br>&emsp; + Tạo kết nối VPN và cấu hình router đầu cuối qua giao diện dòng lệnh. | 25/04/2026 | 25/04/2026 | [AWS VPN Documentation](https://cloudjourney.awsstudygroup.com/) |
| Ngày 1  | - Kiểm thử kết nối VPN <br>&emsp; + Xác nhận 2 đường hầm IPsec ở trạng thái UP và thực hiện thành công lệnh ping xuyên mạng. | 25/04/2026 | 25/04/2026 | [AWS VPC Routing](https://cloudjourney.awsstudygroup.com/) |
| Ngày 2  | - Cấu hình IAM & Khởi tạo EC2 <br>&emsp; + Tạo nhóm IAM `CostTest`, gán user, tạo IAM Role `Windows-instance`. <br>&emsp; + Khởi tạo hàng loạt EC2 và ổ cứng EBS. | 28/04/2026 | 28/04/2026 | [AWS EC2 & IAM Docs](https://cloudjourney.awsstudygroup.com/) |
| Ngày 2  | - Xử lý sự cố Phân quyền IAM <br>&emsp; + Phân tích lỗi khởi tạo EC2 thất bại do bị chặn bởi chính sách IAM. <br>&emsp; + Kiểm thử quyền truy cập S3 bucket (Access Denied). | 28/04/2026 | 28/04/2026 | [AWS IAM Troubleshooting](https://cloudjourney.awsstudygroup.com/) |
| Ngày 2  | - Cấu hình OS & Cơ sở dữ liệu <br>&emsp; + Truy cập Windows Server qua RDP và Linux qua SSH (MobaXterm). <br>&emsp; + Chạy lệnh khởi tạo bảo mật cho MariaDB. | 28/04/2026 | 28/04/2026 | [MariaDB Docs](https://cloudjourney.awsstudygroup.com/) |
| Ngày 2  | - **Dự án nhóm:** Nghiên cứu CI/CD (Jenkins) <br>&emsp; + Tìm hiểu kiến trúc Jenkins và cách tích hợp với GitHub. <br>&emsp; + Xác định các yêu cầu hệ thống để triển khai pipeline tự động. | 28/04/2026 | 28/04/2026 | Jenkins Official Docs |

### Thành tựu Tuần 2:
- Thiết lập và kiểm thử thành công hệ thống mạng bảo mật Site-to-Site VPN.
- Tích lũy kinh nghiệm thực tế trong việc xử lý các lỗi từ chối truy cập (Explicit Deny) của hệ thống IAM khi cấp phát tài nguyên.
- Truy cập thành công vào các máy chủ Cloud và cấu hình được dịch vụ cơ sở dữ liệu quan hệ.
- Hoàn thành nghiên cứu kỹ thuật về Jenkins, tạo tiền đề lý thuyết vững chắc để bắt tay vào tích hợp CI/CD pipeline ở tuần tiếp theo.

### Minh chứng thực hiện:

#### 1. Khởi tạo và kiểm tra AWS Site-to-Site VPN
Triển khai hạ tầng VPN trên AWS và cấu hình router phía khách hàng. Xác nhận cả 2 đường hầm (Tunnels) đều chuyển sang trạng thái **UP** và thông mạng định tuyến qua kết quả Ping.
![Create VPN Connection](/images/1-Worklog/Week2/Create_VPN%20Connection.png)
![Tunnel Configuration](/images/1-Worklog/Week2/cmd_2tunnel_active.png)
![VPN Tunnel UP](/images/1-Worklog/Week2/VPNConnection_2Tunnel_UP.png)
![Ping Test](/images/1-Worklog/Week2/Ping_Test.png)

#### 2. Cấu hình IAM Role cho EC2
Tạo và kiểm tra IAM Role `Windows-instance` được gán chính sách `AmazonSSMFullAccess`.
![Windows Instance Role](/images/1-Worklog/Week2/RDP_Windows_Instance.png)

#### 3. Xử lý sự cố: Giới hạn khởi tạo EC2 & Lỗi truy cập S3
Gặp lỗi "Instance launch failed" khi cấp phát máy chủ. Chẩn đoán nguyên nhân do chính sách định danh (`EC2_FamilyRestrict`) đã từ chối (Explicit Deny) quyền khởi tạo một số loại máy ảo nhất định.
![EC2 Launch Failed](/images/1-Worklog/Week2/EC2_FamilyRestrict.png)

Đồng thời, thực hành kiểm tra giới hạn phân quyền bằng cách truy cập danh sách S3 Buckets và nhận đúng thông báo lỗi "You don't have permissions" theo kịch bản bảo mật.
![S3 Access Denied](/images/1-Worklog/Week2/S3_Access_Denied.png)

#### 4. Khởi tạo Database qua giao diện dòng lệnh
Sử dụng công cụ MobaXterm kết nối SSH vào máy ảo Linux và thực thi thành công tập lệnh bảo mật ban đầu cho MariaDB.
![MariaDB Init](/images/1-Worklog/Week2/MobaXterm_MariaDB_Init.png)