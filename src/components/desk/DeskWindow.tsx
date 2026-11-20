import type { ReactNode } from 'react'

/** A brutalist desktop window: blue title bar with a pixel title and three decorative squares. */
export function DeskWindow({
  title,
  className = '',
  bodyClassName = '',
  children,
}: {
  title: string
  className?: string
  bodyClassName?: string
  children: ReactNode
}) {
  return (
    <div className={`win ${className}`}>
      <div className="bar">
        <span className="pix">{title}</span>
        <span className="btns" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={`body ${bodyClassName}`}>{children}</div>
    </div>
  )
}

/** Neo-brutalist section badge (brand rule: border-2 blue, 4px hard shadow). */
export function DeskBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border-2 border-[#3662E3] bg-white px-3 py-1.5 font-bitroad text-xs uppercase tracking-widest text-[#3662E3] shadow-[4px_4px_0_0_#3662E3]">
      {children}
    </span>
  )
}
