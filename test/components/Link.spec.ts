import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import { B24Link as Link } from '#components'

describe('Link', () => {
  renderEach(Link, [
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with to', { props: { to: '/' } }],
    ['with type', { props: { type: 'submit' } }],
    ['with disabled', { props: { disabled: true } }],
    ['with activeClass', { props: { active: true, activeClass: 'text-base-900' } }],
    ['with inactiveClass', { props: { active: false, inactiveClass: 'hover:text-(--ui-color-accent-main-success)' } }],
    ['with raw', { props: { raw: true } }],
    ['with raw activeClass', { props: { raw: true, active: true, activeClass: 'text-(--ui-color-accent-main-success)' } }],
    ['with raw inactiveClass', { props: { raw: true, active: false, inactiveClass: 'hover:text-base-500' } }],
    ['with class', { props: { class: 'font-(--ui-font-weight-medium)' } }],
    ['with external to', { props: { to: 'https://example.com' } }],
    ['with external to and target', { props: { to: 'https://example.com', target: '_blank' } }],
    ['with internal to and target', { props: { to: '/about', target: '_blank' } }],
    ['with internal to object and target', { props: { to: { path: '/about' }, target: '_blank' } }],
    ['with internal to and rel', { props: { to: '/about', rel: 'nofollow' } }],
    ['with internal to and noRel', { props: { to: '/about', rel: 'nofollow', noRel: true } }],
    ['with external to and rel', { props: { to: 'https://example.com', rel: 'nofollow' } }],
    ['with external prop', { props: { to: '/api/download', external: true } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])

  it('does not forward its own styling props to NuxtLink', async () => {
    // `nuxtLinkProps` omits everything that belongs to this component before
    // handing the rest to `NuxtLink`, and a prop missing from that list is
    // forwarded to a component that does not declare it. `RouterLink` renders
    // a fragment, so Vue cannot place the stray attribute and warns instead of
    // failing — which is why `isAction` did this 2825 times across the suite
    // before anybody noticed (#87).
    //
    // Asserted on the warning rather than on the DOM: the attribute never
    // reaches the DOM in either case, so a markup assertion would pass just as
    // happily with the bug present.
    // `custom` is what makes it observable, and it took measuring to find that
    // out: with `custom` this renders a fragment, so Vue cannot place the stray
    // attribute and warns. Without it the single root element absorbs the
    // attribute quietly. The value of `isAction` is irrelevant — the default
    // `false` is forwarded just as eagerly, which is why the warning fires on
    // components that never set it. `Breadcrumb` mounts `B24Link` exactly this
    // way and produced 28 of them.
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    try {
      await mountSuspended(Link, {
        props: { to: '/', custom: true },
        slots: { default: () => 'Home' }
      })

      const extraneous = warn.mock.calls
        .map(call => String(call[0]))
        .filter(message => message.includes('Extraneous non-props attributes'))

      expect(extraneous).toEqual([])
    } finally {
      warn.mockRestore()
    }
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Link, {
      props: {
        to: '/'
      },
      slots: {
        default: () => 'Home'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
