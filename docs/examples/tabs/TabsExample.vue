<script setup lang="ts">
const items = [
  {
    label: 'Account',
    icon: 'i-lucide-user'
  },
  {
    label: 'Password',
    icon: 'i-lucide-lock'
  }
]
</script>

<template>
  <B24Tabs :items="items" class="w-full">
    <template #content="{ item }">
      <p>This is the {{ item.label }} tab.</p>
    </template>
  </B24Tabs>
</template>
