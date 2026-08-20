<script setup lang="ts">
import theme from '#build/b24ui/progress-group'
import type { ProgressGroupItem } from '@bitrix24/b24ui-nuxt'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import AppsIcon from '@bitrix24/b24icons-vue/outline/AppsIcon'
import FileIcon from '@bitrix24/b24icons-vue/main/FileIcon'
import PlayCircleIcon from '@bitrix24/b24icons-vue/main/PlayCircleIcon'

const sizes = Object.keys(theme.variants.size)
const orientations = Object.keys(theme.variants.orientation) as Array<keyof typeof theme.variants.orientation>

const attrs = reactive({
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  orientation: orientations[0] as keyof typeof theme.variants.orientation,
  status: true
})

const items: ProgressGroupItem[] = [
  { label: 'System', value: 24, color: 'air-secondary', icon: SettingsIcon },
  { label: 'Apps', value: 8, color: 'air-primary-alert', icon: AppsIcon },
  { label: 'Documents', value: 12, color: 'air-primary-warning', icon: FileIcon },
  { label: 'Multimedia', value: 42, color: 'air-primary-success', icon: PlayCircleIcon }
]

const plain: ProgressGroupItem[] = [
  { label: 'Read', value: 42 },
  { label: 'Write', value: 18 }
]
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select
        v-model="attrs.size"
        class="w-32"
        :items="sizes"
        placeholder="Size"
        multiple
        size="xs"
      />
      <B24Select v-model="singleAttrs.orientation" class="w-40" :items="orientations" placeholder="Orientation" size="xs" />
      <B24Switch v-model="singleAttrs.status" label="Status" size="xs" />
    </template>

    <Matrix
      v-slot="props"
      :attrs="attrs"
      :b24ui="{ body: ['gap-6', singleAttrs.orientation === 'vertical' ? 'flex-row' : ''] }"
    >
      <B24ProgressGroup
        :items="items"
        :max="128"
        v-bind="{ ...singleAttrs, ...props }"
        :class="singleAttrs.orientation === 'vertical' ? 'h-80' : 'w-80'"
      />
      <B24ProgressGroup
        :items="plain"
        :max="128"
        v-bind="{ ...singleAttrs, ...props }"
        :class="singleAttrs.orientation === 'vertical' ? 'h-80' : 'w-80'"
      />
    </Matrix>
  </PlaygroundPage>
</template>
