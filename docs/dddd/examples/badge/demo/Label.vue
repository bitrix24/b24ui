<script setup lang="ts">
export interface ExampleProps {
  label?: string
}

withDefaults(defineProps<ExampleProps>(), {
  label: 'Badge'
})
</script>

<template>
  <B24Badge :label="label" />
  <B24Badge use-fill :label="label" />
  <B24Badge use-fill use-link :label="label" />
</template>
