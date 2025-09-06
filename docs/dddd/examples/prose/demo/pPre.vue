<template>
  <ProsePre>
    {{ demoPreObj }}
  </ProsePre>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const demoPreObj = ref([
  [
    'Analytics',
    'Data',
    'Sample'
  ],
  [
    'Month',
    'Visitors',
    'Conversion %'
  ],
  [
    'January',
    15234,
    2.3
  ],
  [
    'February',
    28901,
    3.1
  ]
])
</script>
