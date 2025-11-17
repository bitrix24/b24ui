<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h1'
import type { ComponentConfig } from '../../types/tv'

type ProseH1 = ComponentConfig<typeof theme, AppConfig, 'h1', 'b24ui.prose'>

export interface ProseH1Props {
  id?: string
  /**
   * @defaultValue 'default'
   */
  accent?: ProseH1['variants']['accent']
  class?: any
  b24ui?: ProseH1['slots']
}

export interface ProseH1Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig, useRuntimeConfig } from '#imports'
import { tv } from '../../utils/tv'

const props = withDefaults(defineProps<ProseH1Props>(), {
  accent: 'default'
})
defineSlots<ProseH1Slots>()

const appConfig = useAppConfig() as ProseH1['AppConfig']
const { headings } = useRuntimeConfig().public?.mdc || {}

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.h1 || {}) })({
  accent: props.accent
}))

const generate = computed(() => props.id && typeof headings?.anchorLinks === 'object' && headings.anchorLinks.h1)
</script>

<template>
  <h1
    :id="id"
    data-slot="base"
    :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
  >
    <a v-if="id && generate" :href="`#${id}`" :class="b24ui.link({ class: props.b24ui?.link })">
      <slot />
    </a>
    <slot v-else />
  </h1>
</template>
