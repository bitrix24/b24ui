import { ref, nextTick } from 'vue'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useBlurOnOpen } from '../../src/runtime/composables/useBlurOnOpen'

/**
 * Unit-level cover for the reka-ui#1280 workaround, testing the two properties
 * the component specs cannot see.
 *
 * The component specs drive `open` through `await wrapper.setProps(...)`, which
 * flushes Vue's queue before asserting — so a `'pre'`-flushed watcher looks
 * identical to the synchronous one the composable requires, and dropping
 * `flush: 'sync'` leaves every one of them green while the console warning it
 * exists to prevent comes back. The blur has to be observable *before* the
 * await, which is what the first test below does.
 *
 * Delete this file with the workaround (#159, reka-ui#1280).
 */
describe('useBlurOnOpen', () => {
  let trigger: HTMLButtonElement

  beforeEach(() => {
    trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()
  })

  afterEach(() => {
    trigger.remove()
  })

  it('blurs synchronously, before Vue flushes', () => {
    const open = ref(false)
    useBlurOnOpen(open, () => {})

    expect(document.activeElement).toBe(trigger)

    open.value = true

    // No await: a `'pre'` or `'post'` flush would still have the trigger
    // focused here, and reka-ui would already have applied `aria-hidden`.
    expect(document.activeElement).not.toBe(trigger)
  })

  it('hands focus back when open goes false', async () => {
    const open = ref(false)
    useBlurOnOpen(open, () => {})

    open.value = true
    expect(document.activeElement).not.toBe(trigger)

    open.value = false
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 20))

    expect(document.activeElement).toBe(trigger)
  })

  it('leaves focus alone if something else claimed it while open', async () => {
    const other = document.createElement('button')
    document.body.appendChild(other)

    const open = ref(false)
    useBlurOnOpen(open, () => {})

    open.value = true
    other.focus()

    open.value = false
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 20))

    expect(document.activeElement).toBe(other)
    other.remove()
  })

  it('covers the uncontrolled path through the wrapped emits', async () => {
    const emit = useBlurOnOpen(ref(false), (_event: string, ..._args: any[]) => {})

    emit('update:open', true)
    expect(document.activeElement).not.toBe(trigger)

    emit('update:open', false)
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 20))

    expect(document.activeElement).toBe(trigger)
  })
})
