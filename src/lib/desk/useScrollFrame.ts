'use client'

import { useEffect } from 'react'

/**
 * Runs `cb` once on mount, after web fonts load, and on resize — plus on scroll when `enabled`.
 * Calls are batched to one per animation frame (the mockup's "ticking" pattern).
 */
export function useScrollFrame(cb: () => void, enabled: boolean): void {
  useEffect(() => {
    let ticking = false
    let raf = 0
    const run = () => {
      if (ticking) return
      ticking = true
      raf = requestAnimationFrame(() => {
        ticking = false
        cb()
      })
    }
    cb()
    document.fonts?.ready.then(run).catch(() => {})
    window.addEventListener('resize', run)
    if (enabled) window.addEventListener('scroll', run, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', run)
      window.removeEventListener('scroll', run)
    }
  }, [cb, enabled])
}
