<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/banner'
import type { ButtonProps, IconComponent, LinkProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type Banner = ComponentConfig<typeof theme, AppConfig, 'banner'>

export interface BannerProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * A unique id saved to local storage to remember if the banner has been dismissed.
   * Change this value to show the banner again.
   * @defaultValue '1'
   */
  id?: string
  /**
   * The icon displayed next to the title.
   * @IconComponent
   */
  icon?: IconComponent
  title?: string
  /**
   * Display a list of actions next to the title.
   * `{ color: 'air-secondary-no-accent', size: 'xs' }`{lang="ts-type"}
   */
  actions?: ButtonProps[]
  to?: LinkProps['to']
  target?: LinkProps['target']
  /**
   * @defaultValue 'air-primary-alert'
   */
  color?: Banner['variants']['color']
  /**
   * Display a close button to dismiss the banner.
   * `{ size: 'md', color: 'air-tertiary-no-accent' }`{lang="ts-type"}
   * @emits `close`
   * @defaultValue false
   */
  close?: boolean | Partial<ButtonProps>
  /**
   * The icon displayed in the close button.
   * @defaultValue icons.close
   * @IconComponent
   */
  closeIcon?: IconComponent
  class?: any
  b24ui?: Banner['slots']
}

export interface BannerSlots {
  leading(props: { b24ui: Banner['b24ui'] }): any
  title(props?: {}): any
  actions(props?: {}): any
  close(props: { b24ui: Banner['b24ui'] }): any
}

export interface BannerEmits {
  close: []
}
</script>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { Primitive } from 'reka-ui'
import { useHead, useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Link from './Link.vue'
import B24Container from './Container.vue'
import B24Button from './Button.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<BannerProps>()
const slots = defineSlots<BannerSlots>()
const emits = defineEmits<BannerEmits>()

const { t } = useLocale()
const appConfig = useAppConfig() as Banner['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.banner || {}) })({
  color: props.color,
  to: !!props.to
}))

const id = computed(() => `banner-${props.id || '1'}`)

watch(id, (newId) => {
  if (typeof document === 'undefined' || typeof localStorage === 'undefined') return

  const isClosed = localStorage.getItem(newId) === 'true'
  const htmlElement = document.querySelector('html')

  htmlElement?.classList.toggle('hide-banner', isClosed)
})

useHead({
  script: [{
    key: 'prehydrate-template-banner',
    innerHTML: `
            if (localStorage.getItem('${id.value}') === 'true') {
              document.querySelector('html').classList.add('hide-banner')
            }`.replace(/\s+/g, ' '),
    type: 'text/javascript'
  }]
})

function onClose() {
  localStorage.setItem(id.value, 'true')
  document.querySelector('html')?.classList.add('hide-banner')
  emits('close')
}
</script>

<template>
  <Primitive :as="as" class="banner" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <B24Link
      v-if="to"
      :aria-label="title"
      v-bind="{ to, target, ...$attrs }"
      class="focus:outline-none"
      tabindex="-1"
      raw
    >
      <span class="absolute inset-0 " aria-hidden="true" />
    </B24Link>

    <B24Container data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <div data-slot="left" :class="b24ui.left({ class: props.b24ui?.left })" />

      <div data-slot="center" :class="b24ui.center({ class: props.b24ui?.center })">
        <slot name="leading" :b24ui="b24ui">
          <Component :is="icon" v-if="icon" data-slot="icon" :class="b24ui.icon({ class: props.b24ui?.icon })" />
        </slot>

        <div v-if="title || !!slots.title" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <div v-if="actions?.length || !!slots.actions" data-slot="actions" :class="b24ui.actions({ class: props.b24ui?.actions })">
          <slot name="actions">
            <B24Button
              v-for="(action, index) in actions"
              :key="index"
              color="air-secondary-no-accent"
              size="xs"
              v-bind="action"
            />
          </slot>
        </div>
      </div>

      <div data-slot="right" :class="b24ui.right({ class: props.b24ui?.right })">
        <slot name="close" :b24ui="b24ui">
          <B24Button
            v-if="close"
            :icon="closeIcon || icons.close"
            size="md"
            color="air-tertiary-no-accent"
            :aria-label="t('banner.close')"
            v-bind="(typeof close === 'object' ? close as Partial<ButtonProps> : {})"
            data-slot="close"
            :class="b24ui.close({ class: props.b24ui?.close })"
            @click="onClose"
          />
        </slot>
      </div>
    </B24Container>
  </Primitive>
</template>

<style scoped>
.hide-banner .banner {
  display: none;
}
</style>
