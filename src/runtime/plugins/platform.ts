import { defineNuxtPlugin, useState, useRequestHeader, useHead } from '#imports'

/**
 * Plugin to detect the Bitrix24 mobile application environment.
 *
 * @description
 * 1. Analyzes the User-Agent on the server-side (SSR) or client-side.
 * 2. Establishes a reactive `platform` state using `useState`.
 * 3. Injects attributes into the `<html>` tag for styling:
 *    - `data-platform="bitrix-mobile" | "bitrix-desktop" | "web"`
 *    - `data-version="XX" | "XX.X.XX.XX" | "air"`
 *
 * @example
 * // In CSS:
 * html[data-platform="bitrix-mobile"] .my-component { ... }
 * html[data-platform="bitrix-desktop"] .my-component { ... }
 *
 * @example
 * <!-- Template usage (Tailwind) -->
 * <div class="hidden bitrix-mobile:block bitrix-mobile:bg-blue-600">
 *    Content visible only inside the Bitrix Mobile
 * </div>
 * <div class="hidden bitrix-desktop:block bitrix-desktop:bg-blue-600">
 *    Content visible only inside the Bitrix Desktop
 * </div>
 *
 * @example
 * // Inside a Vue component:
 * const platform = useState('platform')
 * if (platform.value.name === 'bitrix-mobile') { ... }
 * if (platform.value.name === 'bitrix-desktop') { ... }
 *
 * @todo add docs
 */
export default defineNuxtPlugin(() => {
  /**
   * Reactive platform state.
   * Prevents redundant User-Agent parsing during client-side navigation.
   */
  const platform = useState<{
    name?: 'web' | 'bitrix-mobile' | 'bitrix-desktop'
    version?: string
  }>('platform', () => ({}))

  // Perform parsing only if the platform name is not yet defined
  if (!platform.value?.name) {
    const ua = import.meta.server
      ? useRequestHeader('user-agent')
      : navigator.userAgent

    const matchBitrixMobile = ua?.match(/BitrixMobile\/Version=(\d+)/)
    const matchBitrixDesktop = ua?.match(/BitrixDesktop\/([\d.]+)/)
    if (matchBitrixMobile) {
      platform.value = {
        name: 'bitrix-mobile',
        version: matchBitrixMobile[1]
      }
    } else if (matchBitrixDesktop) {
      platform.value = {
        name: 'bitrix-desktop',
        version: matchBitrixDesktop[1]
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
