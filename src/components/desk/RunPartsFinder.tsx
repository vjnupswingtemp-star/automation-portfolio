'use client'

import { Fragment, useCallback, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Camera, Cpu, Mail, Search } from 'lucide-react'
import { desktop, run01 } from '@/lib/content'
import { sectionProgress } from '@/lib/desk/motion'
import { runState } from '@/lib/desk/desktopTimeline'
import { useScrollFrame } from '@/lib/desk/useScrollFrame'
import { DeskWindow } from './DeskWindow'
import { RunPhone, type RunPhoneHandle } from './RunPhone'

const NODE_ICONS = [Camera, Cpu, Search, Mail]

/**
 * Run 01 — Parts Price Finder, pinned ~5 screens: five steps on the left, a node strip and a CSS-3D phone
 * playing each step on the right, then the RESULT stamp. With reduced motion: not pinned, every step
 * listed, the phone on its final view.
 */
export function RunPartsFinder() {
  const reduced = useReducedMotion() === true
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const stampRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<RunPhoneHandle>(null)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])
  const barRefs = useRef<(HTMLElement | null)[]>([])
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const wireRefs = useRef<(HTMLElement | null)[]>([])

  const frame = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    const vh = stageRef.current?.clientHeight || window.innerHeight
    const p = reduced ? 1 : sectionProgress(section.getBoundingClientRect().top, section.offsetHeight, vh)
    const s = runState(p)
    stepRefs.current.forEach((el, i) => el?.classList.toggle('on', i === s.idx))
    barRefs.current.forEach((el, i) => {
      if (el) el.style.transform = `scaleX(${s.bars[i]})`
    })
    nodeRefs.current.forEach((el, i) => el?.classList.toggle('lit', i < s.litNodes))
    wireRefs.current.forEach((el, i) => {
      if (el) el.style.transform = `scaleX(${s.wires[i]})`
    })
    stampRef.current?.classList.toggle('on', s.stamp)
    phoneRef.current?.apply(s)
  }, [reduced])

  useScrollFrame(frame, !reduced)

  return (
    <section
      id="run"
      ref={sectionRef}
      data-task="parts_finder.exe"
      className="relative h-[560vh] motion-reduce:h-auto"
    >
      <div
        ref={stageRef}
        className="run-stage sticky top-0 h-[100svh] motion-reduce:relative motion-reduce:h-auto"
      >
        <DeskWindow title={run01.window}>
          <div className="run-text">
            <div className="pix run-label">{run01.label}</div>
            <div className="progress" aria-hidden="true">
              {run01.steps.map((_, i) => (
                <i key={i}>
                  <b
                    ref={(el) => {
                      barRefs.current[i] = el
                    }}
                  />
                </i>
              ))}
            </div>
            <ol className="steps">
              {run01.steps.map((step, i) => (
                <li
                  key={step.title}
                  className={`step${i === 0 ? ' on' : ''}`}
                  ref={(el) => {
                    stepRefs.current[i] = el
                  }}
                >
                  <div className="n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-display">{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="stage">
            <div className="nodes" aria-hidden="true">
              {run01.nodes.map((label, i) => {
                const Icon = NODE_ICONS[i]
                return (
                  <Fragment key={label}>
                    {i > 0 && (
                      <div className="wire">
                        <b
                          ref={(el) => {
                            wireRefs.current[i - 1] = el
                          }}
                        />
                      </div>
                    )}
                    <div
                      className="node"
                      ref={(el) => {
                        nodeRefs.current[i] = el
                      }}
                    >
                      <div className="dot">
                        <Icon size={16} strokeWidth={2} />
                      </div>
                      {label}
                    </div>
                  </Fragment>
                )
              })}
            </div>
            <div className="pshadow" aria-hidden="true" />
            <RunPhone ref={phoneRef} />
            <div ref={stampRef} className="stamp" data-stamp>
              <div className="pix">{run01.resultLabel}</div>
              <strong>{run01.result.text}</strong>
              {!run01.result.real && <span className="todo">{desktop.todo}</span>}
            </div>
          </div>
        </DeskWindow>
      </div>
    </section>
  )
}
