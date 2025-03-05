import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from './src/vite'
import { defineConfig } from 'vitest/config'
import { glob } from 'tinyglobby'
import { resolve } from 'pathe'

const components = await glob('./src/runtime/components/*.vue', { absolute: true })
const prose = await glob('./src/runtime/prose/*.vue', { absolute: true })
const vueComponents = await glob('./src/runtime/vue/components/*.vue', { absolute: true })

export default defineConfig({
  test: {
    environment: 'happy-dom',
    silent: true,
    include: [
      './test/components/**.spec.ts',
      './test/components/content/**.spec.ts',
      './test/prose/**.spec.ts'
    ],
    setupFiles: ['./test/utils/setup.ts'],
    resolveSnapshotPath(path, extension) {
      return path.replace(/\/([^/]+)\.spec\.ts$/, `/__snapshots__/$1-vue.spec.ts${extension}`)
    }
  },
  plugins: [
    vue(),
    bitrix24UIPluginVite({ dts: false }),
    {
      name: 'bitrix24-ui-test:components',
      enforce: 'pre',
      resolveId(id) {
        if (id === '@nuxt/test-utils/runtime') {
          return resolve('./test/utils/mount')
        }
      }
    },
    {
      name: 'bitrix24-ui-test:components',
      enforce: 'pre',
      resolveId(id) {
        if (id === '#components') {
          return '#components'
        }
      },
      load(id) {
        if (id === '#components' || id === '?#components') {
          const resolvedComponents = [...vueComponents, ...components]
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
    },
    {
      name: 'bitrix24-ui-test:components',
      enforce: 'pre',
      resolveId(id) {
        if (id === '#prose') {
          return '#prose'
        }
      },
      load(id) {
        if (id === '#prose' || id === '?#prose') {
          const resolvedComponents = [...prose]
          const renderedComponents = new Set<string>()
          return resolvedComponents.map((file) => {
            const componentName = file.split('/').pop()!.replace('.vue', '')
            if (renderedComponents.has(componentName)) {
              return ''
            }
            renderedComponents.add(componentName)
            return `export { default as ${componentName} } from '${file}'`
          }).join('\n')
        }
      }
    }
  ]
})
