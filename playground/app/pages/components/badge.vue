<script setup lang="ts">
import theme from '#build/b24ui/badge'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'
import type { ToastProps } from '@bitrix24/b24ui-nuxt'

usePageMeta.setPageTitle('Badge')
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>

const toast = useToast()
const isUseBg = ref(true)

function onClick() {
  toast.add({
    title: 'Action',
    description: 'Some action',
    color: 'air-primary' as ToastProps['color']
  })
}

function onCloseClick(event: MouseEvent) {
  const { target } = event
  if (target) {
    const parentNode = (target as HTMLElement).closest('span')
    if (parentNode) {
      parentNode.classList.add('invisible')

      setTimeout(() => {
        parentNode.classList.remove('invisible')
      }, 1000)
    }
  }
}

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

const isPrimary = (color: string) => {
  return color.includes('air-primary')
}
</script>

<template>
  <ExampleGrid v-once class="mb-4">
    <ExampleCard title="color" :use-bg="isUseBg" class="sm:col-span-2">
      <ExampleCardSubTitle title="default" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <B24Badge
            size="lg"
            color="air-primary"
            label="Employee Name"
            :avatar="{ src: '/avatar/employee.png', text: 'Employee Name' }"
            use-link
            use-close
            :on-close-click="onCloseClick"
            @click="onClick"
          />
          <div>
            <B24Badge
              size="lg"
              color="air-primary"
              :avatar="{ src: '/avatar/employee.png', text: 'Employee Name' }"
              use-link
              use-close
              :on-close-click="onCloseClick"
              inverted
              @click="onClick"
            >
              <span class="text-nowrap">Use slot</span>
            </B24Badge>
          </div>
        </div>
      </div>
      <ExampleCardSubTitle title="colors" />

      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <template v-for="color in airColors" :key="color">
          <B24Badge
            :color="color"
            :label="`This is ${color}`"
            size="lg"
          />
          <B24Badge
            v-if="isPrimary(color)"
            :color="color"
            :label="`This is inverted ${color}`"
            inverted
            size="lg"
          />
        </template>
      </div>

      <B24Collapsible class="mb-2">
        <B24Button
          color="air-secondary-no-accent"
          label="Deprecate"
          use-dropdown
        />
        <template #content>
          <div class="my-4 flex flex-wrap items-start justify-start gap-4">
            <template v-for="color in oldColors" :key="color">
              <B24Badge
                :color="color"
                :label="`This is ${color}`"
                size="lg"
              />
            </template>
          </div>
        </template>
      </B24Collapsible>
    </ExampleCard>

    <ExampleCard title="size" :use-bg="isUseBg" class="sm:col-span-2">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="`${size}`" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Badge
            :size="size"
            :label="`this is ${size}`"
          />
          <B24Badge
            :size="size"
            :label="`this is inverted ${size}`"
            inverted
          />
          <B24Badge
            :size="size"
            label="1"
          />
          <B24Badge
            :size="size"
            label="2"
          />
          <B24Badge
            :size="size"
            label="14"
          />
          <B24Badge
            :size="size"
            label="square"
            square
          />
          <B24Badge
            :size="size"
            label="square"
            inverted
            square
          />
          <B24Badge
            :size="size"
            square
            :icon="InfoIcon"
          />
          <B24Badge
            :size="size"
            inverted
            :icon="InfoIcon"
          />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="variants" :use-bg="isUseBg">
      <ExampleCardSubTitle title="link" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Badge
          label="Use link"
          use-link
        />
        <B24Badge
          label="Use link inverted"
          use-link
          inverted
        />
      </div>

      <ExampleCardSubTitle title="close icon" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Badge
          label="Use close icon"
          use-close
        />
        <B24Badge
          label="Use close icon inverted"
          use-close
          inverted
        />
      </div>

      <ExampleCardSubTitle title="icon" />
      <div class="mb-4 flex flex-wrap items-start justify-start gap-4">
        <B24Badge
          label="Use icon"
          :icon="InfoIcon"
        />
        <B24Badge
          label="Use inverted icon"
          :icon="InfoIcon"
          inverted
        />
      </div>
    </ExampleCard>

    <ExampleCard title="Avatar" :use-bg="isUseBg" class="sm:col-span-2 md:col-span-3">
      <template v-for="color in airColors" :key="color">
        <ExampleCardSubTitle :title="color as string" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <template v-for="size in sizes" :key="size">
            <B24Badge
              :color="color"
              :size="size"
              :label="`This is ${size}`"
              :avatar="{ src: '/avatar/assistant.png' }"
              use-close
              use-link
            />
            <B24Badge
              v-if="isPrimary(color)"
              :color="color"
              :size="size"
              :label="`This is inverted ${size}`"
              :avatar="{ src: '/avatar/assistant.png' }"
              use-close
              use-link
              inverted
            />
          </template>
        </div>
      </template>
    </ExampleCard>
  </ExampleGrid>
</template>
