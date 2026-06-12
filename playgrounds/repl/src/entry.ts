import './main.css'
import type { App } from 'vue'
import { defineComponent, h } from 'vue'
import basePlugin from '@bitrix24/b24ui-nuxt/vue-plugin'

const NuxtLink = defineComponent({
  name: 'NuxtLink',
  props: {
    to: [String, Object],
    href: String,
    target: String,
    rel: String,
    custom: Boolean
  },
  setup(props, { slots }) {
    const href = typeof props.to === 'string' ? props.to : (props.href ?? '#')
    return () => props.custom
      ? slots.default?.({ href, navigate: () => {}, isActive: false, isExactActive: false, route: {} })
      : h('a', { href, target: props.target, rel: props.rel }, slots.default?.())
  }
})

const componentModules = import.meta.glob('../../../src/runtime/components/*.vue', { eager: true }) as Record<string, { default: any }>

const components: Record<string, any> = {}
for (const [path, mod] of Object.entries(componentModules)) {
  const name = `B24${path.match(/([^/]+)\.vue$/)?.[1]}`
  components[name] = mod.default
}

export function install(app: App) {
  app.component('NuxtLink', NuxtLink)
  app.use(basePlugin)
  for (const [name, component] of Object.entries(components)) {
    app.component(name, component)
  }
}

export default { install }

export * from '../../../src/runtime/composables'
