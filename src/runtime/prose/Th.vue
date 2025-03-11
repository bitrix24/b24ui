<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/th'
import { tv } from '../utils/tv'

const appConfigProseTh = _appConfig as AppConfig & { b24ui: { prose: { th: Partial<typeof theme> } } }

const proseTh = tv({ extend: tv(theme), ...(appConfigProseTh.b24ui?.prose?.th || {}) })

export interface proseThProps {
  class?: any
  b24ui?: Partial<typeof proseTh.slots>
}

export interface proseThSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseThProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseTh({})
</script>

<template>
  <th
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </th>
</template>
