import { isEqual } from 'ohash/utils'
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'
import type { GetItemKeys } from '../types/utils'
import type { IconComponent } from '../types/icons'
import icons from '../dictionary/icons'
import { assertNoPrototypeKeys, isPrototypeKey, ownContainer } from './prototype-guard'

/**
 * A new object with only `keys` copied across. Shallow; missing keys become
 * `undefined` rather than being skipped.
 */
export function pick<Data extends object, Keys extends keyof Data>(data: Data, keys: Keys[]): Pick<Data, Keys> {
  const result = {} as Pick<Data, Keys>

  for (const key of keys) {
    result[key] = data[key]
  }

  return result
}

/**
 * A shallow copy of `data` without `keys`. Used throughout the components to
 * split a props object into the part that is forwarded and the part that is
 * consumed.
 */
export function omit<Data extends object, Keys extends keyof Data>(data: Data, keys: Keys[]): Omit<Data, Keys> {
  const result = { ...data }

  for (const key of keys) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete result[key]
  }

  return result as Omit<Data, Keys>
}

function toPath(path: (string | number)[] | string): (string | number)[] {
  if (typeof path !== 'string') {
    return path
  }

  return path.split('.').map((key) => {
    const numKey = Number(key)
    return Number.isNaN(numKey) ? key : numKey
  })
}

/**
 * Reads a nested value by path — `'user.address.city'` or
 * `['items', 0, 'label']` — returning `defaultValue` if any step is missing.
 *
 * Prototype-safe: a step that is not the object's **own** property is refused,
 * so a path through `constructor` or `__proto__` cannot hand back a live
 * intrinsic. A data model may legitimately carry a field named `constructor`,
 * which is why the check is on ownership rather than on the name (#92).
 *
 * @param object The object to read from.
 * @param path Dot-notation string, or an array of keys and indices.
 * @param defaultValue Returned when the path does not resolve.
 */
export function get(object: Record<string, any> | undefined, path: (string | number)[] | string, defaultValue?: any): any {
  let result: any = object

  for (const key of toPath(path)) {
    if (result === undefined || result === null) {
      return defaultValue
    }

    // Refused only when the key is *not* the object's own: a data model may
    // legitimately carry a field named `constructor`, and blocking by name
    // alone made it unreadable. What must never be handed back is the live
    // prototype the caller reaches by inheritance — that is the first half of
    // every pollution chain, and it is never what a `labelKey` meant. Treated
    // as "not found" rather than thrown, because reads are expected to be
    // total and a default is what every other missing path returns.
    if (isPrototypeKey(key) && !Object.hasOwn(result, key)) {
      return defaultValue
    }

    result = result[key]
  }

  return result !== undefined ? result : defaultValue
}

/**
 * Assigns `value` at a dotted `path`, creating intermediate objects as it goes.
 *
 * Neither this nor `get()` is reachable from inside b24ui — nothing in `src/`
 * calls `set()`, and every `get()` path the components pass is an
 * author-written `labelKey` / `valueKey`. Both are on the public `./utils`
 * entry though, so the guard is for the consumer who forwards a path that came
 * from somewhere less trustworthy. See `utils/prototype-guard.ts` for what is
 * being defended against.
 *
 * @throws {TypeError} if any path segment names `__proto__`, `constructor` or
 * `prototype`. Such a path writes through to a shared prototype rather than to
 * `object`, and unlike a read there is no sensible value to return instead: the
 * caller's data model ends up in a state they do not believe it is in either
 * way, and an exception is the outcome they can catch.
 */
/**
 * Writes a nested value by path, creating plain objects along the way.
 *
 * Prototype-safe on the same terms as `get`: it descends only through own
 * properties, so `set({}, 'toString.x', 1)` cannot reach a shared intrinsic
 * (#92).
 *
 * @param object The object to write into. Mutated.
 * @param path Dot-notation string, or an array of keys and indices.
 * @param value The value to write.
 */
export function set(object: Record<string, any>, path: (string | number)[] | string, value: any): void {
  const keys = toPath(path)

  assertNoPrototypeKeys(keys, 'set()')

  keys.reduce((acc, key, i) => {
    if (i === keys.length - 1) {
      acc[key] = value
      return acc[key]
    }

    return ownContainer(acc, key)
  }, object)
}

/**
 * Index of the first item whose `valueKey` field strictly equals `value`.
 * Timeline and Stepper resolve their active item through this.
 */
/**
 * Index of the item whose `valueKey` equals `value`, or `-1`. Compared by
 * identity, not by `compare` — this is the lookup for a `modelValue` that is
 * already a primitive.
 */
export function itemValueIndex<T>(items: T[], value: unknown, valueKey: string): number {
  return items.findIndex(item => get(item as Record<string, any>, valueKey) === value)
}

/**
 * `parseFloat`, but returns the input unchanged when it is not numeric — so an
 * empty input stays `''` instead of becoming `NaN`, and a numeric string
 * arrives as a number.
 */
export function looseToNumber(val: any): any {
  const n = Number.parseFloat(val)
  return Number.isNaN(n) ? val : n
}

/**
 * Whether two selection values are the same, as the menus and selects mean it.
 *
 * Strings compare by identity. Objects compare deeply by default, which is
 * what makes a `modelValue` rebuilt from JSON still match the item it came
 * from. `comparator` narrows that: a key name compares by that field alone —
 * `'id'` is the usual answer for records — and a function decides for itself.
 * `undefined` on either side is never equal to anything.
 *
 * @param value The candidate.
 * @param currentValue The current selection.
 * @param comparator A key to compare by, or a predicate.
 */
export function compare<T>(value?: T, currentValue?: T, comparator?: string | ((a: T, b: T) => boolean)) {
  if (value === undefined || currentValue === undefined) {
    return false
  }

  if (typeof value === 'string') {
    return value === currentValue
  }

  if (typeof comparator === 'function') {
    return comparator(value, currentValue)
  }

  if (typeof comparator === 'string') {
    return get(value!, comparator) === get(currentValue!, comparator)
  }

  return isEqual(value, currentValue)
}

/**
 * Whether a value counts as "nothing selected".
 *
 * `false` and `0` are values, not emptiness — a checkbox bound to `false` is
 * answered, and a quantity of `0` is a quantity. Empty strings, empty arrays,
 * empty objects, `null` and `undefined` are empty.
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return false
  }

  if (typeof value === 'string') {
    return value.trim().length === 0
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0
  }

  if (value instanceof Date || value instanceof RegExp || typeof value === 'function') {
    return false
  }

  if (typeof value === 'object') {
    for (const _ in value as object) {
      if (Object.prototype.hasOwnProperty.call(value, _)) {
        return false
      }
    }
    return true
  }

  return false
}

/**
 * The label to show for a selected value.
 *
 * Looks the value up in `items` and reads `labelKey` off what it finds. A
 * value with no matching item is displayed as-is, so a free-typed entry in an
 * `InputMenu` still reads back — that fallback is the reason this is not a
 * one-line `find`.
 *
 * @param items The list to search.
 * @param value The current selection.
 * @param options Where to find an item's value and label.
 * @param options.valueKey Field holding an item's value. Omit when items are
 *   primitives.
 * @param options.labelKey Field holding an item's label.
 * @param options.by Passed to `compare` as its comparator.
 */
export function getDisplayValue<T extends Array<any>, V>(
  items: T,
  value: V | undefined | null,
  options: {
    valueKey?: GetItemKeys<T>
    labelKey?: GetItemKeys<T>
    by?: string | ((a: any, b: any) => boolean)
  } = {}
): string | undefined {
  const { valueKey, labelKey, by } = options

  const foundItem = items.find((item) => {
    const itemValue = (typeof item === 'object' && item !== null && valueKey)
      ? get(item, valueKey as string)
      : item
    return compare(itemValue, value, by)
  })

  if (isEmpty(value) && foundItem) {
    return labelKey ? get(foundItem as Record<string, any>, labelKey as string) : undefined
  }

  if (isEmpty(value)) {
    return undefined
  }

  const source = foundItem ?? value

  if (source === null || source === undefined) {
    return undefined
  }

  if (typeof source === 'object') {
    return labelKey ? get(source as Record<string, any>, labelKey as string) : undefined
  }

  return String(source)
}

/**
 * Whether an items array is grouped (an array of arrays) rather than flat.
 * A type guard, so the caller can branch without a cast — the menus accept
 * both shapes and render a separator between groups.
 */
export function isArrayOfArray<
  A extends any[] | any[][]
>(item: A): item is A extends Array<infer T>
  ? T extends any[]
    ? T[]
    : never
  : never {
  return Array.isArray(item[0])
}

/**
 * Joins the class an `app.config` theme override contributes with the one
 * passed as a prop, in that order — so the prop wins under `twMerge`. Returns
 * `''` when neither is set, which keeps an empty `class` attribute out of the
 * markup.
 */
export function mergeClasses(appConfigClass?: string | string[], propClass?: string) {
  if (!appConfigClass && !propClass) {
    return ''
  }

  return [
    ...(Array.isArray(appConfigClass) ? appConfigClass : [appConfigClass]),
    propClass
  ].filter(Boolean)
}

/**
 * Flattens a slot's rendered children into plain text, descending through
 * nested elements and default slots.
 *
 * Needed where a component has to know what its slot says rather than just
 * render it — a `Kbd` reading its own key, a tooltip falling back to its
 * trigger's label.
 */
export function getSlotChildrenText(children: any) {
  return children.map((node: any) => {
    if (!node.children || typeof node.children === 'string') return node.children || ''
    else if (Array.isArray(node.children)) return getSlotChildrenText(node.children)
    else if (node.children.default) return getSlotChildrenText(node.children.default())
  }).join('')
}

const PROMPT_BLOCK_TAGS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'])

function walkPromptElement(node: Node): string {
  if (node.nodeType === 3) {
    const text = node.textContent || ''
    // Pure-whitespace text nodes that span newlines are HTML-formatting
    // artifacts between block elements and should be ignored.
    if (text.includes('\n') && !text.trim()) return ''
    return text
  }
  if (node.nodeType !== 1) return ''

  const element = node as Element
  const tag = element.tagName.toLowerCase()

  let inner = ''
  node.childNodes.forEach((child) => {
    inner += walkPromptElement(child)
  })

  if (PROMPT_BLOCK_TAGS.has(tag)) return `${inner}\n\n`
  if (tag === 'pre') return `\n\`\`\`\n${inner.replace(/^`+|`+$/g, '')}\n\`\`\`\n\n`
  if (tag === 'ul' || tag === 'ol') return `${inner}\n`
  if (tag === 'li') return `- ${inner}\n`
  if (tag === 'br') return '\n'
  if (tag === 'hr') return '\n---\n\n'
  if (tag === 'code') return `\`${inner}\``
  if (tag === 'strong' || tag === 'b') return `**${inner}**`
  if (tag === 'em' || tag === 'i') return `*${inner}*`
  if (tag === 'a') {
    const href = element.getAttribute('href')
    return href ? `[${inner}](${href})` : inner
  }

  return inner
}

/**
 * Reads an element's visible text the way a chat prompt means it: block-level
 * tags become line breaks, runs of blank lines collapse to one, and trailing
 * whitespace goes.
 *
 * `textContent` would run the paragraphs together; `innerText` is not
 * available server-side and depends on layout.
 */
export function extractPromptText(el: Element | null | undefined): string {
  if (!el) return ''
  return walkPromptElement(el)
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Resolve an icon component by name from `dictionary/icons.ts`.
 *
 * Accepts both short camelCase aliases used internally (`"tip"`, `"warning"`,
 * `"info"`) and PascalCase named icons exposed to markdown authors via
 * `iconName` (`"InfoCircleIcon"`, `"GitHubIcon"`, ...). Returns `undefined`
 * when the name is not in the dictionary.
 */
export function resolveIcon(name?: string | null): IconComponent | undefined {
  if (!name) return undefined
  return (icons as Record<string, IconComponent>)[name]
}

/**
 * Resolves a `tailwind-variants` slot object into plain class strings,
 * threading the caller's per-slot `b24ui` overrides through each slot function.
 *
 * What turns `b24ui.base({ class: … })` into something a template can bind.
 */
export function transformUI(ui: any, uiProp?: any) {
  return Object.entries(ui).reduce((acc, [key, value]) => {
    acc[key] = typeof value === 'function' ? value({ class: uiProp?.[key] }) : value
    return acc
  }, { ...(uiProp || {}) })
}

/**
 * Prefixes an absolute path with the app's `baseURL`, unless it already
 * carries it.
 *
 * Protocol-relative (`//host/…`) and external URLs are left alone. Idempotent,
 * so a path that has been through this once does not gain a second prefix —
 * which is what happens when a link is resolved in both a parent and a child.
 */
export function resolveBaseURL(path?: string, baseURL?: string): string | undefined {
  if (path?.startsWith('/') && !path.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(baseURL || '/'))
    if (_base !== '/' && !path.startsWith(_base)) {
      return joinURL(_base, path)
    }
  }
  return path
}

export * from './content'
