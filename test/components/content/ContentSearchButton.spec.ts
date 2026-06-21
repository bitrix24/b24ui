import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ContentSearchButton from '../../../src/runtime/components/content/ContentSearchButton.vue'
import { renderEach } from '../../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

describe('ContentSearchButton', () => {
  renderEach(ContentSearchButton, [
    // Props
    ['with label', { props: { label: 'Open' } }],
    ['with icon', { props: { icon: SignIcon } }],
    ['with kbds', { props: { kbds: ['alt', 'o'] } }],
    ['without collapsed', { props: { collapsed: false } }],
    ['with class', { props: { class: 'w-full' } }]
  ])

  it('hides the icon when icon is false', async () => {
    const withIcon = await mountSuspended(ContentSearchButton, { props: { collapsed: false } })
    expect(withIcon.find('[data-slot="icon"]').exists()).toBe(true)

    const withoutIcon = await mountSuspended(ContentSearchButton, { props: { collapsed: false, icon: false } })
    expect(withoutIcon.find('[data-slot="icon"]').exists()).toBe(false)
  })
})
