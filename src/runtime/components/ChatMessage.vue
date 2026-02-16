<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { UIMessage } from 'ai'
import theme from '#build/b24ui/chat-message'
import type { AvatarProps, ButtonProps, IconComponent } from '../types'
import type { ComponentConfig } from '../types/tv'

type ChatMessage = ComponentConfig<typeof theme, AppConfig, 'chatMessage'>

export interface ChatMessageProps extends UIMessage {
  /**
   * The element or component this component should render as.
   * @defaultValue 'article'
   */
  as?: any
  /**
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps & { [key: string]: any }
  /**
   * @defaultValue 'message'
   */
  variant?: ChatMessage['variants']['variant']
  /**
   * @defaultValue 'left'
   */
  side?: ChatMessage['variants']['side']
  /**
   * Display a list of actions under the message.
   * The `label` will be used in a tooltip.
   * `{ size: 'sm', color: 'air-secondary-no-accent' }`{lang="ts-type"}
   */
  actions?: (Omit<ButtonProps, 'onClick'> & { onClick?: (e: MouseEvent, message: UIMessage) => void })[]
  /**
   * Render the message in a compact style.
   * This is done automatically when used inside a `UChatPalette`{lang="ts-type"}.
   * @defaultValue false
   */
  compact?: boolean
  class?: any
  b24ui?: ChatMessage['slots']
}

export interface ChatMessageSlots {
  leading(props: { avatar: ChatMessageProps['avatar'], b24ui: ChatMessage['b24ui'] }): any
  content(props: ChatMessageProps): any
  actions(props: { actions: ChatMessageProps['actions'] }): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { omit } from '../utils'
import { tv } from '../utils/tv'
import B24Button from './Button.vue'
import B24Tooltip from './Tooltip.vue'
import B24Avatar from './Avatar.vue'

const props = withDefaults(defineProps<ChatMessageProps>(), {
  as: 'article'
})
const slots = defineSlots<ChatMessageSlots>()

const appConfig = useAppConfig() as ChatMessage['AppConfig']
const uiProp = useComponentUI('chatMessage', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.chatMessage || {}) })({
  variant: props.variant,
  side: props.side,
  leading: !!props.icon || !!props.avatar || !!slots.leading,
  actions: !!props.actions || !!slots.actions,
  compact: props.compact
}))
</script>

<template>
  <Primitive :as="as" :data-role="role" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <div data-slot="container" :class="b24ui.container({ class: uiProp?.container })">
      <div v-if="icon || avatar || !!slots.leading" data-slot="leading" :class="b24ui.leading({ class: uiProp?.leading })">
        <slot name="leading" :avatar="avatar" :b24ui="b24ui">
          <Component
            :is="icon"
            v-if="icon"
            data-slot="leadingIcon"
            :class="b24ui.leadingIcon({ class: uiProp?.leadingIcon })"
          />
          <B24Avatar
            v-else-if="avatar"
            :size="((uiProp?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
            v-bind="avatar"
            data-slot="leadingAvatar"
            :class="b24ui.leadingAvatar({ class: uiProp?.leadingAvatar })"
          />
        </slot>
      </div>

      <div v-if="parts.length || !!slots.content" data-slot="content" :class="b24ui.content({ class: uiProp?.content })">
        <slot
          :id="id"
          name="content"
          :role="role"
          :parts="parts"
        >
          <template v-for="(part, index) in parts" :key="`${id}-${part.type}-${index}`">
            <template v-if="part.type === 'text'">
              {{ part.text }}
            </template>
          </template>
        </slot>
      </div>

      <div v-if="actions || !!slots.actions" data-slot="actions" :class="b24ui.actions({ class: uiProp?.actions })">
        <slot name="actions" :actions="actions">
          <B24Tooltip v-for="(action, index) in actions" :key="index" :text="action.label">
            <B24Button
              size="sm"
              color="air-secondary-no-accent"
              v-bind="omit(action, ['onClick'])"
              @click="typeof action.onClick === 'function' ? action.onClick($event, props) : undefined"
            />
          </B24Tooltip>
        </slot>
      </div>
    </div>
  </Primitive>
</template>
