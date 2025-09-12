<script setup lang="ts">
import icons from '../../../dictionary/icons'
import Callout from '../Callout.vue'
</script>

<template>
  <Callout color="air-secondary-alert" :icon="icons.caution">
    <slot mdc-unwrap="p" />
  </Callout>
</template>
