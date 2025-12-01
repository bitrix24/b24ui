<script lang="ts">
import type { ButtonProps, LinkPropsKeys } from '../../types'

export interface ColorModeButtonProps extends Omit<ButtonProps, LinkPropsKeys | 'color'> {
  /**
   * @defaultValue 'air-tertiary-no-accent'
   */
  color?: ButtonProps['color']
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardProps } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import { useColorMode } from '#imports'
import { useLocale } from '../../composables/useLocale'
import icons from '../../dictionary/icons'
import B24Button from '../Button.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ColorModeButtonProps>(), {
  color: 'air-tertiary-no-accent'
})

const { t } = useLocale()
const colorMode = useColorMode()
// const appConfig = useAppConfig()

const buttonProps = useForwardProps(reactiveOmit(props, 'icon'))

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark: boolean) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})
</script>

<template>
  <B24Button
    v-bind="{
      ...buttonProps,
      'aria-label': isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark'),
      ...$attrs
    }"
    @click="isDark = !isDark"
  >
    <template #leading="{ b24ui }">
      <Component :is="icons.dark" data-slot="leadingIcon" :class="b24ui.leadingIcon({ class: [props.b24ui?.leadingIcon, 'hidden dark:inline-block'] })" />
      <Component :is="icons.light" data-slot="leadingIcon" :class="b24ui.leadingIcon({ class: [props.b24ui?.leadingIcon, 'dark:hidden'] })" />
    </template>
  </B24Button>
</template>
