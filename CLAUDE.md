# Portfolio — Claude Project Instructions

## What This Project Is
A single long-scroll portfolio website for a small team of AI automation freelancers.
Target: Land first paying client in the AI automation space.
Identity tagline: **"We Automate. You Grow."**

## Services Offered
1. n8n Workflow Automation
2. Custom AI Agents & Chatbots

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (always use `useReducedMotion` on loops)
- **Icons:** Lucide React (no emoji in components)
- **Fonts:** Bricolage Grotesque (display) + Inter (body) via `next/font/google`
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

## Visual Style — "Playful Pro"
Apple-level whitespace + Y2K aesthetic (bold type, rotated badge stickers, playful color pops).

### Color Tokens
```
Base:        #FEFEFE
Near-black:  #111111
AI Accent:   #5B5BFF  (links, italic highlights)
Y2K Yellow:  #FFE500  (badge stickers)
Sticker Red: #FF6B6B  (accent tags)
Muted:       #AAAAAA  (labels, subtitles)
Light gray:  #F7F7F7  (section backgrounds)
```

## Page Sections (in order)
1. Sticky Nav
2. Hero
3. Tech Stack Strip
4. Services (2 cards)
5. Case Study (1 featured, pro bono project)
6. Testimonial (1 real client quote)
7. About
8. CTA / Contact (`mailto:` link, no backend)

## Active Agents
All four agents in `.claude/agents/` are scoped to this project:
- `frontend-developer` — Next.js implementation
- `ui-designer` — visual and component decisions
- `ux-architect` — page structure and user flow
- `whimsy-injector` — Y2K personality and playful touches

## Key Docs
- Design spec: `docs/specs/2026-03-15-portfolio-design.md`
- Implementation plan: `docs/superpowers/plans/2026-03-15-portfolio-build.md`

## Build Progress (as of 2026-03-15)

| Task | Description | Status |
|------|-------------|--------|
| 1 | Scaffold Next.js 14 + install dependencies | ✅ Done |
| 2 | Design system (tailwind.config.ts, globals.css, layout.tsx, tokens.ts) | ✅ Done |
| 3 | Shared UI primitives (Badge, PillTag, FloatingCTA) | ✅ Done |
| 4 | Content file (src/lib/content.ts) | ✅ Done |
| 5 | Sticky Nav (src/components/layout/Nav.tsx) | ✅ Done |
| 6 | Hero section | ⬜ Pending |
| 7 | Tech Stack Strip | ⬜ Pending |
| 8 | Services section | ⬜ Pending |
| 9 | Case Study section | ⬜ Pending |
| 10 | Testimonial section | ⬜ Pending |
| 11 | About section | ⬜ Pending |
| 12 | Contact/CTA section | ⬜ Pending |
| 13 | SEO, sitemap & favicon | ⬜ Pending |
| 14 | Deploy to Vercel | ⬜ Pending |

**Next session:** Resume from Task 6 — `/build-section hero`

## Important Rules
- No emoji in JSX/components — use Lucide icons
- All looping Framer Motion animations must use `useReducedMotion`
- Contact is `mailto:` only at launch — no form backend
- The `✦` in the nav logo is a Unicode typographic ornament (U+2726), not an icon
- Mobile must have a persistent floating `Hire Us →` CTA button
- Lighthouse target: 90+ on Performance, Accessibility, and SEO
