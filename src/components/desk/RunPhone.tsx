'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { run01 } from '@/lib/content'
import type { RunState } from '@/lib/desk/desktopTimeline'

export type RunPhoneHandle = { apply(s: RunState): void }

const VIEWS = [0, 1, 3, 4] as const
const EDGE_LAYERS = Array.from({ length: 14 }, (_, i) => 14 - i)

/**
 * A realistic CSS-3D phone (stacked edge layers, titanium rim, island, glare) that plays Run 01's
 * steps on its screen. Decorative: the step text next to it carries the meaning.
 */
export const RunPhone = forwardRef<RunPhoneHandle>(function RunPhone(_, ref) {
  const phoneRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<HTMLDivElement>(null)
  const shutterRef = useRef<HTMLDivElement>(null)
  const scanRef = useRef<HTMLDivElement>(null)
  const viewRefs = useRef<(HTMLDivElement | null)[]>([])
  const idRefs = useRef<(HTMLDivElement | null)[]>([])
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const s = run01.screen

  useImperativeHandle(
    ref,
    () => ({
      apply(st) {
        if (phoneRef.current) phoneRef.current.style.transform = `rotateX(${st.rx}deg) rotateY(${st.ry}deg)`
        if (glareRef.current) glareRef.current.style.backgroundPosition = `${st.glareX}% 0`
        viewRefs.current.forEach((el, i) => el?.classList.toggle('on', VIEWS[i] === st.view))
        if (timerRef.current) timerRef.current.textContent = st.timer
        if (shutterRef.current) shutterRef.current.style.opacity = String(st.shutter)
        if (scanRef.current) {
          scanRef.current.style.opacity = String(st.scanOpacity)
          scanRef.current.style.top = `${st.scanTop}px`
        }
        idRefs.current.forEach((el, i) => el?.classList.toggle('on', st.idsOn[i]))
        rowRefs.current.forEach((el, i) => {
          if (!el) return
          el.classList.toggle('won', st.rowWon[i])
          const fill = el.querySelector<HTMLElement>('.pbar b')
          if (fill) fill.style.width = `${st.rowFill[i] * 100}%`
        })
      },
    }),
    [],
  )

  const view = (i: number) => (el: HTMLDivElement | null) => {
    viewRefs.current[i] = el
  }

  return (
    <div ref={phoneRef} className="phone3d" aria-hidden="true" style={{ transform: 'rotateX(8deg) rotateY(-42deg)' }}>
      {EDGE_LAYERS.map((z) => (
        <div key={z} className="ly" style={{ transform: `translateZ(${-z}px)` }} />
      ))}
      <div className="backf" />
      <div className="front">
        <div className="pscreen">
          <div className="island" />

          <div ref={view(0)} className="view v0 on">
            {s.notifs.map((n) => (
              <div key={n.from} className="notif">
                <b>{n.from}</b>
                <span>{n.text}</span>
              </div>
            ))}
            <div className="timer">
              <div ref={timerRef} className="pix">
                00:00
              </div>
              <small>{s.waiting}</small>
            </div>
          </div>

          <div ref={view(1)} className="view v1">
            <div className="part">
              <div className="bd" />
              <div className="c1" />
              <div className="c2" />
              <div className="knob" />
            </div>
            <div className="corner a" />
            <div className="corner b" />
            <div className="corner c" />
            <div className="corner d" />
            <div ref={scanRef} className="scan" />
            <div className="shbtn" />
            <div ref={shutterRef} className="shutter" />
            <div className="ids">
              {s.ids.map((d, i) => (
                <div
                  key={d.k}
                  className="id"
                  ref={(el) => {
                    idRefs.current[i] = el
                  }}
                >
                  <b>{d.k}</b> · {d.v}
                </div>
              ))}
            </div>
          </div>

          <div ref={view(2)} className="view v3">
            <h4>{s.searching}</h4>
            {s.rows.map((r, i) => (
              <div
                key={r.supplier}
                className="row"
                ref={(el) => {
                  rowRefs.current[i] = el
                }}
              >
                <span>{r.supplier}</span>
                <div className="pbar">
                  <b />
                </div>
                <span className="p">{r.price}</span>
              </div>
            ))}
            <div className="illus">{s.note}</div>
          </div>

          <div ref={view(3)} className="view v4">
            <h4>{s.top3Title}</h4>
            {s.top3.map((t) => (
              <div key={t.label} className="li">
                <span>{t.label}</span>
                <b>{t.price}</b>
              </div>
            ))}
            <div className="sent">{s.sent}</div>
          </div>

          <div ref={glareRef} className="glare" />
        </div>
      </div>
    </div>
  )
})
