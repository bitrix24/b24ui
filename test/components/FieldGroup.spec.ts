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
      slots: {
        default: {
          template: `<B24Input /> <B24Button> Click me! </B24Button>`
        }
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
