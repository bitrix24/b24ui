<script setup lang="ts">
import type { AccordionItem } from '@bitrix24/b24ui-nuxt'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import IncertImageIcon from '@bitrix24/b24icons-vue/editor/IncertImageIcon'
import CalculatorIcon from '@bitrix24/b24icons-vue/main/CalculatorIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

usePageMeta.setPageTitle('Accordion')

const items = ref<AccordionItem[]>([
  {
    label: 'Icons',
    icon: IncertImageIcon,
    content: 'You have nothing to do.'
  },
  {
    label: 'Colors',
    icon: CalculatorIcon,
    content: 'Choose a primary color from your Tailwind CSS theme.',
    trailingIcon: RocketIcon
  },
  {
    label: 'Components',
    icon: RocketIcon,
    content: 'You can customize components by using the `class` / `b24ui` props.',
    disabled: true
  }
])

const active = ref('0')

// Note: This is for demonstration purposes only. Don't do this at home.
onMounted(() => {
  setInterval(() => {
    active.value = String((Number(active.value) + 1) % items.value.length)
  }, 2000)
})
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="simple">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Accordion :items="items" />
      </div>
    </ExampleCard>

    <ExampleCard title="multiple">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Accordion :items="items" type="multiple" />
      </div>
    </ExampleCard>

    <ExampleCard title="collapsible">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Accordion :items="items" :collapsible="false" />
      </div>
    </ExampleCard>

    <ExampleCard title="unmount">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Accordion :items="items" :unmount-on-hide="false" />
      </div>
    </ExampleCard>

    <ExampleCard title="disabled">
      <B24Separator class="my-3" type="dotted" />
      <div class="space-y-4 min-h-[250px]">
        <B24Accordion :items="items" disabled />
      </div>
    </ExampleCard>

    <ExampleCard title="control open state">
      <B24Separator class="my-3" type="dotted" />
      <div class="space-y-4 min-h-[250px]">
        <B24Accordion :items="items" v-model="active" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
