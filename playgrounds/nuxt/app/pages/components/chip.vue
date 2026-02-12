<script setup lang="ts">
import theme from '#build/b24ui/chip'
import BellIcon from '@bitrix24/b24icons-vue/main/BellIcon'
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'
import TrendUpIcon from '@bitrix24/b24icons-vue/outline/TrendUpIcon'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)
const positions = Object.keys(theme.variants.position)

const multipleAttrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  position: [theme.defaultVariants.position]
})

const singleAttrs = reactive({
  inset: false,
  inverted: false,
  hideZero: false
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="multipleAttrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="multipleAttrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />
      <B24Select v-model="multipleAttrs.position" class="w-44" :items="positions" placeholder="Position" multiple />

      <B24Switch v-model="singleAttrs.inset" label="Inset" />
      <B24Switch v-model="singleAttrs.inverted" label="Inverted" />
      <B24Switch v-model="singleAttrs.hideZero" label="HideZero" />
    </template>

    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'max-w-90', body: 'flex-row flex-wrap gap-6' }">
      <B24Chip :text="53" :trailing-icon="TrendUpIcon" v-bind="{ ...singleAttrs, ...props }">
        <B24Button :icon="MailIcon" color="air-secondary-no-accent" />
      </B24Chip>
      <B24Chip :b24ui="{ base: 'style-filled-boost' }" v-bind="{ ...singleAttrs, ...props }">
        <B24Button :icon="BellIcon" color="air-secondary-no-accent" />
      </B24Chip>
      <B24Chip :text="0" v-bind="{ ...singleAttrs, ...props }">
        <B24Avatar src="/avatar/employee.png" alt="Employee" />
      </B24Chip>
      <B24Chip :text="1000" v-bind="{ ...singleAttrs, ...props }">
        <B24Avatar src="/avatar/assistant.png" alt="Assistant" />
      </B24Chip>
    </Matrix>
  </PlaygroundPage>
</template>
