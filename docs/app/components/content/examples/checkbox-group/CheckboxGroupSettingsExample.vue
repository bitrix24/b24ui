<script setup lang="ts">
import type { CheckboxGroupItem } from '@bitrix24/b24ui-nuxt'

const value = ref<string[]>(['columns'])

const items: CheckboxGroupItem[] = [
  {
    value: 'columns',
    title: 'В колонках',
    text: 'Выберите этот вариант для ресурсов, которые всегда должны быть видны менеджеру. Это основные ресурсы, от занятости которых строится расписание',
    preview: '/b24ui/radio-card-columns.png',
    href: 'https://helpdesk.bitrix24.ru/'
  },
  {
    value: 'list',
    title: 'В дополнительном списке',
    text: 'Выберите этот вариант для ресурсов, которые бронируют только в дополнение к основным. Например, если основной ресурс — специалисты, оборудование будет в дополнительном списке',
    preview: '/b24ui/radio-card-list.png',
    href: 'https://helpdesk.bitrix24.ru/'
  }
]
</script>

<template>
  <B24CheckboxGroup
    v-model="value"
    variant="card"
    size="md"
    :items="items"
    class="w-full max-w-2xl"
  >
    <template #label="{ item }">
      <span class="flex gap-3 items-start w-full">
        <span class="flex-1 min-w-0 flex flex-col gap-1">
          <span class="text-(length:--ui-font-size-md) font-(--ui-font-weight-medium)">
            {{ item.title }}
          </span>
          <span class="text-(length:--ui-font-size-sm) text-(--ui-color-base-70) font-(--ui-font-weight-regular)">
            {{ item.text }}
          </span>
          <B24Link
            :to="item.href"
            target="_blank"
            class="self-start mt-1 text-(length:--ui-font-size-sm)"
            @click.stop
          >
            Подробнее
          </B24Link>
        </span>
        <img
          :src="item.preview"
          alt=""
          class="hidden sm:block shrink-0 w-[120px] h-[72px] rounded-(--ui-border-radius-sm) ring-1 ring-(--ui-color-base-5) object-cover"
        >
      </span>
    </template>
  </B24CheckboxGroup>
</template>
