<script setup lang="ts">
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
</script>

<template>
  <PlaygroundPage>
    <B24PageHeader
      title="PageHeader"
      description="A responsive page header with title, description and actions."
      headline="Components"
      :links="[
        { label: 'GitHub', icon: GitHubIcon, to: 'https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageHeader.vue', target: '_blank' }
      ]"
    />
  </PlaygroundPage>
</template>
