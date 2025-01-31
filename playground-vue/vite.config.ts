import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import bitrix24UIPluginVite from '../src/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      allow: ['..']
    }
  },
  plugins: [
    vue(),
    bitrix24UIPluginVite({
      b24ui: {},
      autoImport: {
        imports: ['vue']
      },
      components: {
        dirs: ['../playground/app/components']
      }
    })
  ],
  optimizeDeps: {
    // prevents reloading page when navigating between components
    include: ['reka-ui/namespaced', 'vaul-vue', 'embla-carousel-vue', 'embla-carousel-autoplay', 'embla-carousel-auto-scroll', 'embla-carousel-auto-height', 'embla-carousel-class-names', 'embla-carousel-fade', 'embla-carousel-wheel-gestures']
  }
})
