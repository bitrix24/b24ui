<script setup lang="ts">
export interface ExampleProps {
  title?: string
  description?: string
}

const props = withDefaults(defineProps<ExampleProps>(), {
  title: 'Some title',
  description: 'Some description'
})

const toast = useToast()

function showToast() {
  toast.add(props)
}
</script>

<template>
  <B24Button label="Show toast" color="primary" @click="showToast" />
</template>
