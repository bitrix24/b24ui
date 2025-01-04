<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/advice'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import { tv } from '../utils/tv'
import type { AvatarProps } from '../types'

const appConfig = _appConfig as AppConfig & { b24ui: { advice: Partial<typeof theme> } }

const advice = tv({ extend: tv(theme), ...(appConfig.b24ui?.advice || {}) })

type AdviceVariants = VariantProps<typeof advice>

export interface AdviceProps extends Omit<UseComponentIconsProps, 'loading' | 'trailing' | 'trailingIcon'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  description?: string
  angle?: AdviceVariants['angle']
  class?: any
  b24ui?: Partial<typeof advice.slots>
}

export interface AdviceSlots {
  leading(props?: {}): any
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useComponentIcons } from '../composables/useComponentIcons'
import B24Avatar from './Avatar.vue'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AdviceProps>(), {
  as: 'div',
  angle: 'bottom'
})
const slots = defineSlots<AdviceSlots>()

const { isLeading, leadingIconName } = useComponentIcons(
  computed(() => ({ ...props, loading: false }))
)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => advice({
  angle: props.angle
}))
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <div v-if="isLeading || !!avatar || !!slots.leading" :class="b24ui.leading({ class: props.b24ui?.leading })">
      <slot name="leading">
        <Component
          :is="leadingIconName"
          v-if="isLeading && leadingIconName"
          :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
        />
        <B24Avatar
          v-else-if="!!avatar"
          :size="((props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
          v-bind="avatar"
          :class="b24ui.leadingAvatar({ class: props.b24ui?.leadingAvatar })"
        />
      </slot>
    </div>
    <div
      v-else
      :class="b24ui.leading({ class: props.b24ui?.leading })"
    >
      <B24Avatar
        :size="((props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
        :icon="PersonIcon"
        alt="Person"
        :class="b24ui.leadingAvatar({ class: props.b24ui?.leadingAvatar })"
        :b24ui="{ icon: 'text-white bg-base-800 dark:text-200' }"
      />
    </div>
    <div :class="b24ui.description({ class: props.b24ui?.description })">
      <slot>
        {{ description }}
      </slot>
    </div>
  </Primitive>
</template>
