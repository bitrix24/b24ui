import path from 'node:path'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { it, expect } from 'vitest'

type MountSuspendedOptions<T> = Parameters<typeof mountSuspended<T>>[1]

/**
 * Mounted into the document, not beside it.
 *
 * Vue Test Utils renders into a detached element by default. That is invisible
 * until something asks the document a question — and reka-ui's dialog family
 * does: it checks its own accessibility with `document.getElementById(titleId)`
 * in `onMounted`. A detached tree is not in the document, so the lookup failed
 * and every dialog spec rendering with `portal: false` warned that
 * `DialogContent` requires a `DialogTitle`, with the title sitting in the
 * markup it had just produced. The case named `renders with title correctly`
 * warned too.
 *
 * Measured on `Modal`, one mount each: 2 warnings detached, 0 attached, 0 with
 * the portal left on. Across the suite, with `console-gate.ts`'s register
 * emptied on both sides: 623 messages from 62 tests before, 366 from 56 after.
 * Only one register entry could be removed, because the register keys on files
 * and the dialog specs also mount by hand — see the note on that list.
 *
 * Attaching also lets reka-ui reach the rest of the document, which is why this
 * moved 402 snapshot entries across 25 files: `Header` and `Table` gain the
 * `aria-hidden` a browser puts on everything behind an open dialog, and
 * `CheckboxGroup` and `RadioGroup` gain the `aria-label` reka-ui reads off the
 * associated `<label>` rather than the raw value. The snapshots are closer to a
 * browser than they were.
 *
 * The wrapper is unmounted as soon as its markup is taken, so nothing
 * accumulates in `document.body` between cases — and teardown now runs, which
 * is a second source of truth in its own right. Without it reka-ui's
 * module-global layer stack kept every layer any case had ever mounted, so
 * `DismissableLayer` rendered `pointer-events: auto` according to how many
 * earlier cases were still on the stack rather than to anything under test.
 * Four `#454` baseline groups were held apart by exactly that byte.
 */
async function componentRender<T>(nameOrHtml: string, options: MountSuspendedOptions<T>, component: T) {
  let html: string
  const name = component && typeof component === 'object' && '__file' in component && typeof component.__file === 'string'
    ? path.parse(component.__file).name
    : undefined
  if (options === undefined) {
    const app = {
      template: nameOrHtml,
      components: { [`B24${name}`]: component }
    }
    const result = await mountSuspended(app, { attachTo: document.body })
    html = result.html()
    result.unmount()
  } else {
    const cResult = await mountSuspended<T>(component, { ...options, attachTo: document.body })
    html = cResult.html()
    cResult.unmount()
  }
  return html
}

type ExtractRestArgs<T, Cases> = Cases extends ReadonlyArray<infer Case>
  ? Case extends [string, MountSuspendedOptions<T>, ...infer Rest]
    ? Rest extends [] ? never
      : unknown[] extends Rest ? never
        : Rest
    : never
  : never

type RenderEachRest<T, Cases> = [ExtractRestArgs<T, Cases>] extends [never] ? [] : ExtractRestArgs<T, Cases>

type RenderEachFn<T, A extends any[]> = (nameOrHtml: string, options: MountSuspendedOptions<T>, ...args: A) => void | Promise<void>

function renderEach<T, const C extends ReadonlyArray<[string, MountSuspendedOptions<T>, ...any[]]>>(
  component: T,
  cases: C,
  fnOrTestName?: string | RenderEachFn<T, RenderEachRest<T, C>>,
  fn?: RenderEachFn<T, RenderEachRest<T, C>>
) {
  const testName = typeof fnOrTestName === 'string' ? fnOrTestName : 'renders %s correctly'
  const callback = typeof fnOrTestName === 'function' ? fnOrTestName : fn

  return it.each(cases as ReadonlyArray<[string, MountSuspendedOptions<T>, ...any[]]>)(testName, async (nameOrHtml: string, options: MountSuspendedOptions<T>, ...args: RenderEachRest<T, C>) => {
    if (callback) {
      await callback(nameOrHtml, options, ...args)
    } else {
      const html = await componentRender<T>(nameOrHtml, options, component)
      expect(html).toMatchSnapshot()
    }
  })
}

export { componentRender as default, componentRender, renderEach }
