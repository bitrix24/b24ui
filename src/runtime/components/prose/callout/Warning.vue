<script setup lang="ts">
import icons from '../../../dictionary/icons'
import Callout from '../Callout.vue'
</script>

<template>
  <Callout color="air-primary-warning" :icon="icons.warning">
    <slot mdc-unwrap="p" />
  </Callout>
</template>
