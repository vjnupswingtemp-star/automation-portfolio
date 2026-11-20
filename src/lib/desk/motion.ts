export const clamp = (v: number, a = 0, b = 1): number => Math.min(b, Math.max(a, v))

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

/** easeInOutCubic — same curve as the mockup. */
export const ease = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** 0 → 1 progress through a pinned section's scrollable length. */
export function sectionProgress(rectTop: number, sectionHeight: number, viewportH: number): number {
  const total = sectionHeight - viewportH
  return total <= 0 ? 1 : clamp(-rectTop / total)
}
