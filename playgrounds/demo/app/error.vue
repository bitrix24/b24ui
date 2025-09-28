<script setup lang="ts">
import type { NuxtError } from '#app'

// const { components, groups, items } = useNavigation()

defineProps<{
  error: NuxtError
}>()

// provide('components', components)
</script>

<template>
  <B24App>
    <B24Error :error="error" />
  </B24App>
</template>
