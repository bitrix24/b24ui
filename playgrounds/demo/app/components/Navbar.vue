<script setup lang="ts">
import type { CardProps } from '@bitrix24/b24ui-nuxt'

defineProps<{
  to?: string
  b24ui?: CardProps['b24ui']
}>()

const slots = defineSlots<{
  controls?: () => any
  trailing?: () => any
}>()
</script>

<template>
  <B24Card
    :b24ui="{
      root: ['backdrop-blur-xl border-0 rounded-none lg:rounded-(--ui-border-radius-md)', b24ui?.root],
      header: ['flex items-center justify-between flex-wrap gap-2', b24ui?.header],
      body: ['w-full flex items-center gap-3 py-3', b24ui?.body]
    }"
  >
    <template #header>
      <NavbarHeader :to="to" />
      <div v-if="slots.trailing" class="flex flex-wrap flex-row items-center justify-end gap-3">
        <slot name="trailing" />
      </div>
    </template>
    <template v-if="slots.controls" #default>
      <slot name="controls" />
    </template>
  </B24Card>
</template>
