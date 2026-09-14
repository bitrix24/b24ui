import { defu } from 'defu'
import type { Locale, Direction } from '../types/locale'
import type { DeepPartial } from '../types/utils'

interface DefineLocaleOptions<M> {
  name: string
  code: string
  locale: string
  dir?: Direction
  messages: M
}

/**
 * Builds a `Locale` from a name, a language code and a message table.
 *
 * The one thing it adds over the object literal is `dir`, which defaults to
 * `'ltr'` — so a locale definition only mentions direction when it is `'rtl'`.
 *
 * @param options `name` as it is shown to a reader, `code` for `<html lang>`,
 *   `locale` for `Intl` formatting, `messages`, and `dir` when not `'ltr'`.
 * @returns The locale, ready to pass to `<B24Locale>` or `extendLocale`.
 *
 * @see https://bitrix24.github.io/b24ui/docs/composables/define-locale/
 *
 * @example
 * ```ts
 * export default defineLocale({
 *   name: 'Español',
 *   code: 'es',
 *   locale: 'es-ES',
 *   messages: { inputMenu: { noMatch: 'Sin coincidencias' } }
 * })
 * ```
 */
/* @__NO_SIDE_EFFECTS__ */
export function defineLocale<M>(options: DefineLocaleOptions<M>): Locale<M> {
  return defu<DefineLocaleOptions<M>, [{ dir: Direction }]>(options, { dir: 'ltr' })
}

/**
 * Overrides part of an existing locale, keeping everything not mentioned.
 *
 * Merged deeply, so a single string can be replaced without restating the
 * table around it — which is the point: a shipped locale gains messages
 * between releases, and a copy would silently miss them.
 *
 * @param locale The locale to start from.
 * @param options The subset to override. Every field is optional and nested
 *   `messages` are merged, not replaced.
 * @returns A new locale. Neither argument is mutated.
 *
 * @see https://bitrix24.github.io/b24ui/docs/composables/extend-locale/
 *
 * @example
 * ```ts
 * export default extendLocale(en, {
 *   messages: { inputMenu: { noMatch: 'Nothing here' } }
 * })
 * ```
 */
/* @__NO_SIDE_EFFECTS__ */
export function extendLocale<M>(locale: Locale<M>, options: Partial<DefineLocaleOptions<DeepPartial<M>>>): Locale<M> {
  return defu<Locale<M>, [DefineLocaleOptions<M>]>(options, locale)
}
