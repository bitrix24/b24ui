<script setup lang="ts">
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
</script>

<template>
  <B24Input
    :icon="RocketIcon"
    :trailing-icon="TaskIcon"
    placeholder="Search..."
  />
</template>
