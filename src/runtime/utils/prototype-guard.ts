/**
 * Shared prototype-pollution guard for the two dotted-path walkers in this
 * package: `get`/`set` in `utils/index.ts` and `getAtPath`/`setAtPath` in
 * `utils/form.ts`. They were written independently and carried the same defect
 * independently; the guard lives here so a fix to one cannot drift from the
 * other.
 *
 * Two distinct holes are closed, and only the first is obvious:
 *
 *  1. A path segment naming `__proto__`, `constructor` or `prototype` writes
 *     through to a shared prototype instead of to the object in hand.
 *
 *  2. Walking with `value[key] === undefined` consults the prototype chain, so
 *     an *inherited* member is descended into rather than shadowed — and the
 *     next segment lands on whatever else inherits it. `set({}, 'toString.x', 1)`
 *     assigned to `Object.prototype.toString` with no reserved word anywhere in
 *     the path, which is why a denylist alone is not enough.
 */

const PROTOTYPE_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

/**
 * Whether `key` names a prototype-reaching property.
 *
 * Compares the *coerced* key, not the key as passed. `object[key]` runs
 * ToPropertyKey on whatever it is handed, so a guard that first checks
 * `typeof key === 'string'` inspects a different value than the assignment
 * that follows it: an array path holding `new String('prototype')`, or any
 * object whose `toString` returns `'__proto__'`, walked straight past an
 * earlier version of this check. Symbols are excluded rather than stringified —
 * `String(Symbol())` throws, and no symbol equals one of these three names.
 */
export function isPrototypeKey(key: unknown): boolean {
  return typeof key !== 'symbol' && PROTOTYPE_KEYS.has(String(key))
}

/**
 * Throws if any segment of `keys` reaches a prototype.
 *
 * Checked up front rather than per step, so a write is refused before it has
 * half-happened and left intermediate objects behind.
 *
 * @throws {TypeError} naming the offending segment.
 */
export function assertNoPrototypeKeys(keys: readonly unknown[], fn: string): void {
  for (const key of keys) {
    if (isPrototypeKey(key)) {
      throw new TypeError(`${fn}: refusing to write through the prototype key '${String(key)}'`)
    }
  }
}

/**
 * The container to descend into for `key`, guaranteed to be `object`'s own.
 *
 * Assigns one when the slot is empty, and when the value is only inherited
 * copies it instead of descending into it — replacing it outright would be
 * safe but would silently drop data the caller can still read through the
 * prototype chain. The copy preserves array-ness, since a form path like
 * `items.0.name` depends on it.
 */
export function ownContainer(object: Record<string, any>, key: string | number, arrayHint = false): Record<string, any> {
  if (Object.hasOwn(object, key)) {
    const own = object[key]

    if (own !== undefined && own !== null) {
      return own
    }
  } else {
    const inherited = object[key]

    if (typeof inherited === 'object' && inherited !== null) {
      object[key] = Array.isArray(inherited) ? [...inherited] : { ...inherited }
      return object[key]
    }
  }

  object[key] = arrayHint ? [] : {}

  return object[key]
}
