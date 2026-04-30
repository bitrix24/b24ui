import './main.css'
import type { App } from 'vue'
import basePlugin from '@bitrix24/b24ui-nuxt/vue-plugin'
import B24LinkOverride from '../../../src/runtime/vue/overrides/none/Link.vue'

const componentModules = import.meta.glob('../../../src/runtime/components/*.vue', { eager: true }) as Record<string, { default: any }>

const components: Record<string, any> = {}
for (const [path, mod] of Object.entries(componentModules)) {
  const name = `B24${path.match(/([^/]+)\.vue$/)?.[1]}`
  // Skip Link.vue — use the none-override for plain Vue (REPL) environment without NuxtLink
  if (name === 'B24Link') continue
  components[name] = mod.default
}

// Use the non-Nuxt Link override in REPL (plain Vue, no NuxtLink component available)
components['B24Link'] = B24LinkOverride

export function install(app: App) {
  app.use(basePlugin)
  for (const [name, component] of Object.entries(components)) {
    app.component(name, component)
  }
}

export default { install }

export { useToast } from '../../../src/runtime/composables/useToast'
export { useOverlay } from '../../../src/runtime/composables/useOverlay'
export { defineShortcuts, extractShortcuts } from '../../../src/runtime/composables/defineShortcuts'
export { useDevice } from '../../../src/runtime/composables/useDevice'
export { useConfetti } from '../../../src/runtime/composables/useConfetti'
export { useSpeechRecognition } from '../../../src/runtime/composables/useSpeechRecognition'
export { useColorMode } from '../../../src/runtime/composables/color-mode/useColorMode'
