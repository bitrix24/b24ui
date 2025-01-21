<script setup lang="ts">
import { ref } from 'vue'
import DealPlusIcon from '@bitrix24/b24icons-vue/crm/DealPlusIcon'

const disabled = ref(true)
</script>

<template>
  <div class="flex flex-wrap flex-row justify-start items-start p-4 gap-4 rounded bg-base-50/70 dark:bg-base-900/70">
    <B24FormField label="disabled">
      <B24Switch v-model="disabled" size="xs" />
    </B24FormField>
  </div>
  <B24Tooltip :disabled="disabled" text="Opens the deal creation form in the slider">
    <B24Button label="New deal" color="success" :icon="DealPlusIcon" />
  </B24Tooltip>
</template>
