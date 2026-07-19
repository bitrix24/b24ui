// In-memory Web Storage shim for the test runners (vue + nuxt projects).
//
// Why this exists:
//   Node 22.4.0 added a built-in `localStorage` global behind
//   `--experimental-webstorage`, and recent Node releases (verified on v25)
//   enable it by default. Without a `--localstorage-file` path that native
//   global is a broken stub whose `getItem`/`setItem`/`clear` are `undefined`,
//   and it *shadows* the working `localStorage` that happy-dom (vue project) or
//   the nuxt test env would otherwise provide. Tests that touch storage — e.g.
//   `useResizable.spec.ts` — then fail with "localStorage.setItem is not a function".
//
//   CI runs Node 22 (webstorage off by default) so it never sees this, but local
//   runs on Node 24/25 do. We deliberately don't fix it with
//   `--no-experimental-webstorage` in `NODE_OPTIONS`: the repo `.npmrc`
//   `node-options` overrides the env var, and that flag doesn't exist on Node 20
//   (still allowed by `engines`), where it would crash every script with
//   "bad option". A setup-time shim is version-agnostic and scoped to tests.
//
// Guarded: it is a no-op when a working `localStorage` is already present
// (Node 22 + happy-dom), so CI behaviour is untouched.

function createMemoryStorage(): Storage {
  const store = new Map<string, string>()
  return {
    get length() {
      return store.size
    },
    key(index: number) {
      return [...store.keys()][index] ?? null
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null
    },
    setItem(key: string, value: string) {
      store.set(String(key), String(value))
    },
    removeItem(key: string) {
      store.delete(key)
    },
    clear() {
      store.clear()
    }
  } as Storage
}

export function patchWebStorage(): void {
  // Skip when the runtime already exposes a functional Storage.
  if (typeof globalThis.localStorage?.setItem === 'function') {
    return
  }

  // `globalThis` and `window` must share ONE store: tests write via the bare
  // `localStorage` global while `useStorage`/VueUse reads `window.localStorage`.
  const storage = createMemoryStorage()
  Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true, writable: true })
  if (typeof window !== 'undefined' && window !== globalThis) {
    Object.defineProperty(window, 'localStorage', { value: storage, configurable: true, writable: true })
  }
}
