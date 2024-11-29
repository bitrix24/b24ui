// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './tailwind.post.css'
import ComponentExample from '~/.vitepress/theme/components/ui/ComponentExample.vue'
import ComponentProps from '~/.vitepress/theme/components/ui/ComponentProps.vue'
import ComponentSlots from '~/.vitepress/theme/components/ui/ComponentSlots.vue'
import Description from '~/.vitepress/theme/components/ui/Description.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    app.component('Description', Description)
      .component('ComponentExample', ComponentExample)
      .component('ComponentProps', ComponentProps)
      .component('ComponentSlots', ComponentSlots)
  }
} satisfies Theme
