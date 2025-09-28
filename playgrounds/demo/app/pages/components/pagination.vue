<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'

usePageMeta.setPageTitle('Pagination')

const page = ref(5)
const isUseBg = ref(true)
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="With buttons (default)" :use-bg="isUseBg" class="sm:col-span-2">
      <div class="flex flex-col gap-2">
        <B24Pagination v-model:page="page" :total="100" :sibling-count="1" show-edges />
      </div>
    </ExampleCard>
    <ExampleCard title="With links" :use-bg="isUseBg" class="sm:col-span-2">
      <div class="flex flex-col gap-2">
        <B24Pagination v-model:page="page" :total="100" :to="page => ({ query: { page } })" :sibling-count="1" show-edges />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
