# Port: fix(components): spin trailing loading icon with avatar (#7168)

**Upstream:** `2fc9ba0cb8edae7cbc804a7ae6477361ef20defa` (nuxt/ui)
**Decision:** port

## Upstream change
The root `tv()` call gets `leading: isLeading || !!avatar || !!slots.leading`, so with an
avatar or a `#leading` slot the `loading + leading: false + trailing` compound variant
never matched and the trailing loading icon lost `animate-spin`. Upstream overrides
`leading: isLeading` on the `trailingIcon` slot call in Input, InputDate, InputMenu,
InputTags, InputTime, Select, SelectMenu and Textarea, and adds an Input test
`with loading trailing and leading slot`.

## b24ui port
- Same per-slot override applied to `b24ui.trailingIcon(...)` in all eight components.
- The fork's `useComponentIcons` `isLeading` already includes `avatar` (see the
  1f46ce11 log), so `loading + trailing + avatar` puts the loading icon on the leading
  side in the fork; the upstream avatar path does not reproduce. The `#leading` slot
  path does: `isLeading` is false, the loading icon trails, but the root `leading` is
  true.
- The fork's theme has no `animate-spin` here; its equivalent compound sets
  `trailingIcon: 'size-[21px]'` (input.ts, textarea.ts). That is what now applies. The
  other six themes have no `leading: false` compound, so the change is a no-op there,
  kept for parity.
- Not ported beyond upstream: the `noPadding` compound `base: 'pe-[34px]'` in
  input.ts/textarea.ts has the same root-`leading` mismatch; left as-is since upstream
  does not touch `base`.
- `test/components/Input.spec.ts`: upstream's `with loading trailing and leading slot`
  case added verbatim.

## Tests
Not run here. Snapshots to regenerate: `Input.spec.ts.snap` and `Input-vue.spec.ts.snap`
(new entry). No existing spec in the other components renders loading + trailing with a
leading slot/visual where the class changes, so no other snapshot is expected to change.
