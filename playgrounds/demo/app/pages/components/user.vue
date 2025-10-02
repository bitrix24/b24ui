<script lang="ts" setup>
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'

usePageMeta.setPageTitle('User')

const isUseBg = ref(true)
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="simple" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24User
          name="User name"
          description="User description"
          :avatar="{ src: 'https://github.com/bitrix24.png' }"
          to="https://github.com/bitrix24"
          target="_blank"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
