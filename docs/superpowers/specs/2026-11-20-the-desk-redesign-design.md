# "The Desk" — 2027 Portfolio Redesign — Design

**Date:** 2026-11-20 · **Owner:** Caio · **Status:** for approval
**Reference mockup:** `public/mockup/index.html` on branch `preview/the-desk-mockup`
(Vercel preview: `autobeets-j4mb2o2on-vjnupswingtemp-stars-projects.vercel.app/mockup/index.html`)

## 1. Intent — why

The team sends 2027 client proposals that link to autobeets.vercel.app. Today's site has the right
ingredients (real case studies, a named testimonial, pricing, chatbot, free audit) but reads like a design
experiment: three visual styles compete, the hero stats are slogans, and the case-study section is the weakest
part. The redesign makes the site **demonstrate** automation instead of describing it, so that a business owner
opening the proposal link understands what we do in one scroll and trusts us with a $5k–25k build.

**Success:** a prospect scrolls once, sees their own messy week get sorted, watches a real job get automated,
tries it with their own task, and books an audit or call. The page also looks strong enough to submit for design
awards.

## 2. Goals, non-goals, anti-goals

**Goals**
- One continuous story: **messy physical desk → into the computer → work gets done → back to the desk.**
- Keep every working feature of today's site (chat, free audit, booking, pricing, ROI, SEO, analytics).
- Proof first: real case studies and the real testimonial, with real result figures.
- Works fully on phones; readable with motion turned off.

**Non-goals**
- No new services, no blog, no multi-page site, no CMS.
- No change to the n8n chat brain or the free-audit n8n workflow (only their front-ends).
- No team / "Who we are" section (removed by Caio, 2026-11-17).

**Anti-goals — failure even if it "works"**
- Prospects see placeholders, fake numbers or fake AI answers.
- The fire & life-safety client is identifiable.
- Third-party brand logos/likenesses (Tamagotchi, Sony, Microsoft wallpaper or UI).
- Phones stutter or the page is unusable without WebGL / with reduced motion.
- The live site breaks before Caio says "go live".

## 3. Constraints

- **Stack:** existing Next.js 15 App Router, React 18, Tailwind, Framer Motion, Lucide icons.
  New: `three`, `@react-three/fiber@8`, `@react-three/drei@9` (React 18 compatible).
- **CSP stays as is** (`next.config.mjs`): no external scripts, fonts, images or iframes. All libraries via npm,
  fonts via `next/font` (Bricolage Grotesque, Inter, Bitroad; add Caveat).
- **Brand:** 60/30/10 — white / `#EEF2F0` / `#3662E3`; near-black `#111`. Bitroad pixel labels,
  neo-brutalist badges (`border-2 #3662E3`, `shadow 4px 4px 0`). See `docs/brand/BRANDING.md`.
- **Project rules (CLAUDE.md):** no emoji in components (Lucide icons); every looping animation honours
  `useReducedMotion`; persistent floating mobile CTA; Lighthouse 90+ Performance, Accessibility, SEO.
- **Deploy:** `main` = production. All work on `preview/*` branches; `main` changes only on Caio's "go live".

## 4. Approaches considered

| Approach | Trade-off | Verdict |
|---|---|---|
| **A. Rebuild as React components in the existing app, porting the mockup's logic** | Most work; keeps chat/audit/SEO/analytics, maintainable, testable per phase | **Chosen** (Caio, 2026-11-20) |
| B. Put the mockup HTML live and wire its buttons to the real APIs | Fast, but one 1,000-line hand-made page; hard to maintain; second app beside Next | Rejected |
| C. Put the mockup live as-is | Fastest; prospects would see placeholders and fake chat | Rejected |

3D: models **built in code** (likenesses, no logos), not image-to-3D files — Caio, 2026-11-16.
Within A, 3D uses **React Three Fiber in one fixed canvas** (my call): one WebGL context for hero, guide and ending,
declarative models that port cleanly from the mockup's three.js code.

## 5. The page, section by section

Order and behaviour follow mockup v8. Section IDs in brackets are anchors the nav uses.

### 5.0 Global
- **Nav** (sticky, slim): logo, `Services` `Work` `Pricing`, "Book a call" → `https://cal.com/autobeets/30min`.
- **One fixed 3D canvas** behind/above content, rendering per scroll position: hero models, the corner guide pet,
  the ending pet. Loaded client-only after first paint.
- **Pet guide** (from the end of the hero to the start of the ending): small 3D pet in the bottom-right corner.
  On each new section it hops and shows a one-line speech bubble (5 s, then fades). Tapping it opens the **real chat**.
- **Mobile floating CTA:** a "Hire us →" pill next to the pet that opens the free-audit modal (keeps the CLAUDE.md rule).

### 5.1 Hero — the physical desk [`#hero`]
- Pinned ~3 screens of scroll. Blue-white checkered desk floor in perspective, sliding as you scroll.
- Six realistic notes/sheets (sticky notes with handwriting and tape; stapled work order; lead sheet) start
  scattered; on scroll they line up on a blue rail, get pen-struck and a check. Badge flips "Your week, before → after";
  "We Automate." then "**You Grow.**" reveals; subline changes.
- 3D virtual pet (pink candy shell, glitter, chrome rim, LCD showing a pixel creature — stressed → happy) and 3D
  portable CD player with headphones (lid closes, disc spins) each do one full spin while travelling to flank the headline.
- Hero CTAs: "Start your free audit" (opens audit modal), "Book a call".

### 5.2 Dive into the monitor
- "So where does the work go?" A beige CRT on the desk; scroll zooms the camera into its screen, which becomes the
  desktop world. Wallpaper: **our own** rolling green hill + blue sky drawing.

### 5.3 Inside the computer — desktop shell
- Sticky wallpaper, left icons (Runs, Now playing, Results.txt — decorative, desktop only), bottom taskbar whose
  active label follows the section (`programs`, `parts_finder.exe`, `try_it.exe`, `setup_wizard`, `calculator`).
- Content sits in brutalist **windows** (blue title bar, pixel title, 3 square buttons, hard 8px shadow).

### 5.4 Services — "Three programs. All run by themselves." [`#services`]
- Three program cards: `connect.exe` Connecting your apps · `assistant.exe` Custom support bots ·
  `wildcard.exe` Bespoke automations. Copy from `content.ts → services`.

### 5.5 Flagship case — "One company. Their whole back office, on autopilot." [`#work`]
- "A Texas fire & life-safety services company" — never named. Chips of the automations built for them.
- **Run 01 — Parts Price Finder**, pinned ~5 screens: left = 5 steps (old way → snap photo → AI identifies →
  price hunt → done in inbox) with progress bar; right = node strip (Photo → AI reads → Search → Inbox) and a
  **realistic CSS-3D phone** (thickness, titanium edge, island, glare) that turns per step and plays the step on its
  screen; final **RESULT stamp** with the real figure.

### 5.6 More runs — CD cases (horizontal scroll)
- Run 02 Work Order Intake (fire & life safety) · Run 03 Student Enrollment · Run 04 Document Generation ·
  Run 05 Coaching Automation Suite. Each: industry, before/after, result block, link to its existing case-study PDF.

### 5.7 Try it yourself — `try_it.exe`
- Visitor types a task they hate (or taps an example). Five step-nodes build in sequence, ending
  "Want this one built for real? → free audit".
- **Real AI** (Caio, 2026-11-20): new route `/api/sketch` → new n8n webhook → AI returns 5 short steps.
  On timeout/error the page falls back to built-in keyword sketches and labels them "example".

### 5.8 Pricing — `setup_wizard` [`#pricing`]
- Step 1 choose a build (Basic / Standard / Advanced / Custom), Step 2 optional care plan (Essential / Growth /
  Partner). Live summary "Standard + Growth care". CTA "Next: free audit" opens the audit modal.
  Prices exactly as today's `Pricing.tsx`.

### 5.9 ROI calculator [`#roi-calculator`]
- Pink Y2K calculator look, **today's formula unchanged** (Caio, 2026-11-20):
  `ghostedLeads × recoveryRate% × clientValue × 12`; leads 5–200 step 5 (default 30), value $500–10,000 step 100
  (default 1,500), rate 5–50% step 5 (default 20) → default shows **$108,000**. CTA opens the audit modal
  (fixes today's broken `#contact` link).

### 5.10 Back to the desk → testimonial [`#testimonial`]
- "Back to the desk…" transition out of the computer. Lyndon Joy (LJCI Merchandising) as a taped polaroid that
  develops on scroll; the quote lights up word by word, key words in blue.

### 5.11 Ending — "Feed me a task. I'll do it forever."
- The 3D pet pops in above the headline. Three A/B/C buttons like the pet's own: **A** Free audit (modal),
  **B** Book a call (cal.com), **C** Chat with us (opens chat).

## 6. Behaviour rules

- **Reduced motion / no WebGL:** no pinning, no scroll-driven motion; sections render in their finished state;
  3D replaced by a static poster image. All content still readable and every CTA works.
- **Phones (<820px):** layouts stack as in mockup v8 (notes in a 3×2 grid, phone scaled as one unit, CD cases
  narrower, pricing options one column); lighter pet shell material; no horizontal page scroll.
- **Performance:** 3D canvas client-only and lazy; render loop paused when no 3D is on screen; images via
  `next/image`; Lighthouse mobile 90+.
- **Accessibility:** real text everywhere (no text in canvas), visible focus, buttons are buttons, speech bubble
  is `aria-live="polite"`, the 3D canvas is `aria-hidden`.

## 7. Content and data

- All copy in `src/lib/content.ts` (extend: hero notes, desk/dive copy, flagship case, runs 01–05, pricing data,
  speech lines, try-it examples, ending).
- **Result figures:** Run 01 and Run 02 need real numbers from Caio. Build may proceed with a visible `TODO`
  value in content; **go-live is blocked until both are real**.
- Optional: an owner quote from the fire & life-safety company (credited without a name).

## 8. Integrations kept (contracts unchanged)

- **Chat:** `ChatWidget` + `POST /api/chat {message} → {reply}` via n8n `N8N_WEBHOOK_URL`; keep markdown rendering
  and `[BUTTON: Label | url]` parsing. Only change: open/close state moves into a `ChatContext` so the pet and
  the ending's C button can open it.
- **Free audit:** `AuditModalProvider` / `useAuditModal().openModal`, `AuditModal` fields, `POST /api/consultation`
  via `N8N_AUDIT_WEBHOOK_URL`. Fix: the route must report failure (today it always returns success) and must stop
  logging the full form (personal data).
- **New:** `POST /api/sketch {task} → {steps: string[5]}` via `N8N_SKETCH_WEBHOOK_URL` (+ `N8N_AUTH_KEY`);
  same validation as `/api/chat` (string, 1–500 chars).
- **SEO/analytics:** keep metadata, Vercel Analytics, sitemap/robots; add JSON-LD `Organization`; new OG image.

## 9. Removed

`TechStack`, `About`, `Contact` (unused), old `CaseStudy`, `FreeAuditSection`, unused `CalProvider`, the old Y2K
hero PNG props, and the throwaway `public/mockup/` once the real build replaces it.

## 10. Delivery

Four phases, each on its own `preview/desk-pN` branch with a Vercel preview Caio checks on desktop and phone:
1. Foundation + hero desk + 3D models · 2. Monitor dive, desktop shell, services, flagship run, more runs ·
3. Try-it (+ n8n workflow), pricing wizard, ROI, testimonial, ending · 4. Pet guide + chat context, mobile CTA,
API fixes, clean-up, SEO. Then **go live** on Caio's explicit word (merge to `main`).

## 11. Left to the builder

Component boundaries and file names; exact scroll lengths and easing (start from mockup v8 values);
R3F model structure; how the shared canvas switches between hero / guide / ending modes; the n8n prompt
wording for the sketch workflow; poster image production.
