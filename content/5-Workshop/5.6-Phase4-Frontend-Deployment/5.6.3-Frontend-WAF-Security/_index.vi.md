---
title: "Bảo mật Frontend với AWS WAF"
date: 2026-07-02
weight: 563
chapter: false
pre: "<b>5.6.3. </b>"
---

## Mục tiêu của bài lab

Trong bài Lab cuối cùng của Giai đoạn 4 này, bạn sẽ bảo mật hạ tầng Serverless Frontend bằng cách gắn **AWS Web Application Firewall (WAF)** vào CloudFront distribution. 

Việc này sẽ bảo vệ ứng dụng React Single Page Application (SPA) của bạn khỏi các lỗ hổng web phổ biến, bot độc hại và các luồng truy cập bất thường ngay từ lớp mạng phân phối trước khi chúng chạm đến hệ thống backend.

---

## Mục tiêu học tập

Sau khi hoàn thành bài Lab này, bạn sẽ có thể:

- Tạo AWS WAF Web ACL trong phạm vi **Global (CloudFront)**
- Thêm các nhóm luật bảo mật có sẵn (managed rules) để chống lại các lỗ hổng phổ biến
- Liên kết AWS WAF Web ACL với Amazon CloudFront distribution
- Xác minh website Frontend đang được bảo vệ an toàn

---

## Dịch vụ AWS sử dụng

| Dịch vụ | Mục đích |
|---------|----------|
| AWS WAF | Tường lửa ứng dụng web bảo vệ lớp Frontend |
| Amazon CloudFront | Mạng phân phối nội dung, đóng vai trò là điểm gắn WAF |

---

{{% notice warning %}}
**LƯU Ý CỰC KỲ QUAN TRỌNG VỀ REGION & SCOPE:** 
Amazon CloudFront là một dịch vụ toàn cầu. Do đó, để gắn WAF vào CloudFront, bạn **BẮT BUỘC** phải tạo Web ACL trong phạm vi **Global (CloudFront)**, và phạm vi này được quản lý tập trung tại region **US East (N. Virginia) `us-east-1`**. Nếu bạn tạo WAF ở dạng "Regional", bạn sẽ không thể nhìn thấy và gắn nó vào CloudFront distribution của mình!
{{% /notice %}}

---

# Bước 1 – Truy cập AWS WAF và Thiết lập Scope

1. Đăng nhập vào AWS Management Console và đảm bảo góc trên bên phải màn hình đang chọn region **US East (N. Virginia) `us-east-1`**.
2. Tìm kiếm và mở dịch vụ **WAF & Shield**.
3. Ở menu bên trái, nhấn vào **Web ACLs** (hoặc Protection packs).
4. **QUAN TRỌNG:** Trước khi nhấn nút tạo, hãy nhìn vào menu thả xuống **Region** (thường nằm ở gần trên cùng hoặc cạnh thanh tìm kiếm) và chọn **Global (CloudFront)**.

---

# Bước 2 – Tạo Web ACL

1. Nhấn nút màu cam **Create protection pack (web ACL)** hoặc **Create web ACL**.
2. Trong phần "Tell us about your app":
   - **App category:** Chọn danh mục phù hợp nhất với ứng dụng của bạn (ví dụ: Social Networking hoặc General Web).
   - **App focus:** Chọn **Both API and web** (vì frontend của bạn tương tác rất nhiều với backend API).
   ![Create WAF Protection Pack](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/CreateWAF_Frontend.png)
   <center><i>Chọn các danh mục phù hợp để AWS tối ưu hóa các gợi ý bảo mật.</i></center>

3. **Select resources to protect:** Nhấn **Add AWS resources**, chọn **Amazon CloudFront distribution**, và tick chọn vào distribution `MiniSocial-Frontend` mà bạn đã tạo ở **Lab 5.6.1**.
4. **Name and describe:** Đặt tên cho Web ACL chính xác là `MiniSocial-Frontend-WAF`.

---

# Bước 3 – Cấu hình các luật bảo mật 

AWS WAF hoạt động dựa trên các quy tắc (rules). Chúng ta sẽ thêm một bộ luật cơ bản do AWS quản lý sẵn để chặn các lỗ hổng phổ biến.

1. Cuộn xuống phần **Add rules and rule groups**.
2. Nhấn **Add rules** > **Managed rule groups**.
3. Mở rộng mục **AWS managed rule groups**.
4. Tìm **Core rule set** (thường hiển thị là `AWS-AWSManagedRulesCommonRuleSet`) và bật công tắc sang **Add to web ACL**. Bộ luật này cung cấp khả năng bảo vệ có sẵn chống lại rất nhiều mối đe dọa, bao gồm cả danh sách OWASP Top 10.
   ![WAF Rules Frontend](/images/5-Workshop/5.6-Phase4-Frontend-Deployment/WAF_Frontend_Rules.png)
   <center><i>Thêm Core rule set để bảo vệ website khỏi các lỗ hổng web phổ biến nhất.</i></center>

5. Cuộn xuống phần Default web ACL action và đảm bảo nó đang được chọn là **Allow** (nghĩa là mặc định cho phép tất cả các truy cập đi qua, trừ khi bị một Rule chặn lại).
6. Nhấn **Next** để bỏ qua các màn hình ưu tiên và metrics (giữ nguyên cấu hình mặc định).
7. Xem lại toàn bộ cấu hình và nhấn **Create web ACL**.

---

## Kiểm tra kết quả

Trước khi coi như hoàn thành giai đoạn này, hãy xác nhận:

- ✅ Web ACL được tạo trong phạm vi **Global (CloudFront)**
- ✅ Web ACL có tên là `MiniSocial-Frontend-WAF`
- ✅ Web ACL đã được liên kết thành công với Frontend CloudFront distribution
- ✅ **Core rule set** đã được bật và kích hoạt

---

## Xác minh Truy cập Frontend

Mở trình duyệt và truy cập tên miền tùy chỉnh của bạn:

```text
https://minisocial-network.id.vn
```

Giao diện Frontend sẽ tải lên bình thường với tốc độ cao, nhưng giờ đây nó đã được bảo vệ tích cực bởi lớp lá chắn AWS WAF!

---

{{% notice tip %}}
Chúc mừng! Bạn đã triển khai, tự động hóa và bảo mật thành công toàn bộ Frontend của Mini Social Network. Đến đây, toàn bộ hệ thống (Backend, Frontend, CI/CD và Bảo mật) đã hoàn toàn đi vào hoạt động trơn tru trên nền tảng AWS Cloud.
{{% /notice %}}
