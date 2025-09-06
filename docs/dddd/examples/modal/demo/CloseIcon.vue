<script setup lang="ts">
import EyeClosedIcon from '@bitrix24/b24icons-vue/button/EyeClosedIcon'

export interface ExampleProps {
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Modal
    :title="title"
    :description="description"
    :close-icon="EyeClosedIcon"
  >
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="h-40" />
    </template>
  </B24Modal>
</template>
