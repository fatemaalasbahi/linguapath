# LinguaPath UI/UX Design System

## Document Purpose

This document is the **single design reference** for the LinguaPath application.

All UI implementation — landing page, authentication, dashboard, AI features, and feedback flows — should follow the guidelines defined here.

LinguaPath is a **focused AI SaaS MVP** built as part of the **TECHNEST AI Programming** course. The design supports only documented MVP features. Anything outside MVP scope is listed under Future Improvements.

## Technology Alignment

| Layer | Technology |
|-------|------------|
| Frontend | Next.js App Router, React, TypeScript, Tailwind CSS |
| Authentication | Neon Auth (session-based) |
| Database | Neon PostgreSQL |
| ORM | Drizzle ORM |
| AI | Gemini API |
| Notifications | Slack Webhook |
| Deployment | Vercel |

**Design goal:** A modern AI SaaS product that feels trustworthy, intelligent, and easy to use for **language exam preparation** — not casual language learning.

---

## MVP Scope

The design system covers **only** these MVP features:

| Feature | Description |
|---------|-------------|
| Landing page | Public marketing page |
| Authentication | Sign in, sign up, sessions (Neon Auth) |
| Exam goal setup | Language, exam, goals, exam date |
| AI diagnostic assessment | Initial proficiency evaluation |
| AI study plan | Personalized weekly schedule |
| Writing practice | Practice submissions with AI feedback |
| Progress tracking | Score/level history and activity log |
| Feedback submission | User feedback + Slack notification |

## Future Improvements

The following are **not** part of the MVP design. Do not wireframe or build UI for these unless explicitly approved later:

- Speaking evaluation
- File uploads
- Video lessons
- Social features
- Teacher marketplace
- Mobile application (native)
- Email reminders
- Advanced notifications (study reminders, exam countdown, progress digests)
- Settings / account management beyond auth
- Reading, listening, or speaking practice flows

---

# 1. Brand Identity

## Name

**LinguaPath** — combines *lingua* (language) and *path* (personalized journey).

## Tagline

**Your AI path to language exam success.**

## Positioning

**AI-powered language exam preparation coach**

LinguaPath helps students prepare for **certification exams** (DET, HSK) — not casual language learning.

## Short Descriptions

- AI-powered language exam preparation coach
- Personalized exam prep with AI assessment and feedback
- Understand your level, get a plan, track progress toward certification

## Logo Concept

- **Wordmark:** "Lingua" in primary brand color, "Path" in neutral dark with a subtle accent on the "P" or path motif.
- **Icon mark:** Abstract path or upward arrow integrated with a speech/language element (e.g. minimal chat bubble + ascending line).
- **Usage:** Icon mark for favicon and mobile; full wordmark for desktop header and landing hero.

## Visual Tone

| Attribute | Direction |
|-----------|-----------|
| Style | Clean, modern, minimal |
| Mood | Confident, supportive, professional |
| Density | Spacious — avoid clutter |
| Imagery | Light use of abstract gradients or line illustrations; no stock photo overload |
| AI presence | Subtle — indicated through accent color, sparkle/AI badges, and clear "AI-generated" labels |

## Brand Don'ts

- Do not position as a general language-learning app
- Do not mimic gamified language apps (no mascots, streak flames, daily streaks, or cartoon UI)
- Do not use overly playful colors or childish illustrations
- Do not overwhelm pages with AI buzzwords — show value through clarity

## Messaging Focus

Emphasize:

- Understanding your current exam level
- Personalized preparation plan
- AI feedback on practice
- Progress toward certification goals

Avoid:

- "Learn a new language for fun"
- Gamification language (streaks, XP, leaderboards)
- Casual or travel-language-learning framing

---

# 2. Product Personality

LinguaPath should feel like a **personal exam coach**, not a generic study tool or language app.

## Personality Traits

| Trait | How it shows in UI |
|-------|-------------------|
| **Supportive** | Encouraging microcopy after assessments; progress celebrated without exaggeration |
| **Clear** | Plain language, obvious next steps, no jargon |
| **Intelligent** | Structured AI feedback, organized insights, confidence without hype |
| **Focused** | One primary action per screen; minimal distractions |
| **Trustworthy** | Professional layout, consistent patterns, transparent AI labeling |

## Voice & Tone

- **Voice:** Knowledgeable, calm, encouraging.
- **Tone:** Direct and respectful — speak to motivated adults preparing for important exams.
- **Avoid:** Slang, excessive exclamation marks, fear-based messaging ("Don't fail your exam!"), casual learning app language.

## Example Microcopy

| Context | Copy |
|---------|------|
| Landing hero | "AI-powered language exam preparation coach" |
| Empty dashboard | "Set your exam goal to get started." |
| Assessment intro | "This short diagnostic helps us understand your current level." |
| AI feedback header | "AI Feedback" with subtitle "Review suggestions to improve your writing." |
| AI study plan header | "AI-generated Study Plan" |
| Loading AI | "Analyzing your response…" |
| Success | "Study plan ready. Let's begin Week 1." |
| Score disclaimer | "Estimated Score — not an official exam result." |

---

# 3. Target Audience

## Primary Users

- International students preparing for university admission
- Students preparing for DET or HSK exams
- Individuals needing language certification for visas or scholarships
- Self-directed learners who want structured exam guidance

## User Needs

- Understand their current exam level quickly
- Know what to study and when for their target exam
- Get actionable AI feedback on writing practice
- See measurable progress toward certification goals
- Use the product on laptop, tablet, or phone (responsive web)

## Design Implications

- **Low cognitive load:** Exam prep is stressful — UI must reduce friction.
- **International audience:** Simple English in UI; support varied name formats; date inputs clear (exam date).
- **Responsive web:** Dashboard and practice must work on small screens (not a native mobile app).
- **Goal-oriented:** Always show context — which exam, current vs. target score or level.
- **Exam-type aware:** UI adapts fields and labels based on numeric (DET) vs. level-based (HSK) exams.

---

# 4. Exam Scoring UI

The platform supports **two scoring systems**. The UI must adapt dynamically based on exam type — do not assume all exams use numeric scores.

## Numeric Exams (e.g. Duolingo English Test)

| UI Label | Example |
|----------|---------|
| Current Score | 105 |
| Target Score | 120 |
| Estimated Score | 105 |
| Progress | 95 → 108 (+13 pts) |

**Input type:** Integer fields or number steppers.

## Level-Based Exams (e.g. HSK)

| UI Label | Example |
|----------|---------|
| Current Level | HSK 3 |
| Target Level | HSK 5 |
| Estimated Level | HSK 4 |
| Progress | HSK 3 → HSK 4 |

**Input type:** Select dropdown (HSK 1–6).

## Dynamic Adaptation Rules

| Screen | Behavior |
|--------|----------|
| Exam Goal Setup | Show score fields OR level fields based on selected exam |
| Dashboard stat cards | Labels read "Current Score" / "Target Score" or "Current Level" / "Target Level" |
| Assessment results | Show "Estimated Score" or "Estimated Level" with AI disclaimer |
| Practice feedback | Show "Estimated Score" or "Estimated Level" as applicable |
| Study Plan subtitle | `DET · Target 120` or `HSK · Target HSK 5` |
| Progress page | Numeric trend chart OR level progression display |

## Exam Type Mapping (MVP)

| Language | Exam | Scoring Model |
|----------|------|---------------|
| English | DET | Numeric |
| Chinese | HSK | Level-based |

---

# 5. Color Palette

Designed for Tailwind CSS. Custom properties can mirror these tokens.

## Primary

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-600` | `#4F46E5` | Primary buttons, links, active nav |
| `primary-700` | `#4338CA` | Button hover, emphasis |
| `primary-50` | `#EEF2FF` | Light backgrounds, selected states |
| `primary-100` | `#E0E7FF` | Badges, subtle highlights |

**Rationale:** Indigo conveys trust and professionalism — common in modern SaaS.

## Neutral

| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-900` | `#0F172A` | Headings, primary text |
| `neutral-700` | `#334155` | Body text |
| `neutral-500` | `#64748B` | Secondary text, placeholders |
| `neutral-200` | `#E2E8F0` | Borders, dividers |
| `neutral-100` | `#F1F5F9` | Page backgrounds (alt) |
| `neutral-50` | `#F8FAFC` | Main page background |
| `white` | `#FFFFFF` | Cards, surfaces |

## Accent (AI & Highlights)

| Token | Hex | Usage |
|-------|-----|-------|
| `accent-500` | `#06B6D4` | AI badges, insight highlights |
| `accent-50` | `#ECFEFF` | AI feedback panels background |

## Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `success-600` | `#16A34A` | Progress gains, completed tasks |
| `success-50` | `#F0FDF4` | Success alert backgrounds |
| `warning-600` | `#D97706` | Weak skills, attention areas |
| `warning-50` | `#FFFBEB` | Warning alert backgrounds |
| `error-600` | `#DC2626` | Form errors, destructive actions |
| `error-50` | `#FEF2F2` | Error alert backgrounds |

## Gradients (Sparingly)

- **Hero gradient:** `primary-600` → `accent-500` at 135° — landing hero only.
- **AI card glow:** Very subtle `accent-50` border + `primary-50` background.

## Color Rules

- Body text: `neutral-700` on `white` or `neutral-50` — minimum 4.5:1 contrast.
- Primary buttons: white text on `primary-600`.
- Do not use more than one accent color per component.
- AI-generated content always uses `accent-50` background or `accent-500` left border.

---

# 6. Typography

## Font Family

| Role | Font | Fallback |
|------|------|----------|
| Primary | **Inter** | `system-ui, sans-serif` |

Inter is clean, highly readable, and standard for SaaS products. Load via `next/font/google`.

## Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `display` | 48px / 3rem | 700 | 1.1 | Landing hero only |
| `h1` | 36px / 2.25rem | 700 | 1.2 | Page titles |
| `h2` | 24px / 1.5rem | 600 | 1.3 | Section headings |
| `h3` | 20px / 1.25rem | 600 | 1.4 | Card titles |
| `body-lg` | 18px / 1.125rem | 400 | 1.6 | Lead paragraphs |
| `body` | 16px / 1rem | 400 | 1.6 | Default body |
| `body-sm` | 14px / 0.875rem | 400 | 1.5 | Secondary text, captions |
| `label` | 14px / 0.875rem | 500 | 1.4 | Form labels |
| `overline` | 12px / 0.75rem | 600 | 1.4 | Badges, section labels (uppercase tracking) |

## Typography Rules

- One `h1` per page.
- Section headings use `h2`; card titles use `h3`.
- Max line width for prose: `65ch` (`max-w-prose`).
- Numbers (scores, levels): use `font-semibold` or `font-bold` for emphasis.
- AI labels: `overline` style + `accent-500` color.

---

# 7. Spacing System

Based on a **4px grid**, aligned with Tailwind defaults.

## Spacing Scale

| Token | Value | Common Use |
|-------|-------|------------|
| `space-1` | 4px | Tight icon gaps |
| `space-2` | 8px | Inline element gaps |
| `space-3` | 12px | Form field internal padding |
| `space-4` | 16px | Card padding (mobile), component gaps |
| `space-6` | 24px | Card padding (desktop), section gaps |
| `space-8` | 32px | Between content blocks |
| `space-12` | 48px | Section vertical padding |
| `space-16` | 64px | Large section breaks |
| `space-24` | 96px | Landing page section padding |

## Layout Spacing

| Element | Rule |
|---------|------|
| Page horizontal padding | `px-4` mobile, `px-6` tablet, `px-8` desktop |
| Max content width | `max-w-7xl` (1280px) for dashboard; `max-w-6xl` for marketing |
| Card padding | `p-4` mobile, `p-6` desktop |
| Form field gap | `space-y-4` between fields |
| Section gap | `space-y-8` or `space-y-12` between major sections |
| Grid gap | `gap-4` or `gap-6` |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Inputs, small badges |
| `rounded-md` | 6px | Buttons |
| `rounded-lg` | 8px | Cards |
| `rounded-xl` | 12px | Feature cards, modals |
| `rounded-full` | 9999px | Avatars, pills |

## Shadows

| Token | Usage |
|-------|-------|
| `shadow-sm` | Cards at rest |
| `shadow-md` | Dropdowns, popovers |
| `shadow-lg` | Modals, elevated panels |

---

# 8. Reusable UI Components

All components live under `src/components/ui/` and feature-specific folders.

## Buttons

| Variant | Style | Use |
|---------|-------|-----|
| **Primary** | `primary-600` bg, white text, `rounded-md` | Main CTA (one per section) |
| **Secondary** | White bg, `neutral-200` border, `neutral-700` text | Secondary actions |
| **Ghost** | Transparent, `primary-600` text | Tertiary, nav links |

**Sizes:** `sm` (32px), `md` (40px, default), `lg` (48px for hero CTAs).

**States:** hover, focus ring (`ring-2 ring-primary-500 ring-offset-2`), disabled (`opacity-50`), loading (spinner + "Loading…").

## Form Inputs

Used for exam goals, assessment responses, practice, and feedback — **not** for authentication credentials.

- **Text input:** `rounded-sm`, `border-neutral-200`, focus `border-primary-600 ring-primary-500`.
- **Textarea:** Same styling; min-height 120px for practice/assessment.
- **Select:** Native or custom select with chevron icon (language, exam, HSK levels).
- **Number input:** For DET current/target scores.
- **Date picker:** Standard date input; clear label "Exam Date".
- **Label:** `label` typography, required fields marked with `*`.
- **Error message:** `body-sm`, `error-600`, below field.
- **Helper text:** `body-sm`, `neutral-500`.

## Authentication Components (Neon Auth)

Authentication is handled by **Neon Auth**. The application does **not** render password fields or manage credential storage.

### Auth Layout

- Centered card (`max-w-md`) on `neutral-50` background
- Logo + "Back to Home" link in header
- Content area for Neon Auth UI (flexible — exact flow defined in Phase 4)

### Sign In Components

- Page title: "Welcome back"
- Subtitle: "Sign in to continue your exam preparation"
- **Neon Auth sign-in area** — provider-rendered UI (email, OAuth, or magic link per Neon Auth config)
- Link: "Don't have an account? Create account"
- Error alert for failed authentication (session errors)
- Loading state while auth initializes

### Sign Up Components

- Page title: "Create your account"
- Subtitle: "Start preparing for your language exam"
- **Neon Auth sign-up area** — provider-rendered UI
- Link: "Already have an account? Sign in"
- No password, confirm password, or credential fields in application UI

### Session Components

- Protected route wrapper — redirects unauthenticated users to Sign In
- Session loading skeleton while verifying session
- User menu in dashboard top bar (avatar + sign out)
- Sign out action via Neon Auth session termination

> **Note:** Neon Auth implementation details (providers, callbacks, env vars) will be finalized in Phase 4. Auth UI should remain a flexible wrapper around Neon Auth components.

## Cards

```
┌─────────────────────────────────┐
│ [optional badge]                │
│ Card Title                  h3  │
│ Supporting description          │
│                                 │
│ [content area]                  │
│                                 │
│ [optional action]               │
└─────────────────────────────────┘
```

- Background: `white`
- Border: `1px neutral-200` or `shadow-sm`
- Padding: `p-6`
- Use for dashboard widgets, assessment results, study plan weeks.

## Badges & Tags

| Type | Style |
|------|-------|
| Exam type | `primary-50` bg, `primary-700` text |
| AI-generated | `accent-50` bg, `accent-500` text, sparkle icon |
| Status (completed) | `success-50` bg, `success-600` text |
| Weak skill | `warning-50` bg, `warning-600` text |
| Scoring model | `neutral-100` bg, `neutral-700` text — "Numeric" or "Level" |

## Progress Indicators

- **Progress bar:** `neutral-200` track, `primary-600` fill, height 8px, `rounded-full`.
- **Score stat:** Large number + "Current Score" or "Estimated Score" label.
- **Level stat:** Large level text + "Current Level" or "Estimated Level" label.
- **Step indicator:** Numbered steps for assessment flow (1 → 2 → 3).

## Navigation

### Marketing Header (Landing)

- Logo left
- Links: Features, How It Works
- Right: Sign In (ghost), Get Started (primary)

### App Sidebar (Dashboard — desktop)

- Logo + collapse toggle
- Nav items with icons: Dashboard, Assessment, Study Plan, Practice, Progress
- Bottom: Feedback, Sign Out
- Active state: `primary-50` bg, `primary-600` text + left border

### App Bottom Nav (Mobile)

- Icons: Home, Plan, Practice, Progress, More
- Fixed bottom, `shadow-md`, safe-area padding

## Alerts & Toasts

| Type | Icon | Background |
|------|------|------------|
| Success | Check | `success-50` |
| Warning | Alert triangle | `warning-50` |
| Error | X circle | `error-50` |
| Info | Info | `primary-50` |

Toasts: bottom-right desktop, bottom-center mobile; auto-dismiss 5s.

## Empty States

- Centered icon (48px)
- `h3` title explaining what's missing
- Short description
- Primary CTA to resolve (e.g. "Set Exam Goal")

## Loading States

- **Skeleton:** Pulse animation on cards and text lines.
- **Spinner:** Primary color, centered for full-page loads.
- **AI processing:** Dedicated panel with "Analyzing your response…" + subtle animation.
- **Auth loading:** Skeleton auth card while Neon Auth initializes.

## AI Disclaimer Component

Small `body-sm` text below AI scores/levels:

> "This is an AI estimate, not an official exam result."

Use on assessment results, practice feedback, and progress estimates.

---

# 9. Icons

## Icon Library

Use **Lucide React** (`lucide-react`) — consistent, minimal, open source.

## Icon Sizes

| Context | Size |
|---------|------|
| Inline with text | 16px |
| Navigation | 20px |
| Feature cards | 24px |
| Empty states | 48px |

## Standard Icon Mapping

| Feature | Icon |
|---------|------|
| Dashboard | `LayoutDashboard` |
| Assessment | `ClipboardCheck` |
| Study Plan | `Calendar` or `Map` |
| Practice | `PenLine` |
| Progress | `TrendingUp` |
| Feedback | `MessageSquare` |
| AI / Insights | `Sparkles` |
| Strengths | `CheckCircle` |
| Weaknesses | `AlertCircle` |
| Sign out | `LogOut` |
| User | `User` |
| Exam goal | `Target` |
| Writing | `FileText` |
| Success | `Check` |
| Error | `X` |
| Menu (mobile) | `Menu` |
| Close | `X` |

## Icon Rules

- Icons always paired with text labels in navigation (accessibility).
- Icon color inherits text color unless semantic (success, warning, error).
- Do not use icons as the only indicator of meaning.

---

# 10. Responsive Design Guidelines

## Breakpoints (Tailwind)

| Breakpoint | Min Width | Layout |
|------------|-----------|--------|
| `sm` | 640px | Stacked → 2-column grids |
| `md` | 768px | Sidebar appears; wider cards |
| `lg` | 1024px | Full dashboard layout |
| `xl` | 1280px | Max-width container centered |

## Layout Patterns

### Landing Page

- Mobile: single column, stacked sections, hamburger nav.
- Desktop: horizontal nav, 2-column hero (text + visual), 3–4 column feature grid.

### Dashboard & App Pages

- Mobile: single column, bottom nav, cards full-width.
- Tablet: 2-column card grid.
- Desktop: sidebar (240px) + main content area.

### Forms (Exam Goals, Assessment, Practice, Feedback)

- Centered card, `max-w-md` to `max-w-lg`, full-width on mobile with `px-4`.

### Auth Pages (Sign In, Sign Up)

- Centered card, `max-w-md`, Neon Auth content area scales to card width.

### Assessment & Practice

- Mobile: prompt above, textarea full-width, submit fixed at bottom or sticky.
- Desktop: split layout optional — prompt left (40%), response right (60%).

## Touch Targets

- Minimum **44×44px** for all interactive elements on mobile.
- Adequate spacing between tap targets (`space-y-3` minimum).

## Typography Responsive

- `display`: `text-3xl` mobile → `text-5xl` desktop
- `h1`: `text-2xl` mobile → `text-4xl` desktop

## Images & Media

- No critical information in images alone.
- SVG illustrations scale fluidly; max-width 100%.
- No video lessons or uploaded media in MVP.

---

# 11. Accessibility Guidelines

## Standards

Target **WCAG 2.1 Level AA** compliance.

## Color & Contrast

- Normal text: minimum 4.5:1 contrast ratio.
- Large text (18px+ bold or 24px+): minimum 3:1.
- Do not rely on color alone for status — pair with icons and text.

## Keyboard Navigation

- All interactive elements reachable via Tab.
- Visible focus ring on all focusable elements.
- Logical tab order matches visual order.

## Screen Readers

- One `h1` per page; logical heading hierarchy (`h1` → `h2` → `h3`).
- All form inputs have associated `<label>`.
- Icon-only buttons have `aria-label`.
- AI-generated regions use `aria-live="polite"` for dynamic feedback.
- Loading states announce "Loading" or "Analyzing" via `aria-busy` / live region.

## Forms

- Errors linked to fields via `aria-describedby`.
- Required fields marked visually and with `aria-required`.
- Clear error messages — not color alone.

## Motion

- Respect `prefers-reduced-motion` — disable or reduce animations.
- No auto-playing video or distracting motion.

## Language

- `lang` attribute on `<html>` (default `en`).
- User-generated content in exam responses may be multilingual — do not force LTR on student text areas.

---

# 12. AI Interaction Guidelines

AI is central to LinguaPath. All AI-generated content must be clearly labeled and presented responsibly.

## Labeling Requirements

Always label AI output with explicit wording:

| Content | Label |
|---------|-------|
| Assessment results | "AI Diagnostic Results" |
| Score prediction | "Estimated Score" |
| Level prediction | "Estimated Level" |
| Practice feedback | "AI Feedback" |
| Study schedule | "AI-generated Study Plan" |
| Recommendations | "AI Recommendations" |

Use the **AI badge** (`accent-50` background, `Sparkles` icon, "AI" overline) on panels containing AI-generated content.

## Disclaimer Requirements

- Display on every screen showing AI scores or levels: *"This is an AI estimate, not an official exam result."*
- Do not use language implying official certification ("Your DET score is…", "You are certified at…").
- Use hedged language: "estimated", "suggested", "recommended".

## Presentation Rules

- Separate AI output visually from user input (accent background on AI panels).
- Show AI processing state before revealing results ("Analyzing your response…").
- Never present AI predictions as guaranteed outcomes.
- Do not hide that content is AI-generated.

## What to Avoid

- "Your official score"
- "Certified level"
- "Guaranteed result"
- Unlabeled AI text that appears as human-written fact

---

# Page Wireframes

Text-based wireframes describing layout, components, and user journey for each MVP screen.

**Onboarding flow:**

```
Register / Sign In → Exam Goal Setup → AI Diagnostic Assessment → Study Plan
```

---

## Landing Page

### Purpose

Introduce LinguaPath as an AI-powered language exam preparation coach and drive sign-ups.

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ [Logo]          Features  How It Works     [Sign In] [Get Started]│
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   HERO (gradient bg)                                             │
│   ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│   │ Overline: AI EXAM PREP  │  │ [Abstract illustration /    │  │
│   │ H1: Your AI path to     │  │  dashboard preview card]      │  │
│   │     exam success        │  │                             │  │
│   │ Body: AI-powered        │  │                             │  │
│   │ language exam           │  │                             │  │
│   │ preparation coach       │  │                             │  │
│   │ [Get Started — Primary] │  │                             │  │
│   │ [See How It Works]      │  │                             │  │
│   └─────────────────────────┘  └─────────────────────────────┘  │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│ PROBLEM SECTION                                                  │
│ H2: Exam prep shouldn't feel like guessing                       │
│ 3 columns: [Icon] Unclear level | [Icon] No plan | [Icon] No feedback │
├──────────────────────────────────────────────────────────────────┤
│ SOLUTION SECTION                                                 │
│ H2: Your AI exam preparation coach                               │
│ Bullets: Understand level | Personalized plan | AI feedback | Track certification progress │
├──────────────────────────────────────────────────────────────────┤
│ FEATURES SECTION                                                 │
│ H2: Built for exam success                                       │
│ 4 cards: AI Assessment | Study Plans | Practice Feedback | Progress │
├──────────────────────────────────────────────────────────────────┤
│ HOW IT WORKS                                                     │
│ H2: How LinguaPath works                                         │
│ 1. Set exam goal  2. Take assessment  3. Get plan  4. Practice & track │
├──────────────────────────────────────────────────────────────────┤
│ CTA SECTION                                                      │
│ H2: Start preparing for your exam                                │
│ [Create Free Account — Primary]                                  │
├──────────────────────────────────────────────────────────────────┤
│ FOOTER                                                           │
│ Logo | Contact | Feedback link | © 2026                          │
└──────────────────────────────────────────────────────────────────┘
```

### Components

- Marketing header
- Hero with exam-prep positioning
- Feature cards (4)
- Step indicators
- Footer

### User Journey

```
Visitor arrives
    → Reads exam preparation value proposition
    → Scrolls through problem / solution / features
    → Clicks "Get Started"
    → Redirects to Sign Up (Neon Auth)
```

---

## Sign In

### Purpose

Allow returning users to authenticate via Neon Auth and access their protected dashboard.

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ [Logo]                                              [Back to Home]│
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│              ┌─────────────────────────────┐                     │
│              │ H1: Welcome back            │                     │
│              │ Body: Sign in to continue    │                     │
│              │       your exam preparation │                     │
│              │                             │                     │
│              │ ┌─────────────────────────┐ │                     │
│              │ │   NEON AUTH SIGN-IN UI   │ │                     │
│              │ │   (provider-rendered)    │ │                     │
│              │ │                         │ │                     │
│              │ │   [Flexible: email,     │ │                     │
│              │ │    OAuth, magic link —   │ │                     │
│              │ │    per Phase 4 config]   │ │                     │
│              │ └─────────────────────────┘ │                     │
│              │                             │                     │
│              │ Don't have an account?      │                     │
│              │ [Create account — link]     │                     │
│              └─────────────────────────────┘                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Components

- Centered auth card (`max-w-md`)
- Neon Auth sign-in UI area (no password fields in app UI)
- Link to Sign Up
- Error alert (authentication failure)
- Session loading skeleton

### User Journey

```
User clicks "Sign In" from landing
    → Neon Auth sign-in flow presented
    → [Success] Session created → Redirect to Dashboard
        → [No exam goal] Redirect to Exam Goal Setup
    → [Failure] Show error alert, remain on page
```

---

## Sign Up

### Purpose

Allow new users to create an account via Neon Auth and begin exam preparation.

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ [Logo]                                              [Back to Home]│
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│              ┌─────────────────────────────┐                     │
│              │ H1: Create your account     │                     │
│              │ Body: Start preparing for    │                     │
│              │       your language exam    │                     │
│              │                             │                     │
│              │ ┌─────────────────────────┐ │                     │
│              │ │   NEON AUTH SIGN-UP UI   │ │                     │
│              │ │   (provider-rendered)    │ │                     │
│              │ │                         │ │                     │
│              │ │   [Flexible: email,     │ │                     │
│              │ │    OAuth, magic link —   │ │                     │
│              │ │    per Phase 4 config]   │ │                     │
│              │ └─────────────────────────┘ │                     │
│              │                             │                     │
│              │ Already have an account?    │                     │
│              │ [Sign in — link]            │                     │
│              └─────────────────────────────┘                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Components

- Centered auth card
- Neon Auth sign-up UI area (no password or confirm password fields)
- Link to Sign In
- Error alert (registration failure)

### User Journey

```
User clicks "Get Started" from landing
    → Neon Auth sign-up flow presented
    → [Success] Session created → Redirect to Exam Goal Setup
    → [Failure] Show error alert
```

---

## Exam Goal Setup

### Purpose

Allow users to define their language exam target before starting the AI diagnostic assessment.

### Layout

```
┌──────────┬───────────────────────────────────────────────────────┐
│ SIDEBAR  │  H1: Set Your Exam Goal                               │
│ (minimal │  Body: Tell us about your exam so we can personalize │
│  or none │        your preparation.                              │
│  during  ├───────────────────────────────────────────────────────┤
│  setup)  │                                                       │
│          │  ┌─────────────────────────────────────────────────┐  │
│          │  │ Language            [English ▼]                 │  │
│          │  │                     Options: English, Chinese  │  │
│          │  │                                                 │  │
│          │  │ Exam                [DET ▼]                     │  │
│          │  │                     Options: DET, HSK           │  │
│          │  │                                                 │  │
│          │  │ ── IF DET (numeric) ──                          │  │
│          │  │ Current Score       [___95___]                  │  │
│          │  │ Target Score        [__120___]                  │  │
│          │  │                                                 │  │
│          │  │ ── IF HSK (level-based) ──                      │  │
│          │  │ Current Level       [HSK 3 ▼]                   │  │
│          │  │ Target Level        [HSK 5 ▼]                   │  │
│          │  │                                                 │  │
│          │  │ Exam Date           [__________]                │  │
│          │  │ Study Hours/Week    [____5____]                 │  │
│          │  │                                                 │  │
│          │  │ [Start Diagnostic Assessment — Primary]         │  │
│          │  └─────────────────────────────────────────────────┘  │
└──────────┴───────────────────────────────────────────────────────┘
```

**Dynamic behavior:** Selecting English → defaults to DET (numeric fields). Selecting Chinese → defaults to HSK (level fields). Only one scoring field set visible at a time.

### Components

- Language select (English, Chinese)
- Exam select (DET, HSK)
- Conditional score inputs (DET) OR level selects (HSK)
- Exam date picker
- Study hours per week input
- Primary CTA button
- Form validation errors

### User Journey

```
User completes Sign Up (or Sign In with no exam goal)
    → Selects language and exam
    → Enters current ability (score or level)
    → Enters target goal (score or level)
    → Sets exam date and study hours
    → Clicks "Start Diagnostic Assessment"
    → Redirects to AI Assessment page
```

---

## Dashboard

### Purpose

Give users an at-a-glance view of their exam goal, progress, and next recommended action.

### Layout — DET (numeric)

```
┌──────────┬───────────────────────────────────────────────────────┐
│ SIDEBAR  │  Top bar: Dashboard                   [User avatar ▼]│
│          ├───────────────────────────────────────────────────────┤
│ Dashboard│  [DET badge]                                          │
│ Assess.  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│ Study    │  │ Current     │ │ Target      │ │ Progress    │       │
│ Practice │  │ Score       │ │ Score       │ │ 42%         │       │
│ Progress │  │    105      │ │    120      │ │ [progress bar]│     │
│          │  └─────────────┘ └─────────────┘ └─────────────┘       │
│ ──────── │                                                       │
│ Feedback │  ┌──────────────────────────┐ ┌──────────────────┐   │
│ Sign Out │  │ NEXT STEP                │ │ AI-generated     │   │
│          │  │ "Complete writing        │ │ Study Plan       │   │
│          │  │  practice"               │ │ Week 1 summary   │   │
│          │  │ [Start Practice]         │ │ [View full plan] │   │
│          │  └──────────────────────────┘ └──────────────────┘   │
│          │  ┌──────────────────────────┐ ┌──────────────────┐   │
│          │  │ WEAK SKILLS              │ │ RECENT ACTIVITY  │   │
│          │  │ • Vocabulary             │ │ • Diagnostic  105│   │
│          │  │ • Grammar                │ │ • Practice    108│   │
│          │  └──────────────────────────┘ └──────────────────┘   │
└──────────┴───────────────────────────────────────────────────────┘
```

### Layout — HSK (level-based)

Same structure; stat cards show:

```
│ Current Level │ │ Target Level │ │ Progress     │
│    HSK 4      │ │    HSK 5     │ │  toward goal │
```

Recent activity shows level estimates (e.g. "Diagnostic: HSK 4").

**First-time user (no exam goal):** Empty state — "Set your exam goal to get started" + CTA to Exam Goal Setup.

### Components

- App sidebar / mobile bottom nav
- Exam type badge (DET / HSK)
- Stat cards (3) — labels adapt to scoring model
- Next step highlight card
- AI-generated study plan preview card
- Weak skills list
- Recent activity list

### User Journey

```
User signs in
    → [No exam goal] Redirect to Exam Goal Setup
    → [Has exam goal] Sees progress overview with correct score/level labels
    → Clicks "Start Practice" or nav item to continue
```

---

## AI Assessment

### Purpose

Conduct the initial AI diagnostic to estimate proficiency and identify strengths and weaknesses.

### Layout

```
┌──────────┬───────────────────────────────────────────────────────┐
│ SIDEBAR  │  H1: AI Diagnostic Assessment                         │
│          │  Step indicator: [1 Prompt] — [2 Response] — [3 Results]│
│          ├───────────────────────────────────────────────────────┤
│          │  STEP 1–2 (Active assessment)                         │
│          │  ┌─────────────────────────────────────────────────┐  │
│          │  │ [AI badge] Writing Prompt                       │  │
│          │  │ "Describe an important challenge you faced…"    │  │
│          │  └─────────────────────────────────────────────────┘  │
│          │  ┌─────────────────────────────────────────────────┐  │
│          │  │ Your Response                                   │  │
│          │  │ [Large textarea]                    250 / 500  │  │
│          │  └─────────────────────────────────────────────────┘  │
│          │  [Submit for AI Analysis — Primary]                   │
│          │                                                       │
│          │  STEP 3 — DET results:                                │
│          │  ┌──────────────┐ ┌────────────┐ ┌────────────────┐  │
│          │  │ Estimated    │ │ Strengths  │ │ Areas to Improve│  │
│          │  │ Score: 105   │ │ • Structure│ │ • Vocabulary   │  │
│          │  │ [disclaimer] │ │            │ │                │  │
│          │  └──────────────┘ └────────────┘ └────────────────┘  │
│          │                                                       │
│          │  STEP 3 — HSK results:                                │
│          │  ┌──────────────┐ ┌────────────┐ ┌────────────────┐  │
│          │  │ Estimated    │ │ Strengths  │ │ Areas to Improve│  │
│          │  │ Level: HSK 4 │ │ • Grammar  │ │ • Vocabulary   │  │
│          │  │ [disclaimer] │ │            │ │                │  │
│          │  └──────────────┘ └────────────┘ └────────────────┘  │
│          │  ┌─────────────────────────────────────────────────┐  │
│          │  │ [AI badge] AI Recommendations                   │  │
│          │  └─────────────────────────────────────────────────┘  │
│          │  [Generate Study Plan — Primary]  [Back to Dashboard] │
└──────────┴───────────────────────────────────────────────────────┘
```

### Components

- Step indicator
- Prompt card with AI badge
- Textarea with word count
- Submit button with AI loading state
- Results stat card (Estimated Score OR Estimated Level)
- AI disclaimer text
- Strengths / weaknesses panels
- AI Recommendations panel
- CTA to generate study plan

### User Journey

```
User arrives from Exam Goal Setup (or dashboard)
    → Reads writing prompt
    → Writes response
    → Submits → "Analyzing your response…"
    → Views AI results (score or level based on exam type)
    → Clicks "Generate Study Plan" → Study Plan page
```

---

## Study Plan

### Purpose

Display the AI-generated personalized study schedule organized by week and skill area.

### Layout — DET

```
┌──────────┬───────────────────────────────────────────────────────┐
│ SIDEBAR  │  H1: AI-generated Study Plan                          │
│          │  Subtitle: DET · Target 120 · Exam June 2027          │
│          ├───────────────────────────────────────────────────────┤
│          │  ┌─────────────────────────────────────────────────┐│
│          │  │ Plan overview: Mar 1 – May 30 · 12 wks · 5 hrs/wk││
│          │  └─────────────────────────────────────────────────┘│
│          │  ┌─ Week 1 ──────────────────────── [Current] ────┐│
│          │  │ Writing:    Practice essay structure           ││
│          │  │ Vocabulary: Learn 50 academic words              ││
│          │  └──────────────────────────────────────────────────┘│
│          │  ┌─ Week 2 ── (accordion, collapsed) ─────────────┐│
│          │  └──────────────────────────────────────────────────┘│
│          │  [Start Today's Practice — Primary]                   │
└──────────┴───────────────────────────────────────────────────────┘
```

### Layout — HSK

Same structure; subtitle reads: `HSK · Target HSK 5 · Exam June 2027`

Weekly tasks focus on vocabulary, reading, and writing relevant to HSK levels.

### Components

- Plan overview summary bar
- Weekly accordion cards
- Skill rows (Writing, Vocabulary — MVP practice is writing only; other skills appear as study tasks)
- "Current week" badge
- Primary CTA to writing practice

### User Journey

```
User arrives after assessment (or from dashboard)
    → Reviews weekly breakdown
    → Identifies current week tasks
    → Clicks "Start Today's Practice" → Practice page
```

---

## Practice

### Purpose

Allow students to submit **writing practice** and receive AI-generated feedback. (MVP practice type: writing only.)

### Layout — DET

```
┌──────────┬───────────────────────────────────────────────────────┐
│ SIDEBAR  │  H1: Writing Practice                                 │
│          │  Subtitle: Week 1 · Essay structure · DET              │
│          ├───────────────────────────────────────────────────────┤
│          │  ┌─────────────────────────────────────────────────┐│
│          │  │ Practice Prompt (from study plan)               ││
│          │  └─────────────────────────────────────────────────┘│
│          │  ┌─────────────────────────────────────────────────┐│
│          │  │ Your Response  [Textarea]                       ││
│          │  └─────────────────────────────────────────────────┘│
│          │  [Get AI Feedback — Primary]                          │
│          │  ┌─────────────────────────────────────────────────┐│
│          │  │ [AI badge] AI Feedback                          ││
│          │  │ Estimated Score: 108                            ││
│          │  │ [disclaimer: not official result]               ││
│          │  │ Grammar | Vocabulary | Structure sections       ││
│          │  │ [Practice Again]  [View Progress]               ││
│          │  └─────────────────────────────────────────────────┘│
└──────────┴───────────────────────────────────────────────────────┘
```

### Layout — HSK

Same structure; feedback panel shows:

```
│ Estimated Level: HSK 4                          │
│ [disclaimer: not official result]               │
```

### Components

- Practice prompt card
- Response textarea
- Submit button with AI loading state
- AI Feedback panel (accent background)
- Estimated Score OR Estimated Level
- AI disclaimer
- Categorized feedback sections
- Secondary actions

### User Journey

```
User opens Practice from dashboard or study plan
    → Reads prompt tied to current study plan task
    → Writes response
    → Submits → AI processes
    → Reviews AI Feedback with score or level estimate
    → Chooses "Practice Again" or "View Progress"
```

---

## Progress

### Purpose

Show improvement over time through assessments, practice results, and completed activities.

### Layout — DET (numeric)

```
┌──────────┬───────────────────────────────────────────────────────┐
│ SIDEBAR  │  H1: Your Progress                                    │
│          │  Subtitle: DET · 95 → 120 target                      │
│          ├───────────────────────────────────────────────────────┤
│          │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│          │  │ Starting    │ │ Current     │ │ Improvement │       │
│          │  │ Score: 95   │ │ Score: 108  │ │  +13 pts    │       │
│          │  └─────────────┘ └─────────────┘ └─────────────┘       │
│          │  ┌─────────────────────────────────────────────────┐  │
│          │  │ Score History (line chart)                      │  │
│          │  │ [Diagnostic + practice scores over time]        │  │
│          │  └─────────────────────────────────────────────────┘  │
│          │  ┌──────────────────────┐ ┌────────────────────────┐  │
│          │  │ COMPLETED ACTIVITIES │ │ SKILL BREAKDOWN        │  │
│          │  │ • Diagnostic    105│ │ Writing      ████░ 80% │  │
│          │  │ • Practice 1    108│ │ Vocabulary   ██░░░ 40% │  │
│          │  └──────────────────────┘ └────────────────────────┘  │
└──────────┴───────────────────────────────────────────────────────┘
```

### Layout — HSK (level-based)

```
│ Starting Level │ │ Current Level │ │ Progress          │
│    HSK 3       │ │    HSK 4      │ │ Toward HSK 5      │
```

Level history shows estimated levels over time instead of a numeric chart.

### Components

- Progress stat cards (3) — adapt labels to scoring model
- Score history chart OR level progression display
- Activity timeline list
- Skill breakdown bars
- Exam context subtitle

### User Journey

```
User navigates to Progress from sidebar
    → Reviews score or level trend
    → Identifies strongest and weakest skills
    → Returns to Practice or Study Plan to address weak areas
```

---

## Feedback

### Purpose

Let users submit comments, suggestions, or bug reports. Triggers Slack notification on submit.

### Layout

```
┌──────────┬───────────────────────────────────────────────────────┐
│ SIDEBAR  │  H1: Send Feedback                                    │
│          ├───────────────────────────────────────────────────────┤
│          │  ┌─────────────────────────────────────────────────┐  │
│          │  │ Body: Help us improve LinguaPath.               │  │
│          │  │                                                 │  │
│          │  │ Feedback Type    [Comment ▼]                    │  │
│          │  │   Options: Comment | Suggestion | Bug Report    │  │
│          │  │                                                 │  │
│          │  │ Rating           ( ) 1  ( ) 2  ...  ( ) 5      │  │
│          │  │                                                 │  │
│          │  │ Message          [Textarea]                     │  │
│          │  │                                                 │  │
│          │  │ [Submit Feedback — Primary]                     │  │
│          │  └─────────────────────────────────────────────────┘  │
│          │  [Success alert] Thank you! Your feedback was received. │
└──────────┴───────────────────────────────────────────────────────┘
```

### Components

- Feedback type select
- Rating selector (1–5)
- Message textarea
- Submit button
- Success toast / alert

### Navigation

Phase 9 implements the app sidebar described in **App Sidebar (Dashboard — desktop)** and **App Bottom Nav (Mobile)**. The Feedback item uses the `MessageSquare` icon and links to `/feedback`.

### User Journey

```
User opens Feedback from sidebar or footer
    → Selects feedback type
    → Writes message
    → Submits
    → Sees success confirmation
    → [Backend] Stored in DB + Slack notification sent
```

---

# Implementation Notes

## Tailwind Configuration

When Phase 1 begins, extend `tailwind.config` with custom colors matching the palette tokens above (primary, accent, neutral, semantic).

## Component Build Priority

Aligned with development phases:

| Phase | Components |
|-------|------------|
| **Phase 1** | Project setup only — no UI components |
| **Phase 2** | Button, marketing header, footer, landing sections, hero, feature cards |
| **Phase 3–4** | Auth layout card, session loading skeleton, protected route wrapper, Neon Auth UI container |
| **Phase 5** | App sidebar, bottom nav, stat cards, exam goal form (conditional score/level fields), empty states |
| **Phase 6** | Step indicator, prompt card, assessment textarea, AI results panels, AI disclaimer, AI badge |
| **Phase 7** | Study plan accordion, plan overview bar, weekly task cards |
| **Phase 8** | Practice prompt/textarea, AI feedback panel, progress bar, activity list, score/level history |
| **Phase 9** | Feedback form, success alert, app sidebar, mobile nav |
| **Phase 10** | Deployment verification, README/DEPLOYMENT docs, UI polish (no new features) |

## Design Consistency Checklist

Before shipping any page, verify:

- [ ] One primary CTA per section
- [ ] Correct heading hierarchy
- [ ] AI content clearly labeled with badge and disclaimer
- [ ] Exam type shows correct score vs. level fields
- [ ] Loading, empty, and error states use consistent alert styling
- [ ] Mobile bottom nav does not cover submit buttons
- [ ] No duplicate Sign Out or redundant Back to Dashboard when sidebar is visible
- [ ] All navigation links resolve (no 404s)
- [ ] No uncaught console errors on primary user flows
- [ ] No password fields in auth UI
- [ ] Responsive at 375px, 768px, 1280px
- [ ] Focus states visible
- [ ] Loading and empty states defined
- [ ] No UI for non-MVP features (file uploads, speaking, settings, etc.)

---

# Related Documents

- `PROJECT_PROPOSAL.md` — Product vision
- `FEATURE_SPECIFICATION.md` — MVP features
- `DATABASE_SCHEMA.md` — Data model
- `CURSOR_PROJECT_GUIDE.md` — Development phases
