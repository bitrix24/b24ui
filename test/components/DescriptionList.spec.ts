import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DescriptionList from '../../src/runtime/components/DescriptionList.vue'
import { renderEach } from '../component-render'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

describe('DescriptionList', () => {
  // Test data factory
  const createItem = (overrides = {}) => ({
    label: 'Test Item',
    description: 'Test Description',
    ...overrides
  })

  const baseItems = [
    {
      label: 'Item 1',
      avatar: { src: 'https://github.com/bitrix24.png' },
      description: 'This is the content shown for Item 1'
    },
    {
      label: 'Item 2',
      icon: SignIcon,
      description: 'And, this is the content for Item 2'
    },
    {
      label: 'Action vertical',
      icon: SignIcon,
      description: 'And, this is the content for Action vertical',
      orientation: 'vertical' as const,
      actions: [{ label: 'Action' }]
    },
    {
      label: 'Action horizontal',
      icon: SignIcon,
      description: 'And, this is the content for Action horizontal',
      orientation: 'horizontal' as const,
      actions: [{ label: 'Action' }]
    },
    {
      label: 'Item 3',
      icon: SignIcon,
      description: 'Finally, this is the content for Item3',
      slot: 'custom'
    }
  ]

  renderEach(DescriptionList, [
    // Basic props
    ['with as', { props: { items: baseItems, as: 'section' } }],
    ['with items', { props: { items: baseItems } }],
    ['with class', { props: { items: baseItems, class: 'custom-class' } }],
    ['with b24ui', { props: { items: baseItems, b24ui: { text: 'font-(--ui-font-weight-bold)' } } }],
    ['with empty items', { props: { items: [] } }],
    // Custom keys
    ['with labelKey and descriptionKey', {
      props: {
        items: [{ name: 'Item 1', desc: 'Description 1' }],
        labelKey: 'name',
        descriptionKey: 'desc'
      }
    }],
    // Individual properties
    ['with icon only', { props: { items: [createItem({ icon: SignIcon, description: undefined })] } }],
    ['with avatar only', { props: { items: [createItem({ avatar: { src: 'https://github.com/bitrix24.png' }, description: undefined })] } }],
    // Actions
    ['with single action', { props: { items: [createItem({ actions: [{ label: 'Action' }] })] } }],
    ['with multiple actions', { props: { items: [createItem({ actions: [{ label: 'Action 1' }, { label: 'Action 2' }] })] } }],
    // Orientation
    ['with orientation horizontal', { props: { items: [createItem({ orientation: 'horizontal' as const })] } }],
    ['with orientation vertical', { props: { items: [createItem({ orientation: 'vertical' as const })] } }],
    // Slots
    ['with slot property', { props: { items: [{ label: 'Item', slot: 'custom' }] }, slots: { custom: () => 'Custom slot content' } }],
    // Item-specific properties
    ['with item class', { props: { items: [createItem({ class: 'font-bold' })] } }],
    ['with item b24ui', { props: { items: [createItem({ b24ui: { label: 'text-red-500' } })] } }],
    // Legend and text
    ['with legend', { props: { items: baseItems, legend: 'My Legend' } }],
    ['with text', { props: { items: baseItems, text: 'Some descriptive text' } }],
    ['with legend and text', { props: { legend: 'Legend', text: 'Text', items: baseItems } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot content' } }],
    ['with custom slot', { props: { items: baseItems }, slots: { custom: () => 'Custom slot' } }]
  ])

  describe('accessibility', () => {
    it('passes accessibility tests with basic items', async () => {
      const wrapper = await mountSuspended(DescriptionList, {
        props: {
          items: [
            {
              label: 'Accessible Item',
              description: 'This is a description for accessibility test',
              icon: SignIcon
            }
          ]
        }
      })

      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('passes accessibility tests with avatar', async () => {
      const wrapper = await mountSuspended(DescriptionList, {
        props: {
          items: [
            {
              label: 'Item with Avatar',
              description: 'Description',
              avatar: { src: 'https://github.com/bitrix24.png', alt: 'Test Avatar' }
            }
          ]
        }
      })

      expect(await axe(wrapper.element)).toHaveNoViolations()
    })

    it('passes accessibility tests with actions', async () => {
      const wrapper = await mountSuspended(DescriptionList, {
        props: {
          items: [
            {
              label: 'Item with Actions',
              description: 'Description',
              actions: [{ label: 'Primary Action' }, { label: 'Secondary Action' }]
            }
          ]
        }
      })

      expect(await axe(wrapper.element)).toHaveNoViolations()
    })
  })

  describe('edge cases', () => {
    it('renders with missing optional description', async () => {
      const wrapper = await mountSuspended(DescriptionList, {
        props: {
          items: [{ label: 'Item without description' }]
        }
      })

      expect(wrapper.vm).toBeTruthy()
    })

    it('renders with very long labels and descriptions', async () => {
      const wrapper = await mountSuspended(DescriptionList, {
        props: {
          items: [
            {
              label: 'A'.repeat(100),
              description: 'B'.repeat(200)
            }
          ]
        }
      })

      expect(wrapper.vm).toBeTruthy()
    })

    it('renders with special characters in labels', async () => {
      const wrapper = await mountSuspended(DescriptionList, {
        props: {
          items: [
            {
              label: 'Item <>&"\'',
              description: 'Description <>&"\''
            }
          ]
        }
      })

      expect(wrapper.vm).toBeTruthy()
    })
  })
})
