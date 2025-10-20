export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    return
  }

  // polyfill KeyboardEvent
  if (typeof global.KeyboardEvent === 'undefined') {
    global.KeyboardEvent = class KeyboardEvent extends Event {} as any
  }

  // polyfill requestAnimationFrame
  if (typeof global.requestAnimationFrame === 'undefined') {
    global.requestAnimationFrame = function (callback: FrameRequestCallback): number {
      return setTimeout(() => {
        callback(Date.now())
      }, 16) as unknown as number
    }
  }

  if (typeof global.cancelAnimationFrame === 'undefined') {
    global.cancelAnimationFrame = function (id: number): void {
      clearTimeout(id)
    }
  }

  // polyfill addEventListener
  if (typeof global.addEventListener === 'undefined') {
    global.addEventListener = function () {} as any
  }

  // polyfill removeEventListener
  if (typeof global.removeEventListener === 'undefined') {
    global.removeEventListener = function () {} as any
  }
})
