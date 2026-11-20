import { flagship } from '@/lib/content'
import { DeskBadge, DeskWindow } from './DeskWindow'

/** Case file 01 — the fire & life-safety client (never named) and the automations built for them. */
export function FlagshipCase() {
  return (
    <section id="work" data-task="case_file_01" className="intro scroll-mt-20">
      <DeskWindow title={flagship.window}>
        <DeskBadge>{flagship.badge}</DeskBadge>
        <h2 className="font-display">
          {flagship.title}
          <br />
          <em>{flagship.titleEm}</em>
          {flagship.titleEnd}
        </h2>
        <p>{flagship.body}</p>
        <ul className="chips" aria-label="Automations we built for them">
          {flagship.chips.map((c) => (
            <li key={c.label} className={`chip ${c.hl ? 'hl' : ''}`}>
              {c.label}
            </li>
          ))}
        </ul>
      </DeskWindow>
    </section>
  )
}
