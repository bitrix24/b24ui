<script setup lang="ts">
import { upperFirst } from 'scule'
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

import Cross20Icon from '@bitrix24/b24icons-vue/actions/Cross20Icon'

usePageMeta.setPageTitle('Select')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const tagColors = Object.keys(theme.variants.tagColor) as Array<keyof typeof theme.variants.tagColor>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

// @todo set crm words ////
const fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']

const items = [[{ label: 'Fruits', type: 'label' }, ...fruits], [{ label: 'Vegetables', type: 'label' }, ...vegetables]]
const selectedItems = ref([fruits[0]!, vegetables[0]!])

const chipItems = ref([
  {
    label: 'bug',
    value: 'bug',
    chip: {
      color: 'danger' as const
    }
  },
  {
    label: 'feature',
    value: 'feature',
    chip: {
      color: 'success' as const
    }
  },
  {
    label: 'enhancement',
    value: 'enhancement',
    chip: {
      color: 'primary' as const
    }
  }
])
const chipValue = ref(chipItems.value[0]?.value)

function getChip(value: string) {
  return chipItems.value.find(item => item.value === value)?.chip
}

const statuses = [
  {
    label: 'Backlog',
    value: 'backlog',
    icon: 'i-lucide-circle-help'
  },
  {
    label: 'Todo',
    value: 'todo',
    icon: 'i-lucide-circle-plus'
  },
  {
    label: 'In Progress',
    value: 'in_progress',
    icon: 'i-lucide-circle-arrow-up'
  },
  {
    label: 'Done',
    value: 'done',
    icon: 'i-lucide-circle-check'
  },
  {
    label: 'Canceled',
    value: 'canceled',
    icon: 'i-lucide-circle-x'
  }
]

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  transform: (data: IUser[]) => {
    return data?.map(user => ({ label: user.name, value: String(user.id), avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true
})

function getStatusIcon(value: string) {
  return statuses.find(status => status.value === value)?.icon || 'i-lucide-user'
}

function getUserAvatar(value: string) {
  return users.value?.find(user => user.value === value)?.avatar || {}
}
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Select
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Apple"
          class="w-3/4"
        />
      </div>

      <ExampleCardSubTitle title="underline" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Select
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Apple"
          class="w-3/4"
          color="success"
          underline
        />
      </div>

      <ExampleCardSubTitle title="no border" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Select
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Apple"
          class="w-3/4"
          no-border
        />
      </div>

      <ExampleCardSubTitle title="no padding" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Select
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Apple"
          class="w-3/4"
          no-padding
        />
      </div>

      <ExampleCardSubTitle title="some error" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Select
          :items="items"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          default-value="Apple"
          class="w-3/4"
          highlight
          color="danger"
        />
      </div>

      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-col gap-4 w-3/4">
        <B24Select :items="items" name="disabled" placeholder="Disabled" aria-label="Disabled" disabled />
        <B24Select :items="items" name="required" placeholder="Required" aria-label="Required" required />
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

    <ExampleCard title="loading">
      <ExampleCardSubTitle title="loading" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Select
          :items="items"
          loading
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          class="w-3/4"
        />
        <B24Select
          :items="items"
          loading
          trailing
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          class="w-3/4"
        />
        <B24Select
          :items="items"
          loading
          :icon="RocketIcon"
          :trailing-icon="Expand1Icon"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          class="w-3/4"
        />
        <B24Select
          :items="items"
          loading
          :avatar="{ src: '/avatar/employee.png' }"
          name="some_value"
          placeholder="Choose a value&hellip;"
          aria-label="Choose a value"
          class="w-3/4"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="color">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Select
            :items="items"
            name="some_value"
            placeholder="Choose a value&hellip;"
            aria-label="Choose a value"
            :color="color"
            highlight
            class="w-3/4"
          />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="tag">
      <template v-for="tagColor in tagColors" :key="tagColor">
        <ExampleCardSubTitle :title="tagColor as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Select
            :items="items"
            :tag-color="tagColor"
            tag="some text"
            name="some_value"
            placeholder="Choose a value&hellip;"
            aria-label="Choose a value"
            class="w-3/4"
          />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="size" class="sm:col-span-3">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
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
            :items="items"
            :icon="Cross20Icon"
            trailing
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
            class="w-40"
          >
            <template #leading="{ modelValue, b24ui }">
              <Component
                :is="getStatusIcon(modelValue as string)"
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
            class="w-40"
          >
            <template #leading="{ modelValue, b24ui }">
              <B24Avatar
                v-if="modelValue"
                :size="b24ui.itemLeadingAvatarSize()"
                v-bind="getUserAvatar(modelValue as string)"
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
                :size="b24ui.itemLeadingChipSize()"
                :class="b24ui.itemLeadingChip()"
              />
            </template>
          </B24Select>
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
