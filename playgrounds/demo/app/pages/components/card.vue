<script setup lang="ts">
import theme from '#build/b24ui/card'

const withHeader = ref(true)
const withFooter = ref(true)

const variants = Object.keys(theme.variants.variant)
const attrs = reactive({
  variant: [theme.defaultVariants.variant]
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.variant" class="w-56" :items="variants" placeholder="Variant" multiple />

      <B24Switch v-model="withHeader" label="Header" />
      <B24Switch v-model="withFooter" label="Footer" />
    </template>

    <Matrix :attrs="attrs">
      <template #item="props">
        <B24Card v-bind="props" class="w-60">
          <template v-if="withHeader" #header>
            <ProseH5 class="mb-0">
              {{ props?.variant }}
            </ProseH5>
          </template>

          <Placeholder class="h-32" />

          <template v-if="withFooter" #footer>
            <Placeholder class="h-8" />
          </template>
        </B24Card>
      </template>
    </Matrix>
  </PlaygroundPage>
</template>
