<script setup lang="ts">
import CrmSearchIcon from '@bitrix24/b24icons-vue/crm/CrmSearchIcon'
import EarthIcon from '@bitrix24/b24icons-vue/main/EarthIcon'

const { data: countries, status, execute } = await useLazyFetch<{
  name: string
  code: string
  emoji: string
}[]>('/api/countries.json', {
  immediate: false
})

function onOpen() {
  if (!countries.value?.length) {
    execute()
  }
}
</script>

<template>
  <B24SelectMenu
    :items="countries"
    :loading="status === 'pending'"
    label-key="name"
    :search-input="{ icon: CrmSearchIcon }"
    placeholder="Select country"
    class="w-48"
    @update:open="onOpen"
  >
    <template #leading="{ modelValue, b24ui }">
      <span v-if="modelValue" class="size-[26px] text-center">
        {{ modelValue?.emoji }}
      </span>
      <EarthIcon v-else :class="b24ui.leadingIcon()" />
    </template>
    <template #item-leading="{ item }">
      <span class="size-[26px] text-center">
        {{ item.emoji }}
      </span>
    </template>
  </B24SelectMenu>
</template>
