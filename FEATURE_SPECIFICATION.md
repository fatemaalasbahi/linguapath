# LinguaPath Feature Specification

## Overview

This document defines the required features for the LinguaPath MVP.

LinguaPath is an AI-powered language proficiency coaching platform that helps students prepare for language exams through assessment, personalized planning, AI feedback, and progress tracking.

The frontend uses **Next.js App Router** with TypeScript and Tailwind CSS.

---

# MVP Features

## 1. User Authentication

### Description

Users must be able to create accounts and securely access their personal learning data.

Authentication will use:

- Neon Auth

Passwords are **not** stored in the application database. The application `users` table stores profile information and references the Neon Auth user ID.

### User Capabilities

Users can:

- Register an account
- Log in
- Log out
- Access their personal dashboard

### Requirements

- Each user's data must remain private
- Users should only see their own assessments, study plans, practice submissions, and progress

---

# 2. User Profile and Exam Goals

## Description

After creating an account, users define their language learning goals.

### User Inputs

Users provide:

- Preferred language
- Exam type
- Exam date
- Available study time per week

Goal fields depend on the exam scoring model:

**Numeric exams (e.g. DET):**

- Current score (if available)
- Target score

**Level-based exams (e.g. HSK):**

- Current level
- Target level

---

## Example — DET

```
Language:
English

Exam:
Duolingo English Test

Current Score:
95

Target Score:
120

Exam Date:
June 2027
```

---

## Example — HSK

```
Language:
Chinese

Exam:
HSK

Current Level:
HSK 3

Target Level:
HSK 5

Exam Date:
June 2027
```

---

# 3. AI Diagnostic Assessment

## Description

The system evaluates the user's current language ability through an initial diagnostic assessment.

Diagnostic assessments are stored separately from ongoing practice submissions.

The assessment helps identify:

- Current proficiency level or estimated score
- Strengths
- Weaknesses
- Areas requiring improvement

---

## AI Input

The AI receives:

- Language
- Exam type
- User responses
- Writing samples
- Previous scores or levels (if available)

---

## AI Output

The system generates:

- Estimated score or level
- Skill evaluation
- Improvement suggestions

Results are stored in the `assessments` table.

---

## Example Output (DET)

```
Estimated DET Score:

105

Strengths:

- Good sentence structure
- Clear ideas

Areas to Improve:

- Academic vocabulary
- Grammar accuracy

Recommendation:

Practice advanced vocabulary daily.
```

---

# 4. Personalized Study Plan Generator

## Description

The AI creates a personalized study schedule based on the user's goals.

---

## Inputs

The AI considers:

- Current level or score
- Target level or score
- Exam date
- Available study time
- Weak skills

---

## Output

The system creates:

- Daily tasks
- Weekly goals
- Practice recommendations
- Learning priorities

Results are stored in the `study_plans` table.

---

## Example

```
Week 1:

Writing:
Practice essay structure

Vocabulary:
Learn 50 academic words

Reading:
Complete two practice passages
```

---

# 5. AI Language Practice Feedback

## Description

Students can submit practice activities and receive AI feedback.

Practice submissions are stored in the `practice_submissions` table, separate from diagnostic assessments.

---

## Supported Practice Types

MVP:

- Writing practice

Future:

- Speaking practice
- Reading practice
- Listening practice

---

## AI Feedback Includes

- Grammar corrections
- Vocabulary suggestions
- Structure improvements
- Estimated score or level
- Explanation of mistakes

---

# 6. Student Dashboard

## Description

The dashboard displays the student's learning progress.

---

## Dashboard Information

Users can view:

- Current estimated score or level
- Target score or level (based on exam type)
- Progress percentage
- Completed activities
- Weak skills
- Study plan

---

# 7. Progress Tracking

## Description

The system stores learning history and shows improvement over time.

---

## Tracked Information

Examples:

- Assessment results
- Practice submissions
- Completed tasks
- Score or level improvements

Progress records are stored in the `progress` table and linked to user activity.

---

# 8. Feedback System

## Description

Users can submit feedback about the application.

---

## Feedback Information

Users can provide:

- Comments
- Suggestions
- Bug reports

---

## Requirements

Feedback must:

- Be stored in the database
- Trigger a Slack notification

---

# 9. Notification System

## Description

The system provides Slack notifications for key application events.

---

## MVP Notifications

Slack notifications:

- New feedback submitted
- Important system events

---

## Future Notifications

Possible additions:

- Study reminders
- Progress updates
- Exam countdown reminders
- Email notifications

---

# 10. Landing Page

## Description

The public landing page introduces LinguaPath.

---

## Required Sections

### Hero Section

Includes:

- Product name
- Short description
- Call-to-action button

### Problem Section

Explains:

- Language exam difficulties
- Lack of personalized preparation

### Solution Section

Explains:

- AI assessment
- Personalized plans
- Progress tracking

### Features Section

Highlights:

- AI coaching
- Study plans
- Feedback
- Progress tracking

### Footer

Includes:

- Contact information
- Feedback option

---

# Technical Requirements

The MVP must include:

✅ Next.js App Router  
✅ User authentication (Neon Auth)  
✅ Multiple users  
✅ User-specific data storage  
✅ Neon PostgreSQL database  
✅ Drizzle ORM  
✅ AI-powered functionality  
✅ Gemini API integration  
✅ Slack notification system  
✅ Responsive UI  
✅ Vercel deployment  

---

# MVP User Flow

```
User Visits Website

↓

Creates Account

↓

Chooses Language Exam

↓

Sets Target Goal (Score or Level)

↓

Completes AI Diagnostic Assessment

↓

Receives Study Plan

↓

Practices

↓

Receives AI Feedback

↓

Tracks Progress
```

---

# Non-Goals for MVP

To keep the project achievable, the MVP will not include:

- File uploads
- Live speaking evaluation
- Video lessons
- Social networking
- Teacher marketplace
- Mobile application
- Email notifications

These can be future improvements.
