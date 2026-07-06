---
title: "Thiết lập Jenkins"
date: 2026-07-02
weight: 41
chapter: false
pre: " <b> 5.4.1 </b> "
---

## Mục tiêu của bài lab

Trong bài Lab này, bạn sẽ chuẩn bị môi trường **Jenkins CI/CD** trên máy tính để triển khai ứng dụng lên AWS.

Thay vì cài đặt tất cả các plugin có sẵn, chúng ta sẽ tối ưu Jenkins bằng cách chỉ giữ lại những plugin cần thiết cho workshop. Đồng thời, bạn sẽ cấu hình **AWS Credentials** thông qua **Jenkins Credentials Store** và xác minh Jenkins có thể kết nối thành công tới tài khoản AWS.

---

## Mục tiêu học tập

Sau khi hoàn thành bài Lab này, bạn sẽ có thể:

- Tối ưu Jenkins bằng cách chỉ giữ lại các plugin cần thiết
- Cấu hình **AWS Credentials** an toàn trong Jenkins
- Kiểm tra khả năng kết nối giữa Jenkins và AWS
- Cấu hình các công cụ Build cần thiết trên Windows
- Chuẩn bị Jenkins cho các Pipeline triển khai Backend và Frontend

---

## Công cụ & Tài nguyên sử dụng

| Công cụ / Tài nguyên | Mục đích |
|-----------------------|----------|
| Jenkins Plugin Manager | Cài đặt, cập nhật và gỡ bỏ plugin |
| Jenkins Credentials Store | Lưu trữ an toàn AWS keys và secrets |
| Global Tool Configuration | Cấu hình công cụ build (Maven, JDK,...) |
| Pipeline Job | Thực thi Pipeline as Code |
| AWS CLI | Truy cập dịch vụ AWS qua dòng lệnh |
| IAM User Access Keys | Xác thực lập trình với AWS |

---

# Bước 1 – Kiểm tra Plugin đã cài đặt

Trước khi cấu hình Jenkins, hãy rà soát các plugin đã cài đặt để đảm bảo hệ thống gọn nhẹ, an toàn và phù hợp với môi trường Production.

Truy cập:

```text
Manage Jenkins
    └── Plugins
            └── Installed Plugins
```

![Kiểm tra Plugin Jenkins](/images/5-Workshop/5.4-Phase2-CICD-Setup/InstalledJenkins.png)
<center><i>Kiểm tra danh sách Plugin đã cài đặt trong Jenkins.</i></center>

Thực hiện rà soát theo các khuyến nghị dưới đây.

## Giữ lại các Plugin cần thiết

| Plugin | Mục đích |
|--------|----------|
| Pipeline | Hỗ trợ Pipeline as Code (Jenkinsfile) |
| Credentials Binding | Inject credentials an toàn vào các bước build |
| Config File Provider | Quản lý tệp cấu hình xuyên suốt pipeline |
| Git | Tích hợp quản lý mã nguồn |
| Amazon Web Services SDK 2 | Truy cập API AWS từ Jenkins |
| JUnit | Báo cáo kết quả kiểm thử |

## Gỡ bỏ các Plugin không sử dụng

Nếu không cần thiết, bạn nên gỡ bỏ hoặc vô hiệu hóa các plugin như:

- Ant
- Gradle
- Các plugin không sử dụng khác

Đồng thời, hãy kiểm tra các plugin xuất hiện cảnh báo bảo mật và cập nhật hoặc gỡ bỏ khi cần thiết.

## Cập nhật Plugin

Nhấn **Update All** để cập nhật các bản vá bảo mật và sửa lỗi mới nhất trước khi tiếp tục.

---

# Bước 2 – Cấu hình AWS Credentials

Jenkins cần thông tin xác thực AWS để có thể khởi tạo hạ tầng và triển khai ứng dụng.

Truy cập:

```text
Manage Jenkins
    └── Credentials
            └── System
                    └── Global Credentials
```

![Mở Jenkins Credentials](/images/5-Workshop/5.4-Phase2-CICD-Setup/ConfigCred_1.png)
<center><i>Điều hướng đến trang <b>Global Credentials</b> để quản lý các thông tin xác thực.</i></center>

Nhấn **Add Credentials**.

Cấu hình với các giá trị sau:

| Thuộc tính | Giá trị |
|------------|---------|
| Kind | AWS Credentials |
| Access Key ID | AWS Access Key của bạn |
| Secret Access Key | AWS Secret Access Key của bạn |
| ID | `aws-credentials` |
| Description | AWS Credentials for MiniSocial |

![Cấu hình AWS Credentials](/images/5-Workshop/5.4-Phase2-CICD-Setup/ConfigCred_2.png)
<center><i>Cấu hình AWS Credentials bằng Access Key và Secret Access Key của IAM User.</i></center>

Nhấn **Create** để lưu thông tin xác thực.

{{% notice warning %}}
**Không bao giờ** ghi trực tiếp Access Key hoặc Secret Access Key vào trong Jenkinsfile.
Hãy luôn lưu trữ các thông tin nhạy cảm bằng **Jenkins Credentials** để đảm bảo an toàn.
{{% /notice %}}

---

# Bước 3 – Kiểm tra biến môi trường Windows

Do Jenkins được cài đặt trực tiếp trên máy tính Windows, dịch vụ Jenkins sẽ tự động kế thừa các **biến môi trường (Environment Variables / PATH)** của hệ điều hành.

Trước khi xây dựng Pipeline, hãy xác nhận rằng các công cụ cần thiết đều có thể được gọi từ Command Prompt.

Mở **Command Prompt (CMD)** hoặc **PowerShell**, sau đó chạy:

```cmd
docker --version
aws --version
mvn --version
git --version
java --version
```

Nếu tất cả các lệnh đều trả về thông tin phiên bản mà không xuất hiện lỗi, Jenkins cũng sẽ có thể thực thi các lệnh này thông qua câu lệnh `bat` trong Pipeline.

{{% notice info %}}
Jenkins chạy dưới dạng Windows Service và tự động sử dụng biến môi trường **PATH** của hệ thống.
Nếu xuất hiện lỗi **'is not recognized as an internal or external command'**, hãy kiểm tra:
- Phần mềm đã được cài đặt hay chưa.
- Đường dẫn cài đặt đã được thêm vào biến môi trường **PATH** của Windows hay chưa.
{{% /notice %}}

---

# Bước 4 – Kiểm tra trạng thái sẵn sàng

Trước khi chuyển sang bài Lab **Backend Pipeline**, hãy thực hiện bước kiểm tra cuối cùng để đảm bảo Jenkins đã được cấu hình đầy đủ.

## Kiểm tra AWS Credentials

Truy cập:

```text
Manage Jenkins
    └── Credentials
            └── System
                    └── Global Credentials
```

Xác nhận rằng đã tồn tại AWS Credential với ID:

```text
aws-credentials
```

Đây là Credential sẽ được các Jenkins Pipeline sử dụng trong toàn bộ workshop.

---

## Kiểm tra bảo mật Plugin

Truy cập:

```text
Manage Jenkins
    └── Plugins
```

Đảm bảo rằng:

- Không còn cảnh báo bảo mật nghiêm trọng
- Tất cả Plugin đã được cập nhật lên phiên bản mới nhất
- Các Plugin không sử dụng đã được gỡ bỏ

Việc duy trì Jenkins luôn được cập nhật sẽ giúp Pipeline hoạt động ổn định và giảm thiểu các rủi ro về bảo mật.

---

## Kiểm tra kết quả

Trước khi tiếp tục, hãy xác nhận:

- ✅ Đã tạo AWS Credentials với ID `aws-credentials`
- ✅ Docker, AWS CLI, Maven, Git và Java đều có thể chạy từ Command Prompt
- ✅ Tất cả Plugin đã được cập nhật
- ✅ Không còn cảnh báo bảo mật nghiêm trọng trong Jenkins
- ✅ Jenkins đã sẵn sàng thực thi các lệnh Windows (`bat`) trong Pipeline

{{% notice tip %}}
Sau khi hoàn thành bài Lab này, Jenkins đã sẵn sàng để tự động build mã nguồn, tạo Docker Image và triển khai ứng dụng lên AWS trong các bài Lab **Backend Pipeline** và **Frontend Pipeline** tiếp theo.
{{% /notice %}}