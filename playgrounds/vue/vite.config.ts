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
        colorModeStorageKey: 'playground-vue',
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
    resolve: {
      // b24ui's `Link` renders vue-router's own `RouterLink`, which reads the
      // router through `inject(routerKey)`. `routerKey` is a module-level
      // Symbol, so two copies of vue-router in one bundle are two different
      // keys and the injection returns `undefined` — `RouterLink` then throws
      // `Cannot destructure property 'options'` on first render.
      //
      // That is the state this workspace is in: the playground depends on
      // vue-router 5.2.0, while the repo root gets 5.1.0 hoisted from nuxt, and
      // the b24ui runtime resolves from the root. Both ended up in the bundle
      // and the SPA threw on boot. Not visible to any unit test, and not
      // visible to a consumer either — the package declares vue-router as an
      // optional peer, so an installed copy is shared — which is exactly why it
      // survived here until something loaded the page in a browser (#329).
      dedupe: ['vue', 'vue-router']
    },

    server: {
      // Fix: "Blocked request. This host is not allowed" when using tunnels like ngrok
      allowedHosts: [...extraAllowedHosts]
    }
  }
})
