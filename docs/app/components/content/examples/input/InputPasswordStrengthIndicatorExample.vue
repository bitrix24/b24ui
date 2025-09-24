<script setup lang="ts">
import ObserverIcon from '@bitrix24/b24icons-vue/outline/ObserverIcon'
import CrossedEyeIcon from '@bitrix24/b24icons-vue/outline/CrossedEyeIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import CircleCrossIcon from '@bitrix24/b24icons-vue/outline/CircleCrossIcon'

const show = ref(false)
const password = ref('')

function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /\d/, text: 'At least 1 number' },
    { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
    { regex: /[A-Z]/, text: 'At least 1 uppercase letter' }
  ]

  return requirements.map(req => ({ met: req.regex.test(str), text: req.text }))
}

const strength = computed(() => checkStrength(password.value))
const score = computed(() => strength.value.filter(req => req.met).length)

const color = computed(() => {
  if (score.value === 0) return 'air-primary'
  if (score.value <= 1) return 'air-primary-alert'
  if (score.value <= 2) return 'air-primary-warning'
  if (score.value === 3) return 'air-primary-warning'
  return 'success'
})

const text = computed(() => {
  if (score.value === 0) return 'Enter a password'
  if (score.value <= 2) return 'Weak password'
  if (score.value === 3) return 'Medium password'
  return 'Strong password'
})
</script>

<template>
  <div class="space-y-2">
    <B24FormField label="Password">
      <B24Input
        v-model="password"
        placeholder="Password"
        :color="color"
        :type="show ? 'text' : 'password'"
        :aria-invalid="score < 4"
        aria-describedby="password-strength"
        :b24ui="{ trailing: 'pe-1' }"
        class="w-full"
      >
        <template #trailing>
          <B24Button
            size="sm"
            color="air-tertiary-no-accent"
            :icon="show ? CrossedEyeIcon : ObserverIcon"
            :aria-label="show ? 'Hide password' : 'Show password'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
          />
        </template>
      </B24Input>
    </B24FormField>

    <B24Progress
      :color="color"
      :indicator="text"
      :model-value="score"
      :max="4"
      size="sm"
    />

    <p id="password-strength" class="text-(length:--ui-font-size-sm) font-(--ui-font-weight-medium)">
      {{ text }}. Must contain:
    </p>

    <ul class="space-y-1" aria-label="Password requirements">
      <li
        v-for="(req, index) in strength"
        :key="index"
        class="flex items-center gap-0.5"
        :class="req.met ? 'text-success' : 'text-(--b24ui-typography-label-color)'"
      >
        <CircleCheckIcon v-if="req.met" class="size-4 shrink-0" />
        <CircleCrossIcon v-else class="size-4 shrink-0" />

        <span class="text-(length:--ui-font-size-xs) font-(--ui-font-weight-light)">
          {{ req.text }}
          <span class="sr-only">
            {{ req.met ? ' - Requirement met' : ' - Requirement not met' }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>
