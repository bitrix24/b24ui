/* eslint-disable regexp/no-useless-quantifier */
/* eslint-disable regexp/no-super-linear-backtracking */
import { ref, computed, toValue } from 'vue'
import type { MaybeRef } from 'vue'
import { useEventListener, useActiveElement, useDebounceFn, useTimeoutFn } from '@vueuse/core'
import { useKbd } from './useKbd'

type Handler = (e?: any) => void

export interface ShortcutConfig {
  handler: Handler
  usingInput?: string | boolean
}

export interface ShortcutsConfig {
  [key: string]: ShortcutConfig | Handler | false | null | undefined
}

export interface ShortcutsOptions {
  chainDelay?: number
  layoutIndependent?: boolean
}

interface Shortcut {
  handler: Handler
  enabled: boolean
  chained: boolean
  // KeyboardEvent attributes
  key: string
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  altKey: boolean
  // code?: string
  // keyCode?: number
}

const chainedShortcutRegex = /^[^-]+.*-.*[^-]+$/
const combinedShortcutRegex = /^[^_]+.*_.*[^_]+$/
// keyboard keys which can be combined with Shift modifier (in addition to alphabet keys)
const shiftableKeys = ['arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'tab', 'escape', 'enter', 'backspace']

// Simple key to code conversion for layout independence
function convertKeyToCode(key: string): string {
  // Handle single letters
  if (/^[a-z]$/i.test(key)) {
    return `Key${key.toUpperCase()}`
  }
  // Handle digits
  if (/^\d$/.test(key)) {
    return `Digit${key}`
  }
  // Handle function keys
  if (/^f\d+$/i.test(key)) {
    return key.toUpperCase()
  }
  // Handle common special keys
  const specialKeys: Record<string, string> = {
    space: 'Space',
    enter: 'Enter',
    escape: 'Escape',
    tab: 'Tab',
    backspace: 'Backspace',
    delete: 'Delete',
    arrowup: 'ArrowUp',
    arrowdown: 'ArrowDown',
    arrowleft: 'ArrowLeft',
    arrowright: 'ArrowRight'
  }
  return specialKeys[key.toLowerCase()] || key
}

/**
 * Collects the shortcuts declared on a menu's items into a `defineShortcuts`
 * config, so a keyboard binding is written once — on the item that shows it.
 *
 * Walks `children` and `items` recursively, and picks up any entry that has
 * both a `kbds` array and an `onSelect` or `onClick` handler. Entries without
 * one of the two are skipped rather than bound to nothing.
 *
 * @param items Menu items, flat or grouped, as passed to `DropdownMenu`,
 *   `ContextMenu`, `NavigationMenu` or `CommandPalette`.
 * @param separator How to join a multi-key binding into its config key. `'_'`
 *   is a combination (`meta_k`, pressed together), `'-'` is a chain (`g-d`,
 *   pressed in order).
 * @returns A `ShortcutsConfig` keyed by binding, ready to hand to
 *   `defineShortcuts`.
 *
 * @example
 * ```ts
 * const items = [{ label: 'Save', kbds: ['meta', 's'], onSelect: save }]
 *
 * defineShortcuts(extractShortcuts(items))
 * // equivalent to defineShortcuts({ meta_s: save })
 * ```
 *
 * @see https://bitrix24.github.io/b24ui/docs/composables/extract-shortcuts/
 */
export function extractShortcuts(items: any[] | any[][], separator: '_' | '-' = '_') {
  const shortcuts: Record<string, Handler> = {}

  function traverse(items: any[]) {
    items.forEach((item) => {
      if (item.kbds?.length && (item.onSelect || item.onClick)) {
        const shortcutKey = item.kbds.join(separator)
        shortcuts[shortcutKey] = item.onSelect || item.onClick
      }
      if (item.children) {
        traverse(item.children.flat())
      }
      if (item.items) {
        traverse(item.items.flat())
      }
    })
  }

  traverse(items.flat())

  return shortcuts
}

/**
 * Binds keyboard shortcuts for as long as the calling component is alive.
 *
 * Keys are written lowercase. `_` combines (`meta_k` — held together), `-`
 * chains (`g-d` — pressed in sequence within `chainDelay`). `meta` is the
 * Command key on macOS and Control elsewhere, so `meta_k` is the one binding
 * that reads correctly on both.
 *
 * A shortcut is ignored while the user is typing, unless its config says
 * otherwise: `usingInput: true` allows it in any field, and
 * `usingInput: 'search'` allows it only in the input whose `name` is `search`.
 * Setting an entry to `false`, `null` or `undefined` disables it, which is how
 * a shortcut is turned off reactively without rebuilding the config.
 *
 * @param config Bindings, as a plain object or a ref — a ref is re-read when
 *   it changes, so shortcuts can appear and disappear with state. Each value
 *   is either a handler or a `{ handler, usingInput }` object.
 * @param options Behaviour of the matcher itself.
 * @param options.chainDelay How long a chained shortcut waits for its next
 *   key, in milliseconds. Defaults to `800`.
 * @param options.layoutIndependent Match on the physical key (`event.code`)
 *   rather than the character it produces. Makes `meta_k` work on a Cyrillic
 *   or Dvorak layout, at the cost of matching by position instead of by what
 *   the user sees printed on the key. Defaults to `false`.
 *
 * @example
 * ```ts
 * defineShortcuts({
 *   meta_k: () => open.value = true,
 *   'g-d': () => navigateTo('/dashboard'),
 *   escape: { handler: () => close(), usingInput: true }
 * })
 * ```
 *
 * @see https://bitrix24.github.io/b24ui/docs/composables/define-shortcuts/
 */
export function defineShortcuts(config: MaybeRef<ShortcutsConfig>, options: ShortcutsOptions = {}) {
  const chainDelay = options.chainDelay ?? 800
  const chainedInputs = ref<string[]>([])
  const clearChainedInput = () => {
    chainedInputs.value.splice(0, chainedInputs.value.length)
  }
  const debouncedClearChainedInput = useDebounceFn(clearChainedInput, chainDelay)

  // A standalone shortcut that is also the first key of a chained shortcut (e.g. `f` and `f-h`)
  // is held back until the chain either completes or the delay elapses, so pressing `f` doesn't
  // fire the standalone and swallow the chain (#5654). Its `preventDefault` already ran on keydown.
  let pendingShortcut: { shortcut: Shortcut, event: KeyboardEvent } | undefined
  const cancelPendingShortcut = () => {
    pendingShortcut = undefined
    pendingTimer.stop()
  }
  const runPendingShortcut = () => {
    const pending = pendingShortcut
    cancelPendingShortcut()
    if (!pending) {
      return
    }

    // Re-resolve instead of trusting the held snapshot: `enabled` may have changed in the
    // meantime (e.g. focus moved into an input), and the pending shortcut is always unmodified.
    const shortcut = standardShortcuts.value.find(s => s.key === pending.shortcut.key && !s.metaKey && !s.ctrlKey && !s.altKey && !s.shiftKey)
    if (shortcut?.enabled) {
      shortcut.handler(pending.event)
    }
  }
  const pendingTimer = useTimeoutFn(() => {
    runPendingShortcut()
    clearChainedInput()
  }, chainDelay, { immediate: false })

  const { macOS } = useKbd()
  const activeElement = useActiveElement()
  const layoutIndependent = options.layoutIndependent ?? false

  // precompute shiftable codes if layoutIndependent
  const shiftableCodes = shiftableKeys.map(k => convertKeyToCode(k))

  const onKeyDown = (e: KeyboardEvent) => {
    // Input autocomplete triggers a keydown event
    if (!e.key) {
      return
    }

    const useCode = layoutIndependent || e.altKey
    const alphabetKey = useCode ? /^Key[A-Z]$/i.test(e.code) : /^[a-z]{1}$/i.test(e.key)
    const shiftableKey = useCode ? shiftableCodes.includes(e.code) : shiftableKeys.includes(e.key.toLowerCase())

    let chainedKey
    // push either code or key depending on layoutIndependent flag
    chainedInputs.value.push(layoutIndependent ? e.code : e.key)
    // try matching a chained shortcut
    if (chainedInputs.value.length >= 2) {
      chainedKey = chainedInputs.value.slice(-2).join('-')

      for (const shortcut of chainedShortcuts.value) {
        if (shortcut.key !== chainedKey) {
          continue
        }

        if (shortcut.enabled) {
          // The chain completed, so the held-back standalone from its first key must not fire.
          cancelPendingShortcut()

          e.preventDefault()
          shortcut.handler(e)
        } else {
          // A disabled chain must not swallow the held-back standalone.
          runPendingShortcut()
        }
        clearChainedInput()
        return
      }
    }

    // This key didn't complete a chain, so honor any standalone held back by the previous key.
    runPendingShortcut()

    // try matching a standard shortcut
    for (const shortcut of standardShortcuts.value) {
      if (layoutIndependent) {
        // compare by code
        if (e.code !== shortcut.key) {
          continue
        }
      } else if (shortcut.altKey && e.altKey) {
        // Alt/Option modifies e.key on macOS (e.g. Alt+K → "˚"), so compare via e.code
        if (e.code !== convertKeyToCode(shortcut.key)) {
          continue
        }
      } else {
        if (e.key.toLowerCase() !== shortcut.key) {
          continue
        }
      }

      if (e.metaKey !== shortcut.metaKey) {
        continue
      }
      if (e.ctrlKey !== shortcut.ctrlKey) {
        continue
      }
      if (e.altKey !== shortcut.altKey) {
        continue
      }
      // Shift modifier is checked for alphabet keys, shiftable keys, explicit shift shortcuts,
      // or when shift is pressed alongside meta/ctrl (where shift doesn't transform the key value).
      // Without meta/ctrl, shift changes the key itself (e.g. / -> ?) so the check is skipped.
      if ((alphabetKey || shiftableKey || shortcut.shiftKey || (e.shiftKey && (e.metaKey || e.ctrlKey))) && e.shiftKey !== shortcut.shiftKey) {
        continue
      }

      // If this key also starts a chained shortcut, hold it back until the chain can complete.
      const isUnmodified = !shortcut.metaKey && !shortcut.ctrlKey && !shortcut.altKey && !shortcut.shiftKey
      if (isUnmodified && chainPrefixes.value.has(shortcut.key)) {
        if (shortcut.enabled) {
          // Must run now: preventDefault is a no-op once the event finished dispatching.
          e.preventDefault()
        }
        pendingShortcut = { shortcut, event: e }
        pendingTimer.start()
        return
      }

      if (shortcut.enabled) {
        e.preventDefault()
        shortcut.handler(e)
      }
      clearChainedInput()
      return
    }

    debouncedClearChainedInput()
  }

  const usingInput = computed(() => {
    const tagName = activeElement.value?.tagName
    const contentEditable = activeElement.value?.contentEditable

    const usingInput = !!(tagName === 'INPUT' || tagName === 'TEXTAREA' || contentEditable === 'true' || contentEditable === 'plaintext-only')

    if (usingInput) {
      return ((activeElement.value as any)?.name as string) || true
    }

    return false
  })

  // Map config to full detailled shortcuts
  const shortcuts = computed<Shortcut[]>(() => {
    return Object.entries(toValue(config)).map(([key, shortcutConfig]) => {
      if (!shortcutConfig) {
        return null
      }

      // Parse key and modifiers
      let shortcut: Partial<Shortcut>

      if (key.includes('-') && key !== '-' && !key.includes('_') && !key.match(chainedShortcutRegex)?.length) {
        console.trace(`[Shortcut] Invalid key: "${key}"`)
      }

      if (key.includes('_') && key !== '_' && !key.match(combinedShortcutRegex)?.length) {
        console.trace(`[Shortcut] Invalid key: "${key}"`)
      }

      const chained = key.includes('-') && key !== '-' && !key.includes('_')
      if (chained) {
        // convert each part to code if layoutIndependent, otherwise keep raw key
        if (layoutIndependent) {
          const parts = key.split('-').map(p => convertKeyToCode(p))
          shortcut = {
            key: parts.join('-'),
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false
          }
        } else {
          shortcut = {
            key: key.toLowerCase(),
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false
          }
        }
      } else {
        const keySplit = key.toLowerCase().split('_').map(k => k)
        let baseKey = keySplit.filter(k => !['meta', 'command', 'ctrl', 'shift', 'alt', 'option'].includes(k)).join('_')
        if (layoutIndependent) {
          baseKey = convertKeyToCode(baseKey)
        }
        shortcut = {
          key: baseKey,
          metaKey: keySplit.includes('meta') || keySplit.includes('command'),
          ctrlKey: keySplit.includes('ctrl'),
          shiftKey: keySplit.includes('shift'),
          altKey: keySplit.includes('alt') || keySplit.includes('option')
        }
      }
      shortcut.chained = chained

      // Convert Meta to Ctrl for non-MacOS
      if (!macOS.value && shortcut.metaKey && !shortcut.ctrlKey) {
        shortcut.metaKey = false
        shortcut.ctrlKey = true
      }

      // Retrieve handler function
      if (typeof shortcutConfig === 'function') {
        shortcut.handler = shortcutConfig
      } else if (typeof shortcutConfig === 'object') {
        shortcut = { ...shortcut, handler: shortcutConfig.handler }
      }

      if (!shortcut.handler) {
        console.trace('[Shortcut] Invalid value')
        return null
      }

      let enabled = true
      if (!(shortcutConfig as ShortcutConfig).usingInput) {
        enabled = !usingInput.value
      } else if (typeof (shortcutConfig as ShortcutConfig).usingInput === 'string') {
        enabled = usingInput.value === (shortcutConfig as ShortcutConfig).usingInput
      }
      shortcut.enabled = enabled

      return shortcut
    }).filter(Boolean) as Shortcut[]
  })

  // Cached so each keydown doesn't re-filter (and re-allocate) the shortcuts list.
  const chainedShortcuts = computed(() => shortcuts.value.filter(s => s.chained))
  const standardShortcuts = computed(() => shortcuts.value.filter(s => !s.chained))
  // First key of every chained shortcut, used to hold back a matching standalone shortcut.
  const chainPrefixes = computed(() => new Set(chainedShortcuts.value.map(s => s.key.split('-')[0])))

  return useEventListener('keydown', onKeyDown)
}
