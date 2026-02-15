import { defineNuxtPlugin, useHead, useAppConfig } from '#imports'

/**
 * Add b24ui version
 */
export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()
  const version = (appConfig.version || '__B24UI_VERSION__') as string

  // Head
  useHead({
    meta: [{ name: 'b24ui', content: version }]
  })
})
