<script setup lang="ts">
import type { SlideoverProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  side?: SlideoverProps['side']
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  side: 'bottom' as SlideoverProps['side'],
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Slideover
    :side="side"
    :title="title"
    :description="description"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="size-full" />
    </template>
  </B24Slideover>
</template>
