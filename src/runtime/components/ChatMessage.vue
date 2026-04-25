<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import type { UIDataTypes, UIMessage, UITools, FileUIPart, TextUIPart } from 'ai'
import theme from '#build/b24ui/chat-message'
import type { AvatarProps, ButtonProps, IconComponent } from '../types'
import type { ComponentConfig } from '../types/tv'

type ChatMessage = ComponentConfig<typeof theme, AppConfig, 'chatMessage'>

/**
 * @memo: content: deprecated. Use `parts` instead.
 */
export interface ChatMessageProps<TMetadata = unknown, TDataParts extends UIDataTypes = UIDataTypes, TTools extends UITools = UITools> extends UIMessage<TMetadata, TDataParts, TTools> {
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
  actions?: (Omit<ButtonProps, 'onClick'> & { onClick?: (e: MouseEvent, message: UIMessage<TMetadata, TDataParts, TTools>) => void })[]
  /**
   * Render the message in a compact style.
   * This is done automatically when used inside a `UChatPalette`{lang="ts-type"}.
   * @defaultValue false
   */
  compact?: boolean
  class?: any
  b24ui?: ChatMessage['slots']
}

export interface ChatMessageSlots<TMetadata = unknown, TDataParts extends UIDataTypes = UIDataTypes, TTools extends UITools = UITools> {
  leading?(props: UIMessage<TMetadata, TDataParts, TTools> & { avatar: ChatMessageProps<TMetadata, TDataParts, TTools>['avatar'], b24ui: ChatMessage['b24ui'] }): VNode[]
  files?(props: Omit<UIMessage<TMetadata, TDataParts, TTools>, 'parts'> & { parts: FileUIPart[] }): VNode[]
  content?(props: UIMessage<TMetadata, TDataParts, TTools> & { content?: string }): VNode[]
  actions?(props: UIMessage<TMetadata, TDataParts, TTools> & { actions: ChatMessageProps<TMetadata, TDataParts, TTools>['actions'] }): VNode[]
}
</script>

<script setup lang="ts" generic="TMetadata, TDataParts extends UIDataTypes, TTools extends UITools">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { omit } from '../utils'
import { tv } from '../utils/tv'
import B24Button from './Button.vue'
import B24Tooltip from './Tooltip.vue'
import B24Avatar from './Avatar.vue'

const props = withDefaults(defineProps<ChatMessageProps<TMetadata, TDataParts, TTools>>(), {
  as: 'article'
})
const slots = defineSlots<ChatMessageSlots<TMetadata, TDataParts, TTools>>()

const appConfig = useAppConfig() as ChatMessage['AppConfig']
const uiProp = useComponentUI('chatMessage', props)

const fileParts = computed(() => props.parts?.filter((part): part is FileUIPart => part.type === 'file') ?? [])
const textParts = computed(() => props.parts?.filter((part): part is TextUIPart => part.type === 'text') ?? [])

const messageProps = computed(() => omit(props, ['as', 'icon', 'avatar', 'variant', 'side', 'actions', 'compact', 'class', 'b24ui']))

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
    <div v-if="!!slots.files && fileParts.length" data-slot="files" :class="b24ui.files({ class: uiProp?.files })">
      <slot name="files" v-bind="{ ...messageProps, parts: fileParts }" />
    </div>

    <div data-slot="container" :class="b24ui.container({ class: uiProp?.container })">
      <div v-if="icon || avatar || !!slots.leading" data-slot="leading" :class="b24ui.leading({ class: uiProp?.leading })">
        <slot name="leading" v-bind="{ ...messageProps, avatar, b24ui }">
          <Component :is="icon" v-if="icon" data-slot="leadingIcon" :class="b24ui.leadingIcon({ class: uiProp?.leadingIcon })" />
          <B24Avatar v-else-if="avatar" :size="((uiProp?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])" v-bind="avatar" data-slot="leadingAvatar" :class="b24ui.leadingAvatar({ class: uiProp?.leadingAvatar })" />
        </slot>
      </div>

      <div v-if="textParts.length || !!slots.content" data-slot="content" :class="b24ui.content({ class: uiProp?.content })">
        <slot name="content" v-bind="{ ...messageProps }">
          <template v-for="(part, index) in textParts" :key="`${id}-${part.type}-${index}`">
            {{ part.text }}
          </template>
        </slot>
      </div>

      <div v-if="actions || !!slots.actions" data-slot="actions" :class="b24ui.actions({ class: uiProp?.actions })">
        <slot name="actions" v-bind="{ ...messageProps, actions }">
          <B24Tooltip v-for="(action, index) in actions" :key="index" :text="action.label">
            <B24Button
              size="sm"
              color="air-secondary-no-accent"
              v-bind="omit(action, ['onClick'])"
              :label="undefined"
              @click="typeof action.onClick === 'function' ? action.onClick($event, messageProps) : undefined"
            />
          </B24Tooltip>
        </slot>
      </div>
    </div>
  </Primitive>
</template>
