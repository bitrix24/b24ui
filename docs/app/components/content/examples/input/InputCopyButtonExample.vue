<script setup lang="ts">
import CopyIcon from '@bitrix24/b24icons-vue/outline/CopyIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'

import { useClipboard } from '@vueuse/core'

const value = ref('npx nuxt module add @bitrix24/b24ui-nuxt')

const { copy, copied } = useClipboard()
</script>

<template>
  <B24Input
    v-model="value"
    :b24ui="{ trailing: 'pr-0.5' }"
  >
    <template v-if="value?.length" #trailing>
      <B24Tooltip text="Copy to clipboard" :content="{ side: 'right' }">
        <B24Button
          :b24ui="{
            leadingIcon: [copied ? 'text-success' : 'text-(--ui-btn-color)']
          }"
          size="sm"
          color="air-tertiary-no-accent"
          :icon="copied ? CircleCheckIcon : CopyIcon"
          aria-label="Copy to clipboard"
          @click="copy(value)"
        />
      </B24Tooltip>
    </template>
  </B24Input>
</template>
