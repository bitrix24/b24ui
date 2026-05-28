<script setup lang="ts">
import theme from '#build/b24ui/checkbox-group'
import themeCheckbox from '#build/b24ui/checkbox'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)
const variants = Object.keys(theme.variants.variant)
const indicators = Object.keys(themeCheckbox.variants.indicator)
const orientations = Object.keys(theme.variants.orientation) as Array<keyof typeof theme.variants.orientation>

const multipleAttrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
  indicator: [themeCheckbox.defaultVariants.indicator]
})

const singleAttrs = reactive({
  orientation: orientations[0],
  disabled: false
})

const value = ref(['1'])
const items = [
  { value: '1', label: 'System' },
  { value: '2', label: 'Light' },
  { value: '3', label: 'Dark' }
]
const itemsWithDesc = ref([
  {
    label: 'System',
    description: 'This is the first option.',
    value: 'system'
  },
  {
    label: 'Light',
    description: 'This is the second option.',
    value: 'light'
  },
  {
    label: 'Dark',
    description: 'This is the third option.',
    value: 'dark'
  }
])

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

// Settings block: rich checkbox cards (preview + description + link)
type CapabilityItem = {
  value: string
  title: string
  text: string
  href: string
}
const settingsLayout = ref<string[]>(['columns'])
const settingsLayoutItems: CapabilityItem[] = [
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
      <B24Switch v-model="singleAttrs.disabled" class="w-24" label="Disabled" size="xs" />
    </template>
    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'grow-0', body: 'overflow-x-auto' }">
      <B24CheckboxGroup v-model="value" :items="items" v-bind="{ ...singleAttrs, ...props }" />
      <B24CheckboxGroup :items="items" :default-value="value" v-bind="{ ...singleAttrs, ...props }" />
      <B24CheckboxGroup :items="itemsWithDesc" v-bind="{ ...singleAttrs, ...props }" />
      <B24CheckboxGroup v-model="value" :items="items" legend="Legend" v-bind="{ ...singleAttrs, ...props }" required />
      <B24CheckboxGroup v-model="value" :items="items" v-bind="{ ...singleAttrs, ...props }">
        <template #legend>
          <span class="italic font-bold">
            Legend with slots
          </span>
        </template>
        <template #label="{ item }">
          <span class="italic">
            {{ item.label }}
          </span>
        </template>
      </B24CheckboxGroup>
    </Matrix>

    <div class="w-full">
      <p class="mb-3 text-(length:--ui-font-size-md) font-(--ui-font-weight-semi-bold)">
        Settings layout (rich checkbox cards)
      </p>
      <B24CheckboxGroup
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
              <span class="block text-(length:--ui-font-size-sm) text-description font-(--ui-font-weight-regular)">
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
            <Placeholder class="hidden sm:flex shrink-0 w-[120px] h-[72px] text-(length:--ui-font-size-xs) text-description">
              Preview
            </Placeholder>
          </span>
        </template>
      </B24CheckboxGroup>
    </div>
  </PlaygroundPage>
</template>
