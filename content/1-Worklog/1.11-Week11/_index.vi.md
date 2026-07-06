---
title: "Worklog Tuần 11"
date: 2026-07-01
weight: 11
chapter: false
pre: " <b> 1.11. </b> "
---

Báo cáo tuần này tập trung vào việc triển khai tính năng tương tác mới lên môi trường Production và thực hiện kiểm thử hiệu năng chuyên sâu. Nhóm đã khởi chạy thành công hệ thống Gacha, xác thực khả năng xử lý các tệp tin lớn bằng K6, đồng thời giả lập các cuộc tấn công DDoS Layer 7 để thiết lập các chỉ số cơ sở (baseline) chuẩn bị cho việc tích hợp AWS WAF.

### Mục tiêu Tuần 11:
- Phát triển và triển khai tính năng tương tác mới **Gacha (Lucky Draw)** lên môi trường Production trên AWS.
- Xây dựng các kịch bản kiểm thử hiệu năng nâng cao bằng **K6**, mô phỏng luồng sử dụng thực tế bao gồm tải tệp theo định dạng `multipart/form-data` lên Amazon S3.
- Thực hiện giả lập tấn công **DDoS tầng ứng dụng (Layer 7 HTTP Flood)** nhằm đánh giá khả năng chịu tải của hệ thống.
- Thu thập các chỉ số hiệu năng cơ sở (Baseline Metrics) trước khi triển khai AWS Web Application Firewall (WAF).

### Các công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Ngày 1-3 | - Phát triển tính năng & CI/CD <br>&emsp;+ Phát triển giao diện và nghiệp vụ của hệ thống Gacha.<br>&emsp;+ Commit mã nguồn để kích hoạt Jenkins tự động triển khai lên Amazon ECS. | 29/06/2026 | 01/07/2026 | Project Repository |
| Ngày 4-7 | - Kiểm thử tải bằng K6 (Luồng thông thường) <br>&emsp;+ Xây dựng kịch bản: Đăng nhập → Xem bảng tin → Đăng bài kèm ảnh 5 MB lên Amazon S3.<br>&emsp;+ Thực thi kiểm thử và đánh giá độ ổn định của hệ thống Backend. | 02/07/2026 | 05/07/2026 | [K6 Documentation](https://cloudjourney.awsstudygroup.com/) |
| Ngày 4-7 | - Giả lập tấn công DDoS tầng ứng dụng <br>&emsp;+ Xây dựng kịch bản HTTP Flood nhắm vào API `/api/auth/login` với 500 Virtual Users (VUs).<br>&emsp;+ Thu thập số liệu cơ sở trước khi triển khai AWS WAF. | 02/07/2026 | 05/07/2026 | [K6 Documentation](https://cloudjourney.awsstudygroup.com/) |

### Thành tựu Tuần 11:
- Triển khai thành công tính năng **Gacha** lên môi trường Production mà không ảnh hưởng đến các chức năng đang vận hành.
- Xác thực khả năng xử lý ổn định của hệ thống Backend đối với các yêu cầu tải đồng thời tệp dung lượng lớn (5 MB) lên Amazon S3 thông qua giao thức `multipart/form-data`.
- Thực hiện thành công mô phỏng tấn công Layer 7 HTTP Flood và thu thập các chỉ số quan trọng như thời gian phản hồi của Application Load Balancer (ALB), hiện tượng nghẽn tại Amazon ECS và tỷ lệ lỗi của hệ thống, làm cơ sở cho việc triển khai AWS WAF trong giai đoạn tiếp theo.

### Minh chứng thực hiện:

#### 1. Triển khai tính năng mới: Hệ thống Gacha
Hoàn thành phát triển sự kiện **"Kho báu mùa hè"** cho hệ thống Gacha. Sau khi mã nguồn được đẩy lên GitHub, Jenkins CI/CD Pipeline tự động triển khai phiên bản mới của cả Backend và Frontend lên môi trường AWS Production. Tính năng mới được đưa vào vận hành thành công mà không làm gián đoạn các chức năng hiện có của hệ thống.
![GitHub Gacha Commits](/images/1-Worklog/Week11/GitHub_Gacha_Commits.png)
![Project Gacha Feature UI](/images/1-Worklog/Week11/Project_Gacha_Feature.png)

#### 2. Kiểm thử tải bằng K6: Luồng tải tệp 5 MB (Golden Snippet)
Xây dựng kịch bản kiểm thử hiệu năng bằng K6 nhằm mô phỏng hành vi của người dùng trong điều kiện thực tế. Luồng kiểm thử bao gồm:
1. Đăng nhập hệ thống.
2. Tải bảng tin.
3. Đăng bài viết kèm hình ảnh có dung lượng **5 MB** thông qua yêu cầu `multipart/form-data`.

Kịch bản này giúp đánh giá khả năng xử lý tải của Backend cũng như tốc độ truyền dữ liệu lên Amazon S3.
```javascript
// Bước 3: Đăng bài viết kèm ảnh 5 MB
const fd = new FormData();

fd.append('content', 'Đây là bài viết kiểm thử K6 với ảnh 5 MB được tạo tự động');
fd.append('visibility', 'PUBLIC');
fd.append(
  'mediaFiles',
  http.file(file5MB.buffer, 'loadtest-5mb.jpg', 'image/jpeg')
);

const postRes = http.post(`${BASE_URL}/api/posts`, fd.body(), {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': `multipart/form-data; boundary=${fd.boundary}`,
  },
  timeout: '30s', // Tăng thời gian chờ do kích thước tệp lớn
});
```
Kết quả kiểm thử ghi nhận **100% yêu cầu thực hiện thành công**, chứng minh hạ tầng Amazon ECS có thể xử lý ổn định các luồng tải dữ liệu lớn trong thời gian dài mà không làm suy giảm chất lượng dịch vụ.

#### 3. Giả lập tấn công DDoS tầng ứng dụng (Golden Snippet)
Xây dựng kịch bản **ddos-flow.js** nhằm mô phỏng lưu lượng truy cập độc hại vào hệ thống. Kịch bản sử dụng **500 Virtual Users (VUs)** liên tục gửi yêu cầu đăng nhập đến API xác thực trong vòng **1 phút**, qua đó đánh giá khả năng chịu tải của hạ tầng trước các cuộc tấn công Layer 7.
```javascript
export const options = {
  vus: 500,
  duration: '1m',
  thresholds: {
    http_req_failed: ['rate>0.01'],
  },
};

export default function () {
  const loginUrl = `${BASE_URL}/api/auth/login`;

  const payload = JSON.stringify({
    identifier: '141204',
    password: '1412',
  });

  // Giả lập lưu lượng HTTP Flood liên tục
  http.post(loginUrl, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: '60s',
  });
}
```
Kết quả thu được phản ánh rõ giới hạn của hệ thống khi chưa được bảo vệ bởi AWS WAF. Các hiện tượng nổi bật bao gồm:
- Khoảng **79% yêu cầu thất bại** khi lưu lượng tăng cao.
- Application Load Balancer (ALB) xuất hiện hiện tượng hết thời gian chờ (Timeout).
- Amazon ECS xảy ra nghẽn tài nguyên trong thời gian ngắn.
- Hệ thống trả về các mã lỗi **HTTP 502**, **503** và **504** trong giai đoạn tải cực đại.

Các số liệu này đóng vai trò là **Baseline Metrics**, cung cấp cơ sở định lượng để cấu hình các chính sách **Rate Limiting** và các quy tắc bảo vệ trên AWS Web Application Firewall (WAF) trong tuần tiếp theo.
![K6 Testing Results](/images/5-Workshop/5.7-Phase5-Monitoring/Picture47.png)

#### 4. Họp nhóm trực tiếp (Offline)
Thực hiện họp nhóm trực tiếp (offline) để đánh giá kết quả kiểm thử chịu tải, nghiệm thu tính năng Gacha và thông kê từ AWS WAF bằng các cuộc tấn công DDoS.
![Họp nhóm trực tiếp](/images/1-Worklog/Week11/0307_meeting_w11.png)