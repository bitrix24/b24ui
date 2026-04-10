<script setup lang="ts">
import TerminalIcon from '@bitrix24/b24icons-vue/file-type/TerminalIcon'

const streaming = ref(true)
const result = ref(`$ pnpm run lint

> eslint .

✔ No lint errors found.
`)

let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  timer = setTimeout(() => {
    streaming.value = false
  }, 5000)
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<template>
  <B24ChatTool
    :text="streaming ? 'Running lint checks' : 'Lint checks completed'"
    suffix="cd, pnpm run"
    :streaming="streaming"
    :icon="TerminalIcon"
    variant="card"
    chevron="leading"
    class="w-80"
  >
    <pre language="bash" v-text="result" />
  </B24ChatTool>
</template>
