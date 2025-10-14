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

  const { store, system } = useColorModeVueUse({
    attribute: 'class',
    modes: {
      auto: 'auto',
      light: (appConfig?.colorModeTypeLight || 'light') as string,
      dark: 'dark'
    }
  })

  return {
    get preference() { return store.value === 'auto' ? 'system' : store.value },
    set preference(value) { store.value = value === 'system' ? 'auto' : value },
    get value() { return store.value === 'auto' ? system.value : store.value },
    forced: false
  }
}
