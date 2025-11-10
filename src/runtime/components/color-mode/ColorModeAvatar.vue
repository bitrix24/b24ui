<script lang="ts">
import type { AvatarProps } from '../../types'

export interface ColorModeAvatarProps extends Omit<AvatarProps, 'src'> {
  light: string
  dark: string
}
</script>

<script setup lang="ts">
import { useForwardProps } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import B24Avatar from '../Avatar.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<ColorModeAvatarProps>()

const avatarProps = useForwardProps(reactiveOmit(props, 'light', 'dark'))
</script>

<template>
  <B24Avatar v-bind="{ ...avatarProps, ...$attrs }" :src="light" class="dark:hidden" />
  <B24Avatar v-bind="{ ...avatarProps, ...$attrs }" :src="dark" class="hidden dark:block" />
</template>
