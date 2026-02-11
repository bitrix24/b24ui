<script setup lang="ts">
import type { ShortcutsConfig } from '@bitrix24/b24ui-nuxt/composables/defineShortcuts'
import { ref } from 'vue'
import usePageMeta from './../../composables/usePageMeta'
import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon'

usePageMeta.setPageTitle('Shortcuts')

const logs = ref<string[]>([])

// Shortcuts to test the shift+punctuation fix
const shortcutsList = [
  // The fix: these pairs should trigger independently
  { key: 'meta_.', label: '⌘.' },
  { key: 'meta_shift_.', label: '⌘⇧.' },
  { key: 'meta_,', label: '⌘,' },
  { key: 'meta_shift_,', label: '⌘⇧,' },

  // Alphabet keys (should also work)
  { key: 'meta_k', label: '⌘K' },
  { key: 'meta_shift_k', label: '⌘⇧K' },

  // Simple keys
  { key: 'a', label: 'A' },
  { key: 'shift_a', label: '⇧A' },

  // Chained shortcuts
  { key: 'g-i', label: 'G→I' }
]

const shortcuts = computed<ShortcutsConfig>(() => {
  return shortcutsList.reduce<ShortcutsConfig>((acc, { key, label }) => {
    acc[key] = () => {
      logs.value.unshift(`${label} (${key})`)
    }
    return acc
  }, {})
})

defineShortcuts(shortcuts)
</script>

<template>
  <div class="w-full flex flex-col justify-stretch items-stretch gap-4 h-full">
    <B24Card :b24ui="{ header: 'flex items-center justify-between' }">
      <template #header>
        <h3 class="font-bold">
          Test shortcuts
        </h3>

        <b24Input placeholder="Input to test usingInput behavior" class="w-60" />
      </template>

      <div class="flex flex-wrap gap-2">
        <B24Kbd v-for="{ label } in shortcutsList" :key="label">
          {{ label }}
        </B24Kbd>
      </div>
    </B24Card>

    <B24Card :b24ui="{ body: 'h-[200px] overflow-y-auto' }" class="flex-1">
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <h3 class="font-bold">
            Logs ({{ logs.length }})
          </h3>
          <B24Button :icon="TrashBinIcon" size="sm" class="-my-1" @click="logs = []" />
        </div>
      </template>

      <div v-if="logs.length === 0" class="text-muted">
        Press any shortcut...
      </div>
      <p v-for="(log, index) of logs" :key="index" class="font-mono text-sm">
        {{ log }}
      </p>
    </B24Card>
  </div>
</template>
