<script setup lang="ts">
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
</script>

<template>
  <B24Textarea
    :icon="RocketIcon"
    :trailing-icon="TaskIcon"
    placeholder="Search..."
    :rows="1"
    autoresize
  />
</template>
