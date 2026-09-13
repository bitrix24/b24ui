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

/**
 * `canvas-confetti`, shared so every caller fires onto one canvas.
 *
 * @returns `fire(options)` for the default canvas, and `create(canvas, options)`
 *   for one of your own — a fixed-position canvas of your own is what you want
 *   if the confetti has to sit above a modal.
 *
 * @example
 * ```ts
 * const { fire } = useConfetti()
 *
 * fire({ particleCount: 120, spread: 70 })
 * ```
 */
export const useConfetti = createSharedComposable(_useConfetti)
