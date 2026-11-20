import { describe, expect, it } from 'vitest'
import { activeTask, diveTransform, moreOffset, runState } from './desktopTimeline'

const vp = { w: 1000, h: 800 }

describe('diveTransform', () => {
  it('starts at normal size with the copy visible', () => {
    expect(diveTransform(0, 540, vp)).toEqual({ scale: 1, copyOpacity: 1 })
  })
  it('ends scaled so the CRT screen covers the viewport', () => {
    expect(diveTransform(1, 540, vp).scale).toBeCloseTo(2.4582, 3)
  })
  it('eases the zoom and fades the copy out in the first quarter', () => {
    const mid = diveTransform(0.5, 540, vp)
    expect(mid.scale).toBeCloseTo(1.7291, 3)
    expect(mid.copyOpacity).toBe(0)
    expect(diveTransform(0.125, 540, vp).copyOpacity).toBeCloseTo(0.5)
  })
})

describe('runState', () => {
  it('starts on the old way with the timer at zero', () => {
    expect(runState(0)).toMatchObject({ idx: 0, view: 0, timer: '00:00', ry: -42, rx: 8, stamp: false, litNodes: 0 })
    expect(runState(0.1).timer).toBe('09:21')
  })
  it('step 2 shows the camera, lights the first node and flashes the shutter', () => {
    const s = runState(0.3)
    expect(s).toMatchObject({ idx: 1, view: 1, litNodes: 1, timer: '18:42' })
    expect(s.bars).toEqual([1, 0.5, 0, 0, 0])
    expect(s.shutter).toBeCloseTo(0.7)
  })
  it('step 3 sweeps the scan line and reveals the ids one by one', () => {
    const s = runState(0.5)
    expect(s).toMatchObject({ idx: 2, view: 1, scanOpacity: 1, scanTop: 200 })
    expect(s.idsOn).toEqual([true, true, false])
    expect(s.wires[0]).toBeCloseTo(0.5)
  })
  it('step 4 fills the price bars without picking winners yet', () => {
    const s = runState(0.7)
    expect(s.view).toBe(3)
    expect(s.rowFill[0]).toBeCloseTo(0.63)
    expect(s.rowWon).toEqual([false, false, false, false, false])
  })
  it('ends on the top 3 with the stamp on', () => {
    const s = runState(1)
    expect(s).toMatchObject({ idx: 4, view: 4, stamp: true, rx: 2 })
    expect(s.ry).toBeCloseTo(-22)
    expect(s.rowWon).toEqual([true, true, true, false, false])
    expect(s.glareX).toBeCloseTo(1.6)
  })
})

describe('moreOffset', () => {
  it('slides the track left by its overflow', () => {
    expect(moreOffset(0, 2000, 1000)).toBe(0)
    expect(moreOffset(0.5, 2000, 1000)).toBe(-500)
    expect(moreOffset(1, 2000, 1000)).toBe(-1000)
  })
  it('does not shift a track narrower than the screen', () => {
    expect(moreOffset(1, 800, 1000)).toBe(0)
  })
})

describe('activeTask', () => {
  const secs = [
    { top: -500, bottom: 100, task: 'programs' },
    { top: 100, bottom: 900, task: 'case_file_01' },
  ]
  it('picks the section under the middle line', () => {
    expect(activeTask(secs, 400)).toBe('case_file_01')
    expect(activeTask(secs, 100)).toBe('case_file_01')
  })
  it('returns null when no section is under the line', () => {
    expect(activeTask(secs, 2000)).toBeNull()
  })
})
