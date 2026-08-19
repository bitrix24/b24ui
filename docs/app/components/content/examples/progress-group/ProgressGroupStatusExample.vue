<script setup lang="ts">
import type { ProgressGroupItem } from '@bitrix24/b24ui-nuxt'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import AppsIcon from '@bitrix24/b24icons-vue/outline/AppsIcon'
import FileIcon from '@bitrix24/b24icons-vue/main/FileIcon'
import PlayCircleIcon from '@bitrix24/b24icons-vue/main/PlayCircleIcon'

const max = 128

const items: ProgressGroupItem[] = [
  { label: 'System', value: 24, color: 'air-secondary', icon: SettingsIcon },
  { label: 'Apps', value: 8, color: 'air-primary-alert', icon: AppsIcon },
  { label: 'Documents', value: 12, color: 'air-primary-warning', icon: FileIcon },
  { label: 'Multimedia', value: 42, color: 'air-primary-success', icon: PlayCircleIcon }
]

const used = items.reduce((total, item) => total + (item.value ?? 0), 0)
</script>

<template>
  <B24ProgressGroup :items="items" :max="max" status class="w-96" :b24ui="{ status: 'w-full justify-between' }">
    <template #status>
      <p>{{ used }}GB used</p>
      <p class="text-description">
        {{ max - used }}GB remaining
      </p>
    </template>
  </B24ProgressGroup>
</template>
