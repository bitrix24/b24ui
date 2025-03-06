<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/ul'
import { tv } from '../utils/tv'

const appConfigProseUl = _appConfig as AppConfig & { b24ui: { prose: { ul: Partial<typeof theme> } } }

const proseUl = tv({ extend: tv(theme), ...(appConfigProseUl.b24ui?.prose?.ul || {}) })

export interface proseUlProps {
  class?: any
  b24ui?: Partial<typeof proseUl.slots>
}

export interface proseUlSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<proseUlProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseUl({})
</script>

<template>
  <ul
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
    <slot />
  </ul>
</template>
