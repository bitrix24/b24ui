<script setup lang="ts">
import { ref } from 'vue'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
import Refresh9Icon from '@bitrix24/b24icons-vue/crm/Refresh9Icon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

const myCanvas = ref<HTMLCanvasElement | undefined>()
const confetti = useConfetti()

const toast = useToast()

const colorList = [
  'default' as const,
  'danger' as const,
  'success' as const,
  'warning' as const,
  'primary' as const,
  'secondary' as const,
  'collab' as const,
  'ai' as const
]
const colorMain = ref(colorList[0])

const isShowAdvice = ref(false)

function fireAtPlace(): void {
  const confettiInstance = confetti.create(myCanvas.value, { resize: true })
  confettiInstance({ spread: 70 })
}

const actionColor = () => {
  fireAtPlace()
  colorMain.value = colorList[(colorList.indexOf(colorMain.value) + 1) % colorList.length]
}

const onClick = () => {
  toast.add({
    title: 'Deal on Hold: Attention Required',
    description: 'Let\'s signal the manager that the deal is not moving.',
    color: colorMain.value,
    icon: RocketIcon,
    actions: [{
      icon: Refresh9Icon,
      label: 'Click Me',
      color: colorMain.value,
      onClick: (e) => {
        e?.stopPropagation()
        isShowAdvice.value = true

        actionColor()
      }
    }]
  })

  return new Promise<void>(res => setTimeout(res, 5000))
}

defineShortcuts({
  shift_a: () => actionColor()
})
</script>

<template>
  <canvas
    ref="myCanvas"
    class="absolute top-0 left-0 right-0 bottom-0 z-0 w-full h-full"
  />
  <div class="h-[200px] flex flex-col items-center justify-center">
    <B24Advice
      v-if="isShowAdvice"
      :avatar="{ src: '/b24ui/avatar/assistant.png' }"
    >
      <div class="font-bold">
        Deal on Hold: Attention Required
      </div>
      <div class="mb-2">
        Let's signal the manager that the deal is not moving.
      </div>
      <B24Separator
        :icon="Bitrix24Icon"
      />
      <B24Switch v-model="isShowAdvice" :color="colorMain" label="Switch Me" />
    </B24Advice>
    <div
      v-else
    >
      <B24Tooltip
        text="Change color by hot key"
        :kbds="['shift', 'a']"
        :delay-duration="0"
      >
        <B24Button
          :color="colorMain"
          label="Click Me"
          :icon="RocketIcon"
          use-clock
          loading-auto
          @click="onClick"
        />
      </B24Tooltip>
    </div>
  </div>
</template>
