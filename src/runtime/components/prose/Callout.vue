<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/callout'
import type { IconComponent, LinkProps } from '../../types'
import type { ComponentConfig } from '../../types/tv'

type ProseCallout = ComponentConfig<typeof theme, AppConfig, 'callout', 'b24ui.prose'>

export interface ProseCalloutProps {
  to?: LinkProps['to']
  target?: LinkProps['target']
  icon?: IconComponent
  iconName?: string
  /**
   * @defaultValue 'air-primary'
   */
  color?: ProseCallout['variants']['color']
  class?: any
  b24ui?: ProseCallout['slots']
}

export interface ProseCalloutSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24Link from '../Link.vue'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import InfoCircleIcon from '@bitrix24/b24icons-vue/outline/InfoCircleIcon'
import MdnwebdocsIcon from '@bitrix24/b24icons-vue/social/MdnwebdocsIcon'

defineOptions({ inheritAttrs: false })

const props = defineProps<ProseCalloutProps>()
defineSlots<ProseCalloutSlots>()

const appConfig = useAppConfig() as ProseCallout['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.callout || {}) })({
  color: props.color,
  to: !!props.to
}))

const target = computed(() => props.target || (!!props.to && typeof props.to === 'string' && props.to.startsWith('http') ? '_blank' : undefined))

const iconFromIconName = computed(() => {
  if (!props.iconName) {
    return undefined
  }

  switch (props.iconName) {
    case 'InfoCircleIcon': return InfoCircleIcon
    case 'GitHubIcon': return GitHubIcon
    case 'MdnWebDocIcon': return MdnwebdocsIcon
  }

  return undefined
})
</script>

<template>
  <div data-slot="base" :class="b24ui.base({ class: props.class })">
    <B24Link
      v-if="to"
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
      v-if="!!to && target === '_blank'"
      data-slot="externalIcon"
      :class="b24ui.externalIcon({ class: props.b24ui?.externalIcon })"
    />
    <slot mdc-unwrap="p" />
  </div>
</template>
