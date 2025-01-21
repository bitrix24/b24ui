<script setup lang="ts">
import { ref, computed } from 'vue'
import DealPlusIcon from '@bitrix24/b24icons-vue/crm/DealPlusIcon'

const contentAlignVariants = ref(['start', 'center', 'end'])
const contentAlign = ref('start')

const contentSideVariants = ref(['top', 'right', 'bottom', 'left'])
const contentSide = ref('left')

const contentSideOffset = ref(8)

const content = computed(() => {
  return {
    align: contentAlign.value,
    side: contentSide.value,
    sideOffset: contentSideOffset.value
  }
})
</script>

<template>
  <div class="flex flex-wrap flex-row justify-start items-start p-4 gap-4 rounded bg-base-50/70 dark:bg-base-900/70">
    <B24RadioGroup v-model="contentAlign" legend="content.align" :items="contentAlignVariants" orientation="horizontal" />
    <B24RadioGroup v-model="contentSide" legend="content.side" :items="contentSideVariants" orientation="horizontal" />
    <B24FormField label="content.sideOffset">
      <B24Input v-model.number="contentSideOffset" type="number" :min="0" size="md" />
    </B24FormField>
  </div>
  <div>
    <B24Tooltip
      text="Opens the deal creation form in the slider"
      :content="content"
    >
      <B24Button label="New deal" color="success" :icon="DealPlusIcon" />
    </B24Tooltip>
  </div>
</template>
