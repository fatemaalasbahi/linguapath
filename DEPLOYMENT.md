# LinguaPath Deployment Guide

This document covers deployment to Vercel and production verification for the LinguaPath MVP.

**Production URL:** [https://linguapath-jet.vercel.app](https://linguapath-jet.vercel.app)

---

## Prerequisites

- Vercel project linked to the GitHub repository (`main` branch)
- Neon PostgreSQL database with all migrations applied
- Neon Auth configured with production URL in trusted domains
- Gemini API key with billing/quota enabled
- Slack incoming webhook (optional, for feedback notifications)

---

## Environment Variables (Vercel)

Set these in **Vercel → Project → Settings → Environment Variables** for Production (and Preview if needed):

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | Yes | Pooled Neon connection string |
| `NEON_AUTH_BASE_URL` | Yes | From Neon Console → Auth |
| `NEON_AUTH_COOKIE_SECRET` | Yes | Same secret as local; 32+ characters |
| `GEMINI_API_KEY` | Yes | Server-only |
| `GEMINI_MODEL` | No | Optional model override |
| `SLACK_WEBHOOK_URL` | No | Server-only; never exposed to client |

Do **not** commit `.env.local` or paste secrets into the repository.

`DATABASE_URL_UNPOOLED` is for local/CI migrations only (`npm run db:migrate`), not required on Vercel runtime.

---

## Pre-Deploy Checklist

- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] `npm run db:test` passes against the target Neon branch
- [ ] All Drizzle migrations applied (`0000` through latest)
- [ ] Vercel environment variables set (see table above)
- [ ] Neon Auth trusted domains include production URL
- [ ] `.npmrc` contains `legacy-peer-deps=true` (Neon Auth peer deps)

---

## Deploy

Pushes to `main` trigger automatic Vercel production deployments.

Manual redeploy: Vercel dashboard → Deployments → Redeploy.

Confirm:

- [ ] Deployment state is **READY**
- [ ] Build logs show no errors
- [ ] Commit SHA matches expected release

---

## Production Smoke Test

### Auth and routing

- [ ] Landing page loads at production URL
- [ ] Sign up creates account and redirects through `/auth/continue`
- [ ] Sign in works for returning user
- [ ] Sign out clears session
- [ ] Protected routes redirect to `/sign-in` when signed out

### Core flows

- [ ] Exam goal setup saves (DET and/or HSK paths)
- [ ] Diagnostic assessment completes and shows results
- [ ] Study plan generates successfully
- [ ] Writing practice returns AI feedback and updates progress
- [ ] Progress page shows data or empty state
- [ ] Feedback form saves and Slack notification arrives (if webhook configured)

### Rate limits

- [ ] Study plan limit message after 5 generations / 24h
- [ ] Practice limit message after 10 evaluations / 24h
- [ ] Feedback limit message after 5 submissions / 24h

### UI / responsive

- [ ] Desktop sidebar navigation works; active states correct
- [ ] Mobile bottom navigation works; no overlap with form buttons
- [ ] Error and empty states render correctly

---

## Link, Route, and Console Verification

Run after each production deploy or significant UI change.

### Broken links

- [ ] Landing header/footer links resolve (Features, How It Works, Sign In, Get Started, GitHub)
- [ ] No `href="#"` placeholders remain on user-facing pages (except intentional in-page anchors)
- [ ] Dashboard feature links resolve: `/assessment`, `/study-plan`, `/practice`, `/progress`
- [ ] Sidebar and mobile nav links resolve for all items
- [ ] Assessment results CTA links resolve (`/study-plan`)

### 404 routes

Verify these routes do **not** return 404 for authenticated users with a completed exam profile:

| Route | Expected |
|-------|----------|
| `/` | 200 |
| `/sign-in` | 200 |
| `/sign-up` | 200 |
| `/dashboard` | 200 (or redirect to setup if no profile) |
| `/exam-goals/setup` | 200 |
| `/assessment` | 200 |
| `/study-plan` | 200 |
| `/practice` | 200 |
| `/progress` | 200 |
| `/feedback` | 200 |
| `/nonexistent-page` | 404 (Next.js not-found) |

### Browser console

On production, with DevTools open:

- [ ] Landing page: no uncaught errors
- [ ] Sign-in / sign-up: no uncaught errors
- [ ] Dashboard: no uncaught errors
- [ ] Assessment submit flow: no uncaught errors (ignore expected network errors if testing rate limits)
- [ ] No exposed secrets or webhook URLs in client bundle or console logs

---

## Post-Deploy Checklist

- [ ] README production URL is current
- [ ] Latest deployment verified against this checklist
- [ ] Known limitations documented in README remain accurate

---

## Troubleshooting

| Issue | Check |
|-------|-------|
| Sign-up 404 or wrong route | Neon Auth `basePath=""` in `providers.tsx`; trusted domains |
| Invalid origin on auth | Add production URL to Neon Auth trusted domains |
| Database errors | `DATABASE_URL` in Vercel; migrations applied |
| Gemini failures | `GEMINI_API_KEY`; model name; API quota |
| Slack not firing | `SLACK_WEBHOOK_URL` in Vercel; feedback still saves without it |
| Vercel install failure | `.npmrc` `legacy-peer-deps=true` |
