<script setup lang="ts">
import HelpIcon from '@bitrix24/b24icons-vue/main/HelpIcon'

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
</script>

<template>
  <PlaygroundPage>
    <div class="relative w-full min-h-[360px] flex items-center justify-center">
      <canvas ref="myCanvas" class="z-0 absolute inset-0 size-full" />
      <div
        class="text-center backdrop-blur-sm bg-(--ui-color-design-outline-na-bg) border border-(--ui-color-design-outline-na-stroke) text-(--ui-color-design-outline-na-content) max-w-[550px] px-[60px] py-5xl rounded-[24px] flex flex-col items-center justify-center gap-sm2"
      >
        <B24Tooltip
          :delay-duration="100"
          :content="{ side: 'right' }"
          :text="text.long"
        >
          <div class="cursor-help text-muted">
            <B24Avatar
              :icon="HelpIcon"
              alt="Tooltip"
              size="3xl"
              :b24ui="{
                root: 'bg-transparent ring-2 ring-(--ui-color-design-outline-na-content-icon)',
                icon: 'size-[74px] text-(--ui-color-design-outline-na-content-icon)'
              }"
            />
          </div>
        </B24Tooltip>
        <ProseH2 class="leading-[29px] mb-0">
          A small <B24Tooltip
            :delay-duration="100"
            :content="{ side: 'right' }"
          >
            <template #content>
              <div class="text-pretty max-w-[200px]">
                <ProseP small class="text-(--ui-color-accent-main-success)">
                  Magna copiosae apeirian ius at. <a href="/" class="font-(--ui-font-weight-bold) text-(--ui-color-copilot-accent-primary) underline hover:text-(--ui-color-copilot-accent-primary)/90">An eos iusto solet</a>, id mel dico habemus. Sale liber et vel. Per in illud petentium iudicabit, integre sententiae pro no. Tation delenit percipitur at vix. Per in illud petentium iudicabit, integre sententiae pro no. An nam debet instructior, commodo mediocrem id cum.
                </ProseP>
                <ProseP small class="text-(--ui-color-accent-main-warning)">
                  Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Ceteros assentior omittantur cum ad. Ceteros assentior omittantur cum ad. Odio contentiones sed cu, usu commodo prompta prodesset id. Sea esse deserunt ei, no diam ubique euripidis has.
                </ProseP>
              </div>
            </template>
            <ProseEm>window</ProseEm>
          </B24Tooltip> that shows details when you move your mouse over an item.
        </ProseH2>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div class="mb-4 lex flex-col gap-4">
            <B24Tooltip v-model:open="openState.T" :text="text.long" :kbds="['alt', 'T']" :content="{ side: 'top' }">
              <B24Button label="Top" block />
            </B24Tooltip>

            <div class="mt-4 mb-4 grid grid-cols-2 gap-3">
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
        </div>
      </div>
    </div>
  </PlaygroundPage>
</template>
