<script setup lang="ts">
/**
 * @see playground/app/pages/components/select.vue
 */
import type { SelectMenuItem, SelectMenuProps, AvatarProps, ChipProps } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/select-menu'
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

usePageMeta.setPageTitle('SelectMenu')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const isUseBg = ref(true)

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
    icon: HelpIcon
  },
  {
    label: 'Todo',
    value: 'todo',
    icon: PlusInCircleIcon,
    color: 'air-primary-copilot' as SelectMenuProps['color'],
    disabled: true
  },
  {
    label: 'In Progress',
    value: 'in_progress',
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
      <div class="mb-4 flex flex-col">
        <B24SelectMenu
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Scripts"
        />
      </div>

      <ExampleCardSubTitle title="underline" />
      <div class="mb-4 flex flex-col">
        <B24SelectMenu
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Scripts"
          color="air-primary-success"
          underline
        />
      </div>

      <ExampleCardSubTitle title="no border" />
      <div class="mb-4 flex flex-col">
        <B24SelectMenu
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Scripts"
          no-border
        />
      </div>

      <ExampleCardSubTitle title="no padding" />
      <div class="mb-4 flex flex-col">
        <B24SelectMenu
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Scripts"
          no-padding
        />
      </div>

      <ExampleCardSubTitle title="some error" />
      <div class="mb-4 flex flex-col">
        <B24SelectMenu
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Scripts"
          highlight
          color="air-primary-alert"
        />
      </div>

      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-col gap-4">
        <B24SelectMenu
          :items="items"
          name="disabled"
          placeholder="Disabled"
          aria-label="Disabled"
          disabled
        />
        <B24SelectMenu
          :items="items"
          name="required"
          placeholder="Required"
          aria-label="Required"
          required
        />
        <B24SelectMenu
          v-model="selectedItems"
          :items="items"
          name="multiple"
          placeholder="Multiple"
          aria-label="Multiple"
          multiple
        />
        <B24SelectMenu
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
        <B24SelectMenu
          :items="items"
          loading
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
        />
        <B24SelectMenu
          :items="items"
          loading
          trailing
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
        />
        <B24SelectMenu
          :items="items"
          loading
          :icon="RocketIcon"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
        />
        <B24SelectMenu
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
          <B24SelectMenu
            :items="items"
            name="some_value"
            placeholder="Choose a value&hellip;"
            aria-label="Choose a value"
            :color="color"
            highlight
            class="w-40"
          />
          <B24SelectMenu
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
              <B24SelectMenu
                :items="items"
                name="some_value"
                placeholder="Choose a value&hellip;"
                aria-label="Choose a value"
                :color="color"
                highlight
                class="w-40"
              />
              <B24SelectMenu
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
          <B24SelectMenu
            :items="items"
            name="some_value"
            placeholder="Choose a value&hellip;"
            aria-label="Choose a value"
            :size="size"
            class="w-[240px]"
            arrow
          />
          <B24SelectMenu
            v-model="value"
            :create-item="{ position: 'bottom', when: 'always' }"
            :items="itemsSimple"
            :icon="Search2Icon"
            name="some_value"
            placeholder="Choose a value&hellip;"
            aria-label="Choose a value"
            :size="size"
            tag-color="air-primary-copilot"
            highlight
            tag="+ item"
            color="air-primary-copilot"
            value-key="value"
            class="w-[240px]"
            arrow
            @create="onCreate"
          />
          <B24SelectMenu
            :items="statuses"
            :icon="Search2Icon"
            name="some_value"
            placeholder="Search status&hellip;"
            aria-label="Search status"
            :size="size"
            value-key="value"
            class="w-[240px]"
            arrow
          >
            <template #leading="{ modelValue, b24ui }">
              <Component
                :is="getStatusIcon(modelValue)"
                v-if="modelValue"
                :class="b24ui.leadingIcon()"
              />
            </template>
          </B24SelectMenu>
          <div class="flex flex-row items-center justify-between gap-4">
            <B24SelectMenu
              :items="items"
              :avatar="{ src: '/avatar/employee.png' }"
              :trailing-icon="Expand1Icon"
              name="some_value"
              placeholder="Choose a value&hellip;"
              aria-label="Choose a value"
              :size="size"
              class="w-[240px]"
              arrow
            />
            <B24Input
              :avatar="{ src: '/avatar/assistant.png' }"
              :trailing-icon="Search2Icon"
              name="some_value"
              placeholder="Input"
              aria-label="Insert value"
              :size="size"
              class="w-[140px]"
            />
          </div>

          <B24SelectMenu
            :items="users"
            :loading="status === 'pending'"
            :icon="UserIcon"
            :trailing-icon="Expand1Icon"
            name="some_users"
            placeholder="Search users&hellip;"
            aria-label="Search users"
            :size="size"
            class="w-[240px]"
            arrow
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
            :size="size"
            class="w-[240px]"
            arrow
            :b24ui="{
              base: ['xss'].includes(size) ? 'ps-[25px]' : ''
            }"
          >
            <template #leading="{ modelValue, b24ui }">
              <B24Chip
                v-if="modelValue"
                v-bind="modelValue.chip"
                standalone
                :size="['xl', 'lg'].includes(size) ? 'lg' : (['md'].includes(size) ? 'md' : 'sm')"
                :class="b24ui.itemLeadingChip()"
              />
            </template>
          </B24SelectMenu>
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
