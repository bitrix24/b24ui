import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent, h, ref, nextTick, KeepAlive } from 'vue'
import Countdown from '../../src/runtime/components/Countdown.vue'
import { renderEach } from '../component-render'
import theme from '#build/b24ui/countdown'

describe('Countdown', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const useCircle = [true, false]

  renderEach(Countdown, [
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: '' } }],
    ['with b24ui', { props: { b24ui: {} } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with seconds', { props: { seconds: 60 } }],
    ['with interval', { props: { interval: 500 } }],
    ['with needStartImmediately false', { props: { needStartImmediately: false } }],
    ['with emitEvents false', { props: { emitEvents: false } }],
    ['with showMinutes false', { props: { showMinutes: false } }],
    // `seconds` is needed for the ring to compute at all — without it the
    // default of 0 divides into nothing and the snapshot pinned
    // `stroke-dasharray="NaN 283"`, the only dasharray value in either file
    // (#454). 100 matches the unit test below that proves '283 283'.
    ...useCircle.map((circle: boolean) => [`with useCircle ${circle}`, { props: { useCircle: circle, seconds: 100 } }]),
    ['with leading icon', { props: { leading: true } }],
    ['with default slot', { slots: { default: () => 'Default slot' } }],
    ['with leading slot', { slots: { leading: () => 'Leading slot' } }]
  ])

  // `needStartImmediately: false` so the frame loop never starts: an axe run
  // takes long enough that a live countdown would tick the DOM underneath it.
  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Countdown, {
      props: { seconds: 100, useCircle: true, needStartImmediately: false }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })

  describe('computed values', () => {
    it('calculates time units correctly', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 90061, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      expect(vm.days).toBe(1)
      expect(vm.hours).toBe(1)
      expect(vm.minutes).toBe(1)
      expect(vm.secondsValue).toBe(1)
      expect(vm.milliseconds).toBe(0)
      expect(vm.totalDays).toBe(1)
      expect(vm.totalHours).toBe(25)
      expect(vm.totalMinutes).toBe(1501)
      expect(vm.totalSeconds).toBe(90061)
      expect(vm.totalMilliseconds).toBe(90061000)
    })

    it('formats time correctly with showMinutes true', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 65, showMinutes: true, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      expect(vm.formatTime).toBe('01:05')
    })

    it('formats time correctly with showMinutes false', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 65, showMinutes: false, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      expect(vm.formatTime).toBe('65')
    })

    it('formats time correctly with useCircle', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 65, useCircle: true, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      expect(vm.formatTime).toBe(':65')
    })
  })

  describe('methods', () => {
    let requestAnimationFrameSpy: any
    let cancelAnimationFrameSpy: any

    beforeEach(() => {
      requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1)
      cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('starts counting', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      expect(vm.counting).toBe(false)
      vm.start()
      expect(vm.counting).toBe(true)
      expect(requestAnimationFrameSpy).toHaveBeenCalled()
    })

    it('pauses counting', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      // `start()` first, because there is nothing to cancel otherwise. This
      // used to pass without it: `pause` cancelled unconditionally, so the spy
      // recorded a call that handed `cancelAnimationFrame` the initial `0`.
      vm.start()
      vm.pause()
      expect(cancelAnimationFrameSpy).toHaveBeenCalled()
    })

    it('aborts counting', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      vm.start()
      expect(vm.counting).toBe(true)
      vm.abort()
      expect(vm.counting).toBe(false)
      expect(cancelAnimationFrameSpy).toHaveBeenCalled()
    })

    it('stops counting', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      vm.start()
      vm.stop()
      expect(vm.counting).toBe(false)
      expect(vm.totalMilliseconds).toBe(0)
      expect(cancelAnimationFrameSpy).toHaveBeenCalled()
    })

    it('restarts counting', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      vm.restart()
      expect(vm.counting).toBe(true)
      expect(requestAnimationFrameSpy).toHaveBeenCalled()
    })
  })

  describe('lifecycle', () => {
    afterEach(() => {
      vi.restoreAllMocks()
    })

    // The handler used to be registered as `handleVisibilityChange.bind(this)`
    // and removed as `handleVisibilityChange.bind(this)` — two different
    // function objects, so `removeEventListener` matched nothing and every
    // mounted Countdown left a live listener on `document` behind it. Compares
    // the references rather than just asserting `removeEventListener` ran,
    // because the buggy version called it too.
    it('removes the same visibilitychange handler it registered', async () => {
      const addSpy = vi.spyOn(document, 'addEventListener')
      const removeSpy = vi.spyOn(document, 'removeEventListener')

      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, needStartImmediately: false }
      })

      const registered = addSpy.mock.calls.filter(([type]) => type === 'visibilitychange')
      expect(registered).toHaveLength(1)

      wrapper.unmount()

      const removed = removeSpy.mock.calls.filter(([type]) => type === 'visibilitychange')
      expect(removed).toHaveLength(1)
      expect(removed[0]![1]).toBe(registered[0]![1])
    })

    // `<KeepAlive>` deactivation does not run `onBeforeUnmount`, so a cached
    // countdown used to keep its `requestAnimationFrame` chain running —
    // emitting `progress`/`end` for something nobody can see, one chain per
    // cached instance.
    const keepAliveHarness = () => {
      const shown = ref(true)
      const Parent = defineComponent({
        setup() {
          return () => h(KeepAlive, null, {
            default: () => (shown.value ? h(Countdown, { seconds: 10 }) : null)
          })
        }
      })

      return { shown, Parent }
    }

    // Handles scheduled and not yet cancelled — the chains that would actually
    // fire. Counting `requestAnimationFrame` calls instead would prove nothing:
    // the component schedules a variable number of times (the deep props
    // watcher runs more than once under the `nuxt` environment) and the fix
    // does not remove a call, it cancels the handle the previous call left
    // behind. Unique ids rather than a constant, so a cancel is attributable.
    const trackFrames = () => {
      const live = new Set<number>()
      let nextId = 0

      vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => {
        const id = ++nextId
        live.add(id)
        return id
      })
      vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id: number) => {
        live.delete(id)
      })

      return live
    }

    // Vue runs `onActivated` right after `onMounted` for a brand-new cached
    // child, not only on a real reactivation. So the immediate props watcher's
    // `start()` and `onActivated`'s `resumeCounting()` both reach
    // `continueProcess()` on the very first mount, and `requestId` keeps only
    // the last handle — the earlier chain becomes unreachable and goes on
    // emitting `progress`/`end` with nothing able to cancel it.
    it('leaves no extra frame chain alive under `<KeepAlive>`', async () => {
      const live = trackFrames()

      await mountSuspended(Countdown, { props: { seconds: 10 } })
      const plain = live.size

      live.clear()
      await mountSuspended(keepAliveHarness().Parent)

      // Measured against a plain mount rather than pinned to a number: under
      // the `nuxt` project Nuxt's own `navigation-repaint` plugin schedules a
      // frame of its own on every `mountSuspended`, and never cancels it. It
      // lands on both sides equally, so the difference is the component's.
      expect(live.size).toBe(plain)
    })

    it('stops and resumes its frame loop across `<KeepAlive>` toggles', async () => {
      const cancel = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
      const request = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1)

      const { shown, Parent } = keepAliveHarness()
      await mountSuspended(Parent)
      cancel.mockClear()
      request.mockClear()

      shown.value = false
      await nextTick()
      expect(cancel).toHaveBeenCalled()

      request.mockClear()
      shown.value = true
      await nextTick()
      expect(request).toHaveBeenCalled()
    })

    it('leaves a stopped countdown stopped across a `<KeepAlive>` toggle', async () => {
      // Safe today only because `update()` and `continueProcess()` each guard
      // on `counting`, and `resumeCounting()` never calls `start()`. Nothing
      // structural protects it, so it is pinned here.
      vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
      const request = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1)

      const { shown, Parent } = keepAliveHarness()
      const wrapper = await mountSuspended(Parent)
      const countdown = wrapper.findComponent(Countdown).vm as any

      countdown.stop()
      expect(countdown.counting).toBe(false)

      shown.value = false
      await nextTick()
      request.mockClear()
      shown.value = true
      await nextTick()

      expect(countdown.counting).toBe(false)
      expect(request).not.toHaveBeenCalled()
    })
  })

  describe('events', () => {
    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('emits start event', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, needStartImmediately: false, emitEvents: true }
      })
      const vm = wrapper.vm as any
      vm.start()
      expect(wrapper.emitted('start')).toBeTruthy()
    })

    it('emits progress event', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, emitEvents: true, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      vm.start()
      vm.progress()

      expect(wrapper.emitted('progress')).toBeTruthy()
      const eventData = wrapper.emitted('progress')?.[0]?.[0]
      expect(eventData).toHaveProperty('days')
      expect(eventData).toHaveProperty('totalSeconds')
    })

    it('emits abort event', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, emitEvents: true, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      vm.start()
      vm.abort()
      expect(wrapper.emitted('abort')).toBeTruthy()
    })

    it('emits end event', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, emitEvents: true, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      vm.start()
      vm.stop()
      expect(wrapper.emitted('end')).toBeTruthy()
    })

    it('does not emit events when emitEvents is false', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, emitEvents: false, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      vm.start()
      expect(wrapper.emitted('start')).toBeFalsy()
    })
  })

  describe('visibility change', () => {
    let originalVisibilityState: any

    beforeEach(() => {
      originalVisibilityState = Object.getOwnPropertyDescriptor(document, 'visibilityState')
      Object.defineProperty(document, 'visibilityState', {
        value: 'visible',
        configurable: true
      })

      vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1)
      vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
    })

    afterEach(() => {
      if (originalVisibilityState) {
        Object.defineProperty(document, 'visibilityState', originalVisibilityState)
      }
      vi.restoreAllMocks()
    })

    it('handles visibility change without errors', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, needStartImmediately: false }
      })
      const vm = wrapper.vm as any

      vm.start()

      // Simulate visibility change to hidden
      Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true })
      document.dispatchEvent(new Event('visibilitychange'))

      // Simulate visibility change back to visible
      Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true })
      document.dispatchEvent(new Event('visibilitychange'))

      vm.abort()

      expect(wrapper.vm).toBeTruthy()
    })
  })

  describe('fullDashArray', () => {
    it('calculates dash array correctly', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 100, useCircle: true, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      expect(vm.fullDashArray).toBe('283 283')
    })

    /**
     * Every one of these divided into nothing before #454. The zero case is
     * the one that mattered: it is the **default** of `seconds`, so the
     * minimal documented usage — `<B24Countdown use-circle />` — emitted
     * `stroke-dasharray="NaN 283"`, an invalid SVG value that the snapshot had
     * been recording as expected output. The string cases reach the same place
     * by the other route, since `seconds` is typed `number | string`.
     *
     * The negative cases are here because the `total < 0` guard is
     * load-bearing, which an earlier revision of this file got wrong by
     * checking a single value. `-1` reaches 1 with or without the guard, and
     * so does every other whole number — `totalSeconds` floors, so the
     * fraction is `Math.floor(total) / total`. Fractions are where it comes
     * apart: without the guard `-0.5` renders an empty ring and `-0.2` renders
     * `-4245 283`. Deleting the guard must fail this test, which is why the
     * cases below are fractional.
     */
    it.each([
      ['the default of 0', 0, '0 283'],
      ['a non-numeric string', 'soon', '0 283'],
      ['an empty string', '', '0 283'],
      ['a numeric string', '100', '283 283'],
      ['a negative fraction of a second', -0.5, '283 283'],
      ['a negative fifth of a second', -0.2, '283 283']
    ])('renders a valid dash array for %s', async (_name, seconds, expected) => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds, useCircle: true, needStartImmediately: false }
      })
      const vm = wrapper.vm as any
      expect(vm.fullDashArray).toBe(expected)
      expectValidDashArray(vm.fullDashArray)
    })

    /**
     * The other half of the same bug, and the one that fires on the happy
     * path. The formula subtracts a tick's worth of arc so the ring keeps step
     * with the digits, which means it overshoots by exactly that much at zero:
     * `totalSeconds` lands on 0, the expression yields `-1 / total`, and the
     * ring rendered `stroke-dasharray="-28 283"` on its final frame. Reached
     * through `start()`/`stop()` because that is the same state the tick loop
     * arrives at — `update()` clamps the remaining time with `Math.max(0, …)`
     * and `stop()` zeroes it outright.
     */
    it('never renders a negative dash length at the end of the countdown', async () => {
      const wrapper = await mountSuspended(Countdown, {
        props: { seconds: 10, useCircle: true, needStartImmediately: false }
      })
      const vm = wrapper.vm as any

      // `start()` only has to flip `counting` so that `stop()` runs; the
      // animation frame it would otherwise schedule outlives the test.
      const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1)
      vm.start()
      vm.stop()
      requestAnimationFrameSpy.mockRestore()
      await nextTick()

      expect(vm.totalSeconds).toBe(0)
      expect(vm.fullDashArray).toBe('0 283')
      expectValidDashArray(vm.fullDashArray)
    })
  })
})

/**
 * `stroke-dasharray` takes a list of SVG lengths. Negative values are invalid
 * and NaN is not a number at all; either one makes the browser drop the
 * attribute, so the ring silently reverts to a full circle. Asserting the
 * exact string is the real check — this only makes the failure message say
 * what is wrong with it.
 */
function expectValidDashArray(value: string): void {
  expect(value, 'an SVG length list must never contain NaN').not.toContain('NaN')

  for (const length of value.split(' ')) {
    expect(Number(length), `an SVG length must not be negative: '${value}'`).toBeGreaterThanOrEqual(0)
  }
}
