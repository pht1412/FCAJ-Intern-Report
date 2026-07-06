---
title: "Worklog Tuần 9"
date: 2026-06-21
weight: 9
chapter: false
pre: " <b> 1.9. </b> "
---

Báo cáo tuần này tập trung vào việc nâng cao trải nghiệm người dùng thông qua các tối ưu hóa Frontend, phát triển các tính năng Full-stack thời gian thực và duy trì luồng CI/CD ổn định bằng Jenkins. Nhóm đã tích hợp thành công hệ thống nhắn tin, công cụ xử lý ảnh và đảm bảo tiến trình triển khai tự động lên hạ tầng AWS ECS diễn ra xuyên suốt.

### Mục tiêu Tuần 9:
- Nâng cao trải nghiệm người dùng (UX) thông qua các tối ưu hóa Frontend (đồng bộ điều hướng, hệ thống thông báo, và công cụ xử lý ảnh).
- Phát triển các tính năng Full-stack mạnh mẽ, cho phép tìm kiếm người dùng và tương tác tin nhắn theo thời gian thực.
- Duy trì luồng Tích hợp và Triển khai liên tục (CI/CD) bằng cách tự động đẩy các bản cập nhật tính năng lên hạ tầng AWS ECS thông qua Jenkins.

### Các công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Ngày 1-7 (15/06 - 21/06) | - Phát triển Frontend <br>&emsp; + Đồng bộ hóa luồng điều hướng Username. <br>&emsp; + Thay đổi và cải thiện hệ thống thông báo. <br>&emsp; + Tích hợp bộ công cụ cắt ảnh (Image Cropper). | 06/15/2026 | 06/21/2026 | Project Repo |
| Ngày 1-7 (15/06 - 21/06) | - Phát triển Full-stack <br>&emsp; + Xây dựng tính năng tương tác tin nhắn (Chat). <br>&emsp; + Tích hợp công cụ tìm kiếm người dùng trong hệ thống Chat. | 06/15/2026 | 06/21/2026 | Project Repo |

### Thành tựu Tuần 9:
- Hoàn thiện thành công các module cốt lõi của mạng xã hội, cải thiện rõ rệt khả năng tương tác và xử lý đa phương tiện của người dùng cuối.
- Thể hiện tư duy quản lý vòng đời phát triển phần mềm (SDLC) chuyên nghiệp thông qua việc quản lý branch, xử lý conflict và viết commit rõ ràng.
- Kiểm chứng độ ổn định của hệ thống DevOps: toàn bộ tính năng mới sau khi merge code đều được Jenkins tự động đóng gói và triển khai lên môi trường AWS Cloud mà không gây gián đoạn dịch vụ.

### Minh chứng thực hiện:

#### 1. Quản lý Mã nguồn & Kích hoạt CI/CD
Quản lý mã nguồn dự án chặt chẽ trên nền tảng GitHub. Lịch sử Commit thể hiện rõ quá trình phát triển các tính năng Chat, cập nhật icon thông báo và công cụ cắt ảnh. Các thay đổi này sau khi được merge đã tự động kích hoạt luồng CI/CD để triển khai bản cập nhật mới nhất lên AWS.
![GitHub Commits & PRs](/images/1-Worklog/Week9/GitHub_Sprint_Commits.png)

#### 2. Tính năng Chat & Tìm kiếm người dùng
Phát triển thành công module nhắn tin Full-stack. Giao diện cho phép người dùng tìm kiếm bạn bè và thao tác nhắn tin theo thời gian thực, dữ liệu được truy xuất chính xác từ hệ thống cơ sở dữ liệu.
![Chat and Search Feature](/images/1-Worklog/Week9/Project_Chat_Search.png)

#### 3. Tích hợp Công cụ Cắt ảnh (Image Cropper)
Nâng cấp Frontend bằng việc tích hợp bộ công cụ xử lý ảnh, cho phép người dùng chủ động căn chỉnh và cắt ảnh đại diện (avatar) ngay trên trình duyệt trước khi upload dữ liệu lên kho lưu trữ Amazon S3.
![Image Cropper UI](/images/1-Worklog/Week9/Project_ImageCroppe.png)

#### 4. Họp nhóm trực tiếp (Offline)
Thực hiện họp nhóm trực tiếp (offline) để đánh giá lại toàn bộ kiến trúc hệ thống, hoàn thiện slide thuyết trình và tổng duyệt chuẩn bị cho buổi bảo vệ dự án cuối kỳ.
![Họp nhóm trực tiếp](/images/1-Worklog/Week9/1206_meeting_w9.jpg)