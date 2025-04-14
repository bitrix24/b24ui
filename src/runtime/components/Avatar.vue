<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/avatar'
import type { ComponentConfig } from '../types/utils'
import type { IconComponent } from '../types'

type Avatar = ComponentConfig<typeof theme, AppConfig, 'avatar'>

export interface AvatarProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: any
  src?: string
  alt?: string
  /**
   * Display an icon on the left side.
   * @IconComponent
   */
  icon?: IconComponent
  text?: string
  /**
   * @defaultValue 'md'
   */
  size?: Avatar['variants']['size']
  class?: any
  style?: any
  b24ui?: Avatar['slots']
}

export interface AvatarSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Primitive, Slot } from 'reka-ui'
import { useAppConfig } from '#imports'
import ImageComponent from '#build/b24ui-image-component'
import { useAvatarGroup } from '../composables/useAvatarGroup'
import { tv } from '../utils/tv'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AvatarProps>(), { as: 'span' })

const fallback = computed(() => props.text || (props.alt || '')
  .replace(/[+\-*)(}\][{]/g, '')
  .split(' ')
  .map(word => word.charAt(0))
  .join('')
  .substring(0, 2)
)

const appConfig = useAppConfig() as Avatar['AppConfig']
const { size } = useAvatarGroup(props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.avatar || {}) })({
  size: size.value
}))

const sizePx = computed(() => ({
  '3xs': 10,
  '2xs': 14,
  'xs': 18,
  'sm': 22,
  'md': 32,
  'lg': 42,
  'xl': 48,
  '2xl': 60,
  '3xl': 94
})[props.size || 'md'])

const error = ref(false)

watch(() => props.src, () => {
  if (error.value) {
    error.value = false
  }
})

function onError() {
  error.value = true
}
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })" :style="props.style">
    <component
      :is="ImageComponent"
      v-if="src && !error"
      role="img"
      :src="src"
      :alt="alt"
      :width="sizePx"
      :height="sizePx"
      v-bind="$attrs"
      :class="b24ui.image({ class: props.b24ui?.image })"
      @error="onError"
    />

    <Slot v-else v-bind="$attrs">
      <slot>
        <Component :is="icon" v-if="icon" :class="b24ui.icon({ class: props.b24ui?.icon })" />
        <span v-else :class="b24ui.fallback({ class: props.b24ui?.fallback })">{{ fallback || '&nbsp;' }}</span>
      </slot>
    </Slot>
  </Primitive>
</template>
