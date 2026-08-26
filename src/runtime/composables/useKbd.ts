import { reactive, computed, onMounted } from 'vue'
import { createSharedComposable } from '@vueuse/core'

type KbdKeysSpecificMap = {
  meta: string
  alt: string
  ctrl: string
}

/**
 * Modifier and special keys as the glyphs a keyboard shows: `meta` is `⌘` on
 * Apple and `Ctrl` elsewhere, resolved at render time by `useKbd`.
 *
 * The keys of this map are what `Kbd`'s `value` prop and `defineShortcuts`
 * bindings accept as names.
 */
export const kbdKeysMap = {
  meta: '',
  ctrl: '',
  alt: '',
  win: '⊞',
  command: '⌘',
  shift: '⇧',
  control: '⌃',
  option: '⌥',
  enter: '↵',
  delete: '⌦',
  backspace: '⌫',
  escape: 'Esc',
  tab: '⇥',
  capslock: '⇪',
  arrowup: '↑',
  arrowright: '→',
  arrowdown: '↓',
  arrowleft: '←',
  pageup: '⇞',
  pagedown: '⇟',
  home: '↖',
  end: '↘'
}

export type KbdKey = keyof typeof kbdKeysMap
export type KbdKeySpecific = keyof KbdKeysSpecificMap

const _useKbd = () => {
  const macOS = computed(() => import.meta.client && navigator && navigator.userAgent && navigator.userAgent.match(/Macintosh;/))

  const kbdKeysSpecificMap = reactive({
    meta: ' ',
    alt: ' ',
    ctrl: ' '
  })

  onMounted(() => {
    kbdKeysSpecificMap.meta = macOS.value ? kbdKeysMap.command : 'Ctrl'
    kbdKeysSpecificMap.ctrl = macOS.value ? kbdKeysMap.control : 'Ctrl'
    kbdKeysSpecificMap.alt = macOS.value ? kbdKeysMap.option : 'Alt'
  })

  function getKbdKey(value?: KbdKey | string) {
    if (!value) {
      return
    }

    if (['meta', 'alt', 'ctrl'].includes(value)) {
      return kbdKeysSpecificMap[value as KbdKeySpecific]
    }

    return kbdKeysMap[value as KbdKey] || value
  }

  return {
    macOS,
    getKbdKey
  }
}

/**
 * Turns a key name into the glyph this platform prints on it.
 *
 * `meta` is `⌘` on Apple and `Ctrl` everywhere else, and `alt` is `⌥` or
 * `Alt` — which is why a shortcut hint cannot be a hard-coded string if it is
 * meant to read correctly on both.
 *
 * @returns `macOS`, and `getKbdKey(value)` which maps a name from `kbdKeysMap`
 *   and passes anything else through unchanged.
 */
export const useKbd = /* @__PURE__ */ createSharedComposable(_useKbd)
