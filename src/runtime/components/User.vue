<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/user'
import type { AvatarProps, ChipProps, LinkProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type User = ComponentConfig<typeof theme, AppConfig, 'user'>

export interface UserProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  name?: string
  description?: string
  avatar?: Omit<AvatarProps, 'size'> & { [key: string]: any }
  chip?: boolean | Omit<ChipProps, 'size' | 'inset'>
  /**
   * @defaultValue 'md'
   */
  size?: User['variants']['size']
  /**
   * The orientation of the user.
   * @defaultValue 'horizontal'
   */
  orientation?: User['variants']['orientation']
  to?: LinkProps['to']
  target?: LinkProps['target']
  onClick?: (event: MouseEvent) => void | Promise<void>
  class?: any
  b24ui?: User['slots']
}

export interface UserSlots {
  avatar(props: { b24ui: User['b24ui'] }): any
  name(props?: {}): any
  description(props?: {}): any
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'
import B24Chip from './Chip.vue'
import B24Avatar from './Avatar.vue'
import B24Link from './Link.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<UserProps>(), {
  orientation: 'horizontal'
})
const slots = defineSlots<UserSlots>()

const appConfig = useAppConfig() as User['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.user || {}) })({
  size: props.size,
  orientation: props.orientation,
  to: !!props.to || !!props.onClick
}))

const chipSize = computed<ChipProps['size']>(() => {
  switch (props.size) {
    case '3xs': return 'sm' as ChipProps['size']
    case '2xs': return 'sm' as ChipProps['size']
    case 'xs': return 'sm' as ChipProps['size']
    case 'md': return 'sm' as ChipProps['size']
    case 'lg': return 'md' as ChipProps['size']
    case 'xl': return 'md' as ChipProps['size']
    case '2xl': return 'lg' as ChipProps['size']
    case '3xl': return 'lg' as ChipProps['size']
  }

  return 'sm' as ChipProps['size']
})
</script>

<template>
  <Primitive :as="as" :data-orientation="orientation" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })" @click="onClick">
    <slot name="avatar" :b24ui="b24ui">
      <B24Chip v-if="chip && avatar && !['3xs'].includes(size || '')" inset v-bind="typeof chip === 'object' ? chip : {}" :size="chipSize">
        <B24Avatar :alt="name" v-bind="avatar" :size="size" data-slot="avatar" :class="b24ui.avatar({ class: props.b24ui?.avatar })" />
      </B24Chip>
      <B24Avatar
        v-else-if="avatar"
        :alt="name"
        v-bind="avatar"
        :size="size"
        data-slot="avatar"
        :class="b24ui.avatar({ class: props.b24ui?.avatar })"
      />
    </slot>

    <div data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <B24Link
        v-if="to"
        :aria-label="name"
        v-bind="{ to, target, ...$attrs }"
        class="focus:outline-none peer"
        raw
      >
        <span class="absolute inset-0" aria-hidden="true" />
      </B24Link>

      <slot>
        <p v-if="name || !!slots.name" data-slot="name" :class="b24ui.name({ class: props.b24ui?.name })">
          <slot name="name">
            {{ name }}
          </slot>
        </p>
        <p v-if="description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </slot>
    </div>
  </Primitive>
</template>
