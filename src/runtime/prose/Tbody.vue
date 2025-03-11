<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/tbody'
import { tv } from '../utils/tv'

const appConfigProseTbody = _appConfig as AppConfig & { b24ui: { prose: { tbody: Partial<typeof theme> } } }

const proseTbody = tv({ extend: tv(theme), ...(appConfigProseTbody.b24ui?.prose?.tbody || {}) })

export interface proseTbodyProps {
  class?: any
  b24ui?: Partial<typeof proseTbody.slots>
}

export interface proseTbodySlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseTbodyProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseTbody({})
</script>

<template>
  <tbody
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </tbody>
</template>
