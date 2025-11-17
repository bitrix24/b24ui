<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/card'
import type { IconComponent, LinkProps } from '../../types'
import type { ComponentConfig } from '../../types/tv'

type ProseCard = ComponentConfig<typeof theme, AppConfig, 'card', 'b24ui.prose'>

export interface ProseCardProps {
  to?: LinkProps['to']
  target?: LinkProps['target']
  icon?: IconComponent
  title?: string
  description?: string
  /**
   * @defaultValue 'air-primary'
   */
  color?: ProseCard['variants']['color']
  class?: any
  b24ui?: ProseCard['slots']
}

export interface ProseCardSlots {
  default(props?: {}): any
  title(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24Link from '../Link.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<ProseCardProps>()
const slots = defineSlots<ProseCardSlots>()

const appConfig = useAppConfig() as ProseCard['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.card || {}) })({
  color: props.color,
  to: !!props.to,
  title: !!props.title
}))

const target = computed(() => props.target || (!!props.to && typeof props.to === 'string' && props.to.startsWith('http') ? '_blank' : undefined))

const ariaLabel = computed(() => (props.title || 'Card link').trim())
</script>

<template>
  <div data-slot="base" :class="b24ui.base({ class: props.class })">
    <B24Link
      v-if="to"
      :aria-label="ariaLabel"
      v-bind="{ to, target, ...$attrs }"
      class="focus:outline-none"
      tabindex="-1"
      raw
    >
      <span class="absolute inset-0" aria-hidden="true" />
    </B24Link>

    <Component
      :is="icon"
      v-if="icon"
      data-slot="icon"
      :class="b24ui.icon({ class: props.b24ui?.icon })"
    />
    <Component
      :is="icons.external"
      v-if="!!to && target === '_blank'"
      data-slot="externalIcon"
      :class="b24ui.externalIcon({ class: props.b24ui?.externalIcon })"
    />

    <p v-if="title || !!slots.title" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
      <slot name="title" mdc-unwrap="p">
        {{ title }}
      </slot>
    </p>

    <div v-if="!!slots.default" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
      <slot>
        {{ description }}
      </slot>
    </div>
  </div>
</template>
