import type { Plugin } from 'vue'

export default {
  install(app, options) {
    if (options?.router && typeof options.router === 'function') {
      app.provide('bitrix24ui:router', options.router)
    }
  }
} satisfies Plugin
