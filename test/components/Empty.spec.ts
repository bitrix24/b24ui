import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Empty from '../../src/runtime/components/Empty.vue'
import { renderEach } from '../component-render'
import theme from '#build/b24ui/empty'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

/**
 * Restored from `2e9e78a0`, which deleted it as the only spec removed by a
 * commit about slot return types — leaving `Empty.vue` shipping with no
 * coverage in either project and its snapshots orphaned in the tree. Carried
 * forward to `renderEach` and extended with the `loading` prop the component
 * grew in the meantime.
 */
describe('Empty', () => {
  const colors = Object.keys(theme.variants.color) as any
  const sizes = Object.keys(theme.variants.size) as any

  const props = {
    icon: SignIcon,
    title: 'Title',
    description: 'Description',
    actions: [{ icon: Cross30Icon, label: 'Add' }]
  }

  renderEach(Empty, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with icon', { props: { icon: SignIcon } }],
    // No `with avatar` case. Upstream's Empty carries `avatar?: AvatarProps`
    // and renders it through `UAvatar`; this fork's does not, by a divergence
    // recorded in the ledger entry for `86cd25c5` — "b24ui's `Empty` diverges
    // … no `avatar`". The case that used to sit here passed the prop anyway,
    // so it fell through to the root element and the snapshot pinned
    // `avatar="[object Object]"` as expected output (#454).
    ['with title', { props: { icon: SignIcon, title: 'Title' } }],
    ['with description', { props: { icon: SignIcon, title: 'Title', description: 'Description' } }],
    ['with actions', { props: { icon: SignIcon, title: 'Title', description: 'Description', actions: [{ icon: Cross30Icon, label: 'Add' }] } }],
    ['with loading', { props: { ...props, loading: true } }],
    ['with loadingIcon', { props: { ...props, loading: true, loadingIcon: Cross30Icon } }],
    ...colors.map((color: string) => [`with primary color ${color}`, { props: { ...props, color } }]),
    ...colors.map((color: string) => [`with inverted primary color ${color}`, { props: { ...props, inverted: true, color } }]),
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ['with class', { props: { ...props, class: 'gap-6' } }],
    ['with b24ui', { props: { ...props, b24ui: { title: 'text-lg' } } }],
    // Slots
    ['with header slot', { props, slots: { header: () => 'Header slot' } }],
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with body slot', { props, slots: { body: () => 'Body slot' } }],
    ['with actions slot', { props, slots: { actions: () => 'Actions slot' } }],
    ['with footer slot', { props, slots: { footer: () => 'Footer slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Empty, {
      props
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
