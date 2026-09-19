# no-op — nuxt/ui@a96823da9f350d17ebaba321cae1cfc4de62eccc

**Upstream:** fix(Table): inset row focus outline (#6973)

**Decision:** no-op — the counterpart exists, but the declaration this commit
refines does not, so the added utility would have nothing to act on.

## Upstream change

One class on the `tbody` slot of `src/theme/table.ts`, plus the snapshots it
moves:

```
+ [&>tr]:data-[selectable=true]:-outline-offset-3
```

Upstream's `tbody` already carried `[&>tr]:data-[selectable=true]:outline-primary/25`
and `[&>tr]:data-[selectable=true]:focus-visible:outline-3`. The offset pulls
that 3px outline **inside** the row, so it is not clipped by the neighbouring
row and does not overlap the divider.

## Why it is a no-op here

`src/theme/table.ts` exists, the `tbody` slot exists, and it has focus-visible
outline classes of its own — so this is not a missing counterpart. What is
missing is the **outline itself**.

The fork's `tbody` declares a colour and nothing else:

```
[&>tr]:data-[selectable=true]:focus-visible:outline-(--ui-color-design-outline-focused-stroke)
[&>tr]:data-[selected=true]:focus-visible:outline-(--ui-color-design-outline-focused-stroke)
```

Upstream's `outline-3` is what supplies `outline-style` and `outline-width`; the
fork has no equivalent. `-outline-offset-3` emits `outline-offset` alone, so
porting it would add an offset to an outline this theme never paints — a
declaration with no observable effect, in any browser, under any variant.

## Measured, not reasoned

Checked against emitted CSS rather than read off the source, because "these
classes look similar" is exactly the reading that would file this as a port.
Every string literal in `src/theme/table.ts` — 84 distinct classes — was fed to
the Tailwind CLI and the output counted:

| declaration | occurrences |
| --- | --- |
| `outline-color` | 2 |
| `outline-style` | **0** |
| `outline-width` | **0** |

And the three utilities side by side, from the same build:

```
outline-3           => outline-style: var(--tw-outline-style); outline-width: 3px
-outline-offset-3   => outline-offset: calc(3px * -1)
outline-(--ui-…)    => outline-color: var(--ui-…)
```

The single `ring` hit in that output is Tailwind's preflight
`:-moz-focusring:where(:not(iframe)) { outline: auto }`, not a utility on a row,
so the fork is not using a ring in place of an outline either.

`src/runtime/components/Table.vue` adds no outline class of its own (grep:
nothing), and `src/runtime/assets/css/` has none.

## The finding this turned up

`Table.vue:575,579` gives a selectable row `data-selectable="true"` and, when
`onSelect` is bound, `tabindex="0"`. Those rows are genuinely keyboard-focusable,
and the theme names a dedicated design token for their focus ring —
`--ui-color-design-outline-focused-stroke` — so painting one is clearly the
intent.

With `outline-style` never set, that token cannot take effect: the author
declares a colour for an outline the stylesheet does not draw, and what the user
sees falls back to whatever the browser does by default for a focusable `<tr>`.
Where a browser draws its own `outline: auto`, the declared colour is ignored,
because `auto` uses the UA's colour. Either way the design token is dead.

That is a real defect — a keyboard focus indicator that the theme intends and
does not deliver — and it is **not** this commit. It predates it and would exist
if upstream had never written #6973.

**Deliberately not fixed here.** Adding `outline-width`/`outline-style` changes
what the component renders, needs its own before/after measurement and snapshot
review, and would turn a no-op entry into a silent behaviour change hidden
inside sync bookkeeping. Filed separately as `fix(Table)`, where the offset from
this commit belongs too: once the outline is actually painted, upstream's
`-outline-offset-3` becomes applicable and should land with it rather than
before it.

## Verification (gate ON)

No `src/` change, so nothing to re-measure beyond the ledger and the snapshot
guard. Full gate run recorded in the PR.
