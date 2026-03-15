'use client'
import { useReducedMotion, motion, type TargetAndTransition } from 'framer-motion'

interface BadgeProps {
  children: React.ReactNode
  rotate?: number
  color?: 'yellow' | 'red'
  floating?: boolean
}

export function Badge({ children, rotate = 0, color = 'yellow', floating = false }: BadgeProps) {
  const shouldReduce = useReducedMotion()

  const floatAnimation: TargetAndTransition = !shouldReduce && floating
    ? { y: [0, -6, 0], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } }
    : {}

  const colorClasses = color === 'yellow'
    ? 'bg-y2k-yellow text-near-black'
    : 'bg-sticker-red text-white'

  return (
    <motion.span
      animate={floatAnimation}
      className={`inline-block px-3 py-1 text-[10px] font-black font-mono uppercase tracking-wider rounded-sm ${colorClasses}`}
      style={{ '--badge-rotate': `${rotate}deg` } as React.CSSProperties}
    >
      <span className="[transform:rotate(var(--badge-rotate))] inline-block">
        {children}
      </span>
    </motion.span>
  )
}
