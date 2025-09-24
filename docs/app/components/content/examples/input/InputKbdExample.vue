<script setup lang="ts">
import CrmSearchIcon from '@bitrix24/b24icons-vue/crm/CrmSearchIcon'

const input = useTemplateRef('input')

defineShortcuts({
  '/': () => {
    input.value?.inputRef?.focus()
  }
})
</script>

<template>
  <B24Input
    ref="input"
    :icon="CrmSearchIcon"
    placeholder="Search..."
  >
    <template #trailing>
      <B24Kbd value="/" />
    </template>
  </B24Input>
</template>
