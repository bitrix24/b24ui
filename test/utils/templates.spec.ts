import { describe, it, expect } from 'vitest'
import type { ModuleOptions } from '../../src/module'
import { CSS_TEMPLATE_FILENAME, getTemplates, isCssTemplate } from '../../src/templates'

/**
 * The `experimental.componentDetection` dev watcher refreshes the generated CSS
 * template by filtering `updateTemplates` on a filename. That filename was
 * spelled twice — `b24ui.css` where the template is registered, upstream
 * nuxt/ui's `ui.css` in the watcher — and the halves drifted, so the watcher
 * silently updated nothing and components first used mid-session shipped
 * unstyled until the dev server restarted.
 *
 * Nothing about that is observable from the outside: `updateTemplates` with a
 * filter that matches zero templates is a successful call. So the pairing is
 * asserted here instead — the predicate the watcher uses, run against the
 * templates the module really registers.
 */
describe('getTemplates', () => {
  const options = {} as ModuleOptions

  it('registers a template the dev watcher predicate matches', () => {
    const templates = getTemplates(options)

    expect(templates.filter(isCssTemplate)).toHaveLength(1)
  })

  it('registers it under the shared filename constant', () => {
    const filenames = getTemplates(options).map(template => template.filename)

    expect(filenames).toContain(CSS_TEMPLATE_FILENAME)
  })

  it('writes that template to disk, which is what makes it importable as `#build/b24ui.css`', () => {
    const cssTemplate = getTemplates(options).find(isCssTemplate)

    expect(cssTemplate?.write).toBe(true)
  })
})
