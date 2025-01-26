<script setup lang="ts">
import { ref } from 'vue'
import CopyPlatesIcon from '@bitrix24/b24icons-vue/actions/CopyPlatesIcon'
import CheckInBoxIcon from '@bitrix24/b24icons-vue/crm/CheckInBoxIcon'

const value = ref('pnpm add @bitrix24/b24ui-nuxt@next')
const copied = ref(false)

function copy() {
  navigator.clipboard.writeText(value.value)
  copied.value = true

  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <B24ButtonGroup
    no-split
  >
    <B24Input v-model="value" />
    <B24Tooltip
      text="Copy to clipboard"
      :content="{ side: 'left' }"
      :delay-duration="0"
    >
      <B24Button
        :color="copied ? 'success' : 'link'"
        :icon="copied ? CheckInBoxIcon : CopyPlatesIcon"
        depth="dark"
        @click="copy"
      />
    </B24Tooltip>
  </B24ButtonGroup>
</template>
