import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { chrome, disposeTree, V2, V3 } from './materials'

// Ported from desk-mockup-v8.html "portable CD player + headphones". Generic design, no brand marks.

export function buildPlayer(): {
  group: THREE.Group
  spin: THREE.Group
  lidPivot: THREE.Group
  cd: THREE.Group
  dispose(): void
} {
  const ch = chrome()
  const player = new THREE.Group()
  const spin = new THREE.Group()
  const lidPivot = new THREE.Group()
  const cd = new THREE.Group()
  player.add(spin)

  const silver = new THREE.MeshStandardMaterial({ color: 0xc9ccd2, metalness: 0.85, roughness: 0.34 })
  const silver2 = new THREE.MeshStandardMaterial({ color: 0xdadde2, metalness: 0.8, roughness: 0.28 })
  const black = new THREE.MeshStandardMaterial({ color: 0x17181b, roughness: 0.5 })

  const unit = new THREE.Group()
  unit.position.x = 0.95
  spin.add(unit)
  unit.add(new THREE.Mesh(new THREE.LatheGeometry([V2(0, -0.13), V2(0.94, -0.13), V2(1, -0.08), V2(1.01, 0), V2(1, 0.07), V2(0.96, 0.1), V2(0, 0.1)], 96), silver))

  // the disc inside
  const washer = (r0: number, r1: number, h: number) =>
    new THREE.LatheGeometry([V2(r0, -h), V2(r1, -h), V2(r1, h), V2(r0, h), V2(r0, -h)], 96)
  cd.add(new THREE.Mesh(washer(0.2, 0.9, 0.008), new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 1, roughness: 0.1, iridescence: 1, iridescenceIOR: 1.7, iridescenceThicknessRange: [120, 900],
  })))
  const lc = document.createElement('canvas')
  lc.width = lc.height = 256
  const lg = lc.getContext('2d')!
  lg.fillStyle = '#f4f4f1'
  lg.beginPath()
  lg.arc(128, 128, 128, 0, 7)
  lg.fill()
  lg.fillStyle = '#111'
  lg.font = 'bold 26px Arial'
  lg.textAlign = 'center'
  lg.fillText('2000s', 128, 70)
  lg.fillText('Playlist', 128, 206)
  lg.fillStyle = '#3662E3'
  lg.fillRect(40, 92, 176, 8)
  lg.fillRect(40, 160, 176, 8)
  const labelTex = new THREE.CanvasTexture(lc)
  labelTex.colorSpace = THREE.SRGBColorSpace
  const label = new THREE.Mesh(new THREE.RingGeometry(0.1, 0.36, 64), new THREE.MeshStandardMaterial({ map: labelTex, roughness: 0.5 }))
  label.rotation.x = -Math.PI / 2
  label.position.y = 0.01
  cd.add(label)
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 32), black)
  cd.position.y = 0.115
  unit.add(cd, hub)
  hub.position.y = 0.12

  // lid on a rear hinge, with a clear window
  lidPivot.position.set(0, 0.11, -0.93)
  unit.add(lidPivot)
  const lid = new THREE.Group()
  lid.position.set(0, 0, 0.93)
  lidPivot.add(lid)
  lid.add(new THREE.Mesh(new THREE.LatheGeometry([V2(0.37, 0), V2(0.93, 0), V2(0.955, 0.03), V2(0.93, 0.06), V2(0.4, 0.07), V2(0.37, 0.05), V2(0.37, 0)], 96), silver2))
  const win = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.02, 64), new THREE.MeshPhysicalMaterial({
    color: 0xffffff, transmission: 0.95, roughness: 0.03, thickness: 0.02, transparent: true, opacity: 0.35,
  }))
  win.position.y = 0.05
  lid.add(win)
  const winRing = new THREE.Mesh(new THREE.TorusGeometry(0.385, 0.016, 10, 64), ch)
  winRing.rotation.x = Math.PI / 2
  winRing.position.y = 0.07
  lid.add(winRing)

  // LCD + buttons on the lid's front
  const dc = document.createElement('canvas')
  dc.width = 128
  dc.height = 48
  const dg = dc.getContext('2d')!
  dg.fillStyle = '#a9b8a0'
  dg.fillRect(0, 0, 128, 48)
  dg.fillStyle = '#1d241b'
  dg.font = 'bold 26px monospace'
  dg.fillText('08 3:45', 10, 34)
  const dTex = new THREE.CanvasTexture(dc)
  dTex.colorSpace = THREE.SRGBColorSpace
  const lcdBox = new THREE.Mesh(new RoundedBoxGeometry(0.4, 0.03, 0.17, 3, 0.012), black)
  lcdBox.position.set(-0.05, 0.072, 0.72)
  lid.add(lcdBox)
  const lcd2 = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.12), new THREE.MeshBasicMaterial({ map: dTex, fog: false }))
  lcd2.rotation.x = -Math.PI / 2
  lcd2.position.set(-0.05, 0.089, 0.72)
  lid.add(lcd2)
  ;[[-0.62, 0.5], [-0.7, 0.36], [-0.76, 0.2], [-0.79, 0.04]].forEach(([x, z]) => {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 20), ch)
    b.position.set(x, 0.078, z)
    lid.add(b)
  })
  const playB = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.035, 28), new THREE.MeshStandardMaterial({ color: 0x3662e3, roughness: 0.35 }))
  playB.position.set(0.38, 0.08, 0.7)
  lid.add(playB)
  const hold = new THREE.Mesh(new RoundedBoxGeometry(0.2, 0.03, 0.08, 2, 0.012), ch)
  hold.position.set(0.62, 0.078, 0.5)
  hold.rotation.y = -0.6
  lid.add(hold)
  const jack = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.14, 16), black)
  jack.rotation.z = Math.PI / 2
  jack.rotation.y = -0.65
  jack.position.set(0.83, -0.02, 0.62)
  unit.add(jack)

  // headphones lying beside it
  const hp = new THREE.Group()
  hp.position.set(-1.15, -0.02, 0.1)
  spin.add(hp)
  const foam = new THREE.MeshStandardMaterial({ color: 0xf28a1e, roughness: 1 })
  const padGeo = new THREE.LatheGeometry([V2(0, 0), V2(0.26, 0), V2(0.31, 0.04), V2(0.32, 0.1), V2(0.29, 0.16), V2(0.2, 0.18), V2(0, 0.18)], 48)
  const ribMat = new THREE.MeshStandardMaterial({ color: 0x2a2c31, roughness: 0.4 })
  const cup = () => {
    const c = new THREE.Group()
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.09, 40), black)
    base.position.y = 0.045
    const ribs = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.02, 8, 40), ribMat)
    ribs.rotation.x = Math.PI / 2
    const pad = new THREE.Mesh(padGeo, foam)
    pad.position.y = 0.09
    c.add(base, ribs, pad)
    return c
  }
  const cupA = cup()
  cupA.position.set(-0.25, -0.11, 0.35)
  cupA.rotation.z = 0.08
  const cupB = cup()
  cupB.position.set(0.35, 0.2, 0.15)
  cupB.rotation.set(0.2, 0, -Math.PI / 2 + 0.25)
  hp.add(cupA, cupB)
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.022, 8, 64, Math.PI * 1.05), new THREE.MeshStandardMaterial({ color: 0xd7dadf, metalness: 0.9, roughness: 0.25 }))
  band.scale.z = 4
  band.position.set(0.02, 0.02, -0.25)
  band.rotation.set(-0.95, 0, -0.03)
  hp.add(band)
  ;[[-0.7, 0.02, -0.25], [0.74, 0.02, -0.25]].forEach(([x, y, z]) => {
    const s = new THREE.Mesh(new RoundedBoxGeometry(0.09, 0.2, 0.14, 2, 0.02), black)
    s.position.set(x, y, z)
    s.rotation.x = -0.95
    hp.add(s)
  })

  // cable with real loops, ending in the jack
  const pts = [[-0.25, -0.1, 0.6], [-0.2, -0.11, 1.05], [0.35, -0.11, 1.5], [0.95, -0.11, 1.25], [0.75, -0.11, 0.8], [0.25, -0.11, 1.0],
    [0.3, -0.11, 1.5], [0.9, -0.11, 1.75], [1.9, -0.11, 1.6], [2.75, -0.09, 1.1], [3.02, -0.03, 0.72]].map(([x, y, z]) => V3(x, y, z))
  hp.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 200, 0.014, 8), black))

  // centre the whole set for a clean spin
  spin.children.forEach((c) => (c.position.x -= 0.15))

  return { group: player, spin, lidPivot, cd, dispose: () => disposeTree(player) }
}
