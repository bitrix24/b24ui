import { useState } from '#imports'
import { computed, readonly } from 'vue'
import { createSharedComposable, useMediaQuery } from '@vueuse/core'

/**
 * Breakpoints Tailwind
 */
const TAILWIND_BREAKPOINTS = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536
} as const

export type PlatformName = 'web' | 'bitrix-mobile' | 'bitrix-desktop'
export type ScreenSize = keyof typeof TAILWIND_BREAKPOINTS | 'xs'

/**
 * Device Reactivity: Platform and Screen Information
 * @see src/runtime/plugins/platform.ts
 */
const _useDevice = () => {
  // 1. Get or create the platform state (from the plugin)
  const platform = useState<{
    name?: PlatformName
    version?: string
  }>('platform', () => ({}))

  // Computed flags for the platform
  const isWeb = computed(() => platform.value.name === 'web')
  const isBitrixMobile = computed(() => platform.value.name === 'bitrix-mobile')
  const isBitrixDesktop = computed(() => platform.value.name === 'bitrix-desktop')

  // 2. Media queries for Tailwind breakpoints
  // For each breakpoint, create a ref<boolean> (it will be false on the server)
  const mediaQueries = {
    'sm': useMediaQuery(`(min-width: ${TAILWIND_BREAKPOINTS['sm']}px)`),
    'md': useMediaQuery(`(min-width: ${TAILWIND_BREAKPOINTS['md']}px)`),
    'lg': useMediaQuery(`(min-width: ${TAILWIND_BREAKPOINTS['lg']}px)`),
    'xl': useMediaQuery(`(min-width: ${TAILWIND_BREAKPOINTS['xl']}px)`),
    '2xl': useMediaQuery(`(min-width: ${TAILWIND_BREAKPOINTS['2xl']}px)`)
  }

  // 3. Convenient computed for screen sizes
  const screen = computed(() => {
    const sm = mediaQueries.sm.value
    const md = mediaQueries.md.value
    const lg = mediaQueries.lg.value
    const xl = mediaQueries.xl.value
    const xl2 = mediaQueries['2xl'].value

    let current: ScreenSize = 'xs'
    if (xl2) current = '2xl'
    else if (xl) current = 'xl'
    else if (lg) current = 'lg'
    else if (md) current = 'md'
    else if (sm) current = 'sm'
    else current = 'xs'

    return {
      current,
      'xs': !sm,
      sm,
      md,
      lg,
      xl,
      '2xl': xl2,
      'isMobile': !md,
      'isTablet': md && !lg,
      'isDesktop': lg,
      'isLargeDesktop': xl2
    }
  })

  return {
    // Platform data
    platform: readonly(platform),
    version: computed(() => platform.value.version),
    // Platform flags
    isWeb,
    isBitrixMobile,
    isBitrixDesktop,
    // Screen information
    screen
  }
}

export const useDevice = /* @__PURE__ */ createSharedComposable(_useDevice)
