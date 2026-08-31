import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import SidebarLayout from '../../src/runtime/components/SidebarLayout.vue'
import SidebarBody from '../../src/runtime/components/SidebarBody.vue'
import SidebarFooter from '../../src/runtime/components/SidebarFooter.vue'
import SidebarHeader from '../../src/runtime/components/SidebarHeader.vue'
import SidebarHeading from '../../src/runtime/components/SidebarHeading.vue'
import SidebarSection from '../../src/runtime/components/SidebarSection.vue'
import SidebarSpacer from '../../src/runtime/components/SidebarSpacer.vue'

/**
 * `SidebarLayout` calls `useRoute()` to close its mobile sidebar on navigation.
 *
 * Only `useRoute` is replaced, and only here. Installing a router instead does
 * not work across both projects: the `nuxt` one has none, so `useRoute()` warns
 * about a missing injection on every mount, while the `vue` one's mount shim
 * already installs one and a second plugin re-registers `RouterLink` — each
 * project fails the console gate on the other's fix.
 */
vi.mock('vue-router', async importOriginal => ({
  ...(await importOriginal<typeof import('vue-router')>()),
  useRoute: () => ({ path: '/' })
}))

describe('SidebarLayout', () => {
  renderEach(SidebarLayout, [
    // Props
    ['with default', { slots: { default: () => 'Content' } }],
    ['without lightContent', { props: { useLightContent: false }, slots: { default: () => 'Content' } }],
    ['with isInner', { props: { isInner: true }, slots: { default: () => 'Content' } }],
    // No case for `offContentScrollbar`: the prop currently changes nothing.
    // Both branches of its variant in `src/theme/sidebar-layout.ts` are empty
    // strings, and the one compound that reads it — `inner: true,
    // offContentScrollbar: false` — has its whole `class` block commented out.
    // A case for it would be byte-identical to `with isInner` and would read as
    // coverage of a prop that does not work.
    ['with as', { props: { as: 'main' } }],
    ['with class', { props: { class: 'h-dvh' } }],
    ['with b24ui', { props: { b24ui: { root: 'bg-white' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with navbar slot', { slots: { navbar: () => 'Navbar slot' } }],
    ['with content-top slot', { slots: { 'content-top': () => 'Top slot' } }],
    ['with content-bottom slot', { slots: { 'content-bottom': () => 'Bottom slot' } }]
  ])

  it('reflects its loading state in data-state', async () => {
    // Was written as a plain attribute rather than a binding, so every layout
    // rendered the literal string `isLoading ? 'loading' : 'show'` into the DOM.
    const wrapper = await mountSuspended(SidebarLayout)

    expect(wrapper.find('[data-slot="root"]').attributes('data-state')).toBe('show')
  })

  it('renders the sidebar region only when the slot is given', async () => {
    const without = await mountSuspended(SidebarLayout)
    const withSidebar = await mountSuspended(SidebarLayout, {
      slots: { sidebar: () => 'Sidebar slot' } })

    expect(without.text()).not.toContain('Sidebar slot')
    expect(withSidebar.text()).toContain('Sidebar slot')
  })

  it('renders the right-hand region only when the slot is given', async () => {
    const without = await mountSuspended(SidebarLayout)
    const withRight = await mountSuspended(SidebarLayout, {
      slots: { 'content-right': () => 'Right slot' } })

    expect(without.text()).not.toContain('Right slot')
    expect(withRight.text()).toContain('Right slot')
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(SidebarLayout, {
      slots: { default: () => 'Content' } })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})

/**
 * The six wrappers `SidebarLayout` is built from. Each is a `Primitive` with a
 * theme slot, an `as`, a `class` and a `b24ui` — thin enough that the contract
 * is the whole of it, and nothing mounted any of them before.
 */
describe.each([
  ['SidebarBody', SidebarBody],
  ['SidebarFooter', SidebarFooter],
  ['SidebarHeader', SidebarHeader],
  ['SidebarHeading', SidebarHeading],
  ['SidebarSection', SidebarSection],
  ['SidebarSpacer', SidebarSpacer]
])('%s', (_name, component) => {
  it('renders its slot, honours `as`, and merges `class`', async () => {
    const wrapper = await mountSuspended(component as any, {
      props: { as: 'section', class: 'ring-1' },
      slots: { default: () => 'Slot content' }
    })
    // Through `[data-slot="root"]`: a template that opens with a comment
    // renders as a fragment, and `wrapper.element` is then Vue Test Utils' own
    // wrapper rather than the component's root.
    const root = wrapper.find('[data-slot="root"]')

    expect(root.element.tagName).toBe('SECTION')
    expect(root.classes()).toContain('ring-1')
    expect(wrapper.text()).toContain('Slot content')
  })
})
