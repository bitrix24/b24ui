/**
 * PageAside
 * A sticky navigation aside.
 * ---
 */
export default {
  slots: {
    root: 'hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--b24ui-header-height))] lg:sticky lg:top-(--b24ui-header-height)',
    container: 'relative',
    top: 'sticky -top-8 -mt-8 pointer-events-none z-[1]',
    topHeader: 'h-8 bg-(--ui-color-bg-content-primary) -mx-4 px-4',
    topBody: 'bg-(--ui-color-bg-content-primary) relative pointer-events-auto flex flex-col -mx-4 px-4',
    topFooter: 'h-8 bg-gradient-to-b from-(--ui-color-bg-content-primary) -mx-4 px-4'
  }
}
