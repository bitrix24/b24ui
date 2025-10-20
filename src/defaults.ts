import { version } from '../package.json'

export const getDefaultUiConfig = () => ({})

export const defaultOptions = {
  colorMode: true,
  colorModeTypeLight: 'light' as const,
  version,
  mdc: true,
  content: false
}
