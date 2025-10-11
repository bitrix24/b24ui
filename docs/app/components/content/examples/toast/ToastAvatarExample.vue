<script setup lang="ts">
const toast = useToast()

function showToast() {
  toast.add({
    title: 'The calculation of indicators has been completed',
    description: 'Is there anything else you need help with?',
    avatar: { src: '/b24ui/avatar/assistant.png' }
  })
}
</script>

<template>
  <B24Button label="Show toast" @click="showToast" />
</template>
