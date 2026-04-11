<script setup lang="ts">
import type { ShortcutsConfig } from '@bitrix24/b24ui-nuxt/composables'
import { ref, nextTick, useTemplateRef } from 'vue'
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
  <PlaygroundPage
    :b24ui="{
      root: 'flex-1',
      body: 'relative isolate overflow-hidden h-full p-0 sm:p-0'
    }"
  >
    <B24Card
      dd-class="base-mode"
      :b24ui="{ root: 'flex-1', body: 'relative h-full flex !px-0 !py-0' }"
    >
      <B24DashboardGroup class="flex-1 relative overflow-clip" storage="local" unit="px">
        <B24DashboardSidebar
          id="shortcuts"
          mode="slideover"
          resizable
          class="border-e-1 backdrop-blur-none min-h-full"
        >
          <template #header="{ collapsed }">
            <ProseH2 v-show="!collapsed" class="mb-0 text-[length:22px] font-semibold text-(--ui-color-base-1)">
              Settings
            </ProseH2>
          </template>
          <template #default>
            <div class="space-y-6">
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
            </div>
          </template>
          <template #footer>
            <B24Input
              v-model="inputValue"
              placeholder="Input to focus"
              name="input_to_focus"
              class="my-1"
            />
          </template>
        </B24DashboardSidebar>
        <B24DashboardPanel
          id="shortcuts-panel"
          :b24ui="{
            root: 'min-h-full',
            body: 'p-4'
          }"
        >
          <template #header>
            <B24DashboardNavbar title="Shortcuts" :b24ui="{ root: 'lg:pe-6.5', right: 'gap-1' }">
              <template #right>
                <B24Button
                  :icon="TrashBinIcon"
                  color="air-secondary-no-accent"
                  @click="logs = []"
                />
                <B24Kbd value="ctrl" size="md" accent="less" />
                <B24Kbd value="q" size="md" accent="less" />
              </template>
            </B24DashboardNavbar>
          </template>
          <template #body>
            <B24Empty
              v-if="logs.length < 1"
              size="xl"
              color="air-primary-copilot"
              :icon="KeyboardIcon"
              title="A composable to assign keyboard shortcuts in your app"
              class="size-full mt-1"
              :b24ui="{ indicator: 'p-3', title: 'text-[length:24px]/[29px]' }"
            />
            <B24Card
              v-else
              variant="tinted-alt"
              class="size-full mt-1"
              :b24ui="{
                body: 'p-0 sm:p-0'
              }"
            >
              <div ref="messagesContainer" class="overflow-clip max-h-[calc(100vh-168px)] p-4 flex flex-col gap-4 overflow-y-auto ">
                <B24Advice
                  v-for="(log, index) of logs"
                  :key="index"
                  :description="log"
                  :avatar="{ src: '/b24ui/demo/avatar/assistant.png' }"
                  :b24ui="{ description: 'w-fit grow-0' }"
                />
              </div>
            </B24Card>
          </template>
        </B24DashboardPanel>
      </B24DashboardGroup>
    </B24Card>
  </PlaygroundPage>
</template>
