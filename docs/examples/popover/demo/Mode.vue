<script setup lang="ts">
import type { PopoverProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  mode?: PopoverProps['mode']
}

withDefaults(defineProps<ExampleProps>(), {
  mode: 'click' as PopoverProps['mode']
})
</script>

<template>
  <B24Popover
    :mode="mode"
    :b24ui="{ content: 'p-[10px]' }"
  >
    <B24Button :label="mode === 'click' ? 'Open' : 'Hover'" />

    <template #content>
      <Placeholder class="size-[192px]" />
    </template>
  </B24Popover>
</template>
