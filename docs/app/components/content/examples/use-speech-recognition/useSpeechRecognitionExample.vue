<script setup lang="ts">
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/outline/MicrophoneOnIcon'
import StopLIcon from '@bitrix24/b24icons-vue/outline/StopLIcon'

const input = ref('')

const appLocale = useLocale()

const {
  isAvailable,
  isListening,
  start,
  stop
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
  await start()
}

const stopDictation = async () => {
  await stop()
}
</script>

<template>
  <div class="w-full relative flex items-end gap-2 bg-(--ui-color-bg-content-secondary) rounded-xs ring-1 ring-ai-250 hover:ring-ai-350 pr-2 pb-2">
    <B24Textarea
      v-model="input"
      :rows="2"
      autoresize
      placeholder="Try use speech recognition..."
      no-padding
      no-border
      class="flex-1 resize-none px-2.5"
    />
    <template v-if="isAvailable">
      <B24Button
        v-if="!isListening"
        :icon="MicrophoneOnIcon"
        color="air-tertiary-no-accent"
        size="sm"
        class="shrink-0"
        @click="startDictation"
      />
      <B24Button
        v-if="isListening"
        :icon="StopLIcon"
        color="air-secondary"
        size="sm"
        class="shrink-0 rounded-lg"
        @click="stopDictation"
      />
    </template>
  </div>
</template>
