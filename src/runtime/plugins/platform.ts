import { defineNuxtPlugin, useState, useRequestHeader, useHead } from '#imports'

/**
 * Plugin to detect the Bitrix24 mobile application environment.
 *
 * @description
 * 1. Analyzes the User-Agent on the server-side (SSR) or client-side.
 * 2. Establishes a reactive `platform` state using `useState`.
 * 3. Injects attributes into the `<html>` tag for styling:
 *    - `data-platform="bitrix-mobile" | "web"` -> triggers the `bitrix-mobile:` Tailwind variant.
 *    - `data-version="XX" | "air"`
 *
 * @example
 * // In CSS:
 * html[data-platform="bitrix-mobile"] .my-component { ... }
 *
 * @example
 * <!-- Template usage (Tailwind CSS v4) -->
 * <div class="hidden bitrix-mobile:block bitrix-mobile:bg-blue-600">
 *    Content visible only inside the Bitrix24 app
 * </div>
 *
 * @example
 * // Inside a Vue component:
 * const platform = useState('platform')
 * if (platform.value.name === 'bitrix-mobile') { ... }
 *
 * @todo add docs
 */
export default defineNuxtPlugin(() => {
  /**
   * Reactive platform state.
   * Prevents redundant User-Agent parsing during client-side navigation.
   */
  const platform = useState<{
    name?: 'web' | 'bitrix-mobile'
    version?: string
  }>('platform', () => ({}))

  // Perform parsing only if the platform name is not yet defined
  if (!platform.value?.name) {
    const ua = import.meta.server
      ? useRequestHeader('user-agent')
      : navigator.userAgent

    const match = ua?.match(/BitrixMobile\/Version=(\d+)/)

    if (match) {
      platform.value = {
        name: 'bitrix-mobile',
        version: match[1]
      }
    } else {
      platform.value = {
        name: 'web',
        version: 'air'
      }
    }
  }

  /**
   * Inject attributes into <htmlAttrs>.
   * Uses getter functions to ensure proper reactivity during hydration.
   */
  useHead({
    htmlAttrs: {
      'data-platform': () => platform.value.name,
      'data-version': () => platform.value.version
    }
  })
})
