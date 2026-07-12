# LinguaPath Database Schema

## Overview

This document describes the database structure for LinguaPath.

The database stores:

- User profile information
- Language exam goals
- AI diagnostic assessments
- Practice submissions and AI feedback
- Personalized study plans
- Progress history
- User feedback

The database will use:

- Neon PostgreSQL
- Drizzle ORM

Authentication is handled by **Neon Auth**. The application database does not store passwords.

---

# Database Entities

The MVP database contains the following main tables:

1. Users
2. Exam Profiles
3. Assessments
4. Practice Submissions
5. Study Plans
6. Progress Records
7. Feedback

---

# 1. Users Table

## Purpose

Stores application profile information for authenticated users.

Authentication (registration, login, sessions) is handled through:

- Neon Auth

The `users` table references the Neon Auth user ID and stores application-specific profile data. Passwords are **not** stored in this table.

---

## Fields

| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key for application user record |
| neon_auth_user_id | Text | Reference to Neon Auth user ID |
| email | Text | User email (synced from Neon Auth) |
| name | Text | User display name |
| created_at | Timestamp | Record creation date |
| updated_at | Timestamp | Last update date |

---

# 2. Exam Profiles Table

## Purpose

Stores the user's language learning goals.

A user may have multiple exam profiles in the future.

Example:

A user may prepare for:

- DET English
- HSK Chinese

---

## Exam Scoring Models

The platform supports different exam systems.

**Numeric exams (e.g. DET):** use `current_score` and `target_score`

**Level-based exams (e.g. HSK):** use `current_level` and `target_level`

For a given exam profile, populate the fields that match the exam type. Unused fields may be null.

---

## Fields

| Field | Type | Description |
|---|---|---|
| id | UUID | Unique profile ID |
| user_id | UUID | Related user |
| language | Text | Target language |
| exam_type | Text | Exam name (e.g. DET, HSK) |
| scoring_model | Text | `numeric` or `level` |
| current_score | Integer | Current score (numeric exams) |
| target_score | Integer | Target score (numeric exams) |
| current_level | Text | Current level (level-based exams) |
| target_level | Text | Target level (level-based exams) |
| exam_date | Date | Planned exam date |
| study_hours_per_week | Integer | Available study time |
| created_at | Timestamp | Creation date |

---

## Example — DET

```
User: Fatema
Language: English
Exam: Duolingo English Test
Scoring Model: numeric
Current Score: 95
Target Score: 120
```

---

## Example — HSK

```
User: Fatema
Language: Chinese
Exam: HSK
Scoring Model: level
Current Level: HSK 3
Target Level: HSK 5
```

---

# 3. Assessments Table

## Purpose

Stores AI **diagnostic** assessment results only.

Diagnostic assessments are separate from ongoing practice submissions (see `practice_submissions`).

---

## Fields

| Field | Type | Description |
|---|---|---|
| id | UUID | Assessment ID |
| user_id | UUID | Related user |
| exam_profile_id | UUID | Related exam goal |
| assessment_type | Text | Type of diagnostic assessment |
| input_content | Text | Student responses |
| ai_score | Integer | AI estimated score (numeric exams) |
| ai_level | Text | AI estimated level (level-based exams) |
| strengths | Text | Identified strengths |
| weaknesses | Text | Identified weaknesses |
| recommendations | Text | AI recommendations |
| created_at | Timestamp | Assessment date |

---

# 4. Practice Submissions Table

## Purpose

Stores student practice responses and AI feedback separately from initial diagnostic assessments.

---

## Fields

| Field | Type | Description |
|---|---|---|
| id | UUID | Submission ID |
| user_id | UUID | Related user |
| exam_profile_id | UUID | Related exam goal |
| submission_type | Text | Type of practice (e.g. writing) |
| student_response | Text | Student's practice answer |
| ai_feedback | Text | AI-generated feedback |
| score | Integer | Estimated score (numeric exams, if applicable) |
| created_at | Timestamp | Submission date |

---

## Example

```
Submission Type: writing
Student Response: "I think education is very important because..."
AI Feedback: "Good structure. Improve academic vocabulary in paragraph 2."
Score: 108
```

---

# 5. Study Plans Table

## Purpose

Stores AI-generated personalized study plans.

---

## Fields

| Field | Type | Description |
|---|---|---|
| id | UUID | Study plan ID |
| user_id | UUID | Related user |
| exam_profile_id | UUID | Related exam |
| plan_content | JSON | AI generated schedule |
| start_date | Date | Plan start date |
| end_date | Date | Plan end date |
| created_at | Timestamp | Creation date |

---

## Example Study Plan

```json
{
  "week1": {
    "writing": "Practice essay structure",
    "vocabulary": "Learn academic vocabulary"
  },
  "week2": {
    "reading": "Complete practice tests"
  }
}
```

---

# 6. Progress Table

## Purpose

Tracks student improvement and completed activities over time.

---

## Fields

| Field | Type | Description |
|---|---|---|
| id | UUID | Progress ID |
| user_id | UUID | Related user |
| exam_profile_id | UUID | Related exam goal |
| activity_type | Text | Completed activity |
| score | Integer | Result score (numeric exams, if applicable) |
| level | Text | Result level (level-based exams, if applicable) |
| notes | Text | Additional information |
| completed_at | Timestamp | Completion date |

---

## Example Activities

```
Activity Type: Writing Practice
Score: 110
Notes: Improved grammar accuracy
```

---

# 7. Feedback Table

## Purpose

Stores user feedback about LinguaPath.

---

## Fields

| Field | Type | Description |
|---|---|---|
| id | UUID | Feedback ID |
| user_id | UUID | Related user |
| message | Text | User feedback |
| status | Text | New/Reviewed |
| created_at | Timestamp | Submission date |

---

# Database Relationships

```
Users

  |

  |--- Exam Profiles

  |

  |--- Assessments (diagnostic only)

  |

  |--- Practice Submissions

  |

  |--- Study Plans

  |

  |--- Progress

  |

  |--- Feedback
```

All learning data tables reference `user_id`. Exam-specific data also references `exam_profile_id` where applicable.

---

# Future Database Expansion

Possible future tables and features:

## File Uploads

Stores:

- uploaded documents
- audio recordings
- file metadata

## Speaking Practice

Stores:

- audio recordings
- speech evaluations
- pronunciation feedback

## Vocabulary Tracking

Stores:

- learned words
- review history
- difficulty level

## Learning Resources

Stores:

- articles
- exercises
- practice materials

---

# Database Design Principles

The schema should:

- Support multiple languages
- Support multiple exams and scoring models
- Keep user data separated
- Separate diagnostic assessments from practice submissions
- Allow future feature expansion
- Work efficiently with Drizzle ORM
- Never store passwords (authentication handled by Neon Auth)
