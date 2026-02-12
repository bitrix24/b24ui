<script setup lang="ts">
import type { ShortcutsConfig } from '@bitrix24/b24ui-nuxt/composables/defineShortcuts'
import { ref, nextTick, useTemplateRef } from 'vue'
import B24SidebarLayout from '@bitrix24/b24ui-nuxt/components/SidebarLayout.vue'
import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon'
import CheckIcon from '@bitrix24/b24icons-vue/main/CheckIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'
import KeyboardIcon from '@bitrix24/b24icons-vue/actions/KeyboardIcon'

const logs = ref<string[]>([])
const inputValue = ref<string>('')
const messagesContainer = useTemplateRef<HTMLElement>('messagesContainer')

const shortcutsState = ref({
  'a': {
    label: 'A',
    disabled: false,
    usingInput: false
  },
  'shift_i': {
    label: 'Shift+I',
    disabled: false,
    usingInput: false
  },
  'g-i': {
    label: 'G->I',
    disabled: false,
    usingInput: false
  }
})

const shortcuts = computed(() => {
  return Object.entries(shortcutsState.value).reduce<ShortcutsConfig>((acc, [key, { label, disabled, usingInput }]) => {
    if (disabled) {
      return acc
    }
    acc[key] = {
      handler: () => {
        logs.value.push(`"${label}" triggered at ${new Date().toLocaleTimeString()} ${usingInput ? 'using input' : ''}`)
        nextTick(() => {
          scrollToBottom()
        })
      },
      usingInput
    }
    return acc
  }, {})
})
defineShortcuts(shortcuts)

defineShortcuts({
  ctrl_q: {
    usingInput: true,
    handler: () => {
      logs.value = []
      inputValue.value = ''
    }
  }
})
function scrollToBottom() {
  const container = messagesContainer.value
  if (!container) return

  container.scrollTo({
    top: container.scrollHeight,
    behavior: 'smooth'
  })
}
</script>

<template>
  <PlaygroundPage :b24ui="{ body: 'relative size-full rounded-lg overflow-hidden p-0 sm:p-0' }">
    <B24SidebarLayout
      is-inner
      :b24ui="{
        pageWrapper: 'size-full p-0 lg:p-0',
        containerWrapper: 'p-0'
      }"
    >
      <template #sidebar>
        <B24SidebarHeader>
          <div class="text-[#f8f7f7] h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
            <ProseH6 class="font-(--ui-font-weight-medium) mb-0">
              Settings
            </ProseH6>
          </div>
        </B24SidebarHeader>
        <B24SidebarBody>
          <div class="space-y-6 px-[25px]">
            <div>
              <B24Separator class="mb-2" :b24ui="{ container: 'items-center gap-[5px]' }">
                <ProseP class="mb-0" small accent="less-more">
                  shortcut:
                </ProseP>
                <B24Kbd :value="shortcutsState.a.label" />
              </B24Separator>
              <div class="flex flex-col gap-4">
                <B24Switch v-model="shortcutsState.a.disabled" :label="`Disable`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
                <B24Switch v-model="shortcutsState.a.usingInput" :label="`Using in inputs`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
              </div>
            </div>
            <div>
              <B24Separator class="mb-2" :b24ui="{ container: 'items-center gap-[5px]' }">
                <ProseP class="mb-0" small accent="less-more">
                  shortcut:
                </ProseP>
                <B24Kbd :value="shortcutsState.shift_i.label" />
              </B24Separator>
              <div class="flex flex-col gap-4">
                <B24Switch v-model="shortcutsState.shift_i.disabled" :label="`Disable`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
                <B24Switch v-model="shortcutsState.shift_i.usingInput" :label="`Using in inputs`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
              </div>
            </div>
            <div>
              <B24Separator class="mb-2" :b24ui="{ container: 'items-center gap-[5px]' }">
                <ProseP class="mb-0" small accent="less-more">
                  shortcut:
                </ProseP>
                <B24Kbd :value="shortcutsState['g-i'].label" />
              </B24Separator>
              <div class="flex flex-col gap-4">
                <B24Switch v-model="shortcutsState['g-i'].disabled" :label="`Disable`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
                <B24Switch v-model="shortcutsState['g-i'].usingInput" :label="`Using in inputs`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
              </div>
            </div>
            <div>
              <B24Separator class="mb-2" label="Input to focus" />
              <B24Input v-model="inputValue" placeholder="Input to focus" name="input_to_focus" />
            </div>
          </div>
        </B24SidebarBody>
      </template>
      <template #navbar>
        <ProseH4 class="font-(--ui-font-weight-medium) mb-0">
          Shortcuts
        </ProseH4>
        <B24NavbarSpacer />
        <B24NavbarSection>
          <div class="flex flex-row flex-nowrap items-center justify-between gap-[5px]">
            <B24Button
              :icon="TrashBinIcon"
              color="air-secondary-no-accent"
              @click="logs = []"
            />
            <B24Kbd value="ctrl" size="md" accent="less" />
            <B24Kbd value="q" size="md" accent="less" />
          </div>
        </B24NavbarSection>
      </template>
      <div
        v-if="logs.length < 1"
        class="size-full text-(--ui-color-design-filled-market-content) px-15 py-5xl rounded-3xl bg-[#525c69]/20 flex flex-col items-center justify-center gap-lg"
      >
        <B24Avatar
          :icon="KeyboardIcon"
          alt="defineShortcuts"
          size="3xl"
          :b24ui="{
            root: 'bg-transparent ring-2 ring-(--ui-color-design-filled-market-content)/50',
            icon: 'size-[74px] text-(--ui-color-design-filled-market-content)'
          }"
        />
        <ProseH2 class="text-center text-(--ui-color-design-filled-market-content) leading-[29px] mb-0">
          A composable to assign keyboard shortcuts in your app
        </ProseH2>
      </div>
      <div
        v-else
        ref="messagesContainer"
        class="w-full max-h-[calc(100vh-var(--topbar-height)-200px)] flex flex-col gap-4 overflow-y-auto p-4"
      >
        <B24Advice
          v-for="(log, index) of logs"
          :key="index"
          :description="log"
          :avatar="{ src: '/avatar/assistant.png' }"
          :b24ui="{ description: 'w-fit grow-0' }"
        />
      </div>
    </B24SidebarLayout>
  </PlaygroundPage>
</template>
