/**
 * SidebarLayout
 * You incorporate a sidebar in the slider and CRM entity tab embedding. Overall, it's stylish, trendy, and youthful
 * ---
 * @todo: docs
 * @todo: test
 * @todo: playground
 * @todo: docs add in-data-[content=dd-light]:bg-red-500 group-data-[content=light]/layout-content:bg-red-500
 * @todo: docs add inner {true|false}
 */

export default {
  slots: {
    root: [
      'text-(--ui-color-design-plain-content)',
      'w-full',
      'flex'
    ].join(' '),
    sidebar: [
      'w-[240px]',
      'pe-[3px] rtl:me-[14px]',
      'inset-y-0 left-0',
      'max-lg:hidden'
    ].join(' '),
    sidebarSlideoverContainer: 'w-full sm:max-w-80',
    sidebarSlideover: [
      'h-full',
      'overflow-hidden',
      'flex flex-col text-(--ui-color-design-plain-content)',
      'bg-(--ui-color-base-white-fixed) dark:bg-(--ui-color-bg-content-primary) edge-dark:bg-[#21334cf0]',
      'ring-1 ring-base-950/5 dark:ring-white/10',
      'shadow-xs',
      'rounded-none'
    ].join(' '),
    sidebarSlideoverBtnClose: [
      '-mb-3',
      'px-4 pt-3'
    ].join(' '),
    contentWrapper: [
      'flex-1 flex flex-col',
      ''
    ].join(' '),
    header: [
      'px-(--content-area-shift) min-h-(--topbar-height)',
      'flex items-center gap-x-1'
    ].join(' '),
    headerMenuIcon: 'lg:hidden',
    headerWrapper: [
      'min-w-0 flex-1',
      'h-full'
    ].join(' '),
    container: [
      'flex-1 flex flex-col gap-[22px]',
      'lg:min-w-0'
    ].join(' '),
    containerWrapper: [
      'grow group/layout-content'
    ].join(' '),
    pageTopWrapper: [
      'text-(--ui-color-base-1)',
      'flex items-center gap-[12px]'
    ].join(' '),
    pageActionsWrapper: [
      // 'min-h-[28px]', // @memo not work
      'flex flex-col md:flex-row items-start md:items-center justify-start gap-[12px]'
    ].join(' '),
    containerWrapperInner: 'size-full',
    pageBottomWrapper: '',
    loadingWrapper: [
      'cursor-wait',
      'isolate absolute z-1000 inset-0',
      'w-full h-dvh',
      'flex flex-row flex-nowrap items-center justify-center'
      // @memo save
      // 'bg-[#00204e]/52', //  //#000000/66 // [#00204e]/52
      // 'motion-safe:backdrop-blur-sm'
    ].join(' '),
    loadingIcon: 'text-(--ui-color-g-glass-grey-bg-2) size-[110px] animate-spin-slow'
  },
  variants: {
    inner: {
      true: {
        root: [
          '--inner',
          'relative isolate',
          'h-full',
          'bg-[var(--ui-color-gray-05)]',
          'dark:bg-[var(--ui-color-gray-05)]',
          'overflow-hidden light --ui-context-content-light'
          // fix 'sm:rounded-t-[18px]'
        ].join(' '),
        sidebar: [
          'bg-(--ui-color-bg-content-secondary)'
        ].join(' '),
        header: [
          'bg-(--ui-color-bg-content-primary)'
        ].join(' '),
        container: [
          // @todo make property
          // fix 'scrollbar-thin scrollbar-transparent',
          // fix 'overflow-y-scroll',
          'mt-0'
        ].join(' '),
        containerWrapper: '',
        // fix containerWrapperInner: 'size-full',
        pageBottomWrapper: 'flex-0'
      },
      false: {
        root: [
          '--app',
          'h-dvh min-h-dvh',
          'bg-(--ui-color-gray-05) edge-light:bg-transparent',
          'dark:bg-(--ui-color-bg-content-primary) edge-dark:bg-transparent',
          'max-lg:flex-col'
        ].join(' '),
        sidebar: [
          'fixed',
          'bg-(--ui-color-bg-content-secondary)',
          'dark:bg-[#262626]',
          'edge-light:bg-(--ui-color-base-black-fixed)/2',
          'edge-light:backdrop-blur-(--ui-bg-blur-less)',
          'edge-dark:bg-(--ui-color-base-white-fixed)/3',
          'edge-dark:backdrop-blur-(--ui-bg-blur-less)'
        ].join(' '),
        header: [
          'bg-(--ui-color-bg-content-primary)', // 'bg-(--ui-color-base-black-fixed)/5', // ',
          'dark:bg-[#2d2d2d]',
          'edge-light:bg-(--ui-color-base-black-fixed)/5 edge-light:backdrop-blur-(--ui-bg-blur-less)',
          'edge-dark:bg-(--ui-color-base-white-fixed)/10 edge-dark:backdrop-blur-(--ui-bg-blur-less)'
        ].join(' '),
        container: [
          'relative',
          'mt-[22px]'
        ].join(' ')
        // fix containerWrapperInner: 'size-full'
      }
    },
    useSidebar: {
      true: '',
      false: ''
    },
    useLightContent: {
      true: {
        containerWrapper: [
          'light --ui-context-content-light',
          'text-(--ui-color-design-plain-content) bg-(--popup-window-background-color)' // /87
        ].join(' ')
      },
      false: {
        container: 'px-(--content-area-shift)'
      }
    },
    loading: {
      true: ''
    },
    useNavbar: {
      true: {
        container: ''
      },
      false: {
        loadingWrapper: 'h-full',
        container: ''
      }
    }
  },
  compoundVariants: [
    // region inner||main.useLightContent ////
    {
      inner: true,
      useLightContent: true,
      class: {
        container: '',
        pageTopWrapper: 'px-0 lg:px-0',
        pageActionsWrapper: 'px-0 lg:px-0',
        containerWrapper: [
          'p-[20px]',
          'rounded-(--ui-border-radius-md)'
        ].join(' ')
      }
    },
    {
      inner: false,
      useLightContent: true,
      class: {
        container: 'lg:pb-2',
        pageTopWrapper: 'px-6 lg:px-0',
        pageActionsWrapper: 'px-6 lg:px-0',
        containerWrapper: [
          'p-6 lg:p-[15px]',
          'lg:rounded-(--ui-border-radius-md)'
        ].join(' ')
      }
    },
    // endregion ////
    // region main.useSidebar ////
    {
      inner: true,
      useSidebar: [true, false],
      class: {
        container: 'px-[20px] ps-[20px] pe-[10px] pb-[20px] lg:pt-0 lg:px-[20px] lg:ps-[20px] lg:pe-[10px]'
      }
    },
    {
      inner: false,
      useSidebar: true,
      class: {
        // @memo --content-area-left-shift
        // container: 'lg:px-[calc(var(--content-area-shift)-6px)]',
        container: 'lg:px-(--content-area-shift)',
        contentWrapper: 'lg:pl-[240px] '
      }
    },
    {
      inner: false,
      useSidebar: false,
      class: {
        container: 'px-(--content-area-shift) pb-2 lg:pt-2 lg:px-2',
        contentWrapper: 'lg:pl-0'
      }
    },
    // endregion ////
    // region main.useNavbar ////
    {
      inner: true,
      useNavbar: [true, false],
      class: {
        container: 'h-full'
      }
    },
    {
      inner: false,
      useNavbar: true,
      class: {
        container: 'h-[calc(100dvh-var(--topbar-height))]'
      }
    },
    {
      inner: false,
      useNavbar: false,
      class: {
        container: 'h-full'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    inner: false,
    useLightContent: true
  }
}
