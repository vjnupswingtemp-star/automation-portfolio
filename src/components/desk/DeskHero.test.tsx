import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { AuditModalProvider } from '@/lib/AuditModalContext'
import { DeskHero } from './DeskHero'

describe('DeskHero server markup', () => {
  // useReducedMotion is null on the server and true during a reduced-motion client's hydration,
  // so pinning must be switched off by CSS, not by a JS-chosen class (React won't patch the mismatch).
  it('turns pinning off with CSS for reduced-motion visitors', () => {
    const html = renderToString(
      <AuditModalProvider>
        <DeskHero />
      </AuditModalProvider>,
    )
    expect(html).toContain('motion-reduce:h-auto')
    expect(html).toContain('motion-reduce:min-h-[100svh]')
    expect(html).toContain('motion-reduce:relative')
  })
})
