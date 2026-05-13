<script lang="ts">
import type { SeparatorProps as _SeparatorProps } from 'reka-ui'
import type { VNode } from 'vue'
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
  /** Display a label on the separator. */
  label?: string
  /**
   * Display an icon on the separator.
   * @IconComponent
   */
  icon?: IconComponent
  /**
   * Display an avatar on the separator
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
  /**
   * The position of the content.
   * @defaultValue 'center'
   */
  position?: Separator['variants']['position']
  class?: any
  b24ui?: Separator['slots']
}

export interface SeparatorSlots {
  default?(props: { b24ui: Separator['b24ui'] }): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Separator } from 'reka-ui'
import { reactivePick, createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { tv } from '../utils/tv'
import B24Avatar from './Avatar.vue'

const _props = withDefaults(defineProps<SeparatorProps>(), {
  accent: 'default',
  orientation: 'horizontal',
  size: 'thin',
  type: 'solid',
  position: 'center'
})
const slots = defineSlots<SeparatorSlots>()

const props = useComponentProps('separator', _props)

const appConfig = useAppConfig() as Separator['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'as', 'decorative', 'orientation'))

const [DefineContainer, ReuseContainer] = createReusableTemplate()

const hasContent = computed(() => !!(props.label || props.icon || props.avatar || slots.default))

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.separator || {}) })({
  accent: props.accent,
  orientation: props.orientation,
  size: props.size,
  position: props.position,
  type: props.type
}))
</script>

<template>
  <DefineContainer>
    <div data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <slot :b24ui="b24ui">
        <span v-if="props.label !== undefined && props.label !== null" data-slot="label" :class="b24ui.label({ class: props.b24ui?.label })">{{ props.label }}</span>
        <Component :is="props.icon" v-else-if="props.icon" data-slot="icon" :class="b24ui.icon({ class: props.b24ui?.icon })" />
        <B24Avatar v-else-if="props.avatar" :size="((props.b24ui?.avatarSize || b24ui.avatarSize()) as AvatarProps['size'])" v-bind="props.avatar" data-slot="avatar" :class="b24ui.avatar({ class: props.b24ui?.avatar })" />
      </slot>
    </div>
  </DefineContainer>

  <Separator v-bind="rootProps" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <ReuseContainer v-if="hasContent && props.position === 'start'" />

    <div data-slot="border" :class="b24ui.border({ class: props.b24ui?.border })" />

    <template v-if="hasContent && props.position === 'center'">
      <ReuseContainer />

      <div data-slot="border" :class="b24ui.border({ class: props.b24ui?.border })" />
    </template>

    <ReuseContainer v-if="hasContent && props.position === 'end'" />
  </Separator>
</template>
