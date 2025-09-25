<script setup lang="ts">
const retries = ref(0)
</script>

<template>
  <B24FormField label="Retries" help="Specify number of attempts" required>
    <B24InputNumber v-model="retries" placeholder="Enter retries" />
  </B24FormField>
</template>
