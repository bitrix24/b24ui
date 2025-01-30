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
  long: 'Magna copiosae apeirian ius at. An eos iusto solet, id mel dico habemus. Sale liber et vel.'
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
                <p class="mb-1.5 text-red-800 dark:text-red-950">
                  Magna copiosae apeirian ius at. <a href="/" class="font-bold text-ai-500 underline hover:text-ai-800">An eos iusto solet</a>, id mel dico habemus. Sale liber et vel. Per in illud petentium iudicabit, integre sententiae pro no. Tation delenit percipitur at vix. Per in illud petentium iudicabit, integre sententiae pro no. An nam debet instructior, commodo mediocrem id cum.
                </p>
                <p class="text-orange-800 dark:text-blue-950">
                  Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Ceteros assentior omittantur cum ad. Ceteros assentior omittantur cum ad. Odio contentiones sed cu, usu commodo prompta prodesset id. Sea esse deserunt ei, no diam ubique euripidis has.
                </p>
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
          text="When the performer completes the task, it will come to you for review. You can accept the work (and then the task will be closed) or return the task for revision."
        >
          <div class="flex flex-row flex-nowrap items-center justify-start gap-1.5">
            <B24Checkbox name="checkbox" label="Default value" :default-value="true" />
            <div class="cursor-help ring ring-transparent text-base-500 dark:text-base-800">
              <HelpIcon class="size-5" />
            </div>
          </div>
        </B24Tooltip>
      </div>
    </ExampleCard>

    <ExampleCard title="base">
      <ExampleCardSubTitle title="with arrow" />
      <div class="mb-4 lex flex-col gap-4">
        <B24Tooltip v-model:open="openState.T" :text="text.long" :kbds="['alt', 'T']" :content="{ side: 'top' }" arrow>
          <B24Button label="Top" color="link" depth="dark" block />
        </B24Tooltip>

        <div class="mt-4 mb-4 grid grid-cols-2 gap-4">
          <B24Tooltip v-model:open="openState.L" :text="text.long" :kbds="['alt', 'L']" :content="{ side: 'left' }" arrow>
            <B24Button label="Left" color="link" depth="dark" block />
          </B24Tooltip>

          <B24Tooltip v-model:open="openState.R" :text="text.long" :kbds="['alt', 'R']" :content="{ side: 'right' }" arrow>
            <B24Button label="Right" color="link" depth="dark" block />
          </B24Tooltip>
        </div>

        <B24Tooltip v-model:open="openState.B" :text="text.long" :kbds="['alt', 'B']" arrow>
          <B24Button label="Bottom" color="link" depth="dark" block />
        </B24Tooltip>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
