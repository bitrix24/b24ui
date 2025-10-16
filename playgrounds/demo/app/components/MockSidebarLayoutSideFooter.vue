<script setup lang="ts">
import usePageMeta from './../composables/usePageMeta'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'
import OpenIn50Icon from '@bitrix24/b24icons-vue/actions/OpenIn50Icon'
import type { IMenuItem } from '~/types'
</script>

<template>
  <template
    v-for="(item, indexItem) in usePageMeta.menuList as IMenuItem[]"
    :key="indexItem"
  >
    <B24Link
      class="text-(length:--ui-font-size-sm) mb-2 flex flex-row items-center justify-between"
      :to="item.to"
      :target="item.target"
    >
      <div>{{ item.label }}</div>
      <OpenIn50Icon class="size-4" />
    </B24Link>
  </template>

  <B24Button
    block
    label="Use our Nuxt starter"
    color="air-boost"
    size="sm"
    :icon="RocketIcon"
    to="https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/#use-a-nuxt-template"
    target="_blank"
  />
</template>
