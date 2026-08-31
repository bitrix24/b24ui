import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import Navbar from '../../src/runtime/components/Navbar.vue'
import NavbarDivider from '../../src/runtime/components/NavbarDivider.vue'
import NavbarSection from '../../src/runtime/components/NavbarSection.vue'
import NavbarSpacer from '../../src/runtime/components/NavbarSpacer.vue'

describe('Navbar', () => {
  renderEach(Navbar, [
    // Props
    ['with default', {}],
    ['with as', { props: { as: 'header' } }],
    ['with class', { props: { class: 'border-b' } }],
    ['with b24ui', { props: { b24ui: { root: 'px-8' } } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])

  // Read through `[data-slot="root"]` rather than `wrapper.element`: the
  // template opens with an HTML comment, which makes the render a fragment, and
  // Vue Test Utils then hands back its own wrapping element instead of the
  // component's root.
  const root = (wrapper: { find: (s: string) => { element: Element } }) => wrapper.find('[data-slot="root"]').element

  it('renders as a nav element by default', async () => {
    // The one place a Navbar part is not interchangeable with the others: this
    // is the landmark, so the default element carries meaning rather than
    // being a styling choice.
    const wrapper = await mountSuspended(Navbar)

    expect(root(wrapper).tagName).toBe('NAV')
  })

  it('composes with its parts', async () => {
    const wrapper = await mountSuspended(Navbar, {
      global: { components: { NavbarSection, NavbarSpacer, NavbarDivider } },
      slots: {
        default: `
          <NavbarSection>Left</NavbarSection>
          <NavbarSpacer />
          <NavbarDivider />
          <NavbarSection>Right</NavbarSection>
        `
      }
    })

    expect(root(wrapper).tagName).toBe('NAV')
    expect(wrapper.text()).toContain('Left')
    expect(wrapper.text()).toContain('Right')
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Navbar, {
      slots: { default: () => 'Navigation' }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})

/**
 * The three wrappers a `Navbar` is assembled from. Each is a `Primitive` with a
 * theme slot, an `as`, a `class` and a `b24ui`, and nothing mounted any of them
 * before this spec.
 */
describe.each([
  ['NavbarDivider', NavbarDivider],
  ['NavbarSection', NavbarSection],
  ['NavbarSpacer', NavbarSpacer]
])('%s', (_name, component) => {
  it('honours `as` and merges `class`', async () => {
    const wrapper = await mountSuspended(component as any, {
      props: { as: 'span', class: 'ring-1' }
    })
    const root = wrapper.find('[data-slot="root"]')

    expect(root.element.tagName).toBe('SPAN')
    expect(root.classes()).toContain('ring-1')
  })
})
