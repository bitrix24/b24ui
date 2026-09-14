<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/date-time-picker'
import type { ComponentConfig } from '../types/tv'

type DateTimePicker = ComponentConfig<typeof theme, AppConfig, 'dateTimePicker'>

export interface DateTimePickerProps {
  class?: any
  b24ui?: DateTimePicker['slots']
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = defineProps<DateTimePickerProps>()
const props = useComponentProps('dateTimePicker', _props)

const appConfig = useAppConfig() as DateTimePicker['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.dateTimePicker || {}) })())
</script>

<template>
  <Primitive data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })" />
</template>
