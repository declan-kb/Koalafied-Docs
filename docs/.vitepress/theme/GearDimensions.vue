<!-- Key dimensions of two meshing gears. Pick a dimension to see it on the drawing
     and how to calculate it. Use in any page as <GearDimensions />. -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { gearPath, hex, deg } from './gears'

const DP = 20
const N1 = 24, N2 = 40
const S = 130            // drawing scale: px per inch
const M = S / DP         // px of pitch diameter per tooth; also the tooth tip height (1/DP)
const W = 600, H = 400, Y = 200

const r1 = (N1 * M) / 2, r2 = (N2 * M) / 2          // pitch radii
const o1 = r1 + M, o2 = r2 + M                      // outside radii
const x1 = (W - (o1 + r1 + r2 + o2)) / 2 + o1, x2 = x1 + r1 + r2
const theta2 = deg(Math.PI - Math.PI / N2)          // big gear gap faces small gear tooth
const inch = (x: number) => x.toFixed(3)

type Tab = 'pitch' | 'outside' | 'cc'
const tab = ref<Tab>('pitch')
const tabs: Tab[] = ['pitch', 'outside', 'cc']

// What each tab explains. calc(n) gives the worked fraction and answer for an n tooth gear.
const info: Record<Tab, {
  label: string, top: string, bottom: string, why: string,
  calc: (n: number) => { top: string, bottom: string, value: number }
}> = {
  pitch: {
    label: 'Pitch Diameter', top: 'N', bottom: 'DP',
    why: 'The effective size of the gear, where the teeth of two gears meet. The pitch circles of meshing gears touch at one point (the dot).',
    calc: n => ({ top: `${n}`, bottom: `${DP}`, value: n / DP }),
  },
  outside: {
    label: 'Outer Diameter', top: 'N + 2', bottom: 'DP',
    why: 'The size across the tips of the teeth: one tooth height (1/DP) bigger than the pitch diameter on each side. Leave clearance around this.',
    calc: n => ({ top: `${n} + 2`, bottom: `${DP}`, value: (n + 2) / DP }),
  },
  cc: {
    label: 'Centre Distance', top: 'N₁ + N₂', bottom: '2 × DP',
    why: 'The distance between the two shafts: half of the two pitch diameters added together. This is where the bearing holes go.',
    calc: () => ({ top: `${N1} + ${N2}`, bottom: `2 × ${DP}`, value: (N1 + N2) / (2 * DP) }),
  },
}
const cards = computed(() => tab.value === 'cc'
  ? [{ who: `${N1}T and ${N2}T`, ...info.cc.calc(0) }]
  : [N1, N2].map(n => ({ who: `${n}T gear`, ...info[tab.value].calc(n) })))


// Horizontal dimension above each gear for the chosen diameter
const diaDims = computed(() => tab.value === 'cc' ? [] : [[x1, r1, o1], [x2, r2, o2]].map(([x, r, o]) => {
  const half = tab.value === 'pitch' ? r : o
  return { x, half, y: Y - o - 26, top: Y - half }
}))
</script>

<template>
  <div class="gear-ratio gdim">
    <div class="gr-tabs" role="group" aria-label="Dimension">
      <button v-for="k in tabs" :key="k" :class="{ on: tab === k }" @click="tab = k">{{ info[k].label }}</button>
    </div>

    <svg :viewBox="`0 0 ${W} ${H}`" role="img"
      :aria-label="`${N1} tooth and ${N2} tooth ${DP}DP gears, showing the ${info[tab].label}`">
      <defs>
        <marker id="dim-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7"
          orient="auto-start-reverse">
          <path d="M0,1.5L10,5L0,8.5Z" class="dim-head" />
        </marker>
      </defs>

      <g :transform="`translate(${x1} ${Y})`">
        <path :d="gearPath(N1, M, M)" class="gr-gear in" />
        <polygon :points="hex" class="gr-hex" />
      </g>
      <g :transform="`translate(${x2} ${Y}) rotate(${theta2})`">
        <path :d="gearPath(N2, M, M)" class="gr-gear out" />
        <polygon :points="hex" class="gr-hex" />
      </g>

      <!-- Only the circles and lines for the chosen dimension -->
      <path v-if="tab === 'cc'" :d="`M${x1 - o1 - 14},${Y} H${x2 + o2 + 14}`" class="centre" />
      <template v-if="tab === 'pitch'">
        <circle :cx="x1" :cy="Y" :r="r1" class="circ" />
        <circle :cx="x2" :cy="Y" :r="r2" class="circ" />
      </template>
      <template v-if="tab === 'outside'">
        <circle :cx="x1" :cy="Y" :r="o1" class="circ" />
        <circle :cx="x2" :cy="Y" :r="o2" class="circ" />
      </template>
      <circle v-if="tab === 'pitch'" :cx="x1 + r1" :cy="Y" r="4.5" class="point" />

      <g v-for="d in diaDims" :key="d.x">
        <path :d="`M${d.x - d.half},${d.top} V${d.y - 6} M${d.x + d.half},${d.top} V${d.y - 6}`" class="ext" />
        <path :d="`M${d.x - d.half},${d.y} H${d.x + d.half}`" class="dim"
          marker-start="url(#dim-arrow)" marker-end="url(#dim-arrow)" />
        <text :x="d.x" :y="d.y - 8" class="lbl">{{ inch((2 * d.half) / S) }} in</text>
      </g>

      <g v-if="tab === 'cc'">
        <circle :cx="x1" :cy="Y" r="4.5" class="point" />
        <circle :cx="x2" :cy="Y" r="4.5" class="point" />
        <path :d="`M${x1},${Y} V${Y + o2 + 34} M${x2},${Y} V${Y + o2 + 34}`" class="ext" />
        <path :d="`M${x1},${Y + o2 + 26} H${x2}`" class="dim"
          marker-start="url(#dim-arrow)" marker-end="url(#dim-arrow)" />
        <text :x="(x1 + x2) / 2" :y="Y + o2 + 52" class="lbl">{{ inch((r1 + r2) / S) }} in</text>
      </g>

      <text v-if="tab !== 'cc'" :x="x1" :y="H - 12" class="tag">{{ N1 }}T</text>
      <text v-if="tab !== 'cc'" :x="x2" :y="H - 12" class="tag">{{ N2 }}T</text>
    </svg>

    <div class="calc">
      <div class="general">
        {{ info[tab].label }} =
        <span class="frac"><span>{{ info[tab].top }}</span><span>{{ info[tab].bottom }}</span></span>
      </div>
      <div class="worked">
        <div v-for="c in cards" :key="c.who" class="card">
          <span class="who">{{ c.who }}</span>
          <span class="frac"><span>{{ c.top }}</span><span>{{ c.bottom }}</span></span>
          <span class="res">= <b>{{ inch(c.value) }} in</b></span>
        </div>
      </div>
      <p>{{ info[tab].why }}</p>
    </div>
  </div>
</template>
