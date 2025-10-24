<script setup lang="ts">
import { useDashboard } from '@bitrix24/b24ui-nuxt/utils/dashboard'
import { sleepAction } from '../utils/sleep'

const { contextId, isLoading, load } = useDashboard({ isLoading: ref(false), load: () => {} })
const makeToggleLoading = async (timeout: number = 1000) => {
  load?.(!isLoading?.value, contextId)
  await sleepAction(timeout)
  load?.(!isLoading?.value, contextId)
}
</script>

<template>
  <B24Button
    label="Reload current"
    color="air-primary"
    loading-auto
    @click="makeToggleLoading(1500)"
  />
</template>
