import { nextTick, ref, watch } from 'vue'
import { useColorMode } from '#imports'

export function useThemeMode() {
  const colorMode = useColorMode()
  const colorModel = ref<string>(colorMode?.colorModeInitialValue || 'light')
  const colorList = ref<string[]>([...(colorMode.modeKeysList || []).filter(key => key !== 'auto')])
  const lastLightModel = ref<string>('')

  if (isDarkMode(colorModel.value)) {
    lastLightModel.value = colorMode?.colorModeTypeLight || 'light'
  } else {
    lastLightModel.value = colorModel.value
  }

  function setLastLightModel(mode: string) {
    if (!isDarkMode(mode)) {
      lastLightModel.value = mode
    }
  }

  function isDarkMode(mode: string): boolean {
    return mode === 'dark'
  }

  function syncColorModePreference() {
    setLastLightModel(colorModel.value)

    if (isDarkMode(colorModel.value)) {
      colorMode.preference = 'dark'
    } else {
      colorMode.preference = colorModel.value
    }
  }

  function toggleDarkMode() {
    if (isDarkMode(colorModel.value)) {
      colorModel.value = lastLightModel.value
      colorMode.preference = colorModel.value
    } else {
      setLastLightModel(colorModel.value)
      colorModel.value = 'dark'
      colorMode.preference = 'dark'
    }
  }

  watch(() => colorMode.preference, (newPreference) => {
    if (newPreference === 'dark') {
      if (!isDarkMode(colorModel.value)) {
        setLastLightModel(colorModel.value)
      }
      colorModel.value = 'dark'
    } else if (newPreference === 'light') {
      colorModel.value = lastLightModel.value
    }

    nextTick(() => {
      colorMode.preference = colorModel.value
    })
  }, { immediate: true, flush: 'post' })

  colorMode.preference = colorModel.value

  return {
    colorList,
    colorModel,
    syncColorModePreference,
    toggleDarkMode
  }
}
