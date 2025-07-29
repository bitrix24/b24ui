import { defineNuxtPlugin, useHead } from '#imports'

/**
 * @memo Add b24ui version
 */
export default defineNuxtPlugin(() => {
  // Head
  useHead({
    meta: [{ name: 'b24ui', content: '__B24UI_VERSION__' }]
  })
})
