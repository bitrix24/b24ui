<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/img'
import { tv } from '../utils/tv'

const appConfigProseImg = _appConfig as AppConfig & { b24ui: { prose: { img: Partial<typeof theme> } } }

const proseImg = tv({ extend: tv(theme), ...(appConfigProseImg.b24ui?.prose?.img || {}) })

export interface proseImgProps {
  class?: any
  b24ui?: Partial<typeof proseImg.slots>
}

export interface proseImgSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
const props = defineProps<proseImgProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseImg({})
</script>

<template>
  <img
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  >
</template>
