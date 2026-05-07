<script setup lang="ts">
import theme from '#build/b24ui/button'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'

const colors = Object.keys(theme.variants.color)
  .filter(color => color.includes('air'))
  .filter(s => !['link', 'air-boost'].includes(s))
const sizes = Object.keys(theme.variants.size).filter(s => !['xl', 'xss'].includes(s))

const color = ref<keyof typeof theme.variants.color>('air-primary')
const size = ref<keyof typeof theme.variants.size>('lg')

const checkbox = ref<boolean>(false)
const radio = ref<string>('1')
const select = ref<string>('')
const input = ref<string>('')
const radioItems = ['1', '2', '3']
const selectItems = ['Apple', 'Banana', 'Cherry']
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="color" size="xs" :items="colors" />
      <B24Select v-model="size" size="xs" :items="sizes" />
    </template>

    <div class="flex flex-col gap-8">
      <!-- Per-component prop defaults via :props -->
      <div class="flex flex-col gap-2">
        <ProseP small accent="less">
          <code>:props={{ `{ button: { color: '${color}', size: '${size}' } }` }}</code>
        </ProseP>

        <B24Theme :props="{ button: { color, size } }">
          <div class="flex items-center gap-2">
            <B24Button label="Themed" />
            <B24Button label="Themed with icon" :icon="RocketIcon" />
            <B24Button :icon="AiStarsIcon" square />
          </div>
        </B24Theme>
      </div>

      <!-- Explicit prop overrides theme -->
      <div class="flex flex-col gap-2">
        <ProseP small accent="less">
          Explicit props win over <code>:props</code>
        </ProseP>

        <B24Theme :props="{ button: { color, size } }">
          <div class="flex items-center gap-2">
            <B24Button label="Theme only" />
            <B24Button label="color=air-primary" color="air-primary" />
            <B24Button label="size=xs" size="xs" />
          </div>
        </B24Theme>
      </div>

      <!-- :b24ui (slot classes) + :props (prop defaults) together -->
      <div class="flex flex-col gap-2">
        <ProseP small accent="less">
          <code>:b24ui</code> slot classes + <code>:props</code> prop defaults together
        </ProseP>

        <B24Theme
          :props="{ button: { color } }"
          :b24ui="{ button: { base: 'font-bold rounded-full' } }"
        >
          <div class="flex items-center gap-2">
            <B24Button label="Styled + themed" />
            <B24Button label="With icon" :icon="TaskIcon" />
          </div>
        </B24Theme>
      </div>

      <!-- Nested B24Theme: inner overrides bleed in, other components inherit from outer -->
      <div class="flex flex-col gap-2">
        <ProseP small accent="less">
          Nested <code>&lt;B24Theme&gt;</code>: outer sets tooltip globally, inner only overrides button — both compose
        </ProseP>

        <B24Theme :props="{ button: { color, size }, tooltip: { delayDuration: 0, arrow: true } }">
          <div class="flex items-center gap-2">
            <B24Tooltip text="Outer tooltip (instant + arrow)">
              <B24Button label="Outer" />
            </B24Tooltip>
            <B24Theme :props="{ button: { color: 'air-primary-success' } }">
              <B24Tooltip text="Inner tooltip still inherits delay + arrow">
                <B24Button label="color=air-primary-success (inner)" />
              </B24Tooltip>
            </B24Theme>
            <B24Tooltip text="Outer tooltip again">
              <B24Button label="Outer again" />
            </B24Tooltip>
          </div>
        </B24Theme>
      </div>

      <!-- :props on form components (with and without B24FormField wrapping) -->
      <div class="flex flex-col gap-2">
        <ProseP small accent="less">
          <code>:props</code> flows into every form component (with or without <code>&lt;B24FormField&gt;</code>)
        </ProseP>

        <B24Theme :props="{ input: { size, color }, pinInput: { size, color }, checkbox: { size, color }, switch: { size, color }, radioGroup: { color, orientation: 'horizontal' }, select: { color } } as any">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <B24Input v-model="input" placeholder="Bare input" />
              <B24PinInput :length="3" />
              <B24Checkbox v-model="checkbox" label="Bare checkbox" />
              <B24Switch label="Bare switch" />
            </div>
            <div class="flex items-center gap-6">
              <B24RadioGroup v-model="radio" :items="radioItems" />
              <B24Select v-model="select" :items="selectItems" placeholder="Themed select" />
            </div>
          </div>
        </B24Theme>
      </div>

      <!-- Closer context wins: UFormField/FieldGroup beats :props; error beats both -->
      <div class="flex flex-col gap-2">
        <ProseP small accent="less">
          Closer context wins: <code>&lt;B24FormField size="lg"&gt;</code> beats <code>:props</code>; validation error forces <code>error</code> color
        </ProseP>

        <B24Theme :props="{ input: { size, color } } as any">
          <div class="flex flex-col gap-3">
            <B24FormField label="Bare (theme size applies)">
              <B24Input v-model="input" placeholder="theme size" />
            </B24FormField>
            <B24FormField label="FormField size=lg wins" size="lg">
              <B24Input v-model="input" placeholder="formfield size" />
            </B24FormField>
            <B24FormField label="With error: error color wins" error="Required">
              <B24Input v-model="input" placeholder="error color" />
            </B24FormField>
          </div>
        </B24Theme>
      </div>

      <!-- Baseline: bare components must keep Reka primitives' own defaults -->
      <div class="flex flex-col gap-2">
        <ProseP small accent="less">
          Without <code>&lt;B24Theme&gt;</code> (baseline) — bare Tooltip uses Reka's default delay and has no arrow; bare Checkbox matches unstyled defaults
        </ProseP>

        <div class="flex items-center gap-4">
          <B24Button label="Default" />
          <B24Button label="Default with icon" :icon="RocketIcon" />
          <B24Tooltip text="Default delay, no arrow">
            <B24Button label="Hover (baseline)" />
          </B24Tooltip>
          <B24Checkbox label="Bare checkbox" />
        </div>
      </div>
    </div>
  </PlaygroundPage>
</template>
