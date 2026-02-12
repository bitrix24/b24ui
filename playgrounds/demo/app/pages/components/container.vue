<script setup lang="ts">
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="Usage" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="default" />
      <B24Container>
        <Placeholder class="h-32" />
      </B24Container>
    </ExampleCard>
  </ExampleGrid>
</template>
