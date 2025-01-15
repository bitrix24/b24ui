<script setup lang="ts">
import { ref } from 'vue'
import { defineShortcuts } from '@bitrix24/b24ui-nuxt/runtime/composables/defineShortcuts.ts'

const open = ref(false)
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const value = ref('Backlog')

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Select v-model="value" v-model:open="open" :items="items" class="w-48" />
</template>
