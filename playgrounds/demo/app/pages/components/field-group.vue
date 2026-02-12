<script setup lang="ts">
import theme from '#build/b24ui/field-group'

const sizes = Object.keys(theme.variants.size)
const orientations = Object.keys(theme.variants.orientation)

const knowledgeBase = ['Select', 'Create']
const smartScripts = ['Scripts', 'Create script', 'Install from Bitrix24.Market']

const items = [
  [{ label: 'Knowledge base', type: 'label' }, ...knowledgeBase],
  [{ label: 'Smart scripts', type: 'label' }, ...smartScripts]
]

function onClick() {
  return new Promise<void>(res => setTimeout(res, 3000))
}

const attrs = reactive({
  size: ['md' as keyof typeof theme.variants.size]
})

const singleAttrs = reactive({
  orientation: 'horizontal' as keyof typeof theme.variants.orientation,
  noSplit: false
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.size" class="w-32" :items="sizes" placeholder="Size" multiple />
      <B24Select v-model="singleAttrs.orientation" class="w-44" :items="orientations" placeholder="Orientation" />
      <B24Switch v-model="singleAttrs.noSplit" label="NoSplit" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-80' }">
      <B24FieldGroup v-bind="{ ...props, ...singleAttrs }" class="w-full">
        <B24Button
          loading-auto
          use-clock
          @click="onClick"
        >
          Button
        </B24Button>
        <B24Button use-dropdown />
      </B24FieldGroup>

      <B24FieldGroup v-bind="{ ...props, ...singleAttrs }" class="w-full">
        <B24Button loading-auto use-clock @click="onClick">
          Button
        </B24Button>
        <B24Button loading-auto use-clock @click="onClick">
          Button
        </B24Button>
        <B24Button loading-auto use-clock @click="onClick">
          Button
        </B24Button>
      </B24FieldGroup>

      <B24FieldGroup v-bind="{ ...props, ...singleAttrs }" class="w-full">
        <B24Input name="search" placeholder="Search&hellip;" aria-label="Search" type="search" />
        <B24Button
          loading-auto
          use-clock
          @click="onClick"
        >
          Button
        </B24Button>
      </B24FieldGroup>

      <B24FieldGroup v-bind="{ ...props, ...singleAttrs }" class="w-full">
        <B24Select class="w-full" :items="items" name="some_value" placeholder="Choose a value&hellip;" aria-label="Choose a value" />
        <B24Button
          loading-auto
          use-clock
          @click="onClick"
        >
          Button
        </B24Button>
      </B24FieldGroup>

      <B24FieldGroup v-bind="{ ...props, ...singleAttrs }" class="w-full">
        <B24Badge color="air-tertiary" label="https://" />
        <B24Input class="w-full" type="url" placeholder="www.example.com" />
      </B24FieldGroup>

      <B24FieldGroup v-bind="{ ...props, ...singleAttrs }" class="w-full">
        <B24InputNumber class="w-full" placeholder="Some number" />
        <B24Button
          loading-auto
          use-clock
          @click="onClick"
        >
          Button
        </B24Button>
      </B24FieldGroup>
    </Matrix>
  </PlaygroundPage>
</template>
