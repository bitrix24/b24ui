<script setup lang="ts">
import Cross50Icon from '@bitrix24/b24icons-vue/actions/Cross50Icon'

const open = ref(false)
</script>

<template>
  <B24Drawer v-model:open="open" :dismissible="false" :modal="false" :handle="false">
    <B24Button label="Open" use-dropdown :b24ui="{ trailingIcon: 'rotate-180' }" />

    <template #body>
      <div class="flex items-center justify-between gap-4 mb-4">
        <ProseH2 class="mb-0">
          Drawer non-dismissible
        </ProseH2>

        <B24Button color="air-tertiary" :icon="Cross50Icon" @click="open = false" />
      </div>

      <Placeholder class="size-full min-h-48" />
    </template>
  </B24Drawer>
</template>
