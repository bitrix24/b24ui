<script setup lang="ts">
import type { Slideover } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  overlayBlur?: Slideover['overlayBlur']
}

withDefaults(defineProps<ExampleProps>(), {
  overlayBlur: 'auto' as const
})
</script>

<template>
  <B24Slideover
    :overlay-blur="overlayBlur"
    :title="`Slideover overlay blur ${overlayBlur}`"
    description="The `overlay-blur` prop use"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-48" />
    </template>
  </B24Slideover>
</template>
