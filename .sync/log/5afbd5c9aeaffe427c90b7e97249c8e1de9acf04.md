# Port: fix(Modal): emit transition events from overlay when scrollable

**Upstream:** `5afbd5c9aeaffe427c90b7e97249c8e1de9acf04` (nuxt/ui)
**Decision:** port — verbatim

## Upstream change
In `scrollable` mode the Modal renders its content *inside* `DialogOverlay`, so
the overlay is the element that actually transitions. The transition events
were still wired only to `DialogContent`, so `enter` / `after:enter` / `leave` /
`after:leave` fired against the wrong element's lifecycle. The fix:

- guard the content handlers with `!props.scrollable && emits(...)`,
- add the same four handlers to the `scrollable` branch's `DialogOverlay`.

## b24ui port
- **`src/runtime/components/Modal.vue`** — applied both hunks verbatim. b24ui's
  Modal has the identical structure: the same `scrollable` prop ("enables
  scrollable overlay mode where content scrolls within the overlay"), the same
  four emits on `DialogContent`, and the same
  `v-if="props.scrollable"` branch wrapping `<ReuseContentTemplate />` in
  `DialogOverlay`. Only the theme accessor differs (`b24ui.overlay(...)` vs
  upstream's `ui.overlay(...)`), which is preserved.

## Tests
Event-wiring change with no markup or class impact — no snapshot drift. Suite
unchanged: 5565 passed / 6 skipped.

## Verify (CI=true)
`lint` · `typecheck` · `test` · `build` — all green.
