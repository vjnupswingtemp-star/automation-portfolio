/** 3D runs only when motion is allowed and the browser can make a WebGL context. */
export function canUse3D(env: { reducedMotion: boolean; webgl: boolean }): boolean {
  return !env.reducedMotion && env.webgl
}

/** Browser-only: true when a WebGL(2) context can be created. */
export function detectWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}
