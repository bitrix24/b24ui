# Analytics widgets

Patterns for KPI / metrics cards on dashboards.

## Analytics widget (KPI card with data rows)

A focused card that surfaces 2-4 metrics for a given time range — repeat sales dynamics, support workload, conversion funnel, marketing campaign performance, etc. Compose from a single `B24Card` plus stock components — **do not create a custom widget**. The pattern: a header with title + 2-line subtitle and a date-range action, a body that lays out a small data table (column headers + 2-3 rows) with the headline metric highlighted, and a footer with neutral "configure" / "feedback" actions.

Decorative background is the brand boost radial gradient on `b24ui.root`. All text is white because the gradient is too saturated for the default semantic text tokens.

```vue
<script setup lang="ts">
import RepeatIcon from '@bitrix24/b24icons-vue/outline/RepeatIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'
</script>

<template>
  <B24Card
    :b24ui="{
      root: 'w-full sm:max-w-[640px] mx-auto bg-[radial-gradient(110.42%_110.42%_at_-10.42%_31.25%,var(--ui-color-design-filled-boost-bg-gradient-1)_0%,var(--ui-color-design-filled-boost-bg-gradient-2)_58.65%,var(--ui-color-design-filled-boost-bg-gradient-3)_100%)] border-0',
      header: 'flex items-start justify-between gap-3 p-6 pb-3',
      body: 'px-6 space-y-2',
      footer: 'flex items-center justify-between gap-3 p-6 pt-4 border-0'
    }"
  >
    <template #header>
      <div class="flex-1 text-white">
        <h3 class="text-xl font-semibold leading-snug">Repeat sales dynamics</h3>
        <p class="text-sm text-white/80 mt-1">10 deals created in total</p>
        <p class="text-sm text-white/80">10 deals today</p>
      </div>
      <B24Button
        label="Last 30 days"
        color="air-secondary-no-accent"
        size="sm"
        :trailing-icon="RepeatIcon"
      />
    </template>

    <div class="grid grid-cols-[1fr_5rem_7rem] gap-x-6 px-4 text-xs text-white/70">
      <div></div>
      <div class="text-end">Count</div>
      <div class="text-end">Amount</div>
    </div>

    <div class="grid grid-cols-[1fr_5rem_7rem] items-center gap-x-6 px-4 py-3 rounded-lg bg-white/10 text-white">
      <div>Deals in progress</div>
      <div class="text-end">10</div>
      <div class="text-end">$46,500</div>
    </div>

    <div class="grid grid-cols-[1fr_5rem_7rem] items-center gap-x-6 px-4 py-3 rounded-lg bg-white/10 text-white">
      <div>Won deals</div>
      <div class="text-end">1</div>
      <div class="text-end">$10,000</div>
    </div>

    <div class="grid grid-cols-[1fr_5rem_7rem] items-center gap-x-6 px-4 py-3 rounded-lg bg-white/20 text-white">
      <div class="flex items-center gap-1.5">
        <span>Conversion</span>
        <B24Tooltip text="Won deals divided by total deals">
          <Info1Icon class="size-4 opacity-70" />
        </B24Tooltip>
      </div>
      <div class="text-end">10%</div>
      <div class="text-end">17.7%</div>
    </div>

    <template #footer>
      <B24Button label="Configure" color="air-tertiary-no-accent" size="sm" :icon="SettingsIcon" class="text-white" />
      <B24Button label="Feedback" color="air-tertiary-no-accent" size="sm" :icon="FeedbackIcon" class="text-white" />
    </template>
  </B24Card>
</template>
```

Rules:
- **One `B24Card`, no new component**. The whole widget — header, data rows, footer — lives inside a single card. Reach for `:b24ui` to override slot classes (`root`, `header`, `body`, `footer`) instead of wrapping things in extra divs.
- **Boost gradient on `b24ui.root`**, not on `body` — the `root` slot owns the rounded radius, so its `background-image` is clipped to the corners naturally. Reuse the brand tokens `--ui-color-design-filled-boost-bg-gradient-{1,2,3}` (the same radial gradient the `air-boost` Button paints). The CSS variables are theme-agnostic, so a single `bg-[radial-gradient(...)]` covers light and dark. Drop the default border with `border-0`.
- **White text everywhere** on the gradient — `text-white` for primary content, `text-white/80` for the subtitle, `text-white/70` for column headers, and a 70% opacity icon for the info tooltip. Default semantic text tokens become invisible on this surface.
- **Data rows are a `grid`, not a `B24Table`** — for a 2-4 row teaser, a `grid grid-cols-[1fr_<col>_<col>]` with `rounded-lg bg-white/10` per row is far cleaner than wiring the full table machinery. Stick the column header strip above the rows with the same column template, smaller text, and no row background.
- **Highlight the headline metric** by giving its row a slightly stronger surface (`bg-white/20`) — it pops without breaking the visual rhythm of the other rows.
- **Date-range chip in the header** — `B24Button` with `color="air-secondary-no-accent"` reads as a chip on the saturated gradient. Use a trailing icon (e.g. `RepeatIcon`) to hint the action, and keep `size="sm"` so the chip stays compact next to the multi-line title block.
- **Footer actions are neutral**, not CTAs — both use `color="air-tertiary-no-accent"` with `class="text-white"` so the wording (Configure / Feedback) reads against the gradient. Pair them at the edges of the footer with `justify-between`.
- **Tooltip the headline label**, not its value — the info icon next to "Conversion" / "NPS" / "ARPU" explains the formula without taking horizontal space from the numbers.
- **Mind accessibility** — keep the date-range chip and footer actions reachable by keyboard, and validate gradient contrast for both light and dark modes (the brand boost tokens are identical across themes, so test with `--prefers-color-scheme` flipped).

## When NOT to reach for this pattern

- **Wide data table** — if you need sorting, pagination, or 5+ rows, drop into `B24TableWrapper` with a normal card surface. The boost gradient is a teaser surface, not a data-grid background.
- **Single-number tile** — if the widget shows a single hero metric (no data rows), prefer a smaller card without the data-row scaffolding.
- **Dashboard chrome** — for the dashboard shell itself (sidebar, panel, toolbar), reach for `B24DashboardPanel` and friends. This recipe is the *content* you put inside one of those panels.
