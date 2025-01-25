<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  minStepsBetweenThumbs?: number
}

withDefaults(defineProps<ExampleProps>(), {
  minStepsBetweenThumbs: 10
})

const value = ref([
  25,
  36,
  75
])
</script>

<template>
  <B24Range
    v-model="value"
    :min-steps-between-thumbs="minStepsBetweenThumbs"
  />
</template>
