/**
 * Editor
 * A rich text editor built on TipTap supporting markdown, HTML, and JSON content formats.
 * ---
 */
export default {
  slots: {
    root: '',
    content: 'relative size-full flex-1',
    base: [
      'text-(--b24ui-typography-label-color)',
      'w-full outline-none *:my-5 *:first:mt-0 *:last:mb-0 sm:px-8 selection:bg-(--ui-color-design-selection-bg)',
      // Paragraph
      '[&_p]:leading-7',
      // Links
      '[&_a]:text-(--ui-color-accent-main-primary) [&_a]:border-b [&_a]:border-transparent [&_a]:hover:border-(--ui-color-accent-main-primary) [&_a]:font-(--ui-font-weight-medium)',
      '[&_a]:transition-colors',
      // Code inside links
      '[&_a>code]:border-dashed [&_a:hover>code]:border-(--ui-color-accent-soft-element-blue) [&_a:hover>code]:text-(--ui-color-accent-main-primary)',
      '[&_a>code]:transition-colors',
      // Mentions
      '[&_.mention]:text-(--ui-color-accent-main-primary) [&_.mention]:font-(--ui-font-weight-medium)',
      // Headings - shared styles
      '[&_:is(h1,h2,h3,h4,h5,h6)]:text-(--b24ui-typography-label-color) [&_:is(h1,h2,h3,h4,h5,h6)]:font-(--ui-font-weight-bold)',
      // Headings - unique styles
      '[&_h1]:text-3xl',
      '[&_h2]:text-2xl',
      '[&_h3]:text-xl',
      '[&_h4]:text-lg',
      '[&_h5]:text-md',
      '[&_h6]:text-md',
      // Code inside headings
      '[&_:is(h1,h2,h3,h4,h5,h6)>code]:border-dashed [&_:is(h1,h2,h3,h4,h5,h6)>code]:font-(--ui-font-weight-bold)',
      '[&_h2>code]:text-xl/6',
      '[&_h3>code]:text-lg/5',
      // Blockquote & HR
      '[&_blockquote]:border-s-4 [&_blockquote]:border-(--ui-color-accent-soft-element-blue) [&_blockquote]:ps-4 [&_blockquote]:italic',
      '[&_[data-type=horizontalRule]]:my-8 [&_[data-type=horizontalRule]]:py-2',
      '[&_hr]:border-t [&_hr]:border-(--ui-color-divider-default)',
      // Code blocks
      '[&_pre]:text-sm/6 [&_pre]:border [&_pre]:border-(--ui-color-design-tinted-na-stroke) [&_pre]:bg-(--ui-color-design-tinted-na-bg) [&_pre]:rounded-md [&_pre]:px-4 [&_pre]:py-3 [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:overflow-x-auto',
      '[&_pre_code]:p-0 [&_pre_code]:text-inherit [&_pre_code]:font-inherit [&_pre_code]:rounded-none [&_pre_code]:inline [&_pre_code]:border-0 [&_pre_code]:bg-transparent',
      // Inline code
      '[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-[family-name:var(--ui-font-family-system-mono)] [&_code]:font-(--ui-font-weight-medium) [&_code]:rounded-md [&_code]:inline-block [&_code]:border [&_code]:border-(--ui-color-design-tinted-na-stroke) [&_code]:text-(--b24ui-typography-label-color) [&_code]:bg-(--ui-color-design-tinted-na-bg)',
      // Lists
      '[&_:is(ul,ol)]:ps-6',
      '[&_ul]:list-disc [&_ul]:marker:text-(--ui-color-accent-soft-element-blue)',
      '[&_ol]:list-decimal [&_ol]:marker:text-(--b24ui-typography-label-color)',
      '[&_li]:my-1.5 [&_li]:ps-1.5',
      // Images
      '[&_img]:rounded-md [&_img]:block [&_img]:max-w-full [&_img.ProseMirror-selectednode]:outline-2 [&_img.ProseMirror-selectednode]:outline-(--ui-color-accent-main-primary)',
      // Selected nodes
      '[&_.ProseMirror-selectednode:not(img):not(pre):not([data-node-view-wrapper])]:bg-(--ui-color-design-selection-bg)'
    ].join(' ')
  },
  variants: {
    placeholderMode: {
      firstLine: {
        base: '[&_:is(p,h1,h2,h3,h4,h5,h6).is-editor-empty:first-child]:before:content-[attr(data-placeholder)] [&_:is(p,h1,h2,h3,h4,h5,h6).is-editor-empty:first-child]:before:text-(--b24ui-typography-description-color) [&_:is(p,h1,h2,h3,h4,h5,h6).is-editor-empty:first-child]:before:float-start [&_:is(p,h1,h2,h3,h4,h5,h6).is-editor-empty:first-child]:before:h-0 [&_:is(p,h1,h2,h3,h4,h5,h6).is-editor-empty:first-child]:before:pointer-events-none'
      },
      everyLine: {
        base: '[&_:is(p,h1,h2,h3,h4,h5,h6).is-empty]:before:content-[attr(data-placeholder)] [&_:is(p,h1,h2,h3,h4,h5,h6).is-empty]:before:text-(--b24ui-typography-description-color) [&_:is(p,h1,h2,h3,h4,h5,h6).is-empty]:before:float-start [&_:is(p,h1,h2,h3,h4,h5,h6).is-empty]:before:h-0 [&_:is(p,h1,h2,h3,h4,h5,h6).is-empty]:before:pointer-events-none'
      }
    }
  },
  defaultVariants: {
    placeholderMode: 'everyLine'
  }
}
