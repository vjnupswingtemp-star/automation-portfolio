# The Desk — Phase 1 (Foundation + Hero Desk + 3D Models) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace today's hero with "The Desk" hero: scroll-pinned checkered desk where six notes line up and get ticked off, plus the 3D pet and CD player in one shared fixed canvas. Everything below the hero stays as it is for now.

**Architecture:** The hero copy and notes are plain DOM. A single rAF scroll handler writes transforms straight to element refs (no React state per frame), using pure timeline functions that we unit-test. The 3D runs in one client-only React Three Fiber `<Canvas>` fixed behind the page. The pet, player and floor are ported from the mockup's three.js code as plain builder functions and mounted with `<primitive>`. With reduced motion or no WebGL there's no pinning and no canvas, and the hero renders in its finished state.

**Tech Stack:** Next.js 15 App Router, React 18, Tailwind, Framer Motion (`useReducedMotion`), `three@0.160.0`, `@react-three/fiber@^8.17`, Vitest for the pure logic.

**Spec:** `docs/superpowers/specs/2026-11-20-the-desk-redesign-design.md` (§5.0 canvas, §5.1 hero, §6 behaviour rules, §10 phase 1)

**Reference mockup (port source):** `.superpowers/brainstorm/880-1794901238/content/desk-mockup-v8.html` (git-ignored, local). It's also at `git show preview/the-desk-mockup:public/mockup/index.html`. Hero CSS is at lines 30–63, hero markup at 376–389, the `heroFrame` timeline at 609–623, the three.js scene at 736–934.

## Global Constraints

- Branch `preview/desk-p1`. Never push to or merge into `main`.
- CSP in `next.config.mjs` stays unchanged: no CDN, no external fonts. Libraries come from npm, fonts from `next/font`.
- No emoji in components (use Lucide icons). Every looping animation respects `useReducedMotion`.
- Brand: white / `#EEF2F0` / `#3662E3`, near-black `#111`; badge = `border-2 border-[#3662E3] shadow-[4px_4px_0_0_#3662E3]`.
- No third-party logos on the 3D models. The pet is a generic candy-egg pet and the player a generic CD player.
- All copy lives in `src/lib/content.ts`.
- Narrow breakpoint is `820` px (layouts below it follow the mockup's narrow branch).
- 3D canvas: `aria-hidden`, `pointer-events: none`, client-only, loaded after first paint, render loop paused when the hero is off screen.
- Lighthouse mobile target 90+ Performance / Accessibility / SEO.

## Review Focus

1. **Window resize / phone rotation mid-scroll.** Notes, rail and models re-lay out for the new size and nothing ends up off screen. Tested in Task 3 by passing viewport size into `noteTransform` and recomputing on `resize`.
2. **Reduced motion on.** There's no pinning and no canvas, notes are lined up and ticked, "You Grow." is visible and both CTAs work. Tested via the `reduced` branch in Task 3 and the `canUse3D` test in Task 5.
3. **WebGL unavailable or the 3D chunk fails to load.** The hero still reads and works with no blank area and no console crash. Tested via `canUse3D` returning false, plus an error boundary around the canvas in Task 5.
4. **Phone width (<820 px).** Notes sit in a 3×2 grid, the models are smaller and the page has no horizontal scroll. Tested via the narrow cases in Task 2 and the 390 px check in Task 6.
5. **Jumping past the hero (nav link to `#services`, or a fast fling).** The hero snaps to the finished state, the canvas stops rendering and the sections below render on top. Tested via `sectionProgress` clamping in Task 1 and the frameloop check in Task 5.

---

### Task 1: Foundation — dependencies, test runner, font, motion helpers

**Files:**
- Modify: `package.json` (deps + `"test": "vitest run"`)
- Modify: `src/app/layout.tsx` (add Caveat font)
- Modify: `tailwind.config.ts` (add `fontFamily.hand: ['var(--font-caveat)', 'cursive']`)
- Create: `src/lib/desk/motion.ts`, `src/lib/desk/motion.test.ts`

**Interfaces — Produces:**
- `clamp(v: number, a = 0, b = 1): number`
- `lerp(a: number, b: number, t: number): number`
- `ease(t: number): number`: easeInOutCubic, copied exactly from the mockup: `t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2`
- `sectionProgress(rectTop: number, sectionHeight: number, viewportH: number): number`: returns `1` when `sectionHeight - viewportH <= 0`, otherwise `clamp(-rectTop / (sectionHeight - viewportH))`

- [ ] **Step 1: Install**
  `npm i three@0.160.0 @react-three/fiber@^8.17.10` and `npm i -D @types/three@0.160.0 vitest@^2.1.8`. Add the `"test": "vitest run"` script.
- [ ] **Step 2: Write the failing test** `motion.test.ts`:
  ```ts
  expect(ease(0)).toBe(0); expect(ease(0.25)).toBeCloseTo(0.0625); expect(ease(0.5)).toBe(0.5); expect(ease(1)).toBe(1)
  expect(sectionProgress(0, 3000, 1000)).toBe(0)
  expect(sectionProgress(-1000, 3000, 1000)).toBe(0.5)
  expect(sectionProgress(-5000, 3000, 1000)).toBe(1)   // scrolled far past → clamped
  expect(sectionProgress(100, 800, 1000)).toBe(1)      // section shorter than viewport
  expect(clamp(-2)).toBe(0); expect(lerp(10, 20, 0.5)).toBe(15)
  ```
- [ ] **Step 3: Run** `npm test`. Expected: FAIL (module not found).
- [ ] **Step 4: Implement** `motion.ts`. Add `Caveat({ subsets:['latin'], weight:['500','700'], variable:'--font-caveat', display:'swap' })` to `layout.tsx` and add its variable to the `<html>` className.
- [ ] **Step 5: Run** `npm test` (PASS) and `npm run build` (succeeds).
- [ ] **Step 6: Commit** `feat(desk): add 3D deps, vitest, Caveat font, motion helpers`

---

### Task 2: Hero content + timeline (pure logic)

**Files:**
- Modify: `src/lib/content.ts` (add `deskHero`)
- Create: `src/lib/desk/heroTimeline.ts`, `src/lib/desk/heroTimeline.test.ts`

**Interfaces — Consumes:** `clamp`, `lerp`, `ease` (Task 1).
**Produces:**
- `content.deskHero`:
  `{ badgeBefore: 'Your week, before', badgeAfter: 'Your week, after', headline: 'We Automate.', grow: 'You Grow.', subBefore: 'Every note on this desk is a job a machine should be doing.', subAfter: 'Same work. Done by machines, lined up, finished.', hint: 'Scroll, and watch the desk sort itself out', ctaAudit: 'Start your free audit', ctaCall: 'Book a call', callUrl: 'https://cal.com/autobeets/30min', notes: DeskNote[] }`
- `type DeskNote = { kind: 'sticky'; color: 'yellow' | 'pink' | 'green'; text: string } | { kind: 'sheet'; title: string; body: string; hand: string }`. The six notes, in this order: sticky yellow "Copy invoice totals into the sheet"; sheet "WORK ORDER" / "6 pages · retype into system" / "do this today!!"; sticky pink "Who's booked Thursday??"; sticky green "Call 3 suppliers for a price"; sheet "NEW LEAD" / "Came in 2 days ago" / "nobody replied"; sticky yellow "RE: RE: where's my quote?"
- `NARROW = 820`
- `NOTE_START_DESKTOP` / `NOTE_START_NARROW: [fx, fy, rotDeg][]`. Copy them from mockup line 611 (`startD` / `startN`).
- `noteTransform(i: number, p: number, vp: { w: number; h: number }, size: { w: number; h: number }): { x: number; y: number; rotate: number; scale: number; done: boolean }`. This is the per-note body of mockup `heroFrame` (lines 613–617), with `narrow = vp.w < NARROW`.
- `heroCopy(p: number): { after: boolean; growOpacity: number; growY: number; hintOpacity: number; railScale: number }`. Copy the logic from mockup lines 618–622 (`after = p > .5`).
- `railTop(vpH: number, narrow: boolean): number`, which is `(narrow ? .71 : .82) * vpH`.
- `toWorld(fx: number, fy: number, viewW: number, viewH: number): [number, number]`, which is `[(fx-.5)*viewW, (.5-fy)*viewH]`.
- `heroPose(p: number, narrow: boolean, viewW: number, viewH: number): { pet: { x; y; scale; rx; ry; rz }; player: { x; y; scale; rx; rz; spinY }; lidX: number; happy: boolean }`. This is the scroll-driven part of mockup lines 893–912 with the idle/mouse terms left out (the canvas adds them). Numbers are copied from the mockup.

- [ ] **Step 1: Write the failing tests** (viewport `{w:1000,h:800}`, size `{w:180,h:170}` unless noted):
  ```ts
  const start = noteTransform(0, 0, vp, size)
  expect(start.x).toBeCloseTo(10); expect(start.y).toBeCloseTo(51)
  expect(start.rotate).toBe(-12); expect(start.scale).toBe(1); expect(start.done).toBe(false)
  const end = noteTransform(0, 1, vp, size)
  expect(end.x).toBeCloseTo(43.333, 2); expect(end.y).toBeCloseTo(571); expect(end.rotate).toBe(-1.5)
  expect(end.scale).toBeCloseTo(0.76); expect(end.done).toBe(true)
  const n = noteTransform(4, 1, { w: 390, h: 800 }, size)          // narrow: col 1, row 1
  expect(n.x).toBeCloseTo(105); expect(n.y).toBeCloseTo(599); expect(n.scale).toBeCloseTo(0.92)
  expect(heroCopy(0)).toEqual({ after: false, growOpacity: 0, growY: 30, hintOpacity: 1, railScale: 0 })
  expect(heroCopy(1)).toEqual({ after: true, growOpacity: 1, growY: 0, hintOpacity: 0, railScale: 1 })
  expect(heroCopy(0.5).after).toBe(false); expect(heroCopy(0.5).growOpacity).toBeCloseTo(0.2)
  const pose = heroPose(1, false, 10, 6)
  expect(pose.pet.x).toBeLessThan(0); expect(pose.player.x).toBeGreaterThan(0)  // flank the headline
  expect(pose.lidX).toBeCloseTo(0); expect(pose.happy).toBe(true); expect(heroPose(0.2, false, 10, 6).happy).toBe(false)
  ```
- [ ] **Step 2: Run** `npm test`. Expected: FAIL.
- [ ] **Step 3: Implement** `heroTimeline.ts` and add `deskHero` to `content.ts`.
- [ ] **Step 4: Run** `npm test`. Expected: PASS.
- [ ] **Step 5: Commit** `feat(desk): hero content and scroll timeline`

---

### Task 3: DeskHero section (DOM) replaces the old hero

**Files:**
- Create: `src/components/desk/DeskHero.tsx` (client), `src/components/desk/DeskNoteCard.tsx`, `src/lib/desk/useScrollFrame.ts`
- Modify: `src/app/globals.css` (port the note/sheet/tape/grain/strike/tick styles from mockup lines 37–63, scoped under `.desk-hero`)
- Modify: `src/app/page.tsx` (`<Hero />` → `<DeskHero />`)
- Delete: `src/components/sections/Hero.tsx` (old hero PNGs are removed in phase 4)

**Interfaces — Consumes:** `sectionProgress`, `noteTransform`, `heroCopy`, `railTop`, `NARROW`, `content.deskHero`, `useAuditModal().openModal`.
**Produces:**
- `useScrollFrame(cb: () => void, enabled: boolean): void`. It runs `cb` once on mount, then on passive `scroll` and `resize` through one rAF (the mockup's `ticking` pattern), and cleans up on unmount.
- `<section id="hero">`: height `300vh`, with an inner sticky `100svh` stage. The 3D canvas (Task 5) reads this element by id.

- [ ] **Step 1: Build `DeskNoteCard`.** It renders one `DeskNote` as `.sticky-note` (tape, Caveat text) or `.sheet` (staple, title, body, red Caveat `hand`). Struck text is wrapped in `.strike`, and the tick uses Lucide `Check` in `.tick`. The `done` class is toggled by the parent through the ref.
- [ ] **Step 2: Build `DeskHero`.** It contains the badge, h1 (`headline` + `<span>` grow), subline, rail, the six notes, the hint and two CTAs (audit button → `openModal`, call link → `callUrl` with `target="_blank" rel="noopener"`). The CTAs sit under the subline and stay clickable (`pointer-events-auto`). In `useScrollFrame`, compute `p = sectionProgress(...)` and write the transforms, `done`, badge text/class, subline text, grow opacity/translate, rail top/scale and hint opacity straight to refs.
- [ ] **Step 3: Reduced-motion branch.** `const reduced = useReducedMotion()`. When it's true, the section is `height:auto; min-height:100svh` with no sticky. The scroll frame is disabled and a single frame runs at `p = 1`, so the notes are lined up and ticked and the text shows the "after" state.
- [ ] **Step 4: Verify.** Run `npm test` and `npm run build`, both pass. Then run `npm run dev` and check at 1280×800 and 390×844 (DevTools device mode). Notes start scattered, line up on the rail, get struck and ticked, the badge flips at the halfway point and "You Grow." fades up. After a resize mid-scroll the notes re-lay out. With DevTools → Rendering → `prefers-reduced-motion: reduce`, the finished state shows with no pinning. There is no horizontal scrollbar at 390 px.
- [ ] **Step 5: Commit** `feat(desk): DeskHero scroll section replaces old hero`

---

### Task 4: Port the 3D models (pet, CD player, desk floor)

**Files:**
- Create: `src/components/three/models/materials.ts`, `pet.ts`, `player.ts`, `floor.ts`

**Interfaces — Produces** (plain three.js, no React; ported from mockup lines 752–882 with the same geometry, materials and colours):
- `chrome(): THREE.MeshStandardMaterial` (shared)
- `buildPet(opts: { light: boolean }): { group: THREE.Group; drawFace(happy: boolean, frame: 0 | 1): void }`. `light` = narrow screens, which use the cheaper shell material (spec §6). The LCD is a `CanvasTexture`, and `drawFace` redraws the pixel creature (stressed vs happy, 2 frames).
- `buildPlayer(): { group: THREE.Group; spin: THREE.Group; lidPivot: THREE.Group; cd: THREE.Object3D }`, with headphones included.
- `buildDeskFloor(): { mesh: THREE.Mesh; texture: THREE.CanvasTexture }`: the 2×2 blue/white checker, `repeat 34`, at `y = -2.75`.
- Each builder returns a `dispose(): void` that frees the geometries, materials and textures it created.

- [ ] **Step 1: Port the code.** Keep the mockup's numbers. Replace `three/addons/...` imports with `three/examples/jsm/...`, and remove anything that reads `window.M`.
- [ ] **Step 2: Check the models.** Check for third-party logos or wordmarks. The CD label and LCD use our own drawing only, and the CD label may say "autobeets".
- [ ] **Step 3: Verify.** `npm run build` passes (type-check). The models are checked visually in Task 5.
- [ ] **Step 4: Commit** `feat(desk): port pet, CD player and desk floor models`

---

### Task 5: Shared 3D canvas in hero mode

**Files:**
- Create: `src/lib/desk/capability.ts`, `src/lib/desk/capability.test.ts`
- Create: `src/components/three/DeskScene.tsx` (the R3F scene), `src/components/three/SceneLayer.tsx` (client wrapper: capability gate + `next/dynamic(() => import('./DeskScene'), { ssr: false })` + error boundary)
- Modify: `src/app/page.tsx` (render `<SceneLayer />` once, before `<main>`, and add the covering wrapper from Step 3)

**Interfaces — Consumes:** builders (Task 4), `heroPose`, `toWorld`, `sectionProgress`, `ease`, `clamp` (Tasks 1–2), `#hero` element (Task 3).
**Produces:**
- `canUse3D(env: { reducedMotion: boolean; webgl: boolean }): boolean`, which is `!reducedMotion && webgl`
- `detectWebGL(): boolean`: tries `canvas.getContext('webgl2') || getContext('webgl')` in try/catch
- `type SceneMode = 'hero' | 'off'`. Phase 4 adds `'guide' | 'end'`, so DeskScene switches on this type.

- [ ] **Step 1: Write the failing test.**
  `expect(canUse3D({ reducedMotion: true, webgl: true })).toBe(false)`, `expect(canUse3D({ reducedMotion: false, webgl: false })).toBe(false)`, `expect(canUse3D({ reducedMotion: false, webgl: true })).toBe(true)`
- [ ] **Step 2: Run** `npm test` (FAIL), then implement `capability.ts`, then `npm test` (PASS).
- [ ] **Step 3: Build `SceneLayer`.** It renders nothing on the server. After mount it checks `canUse3D({ reducedMotion: useReducedMotion(), webgl: detectWebGL() })`. If that's true, it loads `DeskScene` in a `fixed inset-0 z-[1] pointer-events-none` wrapper with `aria-hidden`. The error boundary renders `null` on failure. Hero content needs `relative z-[2]`. In `page.tsx`, wrap every section after `<DeskHero />` in one `<div className="relative z-[2] bg-white">` so they cover the canvas. Don't edit the old section files.
- [ ] **Step 4: Build `DeskScene`.** Use `<Canvas dpr={[1, 2]} camera={{ fov: 35, position: [0, 0, 10] }} gl={{ alpha: true, antialias: true }} frameloop={mode === 'hero' ? 'always' : 'never'}>`. Tone mapping is ACESFilmic, exposure `1.1`, with an sRGB output. The environment is `RoomEnvironment` through `PMREMGenerator` (0.04), fog `#fff` 10–27, key light `#fff` 2 at (-4,6,7) and fill light `#ffd9ec` .7 at (5,-1,4), all as in mockup lines 742–751. Mount the builders with `<primitive object={...}>` and call `dispose` on unmount. In `useFrame`, read `#hero`'s rect, compute `p` and apply `heroPose`. Add the idle bob/sway (`Math.sin(t…)`) and pointer parallax from mockup lines 894–910, set the floor texture `offset.y = -(scrollY / innerHeight) * .35`, and call `drawFace` only when the happy/frame value changes. `mode` becomes `'off'` when the hero rect's bottom is ≤ 0, tracked by an `IntersectionObserver` on `#hero`.
- [ ] **Step 5: Verify.** `npm test` and `npm run build` pass. In `npm run dev` at 1280×800: the checkered floor slides, the pet and player each spin once while moving to flank the headline, the lid closes, the disc spins and the pet's face turns happy past the halfway point. Scroll to `#services`: the canvas stops drawing (DevTools Performance shows no rAF work from R3F) and the sections cover the floor. With reduced motion, or with WebGL turned off (`chrome://flags` → "WebGL" disabled, or by temporarily forcing `detectWebGL` to return false), there's no canvas, no console errors and the hero is fully readable. The browser console shows no CSP violations.
- [ ] **Step 6: Commit** `feat(desk): shared R3F canvas with hero 3D models`

---

### Task 6: Slim nav, Lighthouse, Vercel preview

**Files:**
- Modify: `src/components/layout/Nav.tsx`

- [ ] **Step 1: Slim the nav.** Keep the logo. Links are only `Services` → `#services`, `Work` → `#work`, `Pricing` → `#pricing` (all existing anchors), plus the "Book a call" button → `https://cal.com/autobeets/30min`. The nav keeps `z-50` above the canvas, and the mobile menu works as before.
- [ ] **Step 2: Full check.** Run `npm test` and `npm run build` (both pass). Run `npm run start` and a Lighthouse mobile run on `/`: Performance, Accessibility and SEO should each be ≥ 90. Write down the scores. If Performance is under 90, check that the 3D chunk isn't in the first-load JS (`next build` output) before changing anything else.
- [ ] **Step 3: Commit** `feat(desk): slim nav for redesign`
- [ ] **Step 4: Push and hand off.** Ask Caio, then run `git push -u origin preview/desk-p1`. Wait for the Vercel preview to build, then send Caio the preview URL to check on desktop and on his phone. Update STATUS.md and finish with `/wrap`.
