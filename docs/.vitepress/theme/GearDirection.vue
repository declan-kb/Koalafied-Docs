<!-- Animated demo of which way gears, idlers and belts turn. Use in any page as <GearDirection />.
     Each tab asks for a prediction first, then shows the answer and starts spinning. -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { gearPath, hex, beltPath, deg, useSpin } from './gears'

const M = 5.5            // drawing scale: px of pitch diameter per tooth
const N = 24             // input and output tooth count
const W = 600, H = 340, Y = 168

type Mode = 'mesh' | 'idler' | 'belt'
type Guess = 'same' | 'opposite'
const mode = ref<Mode>('mesh')
const nIdler = ref(16)
const { angle, playing, reduced } = useSpin(1.2)

// Predict first: hide the output's direction and hold still until a guess is made
const answer: Record<Mode, Guess> = { mesh: 'opposite', idler: 'same', belt: 'same' }
const guesses = ref<Record<Mode, Guess | null>>({ mesh: null, idler: null, belt: null })
const revealed = computed(() => guesses.value[mode.value] !== null)
const right = computed(() => guesses.value[mode.value] === answer[mode.value])
function guess(g: Guess) {
  guesses.value[mode.value] = g
  if (!reduced.value) playing.value = true
}
watch(mode, () => { if (!revealed.value) playing.value = false }, { immediate: true })

const r = (n: number) => (n * M) / 2
const tooth = computed(() => (mode.value === 'belt' ? M * 0.5 : M))
const BELT_GAP = 140

// Each gear: position, teeth, angle, and spin direction (1 = clockwise on screen)
const gears = computed(() => {
  const teeth = mode.value === 'idler' ? [N, nIdler.value, N] : [N, N]
  const names = mode.value === 'idler' ? ['input', 'idler', 'output'] : ['input', 'output']
  const list: { x: number, n: number, theta: number, dir: number, name: string }[] = []
  let x = 0
  teeth.forEach((n, i) => {
    if (i === 0) list.push({ x, n, theta: angle.value, dir: 1, name: names[0] })
    else {
      const prev = list[i - 1]
      x = prev.x + r(prev.n) + r(n) + (mode.value === 'belt' ? BELT_GAP : 0)
      // Meshing: turn the other way, scaled by the tooth counts, with a gap
      // facing the previous gear's tooth. Belt: same angle as the input.
      const theta = mode.value === 'belt' ? prev.theta
        : Math.PI - Math.PI / n - (prev.theta * prev.n) / n
      list.push({ x, n, theta, dir: mode.value === 'belt' ? prev.dir : -prev.dir, name: names[i] })
    }
  })
  // Centre the row
  const shift = (W - (x + r(teeth.at(-1)!) + r(teeth[0]))) / 2 + r(teeth[0])
  return list.map(g => ({ ...g, x: g.x + shift }))
})

const belt = computed(() => {
  const [a, b] = gears.value
  return beltPath(a.x, r(a.n) + 2, b.x, r(b.n) + 2, Y)
})

// Curved arrow over the top of a gear, pointing the way it turns
function arrow(g: { x: number, n: number, dir: number }) {
  const R = r(g.n) + tooth.value + 12
  const p = (a: number) => `${g.x + R * Math.cos(a)},${Y + R * Math.sin(a)}`
  const [a0, a1] = g.dir > 0 ? [-2.0, -1.15] : [-1.15, -2.0]
  return `M${p(a0)} A${R},${R} 0 0 ${g.dir > 0 ? 1 : 0} ${p(a1)}`
}

const questions: Record<Mode, string> = {
  mesh: 'Predict: the input turns clockwise. Which way will the output turn?',
  idler: 'Predict: now there is an idler gear in the middle. Which way will the output turn?',
  belt: 'Predict: the pulleys are joined by a belt. Which way will the output turn?',
}
const notes = {
  mesh: 'Meshing gears turn in opposite directions.',
  idler: 'The idler flips the direction back, so the input and output turn the same way. ' +
    'Change the idler size: it spins faster or slower, but the output speed stays the same.',
  belt: 'A belt or chain turns both ends the same way.',
}
</script>

<template>
  <div class="gear-ratio">
    <div class="gr-top">
      <div class="gr-tabs" role="group" aria-label="Drive type">
        <button :class="{ on: mode === 'mesh' }" @click="mode = 'mesh'">Meshing</button>
        <button :class="{ on: mode === 'idler' }" @click="mode = 'idler'">Idler</button>
        <button :class="{ on: mode === 'belt' }" @click="mode = 'belt'">Belt</button>
      </div>
      <button v-if="revealed" class="gr-play" @click="playing = !playing">{{ playing ? 'Pause' : 'Play' }}</button>
    </div>

    <svg :viewBox="`0 0 ${W} ${H}`" role="img" :aria-label="notes[mode]">
      <defs>
        <marker id="gd-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M0,0L10,5L0,10Z" class="gd-head" />
        </marker>
      </defs>
      <path v-if="mode === 'belt'" :d="belt" class="gr-belt"
        :stroke-dashoffset="-angle * (r(N) + 2)" />
      <g v-for="(g, i) in gears" :key="g.name">
        <g :transform="`translate(${g.x} ${Y}) rotate(${deg(g.theta)})`">
          <path :d="gearPath(g.n, M, tooth)" :class="['gr-gear', i === 0 ? 'in' : 'out']" />
          <polygon :points="hex" class="gr-hex" />
          <circle :cx="r(g.n) - tooth * 2.4" cy="0" r="3" class="gr-dot" />
        </g>
        <path v-if="i === 0 || revealed" :d="arrow(g)" class="gd-arrow" marker-end="url(#gd-arrow)" />
        <text :x="g.x" :y="H - 24" class="gr-label">{{ g.name }}</text>
        <text :x="g.x" :y="H - 6" class="gr-label gd-dir">
          {{ i > 0 && !revealed ? '?' : g.dir > 0 ? 'clockwise' : 'anticlockwise' }}</text>
      </g>
    </svg>

    <div v-if="!revealed" class="gd-predict">
      <p>{{ questions[mode] }}</p>
      <button @click="guess('same')">Same way as the input</button>
      <button @click="guess('opposite')">Opposite way</button>
    </div>
    <template v-else>
    <div v-if="mode === 'idler'" class="gr-sliders">
      <label>Idler size <b>{{ nIdler }}T</b>
        <input type="range" min="12" max="40" v-model.number="nIdler" />
      </label>
      <label>Ratio, input to output <b>1:1</b></label>
    </div>
    <p class="gd-note" role="status">
      <b :class="right ? 'gd-right' : 'gd-wrong'">{{ right ? '✓ Correct.' : 'Not quite.' }}</b>
      {{ notes[mode] }}</p>
    </template>
  </div>
</template>

<style scoped>
.gd-arrow { fill: none; stroke: var(--vp-c-brand-1); stroke-width: 2.5; stroke-linecap: round; }
.gd-head { fill: var(--vp-c-brand-1); }
.gd-dir { font-size: 11px; fill: var(--vp-c-brand-1); }
.gd-note { margin: 8px 0 0; font-size: 14px; color: var(--vp-c-text-2); }
.gd-right { color: var(--vp-c-brand-1); }
.gd-wrong { color: var(--vp-c-warning-1); }
.gd-predict p { margin: 0 0 8px; font-weight: 500; }
.gd-predict button {
  margin: 0 8px 8px 0;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 500;
}
.gd-predict button:hover { background: var(--vp-c-brand-soft); }
</style>
