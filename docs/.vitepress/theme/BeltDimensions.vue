<!-- Key dimensions of a timing belt on two pulleys. Pick a dimension to see it on the drawing
     and how to calculate it. Use in any page as <BeltDimensions />. -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { gearPath, hex, beltPath } from './gears'

const P = 5                          // HTD 5mm belt pitch
const N1 = 18, N2 = 36, BELT = 60    // pulley and belt tooth counts
const S = 4                          // drawing scale: px per mm
const W = 600, H = 380, Y = 175

// The maths (mm). C-C is the standard open belt formula, used for the drawing.
const D1 = (N1 * P) / Math.PI, D2 = (N2 * P) / Math.PI
const L = BELT * P
const b = 2 * L - Math.PI * (D1 + D2)
const C = (b + Math.sqrt(b * b - 8 * (D2 - D1) ** 2)) / 8
const mm = (x: number) => x.toFixed(2)

// Drawing (px)
const R1 = (D1 / 2) * S, R2 = (D2 / 2) * S              // pitch radii
const x1 = (W - S * (D1 / 2 + C + D2 / 2)) / 2 + R1, x2 = x1 + C * S
const TOOTH = 4
// Pulley teeth sit just inside the pitch circle, where the belt's pitch line runs
const pulley = (n: number, R: number) => gearPath(n, (2 * (R - 2.5 - TOOTH)) / n, TOOTH)
const belt = beltPath(x1, R1, x2, R2, Y)
// Where the top run of the belt leaves each pulley
const phi = Math.acos((R1 - R2) / (x2 - x1))
const t1 = { x: x1 + R1 * Math.cos(phi), y: Y - R1 * Math.sin(phi) }
const t2 = { x: x2 + R2 * Math.cos(phi), y: Y - R2 * Math.sin(phi) }

type Tab = 'pitch' | 'length' | 'cc'
const tab = ref<Tab>('pitch')
const tabs: Tab[] = ['pitch', 'length', 'cc']

type Line = { lhs?: string, top: string, bottom?: string, value?: string }
const info: Record<Tab, { label: string, formulas: Line[], cards: Line[], why: string }> = {
  pitch: {
    label: 'Pitch Diameter',
    formulas: [{ lhs: 'Pitch Diameter', top: 'N × pitch', bottom: 'π' }],
    cards: [N1, N2].map(n => ({ lhs: `${n}T pulley`, top: `${n} × ${P}mm`, bottom: 'π', value: `${mm((n * P) / Math.PI)} mm` })),
    why: 'The size of the circle the belt\'s pitch line wraps around. The pitch line runs through the belt, so the pulley itself is slightly smaller than this.',
  },
  length: {
    label: 'Belt Length',
    formulas: [{ lhs: 'Belt Length', top: 'teeth × pitch' }],
    cards: [{ lhs: `${BELT}T belt`, top: `${BELT} × ${P}mm`, value: `${L} mm` }],
    why: 'Belts only come in whole numbers of teeth, so pick a real belt first. Its length then sets the centre distance.',
  },
  cc: {
    label: 'Centre Distance',
    formulas: [],
    cards: [],
    why: 'The distance between the two shafts. This is where the bearing holes go.',
  },
}


// Horizontal dimension above each pulley for the pitch diameter
const diaDims = [[x1, R1], [x2, R2]].map(([x, R]) => ({ x, R, y: Y - R - 24 }))
</script>

<template>
  <div class="gear-ratio gdim">
    <div class="gr-tabs" role="group" aria-label="Dimension">
      <button v-for="k in tabs" :key="k" :class="{ on: tab === k }" @click="tab = k">{{ info[k].label }}</button>
    </div>

    <svg :viewBox="`0 0 ${W} ${H}`" role="img"
      :aria-label="`${N1} tooth and ${N2} tooth pulleys on a ${BELT} tooth belt, showing the ${info[tab].label}`">
      <defs>
        <marker id="belt-dim-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7"
          orient="auto-start-reverse">
          <path d="M0,1.5L10,5L0,8.5Z" class="dim-head" />
        </marker>
      </defs>

      <g :transform="`translate(${x1} ${Y})`">
        <path :d="pulley(N1, R1)" class="gr-gear in" />
        <polygon :points="hex" class="gr-hex" />
      </g>
      <g :transform="`translate(${x2} ${Y})`">
        <path :d="pulley(N2, R2)" class="gr-gear out" />
        <polygon :points="hex" class="gr-hex" />
      </g>
      <path :d="belt" :class="['belt', { on: tab === 'length' }]" />

      <!-- Only the lines for the chosen dimension -->
      <template v-if="tab === 'pitch'">
        <circle :cx="x1" :cy="Y" :r="R1" class="circ" />
        <circle :cx="x2" :cy="Y" :r="R2" class="circ" />
        <g v-for="d in diaDims" :key="d.x">
          <path :d="`M${d.x - d.R},${Y - d.R} V${d.y - 6} M${d.x + d.R},${Y - d.R} V${d.y - 6}`" class="ext" />
          <path :d="`M${d.x - d.R},${d.y} H${d.x + d.R}`" class="dim"
            marker-start="url(#belt-dim-arrow)" marker-end="url(#belt-dim-arrow)" />
          <text :x="d.x" :y="d.y - 8" class="lbl">{{ mm((2 * d.R) / S) }} mm</text>
        </g>
      </template>

      <text v-if="tab === 'length'" :x="(t1.x + t2.x) / 2" :y="(t1.y + t2.y) / 2 - 34" class="lbl">
        {{ BELT }}T belt = {{ L }} mm</text>

      <g v-if="tab === 'cc'">
        <path :d="`M${x1 - R1 - 14},${Y} H${x2 + R2 + 14}`" class="centre" />
        <circle :cx="x1" :cy="Y" r="4.5" class="point" />
        <circle :cx="x2" :cy="Y" r="4.5" class="point" />
        <path :d="`M${x1},${Y} V${Y + R2 + 34} M${x2},${Y} V${Y + R2 + 34}`" class="ext" />
        <path :d="`M${x1},${Y + R2 + 26} H${x2}`" class="dim"
          marker-start="url(#belt-dim-arrow)" marker-end="url(#belt-dim-arrow)" />
        <text :x="(x1 + x2) / 2" :y="Y + R2 + 52" class="lbl">{{ mm(C) }} mm</text>
      </g>


      <text v-if="tab !== 'cc'" :x="x1" :y="H - 12" class="tag">{{ N1 }}T</text>
      <text v-if="tab !== 'cc'" :x="x2" :y="H - 12" class="tag">{{ N2 }}T</text>
    </svg>

    <div class="calc">
      <div v-if="tab === 'cc'" class="recalc">
        <b>Don't calculate this by hand.</b> Use the
        <a href="https://www.reca.lc/belts" target="_blank" rel="noopener">ReCalc belt calculator</a>:
        enter the pulleys and belt, and it gives the centre distance.
      </div>
      <div v-for="f in info[tab].formulas" :key="f.lhs" class="general">
        {{ f.lhs }} =
        <span v-if="f.bottom" class="frac"><span>{{ f.top }}</span><span>{{ f.bottom }}</span></span>
        <span v-else>{{ f.top }}</span>
      </div>
      <div v-if="info[tab].cards.length" class="worked">
        <div v-for="c in info[tab].cards" :key="c.lhs" class="card">
          <span class="who">{{ c.lhs }}</span>
          <span v-if="c.bottom" class="frac"><span>{{ c.top }}</span><span>{{ c.bottom }}</span></span>
          <span v-else>{{ c.top }}</span>
          <span class="res">= <b>{{ c.value }}</b></span>
        </div>
      </div>
      <p>{{ info[tab].why }}</p>
    </div>
  </div>
</template>

<style scoped>
.belt { fill: none; stroke: var(--vp-c-text-3); stroke-width: 7; opacity: 0.45; }
.recalc {
  margin-bottom: 12px; padding: 10px 14px; border-radius: 8px; font-size: 15px;
  background: var(--vp-c-warning-soft); border-left: 4px solid var(--vp-c-warning-1);
}
.belt.on { stroke: var(--vp-c-brand-1); opacity: 0.85; }
</style>
