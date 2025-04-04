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
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="color">
      <ExampleCardSubTitle title="default" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Switch v-model="checked" label="primary" />
        </div>
      </div>

      <ExampleCardSubTitle title="variants" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Switch v-for="color in colors" :key="color" :color="color" :label="color" :default-value="true" />
        </div>
      </div>
    </ExampleCard>

    <ExampleCard title="statuses">
      <ExampleCardSubTitle title="variants" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Switch v-model="checked" label="Primary" />
          <B24Switch color="danger" label="Danger" :default-value="true" />
          <B24Switch label="Default value" :default-value="true" />
          <B24Switch label="Required" required />
          <B24Switch label="Disabled" disabled />
          <B24Switch label="Disabled" disabled :default-value="true" />
        </div>
      </div>
    </ExampleCard>

    <ExampleCard title="size" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="simple" />
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

      <ExampleCardSubTitle title="with description" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Switch
          v-for="size in sizes"
          :key="size"
          :size="size"
          label="Switch me"
          description="This is a description"
        />
      </div>
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
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

      <ExampleCardSubTitle title="with icon && loading" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
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
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
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
