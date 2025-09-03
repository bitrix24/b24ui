<script lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'

export interface ColorModeButtonProps extends /** @vue-ignore */ Pick<ButtonProps, 'as' | 'size' | 'disabled' | 'b24ui'> {
  /**
   * @defaultValue 'air-tertiary-no-accent'
   */
  color?: ButtonProps['color']
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '#imports'
import { useLocale } from '../../composables/useLocale'
import icons from '../../dictionary/icons'
import B24Button from '../Button.vue'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<ColorModeButtonProps>(), {
  color: 'air-tertiary-no-accent'
})
defineSlots<{
  fallback(props?: {}): any
}>()

const { t } = useLocale()
const colorMode = useColorMode()
// const appConfig = useAppConfig()

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
  <ClientOnly v-if="!colorMode?.forced">
    <B24Button
      :icon="isDark ? icons.dark : icons.light"
      :color="color"
      :aria-label="isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark')"
      v-bind="$attrs"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <slot name="fallback">
        <div class="size-8" />
      </slot>
    </template>
  </ClientOnly>
</template>
