import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import DashboardSearchButton from '../../src/runtime/components/DashboardSearchButton.vue'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

describe('DashboardSearchButton', () => {
  renderEach(DashboardSearchButton, [
    // Props
    ['with label', { props: { label: 'Open' } }],
    ['with icon', { props: { icon: SignIcon } }],
    ['with kbds', { props: { kbds: ['alt', 'o'] } }],
    ['with collapsed', { props: { collapsed: true } }],
    ['with class', { props: { class: 'w-full' } }]
  ])

  it('hides the icon when icon is false', async () => {
    const withIcon = await mountSuspended(DashboardSearchButton)
    expect(withIcon.find('[data-slot="icon"]').exists()).toBe(true)

    const withoutIcon = await mountSuspended(DashboardSearchButton, { props: { icon: false } })
    expect(withoutIcon.find('[data-slot="icon"]').exists()).toBe(false)
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(DashboardSearchButton, {
      props: {
        label: 'Open',
        icon: SignIcon,
        kbds: ['alt', 'o']
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
