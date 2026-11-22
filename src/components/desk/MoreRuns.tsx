'use client'

import { useCallback, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { desktop, runs } from '@/lib/content'
import { sectionProgress } from '@/lib/desk/motion'
import { moreOffset } from '@/lib/desk/desktopTimeline'
import { useScrollFrame } from '@/lib/desk/useScrollFrame'
import { DeskBadge, DeskWindow } from './DeskWindow'

/**
 * Runs 02–05 as CD cases that slide sideways while the section is pinned.
 * With reduced motion: not pinned, the cases wrap into rows.
 */
export function MoreRuns() {
  const reduced = useReducedMotion() === true
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const frame = useCallback(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    const vh = stageRef.current?.clientHeight || window.innerHeight
    const p = reduced ? 0 : sectionProgress(section.getBoundingClientRect().top, section.offsetHeight, vh)
    track.style.transform = reduced ? '' : `translateX(${moreOffset(p, track.scrollWidth, window.innerWidth)}px)`
  }, [reduced])

  useScrollFrame(frame, !reduced)

  return (
    <section
      id="more"
      ref={sectionRef}
      data-task="more_runs"
      className="relative h-[320vh] motion-reduce:h-auto"
    >
      <div
        ref={stageRef}
        className="more-stage sticky top-0 h-[100svh] overflow-hidden motion-reduce:relative motion-reduce:h-auto"
      >
        <div className="more-head">
          <h2 className="font-display">{runs.title}</h2>
          <DeskBadge>{runs.badge}</DeskBadge>
        </div>
        <div
          ref={trackRef}
          role="list"
          className="track motion-reduce:flex-wrap motion-reduce:justify-center"
        >
          {runs.items.map((run) => (
            <div key={run.file} role="listitem" className="case">
              <div className="disc" aria-hidden="true" />
              <DeskWindow title={run.file}>
                <span className="ind">{run.industry}</span>
                <h3 className="font-display">{run.title}</h3>
                <div className="ba">
                  <div>
                    <span>Before</span>
                    {run.before}
                  </div>
                  <div>
                    <span>After</span>
                    {run.after}
                  </div>
                </div>
                {run.pdfUrl && (
                  <a className="case-pdf" href={run.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <FileText size={15} aria-hidden="true" />
                    {runs.pdfLabel}
                  </a>
                )}
                <div className="res">
                  <small>{runs.resultLabel}</small>
                  <strong>{run.result.text}</strong>
                  {!run.result.real && <span className="todo">{desktop.todo}</span>}
                </div>
              </DeskWindow>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
