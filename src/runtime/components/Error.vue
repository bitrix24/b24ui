<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { NuxtError } from '#app'
import theme from '#build/b24ui/error'
import type { ButtonProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type Error = ComponentConfig<typeof theme, AppConfig, 'error'>

export interface ErrorProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  error?: Partial<NuxtError & { message: string }>
  /**
   * The URL to redirect to when the error is cleared.
   * @defaultValue '/'
   */
  redirect?: string
  /**
   * Display a button to clear the error in the links slot.
   * `{ size: 'lg', color: 'air-primary', label: 'Back to home' }`{lang="ts-type"}
   * @defaultValue true
   */
  clear?: boolean | Partial<ButtonProps>
  class?: any
  b24ui?: Error['slots']
}

export interface ErrorSlots {
  default(props?: {}): any
  statusCode(props?: {}): any
  statusMessage(props?: {}): any
  message(props?: {}): any
  links(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { clearError, useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<ErrorProps>(), {
  redirect: '/',
  clear: true
})
const slots = defineSlots<ErrorSlots>()

const { t } = useLocale()
const appConfig = useAppConfig() as Error['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.error || {}) })())

function handleError() {
  clearError({ redirect: props.redirect })
}
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <p v-if="!!props.error?.statusCode || !!slots.statusCode" data-slot="statusCode" :class="b24ui.statusCode({ class: props.b24ui?.statusCode })">
      <slot name="statusCode">
        {{ props.error?.statusCode }}
      </slot>
    </p>
    <h1 v-if="!!props.error?.statusMessage || !!slots.statusMessage" data-slot="statusMessage" :class="b24ui.statusMessage({ class: props.b24ui?.statusMessage })">
      <slot name="statusMessage">
        {{ props.error?.statusMessage }}
      </slot>
    </h1>
    <p v-if="(props.error?.message && props.error.message !== props.error.statusMessage) || !!slots.message" data-slot="message" :class="b24ui.message({ class: props.b24ui?.message })">
      <slot name="message">
        {{ props.error?.message }}
      </slot>
    </p>
    <div v-if="!!clear || !!slots.links" data-slot="links" :class="b24ui.links({ class: props.b24ui?.links })">
      <slot name="links">
        <B24Button
          v-if="clear"
          size="lg"
          color="air-primary"
          :label="t('error.clear')"
          v-bind="(typeof clear === 'object' ? clear as Partial<ButtonProps> : {})"
          @click="handleError"
        />
      </slot>
    </div>
  </Primitive>
</template>
