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

### Color Tokens & Branding (Updated)
We use a **60-30-10** distribution rule for a premium B2B editorial feel:
- **60% Base (White / `#FFFFFF`)**: For stark, massive negative space.
- **30% Secondary (`#EEF2F0`)**: For bento cards and structural separation.
- **10% Brand Accent (`#3662E3`)**: The primary call-to-action color.

Other legacy/utility tokens:
- Near-black:  `#111111`
- Muted:       `#AAAAAA` (labels, subtitles)

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
| 6 | Hero section | ✅ Done |
| 7 | Tech Stack Strip | ✅ Done |
| 8 | Services section | ✅ Done |
| 9 | Case Study section | ✅ Done |
| 10 | Testimonial section | ✅ Done |
| 11 | About section | ✅ Done |
| 12 | Contact/CTA section | ✅ Done |
| 13 | SEO, sitemap & favicon | ✅ Done |
| 14 | Deploy to Vercel | ⬜ Pending |

| 14 | Deploy to Vercel | ⬜ Pending |

## Recent Achievements & Brand Upgrades (2026-03-16)
1. **Case Study & Workflow Redesign**: Rebuilt the "Our Work" section into an asymmetrical, massive 3-column Editorial layout with 3D conceptual workflow art. Includes a 3-project carousel.
2. **Global Button Standardization**: Unified all buttons under the `#3662E3` brand. Primary buttons are solid blue pills (`rounded-xl` shape) with smooth color transition hovers (no spatial movement). Secondary buttons are white with thin borders.
3. **Neo-Brutalist Y2K Section Titles**: Redesigned generic section labels into Y2K Neo-Brutalist badges (`border-2 border-[#3662E3] text-[#3662E3] shadow-[4px_4px_0px_0px_#3662E3] bg-white`).
4. **Custom Font Integration**: Successfully integrated the custom `Bitroad` pixel font for all section titles to perfectly contrast the massive serif headlines.
5. **Widget Formatting**: Placed and refined transparent Y2K 3D widgets (Flip Phone, Lightning, Gear Heart, Robotic Arm) across sections, ensuring they respect container margins.
6. **Brand Guidelines**: Established the central source of truth at `docs/brand/BRANDING.md` locking in the 60/30/10 color rule and geometry.

## UI/UX Polish Sprint (2026-04-03)
1. **Isolated 3D Imagery & Aesthetic Grounding**: Removed the "Retro OS Windows" frames from the `About` team photo and `Services` items to strictly highlight the simple, clean 3D graphics on their own. Removed playful hover-scaling from these assets to ground the design and make it feel more strictly professional.
2. **CSS mix-blend-screen Technique**: Re-generated minimalist 3D icons (`simple_construction_sign.png`, `simple_excavator.png`, `simple_building.png`) on pitch-black backgrounds. We natively apply `mix-blend-screen opacity-90` to perfectly extract the pure 3D subjects on our dark UI blocks without needing background deletion software.
3. **Mobile Layout Resiliency**: Replaced unstable `display: contents` grid behaviors in the `CaseStudy.tsx` mobile view with rock-solid, explicit flex columns and row ordering to guarantee image mounts on iOS/Safari mobile views. 
4. **TechStack Mobile Flow**: Modified `TechStack.tsx` statistics sub-row to horizontally flow (`flex-row max-w-full justify-between`) on small screens to conserve vertical height, scaling down `text-4xl` to `text-2xl` gracefully.

**Next session:** QA interactions across devices, clear out any unused image artifacts, and prepare for Vercel Deployment.

## Important Rules
- No emoji in JSX/components — use Lucide icons
- All looping Framer Motion animations must use `useReducedMotion`
- Contact is `mailto:` only at launch — no form backend
- The `✦` in the nav logo is a Unicode typographic ornament (U+2726), not an icon
- Mobile must have a persistent floating `Hire Us →` CTA button
- Lighthouse target: 90+ on Performance, Accessibility, and SEO
