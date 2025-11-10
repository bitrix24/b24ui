<script lang="ts">
import type { SwitchProps } from '../../types'

export interface ColorModeSwitchProps extends Omit<SwitchProps, 'checkedIcon' | 'uncheckedIcon' | 'modelValue'> {
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardProps } from 'reka-ui'
import { useColorMode } from '#imports'
import { useLocale } from '../../composables/useLocale'
import icons from '../../dictionary/icons'
import B24Switch from '../Switch.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<ColorModeSwitchProps>()

const { t } = useLocale()
const colorMode = useColorMode()
// const appConfig = useAppConfig()

const switchProps = useForwardProps(props)

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
    <B24Switch
      v-model="isDark"
      :checked-icon="icons.dark"
      :unchecked-icon="icons.light"
      v-bind="{
        ...switchProps,
        'aria-label': isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark'),
        ...$attrs
      }"
    />

    <template #fallback>
      <B24Switch
        :checked-icon="icons.dark"
        :unchecked-icon="icons.light"
        v-bind="{
          ...switchProps,
          'aria-label': isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark'),
          ...$attrs
        }"
        disabled
      />
    </template>
  </ClientOnly>
</template>
