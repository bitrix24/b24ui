<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import theme from '#build/b24ui/empty'
import ProductIcon from '@bitrix24/b24icons-vue/outline/ProductIcon'
import AddProductIcon from '@bitrix24/b24icons-vue/outline/AddProductIcon'
import RefreshIcon from '@bitrix24/b24icons-vue/outline/RefreshIcon'

usePageMeta.setPageTitle('Empty')

const isUseBg = ref(true)

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const inverted = ref(false)
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="options" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-col gap-4">
        <B24Select v-model="attrs.color" :items="colors" multiple placeholder="Color" />
        <B24Switch v-model="inverted" label="Inverted" />
        <B24Select v-model="attrs.size" :items="sizes" multiple placeholder="Size" />
      </div>
    </ExampleCard>

    <Matrix v-slot="props" :attrs="attrs">
      <ExampleCard :title="[props?.color, props?.size].join(' ')" :use-bg="isUseBg" class="col-span-2">
        <B24Separator class="my-3" type="dotted" />
        <B24Empty
          :icon="ProductIcon"
          title="No projects found"
          description="It looks like you haven't added any projects. Create one to get started."
          :actions="[
            {
              label: 'Create new',
              icon: AddProductIcon,
              color: 'air-primary'
            },
            {
              label: 'Refresh',
              icon: RefreshIcon,
              color: 'air-secondary-accent-2'
            }
          ]"
          v-bind="props"
          :inverted="inverted"
        />
      </ExampleCard>
    </Matrix>
  </ExampleGrid>
</template>
