import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useNuxtApp } from '#imports'
import colorsPlugin from '../../src/runtime/plugins/colors'

/**
 * Regression cover for #301.
 *
 * The SPA branch of `src/runtime/plugins/colors.ts` registers a one-shot
 * `dom:rendered` listener to drop the temporary colors style. It used to call
 * `head.hooks.hookOnce()`, which only exists on unhead v2's `Hookable`; unhead
 * v3 builds `hooks` from `HookableCore`, which exposes `hook`/`removeHook`/
 * `callHook` only. Nuxt 4.5.1 moved to unhead v3, so the call threw and took
 * down app initialization for every `ssr: false` app.
 *
 * Two things give these specs teeth, and both are deliberate:
 *
 * 1. They run the plugin itself rather than a hand-written copy of its logic.
 *    A spec that reimplements the self-unhook pattern locally stays green when
 *    the plugin regresses, because it never executes the plugin.
 * 2. `head` below mimics `HookableCore` and has no `hookOnce`. Asserting
 *    against a real `createHead()` cannot fail either way — unhead's own client
 *    satisfies whatever the plugin happens to call.
 */

let listeners: Array<() => void> = []

const head = {
  hooks: {
    hook(_name: string, fn: () => void) {
      listeners.push(fn)
      return () => {
        listeners = listeners.filter(l => l !== fn)
      }
    },
    removeHook(_name: string, fn: () => void) {
      listeners = listeners.filter(l => l !== fn)
    },
    callHook(_name: string) {
      // Copy first: a listener may unhook itself while we iterate.
      for (const fn of [...listeners]) fn()
    }
  }
}

// vi.hoisted, because mockNuxtImport's factory is hoisted above these bindings.
const { useHeadMock } = vi.hoisted(() => ({ useHeadMock: vi.fn() }))

mockNuxtImport('injectHead', () => () => head)
mockNuxtImport('useHead', () => useHeadMock)

function runPlugin() {
  ;(colorsPlugin as unknown as (app?: unknown) => void)()
}

describe('colors plugin — SPA branch', () => {
  let restore: (() => void) | undefined

  beforeEach(() => {
    restore = undefined
    listeners = []
    useHeadMock.mockClear()
    document.querySelectorAll('[data-bitrix24-ui-colors]').forEach(el => el.remove())

    // Put the app into the state the SPA branch guards on, the way
    // test/components/nuxt/LinkLocale.spec.ts patches nuxtApp for its fixture.
    const nuxtApp = useNuxtApp() as ReturnType<typeof useNuxtApp>
    const previousHydrating = nuxtApp.isHydrating
    const previousServerRendered = nuxtApp.payload.serverRendered

    nuxtApp.isHydrating = true
    nuxtApp.payload.serverRendered = false

    restore = () => {
      nuxtApp.isHydrating = previousHydrating
      nuxtApp.payload.serverRendered = previousServerRendered
    }
  })

  afterEach(() => {
    restore?.()
  })

  it('initializes without reaching for a unhead v2-only API', () => {
    // The #301 crash surfaced exactly here: `hookOnce` is undefined on unhead v3.
    expect(() => runPlugin()).not.toThrow()
  })

  it('injects the temporary style and removes it once dom:rendered fires', () => {
    runPlugin()

    expect(document.querySelector('[data-bitrix24-ui-colors]')).not.toBeNull()

    head.hooks.callHook('dom:rendered')

    expect(document.querySelector('[data-bitrix24-ui-colors]')).toBeNull()
  })

  it('keeps once-semantics — the listener unregisters itself', () => {
    runPlugin()

    expect(listeners).toHaveLength(1)

    head.hooks.callHook('dom:rendered')

    expect(listeners).toHaveLength(0)
  })

  it('registers the persistent style through useHead with a stable id', () => {
    // Runs on every path, SPA or not. The id is referenced elsewhere, so pin it
    // here — the specs above only cover the temporary marker style.
    runPlugin()

    expect(useHeadMock).toHaveBeenCalledTimes(1)
    expect(useHeadMock.mock.calls[0]![0]).toMatchObject({
      style: [expect.objectContaining({ id: 'bitrix24-ui-colors', tagPriority: 'critical' })]
    })
  })
})

describe('colors plugin — the SPA branch stays shut otherwise', () => {
  // The guard is `isHydrating && !payload.serverRendered`. The specs above only
  // exercise it being true; these pin the other side, so dropping the `!` — or
  // the hydration check — fails here instead of shipping the marker style to
  // every SSR app.
  let restore: (() => void) | undefined

  function withAppState(isHydrating: boolean, serverRendered: boolean) {
    const nuxtApp = useNuxtApp() as ReturnType<typeof useNuxtApp>
    const previousHydrating = nuxtApp.isHydrating
    const previousServerRendered = nuxtApp.payload.serverRendered

    nuxtApp.isHydrating = isHydrating
    nuxtApp.payload.serverRendered = serverRendered

    restore = () => {
      nuxtApp.isHydrating = previousHydrating
      nuxtApp.payload.serverRendered = previousServerRendered
    }
  }

  beforeEach(() => {
    restore = undefined
    listeners = []
    document.querySelectorAll('[data-bitrix24-ui-colors]').forEach(el => el.remove())
  })

  afterEach(() => {
    restore?.()
  })

  it('stays out of the DOM when hydrating real SSR output', () => {
    withAppState(true, true)

    runPlugin()

    expect(document.querySelector('[data-bitrix24-ui-colors]')).toBeNull()
    expect(listeners).toHaveLength(0)
  })

  it('stays out of the DOM once hydration has finished', () => {
    withAppState(false, false)

    runPlugin()

    expect(document.querySelector('[data-bitrix24-ui-colors]')).toBeNull()
    expect(listeners).toHaveLength(0)
  })
})
