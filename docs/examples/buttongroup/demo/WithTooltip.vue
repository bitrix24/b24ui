<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import CopyPlatesIcon from '@bitrix24/b24icons-vue/actions/CopyPlatesIcon'
import CheckInBoxIcon from '@bitrix24/b24icons-vue/crm/CheckInBoxIcon'

const value = ref('pnpm add @bitrix24/b24ui-nuxt@next')

const { copy, copied } = useClipboard()
</script>

<template>
  <B24ButtonGroup no-split>
    <B24Input v-model="value" class="w-40" />
    <B24Tooltip
      text="Copy to clipboard"
      :content="{ side: 'top' }"
      :delay-duration="0"
    >
      <B24Button
        :color="copied ? 'air-primary-success' : 'air-primary-copilot'"
        :icon="copied ? CheckInBoxIcon : CopyPlatesIcon"
        @click="copy(value)"
      />
    </B24Tooltip>
  </B24ButtonGroup>
</template>
