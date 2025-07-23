<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
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
  <div class="flex flex-row rounded-t-[18px] h-full overflow-hidden">
    <div class="w-[400px] p-[10px] bg-(--ui-color-base-white-fixed) ">
      <div class="space-y-6">
        <div>
          <div class="mb-2 mt-4">
            <div class="flex flex-row flex-nowrap items-center gap-2">
              <div>
                shortcut:
              </div>
              <B24Kbd :value="shortcutsState.a.label" />
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <B24Switch v-model="shortcutsState.a.disabled" :label="`Disable`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
            <B24Switch v-model="shortcutsState.a.usingInput" :label="`Using in inputs`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
          </div>
        </div>
        <div>
          <div class="mb-2 mt-4">
            <div class="flex flex-row flex-nowrap items-center gap-2">
              <div>
                shortcut:
              </div>
              <B24Kbd :value="shortcutsState.shift_i.label" />
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <B24Switch v-model="shortcutsState.shift_i.disabled" :label="`Disable`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
            <B24Switch v-model="shortcutsState.shift_i.usingInput" :label="`Using in inputs`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
          </div>
        </div>
        <div>
          <div class="mb-2 mt-4">
            <div class="flex flex-row flex-nowrap items-center gap-2">
              <div>
                shortcut:
              </div>
              <B24Kbd :value="shortcutsState['g-i'].label" />
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <B24Switch v-model="shortcutsState['g-i'].disabled" :label="`Disable`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
            <B24Switch v-model="shortcutsState['g-i'].usingInput" :label="`Using in inputs`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
          </div>
        </div>

        <B24Separator label="Input to focus" />
        <B24Input v-model="inputValue" placeholder="Input to focus" />
      </div>
    </div>
    <div class=" w-full p-[10px] bg-(--ui-color-g-glass-collab-bg-1) flex-1 flex flex-col items-start justify-start ">
      <div class="w-full flex items-center justify-between gap-4">
        <ProseH4 class="mb-0">[logs]</ProseH4>
        <div class="flex flex-row flex-nowrap items-center justify-between gap-[2px]">
          <B24Button
            :icon="TrashBinIcon"
            size="sm"
            color="air-tertiary"
            @click="logs = []"
          />
          <B24Kbd value="ctrl" size="sm" />
          <B24Kbd value="q" size="sm" />
        </div>
      </div>
      <div class="w-full mt-2 p-4 h-[400px] overflow-y-auto bg-(--ui-color-base-black-fixed)/70 text-(--ui-color-design-filled-market-bg-gradient-1) rounded-md">
        <p v-if="logs.length < 1" class="select-none text-(--ui-color-design-filled-boost-bg-gradient-1)">
          It's worth playing with the settings and pressing a couple of Shortcuts
        </p>
        <p v-for="(log, index) of logs" :key="index">
          {{ log }}
        </p>
      </div>
    </div>
  </div>
</template>
