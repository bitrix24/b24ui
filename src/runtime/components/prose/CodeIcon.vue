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
import TerminalIcon from '@bitrix24/b24icons-vue/file-type/TerminalIcon'
import YamlIcon from '@bitrix24/b24icons-vue/file-type/YamlIcon'
import BunIcon from '@bitrix24/b24icons-vue/file-type/BunIcon'
import YarnIcon from '@bitrix24/b24icons-vue/file-type/YarnIcon'
import NpmIcon from '@bitrix24/b24icons-vue/file-type/NpmIcon'
import PnpmIcon from '@bitrix24/b24icons-vue/file-type/PnpmIcon'
import FaviconIcon from '@bitrix24/b24icons-vue/file-type/FaviconIcon'
import DartlangIcon from '@bitrix24/b24icons-vue/file-type/DartlangIcon'
import JuliaIcon from '@bitrix24/b24icons-vue/file-type/JuliaIcon'
import PerlIcon from '@bitrix24/b24icons-vue/file-type/PerlIcon'
import ArduinoIcon from '@bitrix24/b24icons-vue/file-type/ArduinoIcon'
import CppheaderIcon from '@bitrix24/b24icons-vue/file-type/CppheaderIcon'
import ScalaIcon from '@bitrix24/b24icons-vue/file-type/ScalaIcon'
import ErlangIcon from '@bitrix24/b24icons-vue/file-type/ErlangIcon'
import ElixirIcon from '@bitrix24/b24icons-vue/file-type/ElixirIcon'
import BicepIcon from '@bitrix24/b24icons-vue/file-type/BicepIcon'
import GleamIcon from '@bitrix24/b24icons-vue/file-type/GleamIcon'
import GoIcon from '@bitrix24/b24icons-vue/file-type/GoIcon'
import PowershellIcon from '@bitrix24/b24icons-vue/file-type/PowershellIcon'
import LispIcon from '@bitrix24/b24icons-vue/file-type/LispIcon'
import RubyIcon from '@bitrix24/b24icons-vue/file-type/RubyIcon'
import RustIcon from '@bitrix24/b24icons-vue/file-type/RustIcon'
import KotlinIcon from '@bitrix24/b24icons-vue/file-type/KotlinIcon'
import FsharpIcon from '@bitrix24/b24icons-vue/file-type/FsharpIcon'
import HaskellIcon from '@bitrix24/b24icons-vue/file-type/HaskellIcon'
import FortranIcon from '@bitrix24/b24icons-vue/file-type/FortranIcon'
import AssemblyIcon from '@bitrix24/b24icons-vue/file-type/AssemblyIcon'
import CsharpIcon from '@bitrix24/b24icons-vue/file-type/CsharpIcon'
import PythonIcon from '@bitrix24/b24icons-vue/file-type/PythonIcon'
import MarkdownIcon from '@bitrix24/b24icons-vue/file-type/MarkdownIcon'
import JsIcon from '@bitrix24/b24icons-vue/file-type/JsIcon'
import TypescriptIcon from '@bitrix24/b24icons-vue/file-type/TypescriptIcon'
import VueIcon from '@bitrix24/b24icons-vue/file-type/VueIcon'
import TailwindIcon from '@bitrix24/b24icons-vue/file-type/TailwindIcon'
import NuxtIcon from '@bitrix24/b24icons-vue/file-type/NuxtIcon'
import VscodeIcon from '@bitrix24/b24icons-vue/file-type/VscodeIcon'
import DotenvIcon from '@bitrix24/b24icons-vue/file-type/DotenvIcon'
import GitIcon from '@bitrix24/b24icons-vue/file-type/GitIcon'
import EslintIcon from '@bitrix24/b24icons-vue/file-type/EslintIcon'
import EditorconfigIcon from '@bitrix24/b24icons-vue/file-type/EditorconfigIcon'
import TsconfigIcon from '@bitrix24/b24icons-vue/file-type/TsconfigIcon'
import NodeIcon from '@bitrix24/b24icons-vue/file-type/NodeIcon'

const props = defineProps<ProseCodeIconProps>()

const appConfig = useAppConfig() as ProseCodeIcon['AppConfig']

const icons = computed<any>(() => defu(appConfig.b24ui?.prose?.codeIcon || {}, theme))

const icon = computed(() => {
  if (props.icon) {
    return props.icon
  }

  if (props.iconName) {
    return iconFromIconName(props.iconName)
  }

  if (!props.filename) {
    return
  }

  const cleanFilename = props.filename.replace(/\s*\(.*\)\s*$/, '')

  const extension = cleanFilename.includes('.') && cleanFilename.split('.').pop()
  const name = cleanFilename.split('/').pop()
  const iconName = (name && icons.value[name.toLowerCase()]) ?? (extension && (icons.value[extension] ?? `TerminalIcon`))

  return iconFromIconName(iconName)
})

const iconFromIconName = (iconName?: string) => {
  if (!iconName) {
    return undefined
  }

  switch (iconName) {
    case 'NodeIcon': return NodeIcon
    case 'TsconfigIcon': return TsconfigIcon
    case 'EditorconfigIcon': return EditorconfigIcon
    case 'EslintIcon': return EslintIcon
    case 'GitIcon': return GitIcon
    case 'DotenvIcon': return DotenvIcon
    case 'VscodeIcon': return VscodeIcon
    case 'NuxtIcon': return NuxtIcon
    case 'TailwindIcon': return TailwindIcon
    case 'VueIcon': return VueIcon
    case 'TypescriptIcon': return TypescriptIcon
    case 'JsIcon': return JsIcon
    case 'MarkdownIcon': return MarkdownIcon
    case 'PythonIcon': return PythonIcon
    case 'CsharpIcon': return CsharpIcon
    case 'AssemblyIcon': return AssemblyIcon
    case 'FortranIcon': return FortranIcon
    case 'HaskellIcon': return HaskellIcon
    case 'FsharpIcon': return FsharpIcon
    case 'KotlinIcon': return KotlinIcon
    case 'RustIcon': return RustIcon
    case 'RubyIcon': return RubyIcon
    case 'LispIcon': return LispIcon
    case 'PowershellIcon': return PowershellIcon
    case 'GoIcon': return GoIcon
    case 'GleamIcon': return GleamIcon
    case 'BicepIcon': return BicepIcon
    case 'ElixirIcon': return ElixirIcon
    case 'ErlangIcon': return ErlangIcon
    case 'ScalaIcon': return ScalaIcon
    case 'CppheaderIcon': return CppheaderIcon
    case 'ArduinoIcon': return ArduinoIcon
    case 'PerlIcon': return PerlIcon
    case 'JuliaIcon': return JuliaIcon
    case 'DartlangIcon': return DartlangIcon
    case 'FaviconIcon': return FaviconIcon
    case 'PnpmIcon': return PnpmIcon
    case 'NpmIcon': return NpmIcon
    case 'YarnIcon': return YarnIcon
    case 'BunIcon': return BunIcon
    case 'YamlIcon': return YamlIcon
    case 'TerminalIcon': return TerminalIcon
  }

  return undefined
}
</script>

<template>
  <Component
    :is="icon"
    v-if="icon"
  />
</template>
