<script setup lang="ts">
import { ref } from 'vue'

const $props = withDefaults(defineProps<{
  customGridCols?: boolean
}>(), {
  customGridCols: false
})

const className = ref(`grid ${$props.customGridCols ? '' : 'grid-cols-[repeat(auto-fill,minmax(266px,1fr))]'} gap-y-sm gap-x-xs w-full`)
</script>

<template>
  <div :class="className">
    <slot />
  </div>
</template>
