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
  <B24Slideover
    :dismissible="false"
    :title="title"
    :description="description"
    :b24ui="{ content: 'sm:top-[300px] sm:max-h-[calc(100%-300px)]' }"
  >
    <B24Button label="Open" />

    <template #body>
      <ProseP accent="less-more" small>
        Slideover non-dismissible: <ProseCode color="air-primary-copilot">Esc</ProseCode> also doesn't work
      </ProseP>
    </template>
  </B24Slideover>
</template>
