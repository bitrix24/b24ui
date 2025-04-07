<script setup lang="ts">
import type { PopoverProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  mode?: PopoverProps['mode']
}

withDefaults(defineProps<ExampleProps>(), {
  mode: 'click' as const
})
</script>

<template>
  <B24Popover
    :mode="mode"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template>
  </B24Popover>
</template>
