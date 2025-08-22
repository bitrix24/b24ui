import { defineNuxtPlugin, useHead, useAppConfig } from '#imports'

/**
 * @memo Add b24ui version
 */
export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()
  const version = appConfig.b24ui?.version || '__B24UI_VERSION__'

  // Head
  useHead({
    meta: [{ name: 'b24ui', content: version }]
  })
})
