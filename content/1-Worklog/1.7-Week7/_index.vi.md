---
title: "Worklog Tuần 7"
date: 2026-06-07
weight: 7
chapter: false
pre: " <b> 1.7. </b> "
---

Báo cáo tuần này trình bày việc chuyển đổi từ phương pháp cấp phát thủ công (ClickOps) sang tư duy Hạ tầng dưới dạng Mã hóa (IaC). Nhóm đã tự động hóa việc triển khai kiến trúc mạng, bảo mật cơ sở dữ liệu Amazon RDS trong mạng nội bộ, và vận hành hệ thống container backend bằng AWS CloudFormation kết hợp Amazon ECS Fargate.

### Mục tiêu Tuần 7:
- Chuyển đổi hoàn toàn từ phương pháp cấp phát thủ công (ClickOps) sang tư duy Hạ tầng dưới dạng Mã hóa (Infrastructure as Code - IaC).
- Tự động hóa quá trình triển khai cấu trúc mạng bao gồm VPC, Subnets, NAT Gateway và Application Load Balancer.
- Khởi tạo cơ sở dữ liệu quan hệ (Amazon RDS - SQL Server) với cấu hình bảo mật tối đa trong Private Subnet.
- Tự động hóa việc vận hành container backend bằng AWS CloudFormation và Amazon ECS Fargate.

### Các công việc thực hiện trong tuần:
| Ngày | Công việc | Ngày bắt đầu | Ngày hoàn thành | Tài liệu tham khảo |
| --- | --- | --- | --- | --- |
| Ngày 1 | - Tự động hóa Hạ tầng mạng & ALB (IaC) <br>&emsp; + Viết và thực thi kịch bản CloudFormation để dựng VPC, Public/Private Subnets, IGW, NAT Gateway, và ALB. | 01/06/2026 | 01/06/2026 | [AWS CloudFormation Docs](https://cloudjourney.awsstudygroup.com/) |
| Ngày 1 | - Triển khai Database (IaC) <br>&emsp; + Dựng Amazon RDS (SQL Server) hoàn toàn bên trong mạng Private, thiết lập Security Groups kết nối chặt chẽ. | 01/06/2026 | 01/06/2026 | [AWS RDS CloudFormation](https://cloudjourney.awsstudygroup.com/) |
| Ngày 1 | - Vận hành ECS Fargate (IaC) <br>&emsp; + Khởi tạo ECS Cluster và cấu hình Fargate Task Definitions. <br>&emsp; + Ánh xạ (Mapping) dịch vụ backend vào Target Group của ALB. | 01/06/2026 | 01/06/2026 | [AWS ECS Documentation](https://cloudjourney.awsstudygroup.com/) |

### Thành tựu Tuần 7:
- Loại bỏ hoàn toàn rủi ro sai sót do cấu hình thủ công (ClickOps) thông qua việc mã hóa toàn bộ kiến trúc 3 lớp (3-tier) bằng YAML.
- Bảo mật tuyệt đối cho tầng Dữ liệu bằng cách đảm bảo RDS được khởi chạy trong Private Subnet và chặn toàn bộ truy cập từ Internet (`PubliclyAccessible: false`).
- Xây dựng thành công nền tảng hạ tầng vững chắc, có khả năng mở rộng và sẵn sàng cho việc tích hợp tự động hóa (CI/CD) thông qua ECS Fargate.

### Minh chứng thực hiện:

#### 1. Triển khai Hạ tầng thành công qua CloudFormation
Thực thi thành công 3 stack quan trọng (`MiniSocial-Arichtect`, `minisocial-db`, và `minisocial-backend`), đưa toàn bộ hệ thống lên Cloud hoàn toàn bằng mã nguồn.
![CloudFormation Stacks](/images/1-Worklog/Week7/CloudFormation_Project_Infrastructure.png)

#### 2. Mã hóa Hạ tầng mạng & Application Load Balancer (Golden Snippet)
Xây dựng điểm vào (entry point) của mạng lưới, đảm bảo luồng traffic từ Internet được Load Balancer phân bổ an toàn qua các Public Subnet.
```yaml
  ApplicationLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: MiniSocial-ALB
      Scheme: internet-facing
      Subnets:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
      SecurityGroups:
        - !Ref ALBSecurityGroup
```

#### 3. Khởi tạo Database bảo mật cao (Golden Snippet)
Triển khai cơ sở dữ liệu SQL Server Express hoàn toàn vào mạng nội bộ (Private Subnet Group). Cấu hình `PubliclyAccessible: false` giúp hệ thống tránh khỏi mọi rủi ro tấn công từ Internet.
```yaml
  MyRDSInstance:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: minisocial-sqlserver
      Engine: sqlserver-ex          # MS SQL Server Express Edition
      DBInstanceClass: db.t3.small  # Optimized for SQL Server
      DBSubnetGroupName: !Ref MyDBSubnetGroup
      PubliclyAccessible: false     # Isolated in Private Subnet
      MultiAZ: false
```

#### 4. Điều phối Container không máy chủ (Serverless) với Fargate (Golden Snippet)
Cấu hình Task Definition sử dụng AWS Fargate (`NetworkMode: awsvpc`), tự động cấp phát tài nguyên và tiêm (inject) các biến môi trường một cách an toàn mà không cần quản trị máy chủ EC2 vật lý.
```yaml
  BackendTaskDefinition:
    Type: AWS::ECS::TaskDefinition
    Properties:
      Family: minisocial-backend-task
      Cpu: '512'
      Memory: '1024'
      NetworkMode: awsvpc
      RequiresCompatibilities:
        - FARGATE
      ContainerDefinitions:
        - Name: minisocial-backend-container
          Image: !Ref EcrImageUri
          PortMappings:
            - ContainerPort: 8080
              Protocol: tcp
```

#### 5. Họp nhóm trực tiếp (Offline)
Thực hiện họp nhóm trực tiếp để chốt phương án triển khai dự án, đánh giá lại toàn bộ kiến trúc hệ thống và chuẩn bị cho buổi báo cáo tổng kết.
![Họp nhóm trực tiếp](/images/1-Worklog/Week7/0406_meeting_w7.jpg)