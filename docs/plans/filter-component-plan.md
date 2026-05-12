# План разработки компонента `Filter` для b24ui

> Источник: [docs/plans/filter-component-spec.md](./filter-component-spec.md) (исходная спецификация)
> Ветка: `claude/dev-plan-checklist-RrfmF`

План разбит на фазы. Каждая фаза — самостоятельный коммит (conventional commits), который можно проверить и зареверсить. Все артефакты (компонент, тема, типы, тесты, docs, playground) идут по существующему workflow из `AGENTS.md`.

---

## Принципы реализации

1. **View-only.** Никаких REST-вызовов внутри. Всё через `props`/`emits`.
2. **Композиция из существующих b24ui-примитивов.** Не пишем своих низкоуровневых компонентов, если есть готовые (`InputTags`, `Popover`, `Drawer`, `CommandPalette`, `NavigationMenu`, `DropdownMenu`, `Form`, `FormField`, `ScrollArea`, `Button`, `Calendar`, `InputDate`, `InputNumber`, `InputTime`, `Select`, `SelectMenu`, `Tooltip`, `Empty`, `Skeleton`).
3. **Один публичный компонент `Filter`** + набор внутренних подкомпонентов, не экспортируемых наружу (пока). Если потребитель захочет частей — экспортируем после того, как API устаканится.
4. **Адаптив:** `useDevice` → `Popover` на desktop, `Drawer` на mobile.
5. **DnD:** обёртка `<FilterSortableList>` поверх `@vueuse/integrations/useSortable`. Если потом понадобится переключиться — меняем одно место.
6. **Темизация:** `tailwind-variants` по конвенции репозитория (`src/theme/filter.ts` + slots для подкомпонентов).
7. **Локализация:** все строки UI («Найти», «Сбросить», «Любая дата», операторы и т.д.) — через `props` с дефолтами на русском. Не хардкодим в шаблонах.

---

## Фаза 0 — Подготовка

**Коммит:** `chore(Filter): add planning docs`

- [x] Спецификация и скриншот в `docs/plans/filter-component-spec.md` + `filter-component-screenshot.png`.
- [x] Этот план в `docs/plans/filter-component-plan.md`.
- [x] Утренний чек-лист в `docs/plans/filter-morning-checklist.md`.

Эта фаза уже сделана текущим коммитом — это якорь, чтобы при проверке утром был ясный baseline.

---

## Фаза 1 — Типы и публичный контракт

**Коммит:** `feat(Filter): define public types`

**Файлы:**
- `src/runtime/types/filter.ts` (новый):
  - `FieldType`, `FilterOperator`, `FieldOption`, `FieldConfig`
  - `FieldCondition` (discriminated union по `operator`)
  - `FilterValue = Record<string, FieldCondition>`
  - `DatePreset`, `DateValue`
  - `Preset`
  - `FilterBarTag`
  - `FilterProps`, `FilterEmits`, `FilterSlots`
- `src/runtime/types/index.ts` — реэкспорт типов фильтра.
- Утилиты-type-guards (`isFilledOp`, `isEmptyOp`, `isRangeOp`, `isInOp`) — `src/runtime/utils/filter.ts`. Нужны для нарроуинга в Vue-шаблонах (см. открытый вопрос #2 в спеке).

**Что проверить перед коммитом:** `pnpm run typecheck`.

---

## Фаза 2 — Тема

**Коммит:** `feat(Filter): add theme`

**Файлы:**
- `src/theme/filter.ts` — slots под всю анатомию:
  - `root`, `bar`, `panel`, `presets`, `presetsList`, `presetItem`, `presetItemActive`, `fieldsEditor`, `field`, `fieldLabel`, `fieldControl`, `fieldMenuTrigger`, `dragHandle`, `actions`, `submitButton`, `resetButton`, `addFieldButton`, `defaultsButton`.
  - Variants: `size` (`sm`/`md`/`lg`), `orientation` (`horizontal`/`vertical`), `color` (`air-primary` по дефолту).
- Регистрация в `ThemeDefaults` в `src/runtime/composables/useComponentProps.ts`.
- Подключение в `src/module.ts` (если требуется по существующему паттерну — проверить аналоги).

**Проверка:** `pnpm run dev:prepare && pnpm run typecheck`.

---

## Фаза 3 — Скаффолд компонента + базовая структура

**Коммит:** `feat(Filter): scaffold component`

Используем CLI:

```
bitrix24-ui make component Filter
```

Затем правим/добавляем подкомпоненты руками (CLI делает только один файл):

**Файлы:**
- `src/runtime/components/Filter.vue` — корень, оркестрирует state, проксирует props/emits, рендерит `FilterBar` + `Popover`/`Drawer` со `FilterPanel`.
- `src/runtime/components/FilterBar.vue` — внутренний, оборачивает `InputTags`, формирует `FilterBarTag[]` через `computed`.
- `src/runtime/components/FilterPanel.vue` — внутренний, две колонки (`FilterPresets` + `FilterFieldsEditor`).
- `src/runtime/components/FilterPresets.vue` — внутренний.
- `src/runtime/components/FilterFieldsEditor.vue` — внутренний.
- `src/runtime/components/FilterField.vue` — внутренний, один контрол.
- `src/runtime/components/FilterSortableList.vue` — внутренний wrapper над `useSortable`.

**Решение об экспорте:** наружу из `module.ts` экспортируем только `Filter`. Остальное — внутреннее. Если у потребителя возникнет потребность собирать кастомный bar — для этого уже есть slot `bar` в `FilterProps`.

---

## Фаза 4 — FilterBar (свёрнутый вид)

**Коммит:** `feat(Filter): implement FilterBar`

- Корень — `InputTags` с `addOnBlur={false}`, `addOnTab={false}`, без `delimiter`.
- `convertValue`/`displayValue` — храним `FilterBarTag` объекты в `v-model`, рендерим через слот `item-text` (имя у InputTags может отличаться — проверить в `InputTags.vue` и подогнать).
- `computed` `tagsToShow`:
  - первый тег — `preset` (если активный пресет есть);
  - следующие до `visibleTagsCount` — `condition`;
  - последний — `counter`, если осталось скрытых.
- `removeTag` обработчик:
  - `kind: 'preset'` → emit `update:activePresetId` с `null`;
  - `kind: 'condition'` → удаляем из `FilterValue`, emit `update:modelValue`;
  - `kind: 'counter'` → открыть `FilterPanel`.
- `trailing` slot — `Button × 3` (лупа, ×, шестерёнка). Шестерёнка открывает панель.
- Клик по фону (не по чипу/инпуту) — открыть панель. Делаем через `data-slot="root"` + `@click.self`.
- Дебаунс `searchQuery` через `useDebounceFn` (vueuse). Default 300ms — `searchDebounce` prop.
- Enter в инпуте → `@apply`.

---

## Фаза 5 — FilterPanel + адаптив

**Коммит:** `feat(Filter): adaptive panel via useDevice`

- `useDevice` для выбора `Popover` (desktop) vs `Drawer` (mobile).
- Panel рендерит две колонки на desktop, табы или вертикальный стек на mobile (в `Drawer`).
- Фокус-трап и Esc-закрытие — встроены в `Popover`/`Drawer`, дополнительно ничего не делаем.
- `defineShortcuts`: Enter → apply (если фокус внутри панели), Esc → close.

---

## Фаза 6 — FilterPresets

**Коммит:** `feat(Filter): implement presets column`

- `NavigationMenu` (`orientation="vertical"`) для списка пресетов.
- Активный пресет — visual highlight (через theme slot `presetItemActive`).
- Системные пресеты (`system: true`) — нельзя удалить и переименовать (скрываем пункты в `DropdownMenu`).
- Пин-иконка (`B24Icons` pin) у пресета с `pinned: true`.
- `DropdownMenu` на каждом пресете: переместить (drag — отдельная иконка-ручка), pin/unpin, переименовать, удалить.
- **Drag&drop** через `FilterSortableList`.
- Inline-сохранение (`Desktop`) — `Input` появляется в конце списка после клика `+ Сохранить фильтр`. Enter → emit `presetSave`, Esc → отменить.
- Modal-сохранение (`Mobile`) — `useOverlay` + минимальный `Modal` + `Form` с одним `Input`.
- Confirm удаления — `useOverlay` + `Modal`.
- **Keyboard альтернатива DnD:** в `DropdownMenu` пункты «↑ Вверх» / «↓ Вниз» — emit `presetUpdate` с новым `order`. Это WCAG-страховка.

---

## Фаза 7 — FilterFieldsEditor + пикер полей

**Коммит:** `feat(Filter): implement fields editor`

- `ScrollArea` (виртуализация — только если активных полей > 50; см. перфоманс-раздел спеки).
- Каждое поле — `FormField` + `FilterField`.
- Drag-handle ☰ слева (icon-only `Button`) + tooltip «Потяните, чтобы отсортировать список полей».
- Крестик удаления справа (`Button`, `variant="ghost"`, icon-only) — только при наведении (CSS hover-state, тема).
- `DropdownMenu` `...`:
  - «Заполнено» → emit обновления с `{ operator: 'filled' }`;
  - «Не заполнено» → `{ operator: 'empty' }`;
  - «Очистить значение» → удалить ключ из `FilterValue`;
  - «↑ Вверх» / «↓ Вниз» — keyboard альтернатива DnD.
- Кнопка `Добавить поле` → `CommandPalette` в `Popover` (desktop) или `Drawer` (mobile).
  - Fuzzy-поиск по `field.label`.
  - Группировка по `field.group` (visible label — `field.groupLabel`).
  - Уже добавленные поля — `disabled`.
- Кнопка `Вернуть поля по умолчанию` → emit `fieldsReset`. Семантика по спеке: сбрасывает только набор полей (`activeFields ← defaultFields`), значения и активный пресет не трогает.
- Кнопки `Найти` (primary) / `Сбросить` (secondary).
  - `Найти` — emit `apply` с `{ values, query, presetId }`.
  - `Сбросить` — emit `reset` (обнуляет `FilterValue`, не трогает `activeFields`).

**Важно:** все `<button>` — `type="button"` (защита от submit во внешней `<form>` родителя).

---

## Фаза 8 — FilterField — контролы по типам

**Коммит:** `feat(Filter): field controls per type`

- `string` → `Input`.
- `number` → `Select` (оператор) + `InputNumber` × 1 или 2 (для `between`).
- `money` → `Select` (оператор) + `InputNumber` + `Select` (валюта). Если `field.currency` задано — селект валюты скрыт.
- `date` → `Select` пресетов (`DatePreset`) + `Calendar`/`InputDate` снизу при `kind: 'exact'` или `'range'`, + `InputNumber` для `'relative'`.
- `time` → `InputTime`.
- `select` → `Select` или `SelectMenu` (если `options.length > 10` — переключаемся на `SelectMenu` для поиска).
- `multiselect` → `SelectMenu` (multiple) с чипами.
- `boolean` → `RadioGroup` (Да / Нет / Не важно). «Не важно» = удалить условие из `FilterValue`.
- `custom` → slot `field-{customMeta.kind}` или `field-custom`. Slot получает `{ field, condition, update }`.

**Поведение при `filled`/`empty`:** инпут значения скрываем (или disabled с тусклой обводкой), потому что оператор сам определяет условие.

**Реактивность:** при обновлении одного поля **заменяем `FilterValue` целиком** (`{ ...value, [id]: newCondition }`), а не мутируем. См. перф-раздел спеки.

---

## Фаза 9 — DnD-обёртка

**Коммит:** `feat(Filter): sortable list wrapper`

- `src/runtime/components/FilterSortableList.vue`:
  - Принимает `v-model` массив элементов, рендерит через slot.
  - Внутри — `useSortable` из `@vueuse/integrations`. Создаём на `onMounted` (SSR-safe).
  - Опции: `handle: '[data-drag-handle]'`, `animation: 150`.
- Добавить зависимость `sortablejs` (+ types) и убедиться, что `@vueuse/integrations` уже есть в `package.json`. Если нет — добавить.

---

## Фаза 10 — Локализация и константы

**Коммит:** `feat(Filter): expose locale prop`

- Prop `locale: Partial<FilterLocale>` с дефолтом — объект с русскими строками.
- Тип `FilterLocale` в `src/runtime/types/filter.ts`:
  - `actions.apply`, `actions.reset`, `actions.addField`, `actions.resetFields`, `actions.saveFilter`
  - `operators.eq`, `operators.gt`, …
  - `datePresets.today`, `datePresets.thisMonth`, …
  - `boolean.yes`, `boolean.no`, `boolean.any`
  - `tooltips.dragField`, `tooltips.removeField`
  - `placeholders.search`
- Внутри компонента — `mergeWith(defaultLocale, props.locale)`.

---

## Фаза 11 — Тесты

**Коммит:** `test(Filter): add component tests`

**Файлы:**
- `test/components/Filter.spec.ts` (snapshot + behavior).
- `test/components/FilterBar.spec.ts`.
- `test/components/FilterPresets.spec.ts`.
- `test/components/FilterFieldsEditor.spec.ts`.
- `test/components/FilterField.spec.ts`.

**Что покрываем:**

1. **Снапшоты** — три-четыре конфигурации (пустой, с пресетом, с 6 активными полями, с custom-слотом).
2. **FilterBar:**
   - первые `visibleTagsCount` условий — отдельные чипы, остальное в `+N`;
   - удаление чипа `preset` эмитит `update:activePresetId` с `null`;
   - удаление чипа `condition` эмитит `update:modelValue` без этого ключа;
   - клик по `counter`-чипу открывает панель;
   - Enter в поиске эмитит `apply`;
   - дебаунс `searchQuery` — `update:searchQuery` после паузы.
3. **Presets:**
   - клик по пресету — emit `update:activePresetId` + (через `nextTick`) `update:modelValue` + `update:activeFields`;
   - системный пресет — не имеет пунктов «удалить»/«переименовать»;
   - сохранение пресета (desktop) inline, (mobile) — modal.
4. **FieldsEditor:**
   - «Найти» эмитит `apply` с `{ values, query, presetId }`;
   - «Сбросить» эмитит `reset`, не трогает `activeFields`;
   - «Вернуть поля по умолчанию» эмитит `fieldsReset`.
5. **FilterField:**
   - выбор оператора `filled` скрывает инпут значения;
   - кастомный тип рендерится через slot `field-user`;
   - `update` из слота меняет `FilterValue`.
6. **A11y:**
   - все кнопки — `type="button"`;
   - drag-handle имеет `aria-label` + клавиатурная альтернатива (стрелки в `DropdownMenu`);
   - фокус-трап в `Popover`/`Drawer` (тест на `tab` и `shift+tab`).
7. **Рантайм-валидация:**
   - `activeFields` с несуществующим id — отфильтровывается без ошибки;
   - неизвестный `operator` — `console.warn` в dev, поле пропускается.

Использовать существующий хелпер `component-render.ts`.

---

## Фаза 12 — Документация

**Коммит:** `docs(Filter): add component docs`

**Файл:** `docs/content/docs/2.components/filter.md`.

Структура по шаблону остальных компонентов (см. `command-palette.md`, `navigation-menu.md`):

1. **Описание** (1-2 абзаца) + бейдж `Soon`.
2. **Usage:**
   - Базовый пример (`FieldConfig[]` + `v-model:modelValue` + `@apply`).
   - С пресетами.
   - С кастомным типом (slot `field-user`).
   - Адаптив (упомянуть `useDevice`).
3. **Examples** (collapsible code blocks):
   - Пример из раздела 9.10 спеки.
   - Сложный пример с CRM-стадиями (через `custom`).
   - Загрузка пресетов с сервера (наглядно — где REST идёт у потребителя).
4. **API:**
   - Props таблица (auto-generated через компонентный парсер docs — проверить, как это делается у `CommandPalette`).
   - Emits.
   - Slots.
   - Theme (slots темы из `src/theme/filter.ts`).

---

## Фаза 13 — Playground

**Коммит:** `chore(Filter): add playground page`

**Файлы:**
- `playgrounds/nuxt/app/pages/components/filter.vue` — интерактивное демо.
- `playgrounds/vue/src/pages/components/filter.vue` — то же для Vue-playground.

В demo:
- toggle `loading`, `visibleTagsCount`, `allowSavePresets`, `allowReorderFields`;
- 6-7 полей разных типов, включая `custom`;
- 2-3 пресета (один системный, один с пином);
- кнопка «сэмулировать REST»: задержка 500мс перед обновлением презентов.

---

## Фаза 14 — Skill

**Коммит:** `docs(skill): document Filter`

- `skills/b24-ui-nuxt/references/components.md` — добавить раздел `Filter` со ссылками на доки и кратким описанием.
- Если есть `recipes/` — добавить рецепт «CRM-фильтр со списком сотрудников» (опционально).
- Проверить, что `skills/b24-ui-nuxt/index.json` или аналог индексирует новый компонент (если такая схема используется — посмотреть, как добавляли последний компонент).

---

## Фаза 15 — Production checks

**Коммит:** `chore(Filter): final QA`

- `pnpm run lint` — фиксим всё.
- `pnpm run typecheck` — без ошибок.
- `pnpm run test` — снапшоты ок, новые тесты зелёные.
- `pnpm run docs` — собирается без warning.
- Ручной smoke в `pnpm run dev` (Nuxt playground) и `pnpm run dev:vue`.
- Snapshot мобильного вида: открыть Chrome DevTools device toolbar, проверить, что `Drawer` подтягивается, что DnD работает touch.

---

## Зависимости и решения, требующие подтверждения утром

1. **DnD библиотека:** план — `@vueuse/integrations/useSortable` + `sortablejs`. Альтернатива — `vue-draggable-plus`. Решаем на старте Фазы 9.
2. **Currency в `FieldConfig` vs в `FilterValue.value`:** оставляю как в спеке — на `FieldConfig`. Если позже понадобится мульти-валюта — мигрируем через `value: { amount, currency }`.
3. **Экспорт подкомпонентов:** пока только `Filter`. Если потребитель попросит — экспонируем `FilterBar`/`FilterPresets`/`FilterFieldsEditor` позже без breaking change.
4. **URL-синхронизация:** не делаем (раздел 14 спеки — отложено).
5. **`Modal` для confirm удаления:** использовать `useOverlay` + существующий `Modal` (проверить, что он есть).

---

## Граф зависимостей фаз

```
0 (planning, уже сделана)
└── 1 (types)
    ├── 2 (theme)
    └── 3 (scaffold)
        ├── 4 (FilterBar)
        ├── 5 (Panel + adaptive)
        ├── 6 (Presets) ─── зависит от 9 (DnD)
        ├── 7 (FieldsEditor) ─── зависит от 9 (DnD)
        ├── 8 (FilterField controls)
        ├── 9 (DnD wrapper)
        └── 10 (locale)
            └── 11 (tests)
                └── 12 (docs)
                    └── 13 (playground)
                        └── 14 (skill)
                            └── 15 (QA)
```

Фазы 4–8 + 9 + 10 можно делать параллельно после 3. Сначала 9 (DnD wrapper), потом 6 и 7 поверх неё.

---

## Оценка объёма

- Фазы 1–3: пол-дня.
- Фазы 4–8: 2-3 дня (самое мясо — `FilterField` под все типы).
- Фаза 9: пол-дня.
- Фаза 10: 2-3 часа.
- Фаза 11: день (тесты на все типы полей и сценарии).
- Фазы 12–15: день.

Итого реалистично: **5-6 рабочих дней** одним разработчиком, при условии, что все нужные базовые компоненты (`InputTags`, `Popover`, `Drawer`, `CommandPalette`, `NavigationMenu`, `DropdownMenu`, `Form`, `Modal`, `SelectMenu`, `useOverlay`, `useDevice`) уже стабильны в библиотеке — а они есть.
