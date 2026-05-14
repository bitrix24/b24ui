<script setup lang="ts">
import theme from '#build/b24ui/chat-message'

const colors = Object.keys(theme.variants.color)
const variants = Object.keys(theme.variants.variant)

const attrs = reactive({
  color: [],
  variant: [theme.defaultVariants.variant]
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.variant" :items="variants" multiple size="xs" />
      <B24Select v-model="attrs.color" :items="colors" multiple size="xs" class="max-w-[300px]" />
    </template>

    <div class="w-80">
      <B24ChatMessage
        id="d1"
        side="left"
        variant="event"
        role="system"
        :parts="[{ type: 'text', text: 'Some system message' }]"
      />
      <B24ChatMessage
        id="d2"
        side="right"
        variant="message"
        role="user"
        :parts="[{ type: 'text', text: 'Some user message' }]"
      />
      <B24ChatMessage
        id="d3"
        side="left"
        variant="system"
        role="assistant"
        :parts="[{ type: 'text', text: 'Some assistant message' }]"
        :avatar="{ label: 'bitrix24', src: 'https://github.com/bitrix24.png' }"
      />
    </div>
    <Matrix v-slot="props" :attrs="attrs">
      <B24ChatMessage
        id="1"
        role="user"
        :parts="[{ type: 'text', text: 'Hello, how are you?' }]"
        :avatar="{ label: 'bitrix24', src: 'https://github.com/bitrix24.png' }"
        v-bind="props"
      />
    </Matrix>
  </PlaygroundPage>
</template>
