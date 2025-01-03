<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/countdown'
import B24Countdown from '@bitrix24/b24ui-nuxt/runtime/components/Countdown.vue'
import type { CountdownData } from '@bitrix24/b24ui-nuxt/runtime/components/Countdown.vue'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import PlayIcon from '@bitrix24/b24icons-vue/button/PlayIcon'
import StopIcon from '@bitrix24/b24icons-vue/button/StopIcon'
import StopHandIcon from '@bitrix24/b24icons-vue/main/StopHandIcon'
import Refresh5Icon from '@bitrix24/b24icons-vue/actions/Refresh5Icon'
import Clock2Icon from '@bitrix24/b24icons-vue/main/Clock2Icon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

usePageMeta.setPageTitle('Countdown')

const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const now = new Date()
const newYear = new Date(now.getFullYear() + 1, 0, 1)

const secondsSimple = 60
const secondsShort = 5
const secondsLong = 2 * 24 * 60 * 60
const secondsNY = (newYear.getTime() - now.getTime()) / 1000

// region Simple action ////
const counting = ref(false)

const startCountdown = () => {
  counting.value = true
}

const onCountdownEnd = () => {
  counting.value = false
}
// endregion ////

// region Simple action V2 ////
const countdownV2Ref = ref<typeof B24Countdown | null>(null)
const secondsShortV2 = ref(5)
const countingV2 = ref(false)

const startCountdownV2 = async () => {
  countingV2.value = true
  countdownV2Ref.value?.start()
}

const onCountdownV2End = () => {
  countingV2.value = false
}
// endregion ////

// region Control ////
const countdownControlRef = ref<typeof B24Countdown | null>(null)
const secondsControl = ref(15)
const countingControl = ref(false)
const isControlEmitEvents = ref(true)
const isControlShowMinutess = ref(true)

function onControlStart() {
  countingControl.value = true
  countdownControlRef.value?.start()
}

function onControlStop() {
  countingControl.value = false
  countdownControlRef.value?.stop()
}

function onControlAbort() {
  countingControl.value = false
  countdownControlRef.value?.abort()
}

function onControlRestart() {
  countingControl.value = true
  countdownControlRef.value?.restart()
}

function onControlCountdownAbort() {
  console.log('event:abort')
}

function onControlCountdownStart() {
  console.log('event:start')
}

function onControlCountdownEnd() {
  countingControl.value = false
  console.log('event:end')
}

function onControlCountdownProgress(params: CountdownData) {
  console.log('event:progress', params.totalSeconds, params)
}
// endregion ////

// region Round ////
const countdownRoundRef = ref<typeof B24Countdown | null>(null)
const secondsRound = ref(15)
const countingRound = ref(false)

const startCountdownRound = async () => {
  countingRound.value = true
  countdownRoundRef.value?.start()
}

const onCountdownRoundEnd = () => {
  countingRound.value = false
}

const onCountdownRoundStop = () => {
  countdownRoundRef.value?.stop()
}
// endregion ////
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base">
      <ExampleCardSubTitle title="simple" />
      <div class="h-5 mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Countdown :seconds="secondsSimple" />
        <B24Separator decorative orientation="vertical" type="dashed" />
        <B24Countdown :seconds="secondsSimple" :show-minutes="false" />
      </div>

      <ExampleCardSubTitle title="slot" />
      <div class="mb-4 flex flex-wrap flex-col items-center justify-start gap-4">
        <B24Countdown
          v-slot="{ days, hours, minutes, seconds }"
          :seconds="secondsLong"
        >
          Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
        </B24Countdown>
      </div>

      <ExampleCardSubTitle title="custom interval" />
      <div class="mb-4 flex flex-wrap flex-col items-center justify-start gap-4">
        <B24Countdown
          v-slot="{ days, hours, minutes, seconds, milliseconds }"
          :seconds="secondsNY"
          :interval="100"
        >
          <span>New Year Countdown：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }}.<small>{{ Math.floor(milliseconds / 100) }}</small> seconds.</span>
        </B24Countdown>
      </div>

      <ExampleCardSubTitle title="transform" />
      <div class="mb-4 flex flex-wrap flex-col items-center justify-start gap-4">
        <B24Countdown
          v-slot="{ days, hours, minutes, seconds }"
          :seconds="secondsLong"
          :interval="100"
        >
          Time Remaining：{{ `${(days < 10 ? '0' : '')}${days}` }} days, {{ `${(hours < 10 ? '0' : '')}${hours}` }} hours, {{ `${(minutes < 10 ? '0' : '')}${minutes}` }} minutes, {{ `${(seconds < 10 ? '0' : '')}${seconds}` }} seconds.
        </B24Countdown>
      </div>
    </ExampleCard>

    <ExampleCard title="size">
      <template v-for="size in sizes" :key="size">
        <ExampleCardSubTitle :title="`${size}`" />
        <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
          <B24Countdown
            :size="size"
            seconds="60"
          />
          <B24Countdown
            :size="size"
            seconds="60"
            :icon="Clock2Icon"
          />
          <B24Countdown
            :size="size"
            seconds="60"
            :avatar="{ src: '/avatar/employee.png', text: 'Employee Name' }"
          />
          <B24Countdown
            as="div"
            :size="size"
            seconds="60"
            use-circle
          />
        </div>
      </template>
    </ExampleCard>

    <ExampleCard title="actions">
      <ExampleCardSubTitle title="ver 1" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24Button
          color="primary"
          size="xs"
          :disabled="counting"
          @click="startCountdown"
        >
          <B24Countdown
            v-if="counting"
            v-slot="{ totalSeconds }"
            :seconds="secondsShort"
            @end="onCountdownEnd"
            class="text-white dark:text-white text-3xs leading-none"
          >
            Fetch again {{ totalSeconds }} sec. later
          </B24Countdown>
          <span
            v-else
          >
            Fetch Verification Code
          </span>
        </B24Button>
      </div>

      <ExampleCardSubTitle title="ver 2" />
      <div class="mb-4 flex flex-wrap flex-row items-center justify-start gap-4">
        <B24Countdown
          ref="countdownV2Ref"
          :seconds="secondsShortV2"
          :need-start-immediately="false"
          :icon="Clock2Icon"
          @end="onCountdownV2End"
        />
        <B24Button
          color="primary"
          type="button"
          label="Some action"
          size="xs"
          :disabled="countingV2"
          @click="startCountdownV2"
        />
      </div>

      <ExampleCardSubTitle title="control" />
      <div class="mb-2 flex flex-wrap flex-col items-center justify-start gap-4">
        <B24Countdown
          ref="countdownControlRef"
          :seconds="secondsControl"
          :emit-events="isControlEmitEvents"
          :need-start-immediately="false"
          :show-minutes="isControlShowMinutess"
          @start="onControlCountdownStart"
          @abort="onControlCountdownAbort"
          @end="onControlCountdownEnd"
          @progress="onControlCountdownProgress"
        />
      </div>
      <B24Separator decorative type="dashed" class="mb-4" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <div class="h-5 mb-4 flex flex-wrap flex-row items-center justify-start gap-2">
          <B24Tooltip text="Start counting">
            <B24Button :disabled="countingControl" size="sm" :icon="PlayIcon" color="success" @click="onControlStart" />
          </B24Tooltip>
          <B24Separator decorative orientation="vertical" type="dashed" />
          <B24Tooltip text="Stop counting">
            <B24Button :disabled="!countingControl" size="sm" :icon="StopIcon" color="primary" @click="onControlStop" />
          </B24Tooltip>
          <B24Tooltip text="Abort counting">
            <B24Button :disabled="!countingControl" size="sm" :icon="StopHandIcon" color="link" depth="dark" @click="onControlAbort" />
          </B24Tooltip>
          <B24Tooltip text="Restart counting">
            <B24Button :disabled="!countingControl" size="sm" :icon="Refresh5Icon" color="link" depth="dark" @click="onControlRestart" />
          </B24Tooltip>
        </div>
        <B24Switch v-model="isControlShowMinutess" label="Should minutes be shown?" />
        <B24Switch v-model="isControlEmitEvents" label="Should events emit?" />
      </div>
    </ExampleCard>

    <ExampleCard title="round & button">
      <ExampleCardSubTitle title="ver 1" />
      <div class="mb-4 flex flex-wrap flex-row items-center justify-center gap-4">
        <B24Button
          v-show="countingRound"
          color="link"
          depth="normal"
          size="sm"
          @click="onCountdownRoundStop"
          class="p-0"
        >
          <div class="shrink-0 relative size-8 group">
            <B24Countdown
              as="div"
              class="size-full absolute inset-x-0 inset-y-0 z-30 group-hover:z-10 group-hover:opacity-40"
              ref="countdownRoundRef"
              :seconds="secondsRound"
              :need-start-immediately="false"
              use-circle
              size="lg"
              @end="onCountdownRoundEnd"
            />
            <Cross30Icon class="size-full opacity-0 group-hover:opacity-100 text-base-500 dark:text-base-600 group-hover:text-base-900 dark:group-hover:text-base-100 absolute inset-x-0 inset-y-0 z-20" />
          </div>
        </B24Button>
        <B24Button
          color="primary"
          type="button"
          size="sm"
          label="Some action"
          v-show="!countingRound"
          @click="startCountdownRound"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
