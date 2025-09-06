<script setup lang="ts">
import type { ModalProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  overlayBlur?: ModalProps['overlayBlur']
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  overlayBlur: 'auto' as ModalProps['overlayBlur'],
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Modal
    :overlay-blur="overlayBlur"
    :title="title"
    :description="description"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="h-40" />
    </template>
  </B24Modal>
</template>
