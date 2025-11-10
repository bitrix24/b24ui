<script lang="ts">
import type { SelectMenuProps, SelectMenuItem } from '../../types'

export interface ColorModeSelectProps extends Omit<SelectMenuProps<SelectMenuItem[]>, 'icon' | 'items' | 'modelValue'> {
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardProps } from 'reka-ui'
import { useColorMode } from '#imports'
import { useLocale } from '../../composables/useLocale'
import icons from '../../dictionary/icons'
import B24SelectMenu from '../SelectMenu.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ColorModeSelectProps>(), {
  searchInput: false
})

const { t } = useLocale()
const colorMode = useColorMode()
// const appConfig = useAppConfig()

const selectMenuProps = useForwardProps(props)

const items = computed(() => [
  { label: t('colorMode.system'), value: 'system' as const, icon: icons.system },
  { label: t('colorMode.light'), value: 'light' as const, icon: icons.light },
  { label: t('colorMode.dark'), value: 'dark' as const, icon: icons.dark }
])

const preference = computed({
  get() {
    return items.value.find(option => option.value === colorMode.preference) || items.value[0]!
  },
  set(option) {
    colorMode.preference = option!.value
  }
})
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <B24SelectMenu
      v-model="preference"
      :icon="preference?.icon"
      v-bind="{ ...(selectMenuProps as any), ...$attrs }"
      :items="items"
    />

    <template #fallback>
      <B24SelectMenu
        :icon="items[0]?.icon"
        :model-value="items[0]"
        v-bind="{ ...(selectMenuProps as any), ...$attrs }"
        :items="items"
        disabled
      />
    </template>
  </ClientOnly>
</template>
