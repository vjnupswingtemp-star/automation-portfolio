import { describe, expect, it } from 'vitest'
import { pendingFigures, run01, runs, services } from './content'

describe('desktop content', () => {
  // Go-live gate (spec §7): these runs still show "needs your real figure".
  it('lists the runs whose result figure is still a placeholder', () => {
    expect(pendingFigures()).toEqual(['Parts Price Finder', 'Work Order Intake'])
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
