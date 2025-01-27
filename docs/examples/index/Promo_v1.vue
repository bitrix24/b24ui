<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Promo_v1.vue'
</script>

<template>
  <ComponentShowExample>
    <Demo />
    <B24Link
      is-action
      to="https://github.com/bitrix24/b24ui/blob/main/docs/examples/index/demo/Promo_v1.vue"
      target="_blank"
      class="absolute bottom-5 left-5"
    >
      source
    </B24Link>
  </ComponentShowExample>
</template>
