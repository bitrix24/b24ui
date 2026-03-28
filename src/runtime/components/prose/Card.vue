<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { IconComponent, LinkProps } from '../../types'
import type { ComponentConfig } from '../../types/tv'
import theme from '#build/b24ui/prose/card'

type ProseCard = ComponentConfig<typeof theme, AppConfig, 'card', 'b24ui.prose'>

export interface ProseCardProps {
  to?: LinkProps['to']
  target?: LinkProps['target']
  icon?: IconComponent
  iconName?: string
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
  default(props?: {}): VNode[]
  title(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24Link from '../Link.vue'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import InfoCircleIcon from '@bitrix24/b24icons-vue/outline/InfoCircleIcon'
import MdnwebdocsIcon from '@bitrix24/b24icons-vue/social/MdnwebdocsIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import DemonstrationOnIcon from '@bitrix24/b24icons-vue/outline/DemonstrationOnIcon'

defineOptions({ inheritAttrs: false })

const props = defineProps<ProseCardProps>()
const slots = defineSlots<ProseCardSlots>()

const appConfig = useAppConfig() as ProseCard['AppConfig']
const uiProp = useComponentUI('prose.card', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.card || {}) })({
  color: props.color,
  to: !!props.to,
  title: !!props.title
}))

const target = computed(() => props.target || (!!props.to && typeof props.to === 'string' && props.to.startsWith('http') ? '_blank' : undefined))

const ariaLabel = computed(() => (props.title || 'Card link').trim())

const iconFromIconName = computed(() => {
  if (!props.iconName) {
    return undefined
  }

  switch (props.iconName) {
    case 'InfoCircleIcon': return InfoCircleIcon
    case 'GitHubIcon': return GitHubIcon
    case 'MdnWebDocIcon': return MdnwebdocsIcon
    case 'Bitrix24Icon': return Bitrix24Icon
    case 'DemonstrationOnIcon': return DemonstrationOnIcon
  }

  return undefined
})
</script>

<template>
  <div data-slot="base" :class="b24ui.base({ class: [uiProp?.base, props.class] })">
    <B24Link
      v-if="to"
      :aria-label="ariaLabel"
      v-bind="{ to, target, ...$attrs }"
      class="focus:outline-none"
      raw
    >
      <span class="absolute inset-0" aria-hidden="true" />
    </B24Link>

    <Component
      :is="icon"
      v-if="icon"
      data-slot="icon"
      :class="b24ui.icon({ class: uiProp?.icon })"
    />
    <Component
      :is="iconFromIconName"
      v-else-if="props.iconName"
      data-slot="icon"
      :class="b24ui.icon({ class: uiProp?.icon })"
    />
    <Component
      :is="icons.external"
      v-if="!!to && target === '_blank'"
      data-slot="externalIcon"
      :class="b24ui.externalIcon({ class: uiProp?.externalIcon })"
    />

    <p v-if="title || !!slots.title" data-slot="title" :class="b24ui.title({ class: uiProp?.title })">
      <slot name="title" mdc-unwrap="p">
        {{ title }}
      </slot>
    </p>

    <div v-if="!!slots.default" data-slot="description" :class="b24ui.description({ class: uiProp?.description })">
      <slot>
        {{ description }}
      </slot>
    </div>
  </div>
</template>
