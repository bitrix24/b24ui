import { computed, shallowRef, getCurrentInstance } from 'vue'
import { createSharedComposable, useMounted } from '@vueuse/core'

type KbdKeysSpecificMap = {
  meta: string
  alt: string
  ctrl: string
}

/**
 * Modifier and special keys as the glyphs a keyboard shows: `meta` is `⌘` on
 * Apple and `Ctrl` elsewhere, resolved at render time by `useKbd`.
 *
 * These are the names `Kbd`'s `value` prop translates; anything else is
 * rendered as given, so `value="F5"` prints `F5`. `defineShortcuts` does not
 * read this map at all — it has its own `specialKeys` for matching events.
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

/**
 * Labels for the platform-specific keys (`meta`, `ctrl`, `alt`) on macOS and on other platforms. `B24Kbd` renders both and lets CSS show one, so SSR and hydration agree.
 */
export const kbdKeysPlatformMap: Record<KbdKeySpecific, { macos: string, other: string }> = {
  meta: { macos: kbdKeysMap.command, other: 'Ctrl' },
  ctrl: { macos: kbdKeysMap.control, other: 'Ctrl' },
  alt: { macos: kbdKeysMap.option, other: 'Alt' }
}

const _useKbd = () => {
  const macOS = computed(() => import.meta.client && typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.match(/Macintosh;/))

  if (import.meta.client && macOS.value) {
    document.documentElement.classList.add('ui-macos')
  }

  return {
    macOS
  }
}

const useSharedKbd = /* @__PURE__ */ createSharedComposable(_useKbd)

/**
 * Turns a key name into the glyph this platform prints on it.
 *
 * `meta` is `⌘` on Apple and `Ctrl` everywhere else, and `alt` is `⌥` or
 * `Alt` — which is why a shortcut hint cannot be a hard-coded string if it is
 * meant to read correctly on both. `meta`/`ctrl`/`alt` resolve to a `' '`
 * placeholder until the calling component has mounted, so server and client
 * render the same text.
 *
 * @returns `macOS`, and `getKbdKey(value)` which maps a name from `kbdKeysMap`
 *   and passes anything else through unchanged.
 */
export function useKbd() {
  const { macOS } = useSharedKbd()
  // Platform-specific keys resolve after mount to match the server-rendered placeholder.
  // Outside of a component there is no mount to wait for.
  const mounted = getCurrentInstance() ? useMounted() : shallowRef(import.meta.client)

  function getKbdKey(value?: KbdKey | string) {
    if (!value) {
      return
    }

    if (['meta', 'alt', 'ctrl'].includes(value)) {
      return mounted.value ? kbdKeysPlatformMap[value as KbdKeySpecific][macOS.value ? 'macos' : 'other'] : ' '
    }

    return kbdKeysMap[value as KbdKey] || value
  }

  return {
    macOS,
    getKbdKey
  }
}
