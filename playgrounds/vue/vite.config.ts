import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from '@bitrix24/b24ui-nuxt/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    bitrix24UIPluginVite({
      colorModeTypeLight: 'edge-dark',
      b24ui: {},
      autoImport: {
        dirs: ['../nuxt/app/composables'],
        imports: ['vue']
      },
      components: {
        dirs: ['../nuxt/app/components']
      }
    })
  ]
})
