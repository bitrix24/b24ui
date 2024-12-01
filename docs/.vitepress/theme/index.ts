// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './tailwind.post.css'
import DynamicLayout from '~/.vitepress/theme/components/ui/DynamicLayout.vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import ComponentProps from '~/.vitepress/theme/components/ui/ComponentProps.vue'
import ComponentSlots from '~/.vitepress/theme/components/ui/ComponentSlots.vue'
import Description from '~/.vitepress/theme/components/ui/Description.vue'

export default {
  extends: DefaultTheme,
  Layout: DynamicLayout,
  enhanceApp({ app }) {
    app.component('Description', Description)
      .component('ComponentShowExample', ComponentShowExample)
      .component('ComponentProps', ComponentProps)
      .component('ComponentSlots', ComponentSlots)
  }
} satisfies Theme
