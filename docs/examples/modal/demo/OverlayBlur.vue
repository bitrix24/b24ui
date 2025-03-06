<script setup lang="ts">
import type { ModalProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  overlayBlur?: ModalProps['overlayBlur']
}

withDefaults(defineProps<ExampleProps>(), {
  overlayBlur: 'auto' as const
})
</script>

<template>
  <B24Modal
    :overlay-blur="overlayBlur"
    :title="`Modal overlay blur ${overlayBlur}`"
    description="The `overlay-blur` prop use"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-48" />
    </template>
  </B24Modal>
</template>
