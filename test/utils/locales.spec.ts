import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { generateI18nPlugin, getLocaleTags, resolveLocaleKey } from '../../src/utils/locales'

const tags = getLocaleTags(resolve(process.cwd(), 'src/runtime/locale'))

describe('i18n plugin', () => {
  it('reads the declared tag of every locale file', () => {
    expect(tags).toMatchObject({ br: 'pt-BR', en: 'en', kz: 'kk', la: 'es', sc: 'zh-CN', tc: 'zh-TW', ua: 'uk', vn: 'vi' })
  })

  it.each([
    ['fr', 'fr'],
    ['pt-BR', 'br'],
    ['pt', 'br'],
    ['en-US', 'en'],
    ['es-MX', 'la'],
    ['uk', 'ua'],
    ['kk', 'kz'],
    ['vi', 'vn'],
    ['hi', 'in'],
    [{ code: 'en', language: 'en-GB' }, 'en'],
    [{ code: 'zh-Hant', language: 'zh-TW' }, 'tc'],
    [{ code: 'cn', language: 'zh-CN' }, 'sc'],
    // b24ui's short codes are not language tags: `la` is Latin, `in` is not Hindi
    ['la', undefined],
    ['zh', undefined],
    ['xx', undefined]
  ])('resolves %j to %s', (locale, key) => {
    expect(resolveLocaleKey(locale, tags)).toBe(key)
  })

  it('imports only the configured locales', () => {
    const contents = generateI18nPlugin(['en', { code: 'fr' }, { code: 'pt-BR', language: 'pt-BR' }, 'en-US', 'xx'], tags, '/runtime')

    expect(contents).toMatchInlineSnapshot(`
      "import { computed, unref } from "vue";
      import { defineNuxtPlugin } from "#app/nuxt";
      import { localeContextInjectionKey } from "/runtime/composables/useLocale";
      import en from "/runtime/locale/en";
      import fr from "/runtime/locale/fr";
      import br from "/runtime/locale/br";
      const locales = {
        en: en,
        fr: fr,
        "pt-BR": br,
        "en-US": en
      }
      export default defineNuxtPlugin((nuxtApp) => {
        nuxtApp.vueApp.provide(localeContextInjectionKey, computed(() => locales[unref(nuxtApp.$i18n?.locale)]))
      })"
    `)
  })
})
