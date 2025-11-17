<script lang="ts">
import type { Ref } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/button'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { LinkProps, AvatarProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type Button = ComponentConfig<typeof theme, AppConfig, 'button'>

export interface ButtonProps extends Omit<UseComponentIconsProps, 'trailing' | 'trailingIcon'>, Omit<LinkProps, 'raw' | 'custom'> {
  label?: string
  /**
   * @defaultValue 'air-secondary-no-accent'
   */
  color?: Button['variants']['color']
  activeColor?: Button['variants']['color']
  /**
   * @depricate
   * @defaultValue 'normal'
   */
  depth?: Button['variants']['depth']
  activeDepth?: Button['variants']['depth']
  /**
   * @defaultValue 'md'
   */
  size?: Button['variants']['size']
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
   * @defaultValue true
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
   * Shows icons.ChevronDownSIcon on the right side
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
  b24ui?: Button['slots']
}

export interface ButtonSlots {
  leading(props: { b24ui: Button['b24ui'] }): any
  default(props: { b24ui: Button['b24ui'] }): any
  trailing(props: { b24ui: Button['b24ui'] }): any
}
</script>

<script setup lang="ts">
import { computed, ref, inject } from 'vue'
import { defu } from 'defu'
import { useForwardProps } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFieldGroup } from '../composables/useFieldGroup'
import { formLoadingInjectionKey } from '../composables/useFormField'
import { omit, mergeClasses } from '../utils'
import { tv } from '../utils/tv'
import { pickLinkProps } from '../utils/link'
import B24Avatar from './Avatar.vue'
import B24Link from './Link.vue'
import B24LinkBase from './LinkBase.vue'
import ChevronDownSIcon from '@bitrix24/b24icons-vue/outline/ChevronDownSIcon'
import LoaderWaitIcon from '@bitrix24/b24icons-vue/animated/LoaderWaitIcon'
import LoaderClockIcon from '@bitrix24/b24icons-vue/animated/LoaderClockIcon'
import SpinnerIcon from '@bitrix24/b24icons-vue/specialized/SpinnerIcon'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  normalCase: true
})

const slots = defineSlots<ButtonSlots>()

const appConfig = useAppConfig() as Button['AppConfig']

const { orientation, size: buttonSize, noSplit } = useFieldGroup<ButtonProps>(props)

const linkProps = useForwardProps(pickLinkProps(props))

/**
 * @memo Problem use at Docs (vue): omit not exports
 */
const proxyLinkProps = computed(() => {
  return omit(linkProps.value, ['type', 'disabled', 'onClick'])
})
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
  extend: tv(theme),
  ...defu({
    variants: {
      active: {
        true: {
          base: mergeClasses(appConfig.b24ui?.button?.variants?.active?.true?.base, props.activeClass)
        },
        false: {
          base: mergeClasses(appConfig.b24ui?.button?.variants?.active?.false?.base, props.inactiveClass)
        }
      }
    }
  }, appConfig.b24ui?.button || {})
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
  fieldGroup: orientation.value,
  isAir: true
}))
</script>

<template>
  <B24Link
    v-slot="{ active, ...slotProps }"
    :type="type"
    :disabled="disabled || isLoading"
    v-bind="proxyLinkProps"
    custom
  >
    <B24LinkBase
      v-bind="slotProps"
      data-slot="base"
      :class="b24ui.base({
        class: [props.b24ui?.base, props.class],
        active,
        ...(active && activeDepth ? { depth: activeDepth } : {}),
        ...(active && activeColor ? { color: activeColor } : {})
      })"
      @click="onClickWrapper"
    >
      <div
        v-if="isLoading"
        data-slot="baseLoading"
        :class="b24ui.baseLoading({ class: props.b24ui?.baseLoading, active })"
      >
        <LoaderWaitIcon v-if="useWait" data-slot="baseLoadingWaitIcon" :class="b24ui.baseLoadingWaitIcon({ class: props.b24ui?.baseLoadingWaitIcon })" aria-hidden="true" />
        <LoaderClockIcon v-else-if="useClock" data-slot="baseLoadingClockIcon" :class="b24ui.baseLoadingClockIcon({ class: props.b24ui?.baseLoadingClockIcon })" aria-hidden="true" />
        <SpinnerIcon v-else data-slot="baseLoadingSpinnerIcon" :class="b24ui.baseLoadingSpinnerIcon({ class: props.b24ui?.baseLoadingSpinnerIcon })" aria-hidden="true" />
      </div>
      <div
        data-slot="baseLine"
        :class="[b24ui.baseLine({ class: [props.b24ui?.baseLine] }), isLoading ? 'invisible' : '']"
      >
        <slot name="leading" :b24ui="b24ui">
          <Component
            :is="leadingIconName"
            v-if="isLeading && (typeof leadingIconName !== 'undefined')"
            data-slot="leadingIcon"
            :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
          />
          <B24Avatar
            v-else-if="!!avatar"
            :size="((props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
            v-bind="avatar"
            data-slot="leadingAvatar"
            :class="b24ui.leadingAvatar({ class: props.b24ui?.leadingAvatar })"
          />
        </slot>

        <slot :b24ui="b24ui">
          <span v-if="label !== undefined && label !== null" data-slot="label" :class="b24ui.label({ class: props.b24ui?.label, active })">
            <span data-slot="labelInner" :class="b24ui.labelInner({ class: props.b24ui?.labelInner, active })">
              {{ label }}
            </span>
          </span>
        </slot>

        <slot name="trailing" :b24ui="b24ui">
          <ChevronDownSIcon
            v-if="useDropdown"
            data-slot="trailingIcon"
            :class="b24ui.trailingIcon({ class: props.b24ui?.trailingIcon })"
            aria-hidden="true"
          />
        </slot>
      </div>
    </B24LinkBase>
  </B24Link>
</template>
