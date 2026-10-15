/**
 * Chart
 * Plots data as a line, area, bar or donut chart, built on TanStack Charts.
 * ---
 * Series colors come from the `--b24ui-chart-1` … `--b24ui-chart-6` variables (see `src/runtime/index.css`).
 * The tooltip is a `B24Tooltip`, so it keeps the look of `src/theme/tooltip.ts`.
 */
export default {
  slots: {
    // The tooltip can sit under the pointer, and its popper wrapper would take the hover away from the chart.
    root: [
      'relative w-full text-(length:--ui-font-size-xs) text-muted **:data-reka-popper-content-wrapper:pointer-events-none',
      // The surface of the TanStack Charts tooltip, shown when a `definition` brings its own. Matches `B24Tooltip`.
      '[--ts-chart-tooltip-background:var(--ui-color-bg-content-inapp)] [--ts-chart-tooltip-color:var(--ui-color-base-8)] [--ts-chart-tooltip-border:1px_solid_var(--ui-color-bg-content-inapp)] [--ts-chart-tooltip-border-radius:var(--ui-border-radius-md)] [--ts-chart-tooltip-shadow:var(--popup-window-box-shadow)] [--ts-chart-tooltip-padding:6px_10px] [--ts-chart-tooltip-font:inherit]'
    ].join(' '),
    // The chart surface is focusable for keyboard navigation between points. Browsers outline a focused
    // `<svg>` on click too, so its width is zero until keyboard focus.
    base: [
      'opacity-0 in-data-measured:opacity-100 transition-opacity duration-150',
      '[&_.ts-chart]:rounded-(--ui-border-radius-xs) [&_.ts-chart]:outline-0 [&_.ts-chart]:outline-(--ui-color-design-outline-focused-stroke)',
      '[&_.ts-chart:focus-visible]:outline-2'
    ].join(' '),
    tooltip: 'flex-col items-stretch justify-start gap-[4px] h-auto min-h-0 min-w-32 py-[6px] px-[10px] pointer-events-none',
    tooltipTitle: 'font-(--ui-font-weight-medium)',
    tooltipRow: 'flex items-center gap-[6px] opacity-75 data-[active=true]:opacity-100',
    tooltipIndicator: 'size-2 shrink-0 rounded-full',
    tooltipLabel: 'truncate',
    tooltipValue: 'ms-auto ps-4 font-(--ui-font-weight-medium) tabular-nums',
    center: 'absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 in-data-measured:opacity-100 transition-opacity duration-150'
  },
  variants: {
    type: {
      line: '',
      area: '',
      bar: '',
      donut: ''
    }
  }
}
