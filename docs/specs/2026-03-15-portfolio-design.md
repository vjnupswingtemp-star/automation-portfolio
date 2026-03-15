# Portfolio Website Design Spec
**Date:** 2026-03-15
**Project:** AI Automation Freelance Team Portfolio
**Goal:** Land first paying client in the AI automation space

---

## 1. Overview

A single long-scroll portfolio website for a small team of freelancers specializing in n8n workflow automation and custom AI agents/chatbots. The site targets prospective clients — businesses that want to adopt AI automation in their operations. It is designed to convert a first paying client.

The team does not operate under a brand name. The identity is a tagline: **"We Automate. You Grow."**

---

## 2. Objectives & Success Criteria

| Objective | Success Criterion |
|---|---|
| Hero communicates the team's service before the fold | Hero section is fully legible and service-clear on all screen sizes without scrolling |
| Clearly communicate two core services | Both service cards are visible within 5 seconds of landing |
| Build trust through real proof | One real case study + one real client testimonial ship at launch |
| Provide a clear path to contact | Visitor can reach contact in 1 click (desktop) or 1 tap (mobile) from any section, via a persistent floating CTA button |
| Fast, credible, accessible | Lighthouse score 90+ across Performance, Accessibility, and SEO |
| Page performance | Page loads in under 2 seconds on Vercel (measured via Lighthouse) |

---

## 3. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Modern, signals technical credibility to clients |
| Styling | Tailwind CSS | Fast to build, easy to maintain custom design |
| Animations | Framer Motion | Smooth scroll animations, entrance effects; all looping animations wrapped in `useReducedMotion` for accessibility |
| Deployment | Vercel | Free, fast, one-click deploy |
| Body font | Inter (via `next/font/google`) | Clean, highly readable |
| Display font | Bricolage Grotesque (via `next/font/google`) | Bold, personality-forward, Y2K-compatible; free on Google Fonts |
| Icons | Lucide React | Consistent, lightweight, Next.js-compatible; replaces all emoji placeholders |
| SEO metadata | Next.js built-in Metadata API | `<title>`, meta description, Open Graph |
| Sitemap | `next-sitemap` package | Auto-generates `sitemap.xml` and `robots.txt` |
| Analytics | Vercel Analytics (one-line) | Ships at launch; zero performance cost |

---

## 4. Visual Style — "Playful Pro"

Inspired by Apple's whitespace discipline meets Y2K aesthetic (bold mixed typography, sticker badges, playful color pops).

### Color System

| Token | Hex | Usage |
|---|---|---|
| Base | `#FEFEFE` | Page background |
| Near-black | `#111111` | Primary text, dark sections |
| AI Accent | `#5B5BFF` | Links, highlights, italic type |
| Y2K Yellow | `#FFE500` | Badge stickers, highlight markers |
| Sticker Red | `#FF6B6B` | Accent badges, tags |
| Muted | `#AAAAAA` | Subtitles, section labels |
| Light gray | `#F7F7F7` | Alternate section backgrounds |

### Typography

- **Display/headlines:** Bricolage Grotesque, weight 800–900, tight line-height (1.05–1.15)
- **Section labels:** Inter, monospace-styled via `font-mono`, uppercase, `tracking-widest`
- **Body:** Inter, weight 400, comfortable line-height (1.6)
- **Italic accent:** Bricolage Grotesque italic on key headline words, colored `#5B5BFF`

### Y2K Elements

- Small rotated badge stickers (yellow + red) on hero and CTA sections
- Pill-shaped tags with `border` for skill/tech labels
- Monospace uppercase labels with wide letter-spacing for section headings
- Dark CTA section (`#111111`) contrasting the light page

### Interaction States

| Element | Default | Hover | Focus Ring |
|---|---|---|---|
| Filled CTA button | `bg-[#111] text-white` | `bg-[#5B5BFF] text-white` | `ring-2 ring-[#5B5BFF] ring-offset-2` |
| Outlined button | `border border-[#ccc] text-[#555]` | `border-[#111] text-[#111]` | `ring-2 ring-[#5B5BFF] ring-offset-2` |
| Nav links | `text-[#888]` | `text-[#111]` | `ring-2 ring-[#5B5BFF] ring-offset-2` |
| Card hover | `shadow-none` | `shadow-md translate-y-[-2px]` | — |

---

## 5. Page Structure — Single Long-Scroll

### ① Sticky Navigation
- Left: text logo `✦ We Automate. You Grow.` (Inter, weight 800) — the `✦` is an intentional typographic ornament (Unicode U+2726), not a Lucide icon component; do not replace it
- Right: nav links `Work · About · Contact` + filled `Hire Us →` CTA button
- Behavior: transparent background when at page top; solid white (`bg-white/95 backdrop-blur`) after scrolling past the hero
- Mobile: hamburger icon (Lucide `Menu`) — collapses nav links into a full-width dropdown
- Mobile persistent CTA: a floating `Hire Us →` button fixed to bottom of screen on mobile so contact is always reachable within 1 tap

### ② Hero Section
- Background: white with subtle sky-blue gradient strip at very top edge (Y2K cloud hint, `h-16 opacity-40`)
- Floating Y2K sticker badges (Framer Motion float animation, `useReducedMotion`-aware):
  - Top right: `✦ AI SPECIALIST` (yellow, rotated +6°)
  - Below it: `n8n EXPERT` (red, rotated -3°)
- Label: `AI WORKFLOW AUTOMATION · AI AGENTS · CHATBOTS` (monospace uppercase, muted)
- Headline (Bricolage Grotesque, weight 900, large): e.g. *"We build AI workflows that give your business back its time."* — key word italicized in `#5B5BFF`
- Subheadline: `We Automate. You Grow.` — reinforcing tagline
- Two CTAs: `See Our Work ↓` (filled, scrolls to Case Study) + `Let's Talk` (outlined, scrolls to Contact)
- Below CTAs: social proof micro-line — e.g. `✓ 1 client served · Real workflows · Real results`

### ③ Tech Stack Strip
- Label: `TOOLS WE WORK WITH` (monospace uppercase, muted)
- Single horizontal row of SVG wordmarks/logos
- Tools: n8n, OpenAI, Anthropic, WhatsApp, Telegram, Google Workspace, Slack
- Note: LangChain removed — include only tools the team has actively used on client work
- Background: `#F7F7F7`, logos rendered in muted gray tones
- Mobile: strip scrolls horizontally with `overflow-x-auto`
- Logo sources: official brand asset pages; confirm usage rights before launch

### ④ Services — Two Cards
- Section label: `WHAT WE DO` (monospace uppercase, muted)
- Two equal cards side by side (stack vertically on mobile):
  1. **n8n Workflow Automation**
     - Icon: Lucide `Workflow` or `GitBranch`
     - Short description: 2 sentences
     - Key outcomes: 3 bullet points max (e.g. "Connect your tools", "Eliminate manual work", "Run on autopilot")
  2. **Custom AI Agents & Chatbots**
     - Icon: Lucide `Bot`
     - Short description: 2 sentences
     - Key outcomes: 3 bullet points max
- Card style: white background, `border border-[#eee]`, `rounded-xl`, generous padding

### ⑤ Case Study — Featured
- Section label: `OUR WORK` (monospace uppercase, muted)
- One featured project, displayed editorially (not a small card)
- Structure:
  - Project title
  - Client industry (no client name required if confidential)
  - **Problem:** 1–2 sentences
  - **What we built:** tools used, integrations, approach
  - **Result:** concrete outcome (even qualitative is fine: "reduced manual processing time")
  - Tech stack pills: `n8n`, `OpenAI`, etc.
- Background: `#F7F7F7`, generous padding, feels like an editorial pull-quote layout
- Note: this project was delivered pro bono; do not mention pricing on the page

### ⑥ Testimonial
- Single client quote, large and prominent
- Attribution: client name + role (use whatever the client has approved)
- Style: centered layout, Bricolage Grotesque italic quote text (large), Y2K yellow oversized quotation mark as decorative accent
- Placed directly after case study — trust at the moment of peak interest

### ⑦ About
- Section label: `WHO WE ARE` (monospace uppercase, muted)
- Team headcount: **to be confirmed by team before build** (layout adapts):
  - 1 person: single avatar left, bio text right
  - 2–3 people: avatars stacked or side by side above shared bio
- Avatar: team photo preferred; illustrated avatar acceptable placeholder at launch but must be replaced before showing to clients
- Bio: 2–3 sentences — who the team is, what they care about, what makes them different (human tone, not a résumé)
- Skill pills (confirm final list with team): `n8n`, `OpenAI`, `Anthropic`, `AI Agents`, `Chatbots`, `API Integrations`, `Workflow Automation`

### ⑧ CTA / Contact
- Background: `#111111`
- Y2K sticker badge: `LET'S BUILD` (yellow, rotated -5°, Lucide `Zap` icon inline)
- Headline (Bricolage Grotesque, white): *"Ready to automate your business?"*
- Subtext: short and direct
- Contact mechanism: **`mailto:` link** (no backend required; simplest, most reliable for launch)
  - Primary CTA: `GET IN TOUCH →` links to `mailto:[email]`
  - Secondary: optional Calendly link rendered as plain text below (e.g. `Or book a free call →`)
- If Calendly is used: opens in a new tab (no embedded modal at launch — avoids extra JS weight)

---

## 6. SEO & Metadata

| Tag | Value |
|---|---|
| `<title>` | `We Automate. You Grow. — AI Automation Services` |
| Meta description | ~155 chars describing the team's services and location (Asia-based, global clients) |
| `og:title` | Same as `<title>` |
| `og:description` | Same as meta description |
| `og:image` | Custom 1200×630px image (hero visual or branded card) — added to content checklist |
| `robots.txt` | Generated via `next-sitemap` at build time |
| `sitemap.xml` | Generated via `next-sitemap` at build time |
| Favicon | 32×32 SVG favicon — design TBD, added to content checklist |
| Canonical URL | Set to production domain once known |

---

## 7. Responsive Design

- Mobile-first Tailwind breakpoints (`sm`, `md`, `lg`)
- Services cards: side by side on `md+`, stacked on mobile
- Hero headline: scales from `text-4xl` (mobile) to `text-7xl` (desktop)
- Nav: full links on `md+`, hamburger on mobile
- Tech stack strip: horizontal scroll on mobile
- Persistent floating `Hire Us →` button on mobile (fixed bottom, dismissible)
- All touch targets minimum 44×44px (Lighthouse accessibility requirement)

---

## 8. Animations (Framer Motion)

- Fade-in + slide-up on section entrance (triggered by `IntersectionObserver` via Framer Motion `whileInView`)
- Subtle floating animation on Y2K sticker badges in hero (continuous loop)
- All looping animations wrapped in `useReducedMotion` — stops animation if user has `prefers-reduced-motion` enabled
- Smooth scroll behavior: `scroll-behavior: smooth` via Tailwind `scroll-smooth` on `<html>`
- No parallax or heavy canvas animations — performance and accessibility first

---

## 9. Content Requirements Checklist

Before build begins, the team must provide:

**Copy**
- [ ] Hero headline (final wording, ~8–12 words)
- [ ] Hero sub-copy or tagline confirmation
- [ ] Services descriptions — 2 sentences + 3 outcome bullets per service
- [ ] Case study: project title, client industry, problem, solution, result, tools used
- [ ] Client testimonial quote + approved attribution (name + role minimum)
- [ ] Team bio (2–3 sentences, human tone)
- [ ] Contact email address
- [ ] Calendly URL (optional)
- [ ] `<title>` and meta description copy (~155 chars)
- [ ] Badge sticker text confirmation (`✦ AI SPECIALIST`, `n8n EXPERT`, `LET'S BUILD`)

**Assets**
- [ ] Team photo(s) or approved avatar image(s)
- [ ] Tech stack SVG logos (n8n, OpenAI, Anthropic, WhatsApp, Telegram, Google Workspace, Slack) — confirm brand usage rights
- [ ] Open Graph image (1200×630px)
- [ ] Favicon (SVG preferred, 32×32 fallback PNG)
- [ ] Skill pills final list (confirm or update default list)

**Configuration**
- [ ] Production domain (for canonical URL, `next/image` config, sitemap)
- [ ] Team headcount (determines About section layout)

---

## 10. Out of Scope

- Blog or content section
- Multi-language support
- CMS integration
- User authentication
- Contact form with backend (using `mailto:` at launch)
- Embedded Calendly modal (using external link at launch)

---

## 11. Future Considerations (Post-Launch)

- Upgrade contact to a form with Resend or Formspree
- Add more case studies as client work grows
- Add a blog/insights section for SEO
- Consider a CMS (Sanity or Contentlayer) once content volume justifies it
