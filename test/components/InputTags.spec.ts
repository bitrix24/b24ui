import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import InputTags from '../../src/runtime/components/InputTags.vue'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import theme from '#build/b24ui/input'

describe('InputTags', () => {
  const sizes = Object.keys(theme.variants.size) as any

  renderEach(InputTags, [
    // Props
    ['with modelValue', { props: { modelValue: ['test'] } }],
    ['with defaultValue', { props: { defaultValue: ['test'] } }],
    ['with id', { props: { id: 'id' } }],
    ['with name', { props: { name: 'name' } }],
    ['with placeholder', { props: { placeholder: 'Search...' } }],
    ['with disabled', { props: { disabled: true } }],
    ['with required', { props: { required: true } }],
    ['with icon', { props: { icon: Search2Icon } }],
    ['with trailingIcon', { props: { trailingIcon: Search2Icon } }],
    ['with loading', { props: { loading: true } }],
    ['with ariaLabel', { attrs: { 'aria-label': 'Aria label' } }],
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: '' } }],
    ['with b24ui', { props: { b24ui: {} } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    // Slots
    ['with leading slot', { slots: { leading: () => 'Leading slot' } }],
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with trailing slot', { slots: { trailing: () => 'Trailing slot' } }],
    ['with item-text slot', { slots: { ['item-text']: () => 'Item Text slot' } }],
    ['with item-delete slot', { slots: { ['item-delete']: () => 'Item Delete slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(InputTags, {
      props: {
        modelValue: ['tag1', 'tag2'],
        placeholder: 'Add tags...',
        required: true,
        icon: Search2Icon
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
