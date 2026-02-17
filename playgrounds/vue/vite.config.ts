import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import bitrix24UIPluginVite from '@bitrix24/b24ui-nuxt/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const extraAllowedHosts = (env?.VITE_ALLOWED_HOSTS?.split(',').map((s: string) => s.trim()).filter(Boolean)) ?? []
  return {
    plugins: [
      vue(),
      bitrix24UIPluginVite({
        // @memo set in playgrounds/vue/index.html too
        colorModeInitialValue: 'edge-dark',
        colorModeTypeLight: 'light',
        b24ui: {},
        autoImport: {
          dirs: ['../nuxt/app/composables'],
          imports: ['vue']
        },
        components: {
          dirs: ['../nuxt/app/components']
        }
      }),
      {
        name: 'global-post-to-get-rewriter',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.method === 'POST') {
              req.method = 'GET'
            }
            next()
          })
        }
      }
    ],
    server: {
      // Fix: "Blocked request. This host is not allowed" when using tunnels like ngrok
      allowedHosts: [...extraAllowedHosts]
    }
  }
})
