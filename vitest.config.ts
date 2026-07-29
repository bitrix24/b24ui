import { fileURLToPath } from 'node:url'
import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from './src/vite'
import { glob } from 'tinyglobby'

const components = await glob('./src/runtime/components/*.vue', { absolute: true })
const vueComponents = await glob('./src/runtime/vue/components/*.vue', { absolute: true })
const vueRouterOverrides = await glob('./src/runtime/vue/overrides/vue-router/*.vue', { absolute: true })

export default defineConfig({
  test: {
    testTimeout: 5000,
    globals: true,
    silent: true,
    resolveSnapshotPath(path, extension, { config }) {
      if (config.name === 'vue') {
        return path.replace(/\/([^/]+)\.spec\.ts$/, `/__snapshots__/$1-vue.spec.ts${extension}`)
      } else {
        return path.replace(/\/([^/]+)\.spec\.ts$/, `/__snapshots__/$1.spec.ts${extension}`)
      }
    },
    projects: [
      await defineVitestProject({
        extends: true,
        test: {
          name: 'nuxt',
          dir: './test',
          include: [
            'components/**/**.spec.ts',
            'composables/**.spec.ts',
            'utils/**/**.spec.ts'
          ],
          // Benchmarks run in the `vue` project only (happy-dom, faster); keep them
          // out of the nuxt project so a bare `vitest bench` doesn't double-run them.
          benchmark: { include: [] },
          environment: 'nuxt',
          environmentOptions: {
            nuxt: {
              rootDir: fileURLToPath(new URL('test/nuxt/', import.meta.url))
            }
          },
          setupFiles: fileURLToPath(new URL('test/nuxt/setup.ts', import.meta.url))
        }
      }),
      {
        extends: true,
        test: {
          name: 'vue',
          environment: 'happy-dom',
          dir: './test',
          include: [
            'components/**.spec.ts',
            'composables/**.spec.ts',
            'utils/**/**.spec.ts'
          ],
          benchmark: { include: ['bench/**/*.bench.ts'] },
          setupFiles: ['./test/utils/setup.ts']
        },
        plugins: [
          vue(),
          bitrix24UIPluginVite({ dts: false }),
          {
            name: 'bitrix24-ui-test:components',
            enforce: 'pre',
            resolveId(id) {
              if (id === '@nuxt/test-utils/runtime') {
                return fileURLToPath(new URL('test/utils/mount.ts', import.meta.url))
              }
            }
          },
          {
            name: 'bitrix24-ui-test:components',
            enforce: 'pre',
            resolveId(id) {
              if (id === '#components') {
                // Resolve to a `\0`-prefixed virtual id so Vite treats it as a
                // virtual module and doesn't reparse the `#` as a URL fragment.
                // Vite 8 turns a returned `#components` into `?import#components`
                // (empty pathname), which its builtin resolver then rejects.
                return '\0virtual:bitrix24-ui-components'
              }
            },
            load(id) {
              if (id === '\0virtual:bitrix24-ui-components') {
                const resolvedComponents = [...vueRouterOverrides, ...vueComponents, ...components]
                const renderedComponents = new Set<string>()
                return resolvedComponents.map((file) => {
                  const componentName = file.split('/').pop()!.replace('.vue', '')
                  if (renderedComponents.has(componentName)) {
                    return ''
                  }
                  renderedComponents.add(componentName)
                  return `export { default as B24${componentName} } from '${file}'`
                }).join('\n')
              }
            }
          }
        ]
      }
    ]
  }
})
