<script setup lang="ts">
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'
import CheckIcon from '@bitrix24/b24icons-vue/main/CheckIcon'
</script>

<template>
  <B24Tooltip
    :delay-duration="100"
    :content="{ side: 'right' }"
    :b24ui="{ content: 'bg-blue-400/70 dark:bg-red-400/70' }"
  >
    <template #content>
      <div class="text-pretty max-w-[200px]">
        <p class="mb-1.5 text-red-800 dark:text-red-950">
          Magna copiosae apeirian ius at. <a href="#" class="font-bold text-ai-500 underline hover:text-ai-800">An eos iusto solet</a>, id mel dico habemus. Sale liber et vel. Per in illud petentium iudicabit, integre sententiae pro no. Tation delenit percipitur at vix. Per in illud petentium iudicabit, integre sententiae pro no. An nam debet instructior, commodo mediocrem id cum.
        </p>
        <p class="text-orange-800 dark:text-blue-950">
          Elitr accommodare deterruisset eam te, vim munere pertinax consetetur at. Ceteros assentior omittantur cum ad. Ceteros assentior omittantur cum ad. Odio contentiones sed cu, usu commodo prompta prodesset id. Sea esse deserunt ei, no diam ubique euripidis has.
        </p>
      </div>
    </template>
    <B24Switch
      name="switch"
      label="Hover me"
      :default-value="true"
      :unchecked-icon="Cross30Icon"
      :checked-icon="CheckIcon"
    />
  </B24Tooltip>
</template>
