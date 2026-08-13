import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect, vi } from 'vitest'
import type { Nuxt } from '@nuxt/schema'
import type { ModuleOptions } from '../../src/module'
import { CSS_TEMPLATE_FILENAME, getTemplates, isCssTemplate, watchForComponentDetection } from '../../src/templates'
import { COMPONENT_DETECTION_EXTENSIONS } from '../../src/utils/components'

/**
 * The `experimental.componentDetection` dev watcher refreshes the generated CSS
 * template by filtering `updateTemplates` on a filename. That filename was
 * spelled twice — `b24ui.css` where the template is registered, upstream
 * nuxt/ui's `ui.css` in the watcher — and the halves drifted, so the watcher
 * silently updated nothing and components first used mid-session shipped
 * unstyled until the dev server restarted.
 *
 * Nothing about that is observable from the outside: `updateTemplates` with a
 * filter that matches zero templates is a successful call. So the two ends are
 * joined here — the predicate the watcher really hands to `updateTemplates`,
 * run against the templates the module really registers. Asserting
 * `isCssTemplate` against `getTemplates()` alone is not enough: that stays
 * green if the call site goes back to a hardcoded literal.
 */
describe('getTemplates', () => {
  const options = {} as ModuleOptions

  it('registers the css template under the shared filename constant', () => {
    const filenames = getTemplates(options).map(template => template.filename)

    expect(filenames).toContain(CSS_TEMPLATE_FILENAME)
  })

  it('writes that template to disk, which is what makes it importable as `#build/b24ui.css`', () => {
    const cssTemplate = getTemplates(options).find(isCssTemplate)

    expect(cssTemplate?.write).toBe(true)
  })
})

describe('watchForComponentDetection', () => {
  /** Captures the `builder:watch` handler the way Nuxt's hook system would. */
  function fakeNuxt() {
    const handlers: Array<(event: string, path: string) => unknown> = []
    const nuxt = {
      hook: (name: string, fn: (event: string, path: string) => unknown) => {
        if (name === 'builder:watch') {
          handlers.push(fn)
        }
      }
    } as unknown as Nuxt

    return { nuxt, fire: (path: string) => Promise.all(handlers.map(fn => fn('change', path))) }
  }

  it('passes a filter that selects exactly one real template', async () => {
    const update = vi.fn()
    const { nuxt, fire } = fakeNuxt()

    watchForComponentDetection(nuxt, update)
    await fire('app/components/Thing.vue')

    expect(update).toHaveBeenCalledTimes(1)

    // The whole bug: this filter used to match nothing. Run it against what the
    // module actually registers rather than against a literal.
    const { filter } = update.mock.calls[0]![0] as { filter: (t: { filename?: string }) => boolean }
    const matched = getTemplates({} as ModuleOptions).filter(filter)

    expect(matched.map(template => template.filename)).toEqual([CSS_TEMPLATE_FILENAME])
  })

  it('ignores changes to files that cannot affect component detection', async () => {
    const update = vi.fn()
    const { nuxt, fire } = fakeNuxt()

    watchForComponentDetection(nuxt, update)
    await fire('content/index.md')
    await fire('app/assets/css/main.css')

    expect(update).not.toHaveBeenCalled()
  })

  it('reacts to every source extension component detection scans', async () => {
    const update = vi.fn()
    const { nuxt, fire } = fakeNuxt()

    // Driven off the shared list rather than a literal: the watcher and the
    // scan glob are two halves of one decision, and an extension added to one
    // and not the other means a file that changes the answer never triggers a
    // refresh — no error, no signal. Upstream keeps a literal in each and had
    // to edit both when `.mts`/`.mjs`/`.cjs` were added.
    expect(COMPONENT_DETECTION_EXTENSIONS.length).toBeGreaterThan(4)

    watchForComponentDetection(nuxt, update)
    for (const extension of COMPONENT_DETECTION_EXTENSIONS) {
      await fire(`a.${extension}`)
    }

    expect(update).toHaveBeenCalledTimes(COMPONENT_DETECTION_EXTENSIONS.length)
  })

  it('shares that list with the scan glob instead of repeating it', () => {
    // The assertion above only proves the watcher matches the constant. If the
    // glob went back to a literal the two could drift apart again with every
    // test still green.
    const source = readFileSync(resolve(process.cwd(), 'src/utils/components.ts'), 'utf-8')

    expect(source).toMatch(/globSync\(\[`\*\*\/\*\.\{\$\{COMPONENT_DETECTION_EXTENSIONS\.join\(','\)\}\}`\]/)
  })
})
