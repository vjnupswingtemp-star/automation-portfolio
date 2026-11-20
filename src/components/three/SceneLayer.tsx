'use client'

import { Component, useEffect, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useReducedMotion } from 'framer-motion'
import { canUse3D, detectWebGL } from '@/lib/desk/capability'

const DeskScene = dynamic(() => import('./DeskScene'), { ssr: false })

/** If WebGL or the 3D chunk fails, drop the canvas silently — the page works without it. */
class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

/** Client-only wrapper: mounts the shared 3D canvas after first paint, only when 3D is allowed. */
export function SceneLayer() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(canUse3D({ reducedMotion: reduced === true, webgl: detectWebGL() }))
  }, [reduced])

  if (!enabled) return null
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <SceneErrorBoundary>
        <DeskScene />
      </SceneErrorBoundary>
    </div>
  )
}
