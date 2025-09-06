<script setup lang="ts">
import ChevronDownIcon from '@bitrix24/b24icons-vue/actions/ChevronDownIcon'
</script>

<template>
  <B24Collapsible class="w-full h-40">
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
