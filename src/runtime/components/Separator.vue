<script lang="ts">
import type { SeparatorProps as _SeparatorProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/separator'
import type { AvatarProps, IconComponent } from '../types'
import type { ComponentConfig } from '../types/utils'

type Separator = ComponentConfig<typeof theme, AppConfig, 'separator'>

export interface SeparatorProps extends Pick<_SeparatorProps, 'decorative'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /** Display a label in the middle. */
  label?: string
  /**
   * Display an icon in the middle
   * @IconComponent
   */
  icon?: IconComponent
  /**
   * Display an avatar in the middle
   */
  avatar?: AvatarProps
  /**
   * @defaultValue 'default'
   */
  color?: Separator['variants']['color']
  /**
   * @defaultValue 'xs'
   */
  size?: Separator['variants']['size']
  /**
   * @defaultValue 'solid'
   */
  type?: Separator['variants']['type']
  /**
   * The orientation of the separator.
   * @defaultValue 'horizontal'
   */
  orientation?: _SeparatorProps['orientation']
  class?: any
  b24ui?: Separator['slots']
}

export interface SeparatorSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Separator, useForwardProps } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'
import B24Avatar from './Avatar.vue'

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal'
})
const slots = defineSlots<SeparatorSlots>()

const appConfig = useAppConfig() as Separator['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'as', 'decorative', 'orientation'))

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.separator || {}) })({
  color: props.color,
  orientation: props.orientation,
  size: props.size,
  type: props.type
}))
</script>

<template>
  <Separator v-bind="rootProps" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div :class="b24ui.border({ class: props.b24ui?.border })" />

    <template v-if="(label !== undefined && label !== null) || icon || avatar || !!slots.default">
      <div :class="b24ui.container({ class: props.b24ui?.container })">
        <slot>
          <span v-if="label !== undefined && label !== null" :class="b24ui.label({ class: props.b24ui?.label })">{{ label }}</span>
          <Component :is="icon" v-else-if="icon" :class="b24ui.icon({ class: props.b24ui?.icon })" />
          <B24Avatar v-else-if="avatar" :size="((props.b24ui?.avatarSize || b24ui.avatarSize()) as AvatarProps['size'])" v-bind="avatar" :class="b24ui.avatar({ class: props.b24ui?.avatar })" />
        </slot>
      </div>

      <div :class="b24ui.border({ class: props.b24ui?.border })" />
    </template>
  </Separator>
</template>
