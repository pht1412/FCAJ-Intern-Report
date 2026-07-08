---
title: "Worklog Tuần 8"
date: 2026-06-14
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

Báo cáo tuần này tập trung vào việc hoàn thiện sơ đồ Kiến trúc Đám mây 3 lớp và chia sẻ kiến thức kỹ thuật cùng cộng đồng. Nhóm cũng đã thực hiện kiểm thử chịu tải nghiêm ngặt bằng K6 để đánh giá hiệu năng hệ thống, từ đó đề ra các phương án tối ưu hóa thực tế.

### Mục tiêu Tuần 8:
- Hoàn thiện và tài liệu hóa sơ đồ kiến trúc hệ thống 3 lớp (3-Tier) trên AWS.
- Chia sẻ kiến thức kỹ thuật và cột mốc dự án với cộng đồng Cloud.
- Thực hiện kiểm thử chịu tải (Load Testing) bằng K6 để đánh giá hiệu năng hệ thống.
- Phân tích số liệu để tìm ra nút thắt cổ chai hạ tầng (bottleneck) và lập kế hoạch tối ưu hóa.

### Các công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Ngày 1 | - Thiết kế Kiến trúc & Chia sẻ cộng đồng <br>&emsp; + Hoàn thiện bản vẽ sơ đồ kiến trúc AWS. <br>&emsp; + Đăng bài Blog #1 chia sẻ dự án lên group AWS Study Group VN. | 08/06/2026 | 08/06/2026 | Project Architect |
| Ngày 7 | - Kỹ thuật Hiệu năng (Load Testing) <br>&emsp; + Soạn kịch bản K6 giả lập 500 người dùng đồng thời (VUs). <br>&emsp; + Thực thi Load Test và đối chiếu giữa máy Local với AWS Cloud. <br>&emsp; + Lập Báo cáo Ngưỡng chịu tải & Phân tích nút thắt hệ thống. | 14/06/2026 | 14/06/2026 | K6 Documentation |

### Thành tựu Tuần 8:
- Trực quan hóa thành công bản đồ hạ tầng ứng dụng và đóng góp bài viết chất lượng cho cộng đồng kỹ sư.
- Chứng minh được độ tối ưu mã nguồn ứng dụng (thuật toán Phân trang bằng con trỏ, Debounce) khi chịu tải cao.
- Xác định chính xác nút thắt hạ tầng (nghẽn CPU do giải mã JWT trên ECS) và đưa ra các ngưỡng chịu tải thực tế cho hệ thống (<50 VUs).
- Lên kế hoạch hành động (Action Plan) chuyên nghiệp theo chuẩn DevOps nhằm mở rộng tài nguyên tính toán và tối ưu bộ nhớ đệm.

### Minh chứng thực hiện:

#### 1. Sơ đồ Kiến trúc & Đóng góp Cộng đồng (Blog #1)
Hoàn thiện sơ đồ thiết kế kiến trúc 3 lớp (3-Tier Architecture) được tùy biến riêng cho môi trường AWS.
![Architecture Diagram](/images/1-Worklog/Week8/Architecture_Diagram_V1.png)

Đăng tải bài viết chia sẻ về quy hoạch hạ tầng và tiến độ dự án trên cộng đồng mạng xã hội.
![AWS Study Group Blog](/images/1-Worklog/Week8/AWS_Study_Group_Blog.png)

👉 **[Nhấn vào đây để đọc toàn bộ Bài Blog #1 tại chuyên mục Blogs Posted](/vi/blogs-posted/)**

#### 2. Khởi chạy và Kết quả Kiểm thử chịu tải (K6)
Thực thi các kịch bản chịu tải nặng bằng K6, mô phỏng 500 người dùng ảo (VUs) liên tục gửi truy vấn đến API trong vòng 3 phút.
![K6 Load Test Execution](/images/1-Worklog/Week8/K6_LoadTest_Execution.png)
![K6 Load Test Results](/images/1-Worklog/Week8/K6_LoadTest_Results.png)

#### 3. Báo cáo Hiệu năng và Ngưỡng chịu tải hệ thống
Dựa trên kết quả từ K6, một phân tích so sánh toàn diện đã được lập ra giữa môi trường Local và AWS Cloud (ECS/ALB).

**A. Kịch bản 1: API Lấy Bảng Tin (Read-Heavy)**
*Mô phỏng 500 người dùng liên tục tải và cuộn trang chủ.*
| Môi trường | Tổng số Request | Thông lượng (RPS) | Tỉ lệ lỗi | Độ trễ p(95) | Đánh giá Trải nghiệm |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Local** | 18.302 | ~100 req/s | 0.00% | 73.1 ms | Mượt như Sunsilk |
| **AWS Cloud** | 3.920 | ~20 req/s | 0.02% | 19.03 s | Quá tải (OverLoad) |

**B. Kịch bản 2: API Tương Tác (Write-Heavy)**
*Mô phỏng bão tương tác: 500 người dùng spam nút Like vào cùng 1 bài viết.*
| Môi trường | Tổng số Request | Thông lượng (RPS) | Tỉ lệ lỗi | Độ trễ p(95) | Đánh giá Trải nghiệm |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Local** | 22.049 | ~182 req/s | 1.80% | 1.39 s | Nice!! |
| **AWS Cloud** | 4.979 | ~40 req/s | 0.24% | 10.94 s | Quá tải (OverLoad) |

**C. Phân tích & Kết luận từ Tech Lead:**
- **Điểm mạnh (Software):** Mã nguồn đã đạt độ chính xác cao. Thuật toán Phân trang con trỏ giúp API Feed trên Local trả về kết quả trong 73ms. Thuật toán Debounce + Eventual Consistency đã chặn đứng hoàn toàn hiện tượng sụp đổ Database (Deadlock - 0% lỗi HTTP 500). Lỗi ghi nhận phần lớn là rớt mạng TCP.
- **Nút thắt cổ chai (Infrastructure):** Container trên AWS ECS (Micro/Small) đang cấu hình quá thấp. CPU chạm đỉnh 100% chỉ để giải mã 500 chữ ký JWT Token, dẫn đến request phải xếp hàng ở ALB và bị ngắt kết nối (timeout 10-19s).
- **Ngưỡng chịu tải hiện tại:** 
    - 🟢 Ngưỡng mượt mà: < 50 Users đồng thời.
    - 🟡 Ngưỡng cảnh báo (Bắt đầu xếp hàng): 50 - 150 Users.
    - 🔴 Ngưỡng suy thoái (Độ trễ > 10s): > 200 Users.

**D. Kế hoạch Hành động (Action Plan):**
1. **Nâng cấp tài nguyên tính toán (Ưu tiên cao nhất):** Nâng cấp ECS Task Definition lên tối thiểu 1 vCPU và 2GB RAM. Thiết lập Auto Scaling (Scale Out) khi CPU vượt ngưỡng 70%.
2. **Tối ưu cấu hình Spring Boot:**
```properties
# Tăng luồng phục vụ tối đa của Tomcat
server.tomcat.threads.max=500
# Tăng hàng đợi cho request đến sau
server.tomcat.accept-count=200
# Tăng connection pool cho Database
spring.datasource.hikari.maximum-pool-size=30
```