import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    testTimeout: 2500,
    globals: true,
    silent: true,
    include: [
      './test/components/**.spec.ts',
      './test/components/content/**.spec.ts',
      './test/components/prose/**.spec.ts'
    ],
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('test/nuxt/', import.meta.url))
      }
    },
    setupFiles: fileURLToPath(new URL('test/nuxt/setup.ts', import.meta.url))
  }
})
