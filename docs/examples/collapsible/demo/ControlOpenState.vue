<script setup lang="ts">
import { ref } from 'vue'
import ChevronDownIcon from '@bitrix24/b24icons-vue/actions/ChevronDownIcon'

const open = ref(true)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Collapsible
    v-model:open="open"
    class="w-full h-40"
  >
    <B24Button
      class="group"
      label="More"
      color="link"
      :icon="ChevronDownIcon"
      :b24ui="{
        leadingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
    />

    <template #content>
      <Placeholder class="h-28 w-full" />
    </template>
  </B24Collapsible>
</template>
