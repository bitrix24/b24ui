<script lang="ts">
export interface IconProps {
  name: string
  mode?: 'svg' | 'css'
  size?: string | number
  customize?: (
    content: string,
    name?: string,
    prefix?: string,
    provider?: string
  ) => string
}
</script>

<script setup lang="ts">
import { B24Icon } from '@bitrix24/b24icons-vue'
import { useForwardProps } from 'radix-vue'
import { reactivePick } from '@vueuse/core'

const props = defineProps<IconProps>()

const iconProps = useForwardProps(reactivePick(props, 'name', 'mode', 'size', 'customize'))
</script>

<template>
  <B24Icon v-bind="iconProps" />
</template>
