import * as THREE from 'three'

/** Shared polished chrome used by the pet and the CD player. */
export function chrome(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0xe6e9ee, metalness: 1, roughness: 0.12 })
}

export const V2 = (x: number, y: number) => new THREE.Vector2(x, y)
export const V3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

/** Frees every geometry, material and texture under `root`. */
export function disposeTree(root: THREE.Object3D): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (mesh.geometry) mesh.geometry.dispose()
    const mats = mesh.material ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) : []
    mats.forEach((m) => {
      Object.values(m).forEach((v) => {
        if (v instanceof THREE.Texture) v.dispose()
      })
      m.dispose()
    })
  })
}
