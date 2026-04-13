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

export { useToast } from '../../../src/runtime/composables/useToast'
export { useOverlay } from '../../../src/runtime/composables/useOverlay'
export { defineShortcuts } from '../../../src/runtime/composables/defineShortcuts'
export { useDevice } from '../../../src/runtime/composables/useDevice'
export { useConfetti } from '../../../src/runtime/composables/useConfetti'
export { useSpeechRecognition } from '../../../src/runtime/composables/useSpeechRecognition'
export { useColorMode } from '../../../src/runtime/composables/color-mode/useColorMode'
