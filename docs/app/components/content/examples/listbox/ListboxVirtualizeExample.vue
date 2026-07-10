<script setup lang="ts">
import type { ListboxItem } from '@bitrix24/b24ui-nuxt'
import FileIcon from '@bitrix24/b24icons-vue/outline/FileIcon'

const items: ListboxItem[] = Array.from({ length: 1000 }, (_, i) => ({
  label: `Item ${i + 1}`,
  icon: FileIcon,
  value: i + 1
}))

const value = ref<ListboxItem[]>([])
</script>

<template>
  <B24Listbox
    v-model="value"
    :items="items"
    multiple
    virtualize
    class="w-full"
  />
</template>
