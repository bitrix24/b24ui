import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import * as locales from '../../src/runtime/locale'
import en from '../../src/runtime/locale/en'
import type { Locale, Messages } from '../../src/runtime/types/locale'

/**
 * Structural checks over the locale set.
 *
 * Ported from nuxt/ui `387ce9a`, minus its CLDR half. Upstream validates every
 * `code` against CLDR — that cannot run here, because b24ui's codes are
 * **Bitrix24 portal language codes**, not ISO 639-1 (see the `e333e8d` and
 * `80cad10` entries in `.sync/`). Four of ours (`kz`, `tc`, `ua`, `vn`) are
 * unknown to CLDR, and five more resolve to an entirely different language:
 * `br` is Breton to CLDR but Português (Brasil) here, `la` is Latin but
 * Español, `sc` is Sardinian but 中文（简体）, `in` is deprecated-Indonesian but
 * हिन्दी. A CLDR assertion would fail on the first four and, worse, pass on
 * the other five while asserting the wrong language.
 *
 * What survives is everything that does not depend on the code being an ISO
 * tag — and that includes the check with the most value here: placeholders
 * matching `en`. A placeholder whose casing or spelling drifts (`{Slide}` for
 * `{slide}`) fails silently at runtime, rendering the literal token to the
 * user. That class of bug was audited by hand when `10ec237` was processed;
 * this makes it a gate.
 */

const localeDir = resolve(process.cwd(), 'src/runtime/locale')
const files = readdirSync(localeDir)
  .filter(file => file.endsWith('.ts') && file !== 'index.ts')
  .map(file => file.replace(/\.ts$/, ''))
const entries = Object.entries(locales) as [string, Locale<Messages>][]

function flatten(messages: object, prefix = '', result: Record<string, string> = {}): Record<string, string> {
  for (const [key, value] of Object.entries(messages)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object') {
      flatten(value, path, result)
    } else {
      result[path] = value
    }
  }
  return result
}

function placeholders(message: string): string {
  return [...message.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort().join(',')
}

const enMessages = flatten(en.messages)

describe('locales', () => {
  it('exports every locale file from the index under its filename', () => {
    expect(Object.keys(locales).sort()).toEqual(files.sort())
  })

  it('has a unique code per locale', () => {
    const codes = entries.map(([, locale]) => locale.code)
    expect(new Set(codes).size).toBe(codes.length)
  })

  describe.each(entries)('%s', (key, locale) => {
    it('has a code matching its filename', () => {
      expect(locale.code).toBe(key.toLowerCase())
    })

    it('has a direction', () => {
      // `defineLocale` defaults to `ltr`, so this is never undefined — it is
      // here to catch a typo in an explicit one (only `ar` sets it today).
      expect(locale.dir).toMatch(/^(?:ltr|rtl)$/)
    })

    it('has the exact same message keys as en', () => {
      expect(Object.keys(flatten(locale.messages)).sort()).toEqual(Object.keys(enMessages).sort())
    })

    it('has no empty message', () => {
      for (const [path, message] of Object.entries(flatten(locale.messages))) {
        expect(message?.trim(), path).toBeTruthy()
      }
    })

    it('has the same placeholders as en in every message', () => {
      const messages = flatten(locale.messages)
      for (const [path, message] of Object.entries(enMessages)) {
        expect(placeholders(messages[path]!), path).toBe(placeholders(message))
      }
    })
  })
})
