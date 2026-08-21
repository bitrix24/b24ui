import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import type { ProgressGroupItem } from '../../src/runtime/components/ProgressGroup.vue'
import ProgressGroup from '../../src/runtime/components/ProgressGroup.vue'
import theme from '#build/b24ui/progress-group'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import AppsIcon from '@bitrix24/b24icons-vue/outline/AppsIcon'

describe('ProgressGroup', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const orientations = Object.keys(theme.variants.orientation) as any

  const items: ProgressGroupItem[] = [
    { label: 'System', value: 24, color: 'air-secondary', icon: SettingsIcon },
    { label: 'Apps', value: 8, color: 'air-primary-alert', icon: AppsIcon },
    { label: 'Documents', value: 12, color: 'air-primary-warning' },
    { label: 'Multimedia', value: 42, color: 'air-primary-success' }
  ]

  const props = { items, max: 128 }

  renderEach(ProgressGroup, [
    // Props
    ['with items', { props: { items } }],
    ['without items', { props: {} }],
    ['with max', { props }],
    ['with invalid max', { props: { items, max: 0 } }],
    ['with status', { props: { ...props, status: true } }],
    ['with values above max', { props: { items: [{ label: 'System', value: 96 }, { label: 'Apps', value: 64 }], max: 128, status: true } }],
    ['with value out of bounds', { props: { items: [{ label: 'System', value: -8 }, { label: 'Apps', value: 512 }], max: 128 } }],
    ['without labels', { props: { items: [{ value: 24 }, { value: 8 }], max: 128 } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size, status: true } }]),
    ...orientations.map((orientation: string) => [`with orientation ${orientation}`, { props: { ...props, orientation, status: true } }]),
    ['with color', { props: { items: [{ label: 'System', value: 24 }, { label: 'Apps', value: 8 }], max: 128, color: 'air-secondary' } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'w-48' } }],
    ['with b24ui', { props: { ...props, b24ui: { base: 'bg-(--ui-color-base-3)' } } }],
    ['with item b24ui', { props: { items: [{ label: 'System', value: 24, b24ui: { itemLabel: 'font-bold' } }], max: 128 } }],
    ['with item class', { props: { items: [{ label: 'System', value: 24, class: 'font-bold' }], max: 128 } }],
    ['with item slot', { props: { items: [{ label: 'System', value: 24, slot: 'custom' }], max: 128 }, slots: { custom: () => 'Custom slot' } }],
    // Slots
    ['with status slot', { props: { ...props, status: true }, slots: { status: () => 'Status slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Label slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Trailing slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(ProgressGroup, {
      props: {
        items,
        max: 128,
        status: true
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
