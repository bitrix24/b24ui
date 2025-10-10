<script setup lang="ts">
import TagIcon from '@bitrix24/b24icons-vue/outline/TagIcon'

const items = ref([
  {
    label: 'bug',
    value: 'bug',
    chip: {
      color: 'air-primary-alert' as const
    }
  },
  {
    label: 'feature',
    value: 'feature',
    chip: {
      color: 'air-primary-success' as const
    }
  },
  {
    label: 'enhancement',
    value: 'enhancement',
    chip: {
      color: 'air-primary' as const
    }
  }
])
const label = ref([])
</script>

<template>
  <B24Popover :content="{ side: 'right', align: 'start' }">
    <B24Button
      :icon="TagIcon"
      label="Select labels"
    />

    <template #content>
      <B24CommandPalette
        v-model="label"
        :multiple="true"
        placeholder="Search labels..."
        :groups="[{ id: 'labels', items }]"
        :b24ui="{ input: '[&>input]:h-8 [&>input]:text-sm' }"
      />
    </template>
  </B24Popover>
</template>
