import { defineNuxtPlugin, useHead, useAppConfig } from '#imports'
import type { ObjectPlugin } from 'nuxt/app'

/**
 * Add b24ui version
 *
 * Annotated rather than inferred: `nuxt-module-build`'s declaration emit cannot
 * name `ObjectPlugin` through pnpm's hashed `nuxt@x.y.z_<peers>` path, and fails
 * the build with TS2883. The annotation makes the emitted `.d.ts` independent of
 * how the peer graph happens to resolve.
 */
const plugin: ObjectPlugin = defineNuxtPlugin(() => {
  const appConfig = useAppConfig()
  const version = (appConfig.version || '__B24UI_VERSION__') as string

  // Head
  useHead({
    meta: [{ name: 'b24ui', content: version }]
  })
})

export default plugin
