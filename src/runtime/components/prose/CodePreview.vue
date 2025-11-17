<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../../types/tv'
import theme from '#build/b24ui/prose/code-preview'

type ProseCodePreview = ComponentConfig<typeof theme, AppConfig, 'codePreview', 'b24ui.prose'>

export interface ProseCodePreviewProps {
  class?: any
  b24ui?: ProseCodePreview['slots']
}

export interface ProseCodePreviewSlots {
  default(props?: {}): any
  code(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = defineProps<ProseCodePreviewProps>()
const slots = defineSlots<ProseCodePreviewSlots>()

const appConfig = useAppConfig() as ProseCodePreview['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.codePreview || {}) })({ code: !!slots.code }))
</script>

<template>
  <div data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div data-slot="preview" :class="b24ui.preview({ class: [props.b24ui?.preview] })">
      <slot />
    </div>

    <div v-if="!!slots.code" data-slot="code" :class="b24ui.code({ class: [props.b24ui?.code] })">
      <slot name="code" />
    </div>
  </div>
</template>
