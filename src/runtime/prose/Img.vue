<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/img'
import type { ComponentConfig } from '../types/utils'

type ProseImg = ComponentConfig<typeof theme, AppConfig, 'img', 'b24ui.prose'>

export interface ProseImgProps {
  class?: any
  b24ui?: ProseImg['slots']
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<ProseImgProps>()

const appConfig = useAppConfig() as ProseImg['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.img || {}) })())
</script>

<template>
  <img :class="b24ui.base({ class: [props.class, props.b24ui?.base] })">
</template>
