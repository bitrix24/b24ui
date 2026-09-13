import type { Ref, MaybeRef } from 'vue'
import type { Locale, Direction } from '../types/locale'
import { computed, isRef, ref, unref } from 'vue'
import { get } from './index'

export type TranslatorOption = Record<string, string | number>
export type Translator = (path: string, option?: TranslatorOption) => string
export type LocaleContext<M> = {
  locale: Ref<Locale<M>>
  lang: Ref<string>
  dir: Ref<Direction>
  code: Ref<string>
  t: Translator
}

/**
 * Binds a `t()` to a locale that may still change — the ref is read on every
 * call, so switching language re-renders without rebuilding the translator.
 */
export function buildTranslator<M>(locale: MaybeRef<Locale<M>>): Translator {
  return (path, option) => translate(path, option, unref(locale))
}

/**
 * Looks up `messages.<path>` in a locale and fills its `{placeholders}`.
 *
 * A missing message falls back to the path itself, and a placeholder with no
 * value is left as written — both so a gap shows up in the interface as the
 * key that is missing rather than as an empty space.
 *
 * @param path Dotted message key, without the `messages.` prefix.
 * @param option Values for the `{placeholders}` in the message.
 * @param locale The locale to read from.
 */
export function translate<M>(path: string, option: undefined | TranslatorOption, locale: Locale<M>): string {
  const prop: string = get(locale, `messages.${path}`, path)

  return prop.replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  )
}

/**
 * Assembles what `useLocale()` hands back: a bound `t()` plus reactive `lang`,
 * `code`, `dir` and the `locale` itself.
 */
export function buildLocaleContext<M>(locale: MaybeRef<Locale<M>>): LocaleContext<M> {
  const lang = computed(() => unref(locale).name)
  const code = computed(() => unref(locale).code)
  const dir = computed(() => unref(locale).dir)
  const localeRef = isRef(locale) ? locale : ref(locale) as Ref<Locale<M>>

  return {
    lang,
    code,
    dir,
    locale: localeRef,
    t: buildTranslator(locale)
  }
}
