<script setup lang="ts">
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('')
</script>

<template>
  <B24InputMenu
    v-model="value"
    mode="autocomplete"
    :items="items"
    :content="{ hideWhenEmpty: true }"
    placeholder="Type a status..."
  />
</template>
