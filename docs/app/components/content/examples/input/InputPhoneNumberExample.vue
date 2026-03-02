<script setup lang="ts">
import { vMaska } from 'maska/vue'
import CrmSearchIcon from '@bitrix24/b24icons-vue/crm/CrmSearchIcon'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'

type PhoneCode = {
  name: string
  code: string
  emoji: string
  dialCode: string
  mask: string
}

const phone = ref('')
const countryCode = ref('US')

const { data: phoneCodes, status, execute } = await useLazyFetch<PhoneCode[]>('/api/phone-codes.json', {
  immediate: false
})

const country = computed(() => phoneCodes.value?.find(c => c.code === countryCode.value))
const dialCode = computed(() => country.value?.dialCode || '+1')
const mask = computed(() => country.value?.mask || '(###) ###-####')

function onOpen() {
  if (!phoneCodes.value?.length) {
    execute()
  }
}

watch(countryCode, () => {
  phone.value = ''
})
</script>

<template>
  <B24FieldGroup>
    <B24SelectMenu
      v-model="countryCode"
      :items="phoneCodes"
      value-key="code"
      :search-input="{
        placeholder: 'Search country...',
        icon: CrmSearchIcon,
        loading: status === 'pending'
      }"
      :filter-fields="['name', 'code', 'dialCode']"
      :content="{ align: 'start' }"
      class="w-[62px]"
      :b24ui="{
        base: 'pe-8',
        content: 'min-w-fit',
        viewport: 'min-w-fit',
        item: 'min-w-fit',
        placeholder: 'hidden',
        trailingIcon: 'size-4'
      }"
      :trailing-icon="Expand1Icon"
      @update:open="onOpen"
    >
      <span class="size-5 flex items-center text-lg">
        {{ country?.emoji || '\u{1F1FA}\u{1F1F8}' }}
      </span>

      <template #item-leading="{ item }">
        <span class="size-5 flex items-center text-lg">
          {{ item.emoji }}
        </span>
      </template>

      <template #item-label="{ item }">
        {{ item.name }} ({{ item.dialCode }})
      </template>
    </B24SelectMenu>

    <B24Input
      v-model="phone"
      v-maska="mask"
      :placeholder="mask.replaceAll('#', '_')"
      :style="{ '--dial-code-length': `${dialCode.length + 1.5}ch` }"
      class="w-full max-w-[200px]"
      :b24ui="{
        base: 'ps-(--dial-code-length)',
        leading: 'pointer-events-none text-(--b24ui-typography-label-color)'
      }"
    >
      <template #leading>
        {{ dialCode }}
      </template>
    </B24Input>
  </B24FieldGroup>
</template>
