import { describe, it, expect, vi } from 'vitest'
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
 *
 * ## Why one assertion waits
 *
 * What the palette renders comes from `filteredGroups`, which reads
 * `refThrottled(fuseResults, 16, true)`. Leading-edge is on, so the first
 * change applies at once — but a second change landing inside the same 16 ms
 * window is deferred to the trailing timer, and `await $nextTick()` flushes
 * Vue's queue without advancing timers. Drilling into a group and stepping
 * straight back out is exactly that traffic, so the assertion could read the
 * previous result: for this palette, the empty state.
 *
 * It therefore fails when the machine is *fast* enough to fit both changes into
 * one window — the opposite of the usual flake, and why adding CPU load made it
 * more reliable rather than less. It went red once in CI on #611 and green on
 * re-run with no edit; widening the window to 2000 ms reproduces the identical
 * `expected 'No data' to contain 'Pictures'` every time.
 *
 * A frame of staleness is not a product defect, so the assertion waits rather
 * than the component changing. `vi.waitFor` rather than a sleep: it retries, so
 * no timing constant is written down here and the test keeps working if the
 * window moves.
 *
 * Only this one assertion needs it, and that was checked rather than assumed.
 * The placeholder is plain reactive state, not throttled. The root-level test
 * compares before against after, which a wait could not help anyway — you
 * cannot wait for a non-event — and it is safe because `onBackspace` returns
 * early with an empty history, so nothing is queued at all, and because the
 * text right after `mountSuspended` is already the settled text (probed: the
 * immediate and post-window reads are identical, since the leading edge fires
 * on the first change).
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
    await vi.waitFor(() => expect(wrapper.text()).toContain('Pictures'))
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
