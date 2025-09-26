<script setup lang="ts">
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    :b24ui="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
    }"
    class="w-48"
  />
</template>
