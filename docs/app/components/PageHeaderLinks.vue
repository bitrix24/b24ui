<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import { useClipboard } from '@vueuse/core'
import CopyIcon from '@bitrix24/b24icons-vue/outline/CopyIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import MarkdownIcon from '@bitrix24/b24icons-vue/file-type/MarkdownIcon'

const route = useRoute()
const toast = useToast()
const { copy, copied } = useClipboard()
const config = useRuntimeConfig()
const { track } = useAnalytics()

const mdPath = computed(() => `${withoutTrailingSlash(`${config.public.siteUrl}${config.public.baseUrl}/raw${route.path}`)}.md`)

const items = [
  {
    label: 'Copy Markdown link',
    icon: LinkIcon,
    onSelect() {
      track('Page Action', { action: 'Copy Markdown Link' })
      copy(mdPath.value)
      toast.add({
        title: 'Copied to clipboard',
        icon: CircleCheckIcon
      })
    }
  },
  {
    label: 'View as Markdown',
    icon: MarkdownIcon,
    target: '_blank',
    to: `${withoutTrailingSlash(`/raw${route.path}`)}.md`,
    onSelect() {
      track('Page Action', { action: 'View as Markdown' })
    }
  },
  {
    label: 'Open in ChatGPT',
    avatar: { src: `${config.public.baseUrl}/avatar/openai.svg` },
    target: '_blank',
    to: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read ${mdPath.value} so I can ask questions about it.`)}`,
    onSelect() {
      track('Page Action', { action: 'Open in ChatGPT' })
    }
  },
  {
    label: 'Open in Claude',
    avatar: { src: `${config.public.baseUrl}/avatar/anthropic.svg` },
    target: '_blank',
    to: `https://claude.ai/new?q=${encodeURIComponent(`Read ${mdPath.value} so I can ask questions about it.`)}`,
    onSelect() {
      track('Page Action', { action: 'Open in Claude' })
    }
  }
]

async function copyPage() {
  track('Page Action', { action: 'Copy Page' })
  await copy(await $fetch<string>(`${withoutTrailingSlash(`/raw${route.path}`)}.md`))
}
</script>

<template>
  <B24FieldGroup no-split size="sm">
    <B24Button
      color="air-secondary-accent"
      label="Copy page"
      :icon="copied ? CircleCheckIcon : CopyIcon"
      :b24ui="{
        leadingIcon: [copied ? 'text-(--ui-color-accent-main-success)' : 'text-(--ui-btn-color)']
      }"
      @click="copyPage"
    />
    <B24DropdownMenu
      :items="items"
      :content="{ side: 'bottom', align: 'end', sideOffset: 4 }"
      :b24ui="{
        content: 'w-[192px]',
        itemLeadingIcon: ['mr-[5px]'],
        itemLeadingAvatar: ['mr-[5px]']
      }"
    >
      <B24Button color="air-secondary-accent" use-dropdown />
    </B24DropdownMenu>
  </B24FieldGroup>
</template>
