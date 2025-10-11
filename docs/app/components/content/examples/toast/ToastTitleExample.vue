<script setup lang="ts">
const props = defineProps<{
  title: string
}>()

const toast = useToast()

function showToast() {
  toast.add(props)
}
</script>

<template>
  <B24Button label="Show toast" @click="showToast" />
</template>
