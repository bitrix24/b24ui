import { version } from '../package.json'

export const getDefaultUiConfig = () => ({})

export const defaultOptions = {
  colorMode: true,
  colorModeTypeLight: 'light',
  version,
  mdc: false,
  content: true
}
