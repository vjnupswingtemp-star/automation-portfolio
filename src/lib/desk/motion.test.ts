import { describe, expect, it } from 'vitest'
import { clamp, ease, lerp, sectionProgress } from './motion'

describe('ease (easeInOutCubic)', () => {
  it('maps the key points of the curve', () => {
    expect(ease(0)).toBe(0)
    expect(ease(0.25)).toBeCloseTo(0.0625)
    expect(ease(0.5)).toBe(0.5)
    expect(ease(1)).toBe(1)
  })
})

describe('sectionProgress', () => {
  it('is 0 when the section top is at the viewport top', () => {
    expect(sectionProgress(0, 3000, 1000)).toBe(0)
  })
  it('is 0.5 halfway through the scrollable length', () => {
    expect(sectionProgress(-1000, 3000, 1000)).toBe(0.5)
  })
  it('clamps to 1 when scrolled far past the section', () => {
    expect(sectionProgress(-5000, 3000, 1000)).toBe(1)
  })
  it('is 1 when the section is shorter than the viewport', () => {
    expect(sectionProgress(100, 800, 1000)).toBe(1)
  })
})

describe('clamp / lerp', () => {
  it('clamps below 0 and interpolates', () => {
    expect(clamp(-2)).toBe(0)
    expect(clamp(5, 0, 3)).toBe(3)
    expect(lerp(10, 20, 0.5)).toBe(15)
  })
})
