<script setup lang="ts">
import theme from '#build/b24ui/radio-group'
import type { RadioGroupItem } from '@bitrix24/b24ui-nuxt'

const sizes = Object.keys(theme.variants.size)
const colors = Object.keys(theme.variants.color)
const variants = Object.keys(theme.variants.variant)
const indicators = Object.keys(theme.variants.indicator)
const orientations = Object.keys(theme.variants.orientation)

const multipleAttrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
  indicator: [theme.defaultVariants.indicator]
})

const singleAttrs = reactive({
  orientation: 'vertical' as string,
  required: false,
  disabled: false
})

const items: RadioGroupItem[] = [
  { value: '1', label: 'Basic' },
  { value: '2', label: 'Standard' },
  { value: '3', label: 'Professional' },
  { value: '4', label: 'Enterprise' }
]

const itemsWithDescription: RadioGroupItem[] = [
  { value: '1', label: 'Basic', description: 'includes 5 users' },
  { value: '2', label: 'Standard', description: 'includes 50 users' },
  { value: '3', label: 'Professional', description: 'includes 100 users' },
  { value: '4', label: 'Enterprise', description: 'includes 250 users' }
]

const value = ref<string | undefined>(undefined)

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

// Settings block: rich radio cards (preview + description + link)
type LayoutItem = {
  value: string
  title: string
  text: string
  preview: string
  href: string
}
const settingsLayout = ref<string>('columns')
const settingsLayoutItems: LayoutItem[] = [
  {
    value: 'columns',
    title: 'In columns',
    text: 'Pick this for resources that must always be visible to the manager. These are the primary resources the schedule is built around.',
    preview: '/radio-card-columns.png',
    href: 'https://helpdesk.bitrix24.com/'
  },
  {
    value: 'list',
    title: 'In a secondary list',
    text: 'Pick this for resources that are booked only in addition to a primary one. For instance, when specialists are the primary resource, equipment goes into the secondary list.',
    preview: '/radio-card-list.png',
    href: 'https://helpdesk.bitrix24.com/'
  }
]
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select
        v-model="multipleAttrs.color"
        class="w-44"
        :items="airColors"
        placeholder="Color"
        multiple
        size="xs"
      />
      <B24Select
        v-model="multipleAttrs.size"
        class="w-32"
        :items="sizes"
        placeholder="Size"
        multiple
        size="xs"
      />
      <B24Select
        v-model="multipleAttrs.variant"
        class="w-32"
        :items="variants"
        placeholder="Variant"
        multiple
        size="xs"
      />
      <B24Select
        v-model="multipleAttrs.indicator"
        class="w-32"
        :items="indicators"
        placeholder="Indicator"
        multiple
        size="xs"
      />
      <B24Select v-model="singleAttrs.orientation" class="w-32" :items="orientations" placeholder="Orientation" size="xs" />

      <B24Switch v-model="singleAttrs.required" label="Required" size="xs" />
      <B24Switch v-model="singleAttrs.disabled" label="Disabled" size="xs" />
    </template>

    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'max-w-80' }">
      <B24RadioGroup v-model="value" :items="items" default-value="2" v-bind="{ ...singleAttrs, ...props } as any" />
      <B24RadioGroup v-model="value" legend="Items with description" :items="itemsWithDescription" v-bind="{ ...singleAttrs, ...props } as any" />
      <B24RadioGroup v-model="value" :items="items" v-bind="{ ...singleAttrs, ...props } as any">
        <template #legend>
          <span class="italic font-(--ui-font-weight-bold)">
            With legend and label slots
          </span>
        </template>
        <template #label="{ item }">
          <span class="italic">
            {{ item.label }}
          </span>
        </template>
      </B24RadioGroup>
    </Matrix>

    <div class="w-full">
      <p class="mb-3 text-(length:--ui-font-size-md) font-(--ui-font-weight-semi-bold)">
        Settings layout (rich radio cards)
      </p>
      <B24RadioGroup
        v-model="settingsLayout"
        variant="card"
        size="md"
        :items="settingsLayoutItems"
        class="max-w-2xl"
      >
        <template #label="{ item }">
          <span class="flex gap-3 items-start w-full">
            <span class="flex-1 min-w-0 flex flex-col gap-1">
              <span class="block text-(length:--ui-font-size-md) font-(--ui-font-weight-medium)">
                {{ item.title }}
              </span>
              <span class="block text-(length:--ui-font-size-sm) text-(--ui-color-base-70) font-(--ui-font-weight-regular)">
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
            <img
              :src="item.preview"
              :alt="item.title"
              class="hidden sm:block shrink-0 w-[120px] h-[72px] rounded-(--ui-border-radius-sm) ring-1 ring-(--ui-color-base-5) object-cover"
            >
          </span>
        </template>
      </B24RadioGroup>
    </div>
  </PlaygroundPage>
</template>
