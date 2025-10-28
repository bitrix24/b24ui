<script setup lang="ts">
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
</script>

<template>
  <B24ChatMessage
    id="1"
    :avatar="{
      icon: RobotIcon
    }"
    :parts="[
      {
        type: 'text',
        text: 'Bitrix24 UI offers several features for building AI chatbots including the ChatMessage, ChatMessages, and ChatPrompt components. Best practices include using the Chat class from AI SDK v5, implementing proper message styling with variants, and utilizing the built-in actions for message interactions. The components are fully customizable with theming support and responsive design.'
      }
    ]"
    role="assistant"
  />
</template>
