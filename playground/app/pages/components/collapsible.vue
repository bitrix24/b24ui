<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'

usePageMeta.setPageTitle('Collapsible')

const open = ref(true)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="usage">
      <B24Collapsible class="flex flex-col gap-2">
        <B24Button
          label="Open"
          use-dropdown
          block
        />

        <template #content>
          <Placeholder class="h-48" />
        </template>
      </B24Collapsible>
    </ExampleCard>

    <ExampleCard title="unmount">
      <B24Collapsible
        :unmount-on-hide="false"
        class="flex flex-col gap-2"
      >
        <B24Button
          color="air-secondary-accent-1"
          label="Open"
          use-dropdown
          block
        />

        <template #content>
          <Placeholder class="h-48" />
        </template>
      </B24Collapsible>
    </ExampleCard>

    <ExampleCard title="disabled">
      <B24Collapsible
        disabled
        class="flex flex-col gap-2"
      >
        <B24Button
          color="air-boost"
          label="Open"
          use-dropdown
          block
        />

        <template #content>
          <Placeholder class="h-48" />
        </template>
      </B24Collapsible>
    </ExampleCard>

    <ExampleCard title="control open state">
      <B24Collapsible
        v-model:open="open"
        class="flex flex-col gap-2"
      >
        <B24Button
          color="air-selection"
          label="Open"
          use-dropdown
          block
        />

        <template #content>
          <Placeholder class="h-48" />
        </template>
      </B24Collapsible>
    </ExampleCard>

    <ExampleCard title="with rotating icon">
      <B24Collapsible
        class="flex flex-col gap-2"
      >
        <B24Button
          color="air-primary-copilot"
          class="group"
          label="Open"
          use-dropdown
          block
          :b24ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
          }"
        />

        <template #content>
          <Placeholder class="h-48" />
        </template>
      </B24Collapsible>
    </ExampleCard>
  </ExampleGrid>
</template>
