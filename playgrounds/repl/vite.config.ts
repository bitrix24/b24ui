import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from '@bitrix24/b24ui-nuxt/vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/b24ui/play/' : '/',
  plugins: [
    vue(),
    bitrix24UIPluginVite({
      router: false,
      autoImport: {
        imports: ['vue']
      }
    })
  ],
  optimizeDeps: {
    exclude: ['@vue/repl']
  },
  build: {
    outDir: resolve(__dirname, 'dist')
  }
})
