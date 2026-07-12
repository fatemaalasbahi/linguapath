# LinguaPath Cursor Development Guide

## Project Overview

You are helping build **LinguaPath**, an AI-powered language proficiency coaching platform.

LinguaPath helps students prepare for language proficiency exams by:

- Evaluating their current language ability
- Identifying weaknesses
- Generating personalized study plans
- Providing AI-powered feedback
- Tracking progress toward their goals

The MVP focuses on:

- Duolingo English Test (DET)
- HSK Chinese Proficiency Test

The platform should be designed so additional languages and exams can be added in the future.

---

# Course Alignment

This project should follow the TECHNEST AI Programming course approach.

The goal is to demonstrate:

- AI-assisted development using Cursor
- Full-stack application development
- Database integration
- Authentication
- AI-powered features
- Cloud deployment
- Professional software workflow

The project should follow the technologies and approaches taught in the course.

---

# Technology Stack

## Frontend

Use:

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

The application must use the **Next.js App Router** (`src/app/`). Do not use the Pages Router.

---

## Deployment

Use:

- Vercel

---

## Database

Use:

- Neon PostgreSQL

---

## Database ORM

Use:

- Drizzle ORM

---

## Authentication

Use:

- Neon Auth

Authentication must support:

- User registration
- User login
- User sessions
- Protected user data

The application `users` table stores profile information and references the Neon Auth user ID. Passwords are **not** stored in the application database.

---

## AI Integration

Use:

- Gemini API

AI will power:

- Diagnostic assessments
- Writing evaluation
- Personalized study plans
- Learning recommendations

---

## Notifications

Use:

- Slack Webhook

The system should send notifications for:

- User feedback submissions
- Important application events

---

# Development Principles

## Build Incrementally

Do not build the entire application at once.

Development should happen in small, testable phases. Do not add features outside the MVP scope.

---

# Development Phases

Use this order:

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

## Phase 1: Project Setup

Create:

- Next.js App Router application
- TypeScript
- Tailwind CSS
- GitHub connection

---

## Phase 2: Landing Page

Build:

- Public landing page
- Hero, problem, solution, features, and footer sections

---

## Phase 3: Database Setup

Implement:

- Neon PostgreSQL connection
- Drizzle ORM setup
- Database schema (see DATABASE_SCHEMA.md)

---

## Phase 4: Authentication

Implement:

- Neon Auth integration
- Protected routes
- User sessions
- Application `users` table linked to Neon Auth user ID

---

## Phase 5: Dashboard + Exam Goals

Build:

- User dashboard
- Exam selection
- Goal setting (score or level, depending on exam type)

---

## Phase 6: AI Diagnostic Assessment

Build:

- Diagnostic assessment flow
- Gemini integration for initial evaluation
- Store results in `assessments` table

---

## Phase 7: AI Study Plan Generation

Build:

- Personalized study plan generation
- Store plans in `study_plans` table

---

## Phase 8: Practice Feedback + Progress Tracking

Build:

- Writing practice submission flow
- AI feedback on practice responses
- Store submissions in `practice_submissions` table
- Progress tracking in `progress` table

---

## Phase 9: Slack Notifications + Feedback System

Build:

- User feedback form
- Store feedback in `feedback` table
- Slack webhook notifications

---

## Phase 10: Deployment

Prepare:

- Environment variables
- Vercel deployment
- Final testing

---

# Before Making Changes

Before implementing any feature:

Explain:

1. What will be built
2. Why the feature is needed
3. Which files will change
4. Which dependencies are required

Wait for approval before major architectural changes.

---

# After Implementing Features

Explain:

1. What was changed
2. How the feature works
3. How to test it
4. Any possible issues

---

# Coding Rules

Follow these rules:

- Use TypeScript
- Write clean and reusable components
- Follow Next.js App Router best practices
- Keep components organized
- Avoid unnecessary dependencies
- Keep secrets in environment variables
- Never hardcode API keys
- Avoid unfinished features
- Prefer simple reliable solutions
- Do not add MVP features beyond the documented scope

---

# Project Structure

Use the following structure:

```
src/
│
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── auth/
│   ├── dashboard/
│   ├── assessment/
│   ├── practice/
│   └── landing/
│
├── lib/
│   ├── db/
│   │   ├── index.ts
│   │   └── schema.ts
│   │
│   ├── ai/
│   │   └── gemini.ts
│   │
│   ├── auth/
│   │
│   └── utils.ts
│
└── types/
```

---

# Database Guidelines

Use:

- Neon PostgreSQL
- Drizzle ORM

Refer to DATABASE_SCHEMA.md for the full schema.

The database should support:

## Users

Application profile information linked to Neon Auth user ID. No passwords stored.

---

## Exam Profiles

Stores:

- Language
- Exam type
- Scoring model (`numeric` or `level`)
- Current score / target score (numeric exams)
- Current level / target level (level-based exams)
- Exam date
- Available study time

---

## Assessments

Stores diagnostic assessment results only:

- Student answers
- AI evaluation
- Estimated score or level
- Strengths
- Weaknesses
- Recommendations

---

## Practice Submissions

Stores ongoing practice responses separately from diagnostics:

- Submission type
- Student response
- AI feedback
- Score (if applicable)

---

## Study Plans

Stores:

- AI-generated learning schedules
- Goals
- Tasks

---

## Progress

Stores:

- Completed activities
- Scores or levels
- Improvement history

---

## Feedback

Stores:

- User comments
- Suggestions
- Bug reports

---

# Exam Scoring Models

Support different exam systems:

**Numeric exams (e.g. DET):** `current_score`, `target_score`

**Level-based exams (e.g. HSK):** `current_level`, `target_level`

---

# AI Feature Requirements

AI must be a core part of the application.

The product should lose significant value without AI.

---

## Diagnostic Assessment

Input:

- Language
- Exam type
- Student responses

Output:

- Estimated proficiency (score or level)
- Strengths
- Weaknesses
- Recommendations

Stored in: `assessments` table

---

## Personalized Study Plan

Input:

- Current level or score
- Target level or score
- Exam date
- Available study time

Output:

- Daily tasks
- Weekly goals
- Learning roadmap

Stored in: `study_plans` table

---

## Practice Feedback

Input:

- Student writing response

Output:

- Grammar feedback
- Vocabulary suggestions
- Score or level estimation
- Improvement tips

Stored in: `practice_submissions` table

---

# Non-Goals for MVP

Do not implement these in the MVP:

- File uploads
- Live speaking evaluation
- Video lessons
- Social networking
- Teacher marketplace
- Mobile application
- Email notifications

---

# Final User Journey

```
Create Account

↓

Select Language Exam

↓

Set Target Goal (Score or Level)

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

# Final Product Expectations

The final LinguaPath product should demonstrate:

- A working full-stack application
- AI as a central feature
- Authentication
- Database usage
- Professional UI
- Deployment
- Clear user value
