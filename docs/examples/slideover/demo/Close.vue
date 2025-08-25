<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Slideover
    :title="title"
    :description="description"
    :close="{ label: 'Test', color: 'air-primary-copilot' } as ButtonProps"
    :b24ui="{ close: '-left-[1px]' }"
  >
    <B24Button label="Open with ai close button" />

    <template #body>
      <Placeholder class="size-full" />
    </template>
  </B24Slideover>
</template>
