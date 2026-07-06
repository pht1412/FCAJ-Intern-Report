---
title: "Clean Up Resources"
date: 2026-07-02
weight: 58
chapter: true
pre: "<b>5.8. </b>"
---

# CLEAN UP RESOURCES

Congratulations on successfully completing the MiniSocial Network AWS Workshop!

To prevent incurring unexpected charges, it is **mandatory** that you destroy all the resources provisioned during this workshop. Please follow the step-by-step guide below carefully.

---

## STEP 1: Manual Data Cleanup (Required before deleting Stacks)

AWS CloudFormation will refuse to delete a Stack if an Amazon S3 Bucket or Amazon ECR Repository still contains data. Even with automation, you must perform this data wipe manually.

### 1. Clean Up Amazon S3 (Frontend Stack)
- Navigate to the **Amazon S3** console.
- Locate the Bucket containing your static Frontend code.
- Click the **Empty** button to permanently delete all files (`index.html`, `css`, `js`, etc.).

![Empty S3 Bucket](/images/5-Workshop/5.8-Clean-up/S3.png)
<center><i>Empty the S3 Bucket before deleting the Stack to avoid Dependency Violations.</i></center>

### 2. Clean Up Amazon ECR (Backend Stack)
- Navigate to the **Amazon ECR** console.
- Locate the repository named `minisocial-backend`.
- Select all Image tags inside and click **Delete**.

![Empty ECR Repository](/images/5-Workshop/5.8-Clean-up/ECR.png)
<center><i>Delete all Docker Images inside the ECR Repository.</i></center>

---

## STEP 2: Delete CloudFormation Stacks in Order

Navigate to the **AWS CloudFormation** console, switch to the **Stacks** section, and proceed to delete the stacks in the exact order below.

{{% notice warning %}}
**Region Verification:** Ensure you are operating in the correct AWS Region before deleting resources.
{{% /notice %}}

### 1. Delete the Frontend Stack (US East - N. Virginia)
- Switch to the **N. Virginia (us-east-1)** region.
- **Action:** Select the **Frontend** stack → **Delete**.
- **Reason:** This immediately cuts off all user traffic. CloudFormation will delete the CloudFront Distribution (which may take 5-10 minutes to disable and delete) and the S3 Bucket (which was emptied in Step 1).

![CloudFormation US East](/images/5-Workshop/5.8-Clean-up/Cloudformation_US.png)
<center><i>Delete the Frontend Stack in the US East (N. Virginia) Region.</i></center>

---

### 2. Delete the Backend Stack (AP Southeast - Singapore)
- Switch back to the **Singapore (ap-southeast-1)** region.
- **Action:** Select the **Backend** stack → **Delete**.
- **Reason:** Deleting this stack forces CloudFormation to terminate Fargate Tasks, destroy the ECS Cluster, remove the empty ECR Repository, and delete the Target Group and Application Load Balancer (ALB). This releases all associated Network Interfaces (ENIs) and Security Groups.

![CloudFormation Singapore](/images/5-Workshop/5.8-Clean-up/Cloudformation_Sing.png)
<center><i>Switch to the Singapore region to delete the remaining infrastructure Stacks.</i></center>

### 3. Delete the DB Stack
- Remain in the **Singapore (ap-southeast-1)** region.
- **Action:** Select the **DB** stack → **Delete**.
- **Important Note:** When deleting Amazon RDS via CloudFormation, AWS may attempt to create a **Final Snapshot** by default. Do not worry; we will manually delete this snapshot in Step 3.

### 4. Delete the Architect Stack (Final)
- Remain in the **Singapore (ap-southeast-1)** region.
- **Action:** Select the **Architect** stack → **Delete**.
- **Reason:** This is the foundation of the system (VPC, Subnets, Internet Gateway, NAT Gateway, Route Tables). Because the Backend and DB stacks have already been deleted, the subnets are now empty. CloudFormation will cleanly remove the NAT Gateway (the most expensive resource) and the VPC without encountering Dependency Violation errors.

---

## STEP 3: Manual AWS Console Cleanup

After CloudFormation finishes deleting the Stacks, a few peripheral resources must be cleaned up manually.

### 1. Delete Amazon RDS Snapshots
- Navigate to the **Amazon RDS** console in the **Singapore** region.
- Select **Snapshots** from the left navigation pane.
- Select the final snapshots that were automatically generated during deletion and click **Delete**.

![RDS Snapshot](/images/5-Workshop/5.8-Clean-up/Snapshot_RDS.png)
<center><i>Delete the automated RDS snapshots to avoid recurring storage fees.</i></center>

### 2. Delete AWS Certificate Manager (ACM) Certificates
- **In the Singapore Region (ap-southeast-1):** 
  - Navigate to **AWS Certificate Manager** → **List certificates**.
  - Select the certificates created for the Backend and click **Delete**.

![ACM Singapore](/images/5-Workshop/5.8-Clean-up/ACM_Sing.png)
<center><i>Delete the ACM certificates in the Singapore region.</i></center>

- **In the N. Virginia Region (us-east-1):** 
  - Switch your region to **N. Virginia**.
  - Delete the certificates created for the Frontend.

![ACM US East](/images/5-Workshop/5.8-Clean-up/ACM_US.png)
<center><i>Delete the ACM certificates in the N. Virginia region.</i></center>

### 3. Clean Up AWS Systems Manager - Parameter Store
- **In the N. Virginia Region (us-east-1):**
  - Navigate to **AWS Systems Manager** → **Parameter Store**.
  - Delete the existing parameters.

![Parameter Store US East](/images/5-Workshop/5.8-Clean-up/Param_US.png)
<center><i>Clean up Parameter Store configurations in N. Virginia.</i></center>

- **In the Singapore Region (ap-southeast-1):**
  - Switch back to the **Singapore** region.
  - Select all parameters associated with the MiniSocial project and click **Delete**.

![Parameter Store Singapore](/images/5-Workshop/5.8-Clean-up/Param_Sing.png)
<center><i>Clean up Parameter Store configurations in Singapore.</i></center>

### 4. Delete Amazon Route 53 Hosted Zone
- Navigate to the **Amazon Route 53** console (Global).
- Select **Hosted zones**.
- Select the Hosted Zone you created (e.g., `minisocial-network.id.vn`) and click **Delete**. 
*(Note: You must delete all custom DNS records inside the Hosted Zone before you can delete the Hosted Zone itself).*

![Route 53 Hosted Zone](/images/5-Workshop/5.8-Clean-up/Route53.png)
<center><i>Delete records and the Hosted Zone in Route 53 to finalize the cleanup.</i></center>

---

{{% notice tip %}}
**Done!** You have successfully cleaned up all resources and returned your AWS account to a safe state. Thank you for participating in the MiniSocial Workshop!
{{% /notice %}}