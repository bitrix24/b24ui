<script setup lang="ts">
export interface ExampleProps {
  orientation?: any
}

withDefaults(defineProps<ExampleProps>(), {
  orientation: 'horizontal'
})
</script>

<template>
  <B24Separator
    :orientation="orientation"
    class="h-48"
  />
</template>
