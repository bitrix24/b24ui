<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
</script>

<template>
  <B24Slideover
    title="Slideover with ai close button"
    description="The `close` prop inherits from the Button props."
    :close="{ label: 'Test', color: 'air-primary-copilot' } as ButtonProps"
    :b24ui="{ close: '-left-[1px]' }"
  >
    <B24Button label="Open with ai close button" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-full w-full" />
    </template>
  </B24Slideover>
</template>
