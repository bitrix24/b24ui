# Filter — implementation notes

> Internal reference. Companion to `filter-component.md` (spec + plan).
> Branch: `claude/dev-plan-checklist-RrfmF`.

## TL;DR

MVP shipped end-to-end across phases 1–15.

- `pnpm run lint` — green.
- `pnpm run typecheck` — green (core + Nuxt playground + demo + docs + Vue playground).
- `pnpm run test` — **214 files / 4880 tests** pass (6 skipped, unrelated).
- Filter snapshots: 16 (8 cases × Nuxt + Vue envs).

Commits on the branch:

1. `chore(Filter): add planning docs` — plan, spec, checklist.
2. `feat(Filter): define public types and op guards` — phase 1.
3. `feat(Filter): implement component, theme, and subcomponents` — phases 2–10.
4. `feat(Filter): tests, docs, playground, skill entry` — phases 11–14.

## What was added

### Types and utilities

- `src/runtime/types/filter.ts` — `FilterFieldType`, `FilterOperator`, `FilterFieldConfig`, `FilterFieldCondition` (discriminated union), `FilterValue`, `FilterDateValue`, `FilterPreset`, `FilterBarTag`, `FilterLocale`.
- `src/runtime/utils/filter.ts` — `isFilledOp`, `isEmptyOp`, `isStateOp`, `isRangeOp`, `isInOp`, `isKnownOperator`, `defaultOperatorsForType`.
- `src/runtime/utils/filter-format.ts` — `conditionLabel()` for bar chips.
- `src/runtime/locale/filter.ts` — `defaultFilterLocale` (Russian defaults).
- `src/theme/filter.ts` — slots covering the full anatomy + variants.
- Registered in `ThemeDefaults` (`src/runtime/composables/useComponentProps.ts`) and `src/theme/index.ts`.

### Components

- `src/runtime/components/Filter.vue` — public root. Orchestrates state, adaptive `Popover` (desktop) / `Drawer` (mobile) via `useDevice`, auto-applies the pinned preset on first load.
- `src/runtime/components/FilterBar.vue` — flex container: preset / condition / `+N` counter chips + search input (debounced) + magnifier / clear / settings buttons.
- `src/runtime/components/FilterPanel.vue` — two-column layout.
- `src/runtime/components/FilterPresets.vue` — list with active state, inline save / rename, DnD, `...` menu (pin / rename / delete), keyboard reorder via the menu.
- `src/runtime/components/FilterFieldsEditor.vue` — active fields list, `CommandPalette` for adding, `Find` / `Reset` / `Reset to defaults` buttons.
- `src/runtime/components/FilterField.vue` — per-type controls: `string` / `number` / `money` / `date` / `time` / `select` / `multiselect` / `boolean` / `custom` (slot).
- `src/runtime/components/FilterSortableList.vue` — thin wrapper over `@vueuse/integrations/useSortable`.

### Tests, docs, playground, skill

- `test/components/Filter.spec.ts` — 14 cases (8 renderEach snapshots + 6 behavioural).
- `docs/content/docs/2.components/filter.md` — usage, custom types, operators, dates, DnD, locale, imperative API, props/emits/slots, security.
- `playgrounds/nuxt/app/pages/components/filter.vue` — interactive demo with every field type and the custom slot.
- `skills/b24-ui-nuxt/references/components.md` — `B24Filter` entry added.

## Decisions I made unilaterally (any of these can still be revisited)

1. **DnD:** `@vueuse/integrations/useSortable` + `sortablejs` (sortablejs is already in `node_modules` as a transitive dep; not added as a direct dependency in `package.json` — promote it if we want to pin the version).
2. **Currency:** stays on `FilterFieldConfig.currency`. Swap to `value: { amount, currency }` in a follow-up if multi-currency CRM lands.
3. **Subcomponent exports:** all seven components (`Filter`, `FilterBar`, `FilterPanel`, `FilterPresets`, `FilterFieldsEditor`, `FilterField`, `FilterSortableList`) are auto-registered via `addComponentsDir` as `B24Filter*`. Add an `ignore` in `module.ts` if we want to hide everything except `B24Filter`.
4. **InputTags vs custom bar:** the spec proposed `InputTags` as the bar root. I shipped a custom flex container with `B24Chip`-like markup because the chips have three distinct kinds (`preset` / `condition` / `counter`) with different removal semantics, and `InputTags` is designed for homogeneous tags through `convertValue` / `displayValue`. Convertible if the spec is strict.
5. **Confirm modal on preset delete:** not implemented — `deletePreset` fires immediately. Easy follow-up via `useOverlay` + `Modal`.
6. **`InputTime`:** replaced with native `<B24Input type="time">`. Our `B24InputTime` carries a heavy `TimeFieldRootProps` value model that's overkill for the MVP.
7. **URL sync:** deferred per the plan.

## Manual smoke before declaring done

- [ ] `pnpm run dev` → `/components/filter` → open the panel, switch presets, add/remove fields, save/delete a preset, drag a row.
- [ ] Mobile viewport — should open in `Drawer`.
- [ ] Custom slot works — `field-user` is wired in the playground.
- [ ] Eyeball the snapshots: `test/components/__snapshots__/Filter*.spec.ts.snap`.
- [ ] `pnpm run docs` → `/components/filter` renders.

## Explicit follow-ups

- [ ] Confirm modal for preset delete (see decision 5 above).
- [ ] `InputDate` / `Calendar` for `kind: 'exact'` and `kind: 'range'` on the `date` type (currently only range presets via `Select`).
- [ ] Virtualisation of the active fields list via `ScrollArea` when count > 50.
- [ ] Tooltip on every field drag handle (the `B24Tooltip` wrapper is in place, just not consistently applied).
- [ ] Behavioural tests for drag-and-drop reordering (only `move-up` / `move-down` via the menu is covered indirectly today).
- [ ] `a11y` snapshot via `vitest-axe` (mirroring `InputTags`).

These are all small follow-ups, ready for the next iteration after review.

## Command cheat sheet

```bash
pnpm run dev              # Nuxt playground → /components/filter
pnpm run dev:vue          # Vue playground (no page yet — wasn't added)
pnpm run lint             # ✅
pnpm run typecheck        # ✅
pnpm run test             # ✅ 4880 / 4886
pnpm run docs             # docs locally
```
