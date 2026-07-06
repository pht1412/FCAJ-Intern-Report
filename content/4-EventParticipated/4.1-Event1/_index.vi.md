---
title: "Event 1"
date: 2026-05-23
weight: 1
chapter: false
pre: " <b> 4.1. </b> "
---

# Bài thu hoạch sự kiện “FCAJ Community Day MAY 2026”

![FCAJ Community Day Poster](/images/4-EventParticipated/Evt_1.jpg)


### Mục Đích Của Sự Kiện

- Chia sẻ các xu hướng công nghệ mới nhất về Cloud và Generative AI.
- Giới thiệu các công cụ và hệ sinh thái hỗ trợ quản trị dữ liệu (Amazon Quick) và mạng lưới phân phối (CloudFront).
- Mang đến góc nhìn thực chiến từ các dự án Hackathon (phát triển sản phẩm dưới áp lực cao).
- Đi sâu vào cơ chế hoạt động của các hệ thống AI cấp doanh nghiệp (Enterprise-Grade Multi-Agent System) và các tham số kỹ thuật của LLM.

### Danh Sách Diễn Giả

- **Tinh Truong** - Platform Engineer, GoTymeX
- **Anh Pham** - Cloud Consultant, G-ASIAPACIFIC Vietnam
- **Thinh Nguyen** - DevOps Engineer, FCAJ
- **Thao Nguyen, Mai Nguyen, Uyen Le** - GenAI Engineers, Team VIB
- **Duc Dao** - Solutions Architect, Cloud Kinetics
- **Vy Lam** - Senior Business Systems Analyst, VPBank

### Nội Dung Nổi Bật

#### Context Is Everything: Making AI Actually Work for You
- **Nguyên nhân thất bại của AI:** Phân tích lý do các dự án AI thất bại nếu thiếu đi ngữ cảnh (Context) phù hợp.
- **Sự tiến hóa của AI:** Sự dịch chuyển từ việc chỉ viết prompts sang quản lý bộ nhớ (khái niệm Second AI Brain).
- **Thực tiễn:** Các bí kíp và tư duy ứng dụng context để tạo ra kết quả AI tốt hơn.

#### Friendly AI Assistant with Amazon Quick
- **Quick Chat Agent:** Trợ lý AI hỗ trợ phân tích dữ liệu và trích xuất insights.
- **Quick Flows:** Xây dựng luồng công việc tự động bằng ngôn ngữ tự nhiên, không yêu cầu viết code.
- **Quick Spaces & Quick Sight:** Không gian làm việc nhóm chia sẻ insights và tạo dashboard/báo cáo từ dữ liệu thô.

#### From Edge To Origin: CloudFront as Your Foundation
- **Nền tảng hạ tầng:** Sử dụng Amazon CloudFront cho mọi loại workload.
- **Tối ưu hóa (Optimization):** Cắt giảm chi phí và nâng cao hiệu suất truyền tải nội dung.
- **Độ tin cậy & Bảo mật:** Tăng cường khả năng chống chịu lỗi (Enhanced reliability) và bảo vệ hệ thống từ biên mạng.

#### 36 hrs with LotusHacks – Building UTMorpho from Idea to Reality
- **Quá trình Brainstorming:** Từ con số không đến việc định nghĩa chính xác bài toán.
- **Phát triển dưới áp lực:** Quá trình lập trình liên tục trong vòng 36 giờ (36-Hour Development Sprint).
- **Bài học thực chiến:** Phân tích những khó khăn, thất bại, các bước ngoặt (Turning Points) và demo sản phẩm cuối cùng.

#### Non-Determinism of "Deterministic" LLM Settings
- **Cơ chế hoạt động:** Cách các Mô hình ngôn ngữ lớn (LLMs) lựa chọn token tiếp theo.
- **Sự thật về Temperature=0:** Phá vỡ định kiến cho rằng `Temperature=0` sẽ tạo ra tính đồng nhất (determinism) tuyệt đối.
- **Tác động thực tế:** Hiểu rõ cách các thuật toán tối ưu hóa suy luận (inference optimizations) ảnh hưởng đến kết quả và các chiến lược giảm thiểu rủi ro.

#### Enterprise-Grade Multi-Agent System (Case study: Startup Credit Scoring)
- **Bài toán thực tế:** Sự khập khiễng về cấu trúc giữa hệ thống ngân hàng và dữ liệu của Startup.
- **Mô hình tác vụ:** So sánh giữa Single Agent (khi nào nên/không nên dùng) và mô hình Multi-Agent Paradigm.
- **Quy trình doanh nghiệp:** Xây dựng blueprint cho "Ủy ban tín dụng ảo" với các tiêu chuẩn khắt khe về Guardrails, tính tuân thủ (Compliance) và đo lường tỷ suất hoàn vốn (Operational ROI).

---

### Những Gì Học Được

#### Tư Duy Thiết Kế Hạ Tầng & AI
- **Sự quan trọng của Context:** Nhận thức rõ ràng rằng công cụ AI mạnh mẽ đến đâu cũng vô dụng nếu thiếu một cấu trúc ngữ cảnh (Context/Second Brain) được thiết kế tốt.
- **Phân tách tác vụ (Multi-Agent Paradigm):** Hệ thống lớn không nên phụ thuộc vào một AI duy nhất (Single Agent) mà cần chia nhỏ thành các Agent chuyên biệt để kiểm soát "ảo giác" (hallucination) và tăng độ chính xác.

#### Kiến Trúc Kỹ Thuật (Dựa trên 3 trụ cột của Enterprise-Grade)
- **Securely (Bảo mật tuyệt đối):** Mọi luồng giao tiếp dữ liệu phải được rào chắn bởi Guardrails và các chính sách tuân thủ (Compliance), đặc biệt là trong môi trường tài chính.
- **Reliably (Độ tin cậy cao):** Hiểu rõ bản chất không hoàn toàn đồng nhất (non-determinism) của LLM để có cơ chế fallback, đồng thời tận dụng mạng CDN như CloudFront để đảm bảo hệ thống luôn sẵn sàng ở lớp biên (Edge).
- **Scalable (Khả năng mở rộng):** Mọi thành phần từ quy trình xử lý dữ liệu (Amazon Quick) đến hạ tầng mạng phải được thiết kế dạng blueprint để sẵn sàng mở rộng quy mô mà không phá vỡ logic cốt lõi.

---

### Ứng Dụng Vào Công Việc

- **Tối ưu kiến trúc hiện tại:** Đưa Amazon CloudFront vào làm nền tảng phân phối giao diện (Frontend) cho đồ án thực tập để đạt chuẩn "Securely" và "Reliably".
- **Áp dụng tư duy Guardrails:** Khi phát triển các tính năng có ứng dụng AI sau này, luôn xây dựng các lớp xác thực và giới hạn quyền hạn (Compliance) trước khi cho phép AI tương tác với cơ sở dữ liệu.
- **Chuẩn hóa quy trình làm việc:** Học hỏi tinh thần làm việc dưới áp lực cao (Sprint 36 giờ) của team LotusHacks để tăng cường sự tập trung khi chạy các milestone của dự án.
- **Khám phá hệ sinh thái No-Code/Low-Code:** Nghiên cứu thêm về bộ công cụ Amazon Quick để tự động hóa các luồng phân tích log/dữ liệu mà không tốn công viết code.

---

### Trải nghiệm trong event

Tham dự sự kiện **FCAJ Community Day** là một trải nghiệm mở mang tầm mắt, giúp tôi kết nối các kiến thức lý thuyết về Cloud với bức tranh thực tế về cách các tổ chức lớn đang vận hành hệ thống AI và mạng lưới toàn cầu. Một số trải nghiệm nổi bật:

#### Học hỏi từ các chuyên gia đa lĩnh vực
- Các diễn giả đến từ nhiều mảng khác nhau (Platform Engineer, Cloud Consultant, DevOps, GenAI Engineer, Solutions Architect) đã mang đến những góc nhìn đa chiều: từ hạ tầng tầng thấp (CloudFront) đến tư duy tích hợp AI tầng cao (Multi-Agent).
- Đặc biệt ấn tượng với bài chia sẻ của diễn giả Vy Lam (VPBank) vì nó giải quyết một bài toán doanh nghiệp cực kỳ hóc búa bằng sự kết hợp giữa tài chính và công nghệ.

#### Cập nhật kiến thức chuyên sâu
- Lần đầu tiên hiểu rõ bản chất kỹ thuật đằng sau tham số `Temperature=0` của LLM và lý do tại sao nó vẫn có thể sinh ra kết quả sai lệch.
- Tiếp cận hệ sinh thái Amazon Quick, giúp mở ra hướng đi mới trong việc quản trị luồng công việc (workflows) bằng ngôn ngữ tự nhiên.

#### Kết nối và thay đổi tư duy
- Tham dự sự kiện offline tại Bitexco tạo cơ hội kết nối với mạng lưới cộng đồng kỹ sư chất lượng cao.
- Sự kiện giúp tôi thay đổi hoàn toàn mindset: Việc xây dựng một sản phẩm (như UTMorpho) không chỉ là code, mà bắt đầu từ việc hiểu đúng "Context", định nghĩa đúng vấn đề và triển khai một kiến trúc hạ tầng đủ mạnh để nâng đỡ ý tưởng đó.

#### Một số hình ảnh khi tham gia sự kiện

![Sự kiện FCAJ Community Day](/images/4-EventParticipated/2305_evt_w5.jpg)

> Tổng thể, FCAJ Community Day không chỉ mang lại khối lượng kiến thức đồ sộ về GenAI và Cloud, mà còn truyền cảm hứng mạnh mẽ thông qua 3 từ khóa cốt lõi: **Securely, Reliably, Scalable** – đây sẽ là thước đo chuẩn mực cho mọi kiến trúc hệ thống mà tôi thiết kế trong tương lai.