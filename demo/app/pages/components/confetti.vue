<script setup lang="ts">
import { ref } from 'vue'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'

usePageMeta.setPageTitle('Container')

const myCanvas = ref<HTMLCanvasElement | undefined>()
const confetti = useConfetti()

function fireConfettiWithOptions(): void {
  confetti.fire()
}

function fireConfetti(): void {
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
  <ExampleGrid v-once>
    <ExampleCard title="Actions">
      <B24Separator class="my-3" type="dotted" />
      <div class="mt-sm2 mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Button label="simple" color="link" depth="dark" @click.stop="fireConfetti" />
        <B24Button label="with options" color="default" depth="light" @click.stop="fireConfettiWithOptions" />
        <B24Button label="custom canvas" color="link" depth="dark" @click.stop="fireAtPlace" />
      </div>
    </ExampleCard>

    <ExampleCard title="Custom canvas" class="md:col-span-3">
      <B24Separator class="my-3" type="dotted" />
      <B24Container class="relative mt-sm2 mb-4">
        <canvas ref="myCanvas" class="m-auto h-64 w-1/2 rounded border border-base-300 bg-base-100 dark:border-base-600 dark:bg-base-900" />
      </B24Container>
    </ExampleCard>
  </ExampleGrid>
</template>
