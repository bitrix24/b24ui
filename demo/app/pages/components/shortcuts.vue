<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
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
  <ExampleGrid>
    <ExampleCard title="Settings">
      <div class="space-y-6">
        <div>
          <ExampleCardSubTitle class="mb-2 mt-4">
            <div class="flex flex-row flex-nowrap items-center gap-2">
              <div>
                shortcut:
              </div>
              <B24Kbd :value="shortcutsState.a.label" />
            </div>
          </ExampleCardSubTitle>
          <div class="flex flex-col gap-4">
            <B24Switch v-model="shortcutsState.a.disabled" :label="`Disable`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
            <B24Switch v-model="shortcutsState.a.usingInput" :label="`Using in inputs`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
          </div>
        </div>
        <div>
          <ExampleCardSubTitle class="mb-2 mt-4">
            <div class="flex flex-row flex-nowrap items-center gap-2">
              <div>
                shortcut:
              </div>
              <B24Kbd :value="shortcutsState.shift_i.label" />
            </div>
          </ExampleCardSubTitle>
          <div class="flex flex-col gap-4">
            <B24Switch v-model="shortcutsState.shift_i.disabled" :label="`Disable`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
            <B24Switch v-model="shortcutsState.shift_i.usingInput" :label="`Using in inputs`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
          </div>
        </div>
        <div>
          <ExampleCardSubTitle class="mb-2 mt-4">
            <div class="flex flex-row flex-nowrap items-center gap-2">
              <div>
                shortcut:
              </div>
              <B24Kbd :value="shortcutsState['g-i'].label" />
            </div>
          </ExampleCardSubTitle>
          <div class="flex flex-col gap-4">
            <B24Switch v-model="shortcutsState['g-i'].disabled" :label="`Disable`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
            <B24Switch v-model="shortcutsState['g-i'].usingInput" :label="`Using in inputs`" :unchecked-icon="Cross30Icon" :checked-icon="CheckIcon" />
          </div>
        </div>

        <ExampleCardSubTitle title="Input to focus" />
        <B24Input v-model="inputValue" placeholder="Input to focus" />
      </div>
    </ExampleCard>

    <ExampleCard class="md:col-span-2 lg:col-span-4">
      <template #title>
        <div class="flex items-center justify-between gap-4">
          <div>[Logs]</div>
          <div class="flex flex-row flex-nowrap items-center justify-between gap-1.5">
            <B24Button
              :icon="TrashBinIcon"
              size="sm"
              color="link"
              depth="light"
              @click="logs = []"
            />
            <B24Kbd value="ctrl" size="sm" />
            <B24Kbd value="q" size="sm" />
          </div>
        </div>
      </template>
      <div class="mt-2 p-4 h-[400px] overflow-y-auto text-md font-b24-helvetica bg-base-dark text-green-550 rounded-md">
        <p v-if="logs.length < 1" class="select-none text-orange-900">
          It's worth playing with the settings and pressing a couple of Shortcuts
        </p>
        <p v-for="(log, index) of logs" :key="index">
          {{ log }}
        </p>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
