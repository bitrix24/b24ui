<script setup lang="ts">
import theme from '#build/b24ui/kbd'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import { kbdKeysMap } from '@bitrix24/b24ui-nuxt/runtime/composables/useKbd.js'

usePageMeta.setPageTitle('Kbd')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const kbdKeys = Object.keys(kbdKeysMap)
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="variants">
      <ExampleCardSubTitle title="different depth" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Kbd value="meta" depth="light" />
        <B24Kbd value="meta" depth="normal" />
        <B24Kbd value="meta" depth="dark" />
      </div>
      <ExampleCardSubTitle title="size" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Kbd v-for="size in sizes" :key="size" value="meta" :size="size" />
      </div>
    </ExampleCard>
    <ExampleCard title="Vlues" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="list" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Kbd v-for="(kdbKey, index) in kbdKeys" :key="index" :value="kdbKey" />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
