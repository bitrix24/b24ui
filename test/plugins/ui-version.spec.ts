import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useAppConfig } from '#imports'
import { version as packagedVersion } from '../../package.json'
import uiVersionPlugin from '../../src/runtime/plugins/ui-version'

/**
 * ui-version renders `appConfig.version` into `<meta name="b24ui">`. Small,
 * but it is the observable end of the #314 fix: the module honours
 * `b24ui: { version }` from nuxt.config, and this is where that value lands.
 * These specs are the regression cover that fix did not have — a revert to
 * the hardcoded package constant shows up here as the meta content.
 */

// vi.hoisted, because mockNuxtImport's factory is hoisted above these bindings.
const { useHeadMock } = vi.hoisted(() => ({ useHeadMock: vi.fn() }))

mockNuxtImport('useHead', () => useHeadMock)

function runPlugin() {
  ;(uiVersionPlugin as unknown as (app?: unknown) => void)()
}

function metaContent(): string | undefined {
  // Assert first: if the useHead mock ever stops applying, this fails naming
  // the mock instead of crashing on `calls[0]` with an opaque TypeError.
  expect(useHeadMock).toHaveBeenCalledTimes(1)
  const arg = useHeadMock.mock.calls[0]![0] as { meta: Array<{ name: string, content: string }> }
  return arg.meta.find(m => m.name === 'b24ui')?.content
}

describe('ui-version plugin', () => {
  let restore: (() => void) | undefined

  beforeEach(() => {
    restore = undefined
    useHeadMock.mockClear()
  })

  afterEach(() => {
    restore?.()
  })

  function withAppConfigVersion(value: string | undefined) {
    // The real appConfig, patched the way the module's setup() writes it —
    // mocking useAppConfig would bypass the exact wiring under test.
    const appConfig = useAppConfig() as { version?: string }
    const previous = appConfig.version
    appConfig.version = value

    restore = () => {
      appConfig.version = previous
    }
  }

  it('renders appConfig.version into the b24ui meta tag', () => {
    // What the module writes: options.version ?? packaged version (#314).
    withAppConfigVersion('9.9.9-custom')

    runPlugin()

    expect(metaContent()).toBe('9.9.9-custom')
  })

  it('carries the packaged version by default in this fixture', () => {
    // The test fixture sets no b24ui.version, so the module default — the
    // installed package version — is what reaches appConfig.
    runPlugin()

    expect(metaContent()).toBe(packagedVersion)
  })

  it('falls back to the build placeholder when appConfig carries no version', () => {
    withAppConfigVersion(undefined)

    runPlugin()

    expect(metaContent()).toBe('__B24UI_VERSION__')
  })
})
