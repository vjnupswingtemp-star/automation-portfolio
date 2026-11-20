import { describe, expect, it } from 'vitest'
import { canUse3D } from './capability'

describe('canUse3D', () => {
  it('is off when the visitor prefers reduced motion', () => {
    expect(canUse3D({ reducedMotion: true, webgl: true })).toBe(false)
  })
  it('is off when WebGL is unavailable', () => {
    expect(canUse3D({ reducedMotion: false, webgl: false })).toBe(false)
  })
  it('is on with motion allowed and WebGL available', () => {
    expect(canUse3D({ reducedMotion: false, webgl: true })).toBe(true)
  })
})
