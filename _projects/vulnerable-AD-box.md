---
layout: project
title: "Vulnerable AD Box"
description: "An intentionally vulnerable corporate AD environment to learn AD pentesting."
date: 2024-11-04
start_date: 2023-10-01
end_date: 2024-03-01
project_categories: [Pentesting]
project_tags: [AD]
roles: ["Domain Administrator", "Pentester"]
---

## Background
During my 14-month internship at NCS as an Associate Security Consultant, I created a vulnerable Active Directory (AD) Lab to enhance my knowledge and skills in Active Directory Pentesting. Designed to simulate realistic corporate environments, this project uses the Assumed Breach Model to let users practice the enumeration and exploitation of Windows-specific vulnerabilities like Link Local Multi-name Resolution (LLMNR) / NetBIOS Name Service (NetBIOS) Poisoning, Kerberoasting, Access Control List (ACL) Abuse, DCSync Attacks, Lateral Movement and Privilege Escalation.

## Objectives
1. Develop and hone my practical pentesting skills in prominent AD vulnerabilities while simulating real corporate environments.
2. Bridge the gap between theory and pratical knowledge of AD while engaging simulated real-life scenarios and understanding the potential risks and consequences of various AD vulnerabilities.

## Research
This project was an iterative process of playing dual roles as the Domain Administrator to implement intentionally vulnerable configurations and a Pentester to test the vulnerabilties to ensure there weren't any unintentional issues and they were functioning as intended.

## Challenges and Solutions
1. **Limited prior AD knowledge**
<br>
As a project that I intended to present for my Internship Assessment and with only prior AD fundamentals from my Systems Management module in Polytechnic Year 2, I only had 5 months to create the box from scratch. Time was of the essence. The initial learning curve was quite steep as I had to extensively research and understand the different AD components and terminologies. Knowledge from school was limited in the security context and I had to rely on HackTheBox (HTB) Academy, articles and YouTube videos for help.

2. **Iterative Process**
<br>
Each vulnerability configuration demanded meticulous attention and documentation. This approach was crucial to ensure the vulnerabilities were correctly implmented without introducing new problems. I had several of such encounters during the project, where my configuration or troublshooting attempts had affected underlying technologies I wasn't initially aware of. Hence, delaying project progress. Each cycle of addressing unexpected problems became an opportunity for me to deepen my technical understanding, develop more self-awareness and problem-solving skills in Active Directory.


## Deliverables/Outcome
1. **Presentation**
<br>
During my internship assessment for my team and school teacher, I explained my thought process and reasoning for my chosen vulnerabilities, the challenges faced and solutions. Hence, demonstrating my ability to understand complex concepts and communicate them effectively.

2. **Vulnerable AD Box Report**
<br>
The report documented my selected vulnerabilities' configuration and exploitation steps. It complemented my presentation as it provided visuals of how I configured the vulnerabilities when asked to explain them.


## Conclusion
This vulnerable AD Box, a controlled simulation of a vulnerable corporate Active Directory environment, serves as a comprehensive training ground for pentesters. Through this project, I've demonstrated the potential risks and challenges faced by organizations relying on AD infrastructure. With the continuous advancements in technology, it's clear that AD and Windows is here to stay. I was also amazed by the intricate complexity of AD mechanics. Systems like Kerberos demonstrate a profound and effective design, reflecting the enduring relevance of such old technologies in IT and cybersecurity today. Hence, reinforcing the relevance and need to be equipped with the practical skills of AD pentesting.