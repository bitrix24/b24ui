import { useColorMode as useColorModeVueUse } from '@vueuse/core'
import appConfig from '#build/app.config'

/**
 * `@vueuse/core` color-mode integration
 * @memo We not use `@nuxtjs/color-mode`
 */
export const useColorMode = () => {
  if (!appConfig.colorMode) {
    return {
      forced: true
    }
  }

  const colorModeTypeLight = (appConfig?.colorModeTypeLight || 'light') as string
  const colorModeInitialValue = (appConfig?.colorModeInitialValue || 'light') as string
  const modes = {
    'auto': 'auto',
    'light': colorModeTypeLight,
    'edge-dark': 'edge-dark',
    'edge-light': 'edge-light',
    'dark': 'dark'
  } as const

  const modeKeysList = Object.keys(modes) as (keyof typeof modes)[]
  const { store, system } = useColorModeVueUse({
    attribute: 'class',
    initialValue: colorModeInitialValue,
    modes
  })

  return {
    modeKeysList,
    colorModeInitialValue: colorModeInitialValue,
    colorModeTypeLight: colorModeTypeLight,
    get preference() { return store.value === 'auto' ? 'system' : store.value },
    set preference(value) { store.value = value === 'system' ? 'auto' : value },
    get value() { return store.value === 'auto' ? system.value : store.value },
    forced: false
  }
}
