# port — nuxt/ui@4bfd115418fdbd2c4419bac1b53aa7dcdc7e8f8a

**Upstream:** fix(utils): prevent prototype pollution in `set` and `setAtPath` (#7077)

**Decision:** port, with deviations.

Upstream closes prototype pollution in `set()` (`utils/index.ts`) and
`setAtPath()` (`utils/form.ts`) by rewriting `set()` around a denylist of
`__proto__` / `constructor` / `prototype` that silently drops the write, and by
routing `getAtPath` / `setAtPath` through `get()` / `set()`.

**The security half was already here, and stricter.** The fork hardened both
walkers on its own (#92) through the shared `utils/prototype-guard.ts`: a
prototype key anywhere in the path throws `TypeError` instead of being dropped,
and the walk descends only into *own* containers, so `set({}, 'toString.x', 1)`
— which upstream's denylist still lets through to `Object.prototype.toString`,
since no segment is a reserved word — cannot reach a shared intrinsic either.
That guard is kept as it is. Upstream's own pollution cases (including the
array-in-array segment and the object whose `toString` returns `'__proto__'`)
are already refused here by `isPrototypeKey`'s coercion; they throw rather than
no-op, which is the recorded divergence.

**The behaviour half is ported.** The rewrite also fixed three things the fork
had not:

1. `get()` cast each string segment with `Number()`, which accepts hex and
   leading zeros, so `'a.0x10'` read `a[16]` and `'a.01'` read `a[1]`.
   `toPath()` now keeps segments as strings.
2. `set()` only ever created plain objects; it now creates an array when the
   next segment is a canonical index (`items.0.label`), as `setAtPath` already
   did. The index test is shared (`isIndexKey`, upstream's
   `/^(?:0|[1-9]\d*)$/`) and replaces `setAtPath`'s `Number()`-based one, which
   had the same hex/empty-string problem.
3. A primitive in the middle of a path was descended into, so
   `set({ b: 'str' }, 'b.c', 2)` threw a strict-mode `TypeError`. `ownContainer`
   now replaces any own value that cannot hold properties, as it already did
   for `null` / `undefined`.

**Deviations:** prototype keys throw (fork, #92) instead of being dropped;
`getAtPath` / `setAtPath` keep their own walkers over the shared guard instead
of delegating to `get()` / `set()`, since `getAtPath` refuses inherited
prototype keys the same way `get()` does and `setAtPath`'s error names itself.
Upstream's new `test/utils/index.spec.ts` is not copied — the fork's file is
its own and already covers the pollution cases; only the behaviour cases were
added, to both specs. Each new case fails with the `src/` change reverted.
