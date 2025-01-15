<script setup lang="ts">
import { ref } from 'vue'

const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')
</script>

<template>
  <B24Select
    v-model="value"
    :items="items"
    :ui="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
    }"
    class="w-48"
  />
</template>
