<script setup lang="ts">
import theme from '#build/b24ui/input'
import usePageMeta from './../../composables/usePageMeta'
import CalculatorIcon from '@bitrix24/b24icons-vue/main/CalculatorIcon'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
import ALetterIcon from '@bitrix24/b24icons-vue/main/ALetterIcon'
import CrossedEye2Icon from '@bitrix24/b24icons-vue/main/CrossedEye2Icon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import CalendarIcon from '@bitrix24/b24icons-vue/outline/CalendarIcon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/outline/MicrophoneOnIcon'
import StopLIcon from '@bitrix24/b24icons-vue/outline/StopLIcon'

usePageMeta.setPageTitle('Input')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const isUseBg = ref(true)

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
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
  <B24PageGrid v-once class="lg:grid-cols-4 gap-5">
    <div>
      <B24Card variant="outline">
        <template #header>
          <div class="flex flex-row items-center justify-between gap-2">
            <ProseH5 class="mb-0">
              Options
            </ProseH5>
            <B24Switch v-model="isUseBg" label="isUseBg" size="xs" />
          </div>
        </template>
        <div class="mb-4 flex flex-col gap-4">
          <B24Select v-model="attrs.color" :items="airColors" multiple placeholder="Color" />
          <B24Select v-model="attrs.size" :items="sizes" multiple placeholder="Color" />
        </div>
      </B24Card>

      <B24Card class="mt-4" :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'">
        <template #header>
          <ProseH5 class="mb-0">
            Use speech recognition
          </ProseH5>
        </template>
        <div class="relative flex items-end gap-2 bg-(--ui-color-bg-content-secondary) rounded-xs ring-1 ring-ai-250 hover:ring-ai-350 pr-2 pb-2">
          <B24Input
            v-model="input"
            placeholder="Try use speech recognition..."
            no-padding
            no-border
            class="flex-1 resize-none px-2.5"
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
        <template #footer>
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
        </template>
      </B24Card>
    </div>
    <Matrix v-slot="props" :attrs="attrs">
      <B24Card :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'">
        <template #header>
          <ProseH5 class="mb-0">
            {{ [props?.color].join(' ') }}
          </ProseH5>
        </template>
        <div class="mb-4 flex flex-wrap flex-col items-center justify-start gap-4">
          <B24Input v-model="value" autofocus class="w-full" v-bind="props" />
          <B24Input :default-value="'Default value'" class="w-full" v-bind="props" />
          <B24Input placeholder="Highlight" highlight class="w-full" v-bind="props" />
          <B24Input
            placeholder="Highlight with error"
            highlight
            v-bind="props"
            color="air-primary-alert"
            aria-invalid="true"
            class="w-full"
          />
          <B24Input placeholder="Disabled" disabled class="w-full" v-bind="props" />
          <B24Input placeholder="Required" required class="w-full" v-bind="props" />
          <B24Input placeholder="No Padding" no-padding class="w-full" v-bind="props" />
          <B24Input placeholder="Rounded" rounded class="w-full" v-bind="props" />
          <B24Input placeholder="No Border" no-border class="w-full" v-bind="props" />
          <B24Input placeholder="Underline" underline class="w-full" v-bind="props" />
          <B24Input placeholder="Search..." :icon="ALetterIcon" class="w-full" v-bind="props" />
          <B24Input placeholder="Search..." :trailing-icon="Search2Icon" class="w-full" v-bind="props" />
          <B24Input :avatar="{ src: '/b24ui/demo/avatar/employee.png' }" :icon="ALetterIcon" placeholder="Search..." class="w-full" v-bind="props" />
          <B24Input placeholder="Loading..." loading class="w-full" v-bind="props" />
          <B24Input placeholder="Loading..." loading trailing class="w-full" v-bind="props" />
          <B24Input
            placeholder="Loading..."
            loading
            :icon="RocketIcon"
            :trailing-icon="TaskIcon"
            class="w-full"
            v-bind="props"
          />
          <B24Input :icon="CalculatorIcon" type="number" :model-value="10" class="w-full" v-bind="props" />
          <B24Input :icon="CalendarIcon" type="date" :model-value="new Date().toISOString().substring(0, 10)" class="w-full" v-bind="props" />
          <B24Input :icon="CrossedEye2Icon" type="password" model-value="password" class="w-full" v-bind="props" />
        </div>
      </B24Card>
    </Matrix>
  </B24PageGrid>
</template>
