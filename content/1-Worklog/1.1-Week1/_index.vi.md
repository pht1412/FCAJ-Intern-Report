---
title: "Worklog Tuần 1"
date: 2026-04-24
weight: 1
chapter: false
pre: " <b> 1.1. </b> "
---

Báo cáo tuần này trình bày các bước thiết lập cơ bản cho môi trường AWS, tập trung vào cấu hình IAM và kiểm tra mạng nội bộ. Nhóm cũng đã khởi động dự án bằng việc đánh giá bảo mật sơ bộ trên ứng dụng cốt lõi để xác định các lỗ hổng.

### Mục tiêu Tuần 1:
- Tìm hiểu và quản lý các tài nguyên AWS Identity and Access Management (IAM).
- Áp dụng các nguyên tắc phân quyền và bảo mật cơ bản thông qua Users, Groups, và Roles.
- Thực hành thao tác chuyển đổi vai trò (Assume Role) trực tiếp trên AWS Management Console.
- Triển khai máy chủ ảo Amazon EC2 và kiểm tra kết nối mạng nội bộ.
- **Dự án nhóm:** Khởi động dự án, thực hiện kiểm thử thủ công (manual test) và đánh giá bảo mật (security audit) cho ứng dụng.

### Các công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Ngày 1 | - Create AdminUser & OperatorUser <br>&emsp; + Tạo hai IAM user riêng biệt phục vụ cho các tác vụ quản trị và vận hành. | 04/23/2026 | 04/23/2026 | [AWS IAM Documentation](https://cloudjourney.awsstudygroup.com/) |
| Ngày 1 | - Create AdminGroup <br>&emsp; + Khởi tạo IAM user group dành cho cấp quản trị viên. | 04/23/2026 | 04/23/2026 | [AWS IAM Documentation](https://cloudjourney.awsstudygroup.com/) |
| Ngày 1 | - Create AdminRole <br>&emsp; + Tạo IAM role với trusted entity để cấp quyền truy cập ủy quyền. | 04/23/2026 | 04/23/2026 | [AWS IAM Documentation](https://cloudjourney.awsstudygroup.com/) |
| Ngày 1 | - Add AdminUser to AdminGroup <br>&emsp; + Thêm user vào group để kế thừa quyền hạn như `AdministratorAccess`. | 04/23/2026 | 04/23/2026 | [AWS IAM Documentation](https://cloudjourney.awsstudygroup.com/) |
| Ngày 1 | - Check AdminUser on AdminGroup và Switch Role <br>&emsp; + Kiểm tra user trong group và thực hiện thao tác Switch Role từ `OperatorUser` sang `AdminRole`. | 04/23/2026 | 04/23/2026 | [AWS IAM Documentation](https://cloudjourney.awsstudygroup.com/) |
| Ngày 2 | - Provision EC2 Instances & Test Connectivity <br>&emsp; + Khởi tạo các máy chủ EC2 trong mạng private và sử dụng lệnh `ping` để kiểm tra thông mạng. | 04/24/2026 | 04/24/2026 | [AWS EC2 & VPC Documentation](https://cloudjourney.awsstudygroup.com/) |
| Ngày 2 | - **Dự án nhóm:** Đánh giá bảo mật <br>&emsp; + Kiểm thử thủ công các chức năng chính. <br>&emsp; + Tổng hợp `security_audit.log` từ các cuộc tấn công qua ngrok. <br>&emsp; + Báo cáo các lỗi chức năng và lỗ hổng bảo mật. | 04/24/2026 | 04/24/2026 | Project Repo |

### Thành tựu Tuần 1:
- Nắm vững cách quản lý IAM trên AWS Management Console.
- Hiểu rõ cách cấu hình phân quyền cơ bản.
- Áp dụng thành công ủy quyền (Assume Role) trên AWS Management Console.
- Triển khai thành công máy chủ EC2 và kiểm tra thông suốt mạng nội bộ.
- Khởi động dự án nhóm thành công bằng việc phát hiện và lập tài liệu các lỗ hổng bảo mật nghiêm trọng (SQL Injection, XSS, Path Traversal) thông qua môi trường ngrok.

### Minh chứng thực hiện:

#### 1. Create AdminUser & OperatorUser
Tạo thành công hai người dùng `AdminUser` và `OperatorUser` trong giao diện quản trị IAM Users.
![Giao diện tạo hai người dùng AdminUser và OperatorUser](/images/1-Worklog/Week1/Create_AdminUser&OperatorUser.png)

#### 2. Create AdminGroup
Khởi tạo thành công nhóm người dùng quản trị `AdminGroup` trên hệ thống.
![Giao diện khởi tạo AdminGroup](/images/1-Worklog/Week1/Create_AdminGroup.png)

#### 3. Create AdminRole
Cấu hình thành công vai trò `AdminRole` cùng việc chỉ định thực thể tin cậy (Trusted Entity).
![Giao diện cấu hình AdminRole](/images/1-Worklog/Week1/Create_AdminRole.png)

#### 4. Add AdminUser to AdminGroup
Tiến hành gán `AdminUser` vào `AdminGroup` để kế thừa toàn bộ các chính sách phân quyền đi kèm.
![Quá trình gán AdminUser vào AdminGroup](/images/1-Worklog/Week1/Add_AdminUser_TO_AdminGroup.png)

#### 5. Check AdminUser on AdminGroup & Switch Role
Xác nhận thành công trạng thái hoạt động của `AdminUser` thuộc nhóm thành viên `AdminGroup`.
![Xác nhận AdminUser thuộc AdminGroup](/images/1-Worklog/Week1/Check_AdminUser_ON_AdminGroup.png)

Kiểm tra và thực hiện thành công cơ chế ủy quyền bằng thao tác chuyển đổi vai trò (Switch Role) từ `OperatorUser` sang `AdminRole` trực tiếp trên bảng điều khiển.
![Giao diện thao tác chuyển đổi vai trò (Switch Role)](/images/1-Worklog/Week1/switch_Admin_Operator.png)

#### 6. Khởi tạo EC2 & Kiểm tra kết nối
Triển khai thành công các máy chủ EC2 trên AWS và xác nhận kết nối mạng nội bộ giữa các địa chỉ IP private (từ nguồn `10.10.4.143` đến đích `10.11.1.46`) thông qua lệnh `ping` (giao thức ICMP). Kết quả trả về cho thấy packet loss là 0%, chứng tỏ kết nối mạng (routing/security group) đã được cấu hình đúng.
![Kết quả lệnh ping kiểm tra kết nối mạng nội bộ giữa các máy chủ EC2](/images/1-Worklog/Week1/Screenshot%202026-04-24%20234230.png)

#### 7. Dự án nhóm: Đánh giá Bảo mật & Kiểm thử Thủ công
Thực hiện kiểm thử thủ công trên ứng dụng được public qua ngrok. Đã mô phỏng tấn công, phát hiện và ghi log thành công các lỗ hổng nghiêm trọng bao gồm SQL Injection, Path Traversal, và XSS attack vào file `security_audit.log`.
```json
{"time":"2026-04-20T21:58:02", "level":"WARN", "type":"SECURITY", "msg":"type=SQL_INJECTION ip=42.119.86.124 method=GET uri=/ query=search=%27%20OR%202%3D2%20-- ua=curl/8.18.0"}
{"time":"2026-04-20T21:58:21", "level":"WARN", "type":"SECURITY", "msg":"type=PATH_TRAVERSAL ip=42.119.86.124 method=GET uri=/ query=file=../../../../etc/passwd ua=curl/8.18.0"}
{"time":"2026-04-20T21:58:14", "level":"WARN", "type":"SECURITY", "msg":"type=XSS_ATTACK ip=42.119.86.124 method=GET uri=/ query=username=%3Cscript%3Ealert(1)%3C/script%3E ua=curl/8.18.0"}
```

#### 8. Họp nhóm trực tuyến (Google Meet)
Thực hiện họp nhóm trực tuyến qua Google Meet để thảo luận về dự án và phân chia công việc.
![Minh chứng buổi họp nhóm trực tuyến qua Google Meet](/images/1-Worklog/Week1/2604_meetingOnl_w1.png)
