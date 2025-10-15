import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Accordion from '../../src/runtime/components/Accordion.vue'
import type { AccordionProps, AccordionSlots } from '../../src/runtime/components/Accordion.vue'
import ComponentRender from '../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('Accordion', () => {
  const items = [{
    label: 'Getting Started',
    icon: SignIcon,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
  }, {
    label: 'Installation',
    icon: SignIcon,
    disabled: true,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
  }, {
    label: 'Theming',
    icon: SignIcon,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
  }, {
    label: 'Layouts',
    icon: SignIcon,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
  }, {
    label: 'Components',
    icon: SignIcon,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
  }, {
    label: 'Utilities',
    icon: SignIcon,
    trailingIcon: Cross30Icon,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
    slot: 'custom' as const
  }]

  const props = { items }

  it.each([
    // Props
    ['with items', { props }],
    ['with modelValue', { props: { ...props, modelValue: '1' } }],
    ['with defaultValue', { props: { ...props, defaultValue: '1' } }],
    ['with labelKey', { props: { ...props, labelKey: 'icon' } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with type', { props: { ...props, type: 'multiple' as const } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with collapsible', { props: { ...props, collapsible: false } }],
    ['with unmountOnHide', { props: { ...props, unmountOnHide: false } }],
    ['with trailingIcon', { props: { ...props, trailingIcon: Cross30Icon } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'w-48' } }],
    ['with b24ui', { props: { ...props, b24ui: { item: 'font-(--ui-font-weight-bold)' } } }],
    // Slots
    ['with leading slot', { props: { ...props, modelValue: '1' }, slots: { leading: () => 'Leading slot' } }],
    ['with default slot', { props: { ...props, modelValue: '1' }, slots: { default: () => 'Default slot' } }],
    ['with trailing slot', { props: { ...props, modelValue: '1' }, slots: { trailing: () => 'Trailing slot' } }],
    ['with content slot', { props: { ...props, modelValue: '1' }, slots: { content: () => 'Content slot' } }],
    ['with body slot', { props: { ...props, modelValue: '1' }, slots: { body: () => 'Body slot' } }],
    ['with custom slot', { props: { ...props, modelValue: '5' }, slots: { custom: () => 'Custom slot' } }],
    ['with custom body slot', { props: { ...props, modelValue: '5' }, slots: { 'custom-body': () => 'Custom body slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: AccordionProps, slots?: Partial<AccordionSlots & { custom: () => 'Custom slot' } & { 'custom-body': () => 'Custom body slot' }> }) => {
    const html = await ComponentRender(nameOrHtml, options, Accordion)
    expect(html).toMatchSnapshot()
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Accordion, {
      props: { items, modelValue: '1' }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
