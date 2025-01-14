<script setup lang="ts">
import theme from '#build/b24ui/content/description-list'
import usePageMeta from './../../../composables/usePageMeta'
import ExampleGrid from '../../../components/ExampleGrid.vue'
import ExampleCard from '../../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../../components/ExampleCardSubTitle.vue'
import B24DescriptionList from '@bitrix24/b24ui-nuxt/runtime/components/content/DescriptionList.vue'

usePageMeta.setPageTitle('DescriptionList')

const items = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' }
]
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="default" class="sm:col-span-2">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24DescriptionList
          legend="Applicant Information"
          text="Personal details and application."
          aria-label="Applicant Information"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
