<script setup lang="ts">
import type { RadioGroupItem } from '@bitrix24/b24ui-nuxt'
import ThemeIcon from '@bitrix24/b24icons-vue/outline/ThemeIcon'
import SunIcon from '@bitrix24/b24icons-vue/outline/SunIcon'
import MoonIcon from '@bitrix24/b24icons-vue/outline/MoonIcon'

const items: RadioGroupItem[] = [
  { label: 'System', value: 'system', icon: ThemeIcon, class: 'w-24' },
  { label: 'Light', value: 'light', icon: SunIcon, class: 'w-24' },
  { label: 'Dark', value: 'dark', icon: MoonIcon, class: 'w-24' }
]
</script>

<template>
  <B24RadioGroup
    :items="items"
    default-value="system"
    indicator="hidden"
    orientation="horizontal"
    variant="table"
  />
</template>
