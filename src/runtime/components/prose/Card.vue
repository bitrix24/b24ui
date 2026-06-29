<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { IconComponent } from '../../types/icons'
import type { LinkProps } from '../Link.vue'
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
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24Link from '../Link.vue'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import InfoCircleIcon from '@bitrix24/b24icons-vue/outline/InfoCircleIcon'
import MdnwebdocsIcon from '@bitrix24/b24icons-vue/social/MdnwebdocsIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import DemonstrationOnIcon from '@bitrix24/b24icons-vue/outline/DemonstrationOnIcon'

defineOptions({ inheritAttrs: false })

const _props = defineProps<ProseCardProps>()
const slots = defineSlots<ProseCardSlots>()

const props = useComponentProps('prose.card', _props)

const appConfig = useAppConfig() as ProseCard['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.prose?.card || {}) })({
  color: props.color,
  to: !!props.to,
  title: !!props.title
}))

// eslint-disable-next-line vue/no-dupe-keys
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
  <div v-bind="!props.to ? $attrs : {}" data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <B24Link
      v-if="props.to"
      :aria-label="ariaLabel"
      v-bind="{ to: props.to, target, ...$attrs }"
      class="focus:outline-none"
      raw
    >
      <span class="absolute inset-0" aria-hidden="true" />
    </B24Link>

    <Component
      :is="props.icon"
      v-if="props.icon"
      data-slot="icon"
      :class="b24ui.icon({ class: props.b24ui?.icon })"
    />
    <Component
      :is="iconFromIconName"
      v-else-if="props.iconName"
      data-slot="icon"
      :class="b24ui.icon({ class: props.b24ui?.icon })"
    />
    <Component
      :is="icons.external"
      v-if="!!props.to && target === '_blank'"
      data-slot="externalIcon"
      :class="b24ui.externalIcon({ class: props.b24ui?.externalIcon })"
    />

    <p v-if="props.title || !!slots.title" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
      <slot name="title" mdc-unwrap="p">
        {{ props.title }}
      </slot>
    </p>

    <div v-if="!!slots.default" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
      <slot>
        {{ props.description }}
      </slot>
    </div>
  </div>
</template>
