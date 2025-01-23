<script setup lang="ts">
export interface ExampleProps {
  orientation?: any
}

withDefaults(defineProps<ExampleProps>(), {
  orientation: 'horizontal'
})
</script>

<template>
  <B24Range
    :orientation="orientation"
    :default-value="50"
    class="h-48"
  />
</template>
