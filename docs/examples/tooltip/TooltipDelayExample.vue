<script setup lang="ts">
import { ref } from 'vue'
import DealPlusIcon from '@bitrix24/b24icons-vue/crm/DealPlusIcon'

const delayDurations = ref([0, 1000, 2000])
const delayDuration = ref(0)
</script>

<template>
  <div class="flex flex-wrap flex-row justify-start items-start p-4 gap-4 rounded bg-base-50/70 dark:bg-base-900/70">
    <B24RadioGroup v-model="delayDuration" legend="delayDuration" :items="delayDurations" orientation="horizontal" />
  </div>
  <B24Tooltip text="Opens the deal creation form in the slider" :delay-duration="delayDuration">
    <B24Button label="New deal" color="success" :icon="DealPlusIcon" />
  </B24Tooltip>
</template>
