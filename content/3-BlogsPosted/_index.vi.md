---
title: "Các bài blogs đã đăng"
date: 2024-01-01
weight: 3
chapter: false
pre: " <b> 3. </b> "
---

Mục này liệt kê và giới thiệu các bài viết kỹ thuật (blog) do nhóm biên soạn và đăng tải công khai trên cộng đồng [AWS Study Group VN](https://www.facebook.com/groups/awsstudygroupfcj). Những bài viết này tổng hợp các trải nghiệm thực chiến, các buổi thảo luận kiến trúc và những cập nhật công nghệ điện toán đám mây mới nhất thu được trong suốt quá trình triển khai đồ án.

### [Blog 1: Thảo luận Kiến trúc Đồ án Mini Social Network](3.1-Blog1/)
Bài viết này trình bày chi tiết thiết kế kiến trúc của đồ án "Mini Social Network" áp dụng mô hình 3-Tier Architecture tiêu chuẩn trên AWS. Hệ thống được phân tách một cách logic thành Phân hệ dữ liệu (Data Plane - Luồng truy cập & Xử lý dữ liệu) và Phân hệ quản trị (Control Plane - Luồng vận hành & CI/CD), làm nổi bật giải pháp cô lập hạ tầng và bảo mật của nhóm. Bài viết cũng bao gồm phần Hỏi & Đáp (Q&A) giá trị dựa trên các phản hồi thực tế từ các kỹ sư chuyên gia trong cộng đồng AWS.

### [Blog 2: Nhật Ký Đưa Ứng Dụng Lên Cloud – Từ Bài Học $35 Đến Kiến Trúc Tối Ưu Chi Phí](3.2-Blog2/)
Bài viết chia sẻ hành trình thực tế khi dịch chuyển một ứng dụng monolithic từ máy chủ VPS truyền thống lên kiến trúc Cloud-Native mạnh mẽ trên AWS. Nội dung tập trung vào cách nhóm đối mặt và vượt qua các thách thức kinh điển như chi phí NAT Gateway phát sinh ngoài dự kiến, lỗi định tuyến của ứng dụng SPA trên S3 và nút thắt cổ chai về hiệu năng của mã nguồn. Blog cũng thể hiện cách nhóm phân rã công việc theo từng vai trò chuyên môn (Ops, UI/UX, Observability, DevSecOps) để tối ưu hạ tầng.

### [Blog 3: Amazon ECS ra mắt High-Resolution Metrics giúp tăng tốc Service Auto Scaling gấp 4 lần](3.3-Blog3/)
Dựa trên những cập nhật công nghệ mới nhất từ AWS, bài viết phân tích chuyên sâu về tính năng chỉ số độ phân giải cao (chu kỳ 20 giây) mới được ra mắt cho Amazon ECS. Bài viết giải thích cơ chế cốt lõi giúp bước tiến đột phá này giảm độ trễ mở rộng hệ thống (scale-out delay) lên tới 76% (từ 363 giây xuống còn 86 giây), cho phép các hệ thống Cloud phản ứng tức thì trước các đợt spike traffic, đồng thời cắt giảm việc lãng phí tài nguyên dự phòng (capacity padding) và chi phí tính toán (compute costs).