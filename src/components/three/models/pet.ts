import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { chrome, disposeTree, V2, V3 } from './materials'

// Ported from desk-mockup-v8.html "virtual pet". A generic candy-egg pet, no brand marks.

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const eggR = (t: number) => Math.sin(t) * (0.8 + 0.1 * Math.cos(t))
const eggY = (t: number) => -Math.cos(t)

function eggPart(t0: number, t1: number, n = 40) {
  const p: THREE.Vector2[] = []
  for (let i = 0; i <= n; i++) {
    const t = lerp(t0, t1, i / n)
    p.push(V2(Math.max(0.0001, eggR(t)), eggY(t)))
  }
  return new THREE.LatheGeometry(p, 80)
}

export function buildPet(opts: { light: boolean }): {
  group: THREE.Group
  drawFace(happy: boolean, frame: 0 | 1): void
  dispose(): void
} {
  const ch = chrome()

  // LCD: a 32x32 pixel creature drawn into a canvas texture
  const pc = document.createElement('canvas')
  pc.width = pc.height = 32
  const g = pc.getContext('2d')!
  const screenTex = new THREE.CanvasTexture(pc)
  screenTex.magFilter = screenTex.minFilter = THREE.NearestFilter
  screenTex.colorSpace = THREE.SRGBColorSpace

  function drawFace(happy: boolean, fr: 0 | 1) {
    g.fillStyle = '#d3f1f6'
    g.fillRect(0, 0, 32, 32)
    g.fillStyle = 'rgba(255,170,220,.35)'
    g.fillRect(0, 0, 32, 5)
    g.fillRect(0, 27, 32, 5)
    g.fillStyle = '#1c2330'
    const px = (x: number, y: number) => g.fillRect(x, y, 1, 1)
    const cx = 16, cy = 17 + (fr % 2), rx = 7.5, ry = 6.5
    const ins = (x: number, y: number) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1
    for (let y = 0; y < 32; y++)
      for (let x = 0; x < 32; x++)
        if (ins(x + 0.5, y + 0.5) && (!ins(x + 1.5, y + 0.5) || !ins(x - 0.5, y + 0.5) || !ins(x + 0.5, y + 1.5) || !ins(x + 0.5, y - 0.5)))
          px(x, y)
    px(12, cy + 6); px(13, cy + 6); px(19, cy + 6); px(20, cy + 6)
    px(13, cy - 8); px(14, cy - 7); px(18, cy - 7); px(19, cy - 8)
    const dots = (pts: number[][]) => pts.forEach(([x, y]) => px(x, y))
    if (happy) {
      dots([[12, cy], [13, cy - 1], [14, cy], [18, cy], [19, cy - 1], [20, cy]])
      dots([[14, cy + 2], [15, cy + 3], [16, cy + 3], [17, cy + 3], [18, cy + 2]])
      const hx = fr % 2 ? 24 : 23
      ;[[1, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [2, 3]].forEach(([a, b]) => px(hx + a, 7 + b))
    } else {
      dots([[12, cy - 1], [14, cy - 1], [13, cy], [12, cy + 1], [14, cy + 1], [18, cy - 1], [20, cy - 1], [19, cy], [18, cy + 1], [20, cy + 1]])
      dots([[13, cy + 3], [14, cy + 2], [15, cy + 3], [16, cy + 2], [17, cy + 3], [18, cy + 2]])
      const sy = fr % 2 ? 9 : 10
      px(26, sy); px(25, sy + 1); px(26, sy + 1); px(27, sy + 1)
      px(5, 8); px(5, 9); px(5, 11); px(7, 8); px(7, 9); px(7, 11)
    }
    for (let i = 0; i < 4; i++) {
      g.fillRect(4 + i * 7, 1, 3, 3)
      g.fillRect(4 + i * 7, 28, 3, 3)
    }
    screenTex.needsUpdate = true
  }

  const pet = new THREE.Group()
  const petBody = new THREE.Group()
  pet.add(petBody)

  const SZ = 0.6, split = 1.72
  const lowMat = new THREE.MeshPhysicalMaterial({ color: 0xff2f97, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.05, sheen: 0.4 })
  const upMat = new THREE.MeshPhysicalMaterial({
    color: 0xff7cc4, roughness: 0.08, transmission: 0.82, thickness: 0.6, ior: 1.45, clearcoat: 1,
    attenuationColor: new THREE.Color(0xff2f97), attenuationDistance: 1.4, side: THREE.DoubleSide,
  })
  if (opts.light) {
    upMat.transmission = 0
    upMat.transparent = true
    upMat.opacity = 0.7
  }
  const low = new THREE.Mesh(eggPart(0, split), lowMat)
  const up = new THREE.Mesh(eggPart(split, Math.PI), upMat)
  const core = new THREE.Mesh(eggPart(0, Math.PI), new THREE.MeshStandardMaterial({ color: 0xd81b78, roughness: 0.55 }))
  ;[low, up].forEach((m) => (m.scale.z = SZ))
  core.scale.set(0.84, 0.86, SZ * 0.8)

  // glitter suspended in the clear top half
  const gp: number[] = []
  for (let i = 0; i < 420; i++) {
    const t = lerp(split, Math.PI - 0.15, Math.random())
    const a = Math.random() * Math.PI * 2
    const r = eggR(t) * lerp(0.86, 0.97, Math.random())
    gp.push(Math.cos(a) * r, eggY(t), Math.sin(a) * r * SZ)
  }
  const glit = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(gp, 3)),
    new THREE.PointsMaterial({ color: 0xffffff, size: 0.022, transparent: true, opacity: 0.9 }),
  )

  // chrome seam all the way round the egg
  const rimPts: THREE.Vector3[] = []
  for (let i = 0; i <= 40; i++) {
    const t = (i / 40) * Math.PI
    rimPts.push(V3(eggR(t) * 1.005, eggY(t) * 1.005, 0))
  }
  for (let i = 39; i > 0; i--) {
    const t = (i / 40) * Math.PI
    rimPts.push(V3(-eggR(t) * 1.005, eggY(t) * 1.005, 0))
  }
  const rim = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rimPts, true), 220, 0.032, 10, true), ch)

  // screen: chrome frame, dark inset, LCD, glass
  const frame = new THREE.Mesh(new RoundedBoxGeometry(0.86, 0.8, 0.14, 5, 0.09), ch)
  frame.position.set(0, 0.14, 0.41)
  const inset = new THREE.Mesh(new RoundedBoxGeometry(0.72, 0.66, 0.05, 4, 0.05), new THREE.MeshStandardMaterial({ color: 0x22252b, roughness: 0.4 }))
  inset.position.set(0, 0.14, 0.468)
  const lcd = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.56), new THREE.MeshBasicMaterial({ map: screenTex, fog: false }))
  lcd.position.set(0, 0.14, 0.496)
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(0.64, 0.58),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.14, roughness: 0.02, metalness: 0.2, clearcoat: 1 }),
  )
  glass.position.set(0, 0.14, 0.5)
  petBody.add(core, low, up, glit, rim, frame, inset, lcd, glass)

  // three chrome buttons
  ;[[-0.25, -0.5, 0.395], [0, -0.58, 0.39], [0.25, -0.5, 0.395]].forEach(([x, y, z]) => {
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.018, 10, 28), ch)
    ringB.position.set(x, y, z + 0.012)
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.078, 24, 16), new THREE.MeshStandardMaterial({ color: 0xc9ced6, metalness: 1, roughness: 0.25 }))
    b.scale.z = 0.55
    b.position.set(x, y, z + 0.012)
    petBody.add(ringB, b)
  })

  // back: battery door + screw, so the spin has something to show
  const door = new THREE.Mesh(new RoundedBoxGeometry(0.6, 0.5, 0.05, 4, 0.06), new THREE.MeshPhysicalMaterial({ color: 0xe01f86, roughness: 0.25, clearcoat: 0.8 }))
  door.position.set(0, -0.2, -0.44)
  const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 16), ch)
  screw.rotation.x = Math.PI / 2
  screw.position.set(0, -0.4, -0.47)
  petBody.add(door, screw)
  petBody.scale.y = 1.1

  // keychain: loop, ring, chain, beads, star
  const loop = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.03, 10, 24), ch)
  loop.position.set(-0.05, 1.15, 0)
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.028, 12, 48), ch)
  ring.position.set(0.08, 1.4, 0)
  ring.rotation.y = 0.5
  pet.add(loop, ring)
  for (let i = 0; i < 6; i++) {
    const l = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.012, 8, 16), ch)
    l.position.set(0.32 + i * 0.07, 1.34 - i * 0.075, 0)
    l.rotation.set(i % 2 ? Math.PI / 2 : 0, i % 2 ? 0 : 0.6, 0.6)
    pet.add(l)
  }
  ;[0xff8fc7, 0xfff08a, 0x9be8c0, 0xc9a8ff, 0xff8fc7].forEach((c, i) => {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.062, 20, 14), new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.2, clearcoat: 1 }))
    b.position.set(0.76 + i * 0.035, 0.86 - i * 0.125, 0)
    pet.add(b)
  })
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.08), ch)
  star.position.set(0.72, 1.0, 0)
  pet.add(star)
  pet.children.forEach((c) => {
    if (c !== petBody) c.position.y -= 0.1
  })
  petBody.position.y = -0.1

  drawFace(false, 0)

  return { group: pet, drawFace, dispose: () => disposeTree(pet) }
}
