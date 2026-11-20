import { Bot, Settings, Workflow } from 'lucide-react'
import { services } from '@/lib/content'
import { DeskBadge, DeskWindow } from './DeskWindow'

const ICONS = { Workflow, Bot, Settings }

/** "Three programs. All run by themselves." — the services as desktop programs. */
export function ServicesWindow() {
  return (
    <section id="services" data-task="programs" className="wsec scroll-mt-20">
      <DeskWindow title={services.window}>
        <DeskBadge>{services.badge}</DeskBadge>
        <h2 className="font-display">
          {services.title}
          <br />
          <em>{services.titleEm}</em>
        </h2>
        <div className="progs">
          {services.items.map((item) => {
            const Icon = ICONS[item.icon]
            return (
              <div key={item.fn} className="prog">
                <div className="pi">
                  <Icon size={26} strokeWidth={2} aria-hidden="true" />
                </div>
                <span className="pix fn">{item.fn}</span>
                <h3 className="font-display">{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </DeskWindow>
    </section>
  )
}
