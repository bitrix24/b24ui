<script setup lang="ts">
/**
 * @see playground/app/pages/components/select.vue
 */
import type { SelectMenuItem, SelectMenuProps, AvatarProps, ChipProps } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/select-menu'
import type { IUser } from '~/types'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import HelpIcon from '@bitrix24/b24icons-vue/button/HelpIcon'
import PlusInCircleIcon from '@bitrix24/b24icons-vue/actions/PlusInCircleIcon'
import ArrowTopIcon from '@bitrix24/b24icons-vue/actions/ArrowTopIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/main/CircleCheckIcon'
import CancelIcon from '@bitrix24/b24icons-vue/button/CancelIcon'
import TaskListIcon from '@bitrix24/b24icons-vue/outline/TaskListIcon'

const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const multipleAttrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  disabled: false,
  loading: false,
  highlight: false,
  rounded: false
})

const knowledgeBase = ['Select Knowledge base', 'Create knowledge base'] satisfies SelectMenuItem[]
const smartScripts = ['Scripts', 'Create script', 'Install from Bitrix24.Market'] satisfies SelectMenuItem[]
const smartProcess = ['Smart Process Automation'] satisfies SelectMenuItem[]
const settings = ['CRM settings', 'My company details', 'Access permissions', 'CRM Payment', 'CRM.Delivery'] satisfies SelectMenuItem[]

const items = [
  [...knowledgeBase],
  [{ label: 'Smart scripts', type: 'label' as const }, ...smartScripts],
  ['Bitrix24.Market'],
  [{ label: 'Smart Process Automation', type: 'label' as const }, ...smartProcess],
  [{ label: 'Settings', type: 'label' as const }, ...settings]
] satisfies SelectMenuItem[][]
const selectedItems = ref([knowledgeBase[0]!, smartProcess[0]!])

const itemsSimple = ref([
  ...settings
] satisfies SelectMenuItem[])
const value = ref('Access permissions')

function onCreate(item: string) {
  itemsSimple.value.unshift(item)
  value.value = item
}

const chipItems = ref([
  {
    label: 'New message',
    value: 'message',
    chip: {
      color: 'air-primary-alert' as ChipProps['color']
    },
    color: 'air-primary-success' as SelectMenuProps['color']
  },
  {
    label: 'New information',
    value: 'information',
    chip: {
      color: 'air-primary' as ChipProps['color']
    }
  },
  {
    label: 'Online',
    value: 'online',
    chip: {
      color: 'air-primary-success' as ChipProps['color']
    },
    disabled: true
  },
  {
    label: 'Offline',
    value: 'offline',
    chip: {
      color: 'air-secondary' as ChipProps['color']
    }
  }
] satisfies SelectMenuItem[])
const chipValue = ref(chipItems.value[0])

const statuses = [
  {
    label: 'Backlog',
    value: 'backlog',
    description: 'Issues that have been identified but not yet prioritized',
    icon: HelpIcon
  },
  {
    label: 'Todo',
    value: 'todo',
    description: 'Issues that are ready to be worked on',
    icon: PlusInCircleIcon,
    color: 'air-primary-copilot' as SelectMenuProps['color'],
    disabled: true
  },
  {
    label: 'In Progress',
    value: 'in_progress',
    description: 'Issues that are currently being worked on',
    icon: ArrowTopIcon,
    color: 'air-primary' as SelectMenuProps['color']
  },
  {
    label: 'Done',
    value: 'done',
    icon: CircleCheckIcon,
    color: 'air-primary-success' as SelectMenuProps['color']
  },
  { type: 'separator' as const },
  {
    label: 'Canceled',
    value: 'canceled',
    icon: CancelIcon,
    color: 'air-primary-alert' as SelectMenuProps['color']
  }
] satisfies SelectMenuItem[]

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  transform: (data: IUser[]) => {
    return data?.map(user => ({
      label: user.name,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` }
    }))
  },
  lazy: true
})

function getStatusIcon(value: string) {
  return statuses.find(status => status.value === value)?.icon || UserIcon
}

function getSizeValue(size?: string | string[]) {
  return Array.isArray(size) ? size[0] : size
}

function getFirstValue(value?: string | (string | undefined)[]) {
  return Array.isArray(value) ? value[0] : value
}
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="multipleAttrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="multipleAttrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />

      <B24Switch v-model="singleAttrs.disabled" label="Disabled" />
      <B24Switch v-model="singleAttrs.loading" label="Loading" />
      <B24Switch v-model="singleAttrs.highlight" label="Highlight" />
      <B24Switch v-model="singleAttrs.rounded" label="Rounded" />
    </template>

    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'max-w-80' }">
      <B24SelectMenu
        :items="items"
        :b24ui="{ root: 'w-full' }"
        name="some_value"
        placeholder="Choose a value&hellip;"
        aria-label="Choose a value"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24SelectMenu
        :items="items"
        :b24ui="{ root: 'w-full' }"
        name="some_value"
        placeholder="Underline"
        aria-label="Underline"
        underline
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24SelectMenu
        :items="items"
        :b24ui="{ root: 'w-full' }"
        name="some_value"
        placeholder="No border"
        aria-label="No border"
        no-border
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24SelectMenu
        :items="items"
        :b24ui="{ root: 'w-full' }"
        name="some_value"
        placeholder="No padding"
        aria-label="No padding"
        no-padding
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24SelectMenu
        :items="items"
        :b24ui="{ root: 'w-full' }"
        :tag-color="props?.color || 'air-primary'"
        tag="some text"
        name="some_value"
        placeholder="Tag"
        aria-label="Tag"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24SelectMenu
        :items="items"
        :b24ui="{ root: 'w-full' }"
        trailing
        name="some_value"
        placeholder="Loading trailing"
        aria-label="Loading trailing"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24SelectMenu
        :items="items"
        :b24ui="{ root: 'w-full' }"
        :icon="RocketIcon"
        name="some_value"
        placeholder="Icon"
        aria-label="Icon"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24SelectMenu
        :items="items"
        :b24ui="{ root: 'w-full' }"
        :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
        name="some_value"
        placeholder="Avatar"
        aria-label="Avatar"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24SelectMenu
        v-model="selectedItems"
        :items="items"
        :b24ui="{ root: 'w-full' }"
        name="multiple"
        placeholder="Multiple"
        aria-label="Multiple"
        multiple
        v-bind="{ ...props, disabled: singleAttrs.disabled, loading: singleAttrs.loading }"
      />
      <B24SelectMenu
        v-model="value"
        :b24ui="{ root: 'w-full' }"
        :create-item="{ position: 'bottom', when: 'always' }"
        :items="itemsSimple"
        :icon="Search2Icon"
        name="some_value"
        placeholder="Create item"
        aria-label="Create item"
        aria-invalid="true"
        highlight
        tag="+ item"
        tag-color="air-primary-copilot"
        color="air-primary-alert"
        value-key="value"
        v-bind="{ ...props, disabled: singleAttrs.disabled, loading: singleAttrs.loading }"
        @create="onCreate"
      />
      <B24SelectMenu
        :items="statuses"
        :b24ui="{ root: 'w-full' }"
        :icon="Search2Icon"
        name="some_value"
        placeholder="Search status&hellip;"
        aria-label="Search status"
        value-key="value"
        arrow
        v-bind="{ ...singleAttrs, ...props }"
      >
        <template #leading="{ modelValue, b24ui }">
          <Component
            :is="getStatusIcon(getFirstValue(modelValue) || '')"
            v-if="modelValue"
            :class="b24ui.leadingIcon()"
          />
        </template>
      </B24SelectMenu>
      <B24SelectMenu
        :items="users"
        :b24ui="{ root: 'w-full' }"
        :loading="singleAttrs.loading || status === 'pending'"
        :icon="UserIcon"
        :trailing-icon="Expand1Icon"
        name="some_users"
        placeholder="Search users&hellip;"
        aria-label="Search users"
        arrow
        v-bind="{ ...props, disabled: singleAttrs.disabled }"
      >
        <template #leading="{ modelValue, b24ui }">
          <B24Avatar
            v-if="modelValue"
            v-bind="modelValue.avatar"
            :size="b24ui.leadingAvatarSize() as AvatarProps['size']"
            :class="b24ui.leadingAvatar()"
          />
        </template>
      </B24SelectMenu>
      <B24SelectMenu
        v-model="chipValue"
        :items="chipItems"
        name="some_chips"
        aria-label="Search chips"
        arrow
        :b24ui="{ root: 'w-full', base: ['xss'].includes(getSizeValue(props?.size) || '') ? 'ps-[25px]' : '' }"
        v-bind="{ ...singleAttrs, ...props }"
      >
        <template #leading="{ modelValue, b24ui }">
          <B24Chip
            v-if="modelValue && typeof modelValue === 'object' && 'chip' in modelValue && modelValue.chip"
            v-bind="modelValue.chip"
            standalone
            :size="['xl', 'lg'].includes(getSizeValue(props?.size) || '') ? 'lg' : (['md'].includes(getSizeValue(props?.size) || '') ? 'md' : 'sm')"
            :class="b24ui.itemLeadingChip()"
          />
        </template>
      </B24SelectMenu>
      <B24SelectMenu
        :b24ui="{ root: 'w-full' }"
        :icon="TaskListIcon"
        placeholder="Search virtualized..."
        virtualize
        :items="[Array(1000).fill(0).map((_, i) => ({ label: `item-${i}`, value: i }))]"
        v-bind="{ ...props, singleAttrs }"
      />
    </Matrix>
  </PlaygroundPage>
</template>
