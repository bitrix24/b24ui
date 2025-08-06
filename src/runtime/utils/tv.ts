import { createTV } from 'tailwind-variants'
import type { defaultConfig } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import appConfig from '#build/app.config'

const appConfigTv = appConfig as AppConfig & { b24ui: { tv: typeof defaultConfig } }

const twMergeConfig = {
  theme: {},
  classGroups: {
    'b24-context': [
      'context-light', 'context-dark',
      'context-edge-light', 'context-edge-dark'
    ],
    'b24-colors': [
      // primary ////
      'air-primary', 'air-primary-inverted', // ---- ////
      'air-primary-success', 'air-primary-success-inverted',
      'air-primary-alert', 'air-primary-alert-inverted',
      'air-primary-copilot',
      'air-primary-warning',
      'air-primary-no-accent', 'air-primary-no-accent-inverted',
      // secondary ////
      'air-secondary',
      'air-secondary-alert',
      'air-secondary-accent', 'air-secondary-accent-1', 'air-secondary-accent-2',
      'air-secondary-no-accent', 'air-secondary-no-accent-1',
      // tertiary ////
      'air-tertiary',
      'air-tertiary-accent', 'air-tertiary-no-accent',
      // custom ////
      'air-selection', 'air-boost',
      // old ////
      'old-style-default', 'old-style-danger', 'old-style-success',
      'old-style-warning', 'old-style-primary', 'old-style-secondary',
      'old-style-collab', 'old-style-ai'
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
  twMergeConfig
})
