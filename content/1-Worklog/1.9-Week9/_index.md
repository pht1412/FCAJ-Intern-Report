---
title: "Week 9 Worklog"
date: 2026-06-21
weight: 9
chapter: false
pre: " <b> 1.9. </b> "
---

This week's worklog focuses on enhancing the user experience through frontend optimizations, implementing real-time full-stack features, and maintaining a robust CI/CD pipeline using Jenkins. We successfully integrated a dynamic chat system, an image cropper tool, and ensured seamless deployments to our AWS ECS infrastructure.

### Week 9 Objectives:
- Enhance User Experience (UX) through Frontend optimizations including navigation, real-time notifications, and media processing.
- Implement robust Full-stack features to enable real-time message interactions and user search capabilities.
- Maintain Continuous Integration and Continuous Deployment (CI/CD) by pushing code changes through the automated Jenkins pipeline to the AWS ECS infrastructure.

### Tasks to be carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Day 1-7 (06/15 - 06/21) | - Frontend Development <br>&emsp; + Synchronize username navigation logic. <br>&emsp; + Refactor and improve the notification system. <br>&emsp; + Integrate an image cropper tool for user avatars. | 06/15/2026 | 06/21/2026 | Project Repo |
| Day 1-7 (06/15 - 06/21) | - Full-stack Development <br>&emsp; + Implement real-time chat interactions. <br>&emsp; + Develop a dynamic user search functionality within the messaging module. | 06/15/2026 | 06/21/2026 | Project Repo |

### Week 9 Achievements:
- Successfully shipped core social networking modules, significantly improving end-user interaction and media handling.
- Demonstrated a mature Software Engineering lifecycle: managing branches, resolving merge conflicts, and writing clean commit messages.
- Validated the stability of the DevOps CI/CD workflow: all new code commits were automatically built and deployed to the AWS Cloud environment without causing service downtime.

### Task Evidence:

#### 1. Version Control & CI/CD Triggers
Successfully managed the project's source code on GitHub. The commit history demonstrates active development of the messaging system, notification icons, and image cropping features. These commits seamlessly triggered the Jenkins pipeline to deploy the latest container images to AWS ECR and ECS.
![GitHub Commits & PRs](/images/1-Worklog/Week9/GitHub_Sprint_Commits.png)

#### 2. Real-time Chat & User Search
Implemented the Full-stack messaging module. The UI successfully allows users to search for peers and interact in real-time, pulling active data from the backend database.
![Chat and Search Feature](/images/1-Worklog/Week9/Project_Chat_Search.png)

#### 3. Image Cropper Integration
Enhanced the Frontend by integrating an image processing tool, allowing users to crop and adjust their avatars before uploading the media files to the Amazon S3 storage bucket.
![Image Cropper UI](/images/1-Worklog/Week9/Project_ImageCroppe.png)

#### 4. Team Offline Meeting
Conducted an offline team meeting to review the final system architecture, finalize presentation slides, and rehearse for the project defense.
![Team Offline Meeting](/images/1-Worklog/Week9/1206_meeting_w9.jpg)