<script setup lang="ts">
import type { CardProps } from '@bitrix24/b24ui-nuxt'
import { createPlaygroundContext, providePlaygroundContext, usePlaygroundCardStyles } from '../composables/usePlaygroundContext'

defineProps<{
  /**
   * B24UI props for the playground area card
   */
  b24ui?: CardProps['b24ui']
}>()

const slots = defineSlots<{
  controls?: () => any
  trailing?: () => any
  default?: (props: { playgroundContext: PlaygroundContext, cardVariant: CardProps['variant'], cardBorderClass: string }) => any
}>()

const playgroundContext = providePlaygroundContext(createPlaygroundContext())
const { cardVariant, cardBorderClass } = usePlaygroundCardStyles(playgroundContext)
</script>

<template>
  <Navbar>
    <template #trailing>
      <B24Switch v-model="playgroundContext.isUseBg.value" label="isUseBg" />
    </template>
    <template v-if="slots.controls" #controls>
      <div class="flex items-center flex-wrap gap-2 py-2 pr-3 max-w-full">
        <slot name="controls" :playground="playgroundContext" />
      </div>
    </template>
  </Navbar>

  <B24Card
    :variant="cardVariant"
    :b24ui="{
      ...b24ui,
      root: [playgroundContext.isUseBg.value ? 'backdrop-blur-xl' : '', 'border-0 border-t-2 lg:border-t-0 rounded-none lg:rounded-(--ui-border-radius-md)', b24ui?.root],
      body: ['flex items-stretch flex-wrap justify-center md:justify-start gap-4 min-h-0 p-4', b24ui?.body]
    }"
  >
    <slot v-bind="{ playgroundContext, cardVariant, cardBorderClass }" />
  </B24Card>
</template>
