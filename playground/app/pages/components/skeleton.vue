<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import B24SkeletonTaskAdd from '@bitrix24/b24ui-nuxt/runtime/components/content/SkeletonTaskAdd.vue'

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

      <ExampleCardSubTitle title="rtl" />
      <div class="mb-4 w-full flex items-center justify-end gap-4">
        <div class="space-y-2 flex flex-col items-end">
          <B24Skeleton class="h-4 w-[150px]" />
          <B24Skeleton class="h-4 w-[100px]" />
        </div>
        <B24Skeleton class="h-12 w-12 rounded-full" />
      </div>
    </ExampleCard>

    <ExampleCard title="task" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="task-add" />
      <div class="border border-gray-500 border-dashed min-h-[200px] w-full">
        <B24SkeletonTaskAdd />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
