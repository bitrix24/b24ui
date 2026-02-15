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
        colorModeTypeLight: 'edge-dark',
        b24ui: {},
        autoImport: {
          dirs: ['../nuxt/app/composables'],
          imports: ['vue']
        },
        components: {
          dirs: ['../nuxt/app/components']
        }
      }),
    ],
    server: {
      // Fix: "Blocked request. This host is not allowed" when using tunnels like ngrok
      allowedHosts: [...extraAllowedHosts]
      // proxy: {
      //   '/': {
      //     target: `http://localhost:5173`,
      //     selfHandleResponse: true,
      //     configure: (proxy, _options) => {
      //       proxy.on('proxyReq', (_proxyReq, req, res) => {
      //         if (req.method === 'POST') {
      //           // const location = `https://${extraAllowedHosts[0]}`
      //           res.writeHead(303, { Location: req.url })
      //           res.end();
      //         }
      //       })
      //     }
      //   }
      // }
    }
  }
})
