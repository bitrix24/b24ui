<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/button'
import type { LinkProps } from './Link.vue'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps } from '../types'
import type { PartialString } from '../types/utils'

const appConfig = _appConfig as AppConfig & { b24ui: { button: Partial<typeof theme> } }

const button = tv({ extend: tv(theme), ...(appConfig.b24ui?.button || {}) })

type ButtonVariants = VariantProps<typeof button>

export interface ButtonProps extends UseComponentIconsProps, Omit<LinkProps, 'raw' | 'custom'> {
  label?: string
  color?: ButtonVariants['color']
  depth?: ButtonVariants['depth']
  size?: ButtonVariants['size']
  /** Rounds the corners of the button. */
  rounded?: boolean
  /** Render the button full width. */
  block?: boolean
  /** Set loading state automatically based on the `@click` promise state */
  loadingAuto?: boolean
  /** Disable uppercase label */
  normalCase?: boolean
  /** Shows `Wait` icon in loading mode */
  useWait?: boolean
  /** Shows `Clock` icon in loading mode */
  useClock?: boolean
  /** Shows `ChevronDownIcon` icon on the right side */
  useDropdown?: boolean
  onClick?: ((event: MouseEvent) => void | Promise<void>) | Array<((event: MouseEvent) => void | Promise<void>)>
  class?: any
  b24ui?: PartialString<typeof button.slots>
}

export interface ButtonSlots {
  leading(props?: {}): any
  default(props?: {}): any
  trailing(props?: {}): any
}
</script>

<script setup lang="ts">
import { type Ref, computed, ref, inject, useSlots } from 'vue'
import { useForwardProps } from 'reka-ui'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useButtonGroup } from '../composables/useButtonGroup'
import { formLoadingInjectionKey } from '../composables/useFormField'
import { omit } from '../utils'
import { pickLinkProps } from '../utils/link'
import B24Avatar from './Avatar.vue'
import B24Link from './Link.vue'
import BtnClockIcon from '@bitrix24/b24icons-vue/button-specialized/BtnClockIcon'
import BtnWaitIcon from '@bitrix24/b24icons-vue/button-specialized/BtnWaitIcon'
import BtnSpinnerIcon from '@bitrix24/b24icons-vue/button-specialized/BtnSpinnerIcon'
import ChevronDownIcon from '@bitrix24/b24icons-vue/actions/ChevronDownIcon'

const props = defineProps<ButtonProps>()
const slots = defineSlots<ButtonSlots>()
const $slots = useSlots()

const linkProps = useForwardProps(pickLinkProps(props))

const { orientation, size: buttonSize, noSplit } = useButtonGroup<ButtonProps>(props)

const loadingAutoState = ref(false)
const formLoading = inject<Ref<boolean> | undefined>(formLoadingInjectionKey, undefined)

async function onClickWrapper(event: MouseEvent) {
  loadingAutoState.value = true
  const callbacks = Array.isArray(props.onClick) ? props.onClick : [props.onClick]
  try {
    await Promise.all(callbacks.map(fn => fn?.(event)))
  } finally {
    loadingAutoState.value = false
  }
}

const isLoading = computed(() => {
  return props.loading || (props.loadingAuto && (loadingAutoState.value || (formLoading?.value && props.type === 'submit')))
})

const { isLeading, leadingIconName } = useComponentIcons(
  computed(() => ({ ...props, loading: isLoading.value }))
)

const isLabel = computed(() => {
  let isUseSlot = false

  if ($slots.default && ($slots.default()[0].children as string).length > 0) {
    isUseSlot = true
  }

  return (props?.label || '').length > 0 || isUseSlot
})

const b24ui = computed(() => button({
  color: props.color,
  depth: props.depth,
  size: buttonSize.value,
  noSplit: Boolean(noSplit.value),
  loading: Boolean(isLoading.value),
  useLabel: Boolean(isLabel.value),
  block: Boolean(props.block),
  normalCase: Boolean(props.normalCase),
  rounded: Boolean(props.rounded),
  useDropdown: Boolean(props.useDropdown),
  useWait: Boolean(props.useWait),
  useClock: Boolean(props.useClock),
  leading: Boolean(isLeading.value),
  buttonGroup: orientation.value
}))
</script>

<template>
  <B24Link
    :type="type"
    :disabled="disabled || isLoading"
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
    v-bind="omit(linkProps, ['type', 'disabled'])"
    raw
    @click="onClickWrapper"
  >
    <div
      class="h-full w-full absolute inset-0 flex flex-row flex-nowrap items-center justify-center"
      :class="[
        isLoading ? 'visible' : 'invisible'
      ]"
    >
      <BtnWaitIcon v-if="useWait" class="size-[21px]" aria-hidden="true" />
      <BtnClockIcon v-else-if="useClock" class="size-lg" aria-hidden="true" />
      <BtnSpinnerIcon v-else class="animate-spin-slow stroke-[6px] size-lg" />
    </div>
    <div
      :class="[
        b24ui.baseLine({ class: [props.b24ui?.baseLine] }),
        isLoading ? 'invisible' : ''
      ]"
    >
      <slot name="leading">
        <Component
          :is="leadingIconName"
          v-if="isLeading && (typeof leadingIconName !== 'undefined')"
          :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
        />
        <B24Avatar
          v-else-if="!!avatar"
          :size="((props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
          v-bind="avatar"
          :class="b24ui.leadingAvatar({ class: props.b24ui?.leadingAvatar })"
        />
      </slot>

      <slot>
        <span v-if="label" :class="b24ui.label({ class: props.b24ui?.label })">
          {{ label }}
        </span>
      </slot>

      <slot name="trailing">
        <ChevronDownIcon
          v-if="useDropdown"
          :class="b24ui.trailingIcon({ class: props.b24ui?.trailingIcon })"
          aria-hidden="true"
        />
      </slot>
    </div>
  </B24Link>
</template>
