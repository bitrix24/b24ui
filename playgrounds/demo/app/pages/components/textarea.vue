<script setup lang="ts">
import theme from '#build/b24ui/textarea'
import usePageMeta from './../../composables/usePageMeta'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/outline/MicrophoneOnIcon'
import StopLIcon from '@bitrix24/b24icons-vue/outline/StopLIcon'

usePageMeta.setPageTitle('Textarea')

const isUseBg = ref(true)

const colors = Object.keys(theme.variants.color)
const rowsItems = [1, 2, 3, 4]
const rows = ref(2)

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const attrs = reactive({
  color: [theme.defaultVariants.color]
})

const value = ref('Value')

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
          <B24Select v-model="rows" :items="rowsItems" placeholder="Rows" />
        </div>
      </B24Card>

      <B24Card class="mt-4" :variant="isUseBg ? 'outline-no-accent' : 'plain-no-accent'">
        <template #header>
          <ProseH5 class="mb-0">
            Use speech recognition
          </ProseH5>
        </template>
        <div class="relative flex items-end gap-2 bg-(--ui-color-bg-content-secondary) rounded-xs ring-1 ring-ai-250 hover:ring-ai-350 pr-2 pb-2">
          <B24Textarea
            v-model="input"
            :rows="1"
            autoresize
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
          <B24Textarea v-model="value" autofocus class="w-full" v-bind="props" />
          <B24Textarea :default-value="'Default value'" class="w-full" v-bind="props" />
          <B24Textarea placeholder="Highlight" highlight class="w-full" v-bind="props" />
          <B24Textarea
            placeholder="Highlight"
            highlight
            class="w-full"
            v-bind="props"
            color="air-primary-alert"
            aria-invalid="true"
          />
          <B24Textarea disabled placeholder="Disabled" class="w-full" v-bind="props" />
          <B24Textarea required placeholder="Required" class="w-full" v-bind="props" />
          <B24Textarea rounded placeholder="Rounded" class="w-full" v-bind="props" />
          <B24Textarea no-padding placeholder="No Padding" class="w-full" v-bind="props" />
          <B24Textarea no-border placeholder="No Border" class="w-full" v-bind="props" />
          <B24Textarea underline placeholder="Underline" class="w-full" v-bind="props" />
          <B24Textarea
            :icon="RocketIcon"
            placeholder="Search..."
            :rows="rows"
            class="w-full"
            v-bind="props"
          />
          <B24Textarea
            :trailing-icon="RocketIcon"
            placeholder="Search..."
            :rows="rows"
            class="w-full"
            v-bind="props"
          />
          <B24Textarea
            :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
            :trailing-icon="TaskIcon"
            placeholder="Search..."
            :rows="rows"
            class="w-full"
            v-bind="props"
          />
          <B24Textarea
            loading
            :avatar="{ src: '/b24ui/demo/avatar/employee.png' }"
            placeholder="Loading..."
            :rows="rows"
            class="w-full"
            v-bind="props"
          />
          <B24Textarea
            loading
            :icon="RocketIcon"
            :trailing-icon="TaskIcon"
            placeholder="Loading..."
            :rows="rows"
            class="w-full"
            v-bind="props"
          />
          <B24Textarea
            placeholder="Autoresize"
            autoresize
            :maxrows="5"
            :rows="rows"
            class="w-full"
            v-bind="props"
          />
        </div>
      </B24Card>
    </Matrix>
  </B24PageGrid>
</template>
