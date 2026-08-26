import { computed, inject, toRef } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import type { Locale, Messages } from '../types/locale'
import { buildLocaleContext } from '../utils/locale'
import en from '../locale/en'

/**
 * The app's active locale, provided by `<B24App>`.
 *
 * `Symbol.for` rather than `Symbol`: the key has to match across two copies of
 * the package, which is what happens when an app and a library both depend on
 * b24ui and the bundler does not dedupe them.
 */
export const localeContextInjectionKey: InjectionKey<Ref<Locale<unknown> | undefined>> = Symbol.for('bitrix24-ui.locale-context')

const _useLocale = (localeOverrides?: Ref<Locale<Messages> | undefined>) => {
  const locale = localeOverrides || toRef(inject<Locale<Messages>>(localeContextInjectionKey, en))

  return buildLocaleContext<Messages>(computed(() => locale.value || en))
}

/**
 * The active locale's messages and direction.
 *
 * Shared on the client and per-call on the server: a shared composable holds
 * one instance for the process, which on a server would leak one request's
 * locale into the next.
 *
 * @param localeOverrides Use a specific locale instead of the app's — for a
 *   subtree that renders in a fixed language.
 * @returns The locale context: `t()` for translation, plus `lang`, `code`,
 *   `dir` and the `locale` object itself.
 *
 * @see https://bitrix24.github.io/b24ui/docs/composables/define-locale/
 */
export const useLocale = /* @__PURE__ */ import.meta.client ? createSharedComposable(_useLocale) : _useLocale
