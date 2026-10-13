import type { Ref, InjectionKey } from 'vue'
import { ref, nextTick, inject } from 'vue'
import { useState } from '#imports'
import type { ToastEmits, ToastProps } from '../components/Toast.vue'
import type { EmitsToProps } from '../types/utils'

/**
 * How many toasts `Toaster` keeps on screen at once, provided by `Toaster`
 * itself and read by `useToast`. Older toasts fall off the end; `0` clears
 * them all.
 */
export const toastMaxInjectionKey: InjectionKey<Ref<number | undefined>> = Symbol('bitrix24-ui.toast-max')

export interface Toast extends Omit<ToastProps, 'defaultOpen'>, EmitsToProps<ToastEmits> {
  id: string | number
  onClick?: (toast: Toast) => void
  /** @internal */
  _duplicate?: number
  /** @internal */
  _updated?: boolean
  /** @internal */
  _animatedAt?: number
}

/**
 * How long a toast counts as still animating after it entered or pulsed.
 * Covers the longest of the `toaster` theme's slide-in (200ms) and pulse
 * (300ms) animations.
 */
const ANIMATION_DURATION = 300

/**
 * The queue behind `Toaster`. Every call returns the same shared list, so a
 * toast raised from a composable, a store or a route handler reaches whichever
 * `Toaster` is mounted.
 *
 * Toasts are queued rather than pushed straight in: duplicates are merged at
 * display time, by `id`, no matter which `useToast()` instance queued them.
 * Pass an explicit `id` to make a repeated notification collapse into one
 * instead of stacking.
 *
 * Requires a `<B24Toaster />` in the tree — without one the toasts accumulate
 * and nothing renders them.
 *
 * @returns The live `toasts` list plus `add`, `update`, `remove` and `clear`.
 *   `add` returns the toast it created, whose `id` is what `update` and
 *   `remove` take.
 *
 * @example
 * ```ts
 * const toast = useToast()
 *
 * const { id } = toast.add({ title: 'Saving…', color: 'air-primary' })
 * await save()
 * toast.update(id, { title: 'Saved', color: 'air-primary-success' })
 * ```
 *
 * @see https://bitrix24.github.io/b24ui/docs/composables/use-toast/
 */
export function useToast() {
  const toasts = useState<Toast[]>('toasts', () => [])
  const max = inject(toastMaxInjectionKey, undefined)

  const running = ref(false)
  const queue: Toast[] = []

  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

  function mergeDuplicate(index: number, toast: Toast) {
    const existing = toasts.value[index] as Toast
    const now = Date.now()
    // The pulse replaces the slide-in, and two pulses in the same tick cancel each other out, so skip it while the toast is still animating.
    const animating = now - (existing._animatedAt || 0) < ANIMATION_DURATION

    toasts.value[index] = {
      ...existing,
      ...toast,
      _duplicate: animating ? existing._duplicate : (existing._duplicate || 0) + 1,
      _animatedAt: animating ? existing._animatedAt : now
    }
  }

  async function processQueue() {
    if (running.value || queue.length === 0) {
      return
    }

    running.value = true

    while (queue.length > 0) {
      await nextTick()

      const toast = queue.shift()!
      const maxValue = max?.value ?? 5
      if (maxValue <= 0) {
        if (toasts.value.length) {
          toasts.value = []
        }
        continue
      }

      // Dedupe at display time so duplicate ids merge no matter which useToast() instance queued them.
      const existingIndex = toasts.value.findIndex((t: Toast) => t.id === toast.id)
      if (existingIndex !== -1) {
        mergeDuplicate(existingIndex, toast)
        continue
      }

      toasts.value = [...toasts.value, { ...toast, _animatedAt: Date.now() }].slice(-maxValue)
    }

    running.value = false
  }

  function add(toast: Partial<Toast>): Toast {
    const body = {
      id: generateId(),
      open: true,
      ...toast
    } as Toast

    const existingIndex = toasts.value.findIndex((t: Toast) => t.id === body.id)
    if (existingIndex !== -1) {
      mergeDuplicate(existingIndex, body)

      return body
    }

    queue.push(body)

    processQueue()

    return body
  }

  function update(id: string | number, toast: Omit<Partial<Toast>, 'id'>) {
    const index = toasts.value.findIndex((t: Toast) => t.id === id)
    if (index !== -1) {
      toasts.value[index] = {
        ...toasts.value[index] as Toast,
        ...toast,
        duration: toast.duration,
        open: true,
        _updated: true
      }

      nextTick(() => {
        const i = toasts.value.findIndex((t: Toast) => t.id === id)
        if (i !== -1 && toasts.value[i]!._updated) {
          toasts.value[i] = {
            ...toasts.value[i] as Toast,
            _updated: undefined
          }
        }
      })
    }
  }

  function remove(id: string | number) {
    const index = toasts.value.findIndex((t: Toast) => t.id === id)
    if (index !== -1 && toasts.value[index]!._updated) {
      return
    }

    if (index !== -1) {
      toasts.value[index] = {
        ...toasts.value[index] as Toast,
        open: false
      }
    }

    setTimeout(() => {
      toasts.value = toasts.value.filter((t: Toast) => t.id !== id)
    }, 200)
  }

  function clear() {
    toasts.value = []
  }

  return {
    toasts,
    add,
    update,
    remove,
    clear
  }
}
