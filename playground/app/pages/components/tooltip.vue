<script setup lang="ts">
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import HelpIcon from '@bitrix24/b24icons-vue/main/HelpIcon'
import CheckIcon from '@bitrix24/b24icons-vue/main/CheckIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

usePageMeta.setPageTitle('Tooltip')
const text = ref({
  long: 'When the performer completes the task, it will come to you for review. You can accept the work (and then the task will be closed) or return the task for revision.'
})

const openState = ref({
  T: false,
  R: false,
  B: false,
  L: false
})

defineShortcuts({
  alt_T: () => openState.value.T = !openState.value.T,
  alt_R: () => openState.value.R = !openState.value.R,
  alt_B: () => openState.value.B = !openState.value.B,
  alt_L: () => openState.value.L = !openState.value.L
})
/*
@memo this demo from b24
<div class="popup-window popup-window-dark --ui-context-content-dark --open" style="display: block; position: absolute; left: 260px; top: 657px; z-index: 1600 !important;">
  <div class="popup-window-content">
    <span style="display: block;">This option is available on Enterprise plan only. <a onclick="alert('test')" href="#">Upgrade</a></span>
  </div>
  <div class="popup-window-angly popup-window-angly-top" style="left: 23px; margin-left: 0px;">
    <div class="popup-window-angly--arrow"></div>
  </div>
</div>
 */
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="html">
      <ExampleCardSubTitle title="custom html" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="flex flex-col gap-4">
          <B24Tooltip
            :delay-duration="100"
            :content="{ side: 'right' }"
            :b24ui="{ content: 'bg-blue-400/70 dark:bg-red-400/70' }"
          >
            <template #content>
              <div class="text-pretty max-w-[200px]">
                <ProseP class="text-red-500">
                  Magna copiosae apeirian ius at. <a href="/" class="font-bold text-ai-500 underline hover:text-ai-500/90">An eos iusto solet</a>, id mel dico habemus. Sale liber et vel. Per in illud petentium iudicabit, integre sententiae pro no. Tation delenit percipitur at vix. Per in illud petentium iudicabit, integre sententiae pro no. An nam debet instructior, commodo mediocrem id cum.
                </ProseP>
                <ProseP class="text-orange-500">
                  Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Ceteros assentior omittantur cum ad. Ceteros assentior omittantur cum ad. Odio contentiones sed cu, usu commodo prompta prodesset id. Sea esse deserunt ei, no diam ubique euripidis has.
                </ProseP>
              </div>
            </template>
            <B24Switch
              name="switch"
              label="Required"
              :default-value="true"
              :unchecked-icon="Cross30Icon"
              :checked-icon="CheckIcon"
            />
          </B24Tooltip>
        </div>
      </div>

      <ExampleCardSubTitle title="icon help" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24Tooltip
          :delay-duration="100"
          :content="{ side: 'right' }"
          :text="text.long"
        >
          <div class="flex flex-row flex-nowrap items-center justify-start gap-1.5">
            <B24Checkbox name="checkbox" label="Default value" :default-value="true" />
            <div class="cursor-help ring ring-transparent text-(--ui-color-design-plain-na-content-secondary)">
              <HelpIcon class="size-5" />
            </div>
          </div>
        </B24Tooltip>
      </div>
    </ExampleCard>

    <ExampleCard title="base">
      <ExampleCardSubTitle title="with arrow" />
      <div class="mb-4 lex flex-col gap-4">
        <B24Tooltip v-model:open="openState.T" :text="text.long" :kbds="['alt', 'T']" :content="{ side: 'top' }">
          <B24Button label="Top" block />
        </B24Tooltip>

        <div class="mt-4 mb-4 grid grid-cols-2 gap-4">
          <B24Tooltip v-model:open="openState.L" :text="text.long" :kbds="['alt', 'L']" :content="{ side: 'left' }">
            <B24Button label="Left" block />
          </B24Tooltip>

          <B24Tooltip v-model:open="openState.R" :text="text.long" :kbds="['alt', 'R']" :content="{ side: 'right' }">
            <B24Button label="Right" block />
          </B24Tooltip>
        </div>

        <B24Tooltip v-model:open="openState.B" :text="text.long" :kbds="['alt', 'B']">
          <B24Button label="Bottom" block />
        </B24Tooltip>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
