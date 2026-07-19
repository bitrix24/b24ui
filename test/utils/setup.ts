import * as matchers from 'vitest-axe/matchers'

import { expect } from 'vitest'
import { configureAxe } from 'vitest-axe'
import { patchWebStorage } from './patchWebStorage'

// Replace Node's broken built-in `localStorage` (Node 24/25) with a working
// in-memory Storage before any test runs. See patchWebStorage.ts for details.
patchWebStorage()

// @ts-expect-error incomplete implementation
window.IntersectionObserver = class IntersectionObserver {
  // eslint-disable-next-line
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
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
