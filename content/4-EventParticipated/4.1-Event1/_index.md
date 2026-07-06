---
title: "Event 1"
date: 2026-05-23
weight: 1
chapter: false
pre: " <b> 4.1. </b> "
---

# Event Report: “FCAJ Community Day MAY 2026”

![FCAJ Community Day Poster](/images/4-EventParticipated/Evt_1.jpg)


### Event Objectives

- Share the latest technological trends in Cloud Computing and Generative AI.
- Introduce ecosystems and tools that support data management (Amazon Quick) and content delivery networks (Amazon CloudFront).
- Provide practical insights from Hackathon projects (developing products under high pressure).
- Deep dive into the operational mechanisms of Enterprise-Grade Multi-Agent Systems and technical parameters of Large Language Models (LLMs).

### List of Speakers

- **Tinh Truong** - Platform Engineer, GoTymeX
- **Anh Pham** - Cloud Consultant, G-ASIAPACIFIC Vietnam
- **Thinh Nguyen** - DevOps Engineer, FCAJ
- **Thao Nguyen, Mai Nguyen, Uyen Le** - GenAI Engineers, Team VIB
- **Duc Dao** - Solutions Architect, Cloud Kinetics
- **Vy Lam** - Senior Business Systems Analyst, VPBank

### Key Highlights

#### Context Is Everything: Making AI Actually Work for You
- **Why AI fails:** Analyzing the reasons AI projects fail without appropriate Context.
- **AI Evolution:** The shift from simple prompting to memory management (the "Second AI Brain" concept).
- **Practicality:** Mindset and practical tips on leveraging context to achieve better AI results.

#### Friendly AI Assistant with Amazon Quick
- **Quick Chat Agent:** AI assistants designed for exploring data and analyzing insights.
- **Quick Flows:** Creating intelligent workflows using natural language with no coding required.
- **Quick Spaces & Quick Sight:** Shared collaborative spaces for team knowledge and building dashboards/reports from raw data.

#### From Edge To Origin: CloudFront as Your Foundation
- **Infrastructure Foundation:** Utilizing Amazon CloudFront for every workload.
- **Optimization:** Cost optimization and enhanced performance for content delivery.
- **Reliability & Security:** Enhanced reliability and security capabilities built directly at the edge layer.

#### 36 hrs with LotusHacks – Building UTMorpho from Idea to Reality
- **Brainstorming Journey:** From zero to accurately defining the problem.
- **Building Under Pressure:** The continuous 36-hour development sprint.
- **Practical Lessons:** Sharing challenges, failures, turning points, and the final product demo.

#### Non-Determinism of "Deterministic" LLM Settings
- **Mechanism:** How LLMs choose the next token.
- **The Reality of Temperature=0:** Breaking the assumption that `Temperature=0` guarantees absolute determinism.
- **Practical Impacts:** Understanding how inference optimizations affect output and exploring mitigation strategies.

#### Enterprise-Grade Multi-Agent System (Case study: Startup Credit Scoring)
- **Real-world Problem:** The structural mismatch between traditional banking systems and startup data.
- **Agent Paradigm:** Comparing Single Agent (when to and when not to use) with the Multi-Agent Paradigm.
- **Business Process:** Building a blueprint for a "Virtual Credit Committee" with strict standards on Guardrails, Compliance, and Operational ROI.

---

### What I Learned

#### Infrastructure & AI Design Thinking
- **The Importance of Context:** Realizing that no matter how powerful an AI tool is, it is useless without a well-designed context structure (Second Brain).
- **Task Decomposition (Multi-Agent Paradigm):** Large-scale systems should not rely on a Single Agent. They need to be broken down into specialized agents to control hallucinations and increase accuracy.

#### Technical Architecture (Based on 3 Enterprise-Grade Pillars)
- **Securely:** All data communication flows, especially in financial environments, must be fenced by strict Guardrails and compliance policies.
- **Reliably:** Understanding the non-deterministic nature of LLMs to build fallback mechanisms, while leveraging CDNs like CloudFront to ensure high availability at the Edge.
- **Scalable:** Every component, from data processing (Amazon Quick) to network infrastructure, must be designed as a blueprint, ready to scale out without breaking core business logic.

---

### Application to Work

- **Optimize Current Architecture:** Integrate Amazon CloudFront as the frontend delivery network for the internship project to meet "Securely" and "Reliably" standards.
- **Apply Guardrails Mindset:** When developing AI-integrated features in the future, always build authentication layers and compliance boundaries before allowing AI to interact with the database.
- **Standardize Workflows:** Adopt the high-pressure work ethic (36-hour sprint) of Team LotusHacks to enhance focus during project milestones.
- **Explore No-Code/Low-Code Ecosystems:** Further research the Amazon Quick suite to automate log/data analysis workflows without writing boilerplate code.

---

### Event Experience

Attending the **FCAJ Community Day** was an eye-opening experience that helped me bridge theoretical Cloud knowledge with the practical reality of how large organizations operate AI systems and global networks. Some notable experiences include:

#### Learning from Cross-Domain Experts
- Speakers from various domains (Platform Engineer, Cloud Consultant, DevOps, GenAI Engineer, Solutions Architect) provided multi-dimensional perspectives: from low-level infrastructure (CloudFront) to high-level AI integration thinking (Multi-Agent).
- I was particularly impressed by the presentation from Vy Lam (VPBank) as it solved a highly complex business problem by blending finance with technology.

#### Deep Technical Updates
- For the first time, I clearly understood the technical mechanics behind the `Temperature=0` parameter in LLMs and why it can still produce non-deterministic results.
- Gained exposure to the Amazon Quick ecosystem, opening new directions for managing workflows via natural language.

#### Networking and Mindset Shift
- Attending the offline event at Bitexco provided a great opportunity to connect with a high-quality community of engineers.
- The event completely shifted my mindset: Building a product (like UTMorpho) is not just about coding; it starts with understanding the right "Context," defining the problem accurately, and deploying a robust infrastructure to support that idea.

#### Event Photos

![FCAJ Community Day Event](/images/4-EventParticipated/2305_evt_w5.jpg)

> Overall, the FCAJ Community Day not only delivered a massive amount of knowledge regarding GenAI and Cloud but also strongly inspired me through three core keywords: **Securely, Reliably, Scalable**. These will serve as the standard metrics for every system architecture I design in the future.