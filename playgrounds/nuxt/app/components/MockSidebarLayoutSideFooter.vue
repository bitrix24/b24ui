<script setup lang="ts">
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'
import { useNavigation } from '../composables/useNavigation'

const props = withDefaults(defineProps<{
  framework?: 'nuxt' | 'vue'
}>(), {
  framework: 'nuxt'
})

const { externalLinks } = useNavigation()
</script>

<template>
  <B24PageLinks :links="externalLinks" class="mb-3" />

  <B24Button
    v-if="props.framework === 'nuxt'"
    block
    label="Use our Nuxt starter"
    color="air-boost"
    size="sm"
    :icon="RocketIcon"
    to="https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/#use-our-nuxt-starter"
    target="_blank"
  />
  <B24Button
    v-else-if="props.framework === 'vue'"
    block
    label="Use our Vue starter"
    color="air-boost"
    size="sm"
    :icon="RocketIcon"
    to="https://bitrix24.github.io/b24ui/docs/getting-started/installation/vue/#use-our-vue-starter"
    target="_blank"
  />
</template>
