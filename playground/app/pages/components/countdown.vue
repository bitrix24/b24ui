<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import Clock2Icon from '@bitrix24/b24icons-vue/main/Clock2Icon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

usePageMeta.setPageTitle('Countdown')
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base">
      <ExampleCardSubTitle title="@todo Clock" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <Clock2Icon class="size-4" />
        <B24Countdown v-slot="{ days, hours, minutes, seconds }" :time="30000">
          Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
        </B24Countdown>
      </div>

      <ExampleCardSubTitle title="@todo Cross" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <Cross30Icon class="size-4" />
        <B24Countdown :time="30000" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
