import { clamp, ease, lerp } from './motion'

/** Dive into the monitor: CRT scales up until its screen covers the viewport; copy fades in the first quarter. */
export function diveTransform(
  p: number,
  crtW: number,
  vp: { w: number; h: number },
): { scale: number; copyOpacity: number } {
  const cover = Math.max(vp.w / (0.9 * crtW), vp.h / (0.675 * crtW)) * 1.12
  const e = ease(clamp((p - 0.1) / 0.8))
  return { scale: lerp(1, cover, e), copyOpacity: 1 - clamp(p / 0.25) }
}

export type RunState = {
  idx: number
  lp: number
  bars: number[]
  litNodes: number
  wires: number[]
  view: 0 | 1 | 3 | 4
  timer: string
  shutter: number
  scanOpacity: number
  scanTop: number
  idsOn: boolean[]
  rowFill: number[]
  rowWon: boolean[]
  stamp: boolean
  rx: number
  ry: number
  glareX: number
}

const STEPS = 5
const FILLS = [0.9, 0.78, 0.72, 0.4, 0.3]
const TURNS: [number, number][] = [
  [-42, -14],
  [-14, 10],
  [10, -10],
  [-10, 12],
  [12, -22],
]
const pad = (n: number) => String(n).padStart(2, '0')

/** Run 01 (Parts Price Finder): every scroll-driven value of the pinned run at progress `p`. */
export function runState(p: number): RunState {
  const f = p * STEPS
  const idx = Math.min(STEPS - 1, Math.floor(f))
  const lp = clamp(f - idx)
  const view: RunState['view'] = idx === 0 ? 0 : idx <= 2 ? 1 : (idx as 3 | 4)
  const secs = Math.floor(clamp(f) * 1122)
  const rowT = idx > 3 ? 1 : idx === 3 ? clamp(lp * 1.4) : 0
  const ry = lerp(TURNS[idx][0], TURNS[idx][1], ease(lp))
  return {
    idx,
    lp,
    bars: Array.from({ length: STEPS }, (_, i) => clamp(f - i)),
    litNodes: idx,
    wires: Array.from({ length: 3 }, (_, i) => clamp(f - (i + 2))),
    view,
    timer: `${pad(Math.floor(secs / 60))}:${pad(secs % 60)}`,
    shutter: idx === 1 ? Math.max(0, 1 - Math.abs(lp - 0.55) * 6) : 0,
    scanOpacity: idx === 2 ? 1 : 0,
    scanTop: 110 + (idx === 2 ? lp * 180 : 0),
    idsOn: [0, 1, 2].map((i) => idx === 2 && lp > i * 0.25 + 0.15),
    rowFill: FILLS.map((fill) => fill * rowT),
    rowWon: FILLS.map((_, i) => rowT > 0.95 && i < 3),
    stamp: idx === 4 && lp > 0.3,
    rx: lerp(8, 2, p),
    ry,
    glareX: 50 + ry * 2.2,
  }
}

/** More runs: horizontal track offset (px, ≤ 0). */
export function moreOffset(p: number, trackScrollW: number, vw: number): number {
  return -ease(p) * Math.max(0, trackScrollW - vw) + 0
}

/** Taskbar label: the first section whose box straddles the `mid` line. */
export function activeTask(
  sections: { top: number; bottom: number; task: string }[],
  mid: number,
): string | null {
  return sections.find((s) => s.top <= mid && mid < s.bottom)?.task ?? null
}

/**
 * Inverse of `moreOffset`: the progress at which the track sits at `offset` (clamped to the track's range).
 * Used to scroll the page so a keyboard-focused CD case is on screen. Bisection, since `ease` has no simple inverse.
 */
export function moreProgressFor(offset: number, trackScrollW: number, vw: number): number {
  const span = Math.max(0, trackScrollW - vw)
  if (span === 0) return 0
  const target = clamp(-offset / span)
  let lo = 0
  let hi = 1
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2
    if (ease(mid) < target) lo = mid
    else hi = mid
  }
  return target === 0 ? 0 : target === 1 ? 1 : (lo + hi) / 2
}

/** Phones held sideways are too short to pin Run 01 / the CD cases; they get the unpinned layout. */
export const SHORT_LANDSCAPE_QUERY = '(min-width: 821px) and (max-height: 520px)'
export function isShortLandscape(w: number, h: number): boolean {
  return w >= 821 && h <= 520
}
