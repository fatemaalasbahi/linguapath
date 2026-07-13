# LinguaPath

AI-powered language exam preparation coach for students preparing for certification exams such as the Duolingo English Test (DET) and HSK Chinese Proficiency Test.

## Overview

LinguaPath helps students:

- Assess their current language level
- Receive personalized study plans
- Practice writing with AI feedback
- Track progress toward certification goals

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS |
| Authentication | Neon Auth |
| Database | Neon PostgreSQL |
| ORM | Drizzle ORM |
| AI | Gemini API |
| Notifications | Slack Webhook |
| Deployment | Vercel |

## Project Documentation

- [PROJECT_PROPOSAL.md](./PROJECT_PROPOSAL.md)
- [FEATURE_SPECIFICATION.md](./FEATURE_SPECIFICATION.md)
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- [CURSOR_PROJECT_GUIDE.md](./CURSOR_PROJECT_GUIDE.md)
- [UI_UX_DESIGN.md](./UI_UX_DESIGN.md)

## Getting Started

### Prerequisites

- Node.js 20 LTS or later
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy the template and configure as needed for each development phase:

```bash
cp .env.example .env.local
```

Phase 1 does not require environment variables to run locally.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages and API routes
│   ├── (auth)/       # Authentication routes (Phase 4)
│   ├── (dashboard)/  # Protected app routes (Phase 5+)
│   └── api/          # API route handlers
├── components/       # React components by feature
├── lib/              # Utilities, database, AI, auth helpers
└── types/            # Shared TypeScript types
```

## Development Phases

| Phase | Focus |
|-------|-------|
| 1 | Project setup |
| 2 | Landing page |
| 3 | Database setup (Neon + Drizzle) |
| 4 | Authentication (Neon Auth) |
| 5 | Dashboard + Exam Goals |
| 6 | AI Diagnostic Assessment |
| 7 | AI Study Plan Generation |
| 8 | Practice Feedback + Progress Tracking |
| 9 | Slack Notifications + Feedback System |
| 10 | Deployment |

## License

Private — TECHNEST AI Programming course project.
