<!-- Interactive gear / belt ratio demo. Use in any page as <GearRatio />.
     Drag the sliders to change the tooth counts and watch the speeds change.
     Add a challenge with a target output speed: <GearRatio :target="1000" /> -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { gearPath as drawGear, hex, beltPath as drawBelt, deg, useSpin } from './gears'

const props = defineProps<{ target?: number }>()   // target output RPM

const DP = 20            // our standard gear pitch
const MOTOR_RPM = 6000   // Kraken X60 free speed
const M = 3.6            // drawing scale: px of pitch diameter per tooth
const W = 600, H = 300

const mode = ref<'gears' | 'belt'>('gears')
const nIn = ref(12)
const nOut = ref(60)
const { angle, playing } = useSpin()   // input rotation, radians

const ratio = computed(() => nOut.value / nIn.value)
const outRpm = computed(() => Math.round(MOTOR_RPM / ratio.value))
// Within 2%, since whole tooth counts can't always hit a speed exactly
const hit = computed(() => props.target != null && Math.abs(outRpm.value - props.target) <= props.target * 0.02)
const fmt = (x: number) => (Math.round(x * 100) / 100).toString()

// Pitch radius, plus the drawn tooth height (belt pulleys get smaller teeth)
const r = (n: number) => (n * M) / 2
const tooth = computed(() => (mode.value === 'gears' ? M : M * 0.5))

const layout = computed(() => {
  const r1 = r(nIn.value), r2 = r(nOut.value)
  const gap = mode.value === 'gears' ? 0 : 70
  const total = r1 + r2 + gap
  const x1 = (W - total) / 2 + (r1 - r2) / 2
  return { r1, r2, x1, x2: x1 + total, y: (H - 20) / 2 }
})

const gearPath = (n: number) => drawGear(n, M, tooth.value)

const beltPath = computed(() => {
  const { r1, r2, x1, x2, y } = layout.value
  return drawBelt(x1, r1 + 2, x2, r2 + 2, y)
})

// Input turns at `angle`; output turns slower by the ratio, and backwards if meshing.
// The half-tooth offset puts a gap on the output where the input's tooth is.
const outAngle = computed(() => {
  const dir = mode.value === 'gears' ? -1 : 1
  const offset = mode.value === 'gears' ? Math.PI + Math.PI / nOut.value : 0
  return dir * angle.value / ratio.value + offset
})
</script>

<template>
  <div class="gear-ratio">
    <div class="gr-top">
      <div class="gr-tabs" role="group" aria-label="Drive type">
        <button :class="{ on: mode === 'gears' }" @click="mode = 'gears'">Gears</button>
        <button :class="{ on: mode === 'belt' }" @click="mode = 'belt'">Belt</button>
      </div>
      <button class="gr-play" @click="playing = !playing">{{ playing ? 'Pause' : 'Play' }}</button>
    </div>

    <p v-if="target" :class="['gr-target', { hit }]" role="status">
      <span>Challenge: get the output to <b>{{ target }} RPM</b></span>
      <span v-if="hit">✓ Done! {{ nIn }}T to {{ nOut }}T gives {{ outRpm }} RPM</span>
      <span v-else>Now: {{ outRpm }} RPM</span>
    </p>

    <svg :viewBox="`0 0 ${W} ${H}`" role="img"
      :aria-label="`${nIn} tooth input driving ${nOut} tooth output, ${fmt(ratio)} to 1`">
      <path v-if="mode === 'belt'" :d="beltPath" class="gr-belt"
        :stroke-dashoffset="-angle * (layout.r1 + 2)" />
      <g :transform="`translate(${layout.x1} ${layout.y}) rotate(${deg(angle)})`">
        <path :d="gearPath(nIn)" class="gr-gear in" />
        <polygon :points="hex" class="gr-hex" />
        <circle :cx="layout.r1 - tooth * 2.4" cy="0" r="3" class="gr-dot" />
      </g>
      <g :transform="`translate(${layout.x2} ${layout.y}) rotate(${deg(outAngle)})`">
        <path :d="gearPath(nOut)" class="gr-gear out" />
        <polygon :points="hex" class="gr-hex" />
        <circle :cx="layout.r2 - tooth * 2.4" cy="0" r="3" class="gr-dot" />
      </g>
      <text :x="layout.x1" :y="H - 6" class="gr-label">input {{ nIn }}T</text>
      <text :x="layout.x2" :y="H - 6" class="gr-label">output {{ nOut }}T</text>
    </svg>

    <div class="gr-sliders">
      <label>Input (motor) <b>{{ nIn }}T</b>
        <input type="range" min="10" max="72" v-model.number="nIn" />
      </label>
      <label>Output <b>{{ nOut }}T</b>
        <input type="range" min="10" max="72" v-model.number="nOut" />
      </label>
    </div>

    <div class="gr-stats">
      <div><span>Ratio</span><b>{{ fmt(ratio) }}:1</b>
        <small>{{ ratio > 1 ? 'reduction' : ratio < 1 ? 'step-up' : 'no change' }}</small></div>
      <div><span>Output speed</span><b>{{ outRpm }} RPM</b>
        <small>from {{ MOTOR_RPM }} RPM</small></div>
      <div><span>Output torque</span><b>× {{ fmt(ratio) }}</b>
        <small>of motor torque</small></div>
      <div v-if="mode === 'gears'"><span>C-C at {{ DP }}DP</span>
        <b>{{ ((nIn + nOut) / (2 * DP)).toFixed(3) }} in</b><small>turns opposite ways</small></div>
      <div v-else><span>C-C</span><b>any</b><small>turns the same way</small></div>
    </div>

    <p v-if="mode === 'belt' && Math.min(nIn, nOut) < 18" class="gr-warn">
      Pulleys under 18T have few teeth in mesh, so the belt can skip. We keep pulleys 18T or larger.
    </p>
  </div>
</template>

<style scoped>
.gr-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 12px; }
.gr-stats div {
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  display: flex;
  flex-direction: column;
}
.gr-stats span { font-size: 12px; color: var(--vp-c-text-2); }
.gr-stats b { font: 600 18px var(--vp-font-family-mono); color: var(--vp-c-brand-1); }
.gr-stats small { font-size: 12px; color: var(--vp-c-text-3); }
.gr-target {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 12px;
  margin: 12px 0 0;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  font-size: 14px;
}
.gr-target.hit { background: var(--vp-c-brand-soft); }
.gr-target.hit span:last-child { color: var(--vp-c-brand-1); font-weight: 600; }
.gr-warn { margin: 12px 0 0; font-size: 14px; color: var(--vp-c-warning-1); }

@media (max-width: 640px) {
  .gr-sliders, .gr-stats { grid-template-columns: 1fr 1fr; }
}
</style>
