<script setup lang="ts">
const email = ref('')
</script>

<template>
  <B24FormField label="Email" help="We won't share your email." required>
    <B24Input v-model="email" placeholder="Enter your email" icon="i-lucide-at-sign" />
  </B24FormField>
</template>
