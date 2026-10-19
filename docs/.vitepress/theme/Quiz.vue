<!-- Multiple choice quiz, one question at a time, with instant feedback and a score. Use in any page:
     <script setup>
     const questions = [
       { q: 'Question?', options: ['A', 'B', 'C'], answer: 1, explain: 'Why B is right.', review: '#section' },
     ]
     </script>
     <Quiz :questions="questions" />
     answer is the position of the right option, counting from 0. Mix up where the right answer goes. -->
<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  questions: { q: string, options: string[], answer: number, explain: string, review?: string }[]
}>()

const picked = ref<(number | null)[]>(props.questions.map(() => null))
const answered = computed(() => picked.value.filter(p => p !== null).length)
const score = computed(() => picked.value.filter((p, i) => p === props.questions[i].answer).length)
const current = ref(0)               // index of the question showing
const done = ref(false)              // showing the results
const item = computed(() => props.questions[current.value])
const isLast = computed(() => current.value === props.questions.length - 1)
const missed = computed(() => props.questions.filter((q, i) => picked.value[i] !== q.answer))

function next() {
  if (isLast.value) done.value = true
  else current.value++
}
function reset() {
  picked.value = props.questions.map(() => null)
  current.value = 0
  done.value = false
}
</script>

<template>
  <div class="quiz">
    <template v-if="!done">
      <div class="qz-progress">
        <span>Question {{ current + 1 }} of {{ questions.length }}</span>
        <span>{{ score }} correct</span>
      </div>
      <div class="qz-bar"><div :style="{ width: `${(answered / questions.length) * 100}%` }"></div></div>

      <p class="qz-q">{{ item.q }}</p>
      <div class="qz-options">
        <button v-for="(opt, j) in item.options" :key="`${current}-${j}`" :disabled="picked[current] !== null"
          :class="{
            right: picked[current] !== null && j === item.answer,
            wrong: picked[current] === j && j !== item.answer,
          }"
          @click="picked[current] = j">{{ opt }}</button>
      </div>
      <template v-if="picked[current] !== null">
        <p class="qz-feedback" role="status">
          <b :class="picked[current] === item.answer ? 'qz-right' : 'qz-wrong'">
            {{ picked[current] === item.answer ? '✓ Correct.' : 'Not quite.' }}</b>
          {{ item.explain }}
        </p>
        <button class="qz-next" @click="next">{{ isLast ? 'See my score' : 'Next question' }}</button>
      </template>
    </template>

    <div v-else class="qz-result" role="status">
      <p class="qz-score">You got <b>{{ score }} out of {{ questions.length }}</b></p>
      <p v-if="!missed.length">Great work! You're ready to start designing.</p>
      <template v-else>
        <p>Have another look at these, then try again:</p>
        <ul>
          <li v-for="q in missed" :key="q.q">
            {{ q.q }} <a v-if="q.review" :href="q.review">Review</a>
          </li>
        </ul>
      </template>
      <button class="qz-next" @click="reset">Try again</button>
    </div>
  </div>
</template>

<style scoped>
.quiz {
  margin: 1.5em 0;
  padding: 16px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.qz-progress { display: flex; justify-content: space-between; font-size: 13px; color: var(--vp-c-text-2); }
.qz-bar { height: 4px; margin: 6px 0 16px; border-radius: 2px; background: var(--vp-c-divider); overflow: hidden; }
.qz-bar div { height: 100%; background: var(--vp-c-brand-1); transition: width 0.3s; }
.qz-q { margin: 0 0 10px; font-size: 17px; font-weight: 600; }
.qz-options { display: flex; flex-direction: column; gap: 6px; }
.qz-options button {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  text-align: left;
  font-size: 15px;
  line-height: 1.4;
}
.qz-options button:not(:disabled):hover { border-color: var(--vp-c-brand-1); }
.qz-options button:disabled { cursor: default; opacity: 0.6; }
.qz-options button.right { opacity: 1; border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.qz-options button.wrong { opacity: 1; border-color: var(--vp-c-warning-1); background: var(--vp-c-warning-soft); }
.qz-feedback { margin: 10px 0 0; font-size: 14px; color: var(--vp-c-text-2); }
.qz-right { color: var(--vp-c-brand-1); }
.qz-wrong { color: var(--vp-c-warning-1); }
.qz-next {
  margin-top: 12px;
  padding: 6px 16px;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  font-weight: 500;
}
.qz-result p { margin: 0 0 8px; }
.qz-score { font-size: 18px; }
.qz-score b { color: var(--vp-c-brand-1); }
.qz-result ul { margin: 0 0 4px; font-size: 14px; }
</style>
