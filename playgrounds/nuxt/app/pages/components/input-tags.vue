<script setup lang="ts">
import { upperFirst } from 'scule'
import theme from '#build/b24ui/input-tags'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ALetterIcon from '@bitrix24/b24icons-vue/main/ALetterIcon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

usePageMeta.setPageTitle('InputTags')

const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const tags = ref(['Bitrix24', 'Crm', 'Copilot'])
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="simple" class="md:col-span-2">
      <B24Separator class="mb-4" />
      <div class="flex flex-col gap-2">
        <B24InputTags
          v-model="tags"
          placeholder="Enter tags..."
          autofocus
        />
      </div>

      <div class="mt-3 flex items-center gap-2">
        <B24InputTags
          placeholder="Enter tags..."
        />
      </div>
    </ExampleCard>

    <ExampleCard title="some color" class="md:col-span-2">
      <B24Separator class="mb-4" />
      <div class="flex items-center gap-2">
        <B24InputTags
          v-model="tags"
          placeholder="Enter tags..."
          color="air-primary"
        />
      </div>

      <div class="mt-3 flex items-center gap-2">
        <B24InputTags
          v-model="tags"
          placeholder="Enter tags..."
          highlight
          color="air-primary-alert"
          aria-invalid="true"
        />
      </div>

      <div class="mt-3 flex items-center gap-2">
        <B24InputTags
          v-model="tags"
          placeholder="Enter tags..."
          color="air-primary-copilot"
          highlight
          tag="note"
          tag-color="air-primary-alert"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="some more" class="md:col-span-2">
      <B24Separator class="mb-4" />
      <div class="flex flex-col gap-4">
        <B24InputTags v-model="tags" placeholder="Disabled" disabled />
        <B24InputTags v-model="tags" placeholder="Required" required />
        <B24InputTags v-model="tags" loading placeholder="Loading..." />
      </div>
    </ExampleCard>

    <ExampleCard title="size" class="md:col-span-2">
      <B24Separator class="mb-4" />
      <div class="flex flex-col gap-4">
        <B24InputTags
          v-for="size in sizes"
          :key="size"
          v-model="tags"
          :size="size"
          :placeholder="upperFirst(size)"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="icon" class="md:col-span-2">
      <B24Separator class="mb-4" />
      <div class="flex flex-col gap-4">
        <B24InputTags
          v-for="size in sizes"
          :key="size"
          v-model="tags"
          :icon="ALetterIcon"
          placeholder="Search..."
          :size="size"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="trailing icon" class="md:col-span-2">
      <B24Separator class="mb-4" />
      <div class="flex flex-col gap-4">
        <B24InputTags
          v-for="size in sizes"
          :key="size"
          v-model="tags"
          :trailing-icon="Search2Icon"
          placeholder="Search..."
          :size="size"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
