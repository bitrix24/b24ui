/**
 * SidebarLayout
 * You incorporate a sidebar in the slider and CRM entity tab embedding. Overall, it's stylish, trendy, and youthful
 * ---
 * @todo: docs
 * @todo: test
 * @todo: playground
 */

export default {
  slots: {
    root: [
      'min-h-svh w-full',
      'flex max-lg:flex-col',
      'relative isolate'
    ].join(' '),
    sidebar: [
      'w-[240px]',
      'pr-[3px]',
      'fixed inset-y-0 left-0',
      'max-lg:hidden'
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
      'lg:hidden'
    ].join(' '),
    headerMenuIcon: '',
    headerPaddings: [
      'py-2.5'
    ].join(' '),
    headerWrapper: [
      'min-w-0',
      'flex-1'
    ].join(' '),
    container: [
      'flex-1 flex flex-col',
      'lg:min-w-0'
    ].join(' '),
    containerWrapper: [
      'grow'
    ].join(' '),
    containerWrapperInner: ''
  },
  variants: {
    useSidebar: {
      true: {
        container: 'lg:pl-[240px]'
      },
      false: {
        container: 'pb-2 lg:pt-2 lg:px-2'
      }
    },
    useLightContent: {
      true: {
        root: [
          'bg-transparent'
        ].join(' '),
        container: [
          'pb-2 lg:pt-2 lg:pr-2'
        ].join(' '),
        containerWrapper: [
          'p-6 lg:p-10',
          'light:bg-(--ui-color-base-white-fixed)',
          'dark:bg-(--ui-color-base-white-fixed)/10',
          'edge-light:bg-(--ui-color-base-black-fixed)/5 edge-light:backdrop-blur-(--ui-bg-blur-less)',
          'edge-dark:bg-(--ui-color-base-white-fixed)/10 edge-dark:backdrop-blur-(--ui-bg-blur-less)',
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
