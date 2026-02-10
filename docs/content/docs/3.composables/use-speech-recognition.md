---
title: useSpeechRecognition
description: A speech recognition composable using the Web Speech API.
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useSpeechRecognition.ts
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/textarea
---

## Usage

The auto-imported composable `useSpeechRecognition` provides speech recognition functionality in the browser using the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

```vue
<script setup lang="ts">
const appLocale = useLocale()

const {
  state,
  isAvailable,
  isListening,
  start,
  stop,
  toggle,
  setLanguage
} = useSpeechRecognition(
  {
    lang: appLocale.locale.value.locale,
    continuous: true,
    interimResults: true
  },
  {
    onStart: () => console.log('Recognition started'),
    onEnd: () => console.log('Recognition ended'),
    onError: (error) => console.error('Error:', error),
    onResult: (result) => console.log('Result:', result.text)
  }
)
</script>
```

## API

### Parameters

`useSpeechRecognition(options?: SpeechRecognitionOptions, events?: SpeechRecognitionEvents)`{lang="ts-type"}

Creates a speech recognition instance with specified options and event handlers.

**options:**

::field-group

  ::field{name="lang" type="string"}
  Recognition language. Default: `'en-US'`.
  ::
  
  ::field{name="continuous" type="boolean"}
  Continuous recognition. If `true`, recognition continues until explicitly stopped. Default: `true`.
  ::
  
  ::field{name="interimResults" type="boolean"}
  Show interim results. Default: `true`.
  ::
  
  ::field{name="maxAlternatives" type="number"}
  Maximum number of alternatives for each result. Default: `1`.
  ::

::

**events:**

::field-group

  ::field{name="onStart" type="() => void"}
  Called when recognition starts.
  ::
  
  ::field{name="onEnd" type="() => void"}
  Called when recognition ends.
  ::
  
  ::field{name="onError" type="(error: string) => void"}
  Called when a recognition error occurs.
  ::
  
  ::field{name="onResult" type="(result: SpeechRecognitionResult) => void"}
  Called when a recognition result is received.
  ::

::

`useSpeechRecognition` returns an object with the following properties:

### state

`state: DeepReadonly<Ref<SpeechRecognitionState>>`{lang="ts-type"}

The current speech recognition state.

::field-group

  ::field{name="isAvailable" type="boolean"}
  Whether speech recognition is available in the current browser.
  ::
  
  ::field{name="isListening" type="boolean"}
  Whether recognition is currently active.
  ::
  
  ::field{name="lastRecognizedText" type="string"}
  The last recognized text (accumulated in continuous mode).
  ::

::

### isAvailable

`isAvailable: ComputedRef<boolean>`{lang="ts-type"}

A computed property indicating speech recognition availability.

### isListening

`isListening: ComputedRef<boolean>`{lang="ts-type"}

A computed property indicating whether recognition is active.

### start()

`start(): Promise<boolean>`{lang="ts-type"}

Starts speech recognition.

**Returns:** `Promise<boolean>` - `true` if recognition started successfully, otherwise `false`.

### stop()

`stop(): Promise<boolean>`{lang="ts-type"}

Stops speech recognition.

**Returns:** `Promise<boolean>` - `true` if recognition stopped successfully, otherwise `false`.

### toggle()

`toggle(): Promise<boolean>`{lang="ts-type"}

Toggles the recognition state (start/stop).

**Returns:** `Promise<boolean>` - `true` if the operation was successful, otherwise `false`.

### setLanguage()

`setLanguage(lang: string): boolean`{lang="ts-type"}

Sets the recognition language.

::field-group

  ::field{name="lang" type="string" required}
  Language code in BCP 47 format (e.g., `'ru-RU'`, `'en-US'`).
  ::

::

**Returns:** `boolean` - `true` if the language was set successfully, otherwise `false`.

### recognizer

`recognizer: SpeechRecognition | undefined`{lang="ts-type"}

Web Speech API Recognition instance for advanced use.

## Example

Recognized text can be added to a [Textarea](/docs/components/textarea/) or [Input](/docs/components/input/) component.

::component-example
---
collapse: true
name: 'use-speech-recognition-example'
---
::
