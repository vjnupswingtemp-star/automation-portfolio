import { describe, expect, it } from 'vitest'
import { heroCopy, heroPose, heroViewport, noteTransform, railTop, toWorld } from './heroTimeline'
import { deskHero } from '../content'

const vp = { w: 1000, h: 800 }
const size = { w: 180, h: 170 }

describe('noteTransform', () => {
  it('starts note 0 at its scattered desktop position', () => {
    const start = noteTransform(0, 0, vp, size)
    expect(start.x).toBeCloseTo(10)
    expect(start.y).toBeCloseTo(51)
    expect(start.rotate).toBe(-12)
    expect(start.scale).toBe(1)
    expect(start.done).toBe(false)
  })

  it('ends note 0 lined up on the desktop rail, ticked', () => {
    const end = noteTransform(0, 1, vp, size)
    expect(end.x).toBeCloseTo(43.333, 2)
    expect(end.y).toBeCloseTo(571)
    expect(end.rotate).toBe(-1.5)
    expect(end.scale).toBeCloseTo(0.76)
    expect(end.done).toBe(true)
  })

  it('uses the 3x2 grid on narrow screens (note 4 = col 1, row 1)', () => {
    const n = noteTransform(4, 1, { w: 390, h: 800 }, size)
    expect(n.x).toBeCloseTo(105)
    expect(n.y).toBeCloseTo(599)
    expect(n.scale).toBeCloseTo(0.92)
  })

  it('re-lays out when the viewport changes at the same progress', () => {
    const wide = noteTransform(2, 1, vp, size)
    const resized = noteTransform(2, 1, { w: 1400, h: 900 }, size)
    expect(resized.x).not.toBeCloseTo(wide.x)
    expect(resized.y).toBeCloseTo(0.82 * 900 - 85)
  })
})

describe('heroCopy', () => {
  it('shows the "before" state at the top', () => {
    expect(heroCopy(0)).toEqual({ after: false, growOpacity: 0, growY: 30, hintOpacity: 1, railScale: 0 })
  })
  it('shows the "after" state at the end', () => {
    expect(heroCopy(1)).toEqual({ after: true, growOpacity: 1, growY: 0, hintOpacity: 0, railScale: 1 })
  })
  it('flips only after the halfway point', () => {
    expect(heroCopy(0.5).after).toBe(false)
    expect(heroCopy(0.5).growOpacity).toBeCloseTo(0.2)
  })
})

describe('railTop / toWorld', () => {
  it('places the rail at 82% (desktop) or 71% (narrow) of the viewport', () => {
    expect(railTop(1000, false)).toBeCloseTo(820)
    expect(railTop(1000, true)).toBeCloseTo(710)
  })
  it('maps screen fractions to world units around the centre', () => {
    expect(toWorld(0.5, 0.5, 10, 6)).toEqual([0, 0])
    expect(toWorld(0, 0, 10, 6)).toEqual([-5, 3])
  })
})

describe('heroViewport', () => {
  it('uses the pinned stage height, not innerHeight (phone toolbar collapsed)', () => {
    expect(heroViewport({ innerWidth: 390, innerHeight: 844 }, 760)).toEqual({ w: 390, h: 760 })
  })
  it('falls back to innerHeight before the stage is measured', () => {
    expect(heroViewport({ innerWidth: 390, innerHeight: 844 }, 0)).toEqual({ w: 390, h: 844 })
  })
})

describe('heroPose', () => {
  it('ends with the pet left and the player right of the headline', () => {
    const pose = heroPose(1, false, 10, 6)
    expect(pose.pet.x).toBeLessThan(0)
    expect(pose.player.x).toBeGreaterThan(0)
    expect(pose.lidX).toBeCloseTo(0)
    expect(pose.happy).toBe(true)
  })
  it('keeps the pet stressed early on', () => {
    expect(heroPose(0.2, false, 10, 6).happy).toBe(false)
  })
})

describe('deskHero content', () => {
  it('has the six notes in mockup order', () => {
    expect(deskHero.notes).toHaveLength(6)
    expect(deskHero.notes[0]).toEqual({ kind: 'sticky', color: 'yellow', text: 'Copy invoice totals into the sheet' })
    expect(deskHero.notes[4]).toEqual({ kind: 'sheet', title: 'NEW LEAD', body: 'Came in 2 days ago', hand: 'nobody replied' })
  })
})
