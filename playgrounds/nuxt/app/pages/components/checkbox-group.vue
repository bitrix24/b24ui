<script setup lang="ts">
import theme from '#build/b24ui/checkbox-group'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'

usePageMeta.setPageTitle('CheckboxGroup')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>

const isUseBg = ref(true)

const value = ref(['System'])
const items = ref(['System', 'Light', 'Dark'])
const valueWithDesc = ref(['system'])
const itemsWithDesc = ref([
  {
    label: 'System',
    description: 'This is the first option.',
    value: 'system'
  },
  {
    label: 'Light',
    description: 'This is the second option.',
    value: 'light'
  },
  {
    label: 'Dark',
    description: 'This is the third option.',
    value: 'dark'
  }
])

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})
</script>

<template>
  <ExampleGrid v-once>
    <template
      v-for="color in airColors"
      :key="color"
    >
      <ExampleCard :title="color" :use-bg="isUseBg">
        <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
          <div class="px-2 flex flex-col gap-4">
            <B24CheckboxGroup
              v-model="value"
              :items="items"
              :color="color"
              :legend="color"
            />
          </div>
        </div>
      </ExampleCard>
    </template>

    <ExampleCard title="with description list" :use-bg="isUseBg" class="mb-4 sm:col-span-2">
      <ExampleCardSubTitle title="list" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24CheckboxGroup
          v-for="size in sizes"
          :key="size"
          v-model="valueWithDesc"
          :size="size"
          :items="itemsWithDesc"
          :legend="size"
          variant="list"
        />
      </div>
    </ExampleCard>
    <ExampleCard title="with description card" :use-bg="isUseBg" class="mb-4 sm:col-span-2">
      <ExampleCardSubTitle title="card" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24CheckboxGroup
          v-for="size in sizes"
          :key="size"
          v-model="valueWithDesc"
          :size="size"
          :items="itemsWithDesc"
          :legend="size"
          variant="card"
        />
      </div>
    </ExampleCard>
    <ExampleCard title="with description table" :use-bg="isUseBg" class="mb-4 sm:col-span-2">
      <ExampleCardSubTitle title="table" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24CheckboxGroup
          v-for="size in sizes"
          :key="size"
          v-model="valueWithDesc"
          :size="size"
          :items="itemsWithDesc"
          :legend="size"
          variant="table"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="indicator list" :use-bg="isUseBg" class="mb-4 sm:col-span-2">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size" />
        <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
          <div>
            <B24CheckboxGroup
              v-model="valueWithDesc"
              :size="size"
              :items="itemsWithDesc"
              legend="start"
              variant="list"
              indicator="start"
            />
          </div>
          <div class="border-s ps-[10px]">
            <B24CheckboxGroup
              v-model="valueWithDesc"
              :size="size"
              :items="itemsWithDesc"
              legend="end"
              variant="list"
              indicator="end"
            />
          </div>
          <div class="border-s ps-[10px]">
            <B24CheckboxGroup
              v-model="valueWithDesc"
              :size="size"
              :items="itemsWithDesc"
              legend="hidden"
              variant="list"
              indicator="hidden"
            />
          </div>
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="indicator card" :use-bg="isUseBg" class="mb-4 sm:col-span-2">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="size" />
        <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
          <div>
            <B24CheckboxGroup
              v-model="valueWithDesc"
              :size="size"
              :items="itemsWithDesc"
              legend="start"
              variant="card"
              indicator="start"
            />
          </div>
          <div>
            <B24CheckboxGroup
              v-model="valueWithDesc"
              :size="size"
              :items="itemsWithDesc"
              legend="end"
              variant="card"
              indicator="end"
            />
          </div>
          <div>
            <B24CheckboxGroup
              v-model="valueWithDesc"
              :size="size"
              :items="itemsWithDesc"
              legend="hidden"
              variant="card"
              indicator="hidden"
            />
          </div>
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="indicator table" :use-bg="isUseBg" class="mb-4 sm:col-span-2">
      <template v-for="size in sizes" :key="size">
        <ExampletableSubTitle :title="size" />
        <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
          <div>
            <B24CheckboxGroup
              v-model="valueWithDesc"
              :size="size"
              :items="itemsWithDesc"
              legend="start"
              variant="table"
              indicator="start"
            />
          </div>
          <div>
            <B24CheckboxGroup
              v-model="valueWithDesc"
              :size="size"
              :items="itemsWithDesc"
              legend="end"
              variant="table"
              indicator="end"
            />
          </div>
          <div>
            <B24CheckboxGroup
              v-model="valueWithDesc"
              :size="size"
              :items="itemsWithDesc"
              legend="hidden"
              variant="table"
              indicator="hidden"
            />
          </div>
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
