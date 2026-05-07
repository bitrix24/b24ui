<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h6'
import type { ComponentConfig } from '../../types/tv'

type ProseH6 = ComponentConfig<typeof theme, AppConfig, 'h6', 'b24ui.prose'>

export interface ProseH6Props {
  id?: string
  /**
   * @defaultValue 'default'
   */
  accent?: ProseH6['variants']['accent']
  class?: any
  b24ui?: ProseH6['slots']
}

export interface ProseH6Slots {
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'

const _props = withDefaults(defineProps<ProseH6Props>(), {
  accent: 'default'
})

defineSlots<ProseH6Slots>()

const props = useComponentProps('prose.h6', _props)

const appConfig = useAppConfig() as ProseH6['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.h6 || {}) })({
  accent: props.accent
}))
</script>

<template>
  <h6
    :id="props.id"
    data-slot="base"
    :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
  >
    <slot />
  </h6>
</template>
