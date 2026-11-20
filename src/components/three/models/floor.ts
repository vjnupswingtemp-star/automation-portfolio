import * as THREE from 'three'

/** Blue/white checkered desk surface in perspective (ported from the mockup). */
export function buildDeskFloor(): { mesh: THREE.Mesh; texture: THREE.CanvasTexture; dispose(): void } {
  const c = document.createElement('canvas')
  c.width = c.height = 2
  const g = c.getContext('2d')!
  g.fillStyle = '#ffffff'
  g.fillRect(0, 0, 2, 2)
  g.fillStyle = '#3662E3'
  g.fillRect(0, 0, 1, 1)
  g.fillRect(1, 1, 1, 1)
  const texture = new THREE.CanvasTexture(c)
  texture.magFilter = THREE.NearestFilter
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(34, 34)
  texture.colorSpace = THREE.SRGBColorSpace
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.MeshBasicMaterial({ map: texture }))
  mesh.rotation.x = -Math.PI / 2
  mesh.position.y = -2.75
  return {
    mesh,
    texture,
    dispose: () => {
      mesh.geometry.dispose()
      ;(mesh.material as THREE.Material).dispose()
      texture.dispose()
    },
  }
}
