---
title: "Week 8 Worklog"
date: 2026-06-14
weight: 8
chapter: false
pre: " <b> 1.8. </b> "
---

This week's worklog focuses on refining our 3-Tier Cloud Architecture diagram and sharing our technical knowledge with the community. We also conducted rigorous performance and load testing using K6 to evaluate system capacity and formulate actionable optimization plans.

### Week 8 Objectives:
- Refine and document the 3-Tier Cloud Architecture diagram for the project.
- Share technical knowledge and project milestones with the cloud community.
- Conduct rigorous Performance and Load Testing using K6 to evaluate system capacity.
- Analyze telemetry data to identify infrastructure bottlenecks and define actionable optimization plans.

### Tasks to be carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Day 1 | - Architecture Design & Community Sharing <br>&emsp; + Finalize the system architecture diagram. <br>&emsp; + Publish Project Blog #1 on the AWS Study Group VN community. | 06/08/2026 | 06/08/2026 | Project Architect |
| Day 7 | - Performance Engineering (Load Testing) <br>&emsp; + Prepare K6 scripts simulating 500 concurrent users. <br>&emsp; + Execute load tests on Local vs. AWS Cloud environments. <br>&emsp; + Compile the System Capacity & Bottleneck Analysis Report. | 06/14/2026 | 06/14/2026 | K6 Documentation |

### Week 8 Achievements:
- Successfully visualized the application's infrastructure mapping on AWS and contributed to the engineering community.
- Validated the high efficiency of the application source code (Cursor-pagination, Debounce logic) under heavy load.
- Successfully identified infrastructure bottlenecks (CPU limits during JWT decoding on ECS) and established concrete system capacity thresholds (<50 VUs for smooth operation).
- Formulated a professional DevOps Action Plan focused on scaling compute resources and caching optimizations.

### Task Evidence:

#### 1. System Architecture & Community Contribution (Blog #1)
Finalized the initial 3-Tier Architecture design tailored for the AWS environment.
![Architecture Diagram](/images/1-Worklog/Week8/Architecture_Diagram_V1.png)

Shared the architectural approach and project updates with the community via Facebook.
![AWS Study Group Blog](/images/1-Worklog/Week8/AWS_Study_Group_Blog.png)

👉 **[Click here to read the full Blog Post #1 in the Blogs Posted section](/blogs-posted/)**

#### 2. K6 Load Test Execution & Results
Executed heavy-load scenarios using K6 to simulate 500 Virtual Users (VUs) continuously hitting the APIs for 3 minutes.
![K6 Load Test Execution](/images/1-Worklog/Week8/K6_LoadTest_Execution.png)
![K6 Load Test Results](/images/1-Worklog/Week8/K6_LoadTest_Results.png)

#### 3. System Capacity & Performance Report
Based on the K6 output, a comprehensive comparative analysis was conducted between the Local environment and the AWS Cloud (ECS/ALB).

**A. Scenario 1: Read-Heavy (Feed API)**
*Simulating 500 users continuously loading the news feed.*
| Environment | Total Requests | Throughput (RPS) | Error Rate | Latency p(95) | UX Evaluation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Local** | 18,302 | ~100 req/s | 0.00% | 73.1 ms | Extremely Smooth |
| **AWS Cloud** | 3,920 | ~20 req/s | 0.02% | 19.03 s | Overloaded |

**B. Scenario 2: Write-Heavy (Like API)**
*Simulating an interaction storm: 500 users spamming the Like button on a single post.*
| Environment | Total Requests | Throughput (RPS) | Error Rate | Latency p(95) | UX Evaluation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Local** | 22,049 | ~182 req/s | 1.80% | 1.39 s | Nice!! |
| **AWS Cloud** | 4,979 | ~40 req/s | 0.24% | 10.94 s | Overloaded |

**C. Tech Lead Analysis & Conclusions:**
- **Software Strength:** The massive latency gap proves the Spring Boot code and DB Schema are highly optimized. Cursor-pagination keeps Local response times at 73ms. Eventual Consistency and Debounce logic prevented Database Deadlocks (0% HTTP 500 errors).
- **Infrastructure Bottleneck:** The AWS ECS Containers (Micro/Small) are under-provisioned. CPU hits 100% simply validating 500 concurrent JWT tokens, causing requests to queue at the ALB (resulting in 10-19s TCP timeouts).
- **Current Capacity Thresholds:** 
    - 🟢 Smooth: < 50 Concurrent Users.
    - 🟡 Warning (Queuing): 50 - 150 Concurrent Users.
    - 🔴 Degraded (Latency > 10s): > 200 Concurrent Users.

**D. Action Plan (DevOps & Tuning):**
1. **Scale Up ECS (Highest Priority):** Upgrade Task Definitions to minimum 1 vCPU and 2GB RAM. Configure Auto Scaling (Scale Out) when CPU > 70%.
2. **Tune Spring Boot Server:**
```properties
# Increase Tomcat max threads
server.tomcat.threads.max=500
# Increase queue for incoming requests
server.tomcat.accept-count=200
# Increase connection pool
spring.datasource.hikari.maximum-pool-size=30
```