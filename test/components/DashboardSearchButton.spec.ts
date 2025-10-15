import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DashboardSearchButton from '../../src/runtime/components/DashboardSearchButton.vue'
import type { DashboardSearchButtonProps } from '../../src/runtime/components/DashboardSearchButton.vue'
import ComponentRender from '../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

describe('DashboardSearchButton', () => {
  it.each([
    // Props
    ['with label', { props: { label: 'Open' } }],
    ['with icon', { props: { icon: SignIcon } }],
    ['with kbds', { props: { kbds: ['alt', 'o'] } }],
    ['with collapsed', { props: { collapsed: true } }],
    ['with class', { props: { class: 'w-full' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: DashboardSearchButtonProps }) => {
    const html = await ComponentRender(nameOrHtml, options, DashboardSearchButton)
    expect(html).toMatchSnapshot()
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
