<script lang="ts">
import type { AvatarProps } from '@bitrix24/b24ui-nuxt'

export interface ColorModeAvatarProps extends /** @vue-ignore */ Omit<AvatarProps, 'src'> {
  light: string
  dark: string
}
</script>

<script setup lang="ts">
import B24Avatar from '../Avatar.vue'

defineOptions({ inheritAttrs: false })

defineProps<ColorModeAvatarProps>()
</script>

<template>
  <B24Avatar :src="light" class="dark:hidden" v-bind="$attrs" />
  <B24Avatar :src="dark" class="hidden dark:block" v-bind="$attrs" />
</template>
