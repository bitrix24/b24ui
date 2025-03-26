<script setup lang="ts">
/**
 * @see playground/app/pages/components/select-menu.vue
 */
import type { InputMenuItem } from '@bitrix24/b24ui-nuxt'

import theme from '#build/b24ui/input-menu'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'
import ALetterIcon from '@bitrix24/b24icons-vue/main/ALetterIcon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import Cross20Icon from '@bitrix24/b24icons-vue/actions/Cross20Icon'

usePageMeta.setPageTitle('InputMenu')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const tagColors = Object.keys(theme.variants.tagColor) as Array<keyof typeof theme.variants.tagColor>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

// region Single List ////
const items = ref(['Prospecting', 'Qualifying', 'Presenting', 'Negotiating', 'Closed'])
const itemsSimple = ref(['Prospecting', 'Qualifying', 'Presenting', 'Negotiating', 'Closed'])
const value = ref('Qualifying')
const valueForAdd = ref('Prospecting')

const valueMultiple = ref(['Prospecting', 'Qualifying', 'Presenting'])
// endregion ////

function onCreate(item: string) {
  itemsSimple.value.unshift(item)
  valueForAdd.value = item
}

const itemsObj = ref([
  {
    label: 'CRM settings',
    value: 'settings',
    color: 'collab' as const
  },
  {
    label: 'My company details',
    value: 'my_company_details'
  },
  {
    label: 'Access permissions',
    value: 'access_permissions'
  }
] satisfies InputMenuItem[])
const valueObj = ref(itemsObj.value[0])
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base">
      <ExampleCardSubTitle title="autofocus" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputMenu
          v-model="value"
          :items="items"
          aria-label="Insert value"
          autofocus
          name="some_value"
          placeholder="Insert value&hellip;"
          class="w-3/4"
        />
        <B24InputMenu
          v-model="valueMultiple"
          :items="items"
          multiple
          aria-label="Insert value"
          autofocus
          name="some_value"
          placeholder="Insert value&hellip;"
          class="w-full"
        />
      </div>

      <ExampleCardSubTitle title="underline" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputMenu
          v-model="value"
          :items="items"
          color="success"
          underline
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          class="w-3/4"
        />
      </div>

      <ExampleCardSubTitle title="no border" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputMenu
          v-model="value"
          :items="items"
          no-border
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          class="w-3/4"
        />
      </div>

      <ExampleCardSubTitle title="no padding" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputMenu
          v-model="value"
          :items="items"
          no-padding
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          class="w-3/4"
        />
      </div>

      <ExampleCardSubTitle title="some error" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputMenu
          v-model="value"
          :items="items"
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          highlight
          color="danger"
          class="w-3/4"
        />
      </div>

      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-col gap-4 w-3/4">
        <B24InputMenu
          v-model="value"
          :items="items"
          name="disabled"
          placeholder="Disabled"
          aria-label="Disabled"
          disabled
        />
        <B24InputMenu
          v-model="value"
          :items="items"
          name="required"
          placeholder="Required"
          aria-label="Required"
          required
        />
        <B24InputMenu
          v-model="value"
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
        <B24InputMenu
          v-model="value"
          :items="items"
          loading
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          class="w-3/4"
        />
        <B24InputMenu
          v-model="value"
          :items="items"
          loading
          trailing
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          class="w-3/4"
        />
        <B24InputMenu
          v-model="value"
          :items="items"
          loading
          :icon="RocketIcon"
          :trailing-icon="Expand1Icon"
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          class="w-3/4"
        />
        <B24InputMenu
          v-model="value"
          :items="items"
          loading
          :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          class="w-3/4"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="color">
      <template v-for="color in colors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24InputMenu
            v-model="value"
            :items="items"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :color="color"
            highlight
            class="w-3/4"
          />

          <B24InputMenu
            v-model="valueObj"
            :items="itemsObj"
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
          <B24InputMenu
            v-model="value"
            :items="items"
            :tag-color="tagColor"
            tag="some text"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            class="w-3/4"
          />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="size" class="sm:col-span-2">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24InputMenu
            v-model="value"
            :items="items"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24InputMenu
            v-model="valueForAdd"
            :create-item="{
              position: 'bottom',
              when: 'always'
            }"
            :items="itemsSimple"
            :icon="Search2Icon"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
            highlight
            tag="+ item"
            color="ai"
            @create="onCreate"
          />
          <B24InputMenu
            v-model="value"
            :items="items"
            :icon="Cross20Icon"
            trailing
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24InputMenu
            v-model="value"
            :items="items"
            :icon="Search2Icon"
            :trailing-icon="Expand1Icon"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24InputMenu
            v-model="value"
            :items="items"
            :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24InputMenu
            v-model="value"
            :items="items"
            :avatar="{ src: '/b24ui/demo/avatar/assistant.png' }"
            :trailing-icon="Expand1Icon"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24InputMenu
            v-model="valueObj"
            :items="itemsObj"
            :size="size"
            class="w-40"
          />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
