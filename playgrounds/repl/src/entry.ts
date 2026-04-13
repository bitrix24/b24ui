import './main.css'
import type { App } from 'vue'
import basePlugin from '@bitrix24/b24ui-nuxt/vue-plugin'

const componentModules = import.meta.glob('../../../src/runtime/components/*.vue', { eager: true }) as Record<string, { default: any }>

const components: Record<string, any> = {}
for (const [path, mod] of Object.entries(componentModules)) {
  const name = `B24${path.match(/([^/]+)\.vue$/)?.[1]}`
  components[name] = mod.default
}

export function install(app: App) {
  app.use(basePlugin)
  for (const [name, component] of Object.entries(components)) {
    app.component(name, component)
  }
}

export default { install }
