<script setup lang="ts">
import theme from '#build/b24ui/switch'
import CheckIcon from '@bitrix24/b24icons-vue/main/CheckIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

const sizes = Object.keys(theme.variants.size)
const colors = Object.keys(theme.variants.color)

const multipleAttrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  loading: false,
  disabled: false,
  required: false
})

const showIcons = ref(false)
const checked = ref(true)

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

      <B24Switch v-model="showIcons" label="Icons" />
      <B24Switch v-model="singleAttrs.loading" label="Loading" />
      <B24Switch v-model="singleAttrs.disabled" label="Disabled" />
      <B24Switch v-model="singleAttrs.required" label="Required" />
    </template>

    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'max-w-80' }">
      <B24Switch
        v-model="checked"
        label="Preview"
        :unchecked-icon="showIcons ? Cross30Icon : undefined"
        :checked-icon="showIcons ? CheckIcon : undefined"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24Switch
        v-model="checked"
        label="With description"
        description="This is a description"
        :unchecked-icon="showIcons ? Cross30Icon : undefined"
        :checked-icon="showIcons ? CheckIcon : undefined"
        v-bind="{ ...singleAttrs, ...props }"
      />
    </Matrix>
  </PlaygroundPage>
</template>
