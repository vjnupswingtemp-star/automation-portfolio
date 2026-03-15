'use client'
import { focusRing } from '@/lib/tokens'
import { meta } from '@/lib/content'

export function FloatingCTA() {
  return (
    <a
      href={`mailto:${meta.email}`}
      className={`
        fixed bottom-6 right-6 z-50
        md:hidden
        bg-near-black text-white
        px-5 py-3 rounded-sm
        text-sm font-black font-mono uppercase tracking-wider
        shadow-lg
        ${focusRing}
      `}
    >
      Hire Us →
    </a>
  )
}
