import { describe, it, expect, vi } from 'vitest'
import type { PointerDownOutsideEvent } from 'reka-ui'
import { pointerDownOutside } from '../../src/runtime/utils/overlay'

/**
 * What decides whether a click beside a `Modal`, `Drawer` or `Popover` closes
 * it. Both of its branches exist because of a case where the honest answer —
 * "the pointer went down outside, so close" — is wrong, and both are invisible
 * until they misfire on a real user: an overlay that will not close, or one
 * that closes while its scrollbar is being dragged.
 */
describe('pointerDownOutside', () => {
  const event = (target: Partial<HTMLElement>, offsets: { offsetX?: number, offsetY?: number } = {}) => {
    const preventDefault = vi.fn()
    return {
      event: { detail: { originalEvent: { target, offsetX: 0, offsetY: 0, ...offsets } }, preventDefault } as unknown as PointerDownOutsideEvent,
      preventDefault
    }
  }

  const connected = (over: Partial<HTMLElement> = {}) =>
    ({ isConnected: true, clientWidth: 100, clientHeight: 100, ...over }) as Partial<HTMLElement>

  it('closes on an ordinary click outside', () => {
    const { event: e, preventDefault } = event(connected())

    pointerDownOutside(e)

    expect(preventDefault).not.toHaveBeenCalled()
  })

  describe('a target no longer in the document', () => {
    // On touch, reka-ui defers the dispatch to the click event. If the element
    // went away in between — a toast dismissing itself is the case this was
    // written for — the overlay would take that as a click outside and close.
    it('does not close', () => {
      const { event: e, preventDefault } = event({ isConnected: false })

      pointerDownOutside(e)

      expect(preventDefault).toHaveBeenCalledOnce()
    })

    it('does not close when there is no target at all', () => {
      const { event: e, preventDefault } = event(null as unknown as Partial<HTMLElement>)

      pointerDownOutside(e)

      expect(preventDefault).toHaveBeenCalledOnce()
    })
  })

  describe('scrollable mode', () => {
    // A scrollbar is painted outside the element's client box, so dragging one
    // reads as a click outside. Only checked in scrollable mode: elsewhere the
    // overlay has no scrollbar of its own to hit.
    it('does not close when the pointer lands past the right edge', () => {
      const { event: e, preventDefault } = event(connected(), { offsetX: 108 })

      pointerDownOutside(e, { scrollable: true })

      expect(preventDefault).toHaveBeenCalledOnce()
    })

    it('does not close when the pointer lands past the bottom edge', () => {
      const { event: e, preventDefault } = event(connected(), { offsetY: 108 })

      pointerDownOutside(e, { scrollable: true })

      expect(preventDefault).toHaveBeenCalledOnce()
    })

    it('still closes on a click inside the client box', () => {
      const { event: e, preventDefault } = event(connected(), { offsetX: 40, offsetY: 40 })

      pointerDownOutside(e, { scrollable: true })

      expect(preventDefault).not.toHaveBeenCalled()
    })

    it('ignores the scrollbar edges when scrollable is off', () => {
      const { event: e, preventDefault } = event(connected(), { offsetX: 108, offsetY: 108 })

      pointerDownOutside(e)

      expect(preventDefault).not.toHaveBeenCalled()
    })
  })
})
