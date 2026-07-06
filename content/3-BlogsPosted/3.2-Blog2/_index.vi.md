---
title: "Blog 2: Nhật Ký Đưa Ứng Dụng Lên Cloud – Từ Bài Học $35 Đến Kiến Trúc Tối Ưu Chi Phí"
date: 2024-01-02
weight: 2
chapter: false
pre: " <b> 3.2. </b> "
---

> **Ngữ cảnh:** Bài viết này ghi lại hành trình thực tế của nhóm khi tối ưu hóa hạ tầng AWS cho đồ án "Mini Social Network". Từ những sai lầm kinh điển về chi phí mạng và nút thắt hiệu năng, nhóm đã phân rã công việc theo từng vai trò chuyên môn để tái cấu trúc hệ thống thành công. Bài viết đã được chia sẻ và thảo luận sôi nổi trên cộng đồng **AWS Study Group VN**.

---

# Hành Trình Tối Ưu Hóa Kiến Trúc Cloud Native

Trong quá trình xây dựng hệ thống Mạng xã hội nội bộ "Mini Social Network", nhóm đã từng đối mặt với câu hỏi phổ biến: *"Tại sao không thuê một máy chủ ảo (VPS) và triển khai toàn bộ mã nguồn lên đó cho đơn giản, thay vì phải thiết lập các dịch vụ phức tạp trên AWS?"*. Thực tế, chính nhóm ở những ngày đầu cũng có suy nghĩ tương tự. Tuy nhiên, khi chính thức bắt tay vào việc đưa toàn bộ kiến trúc dự án lên Cloud, nhóm đã rút ra được những bài học thực tế rất đắt giá.

---

## I. SAI LẦM TRONG QUÁ KHỨ (THE "BEFORE")

Ở các dự án nhỏ hoặc các môn học trước đây, tư duy triển khai của nhóm khá đơn giản và đi theo lối mòn: *"Gom tất cả vào một máy chủ"*. Nhóm thường thuê một máy ảo (VPS) duy nhất, tự cấu hình MySQL, chạy trực tiếp ứng dụng Spring Boot Backend và cấu hình Nginx để serve bản build React Frontend ngay trên cùng hệ thống đó. 

Nghiêm trọng hơn, các thông tin nhạy cảm như mật khẩu cơ sở dữ liệu hay khóa bảo mật mã hóa JWT đều được lưu trữ dưới dạng văn bản thô (plaintext) trực tiếp trong tệp cấu hình `.env`. 

Thời điểm đó, hệ thống vận hành ổn định sau khi trỏ tên miền về Public IP khiến nhóm lầm tưởng thiết kế đã hoàn thiện. Nhưng trên thực tế, kiến trúc này tiềm ẩn rủi ro rất lớn về an toàn thông tin: hoàn toàn không có cơ chế cách ly bảo mật giữa các phân lớp, và nếu tầng cơ sở dữ liệu gặp sự cố, toàn bộ ứng dụng sẽ lập tức ngừng hoạt động (Single Point of Failure).

---

## II. BƯỚC NGOẶT THAY ĐỔI TƯ DUY (THE TURNING POINT)

Khi bắt đầu dịch chuyển hệ thống lên AWS, việc áp dụng một cách máy móc "kiến trúc 3 lớp (3-Tier)" theo lý thuyết sách vở đã khiến nhóm vấp phải nhiều điểm hạn chế lớn:

* **Chi phí hạ tầng không tối ưu:** Việc đặt cụm máy chủ xử lý ECS Fargate vào Private Subnet theo đúng lý thuyết bảo mật đã buộc hệ thống phải duy trì một NAT Gateway để container có đường ra Internet kéo Docker Image. Kết quả là NAT Gateway phát sinh chi phí cố định ~$35/tháng, chiếm hơn 1/3 tổng ngân sách dự án dù lượng lượng truy cập thử nghiệm chưa cao.
* **Lỗi định tuyến của ứng dụng SPA:** Khi triển khai Frontend lên dịch vụ S3 Static Website Hosting, nếu người dùng thực hiện tải lại trang (Refresh) tại các đường dẫn phụ (ví dụ: `/profile`), trình duyệt sẽ lập tức trả về lỗi `HTTP 404 Not Found` do S3 không tự hiểu được cơ chế định tuyến client-side.
* **Nút thắt cổ chai về hiệu năng:** Quá trình kiểm thử chịu tải (Load Testing) bằng công cụ K6 với kịch bản giả lập 500 người dùng đồng thời đã đẩy mức chiếm dụng CPU của container Fargate (cấu hình 0.5 vCPU) chạm ngưỡng 100%. Hệ thống bị nghẽn hoàn toàn ở khâu giải mã chữ ký JWT Token, trong khi lớp cơ sở dữ liệu bên dưới vẫn chưa bị ảnh hưởng.

Từ những thách thức trên, nhóm nhận ra hệ thống cần một kiến trúc phân tách rõ ràng và có sự chuyên môn hóa sâu sắc hơn ở từng bộ phận.

---

## III. GIẢI PHÁP VÀ KIẾN THỨC CỐT LÕI: TỐI ƯU HÓA KIẾN TRÚC CLOUD NATIVE

Thay vì tiếp tục chắp vá các lỗi nhỏ lẻ, nhóm quyết định tái cấu trúc toàn diện hệ thống bám sát mô hình Cloud Native. Dưới đây là cách từng vai trò chuyên môn trong nhóm giải quyết các bài toán cụ thể:

### 1. Bộ phận Hạ tầng (Cloud/Ops) – Tối ưu chi phí và hiệu năng mạng
* **Khó khăn:** Chi phí duy trì NAT Gateway quá lớn và CPU container bị quá tải khi xử lý khối lượng lớn thao tác xác thực mật mã.
* **Giải pháp:** Nhóm đã cấu hình lại cụm ECS Fargate, chuyển sang Public Subnets (kích hoạt thuộc tính `AssignPublicIp: ENABLED`) để loại bỏ hoàn toàn NAT Gateway, tiết kiệm $35/tháng. Để đảm bảo nguyên tắc an ninh *Zero-Trust*, cụm Fargate được thiết lập Security Group nghiêm ngặt: chỉ tiếp nhận duy nhất lưu lượng được chuyển tiếp từ Application Load Balancer (ALB). 
* Trong khi đó, cơ sở dữ liệu Amazon RDS vẫn được cô lập hoàn toàn tại Private Subnet. Để quản trị dữ liệu an toàn, nhóm dựng một máy ảo EC2 `t2.micro` thuộc cấu hình Free Tier làm Bastion Host tại Public Subnet. Đồng thời, nhóm sử dụng Amazon EventBridge để lập lịch tự động tắt Database và hạ số lượng container ECS về 0 vào lúc 23:00, tự động bật lại vào 7:00 sáng hôm sau, đưa chi phí nhàn rỗi về mức $0.

### 2. Bộ phận Frontend (UI/UX) – Xử lý định tuyến và Tích hợp CDN
* **Khó khăn:** Lỗi 404 khi tải lại trang trên S3 và cấu hình S3 thuần không hỗ trợ chứng chỉ bảo mật HTTPS cũng như bị giới hạn về tốc độ phân phối địa lý.
* **Giải pháp:** Nhóm đã cấu hình thuộc tính *Error Document* trên S3 trỏ ngược về `index.html`, bàn giao lại quyền điều hướng hoàn toàn cho thư viện React Router xử lý. Để tối ưu tốc độ tải trang và áp dụng chứng chỉ SSL/TLS, mạng lưới phân phối nội dung (CDN) Amazon CloudFront được tích hợp ở tuyến đầu làm lớp đệm. Toàn bộ quy trình đóng gói Frontend sau đó được tự động hóa bằng máy chủ Jenkins CI/CD (chạy trên EC2), tự động kéo mã nguồn từ GitHub khi có thay đổi để cập nhật lên S3 một cách nhanh chóng.

### 3. Bộ phận Giám sát (Observability) – Quản lý cảnh báo chủ động
* **Khó khăn:** Hệ thống cần một cơ chế tự động theo dõi, tránh việc rà soát thủ công nhưng phải giải quyết được bài toán nhiễu loạn cảnh báo (Email Storm) khi bị tấn công.
* **Giải pháp:** Sau khi cấy OpenTelemetry (OTLP) vào mã nguồn Spring Boot để đẩy dữ liệu về AWS CloudWatch và Grafana, nhóm thiết lập các *Metric Filters* trên CloudWatch để rà soát log ứng dụng theo điều kiện `{$.type = "SECURITY"}`. Hệ thống chỉ kích hoạt *CloudWatch Alarm* khi phát hiện hành vi rà quét lỗ hổng (SQL Injection, XSS) vượt ngưỡng 1 hành vi/phút. Tính năng *Alert Grouping* trên Grafana cũng được cấu hình để gom các cảnh báo đơn lẻ thành một thông báo tổng hợp trước khi đẩy qua Amazon SNS, giúp nhóm phản ứng nhanh mà không vượt quá hạn mức 1.000 email miễn phí của AWS.

### 4. Bộ phận An toàn thông tin (DevSecOps) – Bảo mật từ giai đoạn thiết kế
* **Khó khăn:** Công cụ OWASP ZAP trả về nhiều cảnh báo giả (False Positives), mã nguồn còn lưu plaintext credential và container bị sập (crash) khi chuyển sang dùng biến môi trường.
* **Giải pháp:** Áp dụng phương pháp *Shift-left Security*, nhóm gỡ bỏ toàn bộ thông tin nhạy cảm khỏi mã nguồn và đưa vào quản lý tập trung tại AWS Systems Manager (SSM) Parameter Store. Lỗi sập container được xử lý triệt để bằng việc bổ sung quyền `ssm:GetParameters` vào IAM Role thực thi của ECS Task. Tại biên mạng, tường lửa AWS WAF được triển khai song song ở hai phân lớp: bảo vệ giao diện tĩnh trên CloudFront và bảo vệ luồng API động trên ALB. Kết hợp với nền tảng phân tích mã tĩnh SonarCloud, các lỗ hổng bảo mật được phát hiện sớm và sửa đổi ngay từ khâu viết code.

---

## IV. TỔNG KẾT VÀ ĐỊNH HƯỚNG GIAI ĐOẠN TIẾP THEO

Quá trình đưa dự án "Mini Social Network" lên môi trường điện toán đám mây đã giúp nhóm thấu hiểu sâu sắc bài toán cân bằng giữa tối ưu hóa chi phí hạ tầng, khả năng vận hành tự động và trải nghiệm an toàn của người dùng cuối.

Tuy nhiên, mô hình kiến trúc này vẫn đang tiếp tục được cải tiến. Để hệ thống đạt tiêu chuẩn vận hành an toàn nhất, dự án đang bước vào giai đoạn đóng băng mã nguồn và kiểm toán an ninh (**Code Freeze & Security Audit**). Toàn bộ cấu hình hạ tầng sẽ trải qua một đợt rà soát tổng thể trước khi nhóm chính thức chốt phương án kiến trúc cuối cùng.

---

## V. MINH HỌA SƠ ĐỒ KIẾN TRÚC HỆ THỐNG

Cấu trúc hệ thống đã có sự chuyển dịch rõ rệt sau khi nhóm áp dụng các giải pháp thực chiến để tối ưu hóa chi phí và tăng cường bảo mật:

#### 1. Sơ đồ kiến trúc triển khai ban đầu
![Sơ đồ kiến trúc triển khai ban đầu](/images/3-BlogsPosted/Architecture_Diagram_V1.png)

#### 2. Sơ đồ kiến trúc sau khi tối ưu hóa chi phí và xử lý lỗ hổng
![Sơ đồ kiến trúc sau khi tối ưu hóa chi phí](/images/3-BlogsPosted/Minisocial-Architect_Cost.png)

### VI. KẾT QUẢ VÀ BÀI HỌC RÚT RA TỪ PHẢN BIỆN CỘNG ĐỒNG

Bài viết sau khi chia sẻ đã nhận được sự thảo luận sôi nổi và nhiều phản biện đa chiều từ các kỹ sư hệ thống trong cộng đồng AWS Study Group VN. Những đóng góp thực chiến này giúp nhóm nhận diện rõ các điểm mù trong thiết kế hạ tầng hiện tại và đúc kết được 4 bài học lớn cho các giai đoạn tối ưu tiếp theo:

**1. Đánh đổi giữa Rủi ro bảo mật mạng và Bài toán chi phí NAT Gateway**
* **Lỗ hổng của kiến trúc hiện tại:** Để loại bỏ chi phí cố định ~$35/tháng của NAT Gateway, nhóm đã chuyển cụm ECS Fargate từ Private Subnet sang Public Subnet (bật `AssignPublicIp`). Cộng đồng chỉ ra rằng đây là một rủi ro bảo mật rất lớn. Nếu Security Group bị chỉnh sửa nhầm lẫn, toàn bộ cụm Backend sẽ bị phơi nhiễm ra Internet. Hơn nữa, quy định tuân thủ (Compliance) ở nhiều ngành đặc thù bắt buộc các tài nguyên cốt lõi (Backend, Database) phải nằm cô lập trong Private Subnet. Lưu lượng giữa Public và Private Subnet bản chất là Local (không tính phí), hệ thống chỉ bị tính phí NAT khi ECS kết nối ra Internet để thực hiện các tác vụ bên ngoài.
* **Giải pháp khắc phục:** Để đưa ECS Fargate trở lại Private Subnet an toàn mà vẫn tối ưu chi phí, cộng đồng đề xuất hai phương án:
    * Thay vì dùng NAT Gateway, triển khai hệ thống **VPC Endpoints (cho S3, ECR, CloudWatch)**. Giải pháp này giúp ECS pull image và đẩy log hoàn toàn qua mạng nội bộ AWS, chi phí rẻ hơn NAT Gateway rất nhiều.
    * Sử dụng một **NAT Instance** tự host với cấu hình siêu nhỏ (`t3.nano` / `t4g.nano`), chỉ kích hoạt khi thực sự cần kết nối ra ngoài Internet để kéo tài nguyên.

**2. Tối ưu hóa mô hình Tường lửa (WAF) và Tư duy Cảnh báo sớm (Observability)**
* **Về cấu trúc tường lửa:** Kiến trúc hiện tại của nhóm đang dùng song song 2 AWS WAF (một cho CloudFront và một cho ALB) là dư thừa và gây lãng phí chi phí cố định (WebACL pricing). Mô hình chuẩn hóa được khuyến nghị là chỉ cần **1 WAF duy nhất gắn tại CloudFront** ở biên mạng. Luồng đi tiêu chuẩn sẽ là: `User -> CloudFront (WAF) -> VPC Origin -> Private ALB -> ECS`. CloudFront này cũng sẽ đảm nhiệm việc serve tài nguyên cho S3.
* **Về cơ chế giám sát:** Nhóm đang đặt cảnh báo tấn công dựa trên log ứng dụng (`$.type = "SECURITY"`). Tuy nhiên, nếu log Spring Boot đã ghi nhận mã lỗi bảo mật, điều đó chứng tỏ cuộc tấn công đã vượt qua tường lửa và đi sâu vào mã nguồn xử lý. Để đạt được mục tiêu cảnh báo sớm đúng nghĩa, hệ thống cần cấu hình **CloudWatch Alarm trực tiếp trên các chỉ số của AWS WAF** tại CloudFront để phát hiện và chặn đứng các hành vi rà quét XSS, SQL Injection ngay từ biên mạng.

**3. Khắc phục nút thắt hiệu năng JWT và Định hướng Serverless**
* **Xử lý Bottleneck:** Đối với hiện tượng container Fargate bị quá tải 100% CPU do khâu giải mã mật mã chữ ký JWT khi kiểm thử với 500 người dùng, giải pháp tối ưu khi hệ thống scale lớn là đẩy toàn bộ khâu xác thực (Authentication) ra một **Lambda Authorizer** độc lập để giảm tải gánh nặng tính toán cho cụm Fargate xử lý business logic.
* **Định hướng Serverless:** Với đặc thù dự án ở giai đoạn đầu có lưu lượng truy cập chưa cao, thay vì duy trì hạ tầng container cố định, việc dịch chuyển sang kiến trúc Serverless thuần bao gồm **AWS Lambda kết hợp Amazon DynamoDB** sẽ là phương án tối ưu chi phí triệt để nhất (tiệm cận mức $0 nhờ cơ chế Pay-as-you-go).

**4. Chuẩn hóa luồng CI/CD Cloud-Native và Bảo mật OIDC**
* **Hạn chế của Jenkins:** Việc tự duy trì máy chủ Jenkins trên EC2 tạo thêm gánh nặng bảo trì hệ điều hành, cấu hình và tiềm ẩn nguy cơ bảo mật nếu server không được cập nhật các bản vá thường xuyên.
* **Giải pháp thay thế:** Nhóm cần loại bỏ Jenkins và chuyển dịch hoàn toàn sang **GitHub Actions** (nếu lưu mã nguồn trên GitHub) hoặc hệ sinh thái native **AWS CodePipeline + AWS CodeBuild** (nếu lưu mã nguồn trên AWS CodeCommit). Đặc biệt, khi sử dụng GitHub Actions, nhóm sẽ áp dụng cơ chế xác thực **OIDC (OpenID Connect)** để thiết lập quyền truy cập trực tiếp với AWS mà không cần phải lưu trữ các khóa bảo mật dài hạn (AWS Credentials) trên repository, đảm bảo luồng CI/CD khép kín và an toàn tuyệt đối.

> **Tài liệu và liên kết tham khảo:**
> * Sơ đồ kiến trúc gốc (Bản sơ khai): [Xem chi tiết tại đây](https://mini-social-architect.s3.ap-southeast-1.amazonaws.com/MiniSocial-Architect.png)
> * Sơ đồ kiến trúc tinh chỉnh (Bản tối ưu): [Xem chi tiết tại đây](https://mini-social-architect.s3.ap-southeast-1.amazonaws.com/MiniSocial-Architect-ToiUuChiPhi.png)
> * Bài viết gốc trên cộng đồng AWS Study Group VN: [Truy cập bài đăng tại đây](https://www.facebook.com/groups/awsstudygroupfcj/permalink/2198727654225528)