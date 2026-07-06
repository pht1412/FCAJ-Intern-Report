---
title: "Phase 5: Monitoring"
date: 2026-07-02
weight: 57
chapter: true
pre: "<b>5.7.</b> "
---

# Phase 5 – Monitoring & Optimization

Welcome to Phase 5. Deploying your application is only half the battle. In a production environment, you need complete visibility into how your system performs under stress to ensure high availability and responsiveness.

In this phase, we will utilize **OpenTelemetry (OTLP)** to collect metrics from our Spring Boot backend. Instead of relying solely on raw logs, we will visualize this data using **Grafana** to create real-time dashboards tracking CPU, Memory, and Request Latency. To truly test our architecture's limits and verify the Amazon ECS Auto Scaling rules we set up in Phase 3, we will simulate heavy user traffic using **Grafana K6**.

---

## AWS Services & Tools Used

| Tool / Service | Purpose |
|----------------|----------|
| OpenTelemetry (OTLP) | Instrument the application and collect performance metrics |
| Grafana Cloud | Centralized dashboard for visualizing metrics in real-time |
| Grafana K6 | Open-source load testing tool to simulate high traffic |
| Amazon ECS & Fargate | Observe container scaling behavior under simulated load |

---

## Hands-on Labs

- **[5.7.1 Grafana & Load Testing](5.7.1-/)**
  - Configure OTLP metrics in Spring Boot, execute K6 load testing scripts, monitor live traffic on Grafana dashboards, and verify the auto-scaling behavior of Amazon ECS.

---

## Expected Outcome

- After completing this phase, you will have:
  - Real-time **visibility** into your application's performance.
  - A beautiful **Grafana Dashboard** tracking key metrics (CPU, Memory, Request Rate).
  - Practical experience with **Load Testing** using K6.
  - Verification that your **Amazon ECS Auto Scaling** functions correctly under high load.

{{% notice tip %}}
By the end of Phase 5, you will have transformed a basic deployment into a fully observable, production-ready system capable of handling and scaling automatically with real-world traffic!
{{% /notice %}}