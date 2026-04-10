<script lang="ts">
import type { CollapsibleRootProps } from 'reka-ui'
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/chat-tool'
import type { IconComponent } from '../types'
import type { ChatShimmerProps } from './ChatShimmer.vue'
import type { ComponentConfig } from '../types/tv'

type ChatTool = ComponentConfig<typeof theme, AppConfig, 'chatTool'>

export interface ChatToolProps extends Pick<CollapsibleRootProps, 'defaultOpen' | 'open' | 'disabled' | 'unmountOnHide'> {
  /**
   * The text content to display.
   */
  text?: string
  /**
   * The suffix text displayed after the main text.
   */
  suffix?: string
  /**
   * The icon displayed next to the trigger.
   * @IconifyIcon
   */
  icon?: IconComponent
  /**
   * Whether the tool is in a loading state.
   * @defaultValue false
   */
  loading?: boolean
  /**
   * Shows LoaderWaitIcon in loading mode
   * @defaultValue false
   */
  useWait?: boolean
  /**
   * Shows LoaderClockIcon icon in loading mode
   * @defaultValue false
   */
  useClock?: boolean
  /**
   * The icon displayed when loading.
   * @defaultValue icons.loading
   * @IconifyIcon
   */
  loadingIcon?: IconComponent
  /**
   * Whether the tool content is currently streaming.
   * @defaultValue false
   */
  streaming?: boolean
  /**
   * The visual variant of the tool display.
   * @defaultValue 'inline'
   */
  variant?: ChatTool['variants']['variant']
  /**
   * The position of the chevron icon.
   * @defaultValue 'trailing'
   */
  chevron?: 'leading' | 'trailing'
  /**
   * The icon displayed as the chevron.
   * @defaultValue icons.chevronDown
   * @IconifyIcon
   */
  chevronIcon?: IconComponent
  /**
   * Customize the [`ChatShimmer`](https://bitrix24.github.io/b24ui/docs/components/chat-shimmer/) component when streaming.
   */
  shimmer?: Partial<Omit<ChatShimmerProps, 'text'>>
  class?: any
  b24ui?: ChatTool['slots']
}

export interface ChatToolEmits {
  'update:open': [value: boolean]
}

export interface ChatToolSlots {
  default?(props: { open: boolean }): VNode[]
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24ChatShimmer from './ChatShimmer.vue'
import LoaderWaitIcon from '@bitrix24/b24icons-vue/animated/LoaderWaitIcon'
import LoaderClockIcon from '@bitrix24/b24icons-vue/animated/LoaderClockIcon'
import SpinnerIcon from '@bitrix24/b24icons-vue/specialized/SpinnerIcon'

const props = withDefaults(defineProps<ChatToolProps>(), {
  open: undefined,
  loading: false,
  streaming: false,
  variant: 'inline',
  chevron: 'trailing',
  unmountOnHide: false
})
const emits = defineEmits<ChatToolEmits>()
const slots = defineSlots<ChatToolSlots>()

const appConfig = useAppConfig() as ChatTool['AppConfig']
const uiProp = useComponentUI('chatTool', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.chatTool || {}) })({
  variant: props.variant,
  chevron: props.chevron,
  loading: Boolean(props.loading),
  useWait: Boolean(props.useWait),
  useClock: Boolean(props.useClock)
}))

const isControlled = computed(() => props.open !== undefined)
const internalOpen = ref(props.defaultOpen ?? false)
const resolvedOpen = computed(() => isControlled.value ? props.open : internalOpen.value)

function setOpen(value: boolean) {
  internalOpen.value = value
  emits('update:open', value)
}

const hasContent = computed(() => !!slots.default)

const resolvedLoadingIcon = computed(() => {
  if (props.loadingIcon) return props.loadingIcon
  if (props.useWait) return LoaderWaitIcon
  if (props.useClock) return LoaderClockIcon

  return SpinnerIcon
})
const resolvedIcon = computed(() => props.loading ? resolvedLoadingIcon.value : props.icon)
const chevronIconName = computed(() => props.chevronIcon || icons.chevronDown)
</script>

<template>
  <CollapsibleRoot
    v-slot="{ open: isOpen }"
    :open="resolvedOpen"
    :disabled="disabled"
    :unmount-on-hide="unmountOnHide"
    data-slot="root"
    :class="b24ui.root({ class: [uiProp?.root, props.class] })"
    @update:open="setOpen"
  >
    <CollapsibleTrigger as-child :disabled="!hasContent">
      <button
        type="button"
        data-slot="trigger"
        :class="b24ui.trigger({ class: uiProp?.trigger })"
      >
        <span v-if="resolvedIcon || (hasContent && chevron === 'leading')" data-slot="leading" :class="b24ui.leading({ class: uiProp?.leading })">
          <Component
            :is="resolvedIcon"
            v-if="resolvedIcon"
            data-slot="leadingIcon"
            :class="b24ui.leadingIcon({ class: uiProp?.leadingIcon, alone: !(hasContent && chevron === 'leading') })"
          />
          <Component
            :is="chevronIconName"
            v-if="hasContent && chevron === 'leading'"
            data-slot="chevronIcon"
            :class="b24ui.chevronIcon({ class: uiProp?.chevronIcon, alone: !resolvedIcon })"
          />
        </span>

        <span data-slot="label" :class="b24ui.label({ class: uiProp?.label })">
          <B24ChatShimmer v-if="streaming && text" :text="text" v-bind="props.shimmer" />
          <template v-else>{{ text }}</template>
          <span v-if="suffix" data-slot="suffix" :class="b24ui.suffix({ class: uiProp?.suffix })">{{ suffix }}</span>
        </span>

        <Component
          :is="chevronIconName"
          v-if="hasContent && chevron === 'trailing'"
          data-slot="trailingIcon"
          :class="b24ui.trailingIcon({ class: uiProp?.trailingIcon })"
        />
      </button>
    </CollapsibleTrigger>

    <CollapsibleContent data-slot="content" :class="b24ui.content({ class: uiProp?.content })">
      <div data-slot="body" :class="b24ui.body({ class: uiProp?.body })">
        <slot :open="isOpen" />
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
