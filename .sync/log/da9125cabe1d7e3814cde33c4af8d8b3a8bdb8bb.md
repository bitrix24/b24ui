# port — nuxt/ui@da9125cabe1d7e3814cde33c4af8d8b3a8bdb8bb

**Upstream:** fix(Table): respect `defaultColumn` cell and header (#7198)

**Decision:** port

## Problem
TanStack resolves each column as `{ ...defaultColumn, ...columnDef }`, so the
fallback `header` (auto-generated columns) and `cell` (from `processColumns`)
that Table injects shadowed any `header`/`cell` passed via `defaultColumn`.

## Change
- **src/runtime/components/Table.vue** — auto-generated columns only get the
  `upperFirst(accessorKey)` header when `defaultColumn.header` is undefined;
  `processColumns` only injects the fallback cell when neither the column nor
  `defaultColumn` provides one.
- **test/components/Table.spec.ts** — `defaultColumn` describe block (4 cases:
  explicit columns, auto header, auto cell, column's own cell wins).

## Adaptations
- None needed: the affected code is line-for-line identical to upstream's
  pre-image; the patch applied cleanly. No docs change upstream. No snapshot
  changes expected.
