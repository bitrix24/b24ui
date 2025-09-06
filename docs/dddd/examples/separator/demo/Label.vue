<script setup lang="ts">
export interface ExampleProps {
  label?: string
}

withDefaults(defineProps<ExampleProps>(), {
  label: 'Bitrix24 UI'
})
</script>

<template>
  <B24Separator
    :label="label"
  />
</template>
