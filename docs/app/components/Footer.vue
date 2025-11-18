<script setup lang="ts">
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const config = useRuntimeConfig()
</script>

<template>
  <div class="mx-[22px] my-[12px] flex flex-col sm:flex-row items-center justify-start gap-[12px]">
    <B24Button
      label="Releases"
      :icon="RocketIcon"
      :to="`${config.public.gitUrl}/releases`"
      target="_blank"
      size="md"
    />
    <NuxtLink :to="config.public.gitUrl" target="_blank" class="text-(length:--ui-font-size-sm) hover:underline">
      Published under MIT License.
    </NuxtLink>
    <ProseP small accent="less">
      Copyright © 2024-present Bitrix24
    </ProseP>
  </div>
</template>
