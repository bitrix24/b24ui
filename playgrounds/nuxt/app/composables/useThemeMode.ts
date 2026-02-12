import { ref, computed, watch, nextTick } from 'vue'
import { useColorMode } from '#imports'

export const THEME_CLASSES = ['light', 'edge-dark', 'edge-light', 'dark'] as const
export type ThemeClass = typeof THEME_CLASSES[number]
export type LightThemeClass = Exclude<ThemeClass, 'dark'>
export function useThemeMode(initialLightMode: LightThemeClass = 'light') {
  const colorMode = useColorMode()

  const modeContext = ref<ThemeClass>(initialLightMode)

  const lastLightMode = ref<LightThemeClass>(initialLightMode)

  let isInternalUpdate = false
  function syncHtmlClass() {
    if (import.meta.client && typeof document !== 'undefined') {
      const htmlElement = document.documentElement
      THEME_CLASSES.forEach(themeClass => htmlElement.classList.remove(themeClass))
      htmlElement.classList.add(modeContext.value)
    }
  }

  function isDarkMode(mode: ThemeClass): boolean {
    return mode === 'dark'
  }

  watch(() => colorMode.preference, (newPreference) => {
    if (isInternalUpdate) return

    if (newPreference === 'dark') {
      if (!isDarkMode(modeContext.value)) {
        lastLightMode.value = modeContext.value as LightThemeClass
      }
      modeContext.value = 'dark'
    } else if (newPreference === 'light') {
      modeContext.value = lastLightMode.value
    }

    nextTick(() => {
      syncHtmlClass()
    })
  }, { immediate: true, flush: 'post' })

  watch(modeContext, (newMode) => {
    if (!isDarkMode(newMode)) {
      lastLightMode.value = newMode as LightThemeClass
    }

    nextTick(() => {
      syncHtmlClass()
    })
  }, { flush: 'post' })

  function syncColorModePreference() {
    isInternalUpdate = true

    if (isDarkMode(modeContext.value)) {
      colorMode.preference = 'dark'
    } else {
      colorMode.preference = 'light'
    }

    nextTick(() => {
      isInternalUpdate = false
    })
  }

  function toggleDarkMode() {
    if (isDarkMode(modeContext.value)) {
      modeContext.value = lastLightMode.value
      colorMode.preference = 'light'
    } else {
      lastLightMode.value = modeContext.value as LightThemeClass
      modeContext.value = 'dark'
      colorMode.preference = 'dark'
    }
  }

  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set(_isDark: boolean) {
      colorMode.preference = _isDark ? 'dark' : 'light'
    }
  })

  const themeItems = [...THEME_CLASSES]

  if (import.meta.client) {
    syncHtmlClass()
  }

  return {
    modeContext,
    lastLightMode,
    isDark,

    THEME_CLASSES,
    themeItems,

    syncHtmlClass,
    syncColorModePreference,
    toggleDarkMode,
    isDarkMode
  }
}
