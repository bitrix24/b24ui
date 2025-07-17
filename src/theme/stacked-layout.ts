/**
 * @deprecated
 * StackedLayout
 * ---
 * @todo: remove this docs / playground / demo / test
 */

export default {
  slots: {
    root: [
      'min-h-svh w-full',
      'flex flex-col',
      'lg:px-2',
      'relative isolate'
    ].join(' '),
    sidebarSlideoverContainer: [
      'max-w-80',
      'p-2',
      'bg-transparent dark:bg-transparent sm:shadow-none'
    ].join(' '),
    sidebarSlideover: [
      'h-full',
      'overflow-hidden',
      'flex flex-col',
      'bg-white dark:bg-base-dark',
      'ring-1 ring-base-950/5 dark:ring-white/10',
      'shadow-xs',
      'rounded-lg'
    ].join(' '),
    sidebarSlideoverBtnClose: [
      '-mb-3',
      'px-4 pt-3'
    ].join(' '),
    header: [
      'px-4',
      'flex items-center',
      /**
       * @memo this sync with NavigationMenu
       */
      'h-[84px]'
    ].join(' '),
    headerMenuIcon: [
      'lg:hidden'
    ].join(' '),
    headerPaddings: [
      // 'py-2.5' // fix
    ].join(' '),
    headerWrapper: [
      'min-w-0 flex-1'
    ].join(' '),
    container: [
      'flex-1 flex flex-col',
      'lg:min-w-0',
      'pb-2'
    ].join(' '),
    containerWrapper: [
      'grow'
    ].join(' '),
    containerWrapperInner: ''
  },
  variants: {
    useSidebar: {
      true: '',
      false: ''
    },
    useLightContent: {
      true: {
        root: [
          'bg-white dark:bg-white/10',
          'lg:bg-base-50 dark:lg:bg-base-dark'
        ].join(' '),
        containerWrapper: [
          'p-6 lg:p-10',
          'lg:bg-white dark:lg:bg-white/10',
          'lg:ring-1 lg:ring-base-950/5 dark:lg:ring-white/10',
          'lg:shadow-xs',
          'lg:rounded-lg'
        ].join(' ')
      },
      false: {
        container: [
          'px-4'
        ].join(' ')
      }
    }
  },
  compoundVariants: [],
  defaultVariants: {
    useLightContent: true
  }
}
