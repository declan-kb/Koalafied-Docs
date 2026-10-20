import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import GearRatio from './GearRatio.vue'
import GearDirection from './GearDirection.vue'
import GearDimensions from './GearDimensions.vue'
import BeltDimensions from './BeltDimensions.vue'
import Practice from './Practice.vue'
import Quiz from './Quiz.vue'
import CenterDistance from './CenterDistance.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GearRatio', GearRatio)
    app.component('GearDirection', GearDirection)
    app.component('GearDimensions', GearDimensions)
    app.component('BeltDimensions', BeltDimensions)
    app.component('Practice', Practice)
    app.component('Quiz', Quiz)
    app.component('CenterDistance', CenterDistance)
  },
} satisfies Theme
