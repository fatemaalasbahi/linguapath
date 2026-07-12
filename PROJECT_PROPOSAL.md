# LinguaPath
## AI-Powered Language Proficiency Coach

---

# Project Overview

LinguaPath is an AI-powered language proficiency coaching platform designed to help students achieve their target scores in language proficiency exams.

The platform evaluates a student's current language ability, identifies areas for improvement, generates personalized study plans, provides AI-powered feedback, and tracks progress over time.

The MVP will focus on:

- Duolingo English Test (DET)
- HSK Chinese Proficiency Test

The platform is designed for students who need language certification for:

- University admission
- Immigration requirements
- Scholarships
- Professional opportunities

---

# Problem Statement

Many students preparing for language proficiency exams struggle because they do not know:

- Their current proficiency level
- Which skills they need to improve
- How to create an effective study schedule
- Whether their preparation is helping them improve

Existing resources often provide general learning materials but lack personalized guidance based on the student's current level and goals.

Students need a system that understands their situation and provides a personalized preparation path.

---

# Proposed Solution

LinguaPath acts as an AI-powered personal language exam coach.

The platform helps students:

1. Assess their current language level
2. Identify strengths and weaknesses
3. Create a personalized study roadmap
4. Practice language skills
5. Receive AI-generated feedback
6. Track progress toward their target goal

---

# Target Users

Primary users:

- International students preparing for university admission
- Students preparing for language proficiency exams
- Individuals applying for visas requiring language certification
- Students who need structured study guidance

---

# Supported Exams

## MVP Supported Exams

### Duolingo English Test (DET)

Scoring model: **numeric**

Features:

- Current score assessment
- Target score selection
- AI writing evaluation
- AI feedback
- Personalized study plan
- Progress tracking

### HSK Chinese Proficiency Test

Scoring model: **level-based**

Features:

- Current HSK level selection
- Target HSK level selection
- Vocabulary improvement plans
- Study roadmap
- Progress tracking

---

# Exam Scoring Models

The platform must support different exam systems.

### Numeric Exams (e.g. DET)

Use:

- `current_score`
- `target_score`

### Level-Based Exams (e.g. HSK)

Use:

- `current_level`
- `target_level`

The application should display and track the appropriate fields based on the selected exam type.

---

# Future Expansion

The platform can later support:

- IELTS
- TOEFL
- CELPIP
- JLPT
- Other language proficiency exams

The architecture should allow adding new languages and exams without major changes.

Future improvements may also include:

- File uploads (e.g. document or audio submissions)
- Email notifications
- Study reminders and exam countdown alerts

---

# Main User Journey

```
Create Account

↓

Select Language and Exam

↓

Set Current Level and Target Goal

↓

Complete AI Diagnostic Assessment

↓

Receive Personalized Study Plan

↓

Practice Language Skills

↓

Receive AI Feedback

↓

Track Progress
```

---

# Core AI Features

## AI Diagnostic Assessment

The AI evaluates the student's current ability through diagnostic questions and responses.

This is separate from ongoing practice submissions.

The assessment identifies:

- Grammar ability
- Vocabulary level
- Writing quality
- Common mistakes
- Estimated proficiency level or score

---

## Personalized Study Plan Generator

The AI creates a customized learning schedule based on:

- Current ability
- Target goal (score or level)
- Exam date
- Available study time

---

## AI Practice Feedback

Students submit practice answers stored in the `practice_submissions` table.

The AI provides:

- Corrections
- Explanations
- Suggestions
- Score or level estimation
- Improvement recommendations

---

# Technology Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Database

- Neon PostgreSQL

## Database ORM

- Drizzle ORM

## Authentication

- Neon Auth

Authentication is handled by Neon Auth. The application `users` table stores profile information and references the Neon Auth user ID. Passwords are not stored in the application database.

## AI

- Gemini API

## Deployment

- Vercel

## Notifications

- Slack Webhook

## Version Control

- GitHub

---

# Development Approach

LinguaPath will be developed incrementally in small, testable phases.

| Phase | Focus |
|-------|-------|
| Phase 1 | Project setup |
| Phase 2 | Landing page |
| Phase 3 | Database setup (Neon + Drizzle) |
| Phase 4 | Authentication (Neon Auth) |
| Phase 5 | Dashboard + Exam Goals |
| Phase 6 | AI Diagnostic Assessment |
| Phase 7 | AI Study Plan Generation |
| Phase 8 | Practice Feedback + Progress Tracking |
| Phase 9 | Slack Notifications + Feedback System |
| Phase 10 | Deployment |

---

# Expected Final Product

A completed LinguaPath application should allow students to:

- Create an account
- Choose a language exam
- Set their goals (score or level, depending on exam type)
- Complete an AI diagnostic assessment
- Receive a personalized study plan
- Practice language skills
- Receive AI feedback on practice submissions
- Track improvement

The final product should demonstrate:

- AI-powered functionality
- Full-stack development
- Database integration
- Authentication
- Professional UI/UX
- Cloud deployment
