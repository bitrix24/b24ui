<script setup lang="ts">
// import theme from '#build/b24ui/countdown'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ExampleCardSubTitle from '../../components/ExampleCardSubTitle.vue'
import Clock2Icon from '@bitrix24/b24icons-vue/main/Clock2Icon'
// import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

usePageMeta.setPageTitle('Countdown')

// const variants = Object.keys(theme.variants.variant) as Array<keyof typeof theme.variants.variant>

const now = new Date()
const newYear = new Date(now.getFullYear() + 1, 0, 1)

const timeSimple = 60
const timeShort = 15
const time = 2 * 24 * 60 * 60
const timeNY = (newYear.getTime() - now.getTime()) / 1000
const counting = ref(false)

const startCountdown = () => {
  counting.value = true
}

const onCountdownEnd = () => {
  counting.value = false
}
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="Info">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24Countdown :seconds="timeSimple" />
        <B24Countdown :seconds="timeSimple" :show-minutes="false" />
      </div>

      <ExampleCardSubTitle title="slot" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24Countdown
          v-slot="{ days, hours, minutes, seconds }"
          :seconds="time"
        >
          Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
        </B24Countdown>
      </div>

      <ExampleCardSubTitle title="custom interval" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24Countdown
          v-slot="{ days, hours, minutes, seconds, milliseconds }"
          :seconds="timeNY"
          :interval="100"
        >
          New Year Countdown：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }}.{{ Math.floor(milliseconds / 100) }} seconds.
        </B24Countdown>
      </div>

      <ExampleCardSubTitle title="transform" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24Countdown
          v-slot="{ days, hours, minutes, seconds }"
          :seconds="time"
          :interval="100"
        >
          Time Remaining：{{ `${(days < 10 ? '0' : '')}${days}` }} days, {{ `${(hours < 10 ? '0' : '')}${hours}` }} hours, {{ `${(minutes < 10 ? '0' : '')}${minutes}` }} minutes, {{ `${(seconds < 10 ? '0' : '')}${seconds}` }} seconds.
        </B24Countdown>
      </div>
    </ExampleCard>

    <ExampleCard title="actions">
      <ExampleCardSubTitle title="countdown on demand" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24Button
          color="success"
          type="button"
          :disabled="counting"
          @click="startCountdown"
        >
          <B24Countdown
            v-if="counting"
            v-slot="{ totalSeconds }"
            :seconds="timeShort"
            @end="onCountdownEnd"
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
    </ExampleCard>

    <ExampleCard title="Icon">
      <ExampleCardSubTitle title="simple" />
      <div class="mb-4 flex flex-wrap flex-col items-start justify-start gap-4">
        <B24Countdown v-slot="{ formatTime }" :seconds="timeSimple" class="m-1.5">
          <Clock2Icon class="size-5" />
          {{ formatTime }}
        </B24Countdown>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
