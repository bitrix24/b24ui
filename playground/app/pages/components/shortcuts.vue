<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import B24SidebarLayout from '@bitrix24/b24ui-nuxt/components/SidebarLayout.vue'
import TrashBinIcon from '@bitrix24/b24icons-vue/main/TrashBinIcon'
import CheckIcon from '@bitrix24/b24icons-vue/main/CheckIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

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
      handler: () => { logs.value.unshift(`"${label}" triggered`) },
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
  <B24SidebarLayout
    :use-light-content="false"
    is-inner
    class="light --ui-context-content-light"
    :b24ui="{
      contentWrapper: 'bg-[url(/bg/edge-light.svg)] bg-top-left bg-repeat bg-[#76c68b] dark:bg-[#689775] ',
      container: 'bg-gradient-to-br from-0% via-50% to-80% from-[#72c887]/80 via-[#7ad5a5]/80 to-[#72c887]/80 _dark:from-[#509160]/90 _dark:via-[#246f3e]/85 _dark:to-[#509160]/90',
      containerWrapper: ''
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
      <div class="h-full w-full p-[10px] flex-1 flex flex-col items-start justify-start overflow-y-auto">
        <p v-if="logs.length < 1" class="select-none text-(--ui-color-design-filled-boost-bg-gradient-1)">
          It's worth playing with the settings and pressing a couple of Shortcuts
        </p>
        <p v-for="(log, index) of logs" :key="index">
          {{ log }}
        </p>
      </div>
    </template>
  </B24SidebarLayout>
</template>
