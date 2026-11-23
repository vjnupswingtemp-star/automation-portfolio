import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { MonitorDive } from './MonitorDive'
import { DesktopShell } from './DesktopShell'
import { ServicesWindow } from './ServicesWindow'
import { FlagshipCase } from './FlagshipCase'

describe('monitor dive + desktop shell server markup', () => {
  const html = renderToString(
    <>
      <MonitorDive />
      <DesktopShell>
        <ServicesWindow />
        <FlagshipCase />
      </DesktopShell>
    </>,
  )

  it('renders the dive with pinning switched off by CSS for reduced motion', () => {
    expect(html).toContain('id="dive"')
    expect(html).toContain('motion-reduce:h-auto')
  })

  it('keeps the nav anchors and taskbar labels on the windows', () => {
    expect(html).toContain('id="services"')
    expect(html).toContain('data-task="programs"')
    expect(html).toContain('id="work"')
    expect(html).toContain('data-task="case_file_01"')
  })

  it('renders the programs and the unnamed flagship client', () => {
    expect(html).toContain('connect.exe')
    expect(html).toContain('A Texas fire &amp; life-safety services company')
  })

  it('draws the window buttons as decoration, not buttons', () => {
    expect(html).not.toContain('<button')
  })
})

describe('Run 01 server markup', () => {
  it('lists all five steps, the result and the reduced-motion layout', async () => {
    const { RunPartsFinder } = await import('./RunPartsFinder')
    const { run01 } = await import('@/lib/content')
    const html = renderToString(<RunPartsFinder />)
    expect(html).toContain('id="run"')
    expect(html).toContain('data-task="parts_finder.exe"')
    for (const s of run01.steps) expect(html).toContain(s.title)
    expect(html).not.toContain('needs your real figure')
    expect(html).toContain('prices illustrative')
    expect(html).toContain('motion-reduce:h-auto')
    expect(html).toContain('data-stamp')
  })

  it('hides the phone illustration from screen readers but keeps the result out of it', async () => {
    const { RunPhone } = await import('./RunPhone')
    const { run01 } = await import('@/lib/content')
    const html = renderToString(<RunPhone />)
    expect(html).toContain('aria-hidden="true"')
    expect(html).not.toContain(run01.result.text)
  })
})

describe('More runs server markup', () => {
  it('renders four CD cases, three PDF links, no placeholders and the reduced-motion wrap', async () => {
    const { MoreRuns } = await import('./MoreRuns')
    const { runs } = await import('@/lib/content')
    const html = renderToString(<MoreRuns />)
    expect(html).toContain('id="more"')
    expect(html).toContain('data-task="more_runs"')
    for (const r of runs.items) expect(html).toContain(r.title)
    expect(html.match(/href="\/pdfs\//g)).toHaveLength(3)
    expect(html).not.toContain('needs your real figure')
    expect(html).toContain('38 work orders in 4 weeks')
    expect(html).toContain('motion-reduce:flex-wrap')
  })
})
