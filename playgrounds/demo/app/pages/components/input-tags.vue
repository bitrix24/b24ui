<script setup lang="ts">
import theme from '#build/b24ui/input-tags'
import ALetterIcon from '@bitrix24/b24icons-vue/main/ALetterIcon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  disabled: false,
  loading: false,
  highlight: false,
  rounded: false
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const tags = ref(['Bitrix24', 'Crm', 'Copilot'])
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />

      <B24Switch v-model="singleAttrs.disabled" label="Disabled" />
      <B24Switch v-model="singleAttrs.loading" label="Loading" />
      <B24Switch v-model="singleAttrs.highlight" label="Highlight" />
      <B24Switch v-model="singleAttrs.rounded" label="Rounded" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-120' }">
      <B24InputTags v-model="tags" placeholder="Enter tags..." autofocus v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputTags v-model="tags" placeholder="Required" required v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputTags v-model="tags" placeholder="Underline" underline v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputTags v-model="tags" placeholder="No border" no-border v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputTags
        v-model="tags"
        placeholder="Tag"
        tag="note"
        tag-color="air-primary-copilot"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24InputTags v-model="tags" placeholder="Trailing loading..." v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputTags v-model="tags" :icon="ALetterIcon" placeholder="Icon" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputTags v-model="tags" :trailing-icon="Search2Icon" placeholder="Trailing icon" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24InputTags v-model="tags" :avatar="{ src: '/b24ui/demo/avatar/employee.png' }" placeholder="Avatar" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
    </Matrix>
  </PlaygroundPage>
</template>
