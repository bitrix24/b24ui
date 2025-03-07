<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/a'
import { tv } from '../utils/tv'

const appConfigProseA = _appConfig as AppConfig & { b24ui: { prose: { a: Partial<typeof theme> } } }

const proseA = tv({ extend: tv(theme), ...(appConfigProseA.b24ui?.prose?.a || {}) })

export interface proseAProps {
  class?: any
  b24ui?: Partial<typeof proseA.slots>
}

export interface proseASlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseAProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseA({})
</script>

<template>
  <a
    :class="b24ui.base({ class: props.b24ui?.base })"
  ><slot /></a>
</template>
