---
title: "Phase 1: Foundation"
date: 2026-07-02
weight: 3
chapter: true
pre: "<b>5.3.</b> "
---

# Phase 1 – Foundation


In this phase, you will build the **core AWS infrastructure** that serves as the foundation for all subsequent deployment phases. Instead of manually creating AWS resources, the entire infrastructure will be provisioned using **Infrastructure as Code (IaC)** with **AWS CloudFormation**, ensuring consistency, repeatability, and easier maintenance.

---

## Learning Objectives

After completing this phase, you will be able to:

- Design and provision a highly available **Amazon VPC** spanning multiple Availability Zones
- Separate public and private resources using **Public** and **Private Subnets**
- Configure secure Internet connectivity using an **Internet Gateway** and **NAT Gateway**
- Deploy an **Amazon RDS for SQL Server** instance inside private subnets
- Apply AWS networking best practices for production-ready architectures
- Provision the entire infrastructure using **AWS CloudFormation** templates

---

## AWS Services Used

| Service | Purpose |
|---------|---------|
| Amazon VPC | Multi-AZ virtual network with isolated subnets |
| Internet Gateway | Enables Internet access for public subnets |
| NAT Gateway | Allows private subnets to reach the Internet securely |
| Route Tables | Controls traffic routing between subnets and gateways |
| Security Groups | Instance-level firewall rules |
| Amazon RDS (SQL Server) | Managed relational database in private subnets |
| AWS CloudFormation | Infrastructure as Code for automated provisioning |

---

## Hands-on Labs

- **[5.3.1 VPC Networking – Stack 1](5.3.1-vpc/)**
  - Build the networking foundation, including the VPC, subnets, route tables, Internet Gateway, and NAT Gateway.

- **[5.3.2 Amazon RDS Database – Stack 2](5.3.2-rds/)**
  - Deploy a secure SQL Server database inside private subnets using AWS CloudFormation.

---

## Expected Outcome

- At the end of this phase, you will have:
  - A production-style **Multi-AZ VPC**
  - Secure networking architecture following AWS best practices
  - A private **Amazon RDS** database ready for application deployment
  - CloudFormation stacks that can be updated or deleted consistently
  - A solid infrastructure foundation for the CI/CD deployment phases

{{% notice tip %}}
All resources in this phase are provisioned via **CloudFormation**. If anything goes wrong, you can simply delete the stack and re-deploy — no manual cleanup needed.
{{% /notice %}}