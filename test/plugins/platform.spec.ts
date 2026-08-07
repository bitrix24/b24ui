import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useState } from '#imports'
import platformPlugin from '../../src/runtime/plugins/platform'

/**
 * The platform plugin parses the User-Agent into the `platform` state and
 * mirrors it onto `<html data-platform data-version>`. It is the only plugin
 * with real branching — three UA outcomes plus a caching guard — and Bitrix
 * changing its UA format is exactly the kind of silent breakage nothing else
 * would catch.
 *
 * `useHead` is mocked to capture the payload; `useState` is the real one, so
 * the caching guard is exercised against actual state. The UA itself comes
 * from stubbing `navigator` — the plugin reads `navigator.userAgent` on the
 * client path, which is the path the nuxt test environment runs.
 */

// vi.hoisted, because mockNuxtImport's factory is hoisted above these bindings.
const { useHeadMock } = vi.hoisted(() => ({ useHeadMock: vi.fn() }))

mockNuxtImport('useHead', () => useHeadMock)

function runPlugin() {
  ;(platformPlugin as unknown as (app?: unknown) => void)()
}

function platformState() {
  return useState<{ name?: string, version?: string }>('platform')
}

describe('platform plugin', () => {
  const realUserAgent = navigator.userAgent

  beforeEach(() => {
    useHeadMock.mockClear()
    // The state survives between specs inside a file — reset it so each spec
    // parses its own UA instead of inheriting the previous one's result.
    platformState().value = {}
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    expect(navigator.userAgent).toBe(realUserAgent)
  })

  function stubUserAgent(ua: string) {
    vi.stubGlobal('navigator', { ...navigator, userAgent: ua })
  }

  it('detects Bitrix Mobile and extracts the numeric version', () => {
    stubUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) BitrixMobile/Version=59')

    runPlugin()

    expect(platformState().value).toEqual({ name: 'bitrix-mobile', version: '59' })
  })

  it('detects Bitrix Desktop and extracts the dotted version', () => {
    stubUserAgent('Mozilla/5.0 (Macintosh) BitrixDesktop/24.100.0.1')

    runPlugin()

    expect(platformState().value).toEqual({ name: 'bitrix-desktop', version: '24.100.0.1' })
  })

  it('falls back to web/air when the UA matches neither', () => {
    stubUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/126.0')

    runPlugin()

    expect(platformState().value).toEqual({ name: 'web', version: 'air' })
  })

  it('prefers the mobile match when both markers are present', () => {
    // Order is load-bearing in the plugin: mobile is checked first.
    stubUserAgent('BitrixDesktop/24.0.0 BitrixMobile/Version=59')

    runPlugin()

    expect(platformState().value.name).toBe('bitrix-mobile')
  })

  it('does not re-parse once the platform is known', () => {
    platformState().value = { name: 'bitrix-mobile', version: '59' }
    stubUserAgent('Mozilla/5.0 plain web browser')

    runPlugin()

    // A re-parse would have overwritten this with web/air.
    expect(platformState().value).toEqual({ name: 'bitrix-mobile', version: '59' })
  })

  it('mirrors the state onto htmlAttrs through useHead', () => {
    stubUserAgent('BitrixMobile/Version=59')

    runPlugin()

    expect(useHeadMock).toHaveBeenCalledTimes(1)
    const arg = useHeadMock.mock.calls[0]![0] as {
      htmlAttrs: Record<string, () => string | undefined>
    }
    // Getters, not plain values — resolve them before asserting.
    expect(arg.htmlAttrs['data-platform']!()).toBe('bitrix-mobile')
    expect(arg.htmlAttrs['data-version']!()).toBe('59')
  })
})
