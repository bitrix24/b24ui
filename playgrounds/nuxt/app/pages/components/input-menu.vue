<script setup lang="ts">
/**
 * @see playground/app/pages/components/select-menu.vue
 */
import type { InputMenuItem, InputMenuProps } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/input-menu'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import Cross20Icon from '@bitrix24/b24icons-vue/actions/Cross20Icon'
import TaskListIcon from '@bitrix24/b24icons-vue/outline/TaskListIcon'

const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  disabled: false,
  loading: false,
  highlight: false,
  rounded: false
})

const items = ref(['Prospecting', 'Qualifying', 'Presenting', 'Negotiating', 'Closed'])
const itemsSimple = ref(['Prospecting', 'Qualifying', 'Presenting', 'Negotiating', 'Closed'])
const valueForAdd = ref('Prospecting')
const valueMultiple = ref(['Prospecting', 'Presenting'])

function onCreate(item: string) {
  itemsSimple.value.unshift(item)
  valueForAdd.value = item
}

function onCreateMultiple(item: string) {
  items.value.unshift(item)
  valueMultiple.value.unshift(item)
}

const itemsObj = ref([
  {
    label: 'CRM settings',
    value: 'settings',
    description: 'Issues that have been identified but not yet prioritized',
    color: 'air-primary-success' as InputMenuProps['color']
  },
  {
    label: 'My company details',
    value: 'my_company_details',
    description: 'Issues that are ready to be worked on',
    disabled: true
  },
  {
    label: 'Access permissions',
    value: 'access_permissions'
  }
] satisfies InputMenuItem[])
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />

      <B24Switch v-model="singleAttrs.disabled" label="Disabled" />
      <B24Switch v-model="singleAttrs.loading" label="Loading" />
      <B24Switch v-model="singleAttrs.highlight" label="Highlight" />
      <B24Switch v-model="singleAttrs.rounded" label="Rounded" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-80' }">
      <B24InputMenu
        :items="items"
        autofocus
        name="some_value"
        placeholder="Insert value&hellip;"
        aria-label="Insert value"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24InputMenu
        :items="items"
        required
        name="some_value"
        placeholder="Required"
        aria-label="Required"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24InputMenu
        :items="items"
        underline
        name="some_value"
        placeholder="Underline"
        aria-label="Underline"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24InputMenu
        :items="items"
        no-border
        name="some_value"
        placeholder="No border"
        aria-label="No border"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24InputMenu
        :items="items"
        no-padding
        name="some_value"
        placeholder="No padding"
        aria-label="No padding"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24InputMenu
        :items="itemsObj"
        tag="some text"
        :tag-color="props?.color || 'air-primary'"
        placeholder="With tag"
        aria-label="With tag"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24InputMenu
        :items="items"
        :icon="Cross20Icon"
        trailing
        name="some_value"
        placeholder="Trailing"
        aria-label="Trailing"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24InputMenu
        :items="items"
        :icon="Search2Icon"
        :trailing-icon="Expand1Icon"
        name="some_value"
        placeholder="Icons"
        aria-label="Icons"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24InputMenu
        :items="items"
        :avatar="{ src: '/avatar/employee.png' }"
        name="some_value"
        placeholder="Avatar"
        aria-label="Avatar"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24InputMenu
        :items="items"
        trailing
        name="some_value"
        placeholder="Loading trailing"
        aria-label="Loading trailing"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24InputMenu
        v-model="valueForAdd"
        :create-item="{ position: 'bottom', when: 'always' }"
        :items="itemsSimple"
        :icon="Search2Icon"
        name="some_value"
        placeholder="Create item"
        aria-label="Create item"
        tag="+ item"
        tag-color="air-primary-copilot"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
        @create="onCreate"
      />
      <B24InputMenu
        v-model="valueMultiple"
        :items="items"
        multiple
        aria-label="Multiple"
        name="some_value"
        placeholder="Multiple"
        tag="+ multiple"
        tag-color="air-primary-copilot"
        :create-item="{ position: 'bottom', when: 'always' }"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
        @create="onCreateMultiple"
      />
      <B24InputMenu
        :icon="TaskListIcon"
        placeholder="Search virtualized..."
        virtualize
        :items="[Array(1000).fill(0).map((_, i) => ({ label: `item-${i}`, value: i }))]"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
    </Matrix>
  </PlaygroundPage>
</template>
