import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import Stepper from '../../src/runtime/components/Stepper.vue'
import theme from '#build/b24ui/stepper'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('Stepper', () => {
  const sizes = Object.keys(theme.variants.size) as any

  const items = [
    {
      title: 'Address',
      description: 'Add your address here',
      icon: SignIcon
    }, {
      title: 'Shipping',
      description: 'Set your preferred shipping method',
      icon: Cross30Icon
    }, {
      slot: 'custom',
      title: 'Checkout',
      description: 'Confirm your order'
    }
  ]

  const props = { items }

  renderEach(Stepper, [
    // Props
    ['with items', { props }],
    ['with defaultValue', { props: { ...props, defaultValue: 1 } }],
    ['with modelValue', { props: { ...props, modelValue: 1 } }],
    // 'Shipping', not 'Address'. Address is index 0 and already active, so the
    // case rendered whatever the default renders and proved nothing about
    // `valueKey` (#454). Upstream's spec has the same value, so this is
    // inherited rather than a porting slip.
    ['with valueKey', { props: { ...props, valueKey: 'title', defaultValue: 'Shipping' } }],
    ['with air-primary color', { props: { ...props, color: 'air-primary' } }],
    ...sizes.map((size: string) => [`with size ${size} horizontal`, { props: { ...props, size } }]),
    ...sizes.map((size: string) => [`with size ${size} vertical`, { props: { ...props, size, orientation: 'vertical' } }]),
    ['without linear', { props: { ...props, linear: false } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'gap-8' } }],
    ['with b24ui', { props: { ...props, b24ui: { title: 'font-bold' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with indicator slot', { props, slots: { indicator: () => 'Indicator slot' } }],
    ['with wrapper slot', { props, slots: { wrapper: () => 'Wrapper slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with custom slot', { props: { ...props, defaultValue: 2 }, slots: { custom: () => 'Custom slot' } }],
    ['with custom-wrapper slot', { props, slots: { 'custom-wrapper': () => 'Custom wrapper slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Stepper, {
      props: {
        items,
        modelValue: 1
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('resolving the active step', () => {
    // `set()` writes the model back through `valueKey`, so reading it back only
    // for strings made the round trip lossy: a numeric `items[].value` was
    // written out and then read as a position.
    const numeric = [
      { title: 'First', value: 10 },
      { title: 'Second', value: 20 },
      { title: 'Third', value: 30 }
    ]

    async function activeTitle(props: Record<string, unknown>) {
      const wrapper = await mountSuspended(Stepper, { props: props as any })
      return wrapper.element.querySelector('[data-state="active"]')?.textContent?.trim()
    }

    it('matches a numeric value against valueKey', async () => {
      expect(await activeTitle({ items: numeric, modelValue: 20 })).toContain('Second')
    })

    it('matches a numeric defaultValue against valueKey', async () => {
      expect(await activeTitle({ items: numeric, defaultValue: 30 })).toContain('Third')
    })

    it('falls back to a positional index when no item carries the value', async () => {
      expect(await activeTitle({ items, modelValue: 1 })).toContain('Shipping')
    })

    it('still matches strings against valueKey', async () => {
      const named = [{ title: 'A', value: 'a' }, { title: 'B', value: 'b' }]
      expect(await activeTitle({ items: named, modelValue: 'b' })).toContain('B')
    })

    it('activates nothing when a string matches no item', async () => {
      const named = [{ title: 'A', value: 'a' }, { title: 'B', value: 'b' }]
      expect(await activeTitle({ items: named, modelValue: 'zzz' })).toBeUndefined()
    })

    it('keeps a number positional when the item in that slot has no value', async () => {
      // The shape set() produces for value-less items: without the positional
      // slot rule, Intro's `value: 1` would capture the write-back and clicks
      // past it could never advance.
      const mixed = [{ title: 'Intro', value: 1 }, { title: 'Details' }, { title: 'Done' }]
      expect(await activeTitle({ items: mixed, modelValue: 1 })).toContain('Details')
    })

    it('clicking a step activates that step, not a value collision', async () => {
      // set() writes the index for value-less items; the positional-slot rule
      // is what keeps that write from being captured by Three's `value: 1`.
      const items = [{ title: 'One' }, { title: 'Two' }, { title: 'Three', value: 1 }]
      const wrapper = await mountSuspended(Stepper, { props: { items, linear: false } as any })

      await wrapper.findAll('[data-slot="trigger"]')[1]!.trigger('mousedown')
      await nextTick()

      expect(wrapper.element.querySelector('[data-state="active"]')?.textContent?.trim()).toContain('Two')
    })
  })
})
