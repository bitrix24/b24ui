<script setup lang="ts">
import type { SlideoverProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  overlayBlur?: SlideoverProps['overlayBlur']
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  overlayBlur: 'auto' as SlideoverProps['overlayBlur'],
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Slideover
    :overlay-blur="overlayBlur"
    :title="title"
    :description="description"
    :b24ui="{ content: 'sm:top-[300px] sm:max-h-[calc(100%-300px)]' }"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="size-full" />
    </template>
  </B24Slideover>
</template>
