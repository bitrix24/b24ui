import { createTV } from 'tailwind-variants'
import type { defaultConfig } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import appConfig from '#build/app.config'

const appConfigTv = appConfig as AppConfig & { b24ui: { tv: typeof defaultConfig } }

/**
 * @see src/runtime/air-design-tokens/008_ui_global.css
 */
const twMergeConfig = {
  theme: {},
  classGroups: {
    'b24-context': [
      'light', 'dark',
      'edge-light', 'edge-dark',
      'inherit', 'base-mode'
    ],
    'b24-colors': [
      // primary ////
      'style-filled', 'style-filled-inverted',
      'style-filled-success', 'style-filled-success-inverted',
      'style-filled-alert', 'style-filled-alert-inverted',
      'style-filled-copilot', 'style-filled-alert-inverted',
      'style-filled-warning', 'style-filled-warning-inverted',
      'style-filled-no-accent', 'style-filled-no-accent-inverted',
      // secondary ////
      'style-tinted',
      'style-tinted-alert',
      'style-outline', 'style-outline-accent-1', 'style-outline-accent-2',
      'style-outline-no-accent', 'style-tinted-no-accent-1',
      // tertiary ////
      'style-plain',
      'style-plain-accent', 'style-plain-no-accent',
      // custom ////
      'style-selection', 'style-filled-boost',
      // old ////
      'style-old-default', 'style-old-danger', 'style-old-success',
      'style-old-warning', 'style-old-primary', 'style-old-secondary',
      'style-old-collab', 'style-old-ai'
    ],
    'b24-bg': [
      'style-blurred-bg', 'style-blurred-bg-input', 'style-transparent-bg'
    ]
  },
  conflictingClassGroups: {
    'b24-context': ['b24-context'],
    'b24-colors': ['b24-colors'],
    'b24-bg': ['b24-bg']
  }
}

export const tv = /* @__PURE__ */ createTV({
  ...(appConfigTv.b24ui?.tv || {}),
  twMerge: true,
  twMergeConfig
})
