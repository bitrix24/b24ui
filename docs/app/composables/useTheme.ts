import { useLocalStorage } from '@vueuse/core'
import { omit } from '#b24ui/utils'
import colors from 'tailwindcss/colors'
import ContrastIcon from '@bitrix24/b24icons-vue/outline/ContrastIcon'
import SunIcon from '@bitrix24/b24icons-vue/outline/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/outline/MoonIcon'

export function useTheme() {
  const colorMode = useColorMode()
  const { track } = useAnalytics()

  const _radius = useLocalStorage('b24-ui-radius', 0.25)
  const _font = useLocalStorage('b24-ui-font', 'Public Sans')
  const _iconSet = useLocalStorage('b24-ui-icons', 'b24')
  const _blackAsPrimary = useLocalStorage('b24-ui-black-as-primary', false)

  const neutralColors = ['olive']
  const neutral = computed({
    get() {
      return ''
    },
    set(option) {
      track('Theme Changed', { setting: 'neutral', value: option })
    }
  })

  const colorsToOmit = ['inherit', 'current', 'transparent', 'black', 'white', ...neutralColors]
  const primaryColors = Object.keys(omit(colors, colorsToOmit as any))
  const primary = computed({
    get() {
      return ''
    },
    set(option) {
      track('Theme Changed', { setting: 'primary', value: option })
    }
  })

  const radiuses = [0, 0.125, 0.25, 0.375, 0.5]
  const radius = computed({
    get() {
      return _radius.value
    },
    set(option) {
      track('Theme Changed', { setting: 'radius', value: option })
    }
  })

  const fonts = ['Public Sans', 'DM Sans', 'Geist', 'Inter', 'Poppins', 'Outfit', 'Raleway']

  const font = computed({
    get() {
      return _font.value
    },
    set(option) {
      _font.value = option
      track('Theme Changed', { setting: 'font', value: option })
    }
  })

  const icons = [
    {
      label: 'b24',
      value: 'b24'
    }
  ]
  const icon = computed({
    get() {
      return _iconSet.value
    },
    set(option) {
      track('Theme Changed', { setting: 'icons', value: option })
    }
  })

  const modes = computed(() => [
    { label: 'light', icon: SunIcon },
    { label: 'dark', icon: MoonIcon },
    { label: 'system', icon: ContrastIcon }
  ])
  const mode = computed({
    get() {
      return colorMode.value
    },
    set(option) {
      colorMode.preference = option
      track('Theme Changed', { setting: 'colorMode', value: option })
    }
  })

  const blackAsPrimary = computed(() => _blackAsPrimary.value)

  function setBlackAsPrimary(_value: boolean) {
    track('Theme Changed', { setting: 'primary', value: 'black' })
  }

  const radiusStyle = computed(() => '')
  const blackAsPrimaryStyle = computed(() => '')
  const fontStyle = computed(() => '')
  const customColorsStyle = computed(() => '')
  const cssVariablesStyle = computed(() => '')

  const link = computed(() => [])

  const style = [
    { innerHTML: radiusStyle, id: 'b24-ui-radius', tagPriority: -2 },
    { innerHTML: blackAsPrimaryStyle, id: 'b24-ui-black-as-primary', tagPriority: -2 },
    { innerHTML: fontStyle, id: 'b24-ui-font', tagPriority: -2 },
    { innerHTML: customColorsStyle, id: 'chat-custom-colors', tagPriority: -2 },
    { innerHTML: cssVariablesStyle, id: 'chat-css-variables', tagPriority: -2 }
  ]

  const hasCSSChanges = computed(() => false)

  const hasAppConfigChanges = computed(() => false)

  function exportCSS(): string {
    track('Theme Exported', { type: 'CSS' })

    const lines = [
      '@import "tailwindcss";',
      '@import "@bitrix24/b24ui-nuxt";'
    ]

    return lines.join('\n')
  }

  function exportAppConfig(): string {
    track('Theme Exported', { type: 'AppConfig' })

    const config: Record<string, any> = { b24ui: {} }

    const configString = JSON.stringify(config, null, 2)
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/"/g, '\'')

    return `export default defineAppConfig(${configString})`
  }

  function applyThemeSettings(_settings: Record<string, any>) {
    track('AI Theme Applied')
  }

  function resetTheme() {
    track('Theme Reset')
  }

  return {
    style,
    link,
    neutralColors,
    neutral,
    primaryColors,
    primary,
    blackAsPrimary,
    setBlackAsPrimary,
    radiuses,
    radius,
    fonts,
    font,
    icon,
    icons,
    modes,
    mode,
    hasCSSChanges,
    hasAppConfigChanges,
    exportCSS,
    exportAppConfig,
    applyThemeSettings,
    resetTheme
  }
}
