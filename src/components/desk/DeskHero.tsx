'use client'

import { useCallback, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { deskHero } from '@/lib/content'
import { useAuditModal } from '@/lib/AuditModalContext'
import { sectionProgress } from '@/lib/desk/motion'
import { heroCopy, NARROW, noteTransform, railTop } from '@/lib/desk/heroTimeline'
import { useScrollFrame } from '@/lib/desk/useScrollFrame'
import { DeskNoteCard } from './DeskNoteCard'

/**
 * Hero — the physical desk. Pinned for 3 screens: scattered notes line up on a blue rail and get ticked,
 * the badge flips before → after and "You Grow." reveals. Scroll updates write straight to refs.
 * With reduced motion: not pinned, rendered in the finished state.
 */
export function DeskHero() {
  const reduced = useReducedMotion() === true
  const { openModal } = useAuditModal()

  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const badgeBeforeRef = useRef<HTMLSpanElement>(null)
  const badgeAfterRef = useRef<HTMLSpanElement>(null)
  const subBeforeRef = useRef<HTMLSpanElement>(null)
  const subAfterRef = useRef<HTMLSpanElement>(null)
  const growRef = useRef<HTMLSpanElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLParagraphElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const frame = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    const vp = { w: window.innerWidth, h: window.innerHeight }
    const narrow = vp.w < NARROW
    const p = reduced ? 1 : sectionProgress(section.getBoundingClientRect().top, section.offsetHeight, vp.h)

    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const t = noteTransform(i, p, vp, { w: el.offsetWidth, h: el.offsetHeight })
      el.style.transform = `translate(${t.x}px,${t.y}px) rotate(${t.rotate}deg) scale(${t.scale})`
      el.style.visibility = 'visible'
      el.firstElementChild?.classList.toggle('done', t.done)
    })

    const c = heroCopy(p)
    if (badgeRef.current) {
      badgeRef.current.style.backgroundColor = c.after ? '#3662E3' : '#fff'
      badgeRef.current.style.color = c.after ? '#fff' : '#3662E3'
    }
    badgeBeforeRef.current?.toggleAttribute('hidden', c.after)
    badgeAfterRef.current?.toggleAttribute('hidden', !c.after)
    subBeforeRef.current?.toggleAttribute('hidden', c.after)
    subAfterRef.current?.toggleAttribute('hidden', !c.after)
    if (growRef.current) {
      growRef.current.style.opacity = String(c.growOpacity)
      growRef.current.style.transform = `translateY(${c.growY}px)`
    }
    if (railRef.current) {
      railRef.current.style.top = `${railTop(vp.h, narrow)}px`
      railRef.current.style.transform = `scaleX(${c.railScale})`
    }
    if (hintRef.current) hintRef.current.style.opacity = String(reduced ? 0 : c.hintOpacity)
  }, [reduced])

  useScrollFrame(frame, !reduced)

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`desk-hero relative z-[2] ${reduced ? 'min-h-[100svh]' : 'h-[300vh]'}`}
    >
      <div className={`${reduced ? 'relative' : 'sticky top-0'} h-[100svh] overflow-hidden`}>
        <div className="pointer-events-none absolute inset-x-0 top-[17%] z-[5] px-4 text-center max-[820px]:top-[23%]">
          <span
            ref={badgeRef}
            className="mb-[22px] max-[820px]:mb-4 inline-block border-2 border-[#3662E3] bg-white px-3 py-1.5 font-bitroad text-xs uppercase tracking-widest text-[#3662E3] shadow-[4px_4px_0_0_#3662E3] transition-colors duration-300"
          >
            <span ref={badgeBeforeRef}>{deskHero.badgeBefore}</span>
            <span ref={badgeAfterRef} hidden>
              {deskHero.badgeAfter}
            </span>
          </span>
          <h1 className="font-display text-[clamp(44px,8.5vw,120px)] font-extrabold leading-[0.95] text-[#111]">
            {deskHero.headline}
            <br />
            <span ref={growRef} className="inline-block text-[#3662E3]" style={{ opacity: 0 }}>
              {deskHero.grow}
            </span>
          </h1>
          <p className="mx-auto mt-[22px] max-w-[520px] max-[820px]:mt-4 max-[820px]:max-w-[290px] text-[clamp(15px,1.6vw,19px)] leading-normal text-[#444]">
            <span ref={subBeforeRef}>{deskHero.subBefore}</span>
            <span ref={subAfterRef} hidden>
              {deskHero.subAfter}
            </span>
          </p>
          <div className="pointer-events-auto mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#3662E3] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2a4fc0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3662E3]"
            >
              {deskHero.ctaAudit}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <a
              href={deskHero.callUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-[#111] transition-colors hover:border-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3662E3]"
            >
              {deskHero.ctaCall}
            </a>
          </div>
        </div>

        <div ref={railRef} className="rail" aria-hidden="true" />

        <div role="list" aria-label="Your week">
          {deskHero.notes.map((note, i) => (
            <div
              key={i}
              role="listitem"
              className="item"
              style={{ visibility: 'hidden' }}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
            >
              <DeskNoteCard note={note} />
            </div>
          ))}
        </div>

        <p ref={hintRef} className="absolute inset-x-0 bottom-[22px] max-[820px]:bottom-3 z-[6] text-center text-xs text-[#555]">
          {deskHero.hint}
        </p>
      </div>
    </section>
  )
}
