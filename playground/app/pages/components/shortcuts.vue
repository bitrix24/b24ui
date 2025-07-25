<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import B24SidebarLayout from '@bitrix24/b24ui-nuxt/components/SidebarLayout.vue'
import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon'
import CheckIcon from '@bitrix24/b24icons-vue/main/CheckIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'
import KeyboardIcon from '@bitrix24/b24icons-vue/actions/KeyboardIcon'

usePageMeta.setPageTitle('Shortcuts')

const logs = ref<string[]>([])
const inputValue = ref<string>('')

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
      handler: () => { logs.value.push(`"${label}" triggered`) },
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
</script>

<template>
  <div class="relative h-full rounded-t-[12px] overflow-hidden">
    <div class="absolute size-full rounded-t-[12px]">
      <B24SidebarLayout
        :use-light-content="false"
        is-inner
        off-content-scrollbar
        class="light --ui-context-content-light"
        :b24ui="{
          contentWrapper: 'bg-[url(/bg/chat-v2-background/pattern-white.svg)] bg-top-left bg-repeat bg-[#76c68b] dark:bg-[#689775] ',
          container: [
            'bg-[url(/bg/chat-v2-background/collab-v2.png)] bg-cover bg-center bg-fixed bg-no-repeat',
            'p-0 px-0 ps-0 pe-0 lg:p-0 lg:px-0 lg:ps-0 lg:pe-0 '
          ].join(' '),
          containerWrapper: 'h-full relative',
          containerWrapperInner: (
            logs.length < 1
              ? 'flex flex-col items-center justify-center'
              : 'absolute inset-0 py-[6px] px-[15px] scrollbar-thin scrollbar-transparent overflow-y-scroll'
          )
        }"
      >
        <template #sidebar>
          <B24SidebarHeader>
            <div class="h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
              <ProseH4 class="font-medium mb-0">
                Shortcuts
              </ProseH4>
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
          <ProseH6 class="font-medium mb-0">
            Logs
          </ProseH6>
          <B24NavbarSpacer />
          <B24NavbarSection>
            <div class="flex flex-row flex-nowrap items-center justify-between gap-[5px]">
              <B24Button
                :icon="TrashBinIcon"
                color="air-secondary-no-accent"
                size="xs"
                @click="logs = []"
              />
              <B24Kbd value="ctrl" size="md" accent="less" />
              <B24Kbd value="q" size="md" accent="less" />
            </div>
          </B24NavbarSection>
        </template>
        <template #default>
          <div
            v-if="logs.length < 1"
            class="text-(--ui-color-design-filled-market-content) max-w-[550px] px-[60px] py-[40px] rounded-[24px] bg-[#525c69]/20 flex flex-col items-center justify-center gap-[20px]"
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
            class="w-full min-h-full flex flex-col items-start justify-end gap-[6px]"
          >
            <B24Advice
              v-for="(log, index) of logs"
              :key="index"
              class="w-full"
              :description="log"
              :b24ui="{ descriptionWrapper: 'w-full' }"
              :avatar="{ src: '/avatar/assistant.png' }"
            />
          </div>
        </template>
      </B24SidebarLayout>
    </div>
  </div>
</template>
