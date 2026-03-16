# Government Grant Portal

GovGrant is a role‑based web portal that connects Government Administrators with Citizens to:

Publish social‑welfare schemes (grants) with income limits, deadlines, and funding amounts.
Browse only the grants a citizen is eligible for (income ≤ max‑income‑limit).
Submit multi‑part applications that include personal data and verification documents (Aadhar/PAN/Passport/Driving‑License).
Review applications, change status (pending, approved, rejected), and keep an auditable trail of who reviewed what and when.

## System Architechture
+-------------------+            +----------------------+            +-------------------+
|   Front‑end (UI)  |  <--API--> |   Back‑end (Node.js) |  <--SQL--> |   Database (MySQL)  |
|                   |            |                      |            |                     |
+-------------------+            +----------------------+            +-------------------+

 


Citizen UI – Registers / logs‑in, manages profile, browses eligible grants, fills the application wizard (steps + file upload).
Admin UI – Creates/edits grants, sees a paginated table of pending applications, performs bulk approvals/rejections, and views audit logs.

