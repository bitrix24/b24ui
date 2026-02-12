<script setup lang="ts">
import theme from '#build/b24ui/color-picker'

const sizes = Object.keys(theme.variants.size)

const attrs = reactive({
  size: [theme.defaultVariants.size]
})

const colorHex = ref('#00C16A')
const disabled = ref(false)

function handleColorChange(event: Event) {
  colorHex.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />
      <B24FieldGroup>
        <B24Button>
          <span :style="{ backgroundColor: colorHex }" class="inline-flex size-5 rounded-sm" />
        </B24Button>
        <B24Input :model-value="colorHex" class="w-28" @change="handleColorChange" />
      </B24FieldGroup>

      <B24Switch v-model="disabled" label="Disabled" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-60' }">
      <B24ColorPicker v-model="colorHex" v-bind="props" :disabled="disabled" />
    </Matrix>
  </PlaygroundPage>
</template>
