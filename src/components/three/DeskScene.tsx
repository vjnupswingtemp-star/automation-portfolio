'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { sectionProgress } from '@/lib/desk/motion'
import { heroPose, NARROW } from '@/lib/desk/heroTimeline'
import { buildPet } from './models/pet'
import { buildPlayer } from './models/player'
import { buildDeskFloor } from './models/floor'

/** Which part of the page the shared canvas is drawing. Phase 4 adds 'guide' | 'end'. */
export type SceneMode = 'hero' | 'off'

/**
 * The one fixed WebGL canvas (plain three.js — Next's App Router runs React 19 internally,
 * which React Three Fiber v8 can't drive). Draws only while the hero is on screen.
 */
export default function DeskScene() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const hero = document.getElementById('hero')
    if (!canvas || !wrap || !hero) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    scene.fog = new THREE.Fog(0xffffff, 10, 27)
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0, 10)
    const key = new THREE.DirectionalLight(0xffffff, 2)
    key.position.set(-4, 6, 7)
    const fill = new THREE.DirectionalLight(0xffd9ec, 0.7)
    fill.position.set(5, -1, 4)
    scene.add(key, fill)

    const pet = buildPet({ light: window.innerWidth < NARROW })
    const player = buildPlayer()
    const floor = buildDeskFloor()
    scene.add(floor.mesh, pet.group, player.group)

    let viewW = 1
    let viewH = 1
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      viewH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
      viewW = viewH * camera.aspect
    }

    const pointer = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5
      pointer.y = e.clientY / window.innerHeight - 0.5
    }

    const clock = new THREE.Clock()
    let lastFace = ''
    const render = () => {
      const t = clock.getElapsedTime()
      const narrow = window.innerWidth < NARROW
      const p = sectionProgress(hero.getBoundingClientRect().top, hero.offsetHeight, window.innerHeight)
      const pose = heroPose(p, narrow, viewW, viewH)
      const { x: mx, y: my } = pointer

      camera.position.x = mx * 0.5
      camera.position.y = -my * 0.25
      camera.lookAt(0, 0, 0)
      floor.texture.offset.y = -(window.scrollY / window.innerHeight) * 0.35 // the desk slides under you

      const g = pet.group
      g.scale.setScalar(pose.pet.scale)
      g.position.set(pose.pet.x, pose.pet.y + Math.sin(t * 1.6) * 0.07, 0)
      g.rotation.set(
        pose.pet.rx + my * 0.2,
        pose.pet.ry + mx * 0.4 + Math.sin(t * 0.8) * 0.1,
        pose.pet.rz + Math.sin(t * 1.2) * 0.04,
      )

      const pl = player.group
      pl.scale.setScalar(pose.player.scale)
      pl.position.set(pose.player.x, pose.player.y + Math.cos(t * 1.3) * 0.06, 0)
      pl.rotation.set(pose.player.rx + my * 0.2, 0, pose.player.rz)
      player.spin.rotation.y = pose.player.spinY + mx * 0.4 + Math.sin(t * 0.6) * 0.08
      player.lidPivot.rotation.x = pose.lidX // lid closes: "press play"
      player.cd.rotation.y = pose.cdY + t * 0.5

      const fr = (Math.floor(t * 2) % 2) as 0 | 1
      const face = `${pose.happy ? 'h' : 's'}${fr}`
      if (face !== lastFace) {
        pet.drawFace(pose.happy, fr)
        lastFace = face
      }
      renderer.render(scene, camera)
    }

    let running = false
    const setMode = (mode: SceneMode) => {
      wrap.style.visibility = mode === 'off' ? 'hidden' : 'visible'
      const want = mode !== 'off'
      if (want === running) return
      running = want
      renderer.setAnimationLoop(want ? render : null)
    }
    const io = new IntersectionObserver(([entry]) => setMode(entry.isIntersecting ? 'hero' : 'off'))

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    io.observe(hero)

    return () => {
      io.disconnect()
      renderer.setAnimationLoop(null)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      pet.dispose()
      player.dispose()
      floor.dispose()
      env.dispose()
      pmrem.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={wrapRef} className="h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
