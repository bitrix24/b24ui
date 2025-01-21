/**
 * This is custom theme
 * We change some css
 * @see node_modules/vitepress/dist/client/theme-default/index.js
 */
// import { createRouter, createWebHistory } from 'vue-router' ////
// import bitrix24UIPlugin from '@bitrix24/b24ui-nuxt/vue-plugin' ////
// import Layout from 'vitepress/dist/client/theme-default/Layout.vue'
import DynamicLayout from './components/ui/DynamicLayout.vue'
import ProseTable from './components/prose/ProseTable.vue'
import ProseThead from './components/prose/ProseThead.vue'
import ProseTr from './components/prose/ProseTr.vue'
import ProseTh from './components/prose/ProseTh.vue'
import ProseTbody from './components/prose/ProseTbody.vue'
import ProseTd from './components/prose/ProseTd.vue'
import ProseCode from './components/prose/ProseCode.vue'
import ProseData from './components/prose/ProseData.vue'
import ComponentShowExample from './components/ui/ComponentShowExample.vue'
import ComponentProps from './components/ui/ComponentProps.vue'
import ComponentSlots from './components/ui/ComponentSlots.vue'
import ComponentEmits from './components/ui/ComponentEmits.vue'
import Description from './components/ui/Description.vue'
import VPBadge from 'vitepress/dist/client/theme-default/components/VPBadge.vue'

import './tailwind.css'
// region ory theme ////
import 'vitepress/dist/client/theme-default/styles/fonts.css'
import './styles/vars.css'
import './styles/base.css'
import './styles/icons.css'
import './styles/utils.css'
import './styles/components/custom-block.css'
import './styles/components/vp-code.css'
import './styles/components/vp-code-group.css'
import './styles/components/vp-doc.css'
import './styles/components/vp-sponsor.css'
// endregion ////
import './theme.css'


export { default as VPBadge } from 'vitepress/dist/client/theme-default/components/VPBadge.vue'
export { default as VPImage } from 'vitepress/dist/client/theme-default/components/VPImage.vue'
export { default as VPButton } from 'vitepress/dist/client/theme-default/components/VPButton.vue'
export { default as VPHomeContent } from 'vitepress/dist/client/theme-default/components/VPHomeContent.vue'
export { default as VPHomeHero } from 'vitepress/dist/client/theme-default/components/VPHomeHero.vue'
export { default as VPHomeFeatures } from 'vitepress/dist/client/theme-default/components/VPHomeFeatures.vue'
export { default as VPHomeSponsors } from 'vitepress/dist/client/theme-default/components/VPHomeSponsors.vue'
export { default as VPLink } from 'vitepress/dist/client/theme-default/components/VPLink.vue'
export { default as VPDocAsideSponsors } from 'vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue'
export { default as VPSocialLink } from 'vitepress/dist/client/theme-default/components/VPSocialLink.vue'
export { default as VPSocialLinks } from 'vitepress/dist/client/theme-default/components/VPSocialLinks.vue'
export { default as VPSponsors } from 'vitepress/dist/client/theme-default/components/VPSponsors.vue'
export { default as VPTeamPage } from 'vitepress/dist/client/theme-default/components/VPTeamPage.vue'
export { default as VPTeamPageTitle } from 'vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue'
export { default as VPTeamPageSection } from 'vitepress/dist/client/theme-default/components/VPTeamPageSection.vue'
export { default as VPTeamMembers } from 'vitepress/dist/client/theme-default/components/VPTeamMembers.vue'
export { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar'
export { useLocalNav } from 'vitepress/dist/client/theme-default/composables/local-nav'


export default {
  Layout: DynamicLayout,
  enhanceApp({ app }) {
    // region components ////
    app.component('Badge', VPBadge)
      .component('Description', Description)
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
