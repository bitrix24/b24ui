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

  // The avatar rather than the icon: `icon` sets `isLeading`, which wins the
  // `v-else-if` and drops the avatar, leaving axe one rule to run. The avatar
  // renders an `<img>`, which brings in `image-alt` and `nested-interactive`.
  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Advice, {
      props: { description: 'Description', avatar: { src: 'https://github.com/bitrix24.png', alt: 'Bitrix24' } }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
