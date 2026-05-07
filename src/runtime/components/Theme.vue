<script lang="ts">
import type { VNode } from 'vue'
import { computed } from 'vue'
import defu from 'defu'
import { injectThemeContext, provideThemeContext } from '../composables/useComponentProps'
import type { ThemeContextDefaults, ThemeDefaults, ThemeUI } from '../composables/useComponentProps'

export interface ThemeProps {
  /**
   * Per-component prop defaults that flow through `useComponentProps` to
   * every descendant. Each key maps to a partial of that component's props.
   * @example `{ button: { color: 'air-primary-alert' }, tooltip: { delayDuration: 0 } }`
   */
  props?: ThemeDefaults
  /**
   * Per-component slot class overrides (flat shorthand for `:props.<name>.b24ui`).
   * @example `{ button: { base: 'rounded-full' } }`
   */
  b24ui?: ThemeUI
}

export interface ThemeSlots {
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
const _props = defineProps<ThemeProps>()
defineSlots<ThemeSlots>()

const parent = injectThemeContext()

const NAMESPACES = new Set(['prose'])

/**
 * Lift the flat `ThemeUI` shape (`{ button: { base: '...' } }`) into the
 * per-component defaults shape (`{ button: { b24ui: { base: '...' } } }`) so
 * `useComponentProps('button', ...)` reads slot classes from the same
 * `ThemeContext.defaults` map as every other prop default.
 *
 * Namespaced maps like `{ prose: { p: { base: '...' } } }` preserve their
 * nesting so prose components' `useComponentProps('prose.p', ...)` lookup still
 * resolves: `{ prose: { p: { b24ui: { base: '...' } } } }`.
 */
function normalizeUi(b24ui?: ThemeUI): ThemeContextDefaults {
  if (!b24ui) return {}
  const result: ThemeContextDefaults = {}
  for (const [key, value] of Object.entries(b24ui)) {
    if (!value || typeof value !== 'object') continue
    if (NAMESPACES.has(key)) {
      const nested: Record<string, any> = {}
      for (const [childKey, childValue] of Object.entries(value)) {
        if (childValue && typeof childValue === 'object') {
          nested[childKey] = { b24ui: childValue }
        }
      }
      result[key] = nested
    } else {
      result[key] = { b24ui: value }
    }
  }
  return result
}

provideThemeContext({
  defaults: computed(() => defu(
    (_props.props ?? {}) as ThemeContextDefaults,
    normalizeUi(_props.b24ui),
    parent.defaults.value
  ))
})
</script>

<template>
  <slot />
</template>
