<script setup lang="ts">
import theme from '#build/b24ui/progress-group'
import type { ProgressGroupItem } from '@bitrix24/b24ui-nuxt'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import AppsIcon from '@bitrix24/b24icons-vue/outline/AppsIcon'
import FileIcon from '@bitrix24/b24icons-vue/main/FileIcon'
import PlayCircleIcon from '@bitrix24/b24icons-vue/main/PlayCircleIcon'

const sizes = Object.keys(theme.variants.size)
const orientations = Object.keys(theme.variants.orientation)

const size = ref(theme.defaultVariants.size as keyof typeof theme.variants.size)
const orientation = ref('horizontal' as keyof typeof theme.variants.orientation)

const items = ref<ProgressGroupItem[]>([
  { label: 'System', value: 24, color: 'air-secondary', icon: SettingsIcon },
  { label: 'Apps', value: 8, color: 'air-primary-alert', icon: AppsIcon },
  { label: 'Documents', value: 12, color: 'air-primary-warning', icon: FileIcon },
  { label: 'Multimedia', value: 42, color: 'air-primary-success', icon: PlayCircleIcon }
])

const plain = ref<ProgressGroupItem[]>([
  { label: 'Read', value: 42 },
  { label: 'Write', value: 18 }
])
</script>

<template>
  <Navbar />

  <div class="flex flex-col gap-8 p-4">
    <div class="flex flex-wrap items-center gap-4">
      <B24SelectMenu v-model="size" :items="sizes" class="w-32" />
      <B24SelectMenu v-model="orientation" :items="orientations" class="w-40" />
    </div>

    <B24ProgressGroup
      :items="items"
      :max="128"
      :size="size"
      :orientation="orientation"
      status
      :class="orientation === 'vertical' ? 'h-96' : 'w-96'"
    />

    <B24ProgressGroup :items="plain" :max="128" :size="size" :orientation="orientation" :class="orientation === 'vertical' ? 'h-96' : 'w-96'" />
  </div>
</template>
