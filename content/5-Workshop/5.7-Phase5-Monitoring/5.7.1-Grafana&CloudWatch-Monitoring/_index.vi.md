---
title: "Giám sát Grafana & CloudWatch"
date: 2026-07-02
weight: 571
chapter: false
pre: "<b>5.7.1. </b>"
---

## Mục tiêu của bài lab

Trong bài Lab này, bạn sẽ tích hợp **Amazon CloudWatch** với **Grafana Cloud** để xây dựng bảng điều khiển giám sát thời gian thực (Real-time Monitoring Dashboard) cho hệ thống **MiniSocial**.

Bạn sẽ cấu hình CloudWatch làm nguồn dữ liệu (Data Source) cho Grafana, xây dựng Dashboard theo dõi hạ tầng, thiết lập hệ thống cảnh báo qua Email và cuối cùng sử dụng **K6** để thực hiện kiểm thử tải (Load Testing), từ đó quan sát cách ứng dụng phản hồi khi chịu lượng truy cập lớn.

Sau khi hoàn thành, bạn sẽ sở hữu một giải pháp giám sát tập trung, có khả năng trực quan hóa số liệu ứng dụng, phát hiện lượng truy cập bất thường và tự động thông báo cho quản trị viên.

---

## Mục tiêu học tập

Sau khi hoàn thành bài Lab này, bạn sẽ có thể:

- Kết nối **Amazon CloudWatch** với **Grafana Cloud**
- Theo dõi các chỉ số từ ALB, Amazon ECS (Fargate) và Amazon RDS
- Xây dựng Dashboard giám sát theo thời gian thực với nhiều luồng dữ liệu
- Thiết lập hệ thống cảnh báo tự động qua Email
- Thực hiện kiểm thử tải (Load Testing) bằng **K6**
- Phân tích hiệu năng hạ tầng và quá trình Auto-Scaling dưới áp lực tải cao

---

## Dịch vụ & Công cụ sử dụng

| Công cụ / Dịch vụ | Mục đích |
|-------------------|----------|
| Grafana Cloud | Bảng điều khiển giám sát thời gian thực tập trung |
| Amazon CloudWatch | Thu thập các số liệu về hạ tầng và ứng dụng |
| Amazon ECS (Fargate) | Môi trường chạy ứng dụng Container cần giám sát |
| Amazon RDS | Cơ sở dữ liệu cần giám sát kết nối |
| Application Load Balancer (ALB) | Bộ cân bằng tải phân phối lượng truy cập |
| IAM Access Keys | Xác thực để Grafana đọc dữ liệu từ CloudWatch an toàn |
| Grafana K6 | Công cụ mã nguồn mở kiểm thử tải (Load Testing) |

---

# Bước 1 – Tạo AWS Credentials cho Grafana

Grafana cần AWS Credentials để đọc các chỉ số từ Amazon CloudWatch.

Đăng nhập vào **AWS Management Console**, sau đó điều hướng đến:

```text
IAM
└── Users
    └── IAM User của bạn
        └── Security credentials
```

Cuộn xuống phần **Access keys**.

Nhấn:

```text
Create access key
```

Chọn:

```text
Third-party service
```

Tiến hành tạo Access Key. Lưu lại an toàn hai thông số sau:

- Access Key ID
- Secret Access Key

{{% notice warning %}}
**Secret Access Key chỉ được hiển thị một lần duy nhất.**
Hãy lưu lại ở nơi an toàn trước khi rời khỏi trang này.
{{% /notice %}}

---

# Bước 2 – Kết nối Amazon CloudWatch với Grafana

Đăng nhập vào tài khoản **Grafana Cloud**.

Điều hướng đến:

```text
Connections
└── Data sources
    └── Add data source
```

Tìm kiếm:

```text
CloudWatch
```

Cấu hình Data Source theo các thông số sau:

| Thuộc tính | Giá trị |
|------------|----------|
| Authentication Provider | Access & secret key |
| Access Key ID | AWS Access Key của bạn |
| Secret Access Key | AWS Secret Access Key của bạn |
| Default Region | ap-southeast-1 (hoặc Region bạn triển khai) |

Nhấn:

```text
Save & Test
```

Nếu cấu hình chính xác, Grafana sẽ hiển thị thông báo:

```text
Data source is working
```

---

# Bước 3 – Xây dựng Dashboard Stress Test

Điều hướng đến:

```text
Dashboards
└── New dashboard
    └── Add visualization
```

Chọn **CloudWatch** làm Data Source.

Tạo một **Row** mới với tên:

```text
Stress Test Panel
```

### Cách chọn đúng Dimension

{{% notice info %}}
Vì bạn đã xác thực Grafana bằng IAM Access Key, Grafana sẽ tự động khám phá các tài nguyên AWS của bạn.
{{% /notice %}}

Đối với mỗi panel giám sát dưới đây:
- **Tuyệt đối không tự gõ tên tài nguyên.**
- Hãy nhấn vào menu thả xuống của **Dimension**.
- Chọn đúng tài nguyên thuộc dự án **MiniSocial** của bạn.

Bao gồm:
- Application Load Balancer
- ECS Cluster
- ECS Service
- RDS Database Instance

Nếu chọn sai hoặc bỏ trống Dimension, Grafana sẽ không thể hiển thị số liệu.

---

## Panel 1 – Lưu lượng truy cập ALB (ALB Throughput)

Cấu hình truy vấn sau:

| Thuộc tính | Giá trị |
|------------|----------|
| Namespace | AWS/ApplicationELB |
| Metric | RequestCount |
| Dimension | LoadBalancer = *Chọn ALB của MiniSocial* |
| Statistic | Sum |
| Period | 1 minute |

---

## Panel 2 – Lỗi HTTP 5xx của ALB

Tạo **hai truy vấn (queries)**.

### Query A
| Thuộc tính | Giá trị |
|------------|----------|
| Namespace | AWS/ApplicationELB |
| Metric | HTTPCode_Target_5XX_Count |
| Dimension | LoadBalancer = *Chọn ALB của MiniSocial* |

### Query B
| Thuộc tính | Giá trị |
|------------|----------|
| Namespace | AWS/ApplicationELB |
| Metric | HTTPCode_ELB_5XX_Count |
| Dimension | LoadBalancer = *Chọn ALB của MiniSocial* |

Sử dụng cấu hình chung cho cả 2 truy vấn:
| Thuộc tính | Giá trị |
|------------|----------|
| Statistic | Sum |
| Period | 1 minute |

---

## Panel 3 – Mức sử dụng tài nguyên Amazon ECS

Tạo hai truy vấn.

### CPU Utilization
| Thuộc tính | Giá trị |
|------------|----------|
| Namespace | AWS/ECS |
| Metric | CPUUtilization |

### Memory Utilization
| Thuộc tính | Giá trị |
|------------|----------|
| Namespace | AWS/ECS |
| Metric | MemoryUtilization |

Sử dụng Dimension sau cho **cả hai** truy vấn:
| Dimension | Giá trị |
|------------|-------|
| ClusterName | Chọn ECS Cluster của bạn |
| ServiceName | Chọn ECS Service của bạn |

Cấu hình chung:
| Thuộc tính | Giá trị |
|------------|----------|
| Statistic | Average |
| Period | 1 minute |

---

## Panel 4 – Kết nối cơ sở dữ liệu Amazon RDS

Cấu hình Panel như sau:

| Thuộc tính | Giá trị |
|------------|----------|
| Namespace | AWS/RDS |
| Metric | DatabaseConnections |
| Dimension | DBInstanceIdentifier = *Chọn RDS Instance của bạn* |
| Statistic | Average (hoặc Maximum) |
| Period | 1 minute |

---

## Kết quả Dashboard kỳ vọng

Sau khi hoàn thành cả bốn Panel, Dashboard của bạn sẽ cung cấp cái nhìn trực quan theo thời gian thực về:

- Lưu lượng truy cập vào hệ thống (ALB)
- Số lượng lỗi HTTP 5xx
- Mức tiêu thụ CPU của ECS
- Mức tiêu thụ Memory của ECS
- Số lượng kết nối vào Cơ sở dữ liệu RDS

---

# Bước 4 – Thiết lập cảnh báo qua Email

Grafana có thể tự động thông báo cho quản trị viên khi lưu lượng truy cập vượt quá ngưỡng quy định.

Điều hướng đến:

```text
Alerting
└── Contact points
```

Nhấn:

```text
Add contact point
```

Cấu hình điểm liên hệ:

| Thuộc tính | Giá trị |
|------------|----------|
| Integration | Email |
| Email Address | Địa chỉ Email của bạn |

Nhấn:

```text
Test
```

Xác nhận bạn đã nhận được Email thử nghiệm. Sau đó lưu Contact Point.

---

Tiếp tục điều hướng đến:

```text
Alerting
└── Alert rules
    └── New alert rule
```

Tạo một Alert Rule sử dụng cùng truy vấn **RequestCount** từ **Panel 1**.

Cấu hình luật cảnh báo:

| Thuộc tính | Giá trị |
|------------|----------|
| Condition | IS ABOVE |
| Threshold | 500000 |
| Evaluation Interval | 1 minute |
| Folder | LoadTest-Alerts |

Lưu Alert Rule.

---

# Bước 5 – Cài đặt K6 qua Windows Terminal

Để có thể thực hiện kiểm thử tải, bạn cần cài đặt K6 trên máy tính cục bộ.

### 1. Mở Windows Terminal
Bạn có thể mở Terminal bằng một trong các cách sau:
- Nhấn phím **Windows** → gõ `Windows Terminal`.
- Hoặc mở **PowerShell**.
- Hoặc mở **Command Prompt (CMD)**.

*Không bắt buộc phải mở bằng Administrator, nhưng nếu gặp lỗi quyền thì hãy chọn **Run as administrator**.*

### 2. Kiểm tra WinGet
Gõ lệnh sau để kiểm tra:
```bash
winget --version
```
- Nếu hiển thị phiên bản (ví dụ: `v1.12.350`), hãy chuyển sang bước tiếp theo.
- Nếu hệ thống báo `'winget' is not recognized...`, bạn cần cài đặt **App Installer** từ Microsoft Store trước khi tiếp tục.

### 3. Cài đặt K6
Chạy lệnh sau để cài đặt K6:
```bash
winget install --id GrafanaLabs.k6 --exact
```
Nếu màn hình hiển thị `Do you agree?`, hãy nhập `Y` và nhấn **Enter**.
WinGet sẽ tự động thực hiện: tải k6, cài đặt, thêm PATH và hoàn tất.

### 4. Kiểm tra cài đặt
- Đóng cửa sổ Terminal hiện tại.
- Mở lại một Terminal mới.
- Gõ lệnh sau:
```bash
k6 version
```
Nếu kết quả trả về tương tự như `k6 v2.1.0`, quá trình cài đặt đã thành công.

### 5. Xử lý lỗi (Nếu Terminal báo không tìm thấy k6)
Nếu bạn gặp lỗi `'k6' is not recognized...`, hãy thử các cách sau:
- **Cách 1:** Đóng toàn bộ Terminal rồi mở lại.
- **Cách 2:** Khởi động lại máy tính.
- **Cách 3:** Kiểm tra PATH bằng lệnh:
```bash
where k6
```
Nếu kết quả trả về đường dẫn `C:\Program Files\k6\k6.exe`, hệ thống đã nhận diện được PATH chính xác.

---

# Bước 6 – Thực hiện kiểm thử tải bằng K6

Để đánh giá hệ thống giám sát, bạn sẽ tiến hành thử tải ứng dụng **MiniSocial** bằng script K6 được cung cấp sẵn.

### 1. Chuẩn bị file test

Tải tệp sau:
- **normal-flow.js** – Giả lập hoạt động của người dùng để tạo ra lưu lượng truy cập thực tế.
- **ddos-flow.js** *(Tùy chọn)* – Kịch bản giả lập tấn công từ chối dịch vụ.

{{% notice info %}}
**[Tải kịch bản K6 thử tải tại đây trước khi tiếp tục.](/iac/final-minisocial-architect.yaml)**
{{% /notice %}}

Lưu file vào một thư mục trên máy tính của bạn. Mở Terminal và di chuyển đến thư mục chứa file.

Ví dụ trên Windows:
```bash
cd C:\Users\YourName\Desktop\Lab5
```

Kiểm tra lại xem file đã tồn tại trong thư mục chưa:
```bash
dir
```
Bạn phải thấy `normal-flow.js` xuất hiện trong danh sách.

{{% notice warning %}}
Trước khi chạy K6, hãy đảm bảo Terminal đang trỏ đúng thư mục chứa file **normal-flow.js**. Nếu không, K6 sẽ báo lỗi không tìm thấy file.
{{% /notice %}}

### 2. Chạy k6

Thực thi lệnh sau:
```bash
k6 run normal-flow.js
```

Script K6 sẽ bắt đầu bắn lượng lớn request tới **Application Load Balancer**. Nếu thành công, bạn sẽ thấy tiến trình chạy trên Terminal đại loại như sau:

```text
execution: local
script: normal-flow.js

scenarios: ...

running...

✓ status is 200

checks................: 100.00%
http_req_duration.....
vus...................
iterations............
```

Đó là báo cáo sau khi K6 hoàn thành bài kiểm thử.

### 3. Kiểm tra Dashboard và Cảnh báo

Quay trở lại **Grafana Dashboard**. Trong quá trình thử tải, bạn sẽ thấy các biểu đồ sau tăng đột biến:
- ALB RequestCount
- ECS CPU Utilization
- ECS Memory Utilization
- Số lượng kết nối Amazon RDS

![K6 and Grafana Dashboard](/images/5-Workshop/5.7-Phase5-Monitoring/Picture47.png)
<center><i>Giao diện Grafana Dashboard và K6 Terminal hiển thị sự gia tăng đột biến của lưu lượng mạng và việc sử dụng tài nguyên khi hệ thống chịu tải cao.</i></center>

Nếu lưu lượng vượt quá ngưỡng trong Alert Rule, trạng thái cảnh báo sẽ lần lượt chuyển qua:
1. **Pending**
2. **Firing**

Cuối cùng, kiểm tra hộp thư Email của bạn. Nếu Alert được kích hoạt, Grafana sẽ tự động gửi một Email thông báo khẩn cấp đến hộp thư bạn đã cấu hình.

---

## Danh sách kiểm tra (Verification Checklist)

Trước khi tiếp tục, hãy xác nhận rằng:

- ✅ Amazon CloudWatch đã được kết nối thành công với Grafana Cloud
- ✅ Dashboard Stress Test hiển thị dữ liệu theo thời gian thực
- ✅ Lưu lượng ALB tăng mạnh khi chạy K6
- ✅ CPU và RAM của Amazon ECS phản hồi và tự động mở rộng theo tải
- ✅ Các chỉ số của Amazon RDS hiển thị chính xác
- ✅ Alert Rule trong Grafana chuyển sang trạng thái **Firing**
- ✅ Đã nhận được Email cảnh báo từ Grafana thành công

---

{{% notice tip %}}
Chúc mừng! Bạn đã tích hợp thành công **Amazon CloudWatch** với **Grafana Cloud** để xây dựng giải pháp giám sát thời gian thực.
Hệ thống **MiniSocial** của bạn giờ đây có thể trực quan hóa các chỉ số hạ tầng, theo dõi tình trạng sức khỏe ứng dụng, phát hiện lưu lượng bất thường và tự động gửi cảnh báo cho quản trị viên. Việc giám sát này mang lại sự minh bạch cho quá trình vận hành và đảm bảo độ ổn định, sẵn sàng của toàn bộ ứng dụng trong môi trường thực tế.
{{% /notice %}}