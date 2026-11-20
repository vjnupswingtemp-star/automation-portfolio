'use client'

import { useCallback, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { desktop } from '@/lib/content'
import { sectionProgress } from '@/lib/desk/motion'
import { diveTransform } from '@/lib/desk/desktopTimeline'
import { useScrollFrame } from '@/lib/desk/useScrollFrame'

/**
 * "So where does the work go?" — a beige CRT on the desk; scroll zooms into its screen until the
 * green-hill wallpaper fills the view and the desktop world takes over.
 * With reduced motion: not pinned, the CRT stays at normal size.
 */
export function MonitorDive() {
  const reduced = useReducedMotion() === true
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const crtRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  const frame = useCallback(() => {
    const section = sectionRef.current
    const crt = crtRef.current
    if (!section || !crt) return
    const vh = stageRef.current?.clientHeight || window.innerHeight
    const p = reduced ? 0 : sectionProgress(section.getBoundingClientRect().top, section.offsetHeight, vh)
    const t = diveTransform(p, crt.offsetWidth, { w: window.innerWidth, h: vh })
    crt.style.transform = `scale(${t.scale})`
    if (copyRef.current) copyRef.current.style.opacity = String(t.copyOpacity)
  }, [reduced])

  useScrollFrame(frame, !reduced)

  return (
    <section
      id="dive"
      ref={sectionRef}
      className="desk-world dive relative h-[260vh] motion-reduce:h-auto"
    >
      <div
        ref={stageRef}
        className="dive-stage sticky top-0 h-[100svh] overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:min-h-[100svh] motion-reduce:pb-16"
      >
        <div ref={copyRef} className="dive-copy">
          <h2 className="font-display">{desktop.dive.title}</h2>
          <p>{desktop.dive.sub}</p>
        </div>
        <div ref={crtRef} className="crt" aria-hidden="true">
          <div className="scr hills">
            <div className="mini-ico">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="chin">
            <span className="pix">{desktop.dive.brand}</span>
            <span className="led" />
          </div>
          <div className="foot" />
        </div>
      </div>
    </section>
  )
}
