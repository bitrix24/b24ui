import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from '@bitrix24/b24ui-nuxt/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    bitrix24UIPluginVite({
      b24ui: {},
      autoImport: {
        dirs: ['../nuxt/app/composables'],
        imports: ['vue']
      },
      components: {
        dirs: ['../nuxt/app/components']
      }
    })
  ],
  optimizeDeps: {
    // prevents reloading page when navigating between components
    include: ['@unhead/vue/client', '@internationalized/date', '@vueuse/shared', '@vueuse/integrations/useFuse', '@tanstack/vue-table', 'reka-ui', 'reka-ui/namespaced', 'embla-carousel-vue', 'embla-carousel-autoplay', 'embla-carousel-auto-scroll', 'embla-carousel-auto-height', 'embla-carousel-class-names', 'embla-carousel-fade', 'embla-carousel-wheel-gestures', 'colortranslator', 'tailwindcss/colors', 'tailwind-variants', 'ufo', 'zod', 'vaul-vue']
  }
})
