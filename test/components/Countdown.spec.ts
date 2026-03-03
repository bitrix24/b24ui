import { describe } from 'vitest'
import Countdown from '../../src/runtime/components/Countdown.vue'
import { renderEach } from '../component-render'

describe('Countdown', () => {
  renderEach(Countdown, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: '' } }],
    ['with b24ui', { props: { b24ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])
})
