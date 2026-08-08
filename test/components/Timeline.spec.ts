import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import Timeline from '../../src/runtime/components/Timeline.vue'
import theme from '#build/b24ui/timeline'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('Timeline', () => {
  const sizes = Object.keys(theme.variants.size) as any

  const items = [{
    date: 'Mar 15, 2025',
    title: 'Project Kickoff',
    description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
    icon: SignIcon,
    value: 'kickoff'
  }, {
    date: 'Mar 22, 2025',
    title: 'Design Phase',
    description: 'User research and design workshops. Created wireframes and prototypes for user testing',
    icon: Cross30Icon,
    value: 'design'
  }, {
    slot: 'custom',
    date: 'Mar 29, 2025',
    title: 'Development Sprint',
    description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
    icon: SignIcon,
    value: 'development'
  }, {
    date: 'Apr 5, 2025',
    title: 'Testing & Deployment',
    description: 'QA testing and performance optimization. Deployed the application to production.',
    icon: Cross30Icon,
    value: 'testing-and-deployment'
  }]

  const props = { items }

  renderEach(Timeline, [
    // Props
    ['with items', { props }],
    ['with modelValue', { props: { ...props, modelValue: 'design' } }],
    ['with defaultValue', { props: { ...props, defaultValue: 'design' } }],
    ['with valueKey', { props: { ...props, valueKey: 'title', defaultValue: 'Design Phase' } }],
    ['with air-primary color', { props: { ...props, color: 'air-primary' } }],
    ...sizes.map((size: string) => [`with size ${size} horizontal`, { props: { ...props, size } }]),
    ...sizes.map((size: string) => [`with size ${size} vertical`, { props: { ...props, size, orientation: 'vertical' } }]),
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'gap-8' } }],
    ['with b24ui', { props: { ...props, b24ui: { title: 'font-bold' } } }],
    ['with reverse', { props: { ...props, reverse: true } }],
    ['with reverse and modelValue', { props: { ...props, reverse: true, modelValue: 'design' } }],
    ['with reverse and defaultValue', { props: { ...props, reverse: true, defaultValue: 'design' } }],
    // Slots
    ['with indicator slot', { props, slots: { indicator: () => 'Indicator slot' } }],
    ['with wrapper slot', { props, slots: { wrapper: () => 'Wrapper slot' } }],
    ['with date slot', { props, slots: { date: () => 'Date slot' } }],
    ['with title slot', { props, slots: { title: () => 'Title slot' } }],
    ['with description slot', { props, slots: { description: () => 'Description slot' } }],
    ['with custom-wrapper slot', { props, slots: { 'custom-wrapper': () => 'Custom wrapper slot' } }]
  ])

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Timeline, {
      props: {
        items,
        modelValue: 'design'
      }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('resolving the active item', () => {
    // `items[].value` and `defaultValue` are both typed `string | number`, so a
    // numeric value has to be matched through `valueKey` like a string one.
    // Matching used to run for strings only, which sent numbers straight to the
    // positional branch and left numeric item values unreachable.
    const numeric = [
      { title: 'First', value: 10 },
      { title: 'Second', value: 20 },
      { title: 'Third', value: 30 }
    ]

    async function activeTitle(props: Record<string, unknown>) {
      const wrapper = await mountSuspended(Timeline, { props: props as any })
      return wrapper.element.querySelector('[data-state="active"]')?.textContent?.trim()
    }

    it('matches a numeric value against valueKey', async () => {
      expect(await activeTitle({ items: numeric, modelValue: 20 })).toBe('Second')
    })

    it('matches a numeric defaultValue against valueKey', async () => {
      expect(await activeTitle({ items: numeric, defaultValue: 30 })).toBe('Third')
    })

    it('matches a numeric value through a custom valueKey', async () => {
      const items = [{ title: 'A', step: 1 }, { title: 'B', step: 2 }]
      expect(await activeTitle({ items, valueKey: 'step', modelValue: 2 })).toBe('B')
    })

    it('falls back to a positional index when no item carries the value', async () => {
      // Items without a `value` field — the shape most of the docs examples use.
      const plain = [{ title: 'First' }, { title: 'Second' }, { title: 'Third' }]
      expect(await activeTitle({ items: plain, modelValue: 1 })).toBe('Second')
    })

    it('still matches strings against valueKey', async () => {
      expect(await activeTitle({ items, modelValue: 'design' })).toContain('Design Phase')
    })

    it('activates nothing when a string matches no item', async () => {
      expect(await activeTitle({ items, modelValue: 'nope' })).toBeUndefined()
    })

    it('keeps a number positional when the item in that slot has no value', async () => {
      // Mixed arrays: the slot the number points at opted out of values, so
      // C's `value: 1` must not capture it.
      const mixed = [{ title: 'A' }, { title: 'B' }, { title: 'C', value: 1 }]
      expect(await activeTitle({ items: mixed, modelValue: 1 })).toBe('B')
    })

    it('activates nothing for an out-of-range number', async () => {
      const plain = [{ title: 'First' }, { title: 'Second' }, { title: 'Third' }]
      expect(await activeTitle({ items: plain, modelValue: 5 })).toBeUndefined()
      expect(await activeTitle({ items: plain, reverse: true, modelValue: 5 })).toBeUndefined()
    })

    it('does not reverse-flip an index that matched valueKey directly', async () => {
      expect(await activeTitle({ items: numeric, reverse: true, modelValue: 20 })).toBe('Second')
    })

    it('applies the reverse flip only to the positional fallback', async () => {
      const plain = [{ title: 'First' }, { title: 'Second' }, { title: 'Third' }]
      expect(await activeTitle({ items: plain, reverse: true, modelValue: 0 })).toBe('Third')
    })

    it('matches a zero value against valueKey, not just truthy ones', async () => {
      // Zero deliberately sits away from position 0, so a positional read
      // cannot masquerade as a match.
      const withZero = [{ title: 'A', value: 10 }, { title: 'Zero', value: 0 }, { title: 'C', value: 30 }]
      expect(await activeTitle({ items: withZero, modelValue: 0 })).toBe('Zero')
    })
  })
})
