<script setup lang="ts">
import { LazyUseOverlayModalExample } from '#components'

const overlay = useOverlay()

const modal = overlay.create(LazyUseOverlayModalExample)
</script>

<template>
  <B24Button label="Open modal" @click="modal.open()" />
</template>
