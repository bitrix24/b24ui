<script setup lang="ts">
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt/runtime/components/content/DescriptionList.vue'
import DownloadDoubleIcon from '@bitrix24/b24icons-vue/actions/DownloadDoubleIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'

const itemsCustom: (DescriptionListItem & { value?: Date | string })[] = [
  {
    label: 'Amount',
    value: 'Paid',
    description: '$10,560.00',
    b24ui: {
      label: 'font-semibold text-md leading-6 text-base-900 dark:text-base-150',
      description: 'font-semibold text-lg block w-full'
    }
  },
  {
    label: 'Client',
    avatar: {
      icon: PersonIcon
    },
    description: 'Employee Name',
    b24ui: {
      description: 'font-semibold'
    }
  },
  {
    label: 'Due date',
    icon: Calendar1Icon,
    value: new Date('2023-01-31T03:24:00')
  },
  {
    label: 'Payment method',
    icon: CreditDebitCardIcon,
    description: 'Paid with MasterCard'
  }
]
</script>

<template>
  <B24DescriptionList
    legend="Applicant Information"
    text="Personal details and application."
    class="pt-4 ring rounded-md bg-base-30 ring-base-200 dark:bg-base-800 dark:ring-base-600"
    :items="itemsCustom"
    :b24ui="{
      legend: 'sr-only',
      text: 'sr-only',
      labelWrapper: 'px-4',
      container: '',
      descriptionWrapper: 'px-4',
      footer: 'mt-4 px-4 py-6 flex flex-row flex-nowrap justify-end items-center'
    }"
  >
    <template #description="{ item }">
      <template v-if="item.label === 'Amount'">
        <div class="flex flex-wrap flex-row items-start justify-between gap-4">
          <div>
            {{ item.description }}
          </div>
          <B24Badge
            :label="item?.value?.toString()"
            class="font-semibold"
            color="success"
            depth="light"
            use-fill
            size="lg"
          />
        </div>
      </template>
      <template v-else-if="item.label === 'Due date'">
        <time :datetime="(item?.value as Date)?.toISOString()">{{ (item?.value as Date)?.toDateString() }}</time>
      </template>
      <template v-else>
        {{ item.description }}
      </template>
    </template>
    <template #footer>
      <B24Button
        color="primary"
        label="Download receipt"
        :icon="DownloadDoubleIcon"
        rounded
      />
    </template>
  </B24DescriptionList>
</template>
