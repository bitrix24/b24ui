<script setup lang="ts">
import { vMaska } from 'maska/vue'
import theme from '#build/b24ui/input'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import CalculatorIcon from '@bitrix24/b24icons-vue/main/CalculatorIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
import FolderEmptyIcon from '@bitrix24/b24icons-vue/main/FolderEmptyIcon'
import ALetterIcon from '@bitrix24/b24icons-vue/main/ALetterIcon'
import CrossedEye2Icon from '@bitrix24/b24icons-vue/main/CrossedEye2Icon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import Cross20Icon from '@bitrix24/b24icons-vue/actions/Cross20Icon'
import CreditDebitCardIcon from '@bitrix24/b24icons-vue/main/CreditDebitCardIcon'
import CalendarIcon from '@bitrix24/b24icons-vue/outline/CalendarIcon'

usePageMeta.setPageTitle('Input')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const tagColors = Object.keys(theme.variants.tagColor) as Array<keyof typeof theme.variants.tagColor>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base">
      <ExampleCardSubTitle title="autofocus" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input autofocus name="some_value" placeholder="Insert value&hellip;" aria-label="Insert value" class="w-3/4" />
      </div>

      <ExampleCardSubTitle title="underline" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input
          color="success"
          underline
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          type="search"
          class="w-3/4"
        />
      </div>

      <ExampleCardSubTitle title="no border" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input no-border name="some_value" placeholder="Insert value&hellip;" aria-label="Insert value" class="w-3/4" />
      </div>

      <ExampleCardSubTitle title="no padding" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input no-padding name="some_value" placeholder="Insert value&hellip;" aria-label="Insert value" class="w-3/4" />
      </div>

      <ExampleCardSubTitle title="some error" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input
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
        <B24Input name="disabled" placeholder="Disabled" aria-label="Disabled" disabled />
        <B24Input name="required" placeholder="Required" aria-label="Required" required />
        <B24Input
          name="rounded"
          placeholder="Rounded"
          aria-label="Rounded"
          rounded
          :icon="ALetterIcon"
          :trailing-icon="TaskIcon"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="type">
      <ExampleCardSubTitle title="text" />
      <div class="mb-4 flex flex-col gap-4 w-3/4">
        <B24Input type="text" name="text" aria-label="Some text" :icon="ALetterIcon" />
      </div>
      <ExampleCardSubTitle title="number" />
      <div class="mb-4 flex flex-col gap-4 w-3/4">
        <B24Input type="number" name="number" aria-label="Some number" :icon="CalculatorIcon" :model-value="10" />
      </div>
      <ExampleCardSubTitle title="password" />
      <div class="mb-4 flex flex-col gap-4 w-3/4">
        <B24Input type="password" name="password" aria-label="Some password" :icon="CrossedEye2Icon" model-value="password" />
      </div>
      <ExampleCardSubTitle title="search" />
      <div class="mb-4 flex flex-col gap-4 w-3/4">
        <B24Input type="search" name="search" aria-label="Search" :icon="Search2Icon" />
      </div>
      <ExampleCardSubTitle title="file" />
      <div class="mb-4 flex flex-col gap-4 w-3/4">
        <B24Input type="file" name="file" aria-label="Some file" :icon="FolderEmptyIcon" size="xs" />
        <B24Input type="file" name="file" aria-label="Some file" :icon="FolderEmptyIcon" size="sm" />
        <B24Input type="file" name="file" aria-label="Some file" :icon="FolderEmptyIcon" />
        <B24Input type="file" name="file" aria-label="Some file" :icon="FolderEmptyIcon" size="lg" />
      </div>
      <!-- / @memo types are supported but not used
      <ExampleCardSubTitle title="make this" />
      <div class="mb-4 flex flex-col gap-4 w-3/4">

        <B24Input type="date" :model-value="new Date().toISOString().substring(0, 10)" />
        <B24Input type="checkbox" />
        <B24Input type="radio" />
        <B24Input type="week" />
        <B24Input type="hidden" />
        <B24Input type="range" />
        <B24Input type="image" />
        <B24Input type="color" />
        <B24Input type="submit" />
        <B24Input type="reset" />
      </div>
      / -->
    </ExampleCard>

    <ExampleCard title="loading">
      <ExampleCardSubTitle title="loading" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Input loading name="some_value" placeholder="Insert value&hellip;" aria-label="Insert value" class="w-3/4" />
        <B24Input
          loading
          trailing
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          class="w-3/4"
        />
        <B24Input
          loading
          :icon="RocketIcon"
          :trailing-icon="TaskIcon"
          name="some_value"
          placeholder="Insert value&hellip;"
          aria-label="Insert value"
          class="w-3/4"
        />
        <B24Input
          loading
          :avatar="{ src: '/avatar/employee.png' }"
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
          <B24Input
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
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
          <B24Input
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

    <ExampleCard title="mask" class="sm:col-span-2">
      <B24Alert title="Memo" color="warning" class="mb-2">
        <template #description>
          There's no built-in support for masks, but you can use libraries like <ProseA href="https://github.com/beholdr/maska" target="_blank"><ProseCode color="warning">maska</ProseCode></ProseA> to mask the Input.
        </template>
      </B24Alert>
      <ExampleCardSubTitle title="card" />
      <div class="mb-4 flex flex-col gap-2 w-3/4">
        <B24Input
          v-maska="'#### #### #### ####'"
          placeholder="4242 4242 4242 4242"
          :icon="CreditDebitCardIcon"
        />

        <div class="flex items-center gap-2">
          <B24Input
            v-maska="'##/##'"
            placeholder="MM/YY"
            :icon="CalendarIcon"
          />
          <B24Input
            v-maska="'###'"
            placeholder="CVC"
          />
        </div>
      </div>
    </ExampleCard>

    <ExampleCard title="size" class="sm:col-span-2">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Input name="some_value" placeholder="Insert value&hellip;" aria-label="Insert value" :size="size" class="w-40" />
          <B24Input
            :icon="Search2Icon"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24Input
            :icon="Cross20Icon"
            trailing
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24Input
            :icon="Search2Icon"
            :trailing-icon="Cross20Icon"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24Input
            :avatar="{ src: '/avatar/employee.png' }"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
          <B24Input
            :avatar="{ src: '/avatar/assistant.png' }"
            :trailing-icon="Cross20Icon"
            name="some_value"
            placeholder="Insert value&hellip;"
            aria-label="Insert value"
            :size="size"
            class="w-40"
          />
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
