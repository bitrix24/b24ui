<script setup lang="ts">
import { ref } from 'vue'
import ArrowToTheLeftIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheLeftIcon'
import ArrowToTheRightIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheRightIcon'

const retries = ref(0)
</script>

<template>
  <B24InputNumber v-model="retries" placeholder="Enter retries">
    <template #decrement>
      <B24Button size="md" rounded :icon="ArrowToTheLeftIcon" />
    </template>

    <template #increment>
      <B24Button size="md" rounded :icon="ArrowToTheRightIcon" />
    </template>
  </B24InputNumber>
</template>
