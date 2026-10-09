# Port: fix(ContentSearch/DashboardSearch): handle `undefined` selection when an item is toggled off

**Upstream:** `14f13af6b8e1e58bb239ce03eb51adbbbcef37a6` (nuxt/ui, #7170)
**Decision:** port

## Upstream change

With `selectionBehavior: 'toggle'`, `CommandPalette` emits
`update:modelValue` with `undefined` when the already-selected item is picked
again. `onSelect` in both search components read `item.disabled` and threw.
The parameter is widened to `Item | undefined`, the guard becomes
`item?.disabled`, and an `undefined` selection is treated as a regular one
(the modal closes, the search term resets). Each spec gains a test that emits
`undefined` and asserts the modal closes.

## b24ui port

Applied 1:1 to `src/runtime/components/DashboardSearch.vue` and
`src/runtime/components/content/ContentSearch.vue` (the lazy-loaded modal from
the `6f50933` port is unaffected).

Tests: the two new cases are added to `test/components/DashboardSearch.spec.ts`
and `test/components/content/ContentSearch.spec.ts`. One divergence: upstream
looks up the palette with `findComponent({ name: 'CommandPalette' })`; the
fork uses the already imported `CommandPalette` component
(`findComponent(CommandPalette)`), as the neighbouring fork tests do, so the
lookup does not depend on the component's registered name.

No snapshot changes expected (no template or theme change).
