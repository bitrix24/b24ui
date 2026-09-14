import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import FieldGroup from '../../src/runtime/components/FieldGroup.vue'
import buttonTheme from '#build/b24ui/button'
import { B24Input, B24Button } from '#components'

describe('FieldGroup', () => {
  const sizes = Object.keys(buttonTheme.variants.size) as any

  renderEach(FieldGroup, [
    // Props
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: 'absolute' } }],
    // Slots
    ['with default slot', {
      slots: {
        default: {
          components: { B24Input, B24Button },
          template: `<B24Input /> <B24Button> Click me! </B24Button>`
        }
      }
    }],
    ['orientation vertical with default slot', {
      props: { orientation: 'vertical' },
      slots: {
        default: {
          components: { B24Input, B24Button },
          template: `<B24Input /> <B24Button> Click me! </B24Button>`
        }
      }
    }],
    ...sizes.map((size: string) =>
      [`with size ${size}`, {
        props: { size },
        slots: {
          default: {
            components: { B24Input, B24Button },
            template: `<B24Input /> <B24Button> Click me! </B24Button>`
          }
        }
      }]
    )
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(FieldGroup, {
      // Registered globally for this mount. The inline template below is
      // compiled at runtime with no access to this file's imports, so without
      // a registration neither name resolves: the group rendered
      // `<b24input></b24input>` and `<b24button></b24button>`, unknown elements
      // with nothing inside them, and axe reported zero violations over that.
      // The vacuous shape #454 is about (#87). The `renderEach` cases above
      // pass their own `components` and were fine.
      global: { components: { B24Input, B24Button } },
      slots: {
        // The input needs an accessible name that the markup cases do not:
        // they compare HTML, this one runs axe, and a bare input has none.
        // `Input`'s own axe case gives it a `placeholder` for the same reason.
        default: { template: `<B24Input aria-label="Search" /> <B24Button> Click me! </B24Button>` }
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
