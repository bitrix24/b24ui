<script setup lang="ts">
import type { SlideoverProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  side?: SlideoverProps['side']
}

withDefaults(defineProps<SlideoverProps>(), {
  side: 'right' as const
})
</script>

<template>
  <B24Slideover
    :side="side"
    title="Slideover with side"
    :description="`This slideover has \`side: '${side}'\` prop.`"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-full min-h-48" />
    </template>
  </B24Slideover>
</template>
