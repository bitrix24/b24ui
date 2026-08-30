import { markRaw } from 'vue'

// Keep `getComputedStyle()` results out of Vue's reactive proxies.
//
// Why this exists:
//   reka-ui's `usePresence` holds the declaration in a `ref`, and `ref()`
//   deep-wraps an object value in `reactive()`. Reading `stylesRef.value.display`
//   then calls happy-dom's getter with the Proxy as its receiver, and happy-dom
//   checks that receiver against the class — so it throws
//   `TypeError: Receiver must be an instance of class CSSStyleDeclaration`.
//
//   It stayed invisible while the test harness mounted detached: `getComputedStyle`
//   on a node that is not in the document returns an empty declaration and the
//   branch reading `display` is never reached. Attaching to `document.body` (#513)
//   made it reachable, and `Drawer.spec.ts` threw it four times per run — as an
//   *uncaught* error, which fails the whole run without failing a test.
//
//   `markRaw` sets `__v_skip` on the declaration, so Vue hands it through
//   untouched and the getter sees the real instance. Nothing else about the
//   object changes, and reactivity is not something a computed style has to
//   offer: it is a snapshot the caller re-reads.
//
// This belongs to the harness, not to `src/`: the same code in a browser never
// throws, because a browser's `CSSStyleDeclaration` getters do not police their
// receiver. Fixed upstream by making that `ref` a `shallowRef`; until then this
// is the seam we own.
export function patchComputedStyle(): void {
  const original = window.getComputedStyle.bind(window)

  window.getComputedStyle = ((...args: Parameters<typeof original>) =>
    markRaw(original(...args))) as typeof window.getComputedStyle
}
