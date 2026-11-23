'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { SHORT_LANDSCAPE_QUERY } from './desktopTimeline'

/**
 * True when Run 01 / the CD cases render unpinned in their finished state: reduced motion, or a phone held
 * sideways (too short to pin). The matching layout lives in CSS (same media queries), so markup never depends on it.
 */
export function useStaticLayout(): boolean {
  const reduced = useReducedMotion() === true
  const [short, setShort] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(SHORT_LANDSCAPE_QUERY)
    const update = () => setShort(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced || short
}
