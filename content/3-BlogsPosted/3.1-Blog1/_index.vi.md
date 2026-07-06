---
title: "Blog 1: Thảo luận Kiến trúc Đồ án Mini Social Network"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 3.1. </b> "
---

> **Ngữ cảnh:** Bài viết dưới đây được nhóm đúc kết trong quá trình làm đồ án và đăng tải công khai trên cộng đồng **AWS Study Group VN**. Mục tiêu của bài viết nhằm chia sẻ giải pháp kiến trúc của đồ án "Mini Social Network", đồng thời thu thập các phản biện và ý kiến đóng góp từ các kỹ sư/chuyên gia đi trước để tối ưu hóa hệ thống cho giai đoạn Production.

---

# Ứng dụng mô hình 3-Tier Architecture trên nền tảng AWS

Nhóm hiện đang trong giai đoạn hoàn thiện đồ án xây dựng hệ thống Mạng xã hội nội bộ mang tên "Mini Social Network". Vận dụng những kiến thức thực hành và tư duy thiết kế từ chương trình AWS FCAJ, nhóm đã quyết định quy hoạch và triển khai toàn bộ hạ tầng dự án lên môi trường AWS Cloud theo chuẩn **mô hình 3-Tier Architecture (Kiến trúc 3 lớp)** nhằm đảm bảo tính cô lập và bảo mật tối đa cho dữ liệu.

Để chuẩn hóa tài liệu theo phong cách AWS Whitepaper, sơ đồ kiến trúc logic được bao bọc trong ranh giới AWS Region nhằm thể hiện cấu trúc mạng một cách chặt chẽ nhất. Hệ thống được phân tách rạch ròi thành hai luồng chính:

* **Data Plane (Luồng truy cập & Dữ liệu khách hàng):** Định tuyến tuần tự từ `[1]` đến `[7]`.
* **Control Plane (Luồng Vận hành & Giám sát hệ thống):** Đánh dấu bằng chữ cái `[A]` đến `[E]`.

Dưới đây là diễn giải chi tiết về cơ chế vận hành của hệ thống:

---

## I. DATA PLANE: PHÂN HỆ TRUY CẬP NGƯỜI DÙNG & XỬ LÝ DỮ LIỆU

### 1. Lớp Biên & Tiếp nhận Yêu cầu (Edge & User Access)
* **[1] Load Web App:** Giao diện Frontend (React + Vite) được đóng gói và lưu trữ tĩnh hoàn toàn trên Amazon S3 (Static Website). Trình duyệt của người dùng sẽ tải trực tiếp tài nguyên giao diện từ đây, giúp tối ưu hóa chi phí và giảm tải tuyệt đối cho hạ tầng xử lý phía sau.
* **[2] API Requests:** Khi người dùng tương tác (đăng bài, bình luận, thả tim), các API request từ client sẽ được gửi qua Internet Gateway (IGW) để tiến vào môi trường mạng ảo riêng biệt (VPC).

### 2. Lớp Mạng Công cộng & Kiểm soát An ninh (Public Subnet)
* **[3] Filter Malicious Traffic:** Lưu lượng từ Internet Gateway bắt buộc phải đi qua AWS WAF (Web Application Firewall) để sàng lọc. Tại đây, hệ thống áp dụng các bộ quy tắc (Ruleset) nhằm chặn đứng các hình thức tấn công phổ biến như SQL Injection, Cross-Site Scripting (XSS) hoặc spam request.
* **[4] Route Traffic:** Các traffic sạch và hợp lệ sau đó sẽ được chuyển tiếp đến Application Load Balancer (ALB) để làm nhiệm vụ điều phối tải.

### 3. Lớp Mạng Cách ly & Xử lý Lõi (Private Subnet)
* **[5] Process Backend Logic:** ALB sẽ phân phối các request một cách cân bằng xuống cụm Amazon ECS Cluster. Đây là nơi chạy các Docker container chứa toàn bộ logic xử lý ứng dụng của mạng xã hội, được đặt cách ly hoàn toàn trong lớp mạng *Private Subnet - Compute* để ngăn chặn mọi nguy cơ tiếp cận trái phép trực tiếp từ Internet.
* **[6] Read / Write Data:** Khi cần truy vấn hoặc ghi nhận thông tin người dùng, cụm ECS sẽ giao tiếp với cơ sở dữ liệu Amazon RDS. Lớp DB này được giấu ở tầng bảo mật sâu nhất là *Private Subnet - Data*.
* **[7] Upload Media Files:** Đối với các tài nguyên nặng như hình ảnh, video do người dùng tải lên, cụm ECS định tuyến và đẩy thẳng ra một bucket Amazon S3 (Media Storage) độc lập để lưu trữ, tránh gây gánh nặng dung lượng và băng thông cho cơ sở dữ liệu chính.

---

## II. CONTROL PLANE: PHÂN HỆ VẬN HÀNH, CI/CD & GIÁM SÁT NGẦM

Đây là xương sống hạ tầng phục vụ cho công tác quản trị và tự động hóa, chạy hoàn toàn độc lập với trải nghiệm của người dùng cuối:

* **[A] Outbound Traffic:** Để các máy chủ container trong Private Subnet (vốn không có IP công cộng) có thể an toàn đi ra Internet thực hiện tác vụ, một NAT Gateway được triển khai tại Public Subnet. Từ đây, lưu lượng tiếp tục được định tuyến xuyên qua Internet Gateway (IGW) ra ngoài. Đây là luồng giao thông một chiều giúp hệ thống nội bộ an toàn giao tiếp ra bên ngoài (như kéo Image từ ECR hay đẩy log lên CloudWatch) mà không bị lộ danh tính hay địa chỉ IP thực.
* **[B] Push Logs & Metrics:** Thông qua NAT Gateway, cụm ECS liên tục thu thập và đẩy các dữ liệu nhật ký hệ thống về Amazon CloudWatch.
* **[C] Visualize Dashboard:** Grafana Cloud được thiết lập để kết nối trực tiếp vào Amazon CloudWatch làm nguồn dữ liệu (Data Source), trực quan hóa sức khỏe hạ tầng, tài nguyên CPU/RAM thông qua các biểu đồ giám sát real-time.
* **[D] Build & Push Image:** Luồng CI/CD bắt đầu từ Jenkins Server (đảm nhiệm vai trò tự động hóa kiểm thử, build mã nguồn backend thành các Docker image mới) và tiến hành push lên kho lưu trữ Amazon ECR.
* **[E] Pull Image & Deploy:** Cụm ECS sử dụng đường dẫn Outbound để tự động kéo (pull) các bản cập nhật Image mới nhất từ ECR về và thực hiện cơ chế cập nhật liên tục (Rolling Update), đảm bảo hệ thống không bị gián đoạn (Zero-Downtime).

---

## III. ĐỊNH HƯỚNG TỐI ƯU VÀ CÂU HỎI THẢO LUẬN

Mặc dù trên sơ đồ ranh giới AWS Region được đóng khung chuẩn chỉ để quy hoạch toàn cục, nhưng cấu trúc các Subnet bên trong VPC đang được vẽ rút gọn (gộp thành một cột) để tối ưu tính trực quan. Thực tế triển khai qua CloudFormation (IaC), hệ thống vận hành trên kiến trúc **Đa vùng sẵn sàng (Multi-AZ)** – chia đều Public/Private Subnets ra 2 Availability Zones để đảm bảo tính chịu lỗi cao (Reliability), kết hợp cấu hình chặt chẽ lớp tường lửa Security Groups.

Để nâng cấp hệ thống từ mức PoC (Proof of Concept) lên tiêu chuẩn Vận hành thực tế (Production-ready), nhóm đã vạch ra lộ trình tối ưu (Phase 2) và đặt ra các vấn đề thảo luận cùng cộng đồng:

1. **Nâng cấp hiệu năng Frontend (CloudFront):** Việc truy cập trực tiếp S3 Static Website tạo điểm nghẽn tốc độ tải trang và thiếu bảo mật SSL/TLS. Kế hoạch tiếp theo là sử dụng Amazon CloudFront (CDN). *Vấn đề đặt ra: Khi tích hợp `CloudFront + WAF + S3`, cần lưu ý gì về chi phí ẩn hoặc bài toán cache invalidation khi deploy code Frontend liên tục?*
2. **Bài toán đánh đổi - NAT Gateway vs VPC Endpoints:** Cụm ECS hiện dùng NAT Gateway để gọi các dịch vụ AWS (S3, ECR, CloudWatch). Nhóm dự định chuyển sang VPC Endpoints (Gateway/Interface) để tối ưu chi phí Data Transfer và tăng bảo mật nội bộ. *Vấn đề đặt ra: Với quy mô dự án nhỏ/vừa, điểm hòa vốn (break-even) thực tế giữa phí duy trì Interface Endpoint và phí Data Transfer của NAT Gateway nằm ở mức lưu lượng nào?*
3. **Dịch chuyển luồng CI/CD lên Cloud-Native:** Hiện tại hệ thống tự host Jenkins Server trên EC2. Về dài hạn, để cắt giảm gánh nặng bảo trì và tối ưu chi phí (Pay-as-you-go), nhóm dự định migrate pipeline sang GitHub Actions hoặc AWS CodePipeline. *Vấn đề đặt ra: Đâu là giải pháp CI/CD tối ưu nhất cho hệ thống container hóa trên ECS dựa trên thực tiễn?*

### IV. KẾT QUẢ VÀ BÀI HỌC RÚT RA TỪ PHẢN BIỆN CỘNG ĐỒNG

Dù bài viết thiên về chuyên môn sâu và hệ thống đặc thù, nhóm đã may mắn nhận được một phản biện cực kỳ chi tiết và sát thực tế từ kỹ sư đi trước trong cộng đồng AWS. Qua đó, nhóm đã rút ra được 4 bài học lớn để tinh chỉnh lại bản thiết kế kiến trúc:

**1. Tinh chỉnh tư duy thiết kế AWS WAF**
* **Vấn đề của sơ đồ gốc:** Sơ đồ hiện tại đang đặt WAF như một *inline service* (dịch vụ nội tuyến) nằm trong Public Subnet, đứng chặn trước ALB. Điều này dễ gây hiểu lầm về mặt bản chất mạng.
* **Bài học thực tế:** WAF bản chất là một *layer inspection* (lớp kiểm tra) được gắn (attach) trực tiếp vào ALB hoặc CloudFront, chứ không phải một trạm kiểm soát độc lập trong mạng. Nhóm ghi nhận lỗi này và sẽ điều chỉnh lại sơ đồ để thể hiện WAF là một component đi liền với ALB.

**2. Tính "bắt buộc" của CloudFront & Bài toán Cache**
* **Vấn đề:** Ban đầu, nhóm xem việc dùng CloudFront là một phương án nâng cấp tự chọn (Optional).
* **Bài học thực tế:** Đây là yêu cầu **bắt buộc**. Vì S3 Static Web Hosting không hỗ trợ custom SSL, nếu giao diện gọi API Backend qua ALB bằng HTTP, trình duyệt sẽ chặn giao tiếp này ngay lập tức (lỗi Mixed-Content). Combo tiêu chuẩn cho các dự án thực tế luôn là `Route53 + CloudFront + S3`.
* **Giải quyết bài toán Cache:** Để tránh việc user truy cập vào UI cũ, thay vì đau đầu với phí gọi lệnh *cache invalidation*, giải pháp tối ưu là áp dụng *cache-bursting*: cấu hình CI/CD tự động thêm chuỗi hash vào tên file tĩnh sau mỗi lần build. 

**3. Lời giải cho bài toán NAT Gateway vs VPC Endpoints**
* **Bài học thực tế:** Vì Amazon ECR và S3 là các dịch vụ Native của AWS, lời khuyên thực chiến từ cộng đồng là **ưu tiên tuyệt đối việc sử dụng VPC Endpoints**. Việc này giữ luồng dữ liệu hoàn toàn trong mạng nội bộ AWS, giúp tối ưu hóa triệt để chi phí Data Transfer qua NAT Gateway.

**4. Lựa chọn công cụ CI/CD Cloud-Native**
* **Bài học thực tế:** Không có công cụ nào tuyệt đối tốt nhất, mà phụ thuộc vào nơi đặt source code:
    * Nếu lưu code tại **GitHub**: Việc dùng **GitHub Actions** kết hợp ECR và ECS Deploy là luồng mượt mà và phổ biến nhất.
    * Nếu lưu code tại **AWS CodeCommit**: Giải pháp tốt nhất là hệ sinh thái native **AWS CodePipeline** kết hợp CodeBuild.
* **Định hướng:** Nhóm quyết định sẽ dịch chuyển từ Jenkins sang cấu hình triển khai qua GitHub Actions trong Phase 2 để tiết kiệm chi phí EC2.

---
![Sơ đồ Kiến trúc Mini Social Network](/images/3-BlogsPosted/Architecture_Diagram_V1.png)

> **Tài liệu tham khảo:**
> * Sơ đồ Kiến trúc Logic (Bản Full HD): [Xem chi tiết tại đây](https://mini-social-architect.s3.ap-southeast-1.amazonaws.com/MiniSocial-Architect.png)
> * Link bài thảo luận gốc trên AWS Study Group VN: [Xem bài viết gốc](https://www.facebook.com/share/p/1TAE4d29vc/)