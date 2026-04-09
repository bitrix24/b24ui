<script setup lang="ts">
const duration = ref(2)
const spread = ref(2)
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24FormField label="Duration" orientation="horizontal">
        <B24InputNumber v-model="duration" size="sm" class="w-28" />
      </B24FormField>
      <B24FormField label="Spread" orientation="horizontal">
        <B24InputNumber v-model="spread" size="sm" class="w-28" />
      </B24FormField>
    </template>

    <div class="max-w-[550px] mx-auto px-[60px] py-5xl rounded-[24px] flex flex-col items-center justify-center gap-lg">
      <div>123123</div>
      <B24ChatShimmer text="Thinking about it..." :duration="duration" :spread="spread" />
      <ProseP>123123</ProseP>
    </div>
  </PlaygroundPage>
</template>
