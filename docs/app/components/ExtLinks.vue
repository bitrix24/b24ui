<script setup lang="ts">
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const { framework } = useFrameworks()

const menuList = [
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
  <B24PageLinks :links="menuList" class="mb-[12px]" />

  <B24Button
    v-if="framework === 'nuxt'"
    block
    label="Use our Nuxt starter"
    color="air-boost"
    size="sm"
    :icon="RocketIcon"
    to="/docs/getting-started/installation/nuxt/#use-our-nuxt-starter"
  />

  <B24Button
    v-if="framework === 'vue'"
    block
    label="Use our Vue starter"
    color="air-boost"
    size="sm"
    :icon="RocketIcon"
    to="/docs/getting-started/installation/vue/#use-our-vue-starter"
  />
</template>
