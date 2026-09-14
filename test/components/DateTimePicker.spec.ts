import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DateTimePicker from '../../src/runtime/components/DateTimePicker.vue'
import { renderEach } from '../component-render'

describe('DateTimePicker', () => {
  const props = {}

  renderEach(DateTimePicker, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: '' } }],
    ['with b24ui', { props: { b24ui: {} } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DateTimePicker, {
      props
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
