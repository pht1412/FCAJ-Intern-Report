---
title: "Worklog Tuần 12"
date: 2026-07-06
weight: 12
chapter: false
pre: " <b> 1.12. </b> "
---

Báo cáo tuần này tập trung vào hai đầu việc chính: xây dựng báo cáo kiểm thử phần mềm sử dụng JaCoCo để đo lường độ phủ mã nguồn (Code Coverage), và tổng hợp toàn bộ nội dung đã thực hiện từ các tuần trước để xây dựng bản Internal Report hoàn chỉnh trên nền tảng Hugo.

### Mục tiêu Tuần 12:
- Xây dựng **báo cáo kiểm thử phần mềm** bằng JaCoCo, bao gồm hướng dẫn tích hợp plugin và trình bày kết quả kiểm thử ở hai tầng: API Controller (MockMvc) và Service (Mockito).
- **Tổng hợp toàn bộ nội dung** đã thực hiện qua các tuần để xây dựng Internal Report hoàn chỉnh trên Hugo.

### Các công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Ngày 1-3 | - Báo cáo kiểm thử phần mềm bằng JaCoCo <br>&emsp;+ Trình bày cách thêm plugin JaCoCo vào dự án Maven/Gradle.<br>&emsp;+ Cấu hình JaCoCo để sinh báo cáo độ phủ mã nguồn (Code Coverage Report).<br>&emsp;+ Kiểm thử tầng API Controller bằng MockMvc.<br>&emsp;+ Kiểm thử tầng Service bằng Mockito.<br>&emsp;+ Phân tích kết quả báo cáo JaCoCo (Line Coverage, Branch Coverage). | 06/07/2026 | 08/07/2026 | [JaCoCo Documentation](https://www.jacoco.org/jacoco/trunk/doc/) |
| Ngày 4-7 | - Tổng hợp nội dung xây dựng Internal Report trên Hugo <br>&emsp;+ Rà soát và tổng hợp toàn bộ nội dung worklog từ Tuần 1 đến Tuần 11.<br>&emsp;+ Cấu trúc lại nội dung theo format chuẩn của Hugo.<br>&emsp;+ Bổ sung hình ảnh minh chứng, code snippet và sơ đồ kiến trúc.<br>&emsp;+ Kiểm tra và đảm bảo tính nhất quán giữa phiên bản tiếng Việt và tiếng Anh. | 09/07/2026 | 12/07/2026 | [Hugo Documentation](https://gohugo.io/documentation/) |

### Thành tựu Tuần 12:
- Hoàn thành báo cáo kiểm thử phần mềm với JaCoCo, thể hiện rõ quy trình tích hợp plugin và kết quả đo lường Code Coverage cho dự án.
- Nắm vững phương pháp kiểm thử hai tầng:
  - **Tầng API Controller (MockMvc):** Kiểm thử các endpoint REST API mà không cần khởi động toàn bộ server, xác thực HTTP status code, response body và request validation.
  - **Tầng Service (Mockito):** Kiểm thử logic nghiệp vụ một cách độc lập bằng cách giả lập (mock) các dependency như Repository, giúp đảm bảo tính đúng đắn của từng đơn vị xử lý.
- Tổng hợp thành công toàn bộ nội dung từ các tuần trước thành một bản Internal Report hoàn chỉnh, có cấu trúc rõ ràng và được triển khai trên Hugo.

### Minh chứng thực hiện:

#### 1. Tích hợp Plugin JaCoCo
Để sử dụng JaCoCo trong dự án, cần thêm plugin vào file cấu hình build. Dưới đây là cách cấu hình cho **Maven** (`pom.xml`):
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.jacoco</groupId>
            <artifactId>jacoco-maven-plugin</artifactId>
            <version>0.8.12</version>
            <executions>
                <execution>
                    <goals>
                        <goal>prepare-agent</goal>
                    </goals>
                </execution>
                <execution>
                    <id>report</id>
                    <phase>test</phase>
                    <goals>
                        <goal>report</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

Sau khi thêm plugin, chạy lệnh sau để thực thi kiểm thử và sinh báo cáo:
```bash
mvn clean test
```
Báo cáo JaCoCo sẽ được sinh tại đường dẫn: `target/site/jacoco/index.html`.

Đối với **Gradle** (`build.gradle`):
```groovy
plugins {
    id 'jacoco'
}

jacoco {
    toolVersion = "0.8.12"
}

test {
    finalizedBy jacocoTestReport
}

jacocoTestReport {
    dependsOn test
    reports {
        xml.required = true
        html.required = true
    }
}
```

#### 2. Kiểm thử tầng API Controller (MockMvc)
Sử dụng **MockMvc** để kiểm thử các REST API endpoint mà không cần khởi động toàn bộ ứng dụng Spring Boot. MockMvc cho phép gửi các HTTP request giả lập và xác thực response trả về bao gồm status code, response body và các header.

Chiến lược kiểm thử tầng Controller:
- Xác thực HTTP status code cho các trường hợp thành công và thất bại.
- Kiểm tra cấu trúc và nội dung response body (JSON).
- Kiểm thử request validation (dữ liệu đầu vào không hợp lệ).
- Xác thực xử lý exception và error response.

#### 3. Kiểm thử tầng Service (Mockito)
Sử dụng **Mockito** để kiểm thử logic nghiệp vụ ở tầng Service một cách độc lập. Mockito cho phép giả lập (mock) các dependency như Repository, External Service, giúp kiểm thử từng đơn vị xử lý mà không phụ thuộc vào cơ sở dữ liệu hay dịch vụ bên ngoài.

Chiến lược kiểm thử tầng Service:
- Giả lập các dependency bằng `@Mock` và `@InjectMocks`.
- Kiểm thử happy path và edge case cho từng phương thức.
- Xác thực tương tác giữa Service và Repository bằng `verify()`.
- Kiểm thử xử lý exception khi dependency trả về lỗi.

#### 4. Kết quả báo cáo JaCoCo
Sau khi chạy toàn bộ bài kiểm thử ở cả hai tầng, JaCoCo sinh ra báo cáo trực quan thể hiện:
- **Line Coverage:** Tỷ lệ phần trăm số dòng mã nguồn đã được thực thi bởi các bài kiểm thử.
- **Branch Coverage:** Tỷ lệ phần trăm các nhánh điều kiện (if/else, switch) đã được kiểm thử.
- **Method Coverage:** Tỷ lệ phần trăm các phương thức đã được gọi trong quá trình kiểm thử.

![JaCoCo Code Coverage](/images/1-Worklog/Week12/Project_JaCoCo_Coverage_W12.png)

#### 5. Tổng hợp nội dung Internal Report trên Hugo
Hoàn thành việc tổng hợp và cấu trúc lại toàn bộ nội dung báo cáo từ Tuần 1 đến Tuần 11, bao gồm:
- Worklog chi tiết theo từng tuần.
- Workshop documentation với kiến trúc hệ thống và các phase triển khai.
- Hình ảnh minh chứng và code snippet.
- Đảm bảo tính nhất quán giữa phiên bản tiếng Việt và tiếng Anh.

