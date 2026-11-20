'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { desktop } from '@/lib/content'
import { activeTask } from '@/lib/desk/desktopTimeline'
import { useScrollFrame } from '@/lib/desk/useScrollFrame'

const ICON_KIND = ['', 'cd', 'doc']
const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Inside the computer: sticky green-hill wallpaper, decorative desktop icons and a taskbar whose
 * active label follows the window (`[data-task]`) under the middle of the screen.
 */
export function DesktopShell({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setClock(`${pad(d.getHours())}:${pad(d.getMinutes())}`)
    }
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [])

  const frame = useCallback(() => {
    const root = rootRef.current
    const label = labelRef.current
    if (!root || !label) return
    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-task]')).map((el) => {
      const r = el.getBoundingClientRect()
      return { top: r.top, bottom: r.bottom, task: el.dataset.task ?? '' }
    })
    const task = activeTask(sections, window.innerHeight / 2)
    if (task && label.textContent !== task) label.textContent = task
  }, [])

  // The label is not motion, so it updates on scroll even with reduced motion.
  useScrollFrame(frame, true)

  return (
    <div ref={rootRef} className="desk-world desktop">
      <div className="wall hills" aria-hidden="true">
        <div className="icons">
          {desktop.icons.map((label, i) => (
            <div key={label}>
              <div className={`ic ${ICON_KIND[i] ?? ''}`} />
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className="desk-content">
        <div className="taskbar" aria-hidden="true">
          <span className="start pix">Run</span>
          <span ref={labelRef} className="task on">
            programs
          </span>
          <span className="clock pix">{clock}</span>
        </div>
        {children}
      </div>
    </div>
  )
}
