// Drawing and animation helpers shared by the gear demos (GearRatio, GearDirection).
import { ref, onMounted, onUnmounted } from 'vue'

export const deg = (a: number) => (a * 180) / Math.PI

// Gear outline with n teeth: a trapezoid tooth every 360/n degrees.
// m = px of pitch diameter per tooth, tooth = drawn tooth height.
export function gearPath(n: number, m: number, tooth: number) {
  const rp = (n * m) / 2
  const rt = rp + tooth, rr = rp - tooth * 1.25
  const step = (2 * Math.PI) / n
  const pts: string[] = []
  for (let i = 0; i < n; i++) {
    const a = i * step
    for (const [rad, da] of [[rr, -0.3], [rt, -0.13], [rt, 0.13], [rr, 0.3]])
      pts.push(`${(rad * Math.cos(a + da * step)).toFixed(2)},${(rad * Math.sin(a + da * step)).toFixed(2)}`)
  }
  return `M${pts.join('L')}Z`
}

// 1/2in hex bore, drawn the same size on every gear
export const hex = Array.from({ length: 6 }, (_, i) => {
  const a = (i * Math.PI) / 3
  return `${(9 * Math.cos(a)).toFixed(2)},${(9 * Math.sin(a)).toFixed(2)}`
}).join(' ')

// Belt hugging two pulleys (outer tangent lines + arcs). x2 must be right of x1.
export function beltPath(x1: number, R1: number, x2: number, R2: number, y: number) {
  const phi = Math.acos((R1 - R2) / (x2 - x1))
  const c = Math.cos(phi), s = Math.sin(phi)
  const big2 = phi > Math.PI / 2 ? 1 : 0
  return `M${x1 + R1 * c},${y - R1 * s} L${x2 + R2 * c},${y - R2 * s}
    A${R2},${R2} 0 ${big2} 1 ${x2 + R2 * c},${y + R2 * s}
    L${x1 + R1 * c},${y + R1 * s}
    A${R1},${R1} 0 ${1 - big2} 1 ${x1 + R1 * c},${y - R1 * s}Z`
}

// Input gear angle (radians) that keeps increasing while playing.
// Starts paused for people who have reduced motion turned on.
export function useSpin(speed = 1.6) {
  const angle = ref(0)
  const playing = ref(true)
  const reduced = ref(false)   // the viewer has reduced motion turned on
  let raf = 0, last = 0
  function tick(t: number) {
    if (last && playing.value) angle.value += ((t - last) / 1000) * speed
    last = t
    raf = requestAnimationFrame(tick)
  }
  onMounted(() => {
    reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.value) playing.value = false
    raf = requestAnimationFrame(tick)
  })
  onUnmounted(() => cancelAnimationFrame(raf))
  return { angle, playing, reduced }
}
