<script setup lang="ts">
import theme from '#build/b24ui/chat-message'
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import CopyFileIcon from '@bitrix24/b24icons-vue/crm/CopyFileIcon'
import Refresh5Icon from '@bitrix24/b24icons-vue/actions/Refresh5Icon'

const colors = Object.keys(theme.variants.color)
const variants = Object.keys(theme.variants.variant)

const compact = ref(false)

const attrs = reactive({
  color: [],
  variant: [theme.defaultVariants.variant]
})

const actions = [
  { label: 'Copy to clipboard', icon: CopyFileIcon },
  { label: 'Regenerate', icon: Refresh5Icon }
]
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Switch v-model="compact" label="Compact" size="xs" />
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
        side="right"
        :parts="[{ type: 'text', text: 'Can you help me set up Bitrix24 UI in my project?' }]"
        :avatar="{ label: 'bitrix24', src: 'https://github.com/bitrix24.png' }"
        :compact="compact"
        v-bind="props"
      />
      <B24ChatMessage
        id="2"
        role="assistant"
        :parts="[{ type: 'text', text: 'Sure! Install the package and make sure Tailwind CSS v4 is set up in your project.' }]"
        :icon="RobotIcon"
        :actions="actions"
        :compact="compact"
        v-bind="props"
      />
      <B24ChatMessage
        id="3"
        role="user"
        side="right"
        :parts="[{ type: 'text', text: 'Done! What about theming?' }]"
        :avatar="{ label: 'bitrix24', src: 'https://github.com/bitrix24.png' }"
        :compact="compact"
        v-bind="props"
      />
      <B24ChatMessage
        id="4"
        role="assistant"
        :parts="[{ type: 'text', text: 'You can customize the theme options in your app.config.ts file. All components use semantic colors so they adapt automatically.' }]"
        :icon="RobotIcon"
        :actions="actions"
        :compact="compact"
        v-bind="props"
      />
    </Matrix>
  </PlaygroundPage>
</template>
