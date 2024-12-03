<script setup lang="ts">
const value = ref('')
const maxLength = 15
</script>

<template>
  <B24Input
    v-model="value"
    :maxlength="maxLength"
    aria-describedby="character-count"
    :ui="{ trailing: 'pointer-events-none' }"
  >
    <template #trailing>
      <div
        id="character-count"
        class="text-xs text-base-500 tabular-nums"
        aria-live="polite"
        role="status"
      >
        {{ value?.length }}/{{ maxLength }}
      </div>
    </template>
  </B24Input>
</template>
