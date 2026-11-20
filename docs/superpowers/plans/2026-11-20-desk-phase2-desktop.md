# The Desk — Phase 2 (Monitor Dive, Desktop Shell, Services, Run 01, Runs 02–05) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** After the hero, the camera dives into a beige CRT and the page becomes a Y2K desktop. Inside it are the services window, the flagship case file, Run 01 (Parts Price Finder on a CSS-3D phone, pinned) and Runs 02–05 as CD cases that scroll sideways. These replace today's TechStack, Services and CaseStudy sections.

**Architecture:** Same pattern as Phase 1. The markup is plain DOM, and each pinned section runs one `useScrollFrame` callback. That callback writes styles straight to refs, using pure timeline functions in `src/lib/desk/desktopTimeline.ts` that we unit-test. The complex visuals (hills wallpaper, CRT, windows, phone, CD cases) are ported as CSS from the mockup into `globals.css`, scoped under `.desk-world`. Reduced motion is handled with Tailwind `motion-reduce:` classes so server and client markup match, and the JS runs a single frame in the finished state. No WebGL is used in this phase.

**Tech Stack:** Next.js 15 App Router, React 18 (Next bundles 19), Tailwind, Framer Motion `useReducedMotion`, Lucide icons, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-20-the-desk-redesign-design.md` (§5.2–5.6, §6, §7)

**Port source:** `.superpowers/brainstorm/880-1794901238/content/desk-mockup-v8.html` (git-ignored, local; also at `git show preview/the-desk-mockup:public/mockup/index.html`).
CSS: hills wallpaper 57–64, dive 66–83, desktop/taskbar/icons/window 84–103, flagship intro/chips 104–110, run + phone 111–181, CD cases 182–200, generic window + services 203–219, narrow overrides 325–341, reduced 360–361.
Markup: dive 395–404, desktop shell 407–412, services 414–429, flagship 431–439, run 441–502, more 504–525. JS: `diveFrame` 627–631, `runFrame` 634–656, `moreFrame` 659, taskbar label 703–712.

## Global Constraints

- Branch `preview/desk-p2` (from `preview/desk-p1`). Never push to or merge into `main`.
- CSP in `next.config.mjs` stays unchanged. `img-src` already allows `data:`, so the hills SVG can stay a data URL.
- No emoji in components; icons are Lucide. Every scroll-driven or looping motion respects reduced motion.
- Brand: white / `#EEF2F0` / `#3662E3`, near-black `#111`. Pixel labels use `font-bitroad`, headings `font-display`.
- All copy lives in `src/lib/content.ts`.
- **No invented results.** Run 01 and Run 02 show a dashed red "needs your real figure" tag until Caio gives the numbers. Run 01's stamp is `'__ min → __ min'` (the mockup's "1 min" isn't a confirmed figure). Phone prices stay labelled "prices illustrative".
- The fire & life-safety client is never named, only "A Texas fire & life-safety services company". Supplier names stay generic ("Supplier A…F").
- Narrow breakpoint `820` px (`NARROW` from `heroTimeline.ts`; CSS `max-width: 820px`, same as Phase 1).
- Layout classes must not depend on `useReducedMotion()` (it's null on the server). Use `motion-reduce:` variants.
- Mockup class names are scoped under `.desk-world`. Rename the price-bar `.bar` to `.pbar`, because in the mockup `.win .bar` also hits it.

## Review Focus

1. **Reduced motion.** There's no pinning. The CRT shows at normal size with its copy, all five Run 01 steps are readable as a list, the phone shows the final "Top 3" view with the stamp on, and the CD cases wrap into a column with no horizontal page scroll. Pinned by the markup test in Task 2 and the reduced checks in Tasks 3–4.
2. **Short phone (375×667) mid-Run 01.** The phone, the active step text and the RESULT stamp all fit inside the pinned window, with nothing clipped. Browser check in Task 3.
3. **Resize / rotate mid-pin.** The CRT cover scale and the CD track offset are recomputed from the new viewport, so there's no gap and no over-scroll. `diveTransform` / `moreOffset` take the viewport as input (Task 1), and `useScrollFrame` re-runs on resize.
4. **Placeholders stay visible.** Run 01 and Run 02 render the "needs your real figure" tag, and `pendingFigures()` lists exactly those two. That function is Phase 4's go-live gate (Task 1 test).
5. **Nav jump to `#services` / `#work`.** The window lands below the fixed nav (`scroll-margin-top`), and the taskbar label matches the section in view. `activeTask` is tested in Task 1, and the nav clicks are checked in Task 5.

---

### Task 1: Content + desktop timelines (pure logic)

**Files:**
- Modify: `src/lib/content.ts`
- Create: `src/lib/desk/desktopTimeline.ts`, `src/lib/desk/desktopTimeline.test.ts`, `src/lib/content.test.ts`

**Interfaces — Consumes:** `clamp`, `lerp`, `ease` (`src/lib/desk/motion.ts`).
**Produces:**
- `type RunResult = { text: string; real: boolean }`
- `content.desktop = { dive: { title: 'So where does the work go?', sub: 'Into the machine. Come and look inside.', brand: 'autobeets 2000' }, icons: ['Runs', 'Now playing', 'Results.txt'] }`
- `content.services` is rewritten as `{ badge: 'What we do', title: 'Three programs.', titleEm: 'All run by themselves.', window: 'programs — what we do', items: { fn: string; icon: 'Workflow' | 'Bot' | 'Settings'; title: string; description: string; outcomes: string[] }[] }`, with the three items' copy taken verbatim from mockup lines 420–428 (`connect.exe`, `assistant.exe`, `wildcard.exe`). The old `bg`, `image` and `newDesign` fields are dropped.
- `content.flagship = { window: 'case_file_01 — flagship', badge: 'Case file 01 · Flagship', title: 'One company.', titleEm: 'Their whole back office', titleEnd: ', on autopilot.', body: string, chips: { label: string; hl: boolean }[] }`, with the body and the 10 chips verbatim from mockup lines 435–437 (the first two have `hl: true`).
- `content.run01 = { window: 'parts_finder.exe — run 01', title: 'Parts Price Finder', label: 'Run 01 · Parts Price Finder', steps: { title: string; body: string }[5], nodes: ['Photo', 'AI reads', 'Search', 'Inbox'], screen: { notifs: { from: string; text: string }[4], ids: { k: string; v: string }[3], rows: { supplier: string; price: string }[5], top3: { label: string; price: string }[3], sent: 'Sent to the office inbox', note: 'prices illustrative', waiting: 'customer still waiting' }, result: RunResult }`, with copy verbatim from mockup lines 446–498 and `result: { text: '__ min → __ min', real: false }`
- `content.runs = { title: 'Now playing: more runs.', badge: 'Case files 02–05', items: { file: string; industry: string; title: string; before: string; after: string; result: RunResult; pdfUrl?: string }[] }`, with copy verbatim from mockup lines 508–523. Run 02 has `{ text: '__ hrs saved / week', real: false }` and no PDF. Runs 03/04/05 are `real: true` and point to `/pdfs/innovation_case_study.pdf`, `/pdfs/procurement_case_study.pdf` and `/pdfs/coaching_case_study.pdf`.
- `pendingFigures(): string[]` returns the `title` of every run (`run01`, then `runs.items`) whose `result.real` is false, in order.
- `desktopTimeline.ts`:
  - `diveTransform(p: number, crtW: number, vp: { w: number; h: number }): { scale: number; copyOpacity: number }`. This is mockup `diveFrame`: `cover = max(vp.w/(.9*crtW), vp.h/(.675*crtW)) * 1.12`, `scale = lerp(1, cover, ease(clamp((p-.1)/.8)))`, `copyOpacity = 1 - clamp(p/.25)`.
  - `type RunState = { idx: number; lp: number; bars: number[]; litNodes: number; wires: number[]; view: 0 | 1 | 3 | 4; timer: string; shutter: number; scanOpacity: number; scanTop: number; idsOn: boolean[]; rowFill: number[]; rowWon: boolean[]; stamp: boolean; rx: number; ry: number; glareX: number }`
  - `runState(p: number): RunState`. This is mockup `runFrame` (lines 641–655) without the DOM: `fills = [.9,.78,.72,.4,.3]`, `turns = [[-42,-14],[-14,10],[10,-10],[-10,12],[12,-22]]`, `rowFill[i] = fills[i] * t`, `glareX = 50 + ry * 2.2`.
  - `moreOffset(p: number, trackScrollW: number, vw: number): number`, which is `-ease(p) * max(0, trackScrollW - vw)`, returning `0` rather than `-0` when there's no shift (`+ 0`)
  - `activeTask(sections: { top: number; bottom: number; task: string }[], mid: number): string | null`. It returns the first section where `top <= mid < bottom`, or null.

- [ ] **Step 1: Write the failing tests.**
  ```ts
  // desktopTimeline.test.ts
  expect(diveTransform(0, 540, { w: 1000, h: 800 })).toEqual({ scale: 1, copyOpacity: 1 })
  expect(diveTransform(1, 540, { w: 1000, h: 800 }).scale).toBeCloseTo(2.4582, 3)
  const mid = diveTransform(0.5, 540, { w: 1000, h: 800 }); expect(mid.scale).toBeCloseTo(1.7291, 3); expect(mid.copyOpacity).toBe(0)
  expect(diveTransform(0.125, 540, { w: 1000, h: 800 }).copyOpacity).toBeCloseTo(0.5)
  const s0 = runState(0); expect(s0).toMatchObject({ idx: 0, view: 0, timer: '00:00', ry: -42, rx: 8, stamp: false, litNodes: 0 })
  expect(runState(0.1).timer).toBe('09:21')
  const s1 = runState(0.3); expect(s1).toMatchObject({ idx: 1, view: 1, litNodes: 1, timer: '18:42' })
  expect(s1.bars).toEqual([1, 0.5, 0, 0, 0]); expect(s1.shutter).toBeCloseTo(0.7)
  const s2 = runState(0.5); expect(s2).toMatchObject({ idx: 2, view: 1, scanOpacity: 1, scanTop: 200 })
  expect(s2.idsOn).toEqual([true, true, false]); expect(s2.wires[0]).toBeCloseTo(0.5)
  const s3 = runState(0.7); expect(s3.view).toBe(3); expect(s3.rowFill[0]).toBeCloseTo(0.63); expect(s3.rowWon).toEqual([false, false, false, false, false])
  const s4 = runState(1); expect(s4).toMatchObject({ idx: 4, view: 4, stamp: true, rx: 2 }); expect(s4.ry).toBeCloseTo(-22)
  expect(s4.rowWon).toEqual([true, true, true, false, false]); expect(s4.glareX).toBeCloseTo(1.6)
  expect(moreOffset(0, 2000, 1000)).toBe(0); expect(moreOffset(0.5, 2000, 1000)).toBe(-500)
  expect(moreOffset(1, 2000, 1000)).toBe(-1000); expect(moreOffset(1, 800, 1000)).toBe(0)   // track narrower than screen: no shift
  const secs = [{ top: -500, bottom: 100, task: 'programs' }, { top: 100, bottom: 900, task: 'case_file_01' }]
  expect(activeTask(secs, 400)).toBe('case_file_01'); expect(activeTask(secs, 100)).toBe('case_file_01'); expect(activeTask(secs, 2000)).toBeNull()
  // content.test.ts
  expect(pendingFigures()).toEqual(['Parts Price Finder', 'Work Order Intake'])
  expect(runs.items).toHaveLength(4); expect(runs.items.filter((r) => r.pdfUrl)).toHaveLength(3)
  expect(run01.steps).toHaveLength(5); expect(services.items.map((s) => s.fn)).toEqual(['connect.exe', 'assistant.exe', 'wildcard.exe'])
  ```
- [ ] **Step 2: Run** `npm test`. Expected: FAIL (modules / exports missing).
- [ ] **Step 3: Implement** `desktopTimeline.ts` and the new content. Leave `techStack` and `caseStudies` in place for now, because the old components still import them until Task 2.
- [ ] **Step 4: Run** `npm test`. Expected: PASS (24 old + new).
- [ ] **Step 5: Commit** `feat(desk): desktop content and timelines`

---

### Task 2: Monitor dive + desktop shell + services and flagship windows (replaces old sections)

**Files:**
- Create: `src/components/desk/MonitorDive.tsx`, `src/components/desk/DesktopShell.tsx`, `src/components/desk/DeskWindow.tsx`, `src/components/desk/ServicesWindow.tsx`, `src/components/desk/FlagshipCase.tsx`, `src/components/desk/DesktopWorld.test.tsx`
- Modify: `src/app/globals.css` (port: hills, dive, desktop/taskbar/icons, `.win`, intro/chips, generic window + services, the matching narrow overrides; vars `--soft/--blue/--ink/--muted` from mockup line 17 defined on `.desk-world`)
- Modify: `src/app/page.tsx`. After `<DeskHero />`, the covering wrapper renders `<MonitorDive />` and then `<DesktopShell>` (containing `ServicesWindow`, `FlagshipCase`, and the Run 01 / more-runs slots that Tasks 3–4 fill), followed by the old `Testimonial`, `About`, `Pricing`, `ROICalculator` and `FreeAuditSection` (those go in Phases 3–4).
- Delete: `src/components/sections/TechStack.tsx`, `Services.tsx`, `CaseStudy.tsx`, plus `techStack` and `caseStudies` from `content.ts` (check with grep that nothing else imports them)

**Interfaces — Consumes:** `content.desktop/services/flagship`, `diveTransform`, `activeTask`, `sectionProgress`, `useScrollFrame`.
**Produces:**
- `<DeskWindow title: string; className?: string; bodyClassName?: string; children>` renders `.win`: a blue bar with the `font-bitroad` title and three decorative squares (`aria-hidden` spans), then `.body`.
- `<DesktopShell>{children}</DesktopShell>`: `.desk-world` root with the sticky hills wall, the desktop icons (`aria-hidden`, hidden below 820) and the sticky taskbar (`aria-hidden`; a "Run" start chip, one active-task label, and the visitor's local `HH:MM` set after mount and refreshed every 60 s). On scroll it collects `[data-task]` elements inside itself and sets the label to `activeTask(rects, innerHeight / 2)`, keeping the last label when the result is null.
- Each window section carries `data-task`: services `programs` (`id="services"`), flagship `case_file_01` (`id="work"`). Both get `scroll-mt-20`.
- `MonitorDive`: `<section id="dive">` at `260vh` with a sticky `100svh` stage, the checkered desk background (mockup lines 68–70), the copy and the CRT (hills screen, mini icons, chin with `desktop.dive.brand`, green LED, foot), all `aria-hidden` apart from the heading copy. Each frame it sets `crt.style.transform = scale(...)` and the copy opacity from `diveTransform(p, crt.offsetWidth, vp)`. With reduced motion it uses `motion-reduce:h-auto` on the section and `motion-reduce:relative` on the stage, and the JS runs one frame at `p = 0`.

- [ ] **Step 1: Write the failing test** `DesktopWorld.test.tsx` (server markup, same style as `DeskHero.test.tsx`). Render `<MonitorDive />` and `<DesktopShell><ServicesWindow /><FlagshipCase /></DesktopShell>` with `renderToString` and assert:
  `html` contains `id="dive"`, `motion-reduce:h-auto`, `id="services"`, `data-task="programs"`, `id="work"`, `data-task="case_file_01"`, `connect.exe`, `A Texas fire &amp; life-safety services company`, and the window bars contain no `<button` (the decorative squares aren't buttons).
- [ ] **Step 2: Run** `npm test`. Expected: FAIL.
- [ ] **Step 3: Implement** the components and CSS, then wire up `page.tsx` and delete the old sections and content.
- [ ] **Step 4: Verify.** `npm test` and `npm run build` pass. In `npm run dev` at 1280×800: scroll past the hero, the CRT zooms until its screen fills the view, and the hills desktop continues with no white gap. The services window shows three program cards, the flagship shows the chips, and the taskbar reads `programs` then `case_file_01`. At 390×844 the program cards stack, there are no icons, the taskbar shows only the active label, and there's no horizontal scroll. With reduced motion there's no pinning and the CRT shows at normal size.
- [ ] **Step 5: Commit** `feat(desk): monitor dive, desktop shell, services and flagship windows`

---

### Task 3: Run 01 — Parts Price Finder on the CSS-3D phone

**Files:**
- Create: `src/components/desk/RunPartsFinder.tsx`, `src/components/desk/RunPhone.tsx`
- Modify: `src/app/globals.css` (port run + phone CSS 111–181 and narrow lines 330–337; `.bar` → `.pbar` inside the phone)
- Modify: `src/components/desk/DesktopWorld.test.tsx`, `src/app/page.tsx` (slot after `FlagshipCase`)

**Interfaces — Consumes:** `content.run01`, `runState`, `sectionProgress`, `useScrollFrame`, `DeskWindow`.
**Produces:**
- `<RunPhone>` is `aria-hidden="true"` (an illustration; the steps carry the meaning). It renders 14 `.ly` edge layers (`translateZ(-1…-14px)`), the back face, the front with island, views `v0/v1/v3/v4` from `run01.screen`, and the glare. It exposes refs through `forwardRef<RunPhoneHandle>` where `RunPhoneHandle = { apply(s: RunState): void }`. `apply` writes the phone rotation, glare, view `.on`, timer, shutter, scan, ids, `.pbar` widths and `won`.
- `RunPartsFinder`: `<section id="run" data-task="parts_finder.exe">` at `560vh` with a sticky `100svh` stage and a `DeskWindow` of `run01.window`. On the left are the label, a 5-segment progress bar and the 5 steps (`.step`, `.on` toggled). On the right are the node strip (4 Lucide icons: `Camera`, `Cpu`, `Search`, `Mail`, with wires), `RunPhone`, the shadow, and the RESULT stamp. The stamp is real text **outside** the aria-hidden phone and shows `run01.result.text`, plus a `.todo` "needs your real figure" span when `!result.real`. Each frame applies `runState(sectionProgress(...))` to the steps, bars, nodes, wires, stamp and `phone.apply`.
- Reduced motion uses `motion-reduce:` classes: the section is `h-auto`, the stage `relative`, the steps box `h-auto` with each `.step` `static opacity-100 translate-none` (all five listed), and the JS runs one frame at `p = 1` (final view + stamp on). Narrow: the phone is scaled as one unit (mockup uses `zoom:.74`; use the same).

- [ ] **Step 1: Add the failing test.** Rendering `<RunPartsFinder />` gives `html` that contains `id="run"`, `data-task="parts_finder.exe"`, all five step titles, `needs your real figure`, `prices illustrative`, `motion-reduce:h-auto` and `data-stamp`. Separately, `renderToString(<RunPhone />)` does **not** contain `run01.result.text` but does contain `aria-hidden="true"` (the stamp stays readable text outside the hidden phone).
- [ ] **Step 2: Run** `npm test` (FAIL), then implement, then `npm test` (PASS).
- [ ] **Step 3: Verify in the browser.** At 1280×800: the phone turns at each step, the timer runs to 18:42, the shutter flashes, the scan line sweeps and the ids appear, the price bars fill and the top 3 win, and the stamp slams in on step 5. At 390×844 **and 375×667**: the phone, the step text and the stamp are all visible inside the window with nothing clipped (Review Focus 2). If 667 clips, reduce the narrow phone scale or step-box height for `max-height: 700px`. With reduced motion: all five steps are listed and the final view and stamp show.
- [ ] **Step 4: Commit** `feat(desk): Run 01 parts finder with CSS-3D phone`

---

### Task 4: Runs 02–05 — CD cases, horizontal scroll

**Files:**
- Create: `src/components/desk/MoreRuns.tsx`
- Modify: `src/app/globals.css` (port 182–200 + narrow 338–341), `src/components/desk/DesktopWorld.test.tsx`, `src/app/page.tsx` (slot after Run 01)

**Interfaces — Consumes:** `content.runs`, `moreOffset`, `sectionProgress`, `useScrollFrame`, `DeskWindow`.
**Produces:** `<section id="more" data-task="more_runs">` at `320vh` with a sticky stage containing the heading and badge, and a `.track` of 4 `.case` items. Each case has a decorative disc (`aria-hidden`), a `DeskWindow` titled with `file`, the industry, title, Before/After, and a `.res` result block (with a `.todo` when `!real`). When `pdfUrl` is set it shows a link "Read the case study" (Lucide `FileText`, `target="_blank" rel="noopener noreferrer"`). Each frame sets `track.style.transform = translateX(moreOffset(p, track.scrollWidth, innerWidth))`. Reduced motion: the section is `h-auto` and the stage `relative`, the track is `motion-reduce:flex-wrap motion-reduce:justify-center` with no transform (the JS runs one frame at `p = 0`), and cases are `max-w-full`.

- [ ] **Step 1: Add the failing test.** Rendering `<MoreRuns />` gives `html` that contains `id="more"`, `data-task="more_runs"`, the 4 titles, exactly 3 `href="/pdfs/`, `needs your real figure` once, and `motion-reduce:flex-wrap`.
- [ ] **Step 2: Run** `npm test` (FAIL), then implement, then `npm test` (PASS).
- [ ] **Step 3: Verify.** At 1280×800 and 390×844 the cases slide left while pinned, the last case ends fully in view, and the page has no horizontal scrollbar (`document.documentElement.scrollWidth === innerWidth`). After a resize mid-pin the offset recomputes. With reduced motion the cases wrap vertically and every PDF link opens.
- [ ] **Step 4: Commit** `feat(desk): runs 02-05 as CD cases`

---

### Task 5: Full check, push, preview, final review

- [ ] **Step 1: Run** `npm test` and `npm run build`, both passing, then `git checkout public/sitemap.xml`.
- [ ] **Step 2: Browser pass** with puppeteer-core and Chrome (CONTEXT.md gotchas) at 1280×800, 390×844 and 375×667, normal and reduced motion. Take screenshots at the dive midpoint, the services window, Run 01 steps 1/3/5 and the more-runs midpoint. Click the nav `Services` and `Work` links and check that the window top sits below the nav and the taskbar label matches. Check that the console shows no errors and no CSP violations.
- [ ] **Step 3: Lighthouse mobile** on `npm run start`. Record the scores. Performance must not drop below Phase 1's 67. Accessibility and SEO stay ≥ 90.
- [ ] **Step 4: Final review.** Dispatch one reviewer (superpowers:requesting-code-review, model `opus`) over `preview/desk-p1..HEAD`, then fix the important findings and add any minors to the CONTEXT.md backlog.
- [ ] **Step 5: Push.** After asking Caio, push with `git -c credential.helper= -c "credential.helper=!gh auth git-credential" push -u origin preview/desk-p2`. Send the Vercel preview URL, update STATUS.md, and `/wrap`.
