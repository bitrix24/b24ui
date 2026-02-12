<script setup lang="ts">
import theme from '#build/b24ui/button'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)

const multipleAttrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  useDropdown: false,
  rounded: false,
  loading: false
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

function onClick() {
  return new Promise<void>(res => setTimeout(res, 1000))
}
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="multipleAttrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="multipleAttrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />

      <B24Switch v-model="singleAttrs.useDropdown" label="useDropdown" />
      <B24Switch v-model="singleAttrs.rounded" label="Rounded" />
      <B24Switch v-model="singleAttrs.loading" label="Loading" />
    </template>

    <Matrix v-slot="props" :attrs="multipleAttrs" :b24ui="{ root: 'max-w-70' }">
      <B24Button label="Button" loading-auto v-bind="{ ...singleAttrs, ...props }" @click="onClick" />
      <B24Button label="Link" loading-auto to="/" v-bind="{ ...singleAttrs, ...props }" @click="onClick" />
      <B24Button label="Submit" type="submit" loading-auto v-bind="{ ...singleAttrs, ...props }" @click="onClick" />
      <B24Button label="Disabled" disabled loading-auto v-bind="{ ...singleAttrs, ...props }" @click="onClick" />
      <B24Button
        label="Disabled link"
        to="#"
        loading-auto
        disabled
        v-bind="{ ...singleAttrs, ...props }"
        @click="onClick"
      />
      <B24Button
        label="Disabled Avatar"
        :avatar="{ src: '/avatar/employee.png' }"
        loading-auto
        disabled
        v-bind="{ ...singleAttrs, ...props }"
        @click="onClick"
      />
      <B24Button
        label="Disabled Icon"
        :icon="RocketIcon"
        loading-auto
        disabled
        v-bind="{ ...singleAttrs, ...props }"
        @click="onClick"
      />
      <B24Button label="Loading wait" use-wait loading-auto v-bind="{ ...singleAttrs, ...props }" @click="onClick" />
      <B24Button label="Loading clock" use-clock loading-auto v-bind="{ ...singleAttrs, ...props }" @click="onClick" />
      <B24Button
        label="Avatar"
        :avatar="{ src: '/avatar/employee.png' }"
        loading-auto
        v-bind="{ ...singleAttrs, ...props }"
        @click="onClick"
      />
      <B24Button
        label="Icon"
        :icon="RocketIcon"
        loading-auto
        v-bind="{ ...singleAttrs, ...props }"
        @click="onClick"
      />
    </Matrix>
  </PlaygroundPage>
</template>
