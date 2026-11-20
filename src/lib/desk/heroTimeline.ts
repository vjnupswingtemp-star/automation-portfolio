import { clamp, ease, lerp } from './motion'

// Scroll timeline for the hero desk. Numbers ported from desk-mockup-v8.html (heroFrame + render).

export const NARROW = 820

/** Scattered start positions per note: [fraction x, fraction y, rotation deg]. */
export const NOTE_START_DESKTOP: [number, number, number][] = [
  [0.1, 0.17, -12], [0.86, 0.15, 8], [0.07, 0.8, 9], [0.38, 0.88, -7], [0.64, 0.86, 5], [0.92, 0.78, -11],
]
export const NOTE_START_NARROW: [number, number, number][] = [
  [0.2, 0.1, -10], [0.8, 0.09, 8], [0.2, 0.9, 8], [0.5, 0.93, -6], [0.82, 0.9, 6], [0.5, 0.78, -4],
]

type Size = { w: number; h: number }

export function noteTransform(i: number, p: number, vp: Size, size: Size) {
  const narrow = vp.w < NARROW
  const e = ease(clamp((p - 0.08) / 0.72))
  const cols = narrow ? 3 : 6
  const [sx, sy, sr] = (narrow ? NOTE_START_NARROW : NOTE_START_DESKTOP)[i]
  const col = i % cols
  const row = narrow ? Math.floor(i / cols) : 0
  const tx = 0.06 + (col + 0.5) * (0.88 / cols)
  const ty = narrow ? 0.71 + row * 0.145 : 0.82
  return {
    x: lerp(sx, tx, e) * vp.w - size.w / 2,
    y: lerp(sy, ty, e) * vp.h - size.h / 2,
    rotate: lerp(sr, i % 2 ? 1.5 : -1.5, e),
    scale: lerp(1, narrow ? 0.92 : 0.76, e),
    done: e > 0.97,
  }
}

export function heroCopy(p: number) {
  const g = clamp((p - 0.45) / 0.25)
  return {
    after: p > 0.5,
    growOpacity: g,
    growY: lerp(30, 0, g),
    hintOpacity: 1 - clamp(p / 0.08),
    railScale: clamp((p - 0.55) / 0.3),
  }
}

/**
 * The hero's layout box: viewport width (matches CSS media queries) and the pinned stage's real height.
 * On phones `innerHeight` changes as the toolbar collapses while the 100svh stage does not.
 */
export function heroViewport(win: { innerWidth: number; innerHeight: number }, stageHeight: number): Size {
  return { w: win.innerWidth, h: stageHeight > 0 ? stageHeight : win.innerHeight }
}

export const railTop =(vpH: number, narrow: boolean): number => (narrow ? 0.71 : 0.82) * vpH

export const toWorld = (fx: number, fy: number, viewW: number, viewH: number): [number, number] => [
  (fx - 0.5) * viewW,
  (0.5 - fy) * viewH,
]

/** Scroll-driven pose of the hero 3D models (idle bob and pointer parallax are added by the canvas). */
export function heroPose(p: number, narrow: boolean, viewW: number, viewH: number) {
  const e = ease(clamp((p - 0.05) / 0.75))
  const w = (f: [number, number]) => toWorld(f[0], f[1], viewW, viewH)
  const [x0, y0] = w(narrow ? [0.22, 0.6] : [0.2, 0.57])
  const [x1, y1] = w(narrow ? [0.2, 0.115] : [0.125, 0.37])
  const [a0, b0] = w(narrow ? [0.74, 0.61] : [0.79, 0.6])
  const [a1, b1] = w(narrow ? [0.8, 0.15] : [0.855, 0.385])
  const spinTurn = e * Math.PI * 2
  return {
    pet: {
      x: lerp(x0, x1, e),
      y: lerp(y0, y1, e),
      scale: narrow ? lerp(0.52, 0.4, e) : 0.92 * lerp(0.9, 1, e),
      rx: lerp(0.2, 0, e),
      ry: lerp(-0.7, 0.3, e) + spinTurn,
      rz: lerp(0.3, -0.05, e),
    },
    player: {
      x: lerp(a0, a1, e),
      y: lerp(b0, b1, e),
      scale: (narrow ? 0.3 : 0.58) * lerp(0.9, 1, e),
      rx: lerp(1.0, 0.8, e),
      rz: lerp(-0.12, 0.05, e),
      spinY: lerp(0.5, -0.35, e) + spinTurn,
    },
    lidX: -lerp(0.75, 0, ease(clamp(p / 0.6))),
    cdY: p * 16,
    happy: p > 0.55,
  }
}
