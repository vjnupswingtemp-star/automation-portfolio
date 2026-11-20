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
