---
title: "Chuẩn bị môi trường"
date: 2026-07-02
weight: 2
chapter: false
pre: "<b>5.2.</b> "
---


## Mục tiêu của bài lab

Trước khi bắt đầu workshop, máy tính cá nhân của bạn cần được cấu hình để hoạt động như một **máy chủ CI/CD**, có khả năng xây dựng và triển khai ứng dụng lên AWS.

Phần này hướng dẫn bạn thiết lập toàn bộ tài khoản và công cụ cần thiết trước khi bước vào các giai đoạn triển khai hạ tầng và ứng dụng.

---

## Mục tiêu học tập

Sau khi hoàn thành phần này, bạn sẽ có:

- Một tài khoản AWS IAM User với quyền quản trị
- Một tên miền hợp lệ, sẵn sàng cho Route 53 và ACM
- Đầy đủ các công cụ phát triển được cài đặt và xác minh
- Một máy chủ Jenkins chạy trên máy cục bộ
- Mã nguồn dự án MiniSocial sẵn sàng để thực hành

---

## Thành phần cần chuẩn bị

| Thành phần | Mục đích |
|------------|----------|
| AWS IAM User | Cho phép Jenkins triển khai tài nguyên lên AWS |
| Tên miền (Domain) | Cần thiết để cấu hình Amazon Route 53, AWS Certificate Manager (ACM), HTTPS, Application Load Balancer và Amazon CloudFront |
| Tài khoản GitHub | Dùng để Fork, quản lý và lưu trữ mã nguồn của dự án |
| Git | Quản lý mã nguồn |
| Java 17 | Biên dịch ứng dụng Spring Boot |
| Apache Maven | Công cụ build Backend |
| Node.js (LTS) | Build ứng dụng React |
| Docker Desktop | Đóng gói và chạy Container |
| Jenkins | Máy chủ CI/CD |
| Trình soạn thảo mã nguồn | Visual Studio Code, IntelliJ IDEA hoặc trình soạn thảo khác |

---

# Bước 1 – Chuẩn bị Tài khoản AWS và IAM User

Do Jenkins sẽ thay mặt bạn gọi các API của AWS để khởi tạo hạ tầng và triển khai ứng dụng, nên cần có **Access Key** để xác thực.

## Tạo IAM User

1. Đăng nhập AWS Management Console.
2. Mở dịch vụ **IAM (Identity and Access Management)**.
3. Chọn **Users → Create user**.
4. Đặt tên người dùng (ví dụ: **MiniSocial-Admin**).
5. Không cần cấp quyền đăng nhập AWS Management Console.
6. Chọn **Attach policies directly**.
7. Gán quyền **AdministratorAccess**.
8. Hoàn tất quá trình tạo người dùng.

![IAM User Permission](/images/5-Workshop/5.2-Prerequisite/PermissionIAM.png)
<center><i>Tạo IAM User và gán quyền AdministratorAccess.</i></center>

## Tạo Access Key

1. Mở IAM User vừa tạo.
2. Chọn tab **Security credentials**.
3. Nhấn **Create access key**.
4. Chọn **Application running outside AWS**.
5. Tải file CSV hoặc lưu lại:

- Access Key ID
- Secret Access Key

![Tạo AWS Access Key](/images/5-Workshop/5.2-Prerequisite/SecretKey.png)
<center><i>Tạo Access Key cho ứng dụng chạy bên ngoài môi trường AWS.</i></center>

{{% notice warning %}}
Hai khóa này sẽ được sử dụng khi cấu hình Jenkins ở **Giai đoạn 2 – Thiết lập CI/CD**. **Không chia sẻ các khóa này cho người khác hoặc đưa lên GitHub.**
{{% /notice %}}

---

# Bước 2 – Chuẩn bị Tên miền và Trình soạn thảo

Trước khi triển khai hệ thống lên AWS, bạn cần chuẩn bị một **tên miền hợp lệ** và một **trình soạn thảo mã nguồn** để chỉnh sửa các tệp cấu hình.

## Chuẩn bị Tên miền

Workshop triển khai một môi trường gần với Production và sử dụng **HTTPS** thông qua **AWS Certificate Manager (ACM)**.

Do đó, bạn cần sở hữu một tên miền hợp lệ vì:

- Amazon Route 53 quản lý các bản ghi DNS.
- AWS Certificate Manager (ACM) cấp chứng chỉ SSL/TLS.
- Application Load Balancer (ALB) cung cấp kết nối HTTPS.
- Amazon CloudFront phân phối nội dung an toàn qua HTTPS.

Bạn có thể sử dụng:

- Tên miền mua từ Namecheap, GoDaddy, Hostinger hoặc các nhà cung cấp khác.
- Các tên miền miễn phí hoặc chi phí thấp (ví dụ **.id.vn**) nếu phù hợp.

{{% notice info %}}
Bạn cần có quyền quản lý DNS của tên miền thông qua Amazon Route 53 hoặc trang quản trị của nhà cung cấp tên miền.
{{% /notice %}}

## Chuẩn bị Trình soạn thảo mã nguồn

Trong suốt workshop, bạn sẽ cần chỉnh sửa một số tệp cấu hình như:

- Jenkinsfile
- CloudFormation YAML
- Các tệp cấu hình môi trường

Hãy cài đặt một trong các trình soạn thảo sau:

- Visual Studio Code (Khuyến nghị)
- IntelliJ IDEA
- Hoặc bất kỳ trình soạn thảo mã nguồn nào mà bạn quen sử dụng

---

# Bước 3 – Cài đặt các công cụ phát triển

Workshop sử dụng phương pháp **Build on Host**, nghĩa là Jenkins sẽ thực thi trực tiếp các lệnh build trên máy Windows trước khi tạo Docker Image.

Hãy cài đặt các phần mềm sau:

| Phần mềm | Yêu cầu |
|-----------|----------|
| Git | Git for Windows |
| Java | Oracle JDK 17 hoặc Amazon Corretto 17 |
| Apache Maven | Phiên bản ổn định mới nhất |
| Node.js | Phiên bản LTS |
| Docker Desktop | Docker Desktop for Windows |

Đồng thời cần cấu hình:

- `JAVA_HOME`
- `PATH` của Windows
- Docker Desktop đang chạy

## Kiểm tra cài đặt

Mở **Command Prompt** và chạy:

```bash
git --version
java -version
mvn -version
node -v
docker -v
```

{{% notice info %}}
Cả năm lệnh trên phải trả về số phiên bản hợp lệ. Nếu bất kỳ lệnh nào bị lỗi, hãy kiểm tra lại quá trình cài đặt trước khi tiếp tục.
{{% /notice %}}

---

# Bước 4 – Cài đặt và cấu hình Jenkins

Tải bộ cài Jenkins (.msi) từ trang chủ Jenkins và tiến hành cài đặt theo hướng dẫn.

## Cấu hình quyền sử dụng Docker

Theo mặc định, Jenkins được cài dưới dạng Windows Service chạy bằng tài khoản **Local System**, tài khoản này không có quyền truy cập Docker Desktop.

Bạn cần chuyển Jenkins sang chạy bằng chính tài khoản Windows đang sử dụng.

### Các bước thực hiện

1. Nhấn **Win + R**
2. Chạy:

```text
services.msc
```

3. Mở **Properties** của Jenkins.
4. Chọn tab **Log On**.
5. Chuyển sang **This account**.
6. Chọn đúng tài khoản Windows của bạn.
7. Nhập mật khẩu đăng nhập Windows.
8. Nhấn **Apply**.
9. Khởi động lại Jenkins Service.

![Cấu hình Jenkins Service](/images/5-Workshop/5.2-Prerequisite/Config_Jenkins.png)
<center><i>Cấu hình Jenkins Windows Service chạy bằng tài khoản người dùng Windows hiện tại thay vì tài khoản Local System.</i></center>

---

## Hoàn tất cấu hình Jenkins

Truy cập:

```text
http://localhost:14124
```

Lấy mật khẩu ban đầu tại:

```text
C:\ProgramData\Jenkins\.jenkins\secrets\initialAdminPassword
```

Sau đó chọn **Install Suggested Plugins** để hoàn tất quá trình khởi tạo Jenkins.

---

# Bước 5 – Chuẩn bị mã nguồn dự án

Để thực hiện các bài Lab trong workshop, trước tiên bạn cần tạo một bản sao (Fork) của repository dự án về tài khoản GitHub cá nhân.

## Repository gốc

Mã nguồn chính thức của workshop được lưu trữ tại:

```text
https://github.com/pht1412/Mini-social-network
```

## Fork Repository

1. Mở đường dẫn repository ở trên.
2. Nhấn nút **Fork** ở góc trên bên phải.
3. Chọn tài khoản GitHub của bạn làm nơi lưu trữ.
4. Chờ GitHub tạo bản sao của repository.

## Clone Repository

Mở Terminal (Git Bash hoặc CMD) và thực hiện:

```bash
git clone https://github.com/TEN_GITHUB_CUA_BAN/Mini-social-network.git

cd Mini-social-network
```

Đến đây, mã nguồn dự án đã được tải thành công về máy và sẵn sàng cho các giai đoạn tiếp theo.

---

# Kiểm tra kết quả

Trước khi tiếp tục sang phần tiếp theo, hãy xác nhận rằng:

- ✅ Đã lưu trữ an toàn AWS Access Key và Secret Access Key.
- ✅ Đã sở hữu tên miền hợp lệ và có quyền quản lý các bản ghi DNS.
- ✅ Đã cài đặt trình soạn thảo mã nguồn (Visual Studio Code hoặc IntelliJ IDEA).
- ✅ Git, Java, Maven, Node.js và Docker đều được cài đặt thành công.
- ✅ Có thể truy cập Jenkins Dashboard tại **http://localhost:14124**.
- ✅ Mã nguồn **Mini-social-network** đã được tải thành công về máy.

{{% notice tip %}}
Nếu tất cả các mục trên đều đã hoàn thành, môi trường phát triển của bạn đã sẵn sàng để bắt đầu **Giai đoạn 1 – Xây dựng hạ tầng (Foundation)**.
{{% /notice %}}