<script setup lang="ts">
import theme from '#build/b24ui/content/description-list'
import usePageMeta from './../../../composables/usePageMeta'
import ExampleGrid from '../../../components/ExampleGrid.vue'
import ExampleCard from '../../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../../components/ExampleCardSubTitle.vue'
import type { ButtonProps } from '@bitrix24/b24ui-nuxt/components/Button.vue'
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt/components/content/DescriptionList.vue'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import DotsIcon from '@bitrix24/b24icons-vue/button/DotsIcon'
import DownloadDoubleIcon from '@bitrix24/b24icons-vue/actions/DownloadDoubleIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'

usePageMeta.setPageTitle('DescriptionList')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const action = (color: string): ButtonProps[] => [
  {
    icon: DotsIcon,
    color: color as any,
    depth: 'light',
    onClick() {
      console.log('Action clicked')
    }
  }
]

const multipleActions = (color: string): ButtonProps[] => [
  {
    label: 'Action',
    color: color as any,
    onClick() {
      console.log('Action clicked')
    }
  },
  {
    label: 'Another action',
    color: color as any,
    onClick() {
      console.log('Another action clicked')
    }
  },
  {
    label: 'One more action',
    color: color as any,
    onClick() {
      console.log('One more action clicked')
    }
  },
  {
    label: 'And one more',
    color: color as any,
    icon: SignIcon,
    onClick() {
      console.log('And one more clicked')
    }
  },
  {
    label: 'Last one',
    color: color as any,
    icon: DotsIcon,
    onClick() {
      console.log('Last one clicked')
    }
  }
]

const itemsSimple: DescriptionListItem[] = [
  {
    label: 'Full name',
    description: 'Michael Foster'
  },
  {
    label: 'Event',
    description: 'Payment is made through Atol online'
  },
  {
    label: 'Line 1.3',
    description: 'Description 1.3',
    class: 'text-ai-500'
  },
  {
    label: 'Line 1.4',
    description: 'Description 1.4',
    b24ui: {
      description: 'font-semibold'
    }
  }
]

const itemsActions: DescriptionListItem[] = [
  {
    label: 'Line 2.1',
    description: 'Description 2.1',
    actions: action('link'),
    orientation: 'horizontal' as const
  },
  {
    label: 'Line 2.2',
    description: 'Description 2.2',
    actions: action('primary'),
    orientation: 'horizontal' as const
  },
  {
    label: 'Line 2.3',
    description: 'Description 2.3',
    actions: action('link'),
    orientation: 'horizontal' as const
  },
  {
    label: 'Line 2.4',
    description: 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.',
    actions: multipleActions('default')
  }
]

const itemsIcons: DescriptionListItem[] = [
  {
    label: 'Line 1.1',
    description: 'Description 1.1',
    avatar: {
      src: '/avatar/employee.png'
    }
  },
  {
    label: 'Line 1.2',
    description: 'Description 1.2',
    icon: SignIcon
  },
  {
    label: 'Line 1.3',
    description: 'Description 1.3',
    avatar: {
      icon: PersonIcon
    }
  },
  {
    description: 'Description 1.4',
    icon: SignIcon
  }
]

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
  <ExampleGrid v-once>
    <ExampleCard title="simple">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24DescriptionList
          legend="Applicant Information"
          text="Personal details and application."
          :items="itemsSimple"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="icons">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24DescriptionList
          legend="Applicant Information"
          text="Personal details and application."
          :items="itemsIcons"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="actions" class="sm:col-span-2">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24DescriptionList
          legend="Applicant Information"
          text="Personal details and application."
          :items="itemsActions"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="custom" class="sm:col-span-2">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
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
                  :label="item.value?.toString()"
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
      </div>
    </ExampleCard>

    <ExampleCard title="size" class="sm:col-span-2">
      <template
        v-for="size in sizes"
        :key="size"
      >
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
          <B24DescriptionList
            legend="Applicant Information"
            text="Personal details and application."
            :size="size"
            :items="itemsSimple"
          />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
