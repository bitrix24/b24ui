<script setup lang="ts">
const tags = ref(['Bitrix24'])
</script>

<template>
  <B24FormField label="Tags" required>
    <B24InputTags v-model="tags" placeholder="Enter tags..." />
  </B24FormField>
</template>
