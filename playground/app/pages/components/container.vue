<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Container')
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="Usage" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="default" />
      <B24Container class="">
        <Placeholder class="h-32" />
      </B24Container>
    </ExampleCard>
  </ExampleGrid>
</template>
