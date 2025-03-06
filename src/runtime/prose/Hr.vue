<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/hr'
import { tv } from '../utils/tv'

const appConfigProseHr = _appConfig as AppConfig & { b24ui: { prose: { hr: Partial<typeof theme> } } }

const proseHr = tv({ extend: tv(theme), ...(appConfigProseHr.b24ui?.prose?.hr || {}) })

export interface proseHrProps {
  class?: any
  b24ui?: Partial<typeof proseHr.slots>
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<proseHrProps>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = proseHr({})
</script>

<template>
  <hr
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
  />
</template>
