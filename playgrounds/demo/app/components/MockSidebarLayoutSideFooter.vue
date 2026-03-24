<script setup lang="ts">
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

const props = withDefaults(defineProps<{
  collapsed?: boolean
  framework?: 'nuxt' | 'vue'
}>(), {
  framework: 'nuxt',
  collapsed: false
})
</script>

<template>
  <B24Button
    v-if="props.framework === 'nuxt'"
    block
    :label="collapsed ? undefined : 'Use our Nuxt dashboard'"
    color="air-boost"
    size="sm"
    :icon="RocketIcon"
    to="https://github.com/bitrix24/templates-dashboard"
    target="_blank"
  />
  <B24Button
    v-else-if="props.framework === 'vue'"
    block
    :label="collapsed ? undefined : 'Use our Vue dashboard'"
    color="air-boost"
    size="sm"
    :icon="RocketIcon"
    to="https://github.com/bitrix24/templates-dashboard-vue"
    target="_blank"
  />
</template>
