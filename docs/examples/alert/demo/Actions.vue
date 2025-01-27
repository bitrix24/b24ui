<script setup lang="ts">
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

export interface ExampleProps {
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Alert
    title="Heads up!"
    color="collab"
    :icon="SignIcon"
    :description="description"
    :actions="[
      {
        label: 'Action 1',
        color: 'primary'
      },
      {
        label: 'Action 2',
        color: 'collab'
      }
    ]"
  />
</template>
