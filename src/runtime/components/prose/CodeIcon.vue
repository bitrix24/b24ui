<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/code-icon'
import type { IconComponent } from '../../types'
import type { ComponentConfig } from '../../types/tv'

type ProseCodeIcon = ComponentConfig<typeof theme, AppConfig, 'codeIcon', 'b24ui.prose'>

export interface ProseCodeIconProps {
  icon?: IconComponent
  iconName?: string
  filename?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { defu } from 'defu'
import { useAppConfig } from '#imports'
// import icons from '../../dictionary/icons'

const props = defineProps<ProseCodeIconProps>()

const appConfig = useAppConfig() as ProseCodeIcon['AppConfig']

const icons = computed<any>(() => defu(appConfig.b24ui?.prose?.codeIcon || {}, theme))

// @todo fix this
const icon = computed(() => {
  if (props.icon) {
    return props.icon
  }

  if (!props.filename) {
    return
  }

  const cleanFilename = props.filename.replace(/\s*\(.*\)\s*$/, '')

  const extension = cleanFilename.includes('.') && cleanFilename.split('.').pop()
  const name = cleanFilename.split('/').pop()
  // @todo fix this
  return (name && icons.value[name.toLowerCase()]) ?? (extension && (icons.value[extension] ?? `i-vscode-icons-file-type-${extension}`))
})
</script>

<template>
  <div v-if="icon" :data-name="icon" />
</template>
