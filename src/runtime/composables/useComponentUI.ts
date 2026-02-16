import type { ComputedRef } from 'vue'
import type { ClassValue } from 'tailwind-variants'
import { computed } from 'vue'
import defu from 'defu'
import { createContext } from 'reka-ui'
import type { TVConfig } from '../types/tv'
import type * as b24ui from '#build/b24ui'
import { get } from '../utils'

type UIConfig = TVConfig<typeof b24ui>
type ExtractUISlots<C> = C extends { slots?: infer S } ? NonNullable<S> : never
type UIConfigSlots<T extends keyof UIConfig>
  = 'slots' extends keyof NonNullable<UIConfig[T]>
    ? ExtractUISlots<NonNullable<UIConfig[T]>>
    : { base?: ClassValue }

type ThemeSlotOverrides<T> = T extends { slots: infer S extends Record<string, any> }
  ? { [K in keyof S]?: ClassValue }
  : { [K in keyof T]?: T[K] extends Record<string, any> ? ThemeSlotOverrides<T[K]> : ClassValue }

export type ThemeUI = {
  [K in keyof typeof b24ui]?: ThemeSlotOverrides<(typeof b24ui)[K]>
}

export type ThemeRootContext = {
  b24ui: ComputedRef<ThemeUI>
}

const [injectThemeContext, provideThemeContext] = createContext<ThemeRootContext>('B24Theme', 'RootContext')

export { provideThemeContext }

type ComponentUIProps<T extends keyof UIConfig> = {
  b24ui?: UIConfigSlots<T>
}

export function useComponentUI<T extends keyof UIConfig>(name: T, props: ComponentUIProps<T>): ComputedRef<UIConfigSlots<T>>
export function useComponentUI(name: string, props: { b24ui?: any }): ComputedRef<any>
export function useComponentUI(name: string, props: { b24ui?: any }): ComputedRef<any> {
  const { b24ui } = injectThemeContext({ b24ui: computed(() => ({})) })

  return computed(() => {
    const themeOverrides = (get(b24ui.value, name as string) || {})

    return defu(props.b24ui ?? {}, themeOverrides)
  })
}
