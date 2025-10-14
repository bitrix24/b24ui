import { version } from '../package.json'

export const getDefaultUiConfig = () => ({})

export const defaultOptions = {
  colorMode: true,
  colorModeTypeLight: 'light' as const,
  version,
  mdc: false,
  content: true
}
