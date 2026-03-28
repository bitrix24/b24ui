<script setup lang="ts">
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import TelegramIcon from '@bitrix24/b24icons-vue/outline/TelegramIcon'

const route = useRoute()
const config = useRuntimeConfig()
const { b24DocsLink, tgLink } = useHeader()
</script>

<template>
  <B24Separator :icon="route.path === '/' ? undefined : Bitrix24Icon" class="h-px" />

  <B24Footer>
    <template #left>
      <ProseP small accent="less">
        Copyright © 2024-present Bitrix24
      </ProseP>
    </template>

    <template #right>
      <B24Button
        aria-label="Bitrix24 REST API"
        :icon="Bitrix24Icon"
        :to="b24DocsLink"
        target="_blank"
        size="md"
      />

      <B24Button
        aria-label="Bitrix24 UI on Telegram"
        :icon="TelegramIcon"
        :to="tgLink"
        target="_blank"
        size="md"
      />
      <B24Button
        label="Releases"
        :icon="RocketIcon"
        :to="`${config.public.gitUrl}/releases`"
        target="_blank"
        size="md"
      />
    </template>

    <NuxtLink :to="config.public.gitUrl" target="_blank" class="text-legend text-(length:--ui-font-size-sm) hover:underline">
      Published under MIT License.
    </NuxtLink>
  </B24Footer>
</template>
