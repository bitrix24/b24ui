<script setup lang="ts">
import theme from '#build/b24ui/textarea'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/outline/MicrophoneOnIcon'
import StopLIcon from '@bitrix24/b24icons-vue/outline/StopLIcon'

const colors = Object.keys(theme.variants.color)

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const attrs = reactive({
  color: [theme.defaultVariants.color]
})

const singleAttrs = reactive({
  rows: 2,
  disabled: false,
  loading: false,
  highlight: false,
  rounded: false
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
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.color" class="w-44" :items="airColors" placeholder="Color" multiple />

      <B24FormField label="Rows" name="rows" orientation="horizontal">
        <B24InputNumber
          v-model="singleAttrs.rows"
          class="w-20"
          :min="0"
          :max="9"
        />
      </B24FormField>

      <B24Switch v-model="singleAttrs.disabled" label="Disabled" />
      <B24Switch v-model="singleAttrs.loading" label="Loading" />
      <B24Switch v-model="singleAttrs.highlight" label="Highlight" />
      <B24Switch v-model="singleAttrs.rounded" label="Rounded" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-80' }">
      <B24Textarea v-model="value" autofocus v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Textarea :default-value="'Default value'" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Textarea placeholder="Autoresize" autoresize :maxrows="6" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Textarea required placeholder="Required" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Textarea no-padding placeholder="No Padding" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Textarea no-border placeholder="No Border" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Textarea underline placeholder="Underline" v-bind="{ ...singleAttrs, ...props }" class="w-full" />
      <B24Textarea
        :icon="RocketIcon"
        placeholder="Icon"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24Textarea
        :trailing-icon="RocketIcon"
        placeholder="Trailing icon"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24Textarea
        :avatar="{ src: '/avatar/employee.png' }"
        :trailing-icon="TaskIcon"
        placeholder="Avatar with trailing icon"
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />
      <B24Textarea
        trailing
        :icon="TaskIcon"
        placeholder="Loading trailing..."
        v-bind="{ ...singleAttrs, ...props }"
        class="w-full"
      />

      <div class="w-full relative flex items-center gap-2 bg-(--ui-color-bg-content-secondary) rounded-xs ring-1 ring-ai-250 hover:ring-ai-350">
        <B24Textarea
          v-model="input"
          autoresize
          placeholder="Try use speech recognition..."
          no-padding
          no-border
          class="flex-1 resize-none px-2.5"
          v-bind="props"
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
