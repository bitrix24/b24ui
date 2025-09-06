<script setup lang="ts">
export interface ExampleProps {
  label?: string
  isRequired?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  label: 'All employees can post to Feed',
  isRequired: true
})
</script>

<template>
  <B24Checkbox
    :label="label"
    :required="isRequired"
  />
</template>
