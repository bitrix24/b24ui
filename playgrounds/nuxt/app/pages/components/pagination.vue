<script setup lang="ts">
const page = ref(5)
const siblingCount = ref(1)
const showEdges = ref(true)
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Switch v-model="showEdges" label="Show edges" />

      <B24FormField label="Siblings" orientation="horizontal">
        <B24InputNumber v-model="siblingCount" class="w-20" :min="0" :max="3" />
      </B24FormField>
    </template>

    <template #default="{ cardVariant, cardBorderClass }">
      <B24Card :variant="cardVariant" :class="[cardBorderClass]">
        <template #header>
          <ProseH5 class="mb-0">
            With buttons
          </ProseH5>
        </template>
        <B24Pagination
          v-model:page="page"
          :total="100"
          :sibling-count="siblingCount"
          :show-edges="showEdges"
        />
      </B24Card>
      <B24Card :variant="cardVariant" :class="[cardBorderClass]">
        <template #header>
          <ProseH5 class="mb-0">
            With links
          </ProseH5>
        </template>
        <B24Pagination
          v-model:page="page"
          :total="100"
          :to="page => ({ query: { page } })"
          :sibling-count="siblingCount"
          :show-edges="showEdges"
        />
      </B24Card>
    </template>
  </PlaygroundPage>
</template>
