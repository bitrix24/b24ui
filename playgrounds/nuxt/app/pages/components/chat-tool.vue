<script setup lang="ts">
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'
import AiStarsQuestionIcon from '@bitrix24/b24icons-vue/outline/AiStarsQuestionIcon'
import AiProcessIcon from '@bitrix24/b24icons-vue/outline/AiProcessIcon'
import AiInternetSearchIcon from '@bitrix24/b24icons-vue/outline/AiInternetSearchIcon'
import AiReflectionIcon from '@bitrix24/b24icons-vue/outline/AiReflectionIcon'
</script>

<template>
  <PlaygroundPage>
    <div class="w-60 flex flex-col gap-4 items-start">
      <B24ChatTool
        text="Searched components"
        :icon="AiStarsQuestionIcon"
      />

      <B24ChatTool
        text="Reading component"
        suffix="Button"
        :icon="AiProcessIcon"
        streaming
      />

      <B24ChatTool
        text="Searching components..."
        :icon="AiInternetSearchIcon"
        streaming
        loading
      />

      <B24ChatTool
        text="Searching components..."
        :icon="AiInternetSearchIcon"
        streaming
        loading
        use-wait
      />

      <B24ChatTool
        text="Searching components..."
        :icon="AiInternetSearchIcon"
        streaming
        loading
        use-clock
      />

      <B24ChatTool
        text="Searching components"
        :icon="AiReflectionIcon"
        chevron="leading"
      >
        <div class="text-sm text-muted">
          Found 5 matching components.
        </div>
      </B24ChatTool>

      <B24ChatTool
        text="Searched components"
        :icon="SearchIcon"
        variant="card"
        class="w-full"
      >
        Found 5 matching components.
      </B24ChatTool>
    </div>
  </PlaygroundPage>
</template>
