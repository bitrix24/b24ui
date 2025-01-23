<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  isAutoresize?: boolean
  maxrows?: number
}

withDefaults(defineProps<ExampleProps>(), {
  isAutoresize: true,
  maxrows: 4
})

const value = ref('Founded in [Year], [Company Name] is a leading food manufacturing company dedicated to producing high-quality, nutritious, and delicious food products. With a commitment to excellence and innovation, we have established ourselves as a trusted name in the food industry.')
</script>

<template>
  <B24Textarea
    v-model="value"
    :rows="3"
    :maxrows="maxrows"
    :autoresize="isAutoresize"
  />
</template>
