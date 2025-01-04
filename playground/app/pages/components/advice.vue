<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/advice'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'

usePageMeta.setPageTitle('Advice')

const description = ref('Let\'s signal the manager that the deal is not moving, the manager does not call the client back and does not respond to his messages. Let\'s assign a task to the manager on behalf of the manager')
</script>

<template>
  <ExampleGrid v-once custom-grid-cols class="mt-xs grid-cols-[repeat(auto-fill,minmax(532px,1fr))]">
    <ExampleCard title="base">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Advice :description="description" />
      </div>

      <ExampleCardSubTitle title="icon" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Advice :description="description" :icon="InfoIcon" />
      </div>

      <ExampleCardSubTitle title="avatar" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Advice :description="description" :avatar="{ src: '/avatar/assistant.png' }" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
