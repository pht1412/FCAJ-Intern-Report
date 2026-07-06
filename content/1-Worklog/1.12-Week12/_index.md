---
title: "Week 12 Worklog"
date: 2026-07-06
weight: 12
chapter: false
pre: " <b> 1.12. </b> "
---

This week's worklog focuses on two primary tasks: building a software testing report using JaCoCo for code coverage measurement, and consolidating all previously produced content into a complete Internal Report deployed on the Hugo platform.

### Week 12 Objectives:
- Build a **software testing report** using JaCoCo, including integration guide for the JaCoCo plugin and presenting test results across two layers: API Controller (MockMvc) and Service (Mockito).
- **Consolidate all content** produced throughout previous weeks to build a complete Internal Report on Hugo.

### Tasks carried out this week:
| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Day 1-3 | - Software Testing Report with JaCoCo <br>&emsp;+ Demonstrate how to add the JaCoCo plugin to a Maven/Gradle project.<br>&emsp;+ Configure JaCoCo to generate Code Coverage Reports.<br>&emsp;+ Test the API Controller layer using MockMvc.<br>&emsp;+ Test the Service layer using Mockito.<br>&emsp;+ Analyze JaCoCo report results (Line Coverage, Branch Coverage). | 07/06/2026 | 07/08/2026 | [JaCoCo Documentation](https://www.jacoco.org/jacoco/trunk/doc/) |
| Day 4-7 | - Consolidate Internal Report Content on Hugo <br>&emsp;+ Review and compile all worklog content from Week 1 through Week 11.<br>&emsp;+ Restructure content to align with Hugo's standard format.<br>&emsp;+ Add supporting evidence: screenshots, code snippets, and architecture diagrams.<br>&emsp;+ Verify consistency between Vietnamese and English versions. | 07/09/2026 | 07/12/2026 | [Hugo Documentation](https://gohugo.io/documentation/) |

### Week 12 Achievements:
- Completed the software testing report with JaCoCo, clearly demonstrating the plugin integration process and Code Coverage measurement results for the project.
- Mastered the two-layer testing methodology:
  - **API Controller Layer (MockMvc):** Tested REST API endpoints without starting the full server, validating HTTP status codes, response bodies, and request validation.
  - **Service Layer (Mockito):** Tested business logic independently by mocking dependencies such as Repositories, ensuring the correctness of each processing unit.
- Successfully consolidated all content from previous weeks into a complete, well-structured Internal Report deployed on Hugo.

### Task Evidence:

#### 1. JaCoCo Plugin Integration
To use JaCoCo in the project, the plugin must be added to the build configuration file. Below is the configuration for **Maven** (`pom.xml`):
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

After adding the plugin, run the following command to execute tests and generate the report:
```bash
mvn clean test
```
The JaCoCo report will be generated at: `target/site/jacoco/index.html`.

For **Gradle** (`build.gradle`):
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

#### 2. API Controller Layer Testing (MockMvc)
Used **MockMvc** to test REST API endpoints without starting the full Spring Boot application. MockMvc enables sending simulated HTTP requests and validating the responses, including status codes, response bodies, and headers.

Controller layer testing strategy:
- Validate HTTP status codes for both success and failure scenarios.
- Verify response body structure and content (JSON).
- Test request validation (invalid input data).
- Validate exception handling and error responses.

#### 3. Service Layer Testing (Mockito)
Used **Mockito** to test business logic at the Service layer independently. Mockito enables mocking dependencies such as Repositories and External Services, allowing each processing unit to be tested without relying on databases or external services.

Service layer testing strategy:
- Mock dependencies using `@Mock` and `@InjectMocks`.
- Test happy paths and edge cases for each method.
- Verify interactions between Service and Repository using `verify()`.
- Test exception handling when dependencies return errors.

#### 4. JaCoCo Report Results
After running all tests across both layers, JaCoCo generates a visual report showing:
- **Line Coverage:** The percentage of source code lines executed by the tests.
- **Branch Coverage:** The percentage of conditional branches (if/else, switch) covered by the tests.
- **Method Coverage:** The percentage of methods invoked during the testing process.

![JaCoCo Code Coverage](/images/1-Worklog/Week12/Project_JaCoCo_Coverage_W12.png)

#### 5. Internal Report Consolidation on Hugo
Completed the consolidation and restructuring of all report content from Week 1 through Week 11, including:
- Detailed weekly worklogs.
- Workshop documentation with system architecture and deployment phases.
- Supporting evidence: screenshots and code snippets.
- Ensured consistency between Vietnamese and English versions.
