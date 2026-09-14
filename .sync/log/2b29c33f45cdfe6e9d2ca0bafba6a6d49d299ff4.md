# port — nuxt/ui@2b29c33f45cdfe6e9d2ca0bafba6a6d49d299ff4

**Upstream:** fix(Form): clear only the targeted field inside a nested form (#6923)

**Decision:** port, verbatim.

## The defect

`clear(name)` walked the nested forms, and for each one that matched the target
it called `form.api.clear()` — **with no argument**, which clears that form
entirely. So clearing a single field inside a nested form wiped every error in
it.

The fix passes the target down, translated into the nested form's own namespace:
`form.api.clear(getNestedTarget(name, form.name || ''))`.

**The pattern was already one function above.** `setErrors` does exactly this at
`Form.vue:397` — `form.api.setErrors(formErrors, getNestedTarget(name, form.name || ''))`
— and both helpers, `matchesTarget` and `getNestedTarget`, were already here.
`clear` was the one path that skipped it. Same shape as the `isEmpty` case in
`6d6737af`: the fork had the right tool in hand and one call site not using it.

## The RegExp guard

`name instanceof RegExp ? undefined : …` is not defensive padding. A RegExp
target is written against the **parent's** prefixed names (`/nested.*/`), so it
cannot be re-tested inside the nested form, where the names have no prefix.
Translating it would match nothing and clear nothing; passing `undefined` keeps
the old whole-form behaviour, which is the correct reading of a pattern that
matched the form itself.

## b24ui port

Applies verbatim — our pre-image is upstream's line for line, and both helpers
exist here unchanged.

## Tests

Upstream's case, plus their new `FormNestedFields` fixture adapted to this fork's
components (`B24Form`, `B24FormField`, `B24Input`).

The fixture is needed rather than convenient: `FormNested` has a **single**
nested field, and one field cannot show the difference between "clear this one"
and "clear them all".

Mutation-checked, and the two halves are covered by different tests:

| mutation | result | which test |
| --- | --- | --- |
| revert the port | **2 red** | the new nested-path case |
| drop the RegExp guard, always translate | **2 red** | `clear works with nested regex patterns` — an **existing** case |
| invert the guard | **4 red** | both |

The middle row is the one worth having: the guard is held by a test that predates
this commit, so the two halves of the fix cannot be broken independently without
something going red.
