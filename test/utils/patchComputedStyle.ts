import { markRaw } from 'vue'

// Keep `getComputedStyle()` results out of Vue's reactive proxies.
//
// reka-ui's `usePresence` holds the declaration in a `ref`, which deep-wraps an
// object value. Reading `.display` back then calls happy-dom's getter with the
// proxy as its receiver, and happy-dom checks that receiver against the class —
// so `Drawer` threw `TypeError: Receiver must be an instance of class
// CSSStyleDeclaration` four times per run, uncaught. It stayed invisible while
// the harness mounted detached, because `getComputedStyle` on a node outside
// the document returns an empty declaration and the branch is never reached.
//
// `markRaw` sets `__v_skip`, so Vue hands the declaration through untouched.
// Values are unchanged; a computed style is a snapshot the caller re-reads, not
// something reactivity has to track. Drop this once reka-ui uses a `shallowRef`.
export function patchComputedStyle(): void {
  const original = window.getComputedStyle.bind(window)

  window.getComputedStyle = ((...args: Parameters<typeof original>) =>
    markRaw(original(...args))) as typeof window.getComputedStyle
}
