<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/h4'
import type { ComponentConfig } from '../../types/tv'

type ProseH4 = ComponentConfig<typeof theme, AppConfig, 'h4', 'b24ui.prose'>

export interface ProseH4Props {
  id?: string
  /**
   * @defaultValue 'default'
   */
  accent?: ProseH4['variants']['accent']
  class?: any
  b24ui?: ProseH4['slots']
}

export interface ProseH4Slots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig, useRuntimeConfig } from '#imports'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'

const props = withDefaults(defineProps<ProseH4Props>(), {
  accent: 'default'
})
defineSlots<ProseH4Slots>()

const appConfig = useAppConfig() as ProseH4['AppConfig']
const { headings } = useRuntimeConfig().public?.mdc || {}

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.h4 || {}) })({
  accent: props.accent
}))

const generate = computed(() => props.id && typeof headings?.anchorLinks === 'object' && headings.anchorLinks.h4)
</script>

<template>
  <h4
    :id="id"
    data-slot="base"
    :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
  >
    <a v-if="id && generate" :href="`#${id}`" data-slot="link" :class="b24ui.link({ class: props.b24ui?.link })">
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
  </h4>
</template>
