import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import Advice from '../../src/runtime/components/Advice.vue'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

describe('Advice', () => {
  renderEach(Advice, [
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with description', { props: { description: 'Description' } }],
    ['with angle', { props: { description: 'Description', angle: 'top' as const } }],
    ['with icon', { props: { description: 'Description', icon: Search2Icon } }],
    ['with avatar', { props: { description: 'Description', avatar: { alt: 'Bitrix24' } } }],
    ['with class', { props: { class: '' } }],
    ['with b24ui', { props: { b24ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with leading slot', { slots: { leading: () => 'Leading slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Advice, {
      props: { description: 'Description', icon: Search2Icon }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
