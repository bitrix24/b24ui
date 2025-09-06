<script setup lang="ts">
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

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
  <B24Alert
    :avatar="{ src: '/b24ui/avatar/employee.png', size: 'xs' }"
    :title="title"
    :description="description"
  />
  <B24Alert
    :avatar="{ icon: SignIcon, size: 'lg' }"
    :title="title"
    :description="description"
  />
</template>
