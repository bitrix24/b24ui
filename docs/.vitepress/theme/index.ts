/**
 * This is custom theme
 * We change some css
 * @see node_modules/vitepress/dist/client/theme-default/index.js
 */
import { ref, watch, toValue } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import bitrix24UIPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'
import Layout from './components/ui/Layout.vue'
import ComponentShowExample from './components/ui/ComponentShowExample.vue'
import ComponentProps from './components/ui/ComponentProps.vue'
import ComponentSlots from './components/ui/ComponentSlots.vue'
import ComponentEmits from './components/ui/ComponentEmits.vue'
import Description from './components/ui/Description.vue'
import Placeholder from './components/ui/Placeholder.vue'
import VPBadge from 'vitepress/dist/client/theme-default/components/VPBadge.vue'
import 'vitepress/dist/client/theme-default/styles/fonts.css'
import './tailwind.css'
// region ory theme ////
import './styles/components/custom-block.css'
import './styles/components/vp-code.css'
import './styles/components/vp-code-group.css'
import './styles/components/vp-doc.css'
import './styles/components/vp-sponsor.css'
// endregion ////
import './theme.css'

globalThis.useFetch = async (url: string, options: RequestInit & { params?: any, transform?: (data) => any } = {}) => {
  const data = ref()
  const status = ref('idle')
  async function _fetch() {
    status.value = 'loading'
    try {
      const params = options.params
        ? Object.fromEntries(
            Object.entries(options.params).map(([key, value]) => [key, toValue(value)])
          )
        : {}

      const queryString = new URLSearchParams(params as any).toString()
      const fullUrl = queryString ? `${url}?${queryString}` : url

      data.value = await fetch(fullUrl, options).then(r => r.json()).then(r => options.transform ? options.transform(r) : r)
      status.value = 'success'
    } catch (error) {
      console.error(error)
      status.value = 'error'
    }
  }
  _fetch()

  if (options?.params?.q) {
    watch(
      options.params.q,
      () => {
        _fetch()
      },
      { deep: true }
    )
  }

  return Promise.resolve({
    data,
    status
  })
}

export default {
  Layout,
  enhanceApp: async ({ app }) => {
    // region components ////
    app.component('Badge', VPBadge)
      .component('Description', Description)
      .component('ComponentShowExample', ComponentShowExample)
      .component('ComponentProps', ComponentProps)
      .component('ComponentSlots', ComponentSlots)
      .component('ComponentEmits', ComponentEmits)
      .component('Placeholder', Placeholder)
    // endregion ////

    if (!import.meta.env.SSR) {
      const router = createRouter({
        routes: [
          // { path: '', component: app }
        ],
        history: createMemoryHistory()
        // history: createWebHistory()
      })
      app.use(router)

      app.use(bitrix24UIPlugin)
    }
  }
}
