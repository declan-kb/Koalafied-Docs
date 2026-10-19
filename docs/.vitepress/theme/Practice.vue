<!-- A practice question with a number answer. Use in any page, e.g.
     <Practice question="A 14T gear drives a 56T gear. What is the ratio?" :answer="4" unit=":1"
       working="56 ÷ 14 = 4, so 4:1" />
     tol is how far off an answer can be and still count as right (default 0.01). -->
<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  question: string, answer: number, unit?: string, tol?: number, working?: string
}>(), { unit: '', tol: 0.01, working: '' })

const input = ref('')
const result = ref<'right' | 'wrong' | null>(null)
const showWorking = ref(false)

function check() {
  const n = parseFloat(input.value.replace(',', '.'))   // "4:1" reads as 4
  result.value = Math.abs(n - props.answer) <= props.tol ? 'right' : 'wrong'
}
</script>

<template>
  <div class="practice">
    <span class="p-tag">Your turn</span>
    <p class="p-q">{{ question }}</p>
    <form class="p-row" @submit.prevent="check">
      <input v-model="input" inputmode="decimal" :aria-label="`Answer${unit ? ` in ${unit}` : ''}`"
        @input="result = null" />
      <span v-if="unit" class="p-unit">{{ unit }}</span>
      <button type="submit" :disabled="!input">Check</button>
      <span v-if="result === 'right'" class="p-right" role="status">✓ Correct</span>
      <span v-else-if="result === 'wrong'" class="p-wrong" role="status">Not quite, try again</span>
    </form>
    <button v-if="working && (result || showWorking)" class="p-link" @click="showWorking = !showWorking">
      {{ showWorking ? 'Hide' : 'Show' }} working</button>
    <p v-if="showWorking" class="p-working">{{ working }}</p>
  </div>
</template>

<style scoped>
.practice {
  margin: 1em 0;
  padding: 12px 16px;
  border: 1px dashed var(--vp-c-brand-1);
  border-radius: 10px;
}
.p-tag { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--vp-c-brand-1); }
.p-q { margin: 4px 0 8px; }
.p-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.p-row input {
  width: 110px;
  padding: 4px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-family: var(--vp-font-family-mono);
}
.p-row input:focus { border-color: var(--vp-c-brand-1); outline: none; }
.p-unit { font-family: var(--vp-font-family-mono); color: var(--vp-c-text-2); }
.p-row button {
  padding: 4px 14px;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  font-size: 14px;
  font-weight: 500;
}
.p-row button:disabled { opacity: 0.4; cursor: default; }
.p-right { color: var(--vp-c-green-1, #10b981); font-weight: 600; }
.p-wrong { color: var(--vp-c-warning-1); font-weight: 500; }
.p-link { margin-top: 8px; font-size: 14px; color: var(--vp-c-brand-1); text-decoration: underline; }
.p-working { margin: 6px 0 0; font-family: var(--vp-font-family-mono); font-size: 14px; color: var(--vp-c-text-2); }
</style>
