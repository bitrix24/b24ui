import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Separator from '../../src/runtime/components/Separator.vue'
import type { SeparatorProps, SeparatorSlots } from '../../src/runtime/components/Separator.vue'
import ComponentRender from '../component-render'
import theme from '#build/b24ui/separator'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

describe('Separator', () => {
  const types = Object.keys(theme.variants.type) as any
  const sizes = Object.keys(theme.variants.size) as any

  it.each([
    // Props
    ['with label', { props: { label: '+1' } }],
    ['with icon', { props: { icon: Search2Icon } }],
    ['with avatar', { props: { avatar: { src: 'https://github.com/bitrix24.png' } } }],
    ['with orientation vertical', { props: { orientation: 'vertical' as const } }],
    ['with decorative', { props: { decorative: true } }],
    ...types.map((type: string) => [`with type ${type}`, { props: { type } }]),
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with color success', { props: { color: 'air-primary-success' } }],
    ['with as', { props: { as: 'span' } }],
    ['with class', { props: { class: 'flex-row-reverse' } }],
    ['with b24ui', { props: { b24ui: { label: 'text-(length:--ui-font-size-lg)' } } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: SeparatorProps, slots?: Partial<SeparatorSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Separator)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Separator, {
      props: {
        label: '+1',
        icon: Search2Icon
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
