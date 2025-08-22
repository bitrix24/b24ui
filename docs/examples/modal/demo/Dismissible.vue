<script setup lang="ts">
export interface ExampleProps {
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Modal
    :dismissible="false"
    :title="title"
    :description="description"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <ProseP accent="less-more" small>
        Modal non-dismissible: <ProseCode color="air-primary-copilot">Esc</ProseCode> also doesn't work
      </ProseP>
    </template>
  </B24Modal>
</template>
