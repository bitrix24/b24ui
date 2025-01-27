<script setup lang="ts">
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
</script>

<template>
  <B24Alert
    :avatar="{ src: '/b24ui/avatar/employee.png' }"
    title="Heads up!"
    description="Let's signal the manager that the deal is not moving."
  />
  <B24Alert
    :avatar="{ icon: SignIcon }"
    title="Heads up!"
    description="Let's signal the manager that the deal is not moving."
  />
</template>
