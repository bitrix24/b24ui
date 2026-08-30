import * as matchers from 'vitest-axe/matchers'
import type { AxeMatchers } from 'vitest-axe/matchers'

import { afterEach, expect } from 'vitest'
import { configureAxe } from 'vitest-axe'
import { enableAutoUnmount } from '@vue/test-utils'
import { installConsoleGate } from '../utils/console-gate'
import { patchWebStorage } from '../utils/patchWebStorage'
import { patchComputedStyle } from '../utils/patchComputedStyle'

// Replace Node's broken built-in `localStorage` (Node 24/25) with a working
// in-memory Storage before any test runs. See patchWebStorage.ts for details.
patchWebStorage()

// Attached trees make `getComputedStyle` return a real declaration, which
// reka-ui puts in a `ref` — see patchComputedStyle.ts.
patchComputedStyle()

declare module 'vitest' {
  export interface Assertion extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}

configureAxe({
  globalOptions: {
    rules: [{
      // Disable region rule as it doesn't work well with components rendered in isolation.
      id: 'region',
      enabled: false
    }]
  }
})

expect.extend(matchers)

/**
 * Registered before the auto-unmount below, and the order is load-bearing.
 *
 * vitest runs same-level `afterEach` hooks last-registered-first, so the gate
 * has to go on first to come off last — otherwise it restores `console` before
 * teardown runs, and a `console.warn` from `onUnmounted` is never seen. Probed
 * with a component that warns while unmounting: registered this way the test
 * goes red, the other way round it passes.
 */
installConsoleGate()

/**
 * Every wrapper is unmounted after the test that made it.
 *
 * Mounts go into `document.body` (see `.github/contributing/testing.md`), so
 * without this each case leaves its tree there for the next one to trip over:
 * reka-ui's focus scope from an earlier case steals the focus a later one just
 * set. Removing this call reddens 50 of `Modal`'s 60 tests. `mount` tracks
 * every wrapper it creates, so this covers the hand-written mounts and
 * `componentRender` alike.
 */
enableAutoUnmount(afterEach)
