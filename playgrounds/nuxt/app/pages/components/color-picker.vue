<script setup lang="ts">
import theme from '#build/b24ui/color-picker'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'

usePageMeta.setPageTitle('ColorPicker')

const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const value = ref('#00C16A')
const valueRgb = ref('rgb(0, 193, 106)')
const valueHsl = ref('hsl(153, 100%, 37.8%)')
const valueCmyk = ref('cmyk(100%, 0%, 45.08%, 24.31%)')
const valueCielab = ref('lab(68.88% -60.41% 32.55%)')
const chip = computed(() => ({ backgroundColor: value.value }))
</script>

<template>
  <ExampleGrid v-once class="mb-2">
    <ExampleCard title="usage">
      <B24ColorPicker v-model="value" />
    </ExampleCard>

    <ExampleCard title="disabled">
      <B24ColorPicker v-model="value" disabled />
    </ExampleCard>

    <ExampleCard title="RGB Format">
      <B24ColorPicker v-model="valueRgb" />
    </ExampleCard>

    <ExampleCard title="HSL Format">
      <B24ColorPicker v-model="valueHsl" />
    </ExampleCard>

    <ExampleCard title="CMYK Format">
      <B24ColorPicker v-model="valueCmyk" />
    </ExampleCard>

    <ExampleCard title="CIELab Format">
      <B24ColorPicker v-model="valueCielab" />
    </ExampleCard>

    <template v-for="size in sizes" :key="size">
      <ExampleCard :title="size">
        <B24ColorPicker v-model="value" :size="size" />
      </ExampleCard>
    </template>

    <ExampleCard title="popover">
      <B24Popover>
        <B24Button label="Choose color">
          <template #leading>
            <span :style="chip" class="size-3 rounded-full" />
          </template>
        </B24Button>

        <template #content>
          <B24ColorPicker v-model="value" class="p-2" />
        </template>
      </B24Popover>
    </ExampleCard>
  </ExampleGrid>
</template>
