import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import PageCardGroup from '../../src/runtime/components/PageCardGroup.vue'
import theme from '#build/b24ui/page-card-group'

describe('PageCardGroup', () => {
  // The default value of each renders exactly what `with items` renders, so a
  // case for it would be byte-identical to that one and assert nothing (#454).
  const sizes = Object.keys(theme.variants.size).filter(size => size !== theme.defaultVariants?.size) as any
  const columns = Object.keys(theme.variants.columns).filter(column => column !== String(theme.defaultVariants?.columns)) as any

  const items = [
    { label: 'First', description: 'One', value: 'a', category: 'Group A' },
    { label: 'Second', description: 'Two', value: 'b', category: 'Group A' },
    { label: 'Third', description: 'Three', value: 'c', category: 'Group B' }
  ]

  const props = { items }

  renderEach(PageCardGroup, [
    // Props
    ['with items', { props }],
    ['with legend', { props: { ...props, legend: 'Pick one' } }],
    ['with multiple', { props: { ...props, multiple: true } }],
    ['with modelValue', { props: { ...props, modelValue: 'b' } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with required', { props: { ...props, required: true, legend: 'Pick one' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ...columns.map((column: string) => [`with columns ${column}`, { props: { ...props, columns: column } }]),
    ['without categories', { props: { ...props, categoryKey: '' } }],
    ['with class', { props: { ...props, class: 'w-96' } }],
    ['with b24ui', { props: { ...props, b24ui: { grid: 'gap-8' } } }],
    // Slots
    ['with legend slot', { props, slots: { legend: () => 'Legend slot' } }],
    ['with categoryLabel slot', { props, slots: { categoryLabel: () => 'Category slot' } }],
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with badge slot', { props: { ...props, modelValue: 'a' }, slots: { badge: () => 'Badge slot' } }]
  ])

  describe('selection', () => {
    it('is a radiogroup of radios when single, a group of checkboxes when multiple', async () => {
      const single = await mountSuspended(PageCardGroup, { props })
      expect(single.find('[data-slot="root"]').attributes('role')).toBe('radiogroup')
      expect(single.findAll('input[type="radio"]')).toHaveLength(3)

      const multi = await mountSuspended(PageCardGroup, { props: { ...props, multiple: true } })
      expect(multi.find('[data-slot="root"]').attributes('role')).toBe('group')
      expect(multi.findAll('input[type="checkbox"]')).toHaveLength(3)
    })

    it('emits the item value on change, and a bare value when single', async () => {
      const wrapper = await mountSuspended(PageCardGroup, { props })

      await wrapper.findAll('input')[1]!.trigger('change')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
      expect(wrapper.emitted('change')).toHaveLength(1)
    })

    it('accumulates into an array when multiple, and removes on a second change', async () => {
      const wrapper = await mountSuspended(PageCardGroup, { props: { ...props, multiple: true } })
      const inputs = wrapper.findAll('input')

      await inputs[0]!.trigger('change')
      await inputs[2]!.trigger('change')
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['a', 'c']])

      await inputs[0]!.trigger('change')
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['c']])
    })

    // A disabled item is stopped twice — by the `disabled` attribute on the
    // input, and by a guard in `onItemChange`. Removing either one alone
    // changes nothing observable, so the attribute is asserted directly:
    // without it the emit assertion below would still pass on the guard.
    it('marks a disabled item disabled, and emits nothing for it', async () => {
      const wrapper = await mountSuspended(PageCardGroup, {
        props: { items: [{ label: 'First', value: 'a', disabled: true }] }
      })
      const input = wrapper.find('input')

      expect(input.attributes('disabled')).toBeDefined()
      await input.trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('marks every item disabled when the group is, and emits nothing', async () => {
      const wrapper = await mountSuspended(PageCardGroup, { props: { ...props, disabled: true } })

      expect(wrapper.findAll('input').every(input => input.attributes('disabled') !== undefined)).toBe(true)
      await wrapper.findAll('input')[0]!.trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('item mapping', () => {
    it('falls back to the label when the value key is absent', async () => {
      // `getItemValue` reads `valueKey`, then the label — so an item with only a
      // label is still selectable rather than emitting `undefined`.
      const wrapper = await mountSuspended(PageCardGroup, { props: { items: [{ label: 'Only a label' }] } })

      await wrapper.find('input').trigger('change')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Only a label'])
    })

    it('reads the keys the props name, not the default ones', async () => {
      const wrapper = await mountSuspended(PageCardGroup, {
        props: {
          items: [{ title: 'Renamed', id: 'x' }],
          labelKey: 'title',
          valueKey: 'id',
          categoryKey: ''
        }
      })

      expect(wrapper.text()).toContain('Renamed')
      await wrapper.find('input').trigger('change')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['x'])
    })
  })

  // Not covered here: `PageCardGroupItem.icon` is documented as beating
  // `avatar`, and it does — but twice over. `getItemAvatar` returns undefined
  // as soon as an icon is present, and `PageCard` independently renders
  // `v-if="icon"` / `v-else-if="avatar"`. Breaking either one alone changes
  // nothing observable, so no test here can fail on it; one that looked like it
  // covered the promise would only be reporting the other guard.
  describe('documented precedence', () => {
    it('falls back to `color` for the highlight and the badge', async () => {
      // `highlightColor` and `badgeColor` are documented as falling back to the
      // umbrella `color`. Compared against an explicit `highlightColor` of the
      // same value: the selected card has to render identically either way.
      const viaColor = await mountSuspended(PageCardGroup, {
        props: { ...props, modelValue: 'a', color: 'air-primary-alert' as const }
      })
      const viaExplicit = await mountSuspended(PageCardGroup, {
        props: { ...props, modelValue: 'a', highlightColor: 'air-primary-alert' as const, badgeColor: 'air-primary-alert' as const }
      })

      expect(viaColor.html()).toBe(viaExplicit.html())
    })
  })

  describe('grouping', () => {
    it('splits items into one group per category', async () => {
      const wrapper = await mountSuspended(PageCardGroup, { props })

      expect(wrapper.findAll('[data-slot="group"]')).toHaveLength(2)
      expect(wrapper.findAll('[data-slot="categoryLabel"]').map(node => node.text())).toEqual(['Group A', 'Group B'])
    })

    it('renders one unlabelled group when categoryKey is empty', async () => {
      // Documented on the prop: an empty string disables grouping.
      //
      // This pins the outcome, not the branch. `groupedItems` short-circuits on
      // a falsy `categoryKey`, but looking `''` up on each item would return
      // `undefined` for all of them and land everything in one unlabelled group
      // as well — the two paths cannot be told apart from the rendered output,
      // so no test here can fail on that short-circuit alone.
      const wrapper = await mountSuspended(PageCardGroup, { props: { ...props, categoryKey: '' } })

      expect(wrapper.findAll('[data-slot="group"]')).toHaveLength(1)
      expect(wrapper.find('[data-slot="categoryLabel"]').exists()).toBe(false)
    })
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PageCardGroup, { props: { ...props, legend: 'Pick one' } })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
