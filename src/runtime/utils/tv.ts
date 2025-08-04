import { createTV } from 'tailwind-variants'
// import { createTailwindMerge } from 'tailwind-merge'
import type { defaultConfig } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import appConfig from '#build/app.config'

const appConfigTv = appConfig as AppConfig & { b24ui: { tv: typeof defaultConfig } }

const customTwMerge = {
  cacheSize: 500,
  theme: {},
  orderSensitiveModifiers: [],
  conflictingClassGroupModifiers: {},
  classGroups: {
    'b24-context': [
      'context-light', 'context-dark',
      'context-edge-light', 'context-edge-dark'
    ],
    'b24-colors': [
      '--air-primary', '--air-primary-success', '--air-primary-alert', '--air-primary-copilot',
      '--air-secondary', '--air-secondary-alert', '--air-secondary-accent', '--air-secondary-accent-1', '--air-secondary-accent-2', '--air-secondary-no-accent',
      '--air-tertiary', '--air-tertiary-accent', '--air-tertiary-no-accent',
      '--air-selection', '--air-boost',
      '--old-style-default', '--old-style-danger', '--old-style-success',
      '--old-style-warning', '--old-style-primary', '--old-style-secondary',
      '--old-style-collab', '--old-style-ai'
    ]
  },
  conflictingClassGroups: {
    'b24-context': ['b24-context'],
    'b24-colors': ['b24-colors']
  }
}

export const tv = /* @__PURE__ */ createTV({
  ...(appConfigTv.b24ui?.tv || {}),
  twMerge: true,
  twMergeConfig: customTwMerge
})
