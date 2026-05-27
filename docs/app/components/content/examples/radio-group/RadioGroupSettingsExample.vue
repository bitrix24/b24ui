<script setup lang="ts">
type LayoutItem = {
  value: string
  title: string
  text: string
  href: string
}

const value = ref<string>('columns')

const items: LayoutItem[] = [
  {
    value: 'columns',
    title: 'In columns',
    text: 'Pick this for resources that must always be visible to the manager. These are the primary resources the schedule is built around.',
    href: 'https://helpdesk.bitrix24.com/'
  },
  {
    value: 'list',
    title: 'In a secondary list',
    text: 'Pick this for resources that are booked only in addition to a primary one. For instance, when specialists are the primary resource, equipment goes into the secondary list.',
    href: 'https://helpdesk.bitrix24.com/'
  }
]
</script>

<template>
  <B24RadioGroup
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
            Learn more
          </B24Link>
        </span>
        <Placeholder class="hidden sm:flex shrink-0 w-[120px] h-[72px] text-(length:--ui-font-size-xs) text-(--ui-color-base-50)">
          Preview
        </Placeholder>
      </span>
    </template>
  </B24RadioGroup>
</template>
