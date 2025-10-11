<script setup lang="ts">
import ArrowToTheRightIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheRightIcon'

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    closeIcon: ArrowToTheRightIcon
  })
}
</script>

<template>
  <B24Button label="Show toast" @click="showToast" />
</template>
