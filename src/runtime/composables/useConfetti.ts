/**
 * Confetti
 * Performant confetti animation in the browser
 * ---
 * @link https://github.com/catdad/canvas-confetti
 * @link https://www.kirilv.com/canvas-confetti/
 * @link /api_d7/bitrix/ui/confetti/index.php
 * @see bitrix/js/ui/confetti
 */
import confetti from 'canvas-confetti'
import type { CreateTypes, GlobalOptions } from 'canvas-confetti'
import { createSharedComposable } from '@vueuse/core'

function _useConfetti() {
  const fire: (options?: confetti.Options) => Promise<undefined> | null = confetti
  const create: (canvas?: HTMLCanvasElement, options?: GlobalOptions) => CreateTypes = confetti.create

  return {
    fire,
    create
  }
}

export const useConfetti = createSharedComposable(_useConfetti)
