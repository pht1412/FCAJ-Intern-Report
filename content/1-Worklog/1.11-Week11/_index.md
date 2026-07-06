---
title: "Week 11 Worklog"
date: 2026-07-01
weight: 11
chapter: false
pre: " <b> 1.11. </b> "
---

This week's worklog focuses on deploying interactive application features to production and conducting advanced performance testing. We successfully launched the Gacha system, validated large file uploads under heavy load with K6, and simulated Layer 7 DDoS attacks to establish baseline metrics for our upcoming AWS WAF integration.

### Week 11 Objectives:
- Develop and deploy interactive application features (Gacha/Lucky Draw system) to the AWS production environment.
- Engineer advanced K6 performance testing scripts to simulate real-world payloads such as multipart file uploads.
- Conduct baseline Distributed Denial of Service (DDoS) simulations targeting authentication endpoints with Layer 7 HTTP flood traffic.
- Evaluate system stability and infrastructure behavior before implementing AWS Web Application Firewall (WAF).

### Tasks to be carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Day 1-3 | - Feature Development & CI/CD <br>&emsp;+ Develop the Gacha/Lucky Draw feature and UI.<br>&emsp;+ Commit code to trigger Jenkins automated deployment to AWS ECS. | 06/29/2026 | 07/01/2026 | Project Repo |
| Day 4-7 | - Advanced K6 Load Testing (Normal Flow) <br>&emsp;+ Simulate a real-world journey: login → fetch feed → upload a 5MB image to S3.<br>&emsp;+ Analyze backend stability under realistic traffic patterns. | 07/02/2026 | 07/05/2026 | [K6 Documentation](https://cloudjourney.awsstudygroup.com/) |
| Day 4-7 | - DDoS Simulation (Malicious Flow) <br>&emsp;+ Simulate a high-volume Layer 7 attack against the `/api/auth/login` endpoint with 500 VUs.<br>&emsp;+ Capture baseline metrics before WAF integration. | 07/02/2026 | 07/05/2026 | [K6 Documentation](https://cloudjourney.awsstudygroup.com/) |

### Week 11 Achievements:
- Successfully launched the interactive Gacha feature without disrupting existing production services.
- Validated the backend’s ability to handle concurrent large file uploads (5MB) through multipart requests integrated with Amazon S3.
- Executed a Layer 7 DDoS simulation and recorded baseline telemetry showing ALB timeouts, ECS bottlenecks, and HTTP 502/503/504 responses.

### Task Evidence:

#### 1. New Feature Deployment: Gacha System
Successfully developed the “Summer Treasure” Gacha feature. Source code changes were pushed to GitHub and automatically triggered the CI/CD pipeline to deploy the new UI and backend logic to AWS.
![GitHub Gacha Commits](/images/1-Worklog/Week11/GitHub_Gacha_Commits.png)
![Project Gacha Feature UI](/images/1-Worklog/Week11/Project_Gacha_Feature.png)

#### 2. K6 Load Testing: Normal Flow with 5MB Payload (Golden Snippet)
A K6 script was created to simulate a heavy real-world user journey. The script dynamically generates a 5MB file buffer and sends a multipart form-data POST request to test backend throughput to Amazon S3.
```javascript
const fd = new FormData();
fd.append('content', 'Đây là bài post test K6 với ảnh 5MB sinh tự động!');
fd.append('visibility', 'PUBLIC');
fd.append('mediaFiles', http.file(file5MB.buffer, 'loadtest-5mb.jpg', 'image/jpeg'));

const postRes = http.post(`${BASE_URL}/api/posts`, fd.body(), {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': `multipart/form-data; boundary=${fd.boundary}`,
  },
  timeout: '30s',
});
```
The results showed a 100% success rate, confirming that the ECS infrastructure can reliably handle sustained multipart uploads.

#### 3. K6 DDoS Simulation: Layer 7 HTTP Flood (Golden Snippet)
A malicious traffic simulation was built to bombard the authentication endpoint continuously with 500 virtual users for one minute.
```javascript
export const options = {
  vus: 500,
  duration: '1m',
  thresholds: {
    http_req_failed: ['rate>0.01'],
  },
};

export default function () {
  const loginUrl = `${BASE_URL}/api/auth/login`;
  const payload = JSON.stringify({ identifier: '141204', password: '1412' });
  const res = http.post(loginUrl, payload, {
    headers: { 'Content-Type': 'application/json' },
    timeout: '60s',
  });
}
```
The terminal results showed significant baseline degradation under attack, with a high failure rate caused by ALB timeouts and ECS bottlenecks. This evidence supports the need to deploy AWS WAF rate limiting in the final week.
![K6 Testing Results](/images/5-Workshop/5.7-Phase5-Monitoring/Picture47.png)

#### 4. Team Offline Meeting
Conducted an offline team meeting to evaluate the load test results, finalize the Gacha feature deployment, and review AWS WAF statistics on DDoS attacks.
![Team Offline Meeting](/images/1-Worklog/Week11/0307_meeting_w11.png)