/**
 * Error
 * A pre-built error component with NuxtError support.
 * ---
 */
export default {
  slots: {
    root: 'min-h-[calc(100vh-var(--topbar-height))] flex flex-col items-center justify-center text-center',
    leading: 'mb-4 flex items-center justify-center',
    leadingIcon: 'size-10 shrink-0 text-legend',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: 'lg',
    statusCode: 'text-(length:--ui-font-size-sm) font-(--ui-font-weight-semi-bold) text-legend',
    statusMessage: 'mt-2 text-(length:--ui-font-size-4xl)/(--ui-font-line-height-md) sm:text-(length:--ui-font-size-5xl)/(--ui-font-line-height-md) font-(--ui-font-weight-bold) text-label text-balance',
    message: 'mt-4 text-(length:--ui-font-size-2xl)/(--ui-font-line-height-md) text-description text-balance',
    links: 'mt-8 flex items-center justify-center gap-6'
  }
}
