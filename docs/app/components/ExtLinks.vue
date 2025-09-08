<script setup lang="ts">
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'
import OpenIn50Icon from '@bitrix24/b24icons-vue/actions/OpenIn50Icon'

const { framework } = useSharedData()

const menuList = [
  {
    label: 'b24style',
    to: 'https://bitrix24.github.io/b24style/',
    target: '_blank'
  },
  {
    label: 'b24icons',
    to: 'https://bitrix24.github.io/b24icons/',
    target: '_blank'
  },
  {
    label: 'b24jssdk',
    to: 'https://bitrix24.github.io/b24jssdk/',
    target: '_blank'
  }
]
</script>

<template>
  <template
    v-for="(item, indexItem) in menuList"
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
    v-if="framework === 'nuxt'"
    block
    label="Use our Nuxt starter"
    color="air-boost"
    size="sm"
    :icon="RocketIcon"
    to="https://bitrix24.github.io/b24ui/guide/installation-nuxt-app.html#use-our-nuxt-starter"
    target="_blank"
  />

  <B24Button
    v-if="framework === 'vue'"
    block
    label="Use our Vue starter"
    color="air-boost"
    size="sm"
    :icon="RocketIcon"
    to="https://bitrix24.github.io/b24ui/guide/installation-vue.html#use-our-vue-starter"
    target="_blank"
  />
</template>
