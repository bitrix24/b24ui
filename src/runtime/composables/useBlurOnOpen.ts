import { watch, toValue, nextTick } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

/**
 * Workaround for the reka-ui `useHideOthers` timing bug.
 *
 * When an overlay (Modal / Slideover / Drawer — the latter via vaul-vue, which
 * itself wraps reka-ui's `DialogContent`) opens, reka-ui synchronously sets
 * `aria-hidden="true"` on sibling landmarks (e.g. `#app` / `#__nuxt`). If the
 * user's focus is still on the trigger element at that moment, the browser logs:
 *
 *   "Blocked aria-hidden on an element because its descendant retained focus."
 *
 * We pre-empt that by blurring the currently focused element synchronously as
 * soon as `open` flips to `true`. By the time reka-ui applies `aria-hidden`,
 * `document.activeElement` is `<body>` and the warning is gone.
 *
 * Two trigger paths are covered:
 *   - Controlled flip: parent sets `:open` / `v-model:open` to `true`
 *     (handled by the `watch` on the open ref).
 *   - Uncontrolled flip: user clicks the built-in `<DialogTrigger>` / `<DrawerTrigger>`
 *     slot, reka-ui mutates its internal state and emits `update:open`
 *     (handled by the wrapped emits function returned below).
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
 * Focus return on close needs care, and the first version of this composable
 * got it wrong. reka-ui restores focus to `triggerElement`, which its
 * `DialogTrigger` sets when the built-in trigger slot is used — but that slot
 * is optional (`v-if="!!slots.default"`), and for a programmatic open
 * (`useOverlay()`, or a bare `v-model:open`) reka-ui falls back to capturing
 * `document.activeElement` when the content mounts, *and only if it is not
 * `<body>`. This blur runs first, so the capture found `<body>` and skipped,
 * `triggerElement` stayed null, and the `.focus()` on close was a silent
 * no-op: focus was stranded on `<body>` until the user tabbed back in.
 *
 * So whatever is blurred here is remembered and restored when `open` goes
 * false — but only if nothing else claimed focus in the meantime, so the
 * trigger-slot path, where reka-ui restores correctly on its own, is left
 * alone.
 *
 * Every site that has to be revisited when upstream fixes this is tagged
 * `reka-ui#1280`, so `grep -rn 'reka-ui#1280' src/ test/` lists the whole set —
 * this file, the components that wrap it, and the specs that assert it. The
 * authoritative list lives in `test/utils/blur-on-open-workaround.spec.ts`,
 * which also fails the day upstream ships the fix. #159 tracks the removal.
 *
 * @see https://github.com/unovue/reka-ui/issues/1280 — TODO: remove once fixed upstream
 */
function activeElement(): HTMLElement | null {
  if (!import.meta.client) return null

  const active = document.activeElement as HTMLElement | null

  return active && active !== document.body ? active : null
}

/**
 * Wraps a component's `emit` so the focused element is blurred while an
 * overlay is open, and given its focus back when it closes.
 *
 * Works around a Chromium behaviour where a focused control under a modal
 * keeps receiving keystrokes. The blurred element is remembered per instance,
 * not globally — two overlays open at once must not share one slot, or the
 * second to close hands focus to the wrong place.
 *
 * @param open The overlay's open state.
 * @param emits The component's `emit`, returned wrapped.
 * @returns The same `emit`, with the blur and restore attached.
 */
export function useBlurOnOpen<E extends (event: any, ...args: any[]) => any>(
  open: MaybeRefOrGetter<boolean | undefined>,
  emits: E
): E {
  // Whatever this composable blurred, so it can be handed back on close.
  // Per instance: two overlays open at once must not share one slot.
  let blurred: HTMLElement | null = null

  function blurActiveElement() {
    const active = activeElement()

    if (!active) return

    blurred = active
    active.blur()
  }

  async function restoreFocus() {
    const target = blurred

    blurred = null

    if (!target || !import.meta.client) return

    // Let reka-ui's own close handling run first — where it works, on the
    // trigger-slot path, it wins and this does nothing. Waiting one tick is
    // not enough: at that point focus is still on a control inside the
    // overlay that is only now unmounting, which reads as "someone else has
    // it" and would skip the restore. The overlay is gone by the next
    // macrotask.
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))

    if (!target.isConnected) return

    const holder = activeElement()

    // Something outside the overlay legitimately took focus — leave it there.
    if (holder && holder.isConnected) return

    target.focus()
  }

  watch(() => toValue(open), (val) => {
    if (val) blurActiveElement()
    else void restoreFocus()
  }, { flush: 'sync' })

  return ((event: any, ...args: any[]) => {
    if (event === 'update:open' && args[0] === true) blurActiveElement()
    if (event === 'update:open' && args[0] === false) void restoreFocus()
    return emits(event, ...args)
  }) as E
}
