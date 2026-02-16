<script lang="ts">
import type { SeparatorProps as _SeparatorProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/separator'
import type { AvatarProps, IconComponent } from '../types'
import type { ComponentConfig } from '../types/tv'

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
  accent?: Separator['variants']['accent']
  /**
   * @defaultValue 'thin'
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
  orientation?: Separator['variants']['orientation']
  class?: any
  b24ui?: Separator['slots']
}

export interface SeparatorSlots {
  default(props: { b24ui: Separator['b24ui'] }): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Separator, useForwardProps } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'
import B24Avatar from './Avatar.vue'

const props = withDefaults(defineProps<SeparatorProps>(), {
  accent: 'default',
  orientation: 'horizontal',
  size: 'thin',
  type: 'solid'
})
const slots = defineSlots<SeparatorSlots>()

const appConfig = useAppConfig() as Separator['AppConfig']
const uiProp = useComponentUI('separator', props)

const rootProps = useForwardProps(reactivePick(props, 'as', 'decorative', 'orientation'))

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.separator || {}) })({
  accent: props.accent,
  orientation: props.orientation,
  size: props.size,
  type: props.type
}))
</script>

<template>
  <Separator v-bind="rootProps" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <div data-slot="border" :class="b24ui.border({ class: uiProp?.border })" />

    <template v-if="(label !== undefined && label !== null) || icon || avatar || !!slots.default">
      <div data-slot="container" :class="b24ui.container({ class: uiProp?.container })">
        <slot :b24ui="b24ui">
          <span v-if="label !== undefined && label !== null" data-slot="label" :class="b24ui.label({ class: uiProp?.label })">{{ label }}</span>
          <Component :is="icon" v-else-if="icon" data-slot="icon" :class="b24ui.icon({ class: uiProp?.icon })" />
          <B24Avatar v-else-if="avatar" :size="((uiProp?.avatarSize || b24ui.avatarSize()) as AvatarProps['size'])" v-bind="avatar" data-slot="avatar" :class="b24ui.avatar({ class: uiProp?.avatar })" />
        </slot>
      </div>

      <div data-slot="border" :class="b24ui.border({ class: uiProp?.border })" />
    </template>
  </Separator>
</template>
