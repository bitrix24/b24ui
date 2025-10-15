import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import FieldGroup from '../../src/runtime/components/FieldGroup.vue'
import type { FieldGroupProps, FieldGroupSlots } from '../../src/runtime/components/FieldGroup.vue'
import ComponentRender from '../component-render'
import buttonTheme from '#build/b24ui/button'
import { B24Input, B24Button } from '#components'

describe('FieldGroup', () => {
  const sizes = Object.keys(buttonTheme.variants.size) as any

  it.each([
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
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: FieldGroupProps, slots?: Partial<FieldGroupSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, FieldGroup)
    expect(html).toMatchSnapshot()
  })

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
