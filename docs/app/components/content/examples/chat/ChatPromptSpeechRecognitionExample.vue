<script setup lang="ts">
import { Chat } from '@ai-sdk/vue'
import MicrophoneOnIcon from '@bitrix24/b24icons-vue/outline/MicrophoneOnIcon'
import StopLIcon from '@bitrix24/b24icons-vue/outline/StopLIcon'

const input = ref('')

const appLocale = useLocale()

const chat = new Chat({
  onError(error) {
    console.error(error)
  }
})

function onSubmit() {
  // chat.sendMessage({ text: input.value })
  // ...

  stop()
  input.value = ''
}

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
  <B24Card class="w-full">
    <template #footer>
      <B24Container class="pb-4 sm:pb-6">
        <B24ChatPrompt v-model="input" :autofocus="false" :error="chat.error" @submit="onSubmit">
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
          <B24ChatPromptSubmit :status="chat.status" @stop="chat.stop()" @reload="chat.regenerate()" />
        </B24ChatPrompt>
      </B24Container>
    </template>
  </B24Card>
</template>
