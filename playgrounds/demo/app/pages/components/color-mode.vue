<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'

usePageMeta.setPageTitle('ColorMode')

const isUseBg = ref(true)
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="ver1" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="flex flex-col gap-10 min-h-0">
        <B24ColorModeSwitch />
        <B24ColorModeSelect />
        <div>
          <B24ColorModeButton />
        </div>
      </div>
    </ExampleCard>
    <ExampleCard title="ver1" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="flex flex-col gap-10 min-h-0">
        <B24ColorModeAvatar light="https://github.com/vuejs.png" dark="https://github.com/nuxt.png" />
        <B24ColorModeImage light="https://github.com/vuejs.png" dark="https://github.com/nuxt.png" class="size-8" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
