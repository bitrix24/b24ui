<script setup lang="ts">
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

async function onClick() {
  return new Promise<void>(res => setTimeout(res, 1000))
}
</script>

<template>
  <B24Button
    label="Button"
    loading-auto
    @click="onClick"
  />
  <B24Button
    label="Button"
    :icon="RocketIcon"
    use-clock
    loading-auto
    @click="onClick"
  />
  <B24Button
    label="Button"
    :avatar="{ src: '/b24ui/avatar/employee.png' }"
    use-wait
    loading-auto
    @click="onClick"
  />
</template>
