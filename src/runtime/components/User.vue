<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/user'
import type { AvatarProps } from './Avatar.vue'
import type { ChipProps } from './Chip.vue'
import type { LinkProps } from './Link.vue'
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
  avatar?(props: { b24ui: User['b24ui'] }): VNode[]
  name?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { usePrefix } from '../composables/usePrefix'
import { tv } from '../utils/tv'
import B24Chip from './Chip.vue'
import B24Avatar from './Avatar.vue'
import B24Link from './Link.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<UserProps>(), {
  orientation: 'horizontal'
})
const slots = defineSlots<UserSlots>()

const props = useComponentProps('user', _props)

const appConfig = useAppConfig() as User['AppConfig']
const prefix = usePrefix()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.user || {}) })({
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
  <Primitive
    :as="props.as"
    v-bind="!props.to ? $attrs : {}"
    :data-orientation="props.orientation"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    @click="props.onClick"
  >
    <slot name="avatar" :b24ui="b24ui">
      <B24Chip v-if="props.chip && props.avatar && !['3xs'].includes(props.size || '')" inset v-bind="typeof props.chip === 'object' ? props.chip : {}" :size="chipSize">
        <B24Avatar :alt="props.name" v-bind="props.avatar" :size="props.size" data-slot="avatar" :class="b24ui.avatar({ class: props.b24ui?.avatar })" />
      </B24Chip>
      <B24Avatar
        v-else-if="props.avatar"
        :alt="props.name"
        v-bind="props.avatar"
        :size="props.size"
        data-slot="avatar"
        :class="b24ui.avatar({ class: props.b24ui?.avatar })"
      />
    </slot>

    <div data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <B24Link
        v-if="props.to"
        :aria-label="props.name"
        v-bind="{ to: props.to, target: props.target, ...$attrs }"
        :class="prefix('focus:outline-none peer')"
        raw
      >
        <span :class="prefix('absolute inset-0')" aria-hidden="true" />
      </B24Link>

      <slot>
        <p v-if="props.name || !!slots.name" data-slot="name" :class="b24ui.name({ class: props.b24ui?.name })">
          <slot name="name">
            {{ props.name }}
          </slot>
        </p>
        <p v-if="props.description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
          <slot name="description">
            {{ props.description }}
          </slot>
        </p>
      </slot>
    </div>
  </Primitive>
</template>
