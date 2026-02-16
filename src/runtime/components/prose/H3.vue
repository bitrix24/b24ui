<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h3'
import type { ComponentConfig } from '../../types/tv'

type ProseH3 = ComponentConfig<typeof theme, AppConfig, 'h3', 'b24ui.prose'>

export interface ProseH3Props {
  id?: string
  /**
   * @defaultValue 'default'
   */
  accent?: ProseH3['variants']['accent']
  class?: any
  b24ui?: ProseH3['slots']
}

export interface ProseH3Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig, useRuntimeConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'

const props = withDefaults(defineProps<ProseH3Props>(), {
  accent: 'default'
})
defineSlots<ProseH3Slots>()

const appConfig = useAppConfig() as ProseH3['AppConfig']
const uiProp = useComponentUI('prose.h3', props)
const { headings } = useRuntimeConfig().public?.mdc || {}

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.h3 || {}) })({
  accent: props.accent
}))

const generate = computed(() => props.id && typeof headings?.anchorLinks === 'object' && headings.anchorLinks.h3)
</script>

<template>
  <h3
    :id="id"
    data-slot="base"
    :class="b24ui.base({ class: [uiProp?.base, props.class] })"
  >
    <a v-if="id && generate" :href="`#${id}`" data-slot="link" :class="b24ui.link({ class: uiProp?.link })">
      <span data-slot="leading" :class="b24ui.leading({ class: uiProp?.leading })">
        <Component
          :is="icons.hash"
          data-slot="leadingIcon"
          :class="b24ui.leadingIcon({ class: uiProp?.leadingIcon })"
        />
      </span>

      <slot />
    </a>
    <slot v-else />
  </h3>
</template>
