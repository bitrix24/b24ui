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
      class="text-sm mb-2 flex flex-row items-center justify-between"
      :to="item.to"
      :target="item.target"
    >
      <div>{{ item.label }}</div>
      <OpenIn50Icon class="size-4" />
    </B24Link>
  </template>

  <B24Button
    block
    label="Use our Vue starter"
    color="air-boost"
    size="sm"
    loading-auto
    :icon="RocketIcon"
    to="https://bitrix24.github.io/b24ui/guide/installation-vue.html#use-our-vue-starter"
    target="_blank"
  />
</template>
