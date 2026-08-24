<script lang="ts" setup>
import avatarTheme from '#build/b24ui/avatar'

const colors = Object.keys(avatarTheme.variants.color)

const attrs = reactive({
  color: [avatarTheme.defaultVariants.color]
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select
        v-model="attrs.color"
        class="w-44"
        :items="colors"
        placeholder="Color"
        multiple
        size="xs"
      />
    </template>
    <Matrix v-slot="props" :attrs="attrs" class="flex-col">
      <B24User
        name="User name"
        description="User description"
        :avatar="{ src: 'https://github.com/bitrix24.png' }"
        to="https://github.com/bitrix24"
        target="_blank"
        v-bind="props"
      />
    </Matrix>
  </PlaygroundPage>
</template>
