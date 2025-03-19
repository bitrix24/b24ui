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
      <B24Separator class="my-3" type="dotted" />
      <div class="space-y-4 min-h-[250px]">
        <B24Collapsible class="flex flex-col gap-2 w-48">
          <B24Button
            label="Open"
            use-dropdown
            block
          />

          <template #content>
            <Placeholder class="h-48" />
          </template>
        </B24Collapsible>
      </div>
    </ExampleCard>

    <ExampleCard title="unmount">
      <B24Separator class="my-3" type="dotted" />
      <div class="space-y-4 min-h-[250px]">
        <B24Collapsible
          :unmount-on-hide="false"
          class="flex flex-col gap-2 w-48"
        >
          <B24Button
            label="Open"
            use-dropdown
            block
          />

          <template #content>
            <Placeholder class="h-48" />
          </template>
        </B24Collapsible>
      </div>
    </ExampleCard>

    <ExampleCard title="disabled">
      <B24Separator class="my-3" type="dotted" />
      <div class="space-y-4 min-h-[250px]">
        <B24Collapsible
          disabled
          class="flex flex-col gap-2 w-48"
        >
          <B24Button
            label="Open"
            use-dropdown
            block
          />

          <template #content>
            <Placeholder class="h-48" />
          </template>
        </B24Collapsible>
      </div>
    </ExampleCard>

    <ExampleCard title="control open state">
      <B24Separator class="my-3" type="dotted" />
      <div class="space-y-4 min-h-[250px]">
        <B24Collapsible
          v-model:open="open"
          class="flex flex-col gap-2 w-48"
        >
          <B24Button
            label="Open"
            use-dropdown
            block
          />

          <template #content>
            <Placeholder class="h-48" />
          </template>
        </B24Collapsible>
      </div>
    </ExampleCard>

    <ExampleCard title="with rotating icon">
      <B24Separator class="my-3" type="dotted" />
      <div class="space-y-4 min-h-[250px]">
        <B24Collapsible
          class="flex flex-col gap-2 w-48"
        >
          <B24Button
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
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
