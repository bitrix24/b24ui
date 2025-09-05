<script setup lang="ts">
import { selectItems, selectItem } from './../../select/dictionary'

function onClick() {
  return new Promise<void>(res => setTimeout(res, 3000))
}
</script>

<template>
  <B24FieldGroup>
    <B24Input class="w-40" name="search" placeholder="Search..." aria-label="Search" />
    <B24Button
      label="Button"
      loading-auto
      use-clock
      @click="onClick"
    />
  </B24FieldGroup>
  <B24FieldGroup no-split>
    <B24Select v-model="selectItem" :items="selectItems" class="w-40" />
    <B24Button
      label="Button"
      color="air-primary"
      loading-auto
      use-clock
      @click="onClick"
    />
  </B24FieldGroup>
</template>
