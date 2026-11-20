import { Check } from 'lucide-react'
import type { DeskNote } from '@/lib/content'

/** One paper note on the hero desk. The parent toggles `done` on this element to strike + tick it. */
export function DeskNoteCard({ note }: { note: DeskNote }) {
  const tick = (
    <span className="tick" aria-hidden="true">
      <Check size={18} strokeWidth={3} />
    </span>
  )

  if (note.kind === 'sticky') {
    return (
      <div className={`sticky-note grain note-${note.color}`}>
        <span className="tape" aria-hidden="true" />
        <span className="strike">{note.text}</span>
        {tick}
      </div>
    )
  }

  return (
    <div className="sheet">
      <span className="staple" aria-hidden="true" />
      <b>{note.title}</b>
      {note.body}
      <span className="hand strike">{note.hand}</span>
      {tick}
    </div>
  )
}
