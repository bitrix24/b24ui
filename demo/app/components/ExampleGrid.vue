<script setup lang="ts">
import { ref } from 'vue'

const $props = withDefaults(defineProps<{
  customGridCols?: boolean
}>(), {
  customGridCols: false
})

const className = ref(`grid ${$props.customGridCols ? '' : 'grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 '} gap-y-md gap-x-md w-full`)
</script>

<template>
  <div :class="className">
    <slot />
  </div>
</template>
