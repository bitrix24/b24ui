import { ref, onScopeDispose } from 'vue'
import type { Ref, Plugin as VuePlugin } from 'vue'
import { createHooks } from 'hookable'
import type { NuxtApp } from '#app'

export { injectHead, useHead } from '@unhead/vue'

export { useAppConfig } from '../composables/useAppConfig'
export { defineShortcuts } from '../../composables/defineShortcuts'
export { defineLocale } from '../../composables/defineLocale'
export { useLocale } from '../../composables/useLocale'
export { useConfetti } from '../../composables/useConfetti'
export { useOverlay } from '../../composables/useOverlay'
export { useColorMode } from '../../composables/color-mode/useColorMode'

export const clearError = () => {

}

/**
 * @memo Use this in plugin to detect the bitrix24 mobile application environment.
 */
export const useRequestHeader = () => {
  return undefined
}

export const useCookie = <T = string>(
  _name: string,
  _options: Record<string, any> = {}
) => {
  const value = ref(_options?.default?.() ?? null) as Ref<T>

  return {
    value: value.value,
    get: () => value.value,
    set: () => {},
    update: () => {},
    refresh: () => Promise.resolve(value.value),
    remove: () => {}
  }
}

const state: Record<string, any> = {}

export const useState = <T>(key: string, init: () => T): Ref<T> => {
  if (state[key]) {
    return state[key] as Ref<T>
  }
  const value = ref(init())
  state[key] = value
  return value as Ref<T>
}

const hooks = createHooks()

export function useNuxtApp() {
  return {
    isHydrating: true,
    payload: { serverRendered: import.meta.env.SSR || false },
    hooks,
    hook: hooks.hook
  }
}

/**
 * Nuxt's `onNuxtReady` runs its callback once the app has hydrated and the
 * browser is next idle. A plain Vue app has no hydration to wait for, so only
 * the idle half is left — which is the half callers want, since this is how
 * work is kept out of the mount path.
 *
 * Here even though no Vue build ever calls it. `Link.vue` imports it from
 * `#imports` unconditionally and calls it only behind `prefetchApi`, which is
 * `undefined` without `NuxtLink`. An import that is never called still has to
 * resolve: rolldown fails the whole bundle on a missing export, and that is how
 * this came to be written — `pnpm repl:build` broke on `main` while `ci` was
 * green, because nothing in `ci` builds against these stubs.
 */
export function onNuxtReady(callback: () => void): void {
  if (typeof window === 'undefined') {
    return
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => callback())
    return
  }

  setTimeout(callback, 1)
}

export function useRuntimeHook(name: string, fn: (...args: any[]) => void): void {
  const nuxtApp = useNuxtApp()

  const unregister = nuxtApp.hook(name, fn)

  onScopeDispose(unregister)
}

export const useRuntimeConfig = () => {
  return {
    app: {
      baseURL: '/'
    },
    public: {}
  }
}

export function defineNuxtPlugin(plugin: (nuxtApp: NuxtApp) => void) {
  return {
    install(app) {
      app.runWithContext(() => plugin({ vueApp: app } as NuxtApp))
    }
  } satisfies VuePlugin
}
