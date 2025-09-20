<script setup lang="ts">
import theme from '#build/b24ui/card'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'

usePageMeta.setPageTitle('Card')
const variants = Object.keys(theme.variants.variant) as Array<keyof typeof theme.variants.variant>
</script>

<template>
  <ExampleGrid v-once>
    <template v-for="variant in variants" :key="variant">
      <B24Card :variant="variant">
        <template #header>
          <Placeholder class="h-8" />
        </template>

        <Placeholder class="h-32">
          <p>{{ variant }}</p>
        </Placeholder>

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </B24Card>
    </template>
  </ExampleGrid>
</template>
