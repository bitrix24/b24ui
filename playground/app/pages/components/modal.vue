<script setup lang="ts">
import theme from '#build/b24ui/modal'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Modal')
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="??" class="md:col-span-2">
      <ExampleCardSubTitle title="size" />
      <div class="mb-4 ">
        <B24Modal>
          <B24Button label="Modal" color="link" depth="dark" />

          <template #content>
            <Placeholder class="h-40 m-4" />
          </template>
        </B24Modal>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
