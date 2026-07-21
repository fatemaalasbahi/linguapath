# LinguaPath

AI-powered language exam preparation coach for students preparing for certification exams such as the Duolingo English Test (DET) and HSK Chinese Proficiency Test.

**Production:** [https://linguapath-jet.vercel.app](https://linguapath-jet.vercel.app)

## Overview

LinguaPath helps students:

- Set exam goals for DET or HSK
- Complete an AI diagnostic writing assessment
- Receive a personalized weekly study plan
- Practice writing with AI feedback
- Track estimated progress over time
- Submit product feedback (stored in the database with optional Slack notification)

This repository contains the MVP built for the TECHNEST AI Programming course.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS |
| Authentication | Neon Auth |
| Database | Neon PostgreSQL |
| ORM | Drizzle ORM |
| AI | Google Gemini API |
| Notifications | Slack Incoming Webhook |
| Deployment | Vercel |

## Installation

### Prerequisites

- Node.js 20 LTS or later
- npm
- Neon PostgreSQL database
- Neon Auth project
- Gemini API key
- Slack webhook URL (optional, for feedback notifications)

### Setup

```bash
git clone https://github.com/fatemaalasbahi/linguapath.git
cd linguapath
npm install
cp .env.example .env.local
```

Fill in `.env.local` (see [Environment Variables](#environment-variables)), then apply migrations:

```bash
npm run db:migrate
npm run db:test
```

## Environment Variables

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

| Variable | Required | Vercel | Local | Purpose |
|----------|----------|--------|-------|---------|
| `DATABASE_URL` | Yes | Yes | Yes | Pooled Neon connection for Next.js runtime |
| `DATABASE_URL_UNPOOLED` | For migrations | No* | Yes | Direct connection for Drizzle Kit CLI |
| `NEON_AUTH_BASE_URL` | Yes | Yes | Yes | Neon Auth endpoint (Neon Console → Auth) |
| `NEON_AUTH_COOKIE_SECRET` | Yes | Yes | Yes | Session cookie signing secret (32+ chars) |
| `GEMINI_API_KEY` | Yes | Yes | Yes | Google Gemini API key |
| `GEMINI_MODEL` | No | Yes | Yes | Model override (defaults in code if unset) |
| `SLACK_WEBHOOK_URL` | No | Yes | Yes | Server-only webhook for feedback notifications |

\*Use `DATABASE_URL_UNPOOLED` locally or in CI when running `npm run db:migrate`. Runtime on Vercel uses `DATABASE_URL` only.

Also configure **Neon Auth trusted domains** to include your production URL (for example `linguapath-jet.vercel.app`).

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Run production build locally |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate Drizzle migration from schema |
| `npm run db:migrate` | Apply migrations |
| `npm run db:test` | Verify DB connection, tables, and feedback constraints |

## Deployment

LinguaPath deploys to Vercel with automatic builds from `main`.

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full pre-deploy, production smoke-test, and post-deploy verification checklist.

Summary:

1. Set all required environment variables in the Vercel project.
2. Add the production URL to Neon Auth trusted domains.
3. Run `npm run db:migrate` against the production Neon branch before or after deploy.
4. Confirm the latest Vercel deployment is **READY**.
5. Run the production smoke tests in `DEPLOYMENT.md`.

Vercel uses `.npmrc` (`legacy-peer-deps=true`) for Neon Auth peer dependencies.

## Architecture Summary

```
Browser
  → Next.js App Router (React Server Components + Client Components)
  → Middleware (Neon Auth session guard on protected routes)
  → Server Actions (exam goals, assessment, study plan, practice, feedback)
  → Drizzle ORM → Neon PostgreSQL
  → Gemini API (assessment, study plan, practice feedback)
  → Slack Webhook (feedback notifications, server-only)
```

### Route groups

| Group | Routes | Notes |
|-------|--------|-------|
| Marketing | `/` | Landing page |
| Auth | `/sign-in`, `/sign-up`, `/auth/continue` | Neon Auth UI |
| Dashboard | `/dashboard`, `/exam-goals/setup`, `/assessment`, `/study-plan`, `/practice`, `/progress`, `/feedback`, `/reading`, `/listening`, `/speaking`, `/mock-exam` | Protected; sidebar + mobile nav |

### Key directories

```
src/
├── app/              # Pages, layouts, server actions
├── components/       # UI by feature (dashboard, assessment, layout, …)
├── lib/              # Database, auth, AI, domain logic
└── middleware.ts     # Auth protection for app routes
```

## Screenshots

<!-- Optional: add screenshots of the landing page, dashboard, assessment, and feedback form -->

| Page | Screenshot |
|------|------------|
| Landing | _Coming soon_ |
| Dashboard | _Coming soon_ |
| Assessment | _Coming soon_ |
| Feedback | _Coming soon_ |

## Known Limitations

- **Exams supported:** DET and HSK only (writing-focused MVP).
- **AI estimates:** Scores and levels are AI-generated, not official exam results.
- **Writing only:** No speaking, reading, listening, or file-upload flows.
- **Single exam profile:** One exam goal per user.
- **Rate limits (rolling 24 hours):** study plan generation 5/day, practice evaluations 10/day, feedback submissions 5/day. Diagnostic assessment has no rate limit.
- **Slack optional:** Feedback is saved even if the webhook fails.
- **No account settings UI** beyond sign-in, sign-up, and sign-out.

## Future Improvements

Not in the MVP scope:

- Additional exams (IELTS, TOEFL, JLPT, …)
- Speaking evaluation and file uploads
- Email reminders and study notifications
- Native mobile app
- Teacher marketplace or social features
- Settings / profile management beyond auth

Roadmap pages for **Reading**, **Listening**, **Speaking**, and **Mock Exam** are now visible in the authenticated app (sidebar and mobile navigation) with Coming Soon badges. These routes describe planned capabilities but do not yet provide the features.

See [UI_UX_DESIGN.md](./UI_UX_DESIGN.md) and [FEATURE_SPECIFICATION.md](./FEATURE_SPECIFICATION.md) for full non-goals.

## Project Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) — deployment and verification checklist
- [PROJECT_PROPOSAL.md](./PROJECT_PROPOSAL.md)
- [FEATURE_SPECIFICATION.md](./FEATURE_SPECIFICATION.md)
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- [CURSOR_PROJECT_GUIDE.md](./CURSOR_PROJECT_GUIDE.md)
- [UI_UX_DESIGN.md](./UI_UX_DESIGN.md)

## Development Phases

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Project setup | Complete |
| 2 | Landing page | Complete |
| 3 | Database (Neon + Drizzle) | Complete |
| 4 | Authentication (Neon Auth) | Complete |
| 5 | Dashboard + Exam Goals | Complete |
| 6 | AI Diagnostic Assessment | Complete |
| 7 | AI Study Plan Generation | Complete |
| 8 | Practice + Progress Tracking | Complete |
| 9 | Feedback + Slack Notifications | Complete |
| 10 | Final polish + deployment verification | Complete |

## License

Private — TECHNEST AI Programming course project.
