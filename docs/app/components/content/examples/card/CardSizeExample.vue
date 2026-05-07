<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg'] as const
</script>

<template>
  <div class="grid grid-cols-2 gap-3 w-full">
    <B24Card
      v-for="size in sizes"
      :key="size"
      :size="size"
      :title="`Card size=${size}`"
      description="A short description for the card."
    >
      <Placeholder class="h-16" />
    </B24Card>
  </div>
</template>
