import { version } from '../../package.json'
// import { pick } from '../runtime/utils'
import type { ModuleOptions } from '../module'

export function resolveColors() {
  return []
}

export function getDefaultConfig(theme?: ModuleOptions['theme']) {
  return {
    prefix: theme?.prefix,
    tv: {
      twMergeConfig: {
        prefix: theme?.prefix
      }
    }
  }
}

export const defaultOptions = {
  colorMode: true,
  colorModeInitialValue: 'light' as const,
  colorModeTypeLight: 'light' as const,
  version,
  mdc: true,
  content: false
}
