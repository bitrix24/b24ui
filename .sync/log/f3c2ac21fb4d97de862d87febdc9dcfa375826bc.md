# Port: fix(Slider): bind form aria attributes on thumbs instead of root

**Upstream:** `f3c2ac21fb4d97de862d87febdc9dcfa375826bc` (nuxt/ui, #6768)
**Decision:** port — verbatim, against `Range`

## Upstream change

`useFormField`'s `ariaAttrs` — `aria-invalid`, `aria-describedby` — were spread
onto `SliderRoot`. That element renders no `role`, so assistive technology read
an invalid slider as valid and never reached the error text. The widget is the
**thumb**, which is what carries `role="slider"`, so the attributes move there.

```diff
-    v-bind="{ ...rootProps, ...ariaAttrs }"
+    v-bind="rootProps"
...
-        <SliderThumb … :aria-label="…" />
+        <SliderThumb … :aria-label="…" v-bind="ariaAttrs" />
```

Both thumb sites, the tooltip-wrapped one and the bare one.

## b24ui port

**This fork's component is `Range`.** Upstream's `Slider` was renamed here; the
divergence is recorded in §1 since #423, which exists because this very commit
was first reported as a no-op on the grounds that no `Slider` component exists.
Only the wrapper is renamed — every reka-ui export inside the file keeps its own
name, so `SliderRoot` and `SliderThumb` needed no rewriting and the diff is
upstream's line for line, `ui` → `b24ui` aside.

The defect was ours in full: `Range.vue:120` carried the identical
`v-bind="{ ...rootProps, ...ariaAttrs }"`, and both `SliderThumb` sites lacked
the attributes.

## Tests

Upstream's case, with the guard renamed to `name === 'Range'`. Our
`FormField.spec.ts` keys `describe.each` off `__name`, so the block is reachable
only if that value is exactly `Range` — **verified rather than assumed**, since
a guard that never matches is a test that passes without running:

```
✓ |nuxt| … > FormField > Range integration > binds aria attributes on the thumb
```

Two mutations, each failing on a *different* assertion, which is what shows both
are load-bearing:

- **full revert** (attributes back on the root, off the thumbs) fails the role
  check — `expected undefined to be 'slider'`, i.e. the invalid element is the
  root;
- **half revert** (attributes on root *and* thumbs) fails the count —
  `to have a length of 1 but got 2`, i.e. duplicated rather than moved.

## Why no snapshot moved

Worth recording, because a silent snapshot suite usually means a change did
nothing. Here it means the opposite. `Range.spec.ts` renders the component
standalone, outside a `FormField`, so `useFormField` yields an **empty**
`ariaAttrs` — moving an empty object from root to thumb changes no rendered
attribute. The 20 `role="slider"` occurrences in those snapshots come from
reka-ui and never carried `aria-invalid` at all.

So the snapshots could not have caught this defect, which is why the fix is
pinned by a `FormField`-level test instead.

## Verify (CI=true)

`lint` · `typecheck` · `test` (6708 passed, 6 skipped, 294 files) · `build` —
all green. No `docs:generate`: the commit touches no `docs/`.
