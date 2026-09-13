import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CommandPalette from '../../src/runtime/components/CommandPalette.vue'

/**
 * Backspace in the palette does two different things depending on where the
 * caret is, and only one of them is obvious.
 *
 * With text typed, it deletes a character — the ordinary meaning. With the
 * field empty it steps back out of a group the user drilled into, which is the
 * only keyboard way out of one. Confusing the two is immediately visible:
 * hitting backspace to fix a typo would throw you out of the group instead.
 *
 * `keydown`/`keyup` appear in two spec files in this repository, and neither is
 * this one — the guard was written and never exercised.
 */
describe('CommandPalette — Backspace', () => {
  const groups = [{
    id: 'files',
    items: [
      { label: 'Documents', placeholder: 'Search documents…', children: [{ label: 'Report' }, { label: 'Invoice' }] },
      { label: 'Pictures' }
    ]
  }]

  const mount = () => mountSuspended(CommandPalette, { props: { groups } as any })

  const input = (wrapper: Awaited<ReturnType<typeof mount>>) => wrapper.find('input')

  /** Drilling in is what puts something on the history stack to come back from. */
  const drillIn = async (wrapper: Awaited<ReturnType<typeof mount>>) => {
    await (wrapper.vm as any).navigate?.({ label: 'Documents', placeholder: 'Search documents…', children: [{ label: 'Report' }, { label: 'Invoice' }] })
    await wrapper.vm.$nextTick()
  }

  it('steps back out of a group when the field is empty', async () => {
    const wrapper = await mount()
    await drillIn(wrapper)
    expect(input(wrapper).attributes('placeholder')).toBe('Search documents…')

    await input(wrapper).trigger('keydown', { key: 'Backspace' })
    await wrapper.vm.$nextTick()

    expect(input(wrapper).attributes('placeholder')).not.toBe('Search documents…')
    expect(wrapper.text()).toContain('Pictures')
  })

  it('leaves the group alone while there is text to delete', async () => {
    const wrapper = await mount()
    await drillIn(wrapper)

    await input(wrapper).setValue('rep')
    await input(wrapper).trigger('keydown', { key: 'Backspace' })
    await wrapper.vm.$nextTick()

    // Read through the placeholder rather than the visible items: with text in
    // the field the root's items are filtered out anyway, so "Pictures is not
    // shown" is true whether or not we stepped back, and an assertion on it
    // cannot fail. The placeholder comes from the group on the history stack.
    expect(input(wrapper).attributes('placeholder')).toBe('Search documents…')
  })

  it('does nothing at the root, where there is nothing to go back to', async () => {
    const wrapper = await mount()
    const before = wrapper.text()

    await input(wrapper).trigger('keydown', { key: 'Backspace' })
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toBe(before)
  })
})
