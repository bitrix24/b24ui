// Prefetch helpers for the Nuxt `Link` component. Kept out of `utils/link.ts`
// so the Vue builds, which share `LinkBase` but never render `NuxtLink`, do not
// load them.

type IdleCallbackHandle = ReturnType<typeof setTimeout> | number

/**
 * Mirrors Nuxt's `requestIdleCallback` compat: falls back to a short timeout
 * when the browser (or happy-dom in tests) does not implement it.
 *
 * @param callback run when the browser is next idle
 * @returns a handle for {@link cancelIdleCallback}, or `undefined` off the client
 */
export function requestIdleCallback(callback: () => void): IdleCallbackHandle | undefined {
  if (typeof window === 'undefined') {
    return
  }

  if (typeof window.requestIdleCallback === 'function') {
    return window.requestIdleCallback(callback)
  }

  return setTimeout(callback, 1)
}

/**
 * Cancels a callback scheduled by {@link requestIdleCallback}, matching whichever
 * of the two mechanisms scheduled it. A missing handle is a no-op, so an unmount
 * before the callback was ever scheduled needs no guard at the call site.
 *
 * @param handle the value {@link requestIdleCallback} returned
 */
export function cancelIdleCallback(handle: IdleCallbackHandle | undefined) {
  if (typeof window === 'undefined' || handle === undefined) {
    return
  }

  if (typeof window.cancelIdleCallback === 'function') {
    window.cancelIdleCallback(handle as number)
    return
  }

  clearTimeout(handle as ReturnType<typeof setTimeout>)
}

let observer: IntersectionObserver | null = null
const callbacks = new Map<Element, () => void>()

/**
 * Watches an element for entering the viewport, through one `IntersectionObserver`
 * shared by every link — as NuxtLink's own observer is, creating one per link
 * being wasteful on a navigation with hundreds of entries. The observer is torn
 * down once the last caller stops watching.
 *
 * @param element the rendered link
 * @param callback run once the element intersects the viewport
 * @returns stops watching; safe to call more than once
 */
export function observeIntersection(element: Element, callback: () => void): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    return () => {}
  }

  observer ||= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const callback = callbacks.get(entry.target)
      if ((entry.isIntersecting || entry.intersectionRatio > 0) && callback) {
        callback()
      }
    }
  })

  callbacks.set(element, callback)
  observer.observe(element)

  return () => {
    callbacks.delete(element)
    observer?.unobserve(element)

    if (callbacks.size === 0) {
      observer?.disconnect()
      observer = null
    }
  }
}
