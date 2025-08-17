<script setup lang="ts">
/**
 * @see playground/app/pages/components/select-menu.vue
 */
import type { SelectItem, AvatarProps, ChipProps } from '@bitrix24/b24ui-nuxt'

import theme from '#build/b24ui/select'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import type { IUser } from '~/types'
import ALetterIcon from '@bitrix24/b24icons-vue/main/ALetterIcon'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import HelpIcon from '@bitrix24/b24icons-vue/button/HelpIcon'
import PlusInCircleIcon from '@bitrix24/b24icons-vue/actions/PlusInCircleIcon'
import ArrowTopIcon from '@bitrix24/b24icons-vue/actions/ArrowTopIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/main/CircleCheckIcon'
import CancelIcon from '@bitrix24/b24icons-vue/button/CancelIcon'

usePageMeta.setPageTitle('Select')

const toast = useToast()
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const isUseBg = ref(false)

const knowledgeBase = ['Select Knowledge base', 'Create knowledge base'] satisfies SelectItem[]
const smartScripts = ['Scripts', 'Create script', 'Install from Bitrix24.Market'] satisfies SelectItem[]
const smartProcess = ['Smart Process Automation'] satisfies SelectItem[]
const settings = ['CRM settings', 'My company details', 'Access permissions'] satisfies SelectItem[]

const items = [
  [...knowledgeBase],
  [{ label: 'Smart scripts', type: 'label' as const }, ...smartScripts],
  ['Bitrix24.Market'],
  [{ label: 'Smart Process Automation', type: 'label' as const }, ...smartProcess],
  [{ label: 'Settings', type: 'label' as const }, ...settings]
] satisfies SelectItem[][]
const selectedItems = ref([knowledgeBase[0]!, smartProcess[0]!])

const chipItems = ref([
  {
    label: 'New message',
    value: 'message',
    chip: {
      color: 'collab' as const
    },
    color: 'collab'
  },
  {
    label: 'New information',
    value: 'information',
    chip: {
      color: 'primary' as const
    },
    onSelect(e: Event) {
      e.preventDefault()
      toast.add({ title: 'Action', description: 'New information', color: 'primary' as const })
    }
  },
  {
    label: 'Online',
    value: 'online',
    chip: {
      color: 'success' as const
    },
    onSelect() {
      toast.add({ title: 'Action', description: 'Online', color: 'success' as const })
    }
  },
  {
    label: 'Offline',
    value: 'offline',
    chip: {
      color: 'default' as const
    }
  }
] satisfies SelectItem[])
const chipValue = ref(chipItems.value[0]?.value)

function getChip(value: string) {
  return chipItems.value.find(item => item.value === value)?.chip
}

const statuses = [
  {
    label: 'Backlog',
    value: 'backlog',
    icon: HelpIcon
  },
  {
    label: 'Todo',
    value: 'todo',
    icon: PlusInCircleIcon,
    color: 'ai' as const
  },
  {
    label: 'In Progress',
    value: 'in_progress',
    icon: ArrowTopIcon,
    color: 'primary' as const
  },
  {
    label: 'Done',
    value: 'done',
    icon: CircleCheckIcon,
    color: 'success' as const
  },
  {
    label: 'Canceled',
    value: 'canceled',
    icon: CancelIcon,
    color: 'danger' as const
  }
] satisfies SelectItem[]

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  transform: (data: IUser[]) => {
    return data?.map(user => ({ label: user.name, value: String(user.id), avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true
})

function getStatusIcon(value: string) {
  return statuses.find(status => status.value === value)?.icon || UserIcon
}

function getUserAvatar(value: string) {
  return users.value?.find(user => user.value === value)?.avatar || {}
}

const oldColors = computed(() => {
  return colors.filter((color) => {
    return !color.includes('air')
  })
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base" :use-bg="isUseBg">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-col gap-4">
        <B24Select
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Apple"
        />
        <B24Separator label="fix height" type="dotted" />
        <!-- / @todo test this / -->
        <B24Select
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Apple"
          :b24ui="{ content: 'max-h-60' }"
        />
      </div>

      <ExampleCardSubTitle title="underline" />
      <div class="mb-4 flex flex-col">
        <B24Select
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Apple"
          color="air-primary-success"
          underline
        />
      </div>

      <ExampleCardSubTitle title="no border" />
      <div class="mb-4 flex flex-col">
        <B24Select
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Apple"
          no-border
        />
      </div>

      <ExampleCardSubTitle title="no padding" />
      <div class="mb-4 flex flex-col">
        <B24Select
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Apple"
          no-padding
        />
      </div>

      <ExampleCardSubTitle title="some error" />
      <div class="mb-4 flex flex-col">
        <B24Select
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Apple"
          highlight
          color="air-primary-alert"
        />
      </div>

      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-col gap-4">
        <B24Select
          :items="items"
          name="disabled"
          placeholder="Disabled"
          aria-label="Disabled"
          disabled
        />
        <B24Select
          :items="items"
          name="required"
          placeholder="Required"
          aria-label="Required"
          required
        />
        <B24Select
          v-model="selectedItems"
          :items="items"
          name="multiple"
          placeholder="Multiple"
          aria-label="Multiple"
          multiple
        />
        <B24Select
          :items="items"
          name="rounded"
          placeholder="Rounded"
          aria-label="Rounded"
          rounded
          :icon="ALetterIcon"
          :trailing-icon="Expand1Icon"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="loading" :use-bg="isUseBg">
      <ExampleCardSubTitle title="loading" />
      <div class="mb-4 flex flex-col gap-4">
        <B24Select
          :items="items"
          loading
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
        />
        <B24Select
          :items="items"
          loading
          trailing
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
        />
        <B24Select
          :items="items"
          loading
          :icon="RocketIcon"
          :trailing-icon="Expand1Icon"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
        />
        <B24Select
          :items="items"
          loading
          :avatar="{ src: '/avatar/employee.png' }"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="color" :use-bg="isUseBg" class="sm:col-span-2">
      <template v-for="color in airColors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-4 flex flex-wrap flex-row items-center gap-4">
          <B24Select
            :items="items"
            name="some_value"
            placeholder="Choose a value&hellip;"
            aria-label="Choose a value"
            :color="color"
            highlight
            class="w-40"
          />
          <B24Select
            :items="items"
            :tag-color="color"
            tag="some text"
            name="some_value"
            placeholder="Choose a value&hellip;"
            aria-label="Choose a value"
            :color="color"
            highlight
            class="w-40"
          />
        </div>
      </template>
      <B24Collapsible class="mb-2">
        <B24Button
          color="air-secondary-no-accent"
          label="Deprecate"
          use-dropdown
        />
        <template #content>
          <template v-for="color in oldColors" :key="color">
            <ExampleCardSubTitle :title="color as string" />
            <div class="mb-4 flex flex-wrap flex-row items-center gap-4">
              <B24Select
                :items="items"
                name="some_value"
                placeholder="Choose a value&hellip;"
                aria-label="Choose a value"
                :color="color"
                highlight
                class="w-40"
              />
              <B24Select
                :items="items"
                :tag-color="color"
                tag="some text"
                name="some_value"
                placeholder="Choose a value&hellip;"
                aria-label="Choose a value"
                :color="color"
                highlight
                class="w-40"
              />
            </div>
          </template>
        </template>
      </B24Collapsible>
    </ExampleCard>
  </ExampleGrid>

  <B24Separator accent="accent" class="my-4" label="Size" type="dotted" />
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="Some cases" :use-bg="isUseBg" class="sm:col-span-2 md:col-span-4">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap flex-row items-center gap-4">
          <B24Select
            :items="items"
            name="some_value"
            placeholder="Choose a value&hellip;"
            aria-label="Choose a value"
            :size="size"
            class="w-40"
          />
          <B24Select
            :items="items"
            :icon="Search2Icon"
            name="some_value"
            placeholder="Choose a value&hellip;"
            aria-label="Choose a value"
            :size="size"
            class="w-40"
          />
          <B24Select
            :items="statuses"
            :icon="Search2Icon"
            :trailing-icon="Expand1Icon"
            name="some_value"
            placeholder="Search status&hellip;"
            aria-label="Search status"
            :size="size"
            value-key="value"
            class="w-40"
          >
            <template #leading="{ modelValue, b24ui }">
              <Component
                :is="getStatusIcon(modelValue)"
                v-if="modelValue"
                :class="b24ui.leadingIcon()"
              />
            </template>
          </B24Select>
          <B24Select
            :items="items"
            :avatar="{ src: '/avatar/employee.png' }"
            name="some_value"
            placeholder="Choose a value&hellip;"
            aria-label="Choose a value"
            :size="size"
            class="w-40"
          />
          <B24Select
            :items="users || []"
            :loading="status === 'pending'"
            :icon="UserIcon"
            :trailing-icon="Expand1Icon"
            name="some_users"
            placeholder="Search users&hellip;"
            aria-label="Search users"
            :size="size"
            class="w-60"
          >
            <template #leading="{ modelValue, b24ui }">
              <B24Avatar
                v-if="modelValue"
                :size="b24ui.itemLeadingAvatarSize() as AvatarProps['size']"
                v-bind="getUserAvatar(modelValue)"
              />
            </template>
          </B24Select>

          <B24Select
            v-model="chipValue"
            :items="chipItems"
            name="some_chips"
            aria-label="Search chips"
            :size="size"
            class="w-40"
          >
            <template #leading="{ modelValue, b24ui }">
              <B24Chip
                v-if="modelValue"
                v-bind="getChip(modelValue as string)"
                inset
                standalone
                :size="b24ui.itemLeadingChipSize() as ChipProps['size']"
                :class="b24ui.itemLeadingChip()"
              />
            </template>
          </B24Select>
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
