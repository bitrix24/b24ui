import { readdirSync, readFileSync } from 'node:fs'
import { genImport, genObjectFromRawEntries } from 'knitwork'
import { join } from 'pathe'

/**
 * A locale as `@nuxtjs/i18n` lists it in `i18n.locales`: a bare code, or an
 * object whose `language` (a BCP 47 tag) is preferred over its `code`.
 */
export type I18nLocale = string | { code: string, language?: string }

/**
 * Reads the b24ui locale files and maps each export key to the language tag it
 * declares in its `locale` field.
 *
 * The keys are b24ui's own short codes (`br`, `kz`, `sc`, `tc`, `ua`, `vn`, …)
 * and are not BCP 47 tags — `in` would read as Indonesian and `la` as Latin —
 * so matching goes through the declared tag (`pt-BR`, `kk`, `zh-CN`, …) instead.
 *
 * @param localeDir - The `runtime/locale` directory.
 * @returns `{ [key]: tag }`, e.g. `{ br: 'pt-BR', en: 'en' }`.
 */
export function getLocaleTags(localeDir: string): Record<string, string> {
  const tags: Record<string, string> = {}

  for (const file of readdirSync(localeDir)) {
    const key = file.match(/^([a-z_]+)\.[jt]s$/)?.[1]
    if (!key || key === 'index') {
      continue
    }

    const tag = readFileSync(join(localeDir, file), 'utf8').match(/^\s*locale:\s*['"]([^'"]+)['"]/m)?.[1]
    if (tag) {
      tags[key] = tag
    }
  }

  return tags
}

function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/-/g, '_')
}

/**
 * Finds the b24ui locale for an `@nuxtjs/i18n` locale: its `language`, then its
 * `code`, then their base language (`en-US` → `en`), and finally a base
 * language that has a single regional b24ui locale (`pt` → `br`, `hi` → `in`).
 *
 * @param locale - The `@nuxtjs/i18n` locale.
 * @param tags - The map returned by `getLocaleTags`.
 * @returns The b24ui locale key, or `undefined` when nothing matches.
 */
export function resolveLocaleKey(locale: I18nLocale, tags: Record<string, string>): string | undefined {
  const requested = (typeof locale === 'string' ? [locale] : [locale.language, locale.code]).filter((tag): tag is string => !!tag)
  const candidates = [...requested, ...requested.map(tag => tag.split(/[-_]/)[0]!)].map(normalizeTag)
  const entries = Object.entries(tags).map(([key, tag]) => [key, normalizeTag(tag)] as const)

  for (const candidate of candidates) {
    const match = entries.find(([, tag]) => tag === candidate)
    if (match) {
      return match[0]
    }
  }

  // A language with a single regional locale (`zh` has two and stays unmatched)
  for (const candidate of candidates) {
    const regional = entries.filter(([, tag]) => tag.startsWith(`${candidate}_`))
    if (regional.length === 1) {
      return regional[0]![0]
    }
  }
}

/**
 * Generates the Nuxt plugin that provides the b24ui locale matching the
 * current `@nuxtjs/i18n` locale. Only the matched locales are imported, so the
 * others stay out of the bundle.
 *
 * @param locales - `i18n.locales` as resolved by `@nuxtjs/i18n`.
 * @param tags - The map returned by `getLocaleTags`.
 * @param runtimeDir - The module's `runtime` directory.
 * @returns The plugin source.
 */
export function generateI18nPlugin(locales: I18nLocale[], tags: Record<string, string>, runtimeDir: string): string {
  const imports = new Set<string>()
  const entries: [string, string][] = []

  for (const locale of locales) {
    const key = resolveLocaleKey(locale, tags)
    if (!key) {
      continue
    }

    imports.add(key)
    entries.push([typeof locale === 'string' ? locale : locale.code, key])
  }

  return [
    genImport('vue', ['computed', 'unref']),
    genImport('#app/nuxt', ['defineNuxtPlugin']),
    genImport(join(runtimeDir, 'composables/useLocale'), ['localeContextInjectionKey']),
    ...[...imports].map(key => genImport(join(runtimeDir, 'locale', key), key)),
    `const locales = ${genObjectFromRawEntries(entries)}`,
    `export default defineNuxtPlugin((nuxtApp) => {`,
    `  nuxtApp.vueApp.provide(localeContextInjectionKey, computed(() => locales[unref(nuxtApp.$i18n?.locale)]))`,
    `})`
  ].join('\n')
}
