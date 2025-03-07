<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/prose/code'
import { tv } from '../utils/tv'

const appConfigProseCode = _appConfig as AppConfig & { b24ui: { prose: { code: Partial<typeof theme> } } }

const proseCode = tv({ extend: tv(theme), ...(appConfigProseCode.b24ui?.prose?.code || {}) })

type ProseCodeVariants = VariantProps<typeof proseCode>

export interface proseCodeProps {
  /**
   * @defaultValue 'default'
   */
  color?: ProseCodeVariants['color']
  class?: any
  b24ui?: Partial<typeof proseCode.slots>
}

export interface proseCodeSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<proseCodeProps>()

const b24ui = computed(() => proseCode({
  color: props.color
}))
</script>

<template>
  <code
    :class="b24ui.base({ class: props.b24ui?.base })"
  ><slot /></code>
</template>
