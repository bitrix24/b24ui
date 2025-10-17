/**
 * ProseField
 * ---
 */

export default {
  slots: {
    root: 'my-[20px]',
    container: 'flex items-center gap-3 font-[family-name:var(--ui-font-family-system-mono)] text-(length:--ui-font-size-sm)',
    name: 'font-(--ui-font-weight-semi-bold) text-(--ui-color-accent-main-primary)',
    wrapper: 'flex-1 flex items-center gap-1.5 text-(length:--ui-font-size-xs)',
    required: 'rounded-(--ui-border-radius-sm) bg-(--ui-color-design-outline-alert-content)/10 text-(--ui-color-accent-main-alert) px-1.5 py-0.5',
    type: 'rounded-(--ui-border-radius-sm) bg-(--ui-color-design-tinted-na-bg) text-(--b24ui-typography-description-color) px-1.5 py-0.5',
    description: 'mt-3 text-(--b24ui-typography-description-color) text-(length:--ui-font-size-sm) [&_code]:text-(length:--ui-font-size-xs)/4'
  }
}
