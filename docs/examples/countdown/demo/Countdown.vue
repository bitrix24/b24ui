<script setup lang="ts">
import { ref } from 'vue'
import Clock2Icon from '@bitrix24/b24icons-vue/main/Clock2Icon'

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
</script>

<template>
  <B24Countdown :seconds="secondsSimple" />
  <B24Countdown :seconds="secondsSimple" :show-minutes="false" />
  <B24Countdown
    v-slot="{ days, hours, minutes, seconds }"
    :seconds="secondsLong"
  >
    Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
  </B24Countdown>
  <B24Countdown
    v-slot="{ days, hours, minutes, seconds, milliseconds }"
    :seconds="secondsNY"
    :interval="100"
  >
    <span>New Year Countdown：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }}.<small>{{ Math.floor(milliseconds / 100) }}</small> seconds.</span>
  </B24Countdown>
  <B24Countdown
    size="xl"
    seconds="60"
  />
  <B24Countdown
    size="lg"
    seconds="60"
    :icon="Clock2Icon"
  />
  <B24Countdown
    size="lg"
    seconds="60"
    :avatar="{ src: '/b24ui/avatar/employee.png', text: 'Employee Name' }"
  />
  <B24Countdown
    as="div"
    size="lg"
    seconds="60"
    use-circle
  />
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
      class="text-white dark:text-white text-3xs leading-none"
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
</template>
