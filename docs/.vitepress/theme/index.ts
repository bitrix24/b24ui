/**
 * This is custom theme
 * We change some css
 * @see node_modules/vitepress/dist/client/theme-default/index.js
 */
import { createRouter, createMemoryHistory } from 'vue-router'
import bitrix24UIPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'
import Layout from './components/ui/Layout.vue'
import ComponentShowExample from './components/ui/ComponentShowExample.vue'
import ComponentProps from './components/ui/ComponentProps.vue'
import ComponentSlots from './components/ui/ComponentSlots.vue'
import ComponentEmits from './components/ui/ComponentEmits.vue'
import Description from './components/ui/Description.vue'
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
