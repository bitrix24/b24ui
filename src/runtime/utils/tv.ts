import { createTV, type defaultConfig } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'

const appConfig = _appConfig as AppConfig & { b24ui: { tv: typeof defaultConfig } }

export const tv = createTV(appConfig.b24ui?.tv)
