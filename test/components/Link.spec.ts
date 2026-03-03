import { describe, it, expect } from 'vitest'
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
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])

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
