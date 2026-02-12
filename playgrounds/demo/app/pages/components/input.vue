<script setup lang="ts">
import theme from '#build/b24ui/input'
import CalculatorIcon from '@bitrix24/b24icons-vue/main/CalculatorIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
import ALetterIcon from '@bitrix24/b24icons-vue/main/ALetterIcon'
import CrossedEye2Icon from '@bitrix24/b24icons-vue/main/CrossedEye2Icon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import CalendarIcon from '@bitrix24/b24icons-vue/outline/CalendarIcon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/outline/MicrophoneOnIcon'
import StopLIcon from '@bitrix24/b24icons-vue/outline/StopLIcon'

const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  disabled: false,
  loading: false,
  highlight: false,
  rounded: false
})

const value = ref('Model value')

// region SpeechRecognition ////
const input = ref('')

const appLocale = useLocale()
const toast = useToast()

const {
  isAvailable: speechIsAvailable,
  isListening: speechIsListening,
  start: startSpeech,
  stop: stopSpeech,
  setLanguage: setLanguageSpeech
} = useSpeechRecognition({
  lang: appLocale.locale.value.locale,
  continuous: true,
  interimResults: true
}, {
  onStart: () => {
    if (input.value === '') {
      return
    }

    input.value += ' '
  },
  onResult: (result) => {
    input.value += result.text
  }
})

const startDictation = async () => {
  await startSpeech()
}

const stopDictation = async () => {
  await stopSpeech()
}

defineShortcuts({
  'r-r': () => {
    toast.add({
      title: 'Speech',
      description: 'Use ru-RU for speech',
      duration: 1000,
      progress: false
    })
    setLanguageSpeech('ru-RU')
  },
  'e-e': () => {
    toast.add({
      title: 'Speech',
      description: 'Use en-US for speech',
      duration: 1000,
      progress: false
    })
    setLanguageSpeech('en-US')
  }
})
// endregion ////
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />

      <B24Switch v-model="singleAttrs.disabled" label="Disabled" />
      <B24Switch v-model="singleAttrs.loading" label="Loading" />
      <B24Switch v-model="singleAttrs.highlight" label="Highlight" />
      <B24Switch v-model="singleAttrs.rounded" label="Rounded" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-80' }">
      <B24Input v-model="value" autofocus v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Input :default-value="'Default value'" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Input
        placeholder="Highlight with error"
        v-bind="{ ...singleAttrs, ...props }"
        highlight
        color="air-primary-alert"
        aria-invalid="true"
        class="w-full"
      />
      <B24Input placeholder="Required" required v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Input placeholder="No Padding" no-padding v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Input placeholder="No Border" no-border v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Input placeholder="Underline" underline v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Input placeholder="Search..." :icon="ALetterIcon" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Input placeholder="Search..." :trailing-icon="Search2Icon" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Input :avatar="{ src: '/b24ui/demo/avatar/employee.png' }" placeholder="Search..." v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Input placeholder="Trailing loading..." trailing v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Input
        placeholder="Loading..."
        :icon="RocketIcon"
        :trailing-icon="TaskIcon"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24Input :icon="CalculatorIcon" type="number" :model-value="10" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Input :icon="CalendarIcon" type="date" :model-value="new Date().toISOString().substring(0, 10)" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Input :icon="CrossedEye2Icon" type="password" model-value="password" v-bind="{ ...singleAttrs, ...props }" class="w-full" />

      <div class="w-full relative flex items-center gap-2 bg-(--ui-color-bg-content-secondary) rounded-xs ring-1 ring-ai-250 hover:ring-ai-350">
        <B24Input
          v-model="input"
          placeholder="Try use speech recognition..."
          no-border
          class="flex-1 resize-none px-2.5"
          v-bind="{ ...singleAttrs, ...props }"
        />
        <template v-if="speechIsAvailable">
          <B24Button
            v-if="!speechIsListening"
            :icon="MicrophoneOnIcon"
            color="air-tertiary-no-accent"
            size="sm"
            class="shrink-0"
            @click="startDictation"
          />
          <B24Button
            v-if="speechIsListening"
            :icon="StopLIcon"
            color="air-secondary"
            size="sm"
            class="shrink-0 rounded-lg"
            @click="stopDictation"
          />
        </template>
      </div>
      <div class="flex flex-col justify-between items-start gap-4 mt-2 px-1 text-xs text-dimmed">
        <div class="flex items-center gap-1">
          <span>Use en-US for speech</span>
          <B24Kbd value="e" accent="less" size="sm" />
          <B24Kbd value="e" accent="less" size="sm" />
        </div>
        <div class="flex items-center gap-1">
          <span>Use ru-RU for speech</span>
          <B24Kbd value="r" accent="less" size="sm" />
          <B24Kbd value="r" accent="less" size="sm" />
        </div>
      </div>
    </Matrix>
  </PlaygroundPage>
</template>
