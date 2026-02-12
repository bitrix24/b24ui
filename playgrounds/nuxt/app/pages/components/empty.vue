<script setup lang="ts">
import theme from '#build/b24ui/empty'
import ProductIcon from '@bitrix24/b24icons-vue/outline/ProductIcon'
import AddProductIcon from '@bitrix24/b24icons-vue/outline/AddProductIcon'
import RefreshIcon from '@bitrix24/b24icons-vue/outline/RefreshIcon'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const inverted = ref(false)
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.color" class="w-44" :items="airColors" multiple placeholder="Color" />
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" multiple placeholder="Size" />
      <B24Switch v-model="inverted" label="Inverted" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-120' }">
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
    </Matrix>
  </PlaygroundPage>
</template>
