<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Delay.vue'

const delayDurations = ref([0, 1000, 2000])
const delayDuration = ref(0)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="delayDuration" legend="delayDuration" :items="delayDurations" orientation="horizontal" />
    </template>
    <Demo :delay-duration="delayDuration" />
  </ComponentShowExample>
</template>
