---
title: "Blog 3: Amazon ECS ra mắt High-Resolution Metrics giúp tăng tốc Service Auto Scaling gấp 4 lần"
date: 2026-06-20
weight: 3
chapter: false
pre: " <b> 3.3. </b> "
---

> **Ngữ cảnh:** Để duy trì hiệu suất hệ thống và tối ưu hóa chi phí khi vận hành kiến trúc container, việc nắm bắt các cập nhật công nghệ mới là yếu tố sống còn. Bài viết dưới đây được biên dịch và phân tích từ bản tin công nghệ mới nhất của AWS (tháng 06/2026), giới thiệu một bước tiến đột phá của Amazon ECS giúp giải quyết bài toán độ trễ khi mở rộng hệ thống (Scale-out delay) - một trong những thách thức lớn nhất của các kỹ sư Cloud.

---

# Tăng tốc độ mở rộng dịch vụ với High-Resolution Metrics trên Amazon ECS

Tính năng tự động mở rộng dịch vụ của Amazon Elastic Container Service (Amazon ECS Service Auto Scaling) giúp tự động điều chỉnh số lượng Task để đáp ứng nhu cầu tải thông qua các chính sách mở rộng toàn diện. Các chính sách này bao gồm: 
* **Predictive scaling (Mở rộng dự đoán):** Dành cho các mô hình lưu lượng truy cập lặp đi lặp lại định kỳ.
* **Scheduled scaling (Mở rộng theo lịch trình):** Dành cho các sự kiện đã được lên kế hoạch trước.
* **Target tracking (Theo dõi mục tiêu):** Giúp mở rộng hệ thống một cách linh hoạt dựa trên các số liệu thời gian thực.

Người dùng có thể chọn hình thức *mở rộng chủ động (proactive scaling)* bằng cách kết hợp Predictive scaling và Scheduled scaling, hoặc *mở rộng phản ứng (reactive scaling)* bằng cách sử dụng Target tracking với một mốc mục tiêu cố định. Hệ thống ECS sẽ điều chỉnh số lượng task dựa trên các số liệu từ Amazon CloudWatch, chẳng hạn như mức sử dụng CPU/Memory trung bình, số lượng request trên mỗi target, các metric tùy chỉnh (như độ sâu của hàng đợi), hoặc xử lý các đợt tăng tải đột biến thông qua thuật toán Học máy (ML).

Tuy nhiên, với bản cập nhật mới nhất, khả năng mở rộng của ECS đã được nâng lên một tầm cao hoàn toàn mới.

---

## I. SỰ THAY ĐỔI ĐỘT PHÁ: TỐC ĐỘ XỬ LÝ NHANH HƠN TỚI 76%

Amazon ECS Service Auto Scaling giờ đây có thể phát hiện và phản hồi các thay đổi về tải nhanh hơn rất nhiều nhờ việc hỗ trợ các **chỉ số độ phân giải cao (High-resolution metrics - chu kỳ 20 giây)** cùng các tối ưu hóa trong việc xuất bản số liệu (metric publishing).

Trong các bài kiểm tra tiêu chuẩn (benchmarking tests) của AWS, kết quả đạt được là vô cùng ấn tượng:
* **Thời gian kích hoạt scale-out (mở rộng):** Được cải thiện rõ rệt từ 363 giây xuống chỉ còn **86 giây** (nhanh hơn 76%, tương đương gấp 4.2 lần).
* **Tổng thời gian để thực hiện scale và cấp phát task mới:** Được tối ưu từ 386 giây xuống còn **109 giây** (nhanh hơn 72%, tương đương gấp 3.5 lần).

---

## II. BA LỢI ÍCH CỐT LÕI CHO KIẾN TRÚC ỨNG DỤNG

Bản cập nhật này mang lại 3 lợi thế lớn trực tiếp cho ứng dụng của bạn:

1. **Cải thiện hiệu suất và độ tin cậy:** Tốc độ scaling nhanh hơn đồng nghĩa với việc ứng dụng của bạn sẽ phản hồi nhanh nhạy hơn trước các đợt tăng tải đột biến (demand surges). Điều này giúp giảm thiểu tối đa độ trễ (latency) hoặc tình trạng gián đoạn/lỗi đối với người dùng cuối trong các khung giờ cao điểm.
2. **Cấp phát tài nguyên chuẩn xác không cần thỏa hiệp (Right-size without compromise):** Tùy thuộc vào đặc thù workload, bạn hoàn toàn có thể giảm số lượng task chạy nền cơ bản (baseline). Lý do là vì quá trình scale-out giờ đây diễn ra đủ nhanh để xử lý các đợt spike traffic mà không cần phải duy trì một lượng tài nguyên dự phòng lãng phí (preemptive capacity padding) như trước. Điều này trực tiếp làm **giảm chi phí tính toán (compute costs)** trong khi vẫn đảm bảo tuyệt đối hiệu suất và tính sẵn sàng của ứng dụng.
3. **Đơn giản hóa cấu hình mở rộng:** Tính năng Target tracking kết hợp với metric độ phân giải cao mang lại khả năng mở rộng mạnh mẽ – điều mà trước đây đòi hỏi bạn phải tự cấu hình thủ công qua các chính sách phức tạp (ví dụ: step-scaling policies). Giờ đây, chỉ cần một thay đổi cấu hình duy nhất đã có thể thay thế cho toàn bộ các công đoạn tùy biến hạ tầng (custom engineering work) phức tạp đó.

---

## III. CƠ CHẾ HOẠT ĐỘNG VÀ CÁCH THIẾT LẬP

Để sử dụng tính năng tự động mở rộng nhanh hơn của ECS, trước tiên bạn cần bật các metric độ phân giải cao cho dịch vụ ECS của mình, sau đó cấu hình một chính sách Target tracking sử dụng chính các metric đó. Tính năng này hoạt động mượt mà trên tất cả các tùy chọn compute của ECS, bao gồm: **AWS Fargate, ECS Managed Instances, và Amazon EC2**. 

Bạn có thể thiết lập thông qua Amazon ECS Console, AWS SDKs, hoặc AWS CloudFormation:

* **Bật số liệu 20 giây:** Khi tạo dịch vụ trên Console, tại mục *Monitoring configuration*, hãy thêm các metric có độ phân giải 20 giây. (Lưu ý: Các metric độ phân giải cao này sẽ phát sinh thêm chi phí CloudWatch, trong khi mức phân giải tiêu chuẩn 60 giây là miễn phí).
* **Cấu hình Auto Scaling:** Tại mục *Service auto scaling*, tích chọn `Use service auto scaling` và chọn `Target Tracking` làm loại chính sách mở rộng.
* **Sử dụng Metric mới:** Trong phần cấu hình Target tracking, bạn có thể chọn hai metric mới được hỗ trợ là `ECSServiceAverageCPUUtilizationHighResolution` hoặc `ECSServiceAverageMemoryUtilizationHighResolution`.

**Đối với các dịch vụ ECS hiện có:** Bạn chỉ cần chọn *Update Service* để cấu hình lại. Sau khi cập nhật thành công, dịch vụ sẽ bắt đầu tạo ra các metric chu kỳ 20 giây. Lúc này, bạn truy cập vào tab *Service and auto scaling* để cập nhật lại chính sách mở rộng. Ngoài ra, bạn cũng có thể sử dụng giao diện dòng lệnh (AWS CLI) để kích hoạt.

---

## IV. LƯU Ý VỀ CHI PHÍ VÀ TRIỂN KHAI

Tính năng Service Auto Scaling nhanh hơn với metric độ phân giải cao hiện đã chính thức khả dụng. Bản thân **tính năng này không tốn thêm chi phí**, tuy nhiên, việc sử dụng các chỉ số CloudWatch độ phân giải cao (High-resolution CloudWatch metrics) sẽ áp dụng biểu phí riêng của CloudWatch. Bạn cần cân nhắc bài toán chi phí (Trade-off) giữa việc trả tiền cho CloudWatch Metric và việc tiết kiệm được chi phí tài nguyên dự phòng (Capacity Padding) của hệ thống.

---

## V. MINH HỌA SƠ ĐỒ CƠ CHẾ HOẠT ĐỘNG

Để trực quan hóa sự khác biệt cốt lõi giữa hai cơ chế, sơ đồ dưới đây mô tả chi tiết luồng phản hồi tự động (feedback loop) từ lúc hệ thống gặp spike traffic cho đến khi các Task mới được bổ sung thành công:

![Sơ đồ so sánh cơ chế ECS Auto Scaling](/images/3-BlogsPosted/Blog3_Architect.png)

**Phân tích sơ đồ cơ chế:**
* **Luồng 1 (Cơ chế tiêu chuẩn):** Chu kỳ thu thập metric kéo dài 60 giây tạo ra một độ trễ lớn (điểm mù thời gian) trong việc kích hoạt CloudWatch Alarm. Do đó, tổng thời gian hệ thống phát hiện, ra quyết định scale và provision thành công task mới kéo dài lên tới **363 giây**. Trong khoảng thời gian phản ứng chậm này, hệ thống rất dễ rơi vào trạng thái nghẽn hoặc sập hoàn toàn do quá tải.
* **Luồng 2 (Cơ chế đột phá mới):** Với High-Resolution Metrics (chu kỳ 20 giây), Amazon CloudWatch liên tục nhận diện được những biến động tải nhỏ nhất một cách real-time. CloudWatch Alarm kích hoạt phản hồi gần như ngay lập tức, giúp quy trình Auto Scaling cấu hình thêm các task mới cho dịch vụ ECS chỉ mất vỏn vẹn **86 giây** (nhanh hơn 76%), giúp cứu cánh hạ tầng tính toán một cách kịp thời trước khi hiệu năng của ứng dụng bị ảnh hưởng.

> **Tài liệu tham khảo:**
> * Bài viết gốc của tác giả Channy Yun (AWS News Blog): [Amazon ECS introduces new high-resolution metrics for faster service auto scaling](https://aws.amazon.com/blogs/aws/amazon-ecs-introduces-new-high-resolution-metrics-for-faster-service-auto-scaling/)
> * Bài viết gốc trên cộng đồng AWS Study Group VN: [Truy cập bài đăng tại đây](https://www.facebook.com/groups/awsstudygroupfcj/permalink/2205021196929507/?rdid=wLZS25hhop1qb4hd)