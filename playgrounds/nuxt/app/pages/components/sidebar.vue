<script setup lang="ts">
import type { UIMessage } from 'ai'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import { Chat } from '@ai-sdk/vue'
import theme from '#build/b24ui/sidebar'
import HomeIcon from '@bitrix24/b24icons-vue/outline/HomeIcon'
import MessagesIcon from '@bitrix24/b24icons-vue/outline/MessagesIcon'
import ColumnsSidebarPendingIcon from '@bitrix24/b24icons-vue/outline/ColumnsSidebarPendingIcon'

const variants = Object.keys(theme.variants.variant)

const input = ref('')
const openLeft = ref(false)
const openRight = ref(true)

const variant = ref('sidebar' as keyof typeof theme.variants.variant)

const messages: UIMessage[] = [{
  id: '1',
  role: 'user',
  parts: [{ type: 'text', text: 'What is Bitrix24 UI?' }]
}, {
  id: '2',
  role: 'assistant',
  parts: [{ type: 'text', text: 'Bitrix24 UI is a Vue component library built on Reka UI, Tailwind CSS, and Tailwind Variants. It provides 125+ accessible components for building modern web apps.' }]
}]

const chat = new Chat({
  messages,
  onError(error) {
    console.error(error)
  }
})

function onSubmit() {
  if (!input.value.trim()) return

  chat.sendMessage({ text: input.value })

  input.value = ''
}
</script>

<template>
  <div class="flex flex-1" :class="[variant === 'inset' && 'bg-(--ui-color-gray-02) dark:bg-(--ui-color-base-8) edge-dark:bg-transparent']">
    <B24Sidebar
      v-model:open="openLeft"
      side="left"
      :variant="variant"
      collapsible="icon"
      close
      rail
      :b24ui="{
        container: 'relative',
        inner: variant === 'floating' && 'bg-default',
        body: 'py-2'
      }"
    >
      <template #title="{ state }">
        <Logo class="h-5 w-auto" :collapsed="state === 'collapsed'" />
      </template>

      <B24NavigationMenu
        :items="[{ label: 'Home', icon: HomeIcon, to: '/', badge: 4 }, { label: 'Chat', icon: MessagesIcon, to: '/chat' }] as NavigationMenuItem[]"
        orientation="vertical"
        :b24ui="{ link: 'p-1.5 overflow-hidden' }"
      />
    </B24Sidebar>

    <div class="bg-default light:peer-data-[variant=floating]:bg-(--ui-color-gray-05) flex-1 flex flex-col overflow-hidden lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:mx-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default">
      <Navbar class="relative w-full">
        <B24Select v-model="variant" size="sm" :items="variants" />

        <B24Button
          :icon="ColumnsSidebarPendingIcon"
          color="air-secondary-no-accent"
          size="sm"
          aria-label="Toggle left sidebar"
          :b24ui="{ baseLine: 'rotate-180' }"
          @click="openLeft = !openLeft"
        />
        <B24Button
          :icon="ColumnsSidebarPendingIcon"
          color="air-secondary-no-accent"
          size="sm"
          aria-label="Toggle right sidebar"
          @click="openRight = !openRight"
        />
      </Navbar>

      <div class="flex-1 p-4">
        <Placeholder class="size-full" />
      </div>
    </div>

    <B24Sidebar
      v-model:open="openRight"
      side="right"
      :variant="variant"
      title="AI Chat"
      close
      rail
      :b24ui="{
        inner: variant === 'floating' && 'bg-default'
      }"
      :style="{ '--sidebar-width': '20rem' }"
    >
      <B24ChatMessages
        :messages="chat.messages"
        :status="chat.status"
        compact
        class="px-0"
      />

      <template #footer>
        <B24ChatPrompt
          v-model="input"
          :error="chat.error"
          variant="outline"
          :b24ui="{ base: 'px-0' }"
          @submit="onSubmit"
        >
          <B24ChatPromptSubmit size="sm" :status="chat.status" @stop="chat.stop()" @reload="chat.regenerate()" />
        </B24ChatPrompt>
      </template>
    </B24Sidebar>
  </div>
</template>
