import './main.css'

import { createApp, defineComponent, h } from 'vue'
import b24UiPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'
import App from './App.vue'

const app = createApp(App)

app.component('NuxtLink', defineComponent({
  name: 'NuxtLink',
  props: {
    to: [String, Object],
    href: String,
    target: String,
    rel: String,
    custom: Boolean,
  },
  setup(props, { slots }) {
    const href = typeof props.to === 'string' ? props.to : (props.href ?? '#')
    return () => props.custom
      ? slots.default?.({ href, navigate: () => {}, isActive: false, isExactActive: false, route: {} })
      : h('a', { href, target: props.target, rel: props.rel }, slots.default?.())
  }
}))

app.use(b24UiPlugin)
app.mount('#app')
