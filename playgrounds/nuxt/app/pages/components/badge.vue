<script setup lang="ts">
import theme from '#build/b24ui/badge'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'
import type { ToastProps } from '@bitrix24/b24ui-nuxt'

const toast = useToast()

const sizes = Object.keys(theme.variants.size)
const colors = Object.keys(theme.variants.color)

const multipleAttrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  inverted: false,
  useLink: false,
  useClose: false,
  square: false
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

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
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="multipleAttrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="multipleAttrs.size" class="w-24" :items="sizes" placeholder="Size" multiple />
      <B24Switch v-model="singleAttrs.inverted" label="Inverted" />
      <B24Switch v-model="singleAttrs.square" label="Square" />
      <B24Switch v-model="singleAttrs.useLink" label="useLink" />
      <B24Switch v-model="singleAttrs.useClose" label="useClose" />
    </template>

    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'max-w-80' }">
      <B24Badge
        label="Badge"
        v-bind="{ ...singleAttrs, ...props }"
        :on-close-click="onCloseClick"
        @click="onClick"
      />
      <B24Badge
        :label="singleAttrs.square ? '' : 'Icon'"
        :icon="InfoIcon"
        v-bind="{ ...singleAttrs, ...props }"
        :on-close-click="onCloseClick"
      />
      <B24Badge
        label="With avatar"
        v-bind="{ ...singleAttrs, ...props }"
        :avatar="{ src: '/avatar/employee.png', text: 'Employee' }"
        :on-close-click="onCloseClick"
      />
    </Matrix>
  </PlaygroundPage>
</template>
