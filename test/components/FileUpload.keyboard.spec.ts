import { describe, it, expect, vi, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import FileUpload from '../../src/runtime/components/FileUpload.vue'

/**
 * Reaching the dropzone without a mouse.
 *
 * A drop target is not a native control, so everything a keyboard user needs
 * is hand-written here: a `tabindex` to reach it, `role="button"` to announce
 * it, Enter and Space to activate it, and `@keydown.space.prevent` so Space
 * does not scroll the page out from under them instead. All four are gated on
 * `interactive` and `disabled`, and none of them was exercised — `keydown` and
 * `keyup` appear in two spec files in this repository, and neither is this one.
 */
describe('FileUpload — keyboard', () => {
  // `spyOn` on a prototype method hands back the existing spy when one is
  // already installed, so without this the call count carries from case to
  // case and "was not called" passes or fails on the wrong test's clicks.
  afterEach(() => vi.restoreAllMocks())

  /**
   * `open()` ends in `fileDialog.open()`, which calls `.click()` on a detached
   * `<input type="file">`. Nothing observable comes back from that, so the
   * click is what gets counted.
   */
  const mountWithSpy = async (props: Record<string, unknown> = {}) => {
    const clicked = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {})
    const wrapper = await mountSuspended(FileUpload, { props: { label: 'Drop here', ...props } as any })
    return { wrapper, clicked, dropzone: wrapper.find('[data-slot="base"]') }
  }

  it('is reachable by Tab and announced as a button', async () => {
    const { dropzone } = await mountWithSpy()

    expect(dropzone.attributes('tabindex')).toBe('0')
    expect(dropzone.attributes('role')).toBe('button')
  })

  it.each(['Enter', ' '])('opens the file dialog on %s', async (key) => {
    const { dropzone, clicked } = await mountWithSpy()

    await dropzone.trigger('keyup', { key })

    expect(clicked).toHaveBeenCalled()
  })

  it('swallows the Space keydown so the page does not scroll', async () => {
    // Space on a focused element scrolls by default. The dropzone activates on
    // `keyup`, so the matching `keydown` has to be cancelled or the page moves
    // between the two halves of the press.
    const { dropzone } = await mountWithSpy()

    const event = new KeyboardEvent('keydown', { key: ' ', cancelable: true, bubbles: true })
    dropzone.element.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
  })

  describe('when it cannot be used', () => {
    it.each([
      ['disabled', { disabled: true }],
      ['not interactive', { interactive: false }]
    ])('is skipped by Tab and ignores Enter when %s', async (_case, props) => {
      const { dropzone, clicked } = await mountWithSpy(props)

      expect(dropzone.attributes('tabindex')).toBe('-1')

      await dropzone.trigger('keyup', { key: 'Enter' })

      expect(clicked).not.toHaveBeenCalled()
    })
  })
})
