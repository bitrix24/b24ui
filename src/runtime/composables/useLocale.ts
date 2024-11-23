import { computed, inject, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { Locale } from '../types/locale'
import { buildLocaleContext } from '../utils/locale'
import en from '../locale/en'
import { createSharedComposable } from '@vueuse/core'

export const localeContextInjectionKey: InjectionKey<Ref<Locale | undefined>> = Symbol('bitrix24-ui.locale-context')

const _useLocale = (localeOverrides?: Ref<Locale | undefined>) => {
  const locale = localeOverrides || inject(localeContextInjectionKey, ref())!

  /**
   * If for some reason the developer does not use `UApp`, we get the language back just in case.
   */
  return buildLocaleContext(computed(() => locale.value || en))
}

export const useLocale = createSharedComposable(_useLocale)
