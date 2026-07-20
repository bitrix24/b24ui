<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h1'
import type { ComponentConfig } from '../../types/tv'

type ProseH1 = ComponentConfig<typeof theme, AppConfig, 'h1', 'b24ui.prose'>

export interface ProseH1Props {
  id?: string
  /**
   * Wrap the heading in an anchor link when an `id` is present.
   * @defaultValue false
   */
  anchor?: boolean
  /**
   * @defaultValue 'default'
   */
  accent?: ProseH1['variants']['accent']
  class?: any
  b24ui?: ProseH1['slots']
}

export interface ProseH1Slots {
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig, useRuntimeConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'

const _props = withDefaults(defineProps<ProseH1Props>(), {
  accent: 'default'
})

defineSlots<ProseH1Slots>()

const props = useComponentProps('prose.h1', _props)

const appConfig = useAppConfig() as ProseH1['AppConfig']
const { headings } = useRuntimeConfig().public?.mdc || {}

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.prose?.h1 || {}) })({
  accent: props.accent
}))

// NOTE: the `mdc.headings.anchorLinks` fallback is deprecated, remove in v5 in favor of the `anchor` prop.
const generate = computed(() => props.id && (props.anchor ?? (typeof headings?.anchorLinks === 'boolean' ? headings.anchorLinks : headings?.anchorLinks?.h1) ?? false))
</script>

<template>
  <h1
    :id="props.id"
    data-slot="base"
    :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
  >
    <a v-if="props.id && generate" :href="`#${props.id}`" :class="b24ui.link({ class: props.b24ui?.link })">
      <slot />
    </a>
    <slot v-else />
  </h1>
</template>
