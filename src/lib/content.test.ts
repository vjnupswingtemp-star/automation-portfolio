import { describe, expect, it } from 'vitest'
import { pendingFigures, run01, runs, services } from './content'

describe('desktop content', () => {
  // Go-live gate (spec §7): no run may still show "needs your real figure".
  it('has no placeholder result figures left', () => {
    expect(pendingFigures()).toEqual([])
  })
  it('has four more runs, three with a case-study PDF', () => {
    expect(runs.items).toHaveLength(4)
    expect(runs.items.filter((r) => r.pdfUrl)).toHaveLength(3)
  })
  it('has five Run 01 steps and three programs', () => {
    expect(run01.steps).toHaveLength(5)
    expect(services.items.map((s) => s.fn)).toEqual(['connect.exe', 'assistant.exe', 'wildcard.exe'])
  })
})
