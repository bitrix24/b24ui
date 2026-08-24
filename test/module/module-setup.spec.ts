import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { loadNuxt } from '@nuxt/kit'
import { version as packageVersion } from '../../package.json'

/**
 * The module's own `setup()`, run the way Nuxt runs it.
 *
 * Every other spec in this repository mounts something the module has already
 * configured. That leaves the configuring itself untested, and #314 lived
 * exactly there: `b24ui.version` was a public, typed option that `setup()`
 * ignored, so `appConfig.version` always held the package's own version. There
 * is no failure signal for that class of bug — no error, no warning, just a
 * `<meta>` tag carrying the wrong string — and #324 fixed it while covering
 * only the consuming half (`test/plugins/ui-version.spec.ts` renders whatever
 * `appConfig.version` holds, including a value nothing put there).
 *
 * Calling `setup()` directly does not work: `defineNuxtModule` merges
 * `defaults` through defu before the body runs, and the body reaches for
 * `@nuxt/kit`'s ambient Nuxt context (`addPlugin`, `installModule`, …), which
 * only exists inside a real instance. `loadNuxt` gives us that instance
 * without a build — it resolves the config, installs modules and stops, which
 * is all this needs and takes a few seconds rather than a few minutes.
 *
 * This is why the suite has a third vitest project: the spec needs plain Node,
 * not the `nuxt` environment (which is itself a Nuxt instance) and not
 * happy-dom.
 */
const cwd = fileURLToPath(new URL('./fixture', import.meta.url))

async function loadFixture(overrides: Record<string, unknown> = {}) {
  const nuxt = await loadNuxt({ cwd, dev: false, overrides })
  try {
    return { version: nuxt.options.appConfig.version, b24ui: nuxt.options.appConfig.b24ui }
  } finally {
    await nuxt.close()
  }
}

describe('module setup()', () => {
  // The first `loadNuxt` in the process pays for resolving the whole config;
  // later ones are an order of magnitude faster. Well under the ceiling, but
  // far over vitest's 5s default.
  it('honours a `b24ui.version` set in the app config (#314)', { timeout: 60_000 }, async () => {
    const { version } = await loadFixture({ b24ui: { version: '1.2.3-custom' } })

    // The assertion the bug would fail: before #324 this came back as the
    // package's own version, because `setup()` never read the option.
    expect(version).toBe('1.2.3-custom')
    expect(version).not.toBe(packageVersion)
  })

  it('falls back to the package version when none is set', { timeout: 60_000 }, async () => {
    const { version } = await loadFixture()

    // Pinned against `package.json` rather than a literal, so a release bump
    // does not have to touch this file — and so the fallback is asserted to be
    // *that* value rather than merely "some string".
    expect(version).toBe(packageVersion)
  })

  it('threads `theme.prefix` into the app config', { timeout: 60_000 }, async () => {
    // `appConfig.version` and `appConfig.b24ui` are written by adjacent lines
    // of the same `setup()`, so a version-only spec would pass against a
    // module that had stopped configuring the theme altogether. `prefix` is
    // the part of that config an app can set, which makes it the half worth
    // asserting: it has to survive the same journey `version` does — through
    // `defaults`, through defu, into `getDefaultConfig`.
    const { b24ui } = await loadFixture({ b24ui: { theme: { prefix: 'smoke' } } })

    // `AppConfig['b24ui']` does not declare `prefix`, though `getDefaultConfig`
    // writes it and `nuxt.options.app.rootAttrs` reads it back — a gap in the
    // module's types rather than in this assertion, so the read is widened
    // here rather than papered over by dropping the case.
    expect((b24ui as Record<string, unknown> | undefined)?.prefix).toBe('smoke')
    // Reached by `tv()` at render time to build twMerge's config; a `prefix`
    // that lands in one place and not the other is a live bug.
    expect(b24ui?.tv?.twMergeConfig?.prefix).toBe('smoke')
  })
})
