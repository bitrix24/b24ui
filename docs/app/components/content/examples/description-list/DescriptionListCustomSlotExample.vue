<script setup lang="ts">
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt'
import DownloadDoubleIcon from '@bitrix24/b24icons-vue/actions/DownloadDoubleIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'

const items = ref([
  {
    id: 'amount',
    slot: 'amount',
    label: 'Amount',
    value: '$10,560.00',
    description: 'Paid',
    b24ui: {
      label: 'font-(--ui-font-weight-semibold) text-(length:--ui-font-size-md)/(--ui-font-line-height-md)',
      description: 'font-(--ui-font-weight-semibold) text-(length:--ui-font-size-lg) block w-full'
    }
  },
  {
    id: 'client',
    label: 'Client',
    avatar: {
      icon: PersonIcon
    },
    description: 'Employee Name',
    b24ui: {
      description: 'font-(--ui-font-weight-semibold)'
    }
  },
  {
    id: 'date',
    label: 'Due date',
    icon: Calendar1Icon,
    value: new Date('2023-01-31T03:24:00')
  },
  {
    id: 'payment',
    label: 'Payment method',
    icon: CreditDebitCardIcon,
    description: 'Paid with MasterCard'
  }
] satisfies (DescriptionListItem & { id: string, value?: Date | string })[])
</script>

<template>
  <B24Card variant="tinted-success" class="w-full">
    <B24DescriptionList
      legend="Applicant Information"
      text="Personal details and application."
      class="light"
      :items="items"
      :b24ui="{
        legend: 'sr-only',
        text: 'sr-only',
        labelWrapper: 'px-4',
        container: 'mt-0',
        descriptionWrapper: 'px-4',
        footer: 'mt-4 px-0 py-4 pb-0 flex flex-row flex-nowrap justify-end items-center'
      }"
    >
      <template #amount="{ index }">
        <dt class="col-start-1 flex flex-nowrap flex-row items-center justify-start gap-1.5 pt-2 sm:py-1 px-4">
          <ProseH4 class="mb-0">
            Amount
          </ProseH4>
        </dt>
        <dd class="pb-3 pt-1 sm:py-3 px-4">
          <div class="flex flex-wrap flex-row items-center justify-start gap-4">
            <div>
              {{ items[index]?.value }}
            </div>
            <B24Badge
              :label="items[index]?.description"
              class="font-(--ui-font-weight-semibold)"
              color="air-primary-success"
            />
          </div>
        </dd>
      </template>
      <template #description="{ item }">
        <template v-if="item.id === 'date'">
          <time :datetime="(item?.value as Date)?.toISOString()">{{ (item?.value as Date)?.toDateString() }}</time>
        </template>
        <template v-else>
          {{ item.description }}
        </template>
      </template>
      <template #footer>
        <B24Button
          color="air-primary"
          label="Download receipt"
          :icon="DownloadDoubleIcon"
          rounded
        />
      </template>
    </B24DescriptionList>
  </B24Card>
</template>
