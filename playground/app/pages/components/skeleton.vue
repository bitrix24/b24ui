<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('Skeleton')
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="simple">
      <ExampleCardSubTitle title="ltr" />
      <div class="mb-8 w-full flex items-center gap-4">
        <B24Skeleton class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
          <B24Skeleton class="h-4 w-[150px]" />
          <B24Skeleton class="h-4 w-[100px]" />
        </div>
      </div>

      <ExampleCardSubTitle title="rtl & accent" />
      <div class="mb-4 w-full flex items-center justify-end gap-4">
        <div class="space-y-2 flex flex-col items-end">
          <B24Skeleton accent="accent" class="h-4 w-[150px]" />
          <B24Skeleton accent="accent" class="h-4 w-[100px]" />
        </div>
        <B24Skeleton accent="accent" class="h-12 w-12 rounded-full" />
      </div>

      <ExampleCardSubTitle title="less" />
      <div class="mb-8 w-full flex items-center gap-4">
        <B24Skeleton accent="less" class="h-12 w-12 rounded-full" />
        <div class="space-y-2">
          <B24Skeleton accent="less" class="h-4 w-[150px]" />
          <B24Skeleton accent="less" class="h-4 w-[100px]" />
        </div>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
