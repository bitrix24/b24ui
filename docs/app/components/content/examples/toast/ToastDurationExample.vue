<script setup lang="ts">
const toast = useToast()

const props = defineProps<{
  duration: number
}>()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    duration: props.duration
  })
}
</script>

<template>
  <B24Button label="Show toast" @click="showToast" />
</template>
