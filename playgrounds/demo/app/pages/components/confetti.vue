<script setup lang="ts">
import { ref } from 'vue'
import MagicWandIcon from '@bitrix24/b24icons-vue/outline/MagicWandIcon'

const myCanvas = ref<HTMLCanvasElement | undefined>()
const confetti = useConfetti()

function fireConfetti(): void {
  confetti.fire()
}

function fireConfettiWithOptions(): void {
  confetti.create()
  confetti.fire({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  })
}

function fireAtPlace(): void {
  const confettiInstance = confetti.create(myCanvas.value, { resize: true })
  confettiInstance({
    spread: 70
  })
}
</script>

<template>
  <div class="relative size-full flex flex-col items-center justify-center ">
    <canvas ref="myCanvas" class="z-0 absolute size-full" />
    <div
      class="text-center backdrop-blur-sm bg-(--ui-color-design-outline-na-bg) border-1 border-(--ui-color-design-outline-na-stroke) text-(--ui-color-design-outline-na-content) max-w-[550px] my-[20px] mx-(--content-area-shift) px-[60px] py-[40px] rounded-[24px] flex flex-col items-center justify-center gap-[10px]"
    >
      <B24Avatar
        :icon="MagicWandIcon"
        alt="useConfetti"
        size="3xl"
        :b24ui="{
          root: 'bg-transparent ring-2 ring-(--ui-color-design-outline-na-content-icon)',
          icon: 'size-[74px] text-(--ui-color-design-outline-na-content-icon)'
        }"
      />
      <ProseH2 class="leading-[29px] mb-0">
        useConfetti
      </ProseH2>
      <ProseP accent="less">
        Performant confetti animation in the browser
      </ProseP>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-[15px]">
        <B24Button label="Simple" color="air-primary" @click.stop="fireConfetti" />
        <B24Button label="With options" color="air-secondary-accent-2" @click.stop="fireConfettiWithOptions" />
        <B24Button label="Custom canvas" color="air-secondary-accent-2" @click.stop="fireAtPlace" />
      </div>
    </div>
  </div>
</template>
