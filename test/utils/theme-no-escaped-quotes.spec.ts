import { describe, it, expect } from 'vitest'
import { defu } from 'defu'
import type { ModuleOptions } from '../../src/module'
import { getTemplates } from '../../src/templates'
import { defaultOptions } from '../../src/utils/defaults'

/**
 * Theme files are serialized into `.nuxt/b24ui/*.ts` with `JSON.stringify`, so a
 * class like `[&_[data-slot="itemLabel"]]:…` is written out as
 * `[&_[data-slot=\"itemLabel\"]]:…`. Tailwind's scanner extracts the candidate
 * with the backslashes still in it and emits a rule whose selector matches no
 * element in the DOM — the class is in every snapshot, the style never applies.
 *
 * The docs site hid this: it also `@source`s `src/`, where the unescaped form
 * lives. `dist/` ships neither, so a consumer only ever got the broken rule
 * (upstream nuxt/ui@5a04c6c fixed its instances; the fork's were the
 * `bitrix-mobile:` rules in `context-menu` and `dropdown-menu`).
 *
 * Checked against the generated templates rather than the theme sources: that
 * is the text the scanner actually reads, and it covers function themes and
 * the prose/content sets the same way.
 */
describe('generated theme templates', () => {
  const options = defu({ prose: true, content: true }, defaultOptions) as ModuleOptions
  const themes = getTemplates(options).filter(template => template.filename?.startsWith('b24ui/') && template.filename.endsWith('.ts'))

  it('covers every theme set', () => {
    const filenames = themes.map(template => template.filename)

    expect(filenames).toContain('b24ui/button.ts')
    expect(filenames).toContain('b24ui/prose/code.ts')
    expect(filenames.some(filename => filename!.startsWith('b24ui/content/'))).toBe(true)
  })

  it('contains no escaped double quotes', async () => {
    const offenders: string[] = []

    for (const template of themes) {
      const contents = await template.getContents!({} as any)

      for (const line of contents.split('\n')) {
        if (line.includes('\\"')) {
          offenders.push(`${template.filename}: ${line.trim()}`)
        }
      }
    }

    expect(offenders).toEqual([])
  })
})
