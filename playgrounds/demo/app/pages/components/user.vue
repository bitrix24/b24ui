<script lang="ts" setup>
import avatarTheme from '#build/b24ui/avatar'

const colors = Object.keys(avatarTheme.variants.color)

const attrs = reactive({
  color: [avatarTheme.defaultVariants.color]
})

// Sets `avatar.color`, which overrides the `color` cascade from `B24User`.
const pinAvatarColor = ref(false)
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select
        v-model="attrs.color"
        class="w-52"
        :items="colors"
        placeholder="Color"
        multiple
        size="xs"
      />
      <B24Switch v-model="pinAvatarColor" label="avatar.color wins" size="xs" />
    </template>

    <Matrix v-slot="props" :attrs="attrs">
      <B24User
        v-bind="props"
        name="User name"
        description="User description"
        :avatar="{
          src: 'https://github.com/bitrix24.png',
          ...(pinAvatarColor ? { color: 'air-primary-success' } : {})
        }"
        to="https://github.com/bitrix24"
        target="_blank"
      />
    </Matrix>
  </PlaygroundPage>
</template>
