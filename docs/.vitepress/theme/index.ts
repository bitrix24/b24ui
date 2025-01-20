// https://vitepress.dev/guide/custom-theme
import DynamicLayout from '~/.vitepress/theme/components/ui/DynamicLayout.vue'
import ProseTable from '~/.vitepress/theme/components/prose/ProseTable.vue'
import ProseThead from '~/.vitepress/theme/components/prose/ProseThead.vue'
import ProseTr from '~/.vitepress/theme/components/prose/ProseTr.vue'
import ProseTh from '~/.vitepress/theme/components/prose/ProseTh.vue'
import ProseTbody from '~/.vitepress/theme/components/prose/ProseTbody.vue'
import ProseTd from '~/.vitepress/theme/components/prose/ProseTd.vue'
import ProseCode from '~/.vitepress/theme/components/prose/ProseCode.vue'
import ProseData from '~/.vitepress/theme/components/prose/ProseData.vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import ComponentProps from '~/.vitepress/theme/components/ui/ComponentProps.vue'
import ComponentSlots from '~/.vitepress/theme/components/ui/ComponentSlots.vue'
import ComponentEmits from '~/.vitepress/theme/components/ui/ComponentEmits.vue'
import Description from '~/.vitepress/theme/components/ui/Description.vue'
// import { createRouter, createWebHistory } from 'vue-router' ////
// import bitrix24UIPlugin from '@bitrix24/b24ui-nuxt/vue-plugin' ////
import './tailwind.frame.css'
import './tailwind.post.css'

export default {
  Layout: DynamicLayout,
  enhanceApp({ app }) {
    // region components ////
    app.component('Description', Description)
      .component('ComponentShowExample', ComponentShowExample)
      .component('ComponentProps', ComponentProps)
      .component('ComponentSlots', ComponentSlots)
      .component('ComponentEmits', ComponentEmits)
      .component('ProseTable', ProseTable)
      .component('ProseThead', ProseThead)
      .component('ProseTr', ProseTr)
      .component('ProseTh', ProseTh)
      .component('ProseTbody', ProseTbody)
      .component('ProseTd', ProseTd)
      .component('ProseCode', ProseCode)
      .component('ProseData', ProseData)
    // endregion ////

    /**
     * @memo not use router -> problem for build.
     * @memo no router -> no plugin
     */
    /*
      const router = createRouter({
        routes: [],
        history: createWebHistory()
      })
      app.use(router)
      app.use(bitrix24UIPlugin)
     */
  }
}
