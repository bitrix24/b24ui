<script setup lang="ts">
import CircleCrossIcon from '@bitrix24/b24icons-vue/outline/CircleCrossIcon'

const value = ref('Click to clear')
</script>

<template>
  <B24Input
    v-model="value"
    placeholder="Type something..."
    :b24ui="{ trailing: 'pe-1' }"
  >
    <template v-if="value?.length" #trailing>
      <B24Button
        size="sm"
        color="air-tertiary-no-accent"
        :icon="CircleCrossIcon"
        aria-label="Clear input"
        @click="value = ''"
      />
    </template>
  </B24Input>
</template>
