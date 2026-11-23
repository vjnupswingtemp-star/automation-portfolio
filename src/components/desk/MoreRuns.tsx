'use client'

import { useCallback, useRef, type FocusEvent } from 'react'
import { FileText } from 'lucide-react'
import { desktop, runs } from '@/lib/content'
import { sectionProgress } from '@/lib/desk/motion'
import { moreOffset, moreProgressFor } from '@/lib/desk/desktopTimeline'
import { useScrollFrame } from '@/lib/desk/useScrollFrame'
import { useStaticLayout } from '@/lib/desk/useStaticLayout'
import { DeskBadge, DeskWindow } from './DeskWindow'

/**
 * Runs 02–05 as CD cases that slide sideways while the section is pinned.
 * With reduced motion or a phone held sideways: not pinned, the cases wrap into rows.
 */
export function MoreRuns() {
  const unpinned = useStaticLayout()
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const frame = useCallback(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    const vh = stageRef.current?.clientHeight || window.innerHeight
    const p = unpinned ? 0 : sectionProgress(section.getBoundingClientRect().top, section.offsetHeight, vh)
    track.style.transform = unpinned ? '' : `translateX(${moreOffset(p, track.scrollWidth, window.innerWidth)}px)`
  }, [unpinned])

  useScrollFrame(frame, !unpinned)

  // Keyboard / screen-reader focus on an off-screen case: scroll the page to the point where that case is in view
  // (the clipped stage can't scroll sideways itself).
  const onFocus = useCallback(
    (e: FocusEvent<HTMLDivElement>) => {
      const section = sectionRef.current
      const track = trackRef.current
      const card = (e.target as HTMLElement).closest<HTMLElement>('.case')
      if (unpinned || !section || !track || !card) return
      const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0
      const p = moreProgressFor(-(card.offsetLeft - pad), track.scrollWidth, window.innerWidth)
      const vh = stageRef.current?.clientHeight || window.innerHeight
      const top = section.getBoundingClientRect().top + window.scrollY + p * Math.max(0, section.offsetHeight - vh)
      window.scrollTo({ top, behavior: 'instant' as ScrollBehavior })
    },
    [unpinned],
  )

  return (
    <section
      id="more"
      ref={sectionRef}
      data-task="more_runs"
      className="relative h-[320vh] motion-reduce:h-auto"
    >
      <div
        ref={stageRef}
        className="more-stage sticky top-0 h-[100svh] overflow-clip motion-reduce:relative motion-reduce:h-auto"
      >
        <div className="more-head">
          <h2 className="font-display">{runs.title}</h2>
          <DeskBadge>{runs.badge}</DeskBadge>
        </div>
        <div
          ref={trackRef}
          onFocus={onFocus}
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
