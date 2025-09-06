<script setup lang="ts">
import { ref } from 'vue'
import ArrowToTheLeftIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheLeftIcon'
import ArrowToTheRightIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheRightIcon'

const value = ref(5)
</script>

<template>
  <B24InputNumber
    v-model="value"
    :increment-icon="ArrowToTheRightIcon"
    :decrement-icon="ArrowToTheLeftIcon"
  />
</template>
