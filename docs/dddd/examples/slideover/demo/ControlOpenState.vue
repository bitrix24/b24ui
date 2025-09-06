<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Slideover
    v-model:open="open"
    :title="title"
    :description="description"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="size-full" />
    </template>
  </B24Slideover>
</template>
