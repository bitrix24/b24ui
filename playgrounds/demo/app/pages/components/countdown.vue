<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/countdown'
import B24Countdown from '@bitrix24/b24ui-nuxt/components/Countdown.vue'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import PlayIcon from '@bitrix24/b24icons-vue/button/PlayIcon'
import StopIcon from '@bitrix24/b24icons-vue/button/StopIcon'
import StopHandIcon from '@bitrix24/b24icons-vue/main/StopHandIcon'
import Refresh5Icon from '@bitrix24/b24icons-vue/actions/Refresh5Icon'
import Clock2Icon from '@bitrix24/b24icons-vue/main/Clock2Icon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const isUseBg = ref(true)

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

function onControlCountdownProgress(params: any) {
  console.log('event:progress', params.totalSeconds, params)
}
// endregion ////

// region Round ////
const secondsRound = ref(15)
const countingRound = ref(false)

const startCountdownRound = async () => {
  countingRound.value = true
}

const onCountdownRoundEnd = () => {
  countingRound.value = false
}

const onCountdownRoundStop = () => {
  countingRound.value = false
}
// endregion ////
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="base" :use-bg="isUseBg" class="sm:col-span-2 md:col-span-4">
      <ExampleCardSubTitle title="simple" />
      <div class="h-5 mb-4 flex flex-wrap items-center justify-center gap-4">
        <B24Countdown :seconds="secondsSimple" />
        <B24Separator decorative orientation="vertical" type="dashed" accent="accent" />
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

    <ExampleCard title="size" :use-bg="isUseBg">
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
            :avatar="{ src: '/b24ui/demo/avatar/employee.png', text: 'Employee Name' }"
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

    <ExampleCard title="actions" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24Button
          color="air-primary"
          size="sm"
          :disabled="counting"
          @click="startCountdown"
        >
          <B24Countdown
            v-if="counting"
            v-slot="{ totalSeconds }"
            :seconds="secondsShort"
            class="text-(--ui-font-size-3xs)/(--ui-font-line-height-reset)"
            @end="onCountdownEnd"
          >
            Fetch again {{ totalSeconds }} sec. later
          </B24Countdown>
          <span v-else>
            Fetch Verification Code
          </span>
        </B24Button>
      </div>

      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-row items-center justify-start gap-4">
        <B24Countdown
          ref="countdownV2Ref"
          class="text-(--b24ui-typography-label-color)"
          :seconds="secondsShortV2"
          :need-start-immediately="false"
          :icon="Clock2Icon"
          @end="onCountdownV2End"
        />
        <B24Button
          color="air-secondary"
          label="Some action"
          size="sm"
          :disabled="countingV2"
          @click="startCountdownV2"
        />
      </div>

      <ExampleCardSubTitle title="control" />
      <div class="mb-2 flex flex-wrap flex-col items-center justify-start gap-4">
        <B24Countdown
          ref="countdownControlRef"
          class="text-(--b24ui-typography-label-color)"
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
            <B24Button
              :disabled="countingControl"
              size="sm"
              :icon="PlayIcon"
              color="air-primary-success"
              @click="onControlStart"
            />
          </B24Tooltip>
          <B24Separator decorative orientation="vertical" type="dashed" />
          <B24Tooltip text="Stop counting">
            <B24Button
              :disabled="!countingControl"
              size="sm"
              :icon="StopIcon"
              color="air-primary"
              @click="onControlStop"
            />
          </B24Tooltip>
          <B24Tooltip text="Abort counting">
            <B24Button
              :disabled="!countingControl"
              size="sm"
              :icon="StopHandIcon"
              color="air-tertiary"
              @click="onControlAbort"
            />
          </B24Tooltip>
          <B24Tooltip text="Restart counting">
            <B24Button
              :disabled="!countingControl"
              size="sm"
              :icon="Refresh5Icon"
              color="air-tertiary"
              @click="onControlRestart"
            />
          </B24Tooltip>
        </div>
        <B24Switch v-model="isControlShowMinutess" label="Should minutes be shown?" />
        <B24Switch v-model="isControlEmitEvents" label="Should events emit?" />
      </div>
    </ExampleCard>

    <ExampleCard title="round & button" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap flex-row items-center justify-center gap-4">
        <B24Button
          v-if="countingRound"
          color="air-tertiary-no-accent"
          size="sm"
          class="p-0 rounded-full"
          :b24ui="{ baseLine: 'ps-0 pe-0' }"
          @click="onCountdownRoundStop"
        >
          <div class="shrink-0 relative size-8 group">
            <B24Countdown
              as="div"
              class="size-full absolute inset-x-0 inset-y-0 z-30 group-hover:z-10 group-hover:opacity-40"
              :seconds="secondsRound"
              use-circle
              size="lg"
              @end="onCountdownRoundEnd"
              @click="onCountdownRoundEnd"
            />
            <Cross30Icon
              class="cursor-pointer size-full opacity-0 group-hover:opacity-100 text-(--b24ui-typography-legend-color) group-hover:text-(--b24ui-typography-legend-color) absolute inset-x-0 inset-y-0 z-20"
              @click="onCountdownRoundEnd"
            />
          </div>
        </B24Button>
        <B24Button
          v-if="!countingRound"
          color="air-primary"
          size="sm"
          label="Some action"
          @click="startCountdownRound"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
