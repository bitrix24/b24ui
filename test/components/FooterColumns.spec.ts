import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import FooterColumns from '../../src/runtime/components/FooterColumns.vue'
import type { FooterColumnsProps, FooterColumnsSlots } from '../../src/runtime/components/FooterColumns.vue'
import ComponentRender from '../component-render'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-b24/Bitrix24Icon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

describe('FooterColumns', () => {
  const columns = [
    {
      label: 'Community',
      children: [
        {
          label: 'REST API',
          to: 'https://apidocs.bitrix24.com',
          target: '_blank',
          icon: Bitrix24Icon
        },
        {
          label: 'Bitrix24 on GitHub',
          to: 'https://github.com/bitrix24',
          icon: GitHubIcon,
          target: '_blank'
        },
        {
          label: 'Documentation'
        },
        {
          label: 'Design Kit'
        }
      ]
    },
    {
      label: 'Enterprise',
      children: [
        {
          label: 'Support'
        },
        {
          label: 'Agencies'
        },
        {
          label: 'Jobs'
        },
        {
          label: 'Sponsors'
        }
      ]
    },
    {
      label: 'Solutions',
      children: [
        {
          label: 'Bitrix24 JsSdk',
          to: 'https://bitrix24.github.io/b24jssdk/',
          target: '_blank'
        },
        {
          label: 'Bitrix24 Icons',
          to: 'https://bitrix24.github.io/b24icons/',
          target: '_blank'
        },
        {
          label: 'Bitrix24 UI',
          to: 'https://bitrix24.github.io/b24ui/',
          target: '_blank'
        }
      ]
    }
  ]

  const props = { columns }

  it.each([
    // Props
    ['with columns', { props }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'px-10' } }],
    ['with b24ui', { props: { ...props, b24ui: { list: 'lg:gap-1.5' } } }],
    // Slots
    ['with left slot', { props, slots: { left: () => 'Left slot' } }],
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with right slot', { props, slots: { right: () => 'Right slot' } }],
    ['with column-label slot', { props, slots: { 'column-label': () => 'Column label slot' } }],
    ['with link slot', { props, slots: { link: () => 'Link slot' } }],
    ['with link-leading slot', { props, slots: { 'link-leading': () => 'Link leading slot' } }],
    ['with link-label slot', { props, slots: { 'link-label': () => 'Link label slot' } }],
    ['with link-trailing slot', { props, slots: { 'link-trailing': () => 'Link trailing slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: FooterColumnsProps, slots?: Partial<FooterColumnsSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, FooterColumns)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(FooterColumns, {
      props
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
