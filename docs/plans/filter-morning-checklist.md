# Утренний чек-лист — Filter component

> Ветка: `claude/dev-plan-checklist-RrfmF`
> Полный план: [docs/plans/filter-component-plan.md](./filter-component-plan.md)
> Спека: [docs/plans/filter-component-spec.md](./filter-component-spec.md)

## Что сделано ночью

- [x] Создана ветка `claude/dev-plan-checklist-RrfmF`.
- [x] Спека сохранена в `docs/plans/filter-component-spec.md`.
- [x] План разработки записан в `docs/plans/filter-component-plan.md` (15 фаз с пофазной коммит-стратегией).
- [x] Этот чек-лист.

**Кода компонента ещё нет** — ты просил только план. Имплементацию начнём после твоей проверки.

---

## Что проверить с утра (15-20 минут)

- [ ] Прочитать `docs/plans/filter-component-plan.md` целиком.
- [ ] Подтвердить/скорректировать решения из раздела «Зависимости и решения, требующие подтверждения утром» (внизу плана):
  - [ ] DnD: `@vueuse/integrations/useSortable` ок? Или `vue-draggable-plus`?
  - [ ] Currency: оставляем на `FieldConfig` или сразу делаем `value: { amount, currency }`?
  - [ ] Экспортируем подкомпоненты (`FilterBar` и т.д.) или только `Filter`?
  - [ ] URL-sync — точно откладываем?
  - [ ] `Modal` через `useOverlay` для confirm удаления — ок?
- [ ] Проверить раздел «Граф зависимостей фаз» — порядок устраивает?
- [ ] Поправить оценку объёма, если нужно.

---

## После проверки — порядок старта имплементации

Если план ок:

1. [ ] **Фаза 1: типы** — `feat(Filter): define public types`
   - Создать `src/runtime/types/filter.ts` + утилиты в `src/runtime/utils/filter.ts`.
   - Реэкспорт в `src/runtime/types/index.ts`.
   - `pnpm run typecheck`.
2. [ ] **Фаза 2: тема** — `feat(Filter): add theme`
   - `src/theme/filter.ts` (slots по анатомии).
   - Регистрация в `ThemeDefaults`.
   - `pnpm run dev:prepare && pnpm run typecheck`.
3. [ ] **Фаза 3: скаффолд** — `feat(Filter): scaffold component`
   - `bitrix24-ui make component Filter` (нужен `npm link` один раз).
   - Создать руками: `FilterBar.vue`, `FilterPanel.vue`, `FilterPresets.vue`, `FilterFieldsEditor.vue`, `FilterField.vue`, `FilterSortableList.vue`.
4. [ ] **Фаза 9 (раньше, чем 6 и 7): DnD wrapper** — `feat(Filter): sortable list wrapper`
   - Установить `sortablejs` (+ types), проверить `@vueuse/integrations`.
5. [ ] **Фазы 4–8 параллельно:** Bar, Panel, Presets, FieldsEditor, FilterField.
6. [ ] **Фаза 10:** локализация.
7. [ ] **Фаза 11:** тесты — `test(Filter): add component tests`.
8. [ ] **Фаза 12:** доки — `docs(Filter): add component docs`.
9. [ ] **Фаза 13:** playground — `chore(Filter): add playground page`.
10. [ ] **Фаза 14:** skill — `docs(skill): document Filter`.
11. [ ] **Фаза 15:** финальный QA — lint, typecheck, test, docs, ручной smoke в Nuxt и Vue playground.

---

## Команды-шпаргалка

```bash
pnpm run dev:prepare      # после установки/добавления тем
pnpm run dev              # Nuxt playground
pnpm run dev:vue          # Vue playground
pnpm run lint             # проверка
pnpm run lint:fix         # автофикс
pnpm run typecheck
pnpm run test
pnpm run docs             # дев-сборка доков
```

CLI для скаффолда (один раз `npm link`):

```bash
bitrix24-ui make component Filter
```

---

## Риски и места, где легко споткнуться

1. **DnD + виртуализация** несовместимы. Если активных полей много (> 50) — либо отключаем виртуализацию во время drag, либо переключаемся на position-based DnD. Решаем замером на Фазе 9.
2. **Гидрейшн-мисматч** на SSR из-за `useDevice`. Дефолт — `desktop`. Drawer/Popover создаём на `onMounted`.
3. **Batching при смене пресета:** 4 v-model обновляются разом. Без `nextTick`-батча родитель ре-рендерится 4 раза. См. план, Фаза 6.
4. **`v-model` в `InputTags` через `convertValue`/`displayValue`:** проверить точные имена пропсов в `src/runtime/components/InputTags.vue`, могут отличаться от плана.
5. **`CommandPalette` в `Popover`/`Drawer`** — проверить, что вложенные оверлеи нормально стэкаются по z-index.

---

## Что точно НЕ делать без твоего согласия

- Не пушить в `main`/`master`.
- Не создавать PR без явной просьбы (`не создавай PR пока я не скажу`).
- Не амендить чужие коммиты.
- Не трогать другие репозитории (`gh` всё равно недоступен, только GitHub MCP для `bitrix24/b24ui`).
