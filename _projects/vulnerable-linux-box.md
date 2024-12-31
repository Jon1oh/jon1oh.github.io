---
layout: project
title: "Vulnerable Linux Box"
description: "An intentionally vulnerable environment to learn Linux pentesting."
date: 2024-11-03
start_date: 2023-06-01
end_date: 2023-09-01
project_categories: [Pentesting]
project_tags: [Linux]
roles: ["System Administrator", "Pentester"]
---

## Background
During my 1-year internship as an Associate Security Consultant at NCS from 2022 to 2023, I undertook a side project to expand my pentesting knowledge and skills. This project, conducted alongside my assigned tasks, involved creating a virtualized environment with vulnerabilities from the OWASP Top 10 (as of 2021), such as SQL Injection and Buffer Overflow.

With the increasing reliance on automated tools in the pentesting community, it's crucial to maintain proficiency in manual testing skills. Automated tools can fail to identify certain vulnerabilities, making manual testing indispensable. Ultimately, a tool is just a tool. What distinguishes pentesters is their ability to apply theoretical knowledge to manually exploit vulnerabilities.

I ensured that the challenge scenarios closely mimicked real-life web penetration testing scenarios, allowing my colleagues to apply their existing skills and knowledge effectively. This project not only enhanced my practical skills but also contributed to the team's overall proficiency.

## Objectives
The purpose of this project was for me to develop practical skills in Linux pentesting and deepen my knowledge in defensive security as the administrator of the box, and offensive security when testing the exploits for my challenges to ensure no unintentional issues existed.

## Research

## Challenges and Solutions
1. **Steep Learning Curve**
<br>
Initially, this project was challenging as it was my first time working with a CLI-based Linux environment. The learning curve was steep, especially since I had to complete the project within four months for my Internship Interim presentation. Furthermore, my knowledge was ony theoretical, gained from the Application Security module in Poly Y2. Therefore, I had to invest significant time to develop practical skills to exploit the targeted vulnerabilities before creating the vulnerable box. I achieved this using platforms like BurpSuite Academy and HTB Academy.

2. **Vulnerability Scope**
<br>
In addition to choosing specific vulnerabilities for my box, I also had to decide how deeply to explore each one. I aimed to create challenges that went beyond my existing knowledge, incorporating vulnerabilities I was less familiar with. This approach allowed me to address my weaknesses, acquire new skills, and infuse creativity into the challenges to make them more engaging. For instance, I initially struggled with understanding buffer overflow vulnerabilities. This project provided an opportunity to deepen my knowledge of their mechanics and exploitation techniques with tools like GDB. It required extensive research and iterative testing of my configurations.

3. **Iterative Process**
<br>
Creating this vulnerable box was an iterative process as I had to set intentional misconfigurations and vulnerabilities, test them, and go back to reconfigure them again to ensure that the challenges could only be exploited by my desired method(s).

## Deliverables/Outcome
I successfully showcased this project to my team members and in my Internship Interim presentation, explaining how I created the intentional vulnerabilities and a live demo exploiting them. I had also documented my configuration and exploit steps separately.

## Conclusion
Reflecting on this project, I can confidently say it was a transformative experience. The challenges I faced, from understanding learning Linux Administration and complex vulnerabilities like buffer overflows to iteratively refining my configurations, it pushed me to grow both technically and creatively. By creating a virtualized environment with OWASP Top 10 vulnerabilities, I not only expanded my own pentesting expertise but also contributed to my team's proficiency. This project underscored the importance of manual testing skills in an era increasingly dominated by automated tools. Ultimately, this side project was more than just an exercise in technical skill—it was a journey of continuous learning and improvement.