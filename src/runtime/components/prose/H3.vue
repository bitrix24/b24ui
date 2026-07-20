<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h3'
import type { ComponentConfig } from '../../types/tv'

type ProseH3 = ComponentConfig<typeof theme, AppConfig, 'h3', 'b24ui.prose'>

export interface ProseH3Props {
  id?: string
  /**
   * Wrap the heading in an anchor link when an `id` is present.
   * `@nuxt/content` and `@nuxtjs/mdc` enable this for H2–H4 by default.
   * @defaultValue false
   */
  anchor?: boolean
  /**
   * @defaultValue 'default'
   */
  accent?: ProseH3['variants']['accent']
  class?: any
  b24ui?: ProseH3['slots']
}

export interface ProseH3Slots {
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig, useRuntimeConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'

const _props = withDefaults(defineProps<ProseH3Props>(), {
  accent: 'default'
})

defineSlots<ProseH3Slots>()

const props = useComponentProps('prose.h3', _props)

const appConfig = useAppConfig() as ProseH3['AppConfig']
const { headings } = useRuntimeConfig().public?.mdc || {}

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.prose?.h3 || {}) })({
  accent: props.accent
}))

// NOTE: the `mdc.headings.anchorLinks` fallback is deprecated, remove in v5 in favor of the `anchor` prop.
const generate = computed(() => props.id && (props.anchor ?? (typeof headings?.anchorLinks === 'boolean' ? headings.anchorLinks : headings?.anchorLinks?.h3) ?? false))
</script>

<template>
  <h3
    :id="props.id"
    data-slot="base"
    :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
  >
    <a v-if="props.id && generate" :href="`#${props.id}`" data-slot="link" :class="b24ui.link({ class: props.b24ui?.link })">
      <span data-slot="leading" :class="b24ui.leading({ class: props.b24ui?.leading })">
        <Component
          :is="icons.hash"
          data-slot="leadingIcon"
          :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
        />
      </span>

      <slot />
    </a>
    <slot v-else />
  </h3>
</template>
