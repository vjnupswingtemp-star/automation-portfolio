interface PillTagProps {
  children: React.ReactNode
  variant?: 'default' | 'accent'
}

export function PillTag({ children, variant = 'default' }: PillTagProps) {
  const classes = variant === 'accent'
    ? 'border border-ai-accent text-ai-accent'
    : 'border border-gray-200 text-muted'

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-mono ${classes}`}>
      {children}
    </span>
  )
}
