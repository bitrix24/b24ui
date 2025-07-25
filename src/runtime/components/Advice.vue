<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/advice'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps } from '../types'
import type { ComponentConfig } from '../types/utils'

type Advice = ComponentConfig<typeof theme, AppConfig, 'advice'>

export interface AdviceProps extends Omit<UseComponentIconsProps, 'loading' | 'trailing' | 'trailingIcon'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  description?: string
  /**
   * @defaultValue 'bottom'
   */
  angle?: Advice['variants']['angle']
  class?: any
  b24ui?: Advice['slots']
}

export interface AdviceSlots {
  leading(props?: {}): any
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentIcons } from '../composables/useComponentIcons'
import { tv } from '../utils/tv'
import B24Avatar from './Avatar.vue'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AdviceProps>(), {
  as: 'div',
  angle: 'bottom'
})
const slots = defineSlots<AdviceSlots>()

const appConfig = useAppConfig() as Advice['AppConfig']

const { isLeading, leadingIconName } = useComponentIcons(
  computed(() => ({ ...props, loading: false }))
)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.advice || {}) })({
  angle: props.angle
}))
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
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
    <div :class="b24ui.descriptionWrapper({ class: props.b24ui?.descriptionWrapper })">
      <div :class="b24ui.descriptionAngle({ class: props.b24ui?.descriptionAngle })">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
        >
          <path
            :class="b24ui.descriptionBg({ class: props.b24ui?.descriptionBg })"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.3513 11.1621C11.3492 11.1591 11.3471 11.1562 11.3449 11.1532C8.41055 10.7202 3.75061 9.56187 0.411676 6.46663C-0.404067 5.71042 0.0889447 4.42611 1.14665 4.08179C3.50511 3.31403 5.56665 2.10552 7.2199 0.897773L7.23071 0.893616L8.27368 0.163147L10.7925 5.46165L13.8677 11.5454L11.3513 11.1621Z"
          /><path
            :class="b24ui.descriptionBorder({ class: props.b24ui?.descriptionBorder })"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4909 10.1639C11.7603 10.2036 12.0018 10.3515 12.1597 10.5733C12.3534 10.8456 12.5531 11.1134 12.7585 11.3765L11.3513 11.1621C11.3492 11.1591 11.3471 11.1561 11.3449 11.1531C8.41055 10.7202 3.75061 9.56187 0.411676 6.46662C-0.404067 5.71041 0.0889447 4.4261 1.14665 4.08178C3.50511 3.31403 5.56665 2.10551 7.2199 0.897764L7.23071 0.893607L8.16412 0.239868C8.18419 0.40792 8.20611 0.57539 8.22987 0.742259C8.28188 1.1077 8.12836 1.47208 7.8305 1.6901C6.11459 2.94612 3.95168 4.2203 1.45619 5.03267C1.22829 5.10686 1.07777 5.27921 1.02492 5.43712C1.00004 5.51147 1.00122 5.56804 1.00948 5.60492C1.01647 5.63618 1.03368 5.67964 1.09152 5.73326C4.20493 8.61944 8.61693 9.73979 11.4909 10.1639Z"
          /></svg>
      </div>
      <div :class="b24ui.description({ class: props.b24ui?.description })">
        <slot>
          {{ description }}
        </slot>
      </div>
    </div>
  </Primitive>
</template>
