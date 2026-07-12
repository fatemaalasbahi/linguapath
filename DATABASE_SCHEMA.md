# LinguaPath Database Schema


# Users Table

Stores account information.


Columns:

id

name

email

password_hash

created_at



---

# Exam Profile Table

Stores language goals.


Columns:

id

user_id

exam_type

current_score

target_score

exam_date

created_at


Example:

exam_type:
DET


current_score:
95


target_score:
120



---

# Assessment Table

Stores AI evaluations.


Columns:

id

user_id

skill

question

response

ai_score

feedback

created_at


Example:

skill:

Writing


ai_score:

105



---

# Study Plan Table

Stores AI-generated plans.


Columns:

id

user_id

plan_content

created_at



---

# Progress Table

Tracks improvement.


Columns:

id

user_id

score_history

completed_tasks

updated_at



---

# Feedback Table

Stores user feedback.


Columns:

id

user_id

message

created_at