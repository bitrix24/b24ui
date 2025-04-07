<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/button'
import type { LinkProps } from './Link.vue'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import { tv } from '../utils/tv'
import type { AvatarProps } from '../types'
import type { PartialString } from '../types/utils'

const appConfigButton = _appConfig as AppConfig & { b24ui: { button: Partial<typeof theme> } }

const button = tv({ extend: tv(theme), ...(appConfigButton.b24ui?.button || {}) })

type ButtonVariants = VariantProps<typeof button>

export interface ButtonProps extends Omit<UseComponentIconsProps, 'trailing' | 'trailingIcon'>, Omit<LinkProps, 'raw' | 'custom'> {
  label?: string
  /**
   * @defaultValue 'default'
   */
  color?: ButtonVariants['color']
  activeColor?: ButtonVariants['color']
  /**
   * @defaultValue 'normal'
   */
  depth?: ButtonVariants['depth']
  activeDepth?: ButtonVariants['depth']
  /**
   * @defaultValue 'md'
   */
  size?: ButtonVariants['size']
  /**
   * Rounds the corners of the button
   * @defaultValue false
   */
  rounded?: boolean
  /**
   * Render the button full width
   * @defaultValue false
   */
  block?: boolean
  /**
   * Set loading state automatically based on the `@click` promise state
   * @defaultValue false
   */
  loadingAuto?: boolean
  /**
   * Disable uppercase label
   * @defaultValue false
   */
  normalCase?: boolean
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
   * Shows icons.chevronDown on the right side
   * @defaultValue false
   */
  useDropdown?: boolean
  onClick?: ((event: MouseEvent) => void | Promise<void>) | Array<((event: MouseEvent) => void | Promise<void>)>
  class?: any
  /**
   * The class to apply when the link is active
   * @defaultValue ''
   */
  activeClass?: string
  /**
   * The class to apply when the link is inactive
   * @defaultValue ''
   */
  inactiveClass?: string
  b24ui?: PartialString<typeof button.slots>
}

export interface ButtonSlots {
  leading(props?: {}): any
  default(props?: {}): any
  trailing(props?: {}): any
}
</script>

<script setup lang="ts">
import { type Ref, computed, ref, inject } from 'vue'
import { useForwardProps } from 'reka-ui'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useButtonGroup } from '../composables/useButtonGroup'
import { formLoadingInjectionKey } from '../composables/useFormField'
import { omit } from '../utils'
import { pickLinkProps } from '../utils/link'
import B24Avatar from './Avatar.vue'
import B24Link from './Link.vue'
import B24LinkBase from './LinkBase.vue'
import ChevronDownIcon from '@bitrix24/b24icons-vue/actions/ChevronDownIcon'
import LoaderWaitIcon from '@bitrix24/b24icons-vue/animated/LoaderWaitIcon'
import LoaderClockIcon from '@bitrix24/b24icons-vue/animated/LoaderClockIcon'
import SpinnerIcon from '@bitrix24/b24icons-vue/specialized/SpinnerIcon'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  active: undefined,
  activeClass: '',
  inactiveClass: ''
})

const slots = defineSlots<ButtonSlots>()

const linkProps = useForwardProps(pickLinkProps(props))

/**
 * @memo Problem use at Docs (vue): omit not exports
 */
const proxyLinkProps = computed(() => {
  return omit(linkProps.value, ['type', 'disabled', 'onClick'])
})

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
  computed(() => ({ ...props, loading: false }))
)

const isLabel = computed(() => {
  let isUseSlot = false

  if (slots && !!slots.default) {
    isUseSlot = true
  }

  return (props?.label || '').length > 0 || isUseSlot
})

const b24ui = computed(() => tv({
  extend: button,
  variants: {
    active: {
      true: {
        base: props.activeClass
      },
      false: {
        base: props.inactiveClass
      }
    }
  }
})({
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
    v-slot="{ active, ...slotProps }"
    :type="type"
    :disabled="disabled || isLoading"
    :class="b24ui.base({ class: [props.class, props.b24ui?.base] })"
    v-bind="proxyLinkProps"
    custom
  >
    <B24LinkBase
      v-bind="slotProps"
      :class="b24ui.base({
        class: [props.class, props.b24ui?.base],
        active,
        ...(active && activeDepth ? { depth: activeDepth } : {}),
        ...(active && activeColor ? { color: activeColor } : {})
      })"
      @click="onClickWrapper"
    >
      <div
        v-if="isLoading"
        class="h-full w-full absolute inset-0 flex flex-row flex-nowrap items-center justify-center"
      >
        <LoaderWaitIcon v-if="useWait" class="w-[28px] h-[28px]" aria-hidden="true" />
        <LoaderClockIcon v-else-if="useClock" class="w-[28px] h-[28px]" aria-hidden="true" />
        <SpinnerIcon v-else class="size-lg animate-spin stroke-2" aria-hidden="true" />
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
          <span v-if="label" :class="b24ui.label({ class: props.b24ui?.label, active })">
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
    </B24LinkBase>
  </B24Link>
</template>
