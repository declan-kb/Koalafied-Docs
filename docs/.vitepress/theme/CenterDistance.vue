<!-- Centre-to-centre distance for a gear pair, chain or belt. Use in any page as <CenterDistance />. -->
<script setup lang="ts">
import { ref, computed } from 'vue'

type Tab = 'gear' | 'chain' | 'belt'
const tab = ref<Tab>('gear')
const tabs: Record<Tab, string> = { gear: 'Gears', chain: 'Chain', belt: 'Belt' }

const t1 = ref(18), t2 = ref(36)
const dp = ref(20)
const chainPitch = ref(0.25)   // in
const links = ref(60)
const beltPitch = ref(5)       // mm
const beltTeeth = ref(60)

// Centre distance (in pitches) for a loop `len` pitches long around n1 and n2 tooth sprockets/pulleys.
// Solves the exact wrap length (two straight runs plus an arc on each) by bisection, rather than
// the usual quadratic approximation. NaN if the loop is too short to fit around both.
function wrapCC(n1: number, n2: number, len: number) {
  const r1 = Math.min(n1, n2) / (2 * Math.PI), r2 = Math.max(n1, n2) / (2 * Math.PI)
  const wrap = (c: number) => {
    const a = Math.asin((r2 - r1) / c)
    return 2 * c * Math.cos(a) + Math.PI * (r1 + r2) + 2 * a * (r2 - r1)
  }
  let lo = r1 + r2, hi = len / 2
  if (!(wrap(lo) <= len)) return NaN
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    if (wrap(mid) < len) lo = mid
    else hi = mid
  }
  return lo
}

// Result in inches
const cc = computed(() => {
  if (!(t1.value > 0 && t2.value > 0)) return NaN
  if (tab.value === 'gear') return (t1.value + t2.value) / (2 * dp.value)
  if (tab.value === 'chain') return wrapCC(t1.value, t2.value, links.value) * chainPitch.value
  return (wrapCC(t1.value, t2.value, beltTeeth.value) * beltPitch.value) / 25.4
})
const part = computed(() => (tab.value === 'gear' ? 'gear' : tab.value === 'chain' ? 'sprocket' : 'pulley'))
</script>

<template>
  <div class="gear-ratio gdim cc-calc">
    <div class="gr-tabs" role="group" aria-label="Transmission type">
      <button v-for="(label, k) in tabs" :key="k" :class="{ on: tab === k }" @click="tab = k">{{ label }}</button>
    </div>

    <div class="cc-inputs">
      <label>Driving {{ part }} teeth <input v-model.number="t1" type="number" min="1" /></label>
      <label>Driven {{ part }} teeth <input v-model.number="t2" type="number" min="1" /></label>
      <label v-if="tab === 'gear'">Diametral pitch
        <select v-model.number="dp"><option :value="20">20 DP</option><option :value="32">32 DP</option></select>
      </label>
      <template v-if="tab === 'chain'">
        <label>Chain size
          <select v-model.number="chainPitch"><option :value="0.25">#25</option><option :value="0.375">#35</option></select>
        </label>
        <label>Chain links <input v-model.number="links" type="number" min="1" /></label>
      </template>
      <template v-if="tab === 'belt'">
        <label>Belt pitch
          <select v-model.number="beltPitch"><option :value="5">5mm HTD</option><option :value="3">3mm GT2</option></select>
        </label>
        <label>Belt teeth <input v-model.number="beltTeeth" type="number" min="1" /></label>
      </template>
    </div>

    <div class="calc">
      <div class="general">
        Centre distance =
        <b v-if="Number.isFinite(cc)" class="cc-out">{{ cc.toFixed(3) }} in ({{ (cc * 25.4).toFixed(2) }} mm)</b>
        <span v-else class="cc-err">{{ tab === 'gear' ? 'enter both tooth counts' : `too short for these ${part}s` }}</span>
      </div>
      <p v-if="tab === 'gear'">(N₁ + N₂) ÷ (2 × DP). Exact for standard spur gears.</p>
      <p v-else>Exact pitch-line wrap, with no allowance for stretch or tensioning.
        <template v-if="tab === 'chain' && links % 2">Odd link counts need a half link.</template></p>
    </div>
  </div>
</template>

<style scoped>
.cc-inputs { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px 16px; margin: 14px 0; }
.cc-inputs label { display: flex; flex-direction: column; gap: 4px; font-size: 14px; color: var(--vp-c-text-2); }
.cc-inputs input, .cc-inputs select {
  padding: 4px 8px; border: 1px solid var(--vp-c-divider); border-radius: 6px;
  background: var(--vp-c-bg); color: var(--vp-c-text-1); font: 500 15px var(--vp-font-family-mono);
}
.cc-out { color: var(--vp-c-brand-1); }
.cc-err { color: var(--vp-c-danger-1); font-weight: 500; }
</style>
