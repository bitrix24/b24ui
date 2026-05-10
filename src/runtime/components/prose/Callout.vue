<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { IconComponent, LinkProps } from '../../types'
import type { ComponentConfig } from '../../types/tv'
import theme from '#build/b24ui/prose/callout'

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
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { tv } from '../../utils/tv'
import { resolveIcon } from '../../utils'
import icons from '../../dictionary/icons'
import B24Link from '../Link.vue'

defineOptions({ inheritAttrs: false })

const _props = defineProps<ProseCalloutProps>()

defineSlots<ProseCalloutSlots>()

const props = useComponentProps('prose.callout', _props)

const appConfig = useAppConfig() as ProseCallout['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.callout || {}) })({
  color: props.color,
  to: !!props.to
}))

// eslint-disable-next-line vue/no-dupe-keys
const target = computed(() => props.target || (!!props.to && typeof props.to === 'string' && props.to.startsWith('http') ? '_blank' : undefined))

const iconFromIconName = computed(() => resolveIcon(props.iconName))
</script>

<template>
  <div data-slot="base" :class="b24ui.base({ class: props.class })">
    <B24Link
      v-if="props.to"
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
    <slot mdc-unwrap="p" />
  </div>
</template>
