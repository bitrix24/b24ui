import { watch, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

/**
 * Workaround for the reka-ui `useHideOthers` timing bug.
 *
 * When an overlay (Modal / Slideover / Drawer — the latter via vaul-vue, which
 * itself wraps reka-ui's `DialogContent`) opens, reka-ui synchronously sets
 * `aria-hidden="true"` on sibling landmarks (e.g. `#__nuxt`). If the user's
 * focus is still on the trigger element at that moment, the browser logs:
 *
 *   "Blocked aria-hidden on an element because its descendant retained focus."
 *
 * We pre-empt that by blurring the currently focused element synchronously as
 * soon as `open` flips to `true`. By the time reka-ui applies `aria-hidden`,
 * `document.activeElement` is `<body>` and the warning is gone.
 *
 * Trade-off: focus briefly lives on `<body>` between `blur()` and the moment
 * reka-ui's focus-trap pulls it into the dialog. In jsdom and all major
 * browsers this gap is one microtask and is not user-perceptible, but very
 * strict screen readers (notably VoiceOver) may briefly announce the page
 * title before the dialog title. We accept this trade-off because the
 * alternative — leaving the warning in the console — confuses a11y audits
 * and DevTools users, and because a proper fix requires reka-ui to switch
 * `useHideOthers` to the `inert`-based `inertOthers` (already supported by
 * the `aria-hidden` package).
 *
 * Note: `flush: 'sync'` is mandatory — `blur()` must run before Vue commits
 * the DOM mutation that triggers reka-ui's `useHideOthers`. Using `nextTick`
 * or `requestAnimationFrame` would happen too late and the warning would
 * return.
 *
 * Focus return on close is unaffected: reka-ui captures the trigger element
 * in its own ref (`triggerElement`), not via `document.activeElement`.
 *
 * @see https://github.com/unovue/reka-ui/issues/1280 — TODO: remove once fixed upstream
 */
export function useBlurOnOpen(open: MaybeRefOrGetter<boolean | undefined>) {
  watch(() => toValue(open), (val) => {
    if (!val || !import.meta.client) return
    const active = document.activeElement as HTMLElement | null
    if (active && active !== document.body) active.blur()
  }, { flush: 'sync' })
}
