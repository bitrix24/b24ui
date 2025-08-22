<script setup lang="ts">
import theme from '#build/b24ui/switch'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import CheckIcon from '@bitrix24/b24icons-vue/main/CheckIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

usePageMeta.setPageTitle('Switch')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>

const checked = ref(true)

const oldColors = computed(() => {
  return colors.filter((color) => {
    return !color.includes('air')
  })
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="color" class="mb-4">
      <ExampleCardSubTitle title="default" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Switch v-model="checked" label="default" />
        </div>
      </div>

      <ExampleCardSubTitle title="variants" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Switch v-for="color in airColors" :key="color" :color="color" :label="color" :default-value="true" />
        </div>
      </div>

      <B24Collapsible class="mb-2">
        <B24Button
          color="air-secondary-no-accent"
          label="Deprecate"
          use-dropdown
        />

        <template #content>
          <div class="my-4 flex flex-wrap flex-col items-start justify-start gap-4">
            <div class="flex flex-col gap-4">
              <B24Switch v-for="color in oldColors" :key="color" :color="color" :label="color" :default-value="true" />
            </div>
          </div>
        </template>
      </B24Collapsible>
    </ExampleCard>

    <ExampleCard title="statuses" class="mb-4">
      <ExampleCardSubTitle title="variants" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Switch v-model="checked" label="default" />
          <B24Switch color="air-primary-alert" label="air-primary-alert" :default-value="true" />
          <B24Switch label="default value" :default-value="true" />
          <B24Switch label="required" required />
          <B24Switch label="disabled" disabled />
          <B24Switch label="disabled" disabled :default-value="true" />
        </div>
      </div>
    </ExampleCard>

    <ExampleCard title="simple" class="mb-4">
      <ExampleCardSubTitle title="size" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Switch
          v-for="size in sizes"
          :key="size"
          :size="size"
          label="Switch me"
        />
      </div>
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Switch
          v-for="size in sizes"
          :key="size"
          :size="size"
          label="Switch me"
          :unchecked-icon="Cross30Icon"
          :checked-icon="CheckIcon"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="with description" class="mb-4">
      <ExampleCardSubTitle title="size" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Switch
          v-for="size in sizes"
          :key="size"
          :size="size"
          label="Switch me"
          description="This is a description"
        />
      </div>
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Switch
          v-for="size in sizes"
          :key="size"
          :size="size"
          label="Switch me"
          description="This is a description"
          :unchecked-icon="Cross30Icon"
          :checked-icon="CheckIcon"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="with icon & loading" class="mb-4">
      <ExampleCardSubTitle title="size" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Switch
          v-for="size in sizes"
          :key="size"
          :size="size"
          label="Switch me"
          :unchecked-icon="Cross30Icon"
          :checked-icon="CheckIcon"
          loading
          :default-value="true"
        />
      </div>
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Switch
          v-for="size in sizes"
          :key="size"
          :size="size"
          label="Switch me"
          :unchecked-icon="Cross30Icon"
          :checked-icon="CheckIcon"
          loading
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
