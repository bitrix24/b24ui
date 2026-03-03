import { describe } from 'vitest'
import { renderEach } from '../component-render'
import Advice from '../../src/runtime/components/Advice.vue'

describe('Advice', () => {
  renderEach(Advice, [
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with class', { props: { class: '' } }],
    ['with b24ui', { props: { b24ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])
})
