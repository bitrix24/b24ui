<script setup lang="ts">
/**
 * @see playground/app/pages/components/select-menu.vue
 */
import type { InputMenuItem, InputMenuProps } from '@bitrix24/b24ui-nuxt'
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
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const isUseBg = ref(true)

const items = ref(['Prospecting', 'Qualifying', 'Presenting', 'Negotiating', 'Closed'])
const itemsSimple = ref(['Prospecting', 'Qualifying', 'Presenting', 'Negotiating', 'Closed'])
const value = ref('Qualifying')
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
    color: 'air-primary-success' as InputMenuProps['color']
  },
  {
    label: 'My company details',
    value: 'my_company_details',
    disabled: true
  },
  {
    label: 'Access permissions',
    value: 'access_permissions'
  }
] satisfies InputMenuItem[])
const valueObj = ref(itemsObj.value[0])

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
      <ExampleCardSubTitle title="autofocus" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24InputMenu
          :items="items"
          default-value="Negotiating"
          aria-label="Insert value"
          autofocus
          name="some_value"
          placeholder="Insert value&hellip;"
        />
        <B24InputMenu
          v-model="valueMultiple"
          :items="items"
          multiple
          aria-label="Insert value"
          name="some_value"
          placeholder="Insert value&hellip;"
          tag="+ multiple"
          tag-color="air-primary-copilot"
          :create-item="{ position: 'bottom', when: 'always' }"
          @create="onCreateMultiple"
        />
      </div>

      <ExampleCardSubTitle title="underline" />
      <div class="mb-4 flex flex-col">
        <B24InputMenu
          v-model="value"
          :items="items"
          color="air-primary-success"
          underline
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
      </div>

      <ExampleCardSubTitle title="no border" />
      <div class="mb-4 flex flex-col">
        <B24InputMenu
          v-model="value"
          :items="items"
          no-border
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
      </div>

      <ExampleCardSubTitle title="no padding" />
      <div class="mb-4 flex flex-col">
        <B24InputMenu
          v-model="value"
          :items="items"
          no-padding
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
      </div>

      <ExampleCardSubTitle title="some error" />
      <div class="mb-4 flex flex-col">
        <B24InputMenu
          v-model="value"
          :items="items"
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          highlight
          color="air-primary-alert"
          aria-invalid="true"
        />
      </div>

      <ExampleCardSubTitle title="some more" />
      <div class="mb-4 flex flex-col gap-4">
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

    <ExampleCard title="loading" :use-bg="isUseBg">
      <ExampleCardSubTitle title="loading" />
      <div class="mb-4 flex flex-col gap-4">
        <B24InputMenu
          v-model="value"
          :items="items"
          loading
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
        <B24InputMenu
          v-model="value"
          :items="items"
          loading
          trailing
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
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
        />
        <B24InputMenu
          v-model="value"
          :items="items"
          loading
          :avatar="{ src: '/avatar/employee.png' }"
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="color" :use-bg="isUseBg">
      <template v-for="color in airColors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-4 flex flex-wrap flex-row items-center gap-4">
          <B24InputMenu
            v-model="value"
            :items="items"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :color="color"
            highlight
            class="w-40"
          />

          <B24InputMenu
            v-model="valueObj"
            :items="itemsObj"
            :tag-color="color"
            tag="some text"
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
              <B24InputMenu
                v-model="value"
                :items="items"
                name="some_value"
                placeholder="Insert value&hellip;"
                aria-label="Insert value"
                :color="color"
                highlight
                class="w-40"
              />

              <B24InputMenu
                v-model="valueObj"
                :items="itemsObj"
                :tag-color="color"
                tag="some text"
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
          <B24InputMenu
            v-model="value"
            :items="items"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-[240px]"
            arrow
          />
          <B24InputMenu
            v-model="valueForAdd"
            :create-item="{ position: 'bottom', when: 'always' }"
            :items="itemsSimple"
            :icon="Search2Icon"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            highlight
            tag="+ item"
            tag-color="air-primary-copilot"
            color="air-primary-copilot"
            class="w-[240px]"
            arrow
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
            class="w-[240px]"
            arrow
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
            class="w-[240px]"
            arrow
          />
          <B24InputMenu
            v-model="value"
            :items="items"
            :avatar="{ src: '/avatar/employee.png' }"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-[240px]"
            arrow
          />
          <B24InputMenu
            v-model="value"
            :items="items"
            :avatar="{ src: '/avatar/assistant.png' }"
            :trailing-icon="Expand1Icon"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-[240px]"
            arrow
          />
          <B24InputMenu
            v-model="valueObj"
            :items="itemsObj"
            :size="size"
            class="w-[240px]"
            arrow
          />
          <div class="w-[640px]">
            <B24InputMenu
              v-model="valueMultiple"
              :items="items"
              :size="size"
              multiple
              aria-label="Insert value"
              name="some_value"
              placeholder="Insert value&hellip;"
              tag="+ multiple"
              tag-color="air-primary-copilot"
              arrow
              :create-item="{ position: 'bottom', when: 'always' }"
              @create="onCreateMultiple"
            />
          </div>
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
