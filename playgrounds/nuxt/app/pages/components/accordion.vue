<script setup lang="ts">
import type { AccordionItem } from '@bitrix24/b24ui-nuxt'
import CollapseIcon from '@bitrix24/b24icons-vue/actions/CollapseIcon'
import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'
import Download3Icon from '@bitrix24/b24icons-vue/actions/Download3Icon'
import ThemeIcon from '@bitrix24/b24icons-vue/outline/ThemeIcon'
import FlipchartIcon from '@bitrix24/b24icons-vue/main/FlipchartIcon'
import LayersIcon from '@bitrix24/b24icons-vue/outline/LayersIcon'
import ServicesIcon from '@bitrix24/b24icons-vue/outline/ServicesIcon'

const items = [{
  label: 'Getting Started',
  icon: InfoIcon,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
  label: 'Installation',
  icon: Download3Icon,
  disabled: true,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
  label: 'Theming',
  icon: ThemeIcon,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
  label: 'Layouts',
  icon: FlipchartIcon,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
  label: 'Components',
  slot: 'test' as const,
  icon: LayersIcon,
  trailingIcon: CollapseIcon,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
  label: 'Utilities',
  slot: 'custom' as const,
  icon: ServicesIcon,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}] satisfies AccordionItem[]

const types: ('single' | 'multiple')[] = ['single', 'multiple']
const attrs = reactive({
  type: types[0],
  collapsible: false,
  disabled: false,
  unmountOnHide: true
})
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select v-model="attrs.type" class="w-44" :items="types" placeholder="Type" />
      <B24Switch v-if="attrs.type === 'single'" v-model="attrs.collapsible" label="Collapsible" />
      <B24Switch v-model="attrs.disabled" label="Disabled" />
      <B24Switch v-model="attrs.unmountOnHide" label="UnmountOnHide" />
    </template>

    <template #default="{ cardVariant, cardBorderClass }">
      <B24Card
        :variant="cardVariant"
        :class="[cardBorderClass, 'mx-auto max-w-96 w-full']"
      >
        <B24Accordion
          :key="`${attrs.type}-${attrs.collapsible}-${attrs.disabled}-${attrs.unmountOnHide}`"
          v-bind="attrs"
          :items="items"
          class="w-full"
        >
          <template #body="{ item }">
            <p class="text-muted">
              {{ item.content }}
            </p>
          </template>

          <template #custom="{ item }">
            <p class="text-muted">
              Custom: {{ item.content }}
            </p>
          </template>
        </B24Accordion>
      </B24Card>
    </template>
  </PlaygroundPage>
</template>
