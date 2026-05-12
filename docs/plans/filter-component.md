# Компонент Filter для b24ui

Спецификация компонента фильтра, повторяющего поведение нативного фильтра Битрикс24, плюс план разработки по фазам.

**Источники:**
- Скриншот с пояснениями (см. чат)
- [Как искать элементы в CRM](https://helpdesk.bitrix24.ru/open/25505108/)
- [Как работают фильтры в CRM](https://helpdesk.bitrix24.ru/open/24206616/)
- [b24ui llms.txt](https://bitrix24.github.io/b24ui/llms.txt)

---

# Часть I. Спецификация

## 0. Принципы

Зафиксированы по итогам обсуждения:

1. **View-only компонент.** Никаких REST-вызовов внутри. Все данные приходят через `props`, все изменения уходят через `events`. Загрузку пользователей, сущностей, сохранение пресетов на сервер — делает потребитель.
2. **Универсальный.** Не привязан к CRM. Никаких CRM-специфичных типов в ядре. Поля задаются через схему `FieldConfig`, типы расширяются через слоты или регистрацию кастомных рендереров.
3. **Группировка полей — общий механизм.** Раздел "Сделка + Компания" из доки Битрикса — это просто два поля из разных групп. В пикере полей есть `group`, и больше ничего CRM-специфичного.
4. **Поиск и поля работают через `AND`.** Текстовый поиск — это отдельное значение, которое всегда комбинируется с полями. В `FilterValue` лежит отдельно от значений полей.

---

## 1. Анатомия (подкомпоненты)

Один большой `Filter` логически делится на 5 частей — это упрощает API и переиспользование:

1. **`FilterBar`** — свёрнутая полоска с поиском (то, что видно в строке списка).
2. **`FilterPanel`** — выпадающая панель, которая раскрывается по клику.
3. **`FilterPresets`** — левая колонка со списком сохранённых фильтров.
4. **`FilterFieldsEditor`** — правая колонка с полями.
5. **`FilterField`** — одна строка поля (label + контрол + меню "..." + drag-handle + удаление).

---

## 2. FilterBar — свёрнутый вид

**Корневой компонент — `InputTags`.** Он совмещает в одном контейнере поиск и чипы условий, что точно ложится на нужный UX.

Структура:

- **Внутренний `<input>` `InputTags`** — это и есть наше "+поиск" (фритекстовый ввод). Работает **через AND** с полями.
- **Чипы внутри `InputTags`** — активные условия фильтра. Формируются программно после "Найти", не через нативное добавление в инпут.
- **Логика отображения чипов:**
  - Первые **3 тега** — отдельные чипы (`Сумма > 1000 ×`, `За месяц ×`, `Группа стадий: ... ×`).
  - Остальные сворачиваются в один тег-счётчик `+N` (или `ещё N`). Клик по нему раскрывает `FilterPanel`.
  - Если активен пресет — его имя идёт **первым тегом** (`Сделки в работе ×`, удаление = снять пресет).
- **`trailing`-слот `InputTags`** — иконки лупы, × (полный сброс), шестерёнки.
- **Клик по фону `InputTags`** (мимо чипов и инпута) — раскрывает `FilterPanel`.

### Нюансы использования InputTags

Поскольку теги формируются программно, нативное добавление чипов через input нам **не нужно**:

- `addOnBlur={false}`, `addOnTab={false}`, `delimiter` не задаём — Enter в инпуте не добавляет тег.
- Enter в поиске = `@apply` (с дебаунсом для live-search — отдельный prop).
- Удаление чипа (`removeTag`) — диспатчим в зависимости от типа: снять пресет / убрать условие / открыть панель (для counter-чипа).
- Через `convertValue` / `displayValue` храним в `v-model` структурированные объекты, а не строки.

---

## 3. FilterPresets (сохранённые фильтры)

- Список пресетов с выделением активного.
- Системные пресеты (нельзя удалить) + пользовательские. Отличие задаётся флагом `system: true` в `Preset`.
- **При первом открытии раздела:**
  - Если есть пресет с пином → активируется **поиск + этот пресет**.
  - Если пина нет → активен **только поиск**, ни один пресет не выбран.
- **Пин ("назначить по умолчанию")** — определяет пресет, который активируется при первой загрузке. Только один пресет может быть пином.
- На каждом пресете при наведении — меню (⚙️ или контекст):
  - переместить (drag) — изменение порядка;
  - назначить/снять пин;
  - переименовать;
  - удалить.
- **Drag & drop пресетов** — включён (см. раздел 7).
- Кнопка **`+ Сохранить фильтр`** снизу — сохраняет текущий набор полей и значений как новый пресет.

### Поток работы с пресетом

1. Пользователь кликает на пресет (или пресет активируется автоматически по пину при первой загрузке).
2. Пресет загружает свой набор полей и значения в редактор.
3. Пользователь может **довыбрать поля** через "Добавить поле" и **изменить значения**.
4. Нажимает **`Найти`** — состояние применяется.
5. В `FilterBar` отображается активное состояние: `Badge` с именем пресета + `Chip` со счётчиком условий.
6. Эмитится `@apply` родительскому компоненту с финальными значениями и текстом поиска.

### Сохранение пресета — UI зависит от устройства

| Устройство | UI |
|---|---|
| Desktop | **Inline-инпут** прямо в списке пресетов (как переименование файла) |
| Mobile | **`Modal`** — в `Drawer` inline-редактирование неудобно |

Выбор делается автоматически через `useDevice`.

---

## 4. FilterFieldsEditor (правая колонка)

- Динамический список активных полей фильтра (порядок настраивается пользователем).
- **Drag & drop** для сортировки полей (иконка ☰ слева + тултип "Потяните, чтобы отсортировать список полей").
- **Удаление поля** крестиком справа при наведении.
- Ссылка **`Добавить поле`** — открывает пикер всех доступных полей.
- Ссылка **`Вернуть поля по умолчанию`** — **сбрасывает только набор полей**. Значения у тех полей, что остались в дефолтном наборе, сохраняются. Активный пресет тоже не сбрасывается.
- Внизу — **`Найти`** (primary) и **`Сбросить`** (secondary). `Сбросить` обнуляет все значения, но не трогает набор полей.

### Пикер добавления поля

- Поиск по названию (fuzzy через `CommandPalette`).
- **Группировка полей** (`FieldConfig.group`). Группы — это любое логическое разделение: "Системные / Пользовательские", "Сделка / Компания / Контакт", "Основные / Дополнительные". Компонент о смысле групп ничего не знает, просто рендерит секции.
- Уже добавленные поля помечаются (disabled или галочкой).

---

## 5. FilterField — одна строка поля

Каждое поле = label сверху + контрол + меню `...` справа.

### Типы контролов в ядре

Только универсальные типы. Никаких `crm-status` и подобного — это делается на стороне потребителя через слот `#field-{type}`.

| Тип | Поведение |
|---|---|
| `string` | Обычный input |
| `number` | Селектор оператора (`Точно`, `Больше`, `Меньше`, `От и до`) + одно или два поля |
| `money` | Number + селект валюты |
| `date` | Селект пресетов диапазонов: `Любая дата`, `Сегодня`, `Вчера`, `На этой неделе`, `За месяц`, `За квартал`, `Точная дата`, `Диапазон`, `За N дней назад` |
| `time` | Время |
| `select` | Одиночный выбор из списка |
| `multiselect` | Чипы (как "Группа стадий 'Сделка в работе' ×") |
| `boolean` | Да / Нет / Не важно |
| `custom` | Слот `#field-{type}` — потребитель рендерит сам |

**User picker, Entity picker, CRM-стадии** — это `custom`-типы, реализуемые поверх.

### Меню `...` у каждого поля

- **Заполнено** / **Не заполнено** — это **специальные операторы фильтра**, проверяющие состояние данных в записи (есть значение / нет значения), а не UI-режим. В `FilterValue` хранятся как `{ operator: 'filled' }` / `{ operator: 'empty' }`. Доступны для большинства типов (кроме файл / список / бронирование). При выборе UI скрывает или дизейблит инпут значения — потому что оператор сам по себе определяет условие.
- Очистить значение.
- (Опционально) Закрепить поле — чтобы оно не удалялось при "Вернуть по умолчанию".

---

## 6. Маппинг на компоненты b24ui

### 6.1 FilterBar

Корневой контейнер — **`InputTags`** (вместо склейки из отдельных Input + Badge + Chip + Buttons).

| Элемент | Реализация | Комментарий |
|---|---|---|
| Корень FilterBar | **`InputTags`** | Совмещает поиск и чипы условий |
| Внутренний инпут "+поиск" | нативный `<input>` `InputTags` | Без `addOnBlur`/`addOnTab`/`delimiter` — Enter эмитит `@apply` |
| Чип имени пресета (первый тег) | элемент массива `v-model` `InputTags` | Через `convertValue`/`displayValue` |
| Чипы условий (теги 2–4) | элементы того же массива | Кастомный рендер через слот `item-text` |
| Чип-счётчик `+N` для скрытых | последний элемент массива | По клику открывает `FilterPanel` |
| Иконки лупы, ×, шестерёнки | `trailing`-слот `InputTags` + `Button` | — |
| Подсказки при наведении | `Tooltip` | — |

### 6.2 FilterPanel — раскрытая панель

Адаптивная стратегия через `useDevice`:

- **Desktop** → `Popover` (non-modal, якорится к FilterBar).
- **Mobile** → **`Drawer`** (зафиксировано). Соответствует UX мобильных приложений Битрикс24.

`Modal` и `Slideover` не используем.

### 6.3 FilterPresets (левая колонка)

| Элемент | Компонент | Комментарий |
|---|---|---|
| Список пресетов | `NavigationMenu` (`orientation="vertical"`) | Active state + иконки |
| Иконка пина у избранного | slot в `NavigationMenu` + `B24Icons` | — |
| Меню действий на пресете | `DropdownMenu` | По клику на ⋮ |
| Кнопка `+ Сохранить фильтр` | `Button` (`variant="link"` или `"ghost"`) | — |
| Drag-and-drop пресетов | ❌ нет в b24ui | См. раздел 7 |
| Inline-переименование / сохранение | `Input` (на месте пункта меню) | — |
| Модалка сохранения пресета (mobile) | `Modal` + `Form` | Только в mobile-режиме, на desktop — inline |
| Confirm удаления пресета | `Modal` (или `useOverlay`) | — |

### 6.4 FilterFieldsEditor (правая колонка)

| Элемент | Компонент | Комментарий |
|---|---|---|
| Скролл-контейнер для длинного списка полей | `ScrollArea` | Виртуализация |
| Обёртка одного поля | `FormField` | Container с валидацией |
| Вся форма целиком | `Form` | Submit по Enter / "Найти" |
| Меню `...` справа от поля | `DropdownMenu` | — |
| Кнопка-крестик удаления поля | `Button` (icon-only, `variant="ghost"`) | На ховере |
| Drag-handle ☰ | свой icon-button + DnD-обвязка | См. раздел 7 |
| "Добавить поле" | `Button` (`variant="link"`) | Открывает пикер |
| "Вернуть поля по умолчанию" | `Button` (`variant="link"`) | — |
| Пикер добавления поля | **`CommandPalette`** (в `Popover` или `Drawer`) | Fuzzy-поиск + группировка |
| Tooltip "Потяните, чтобы отсортировать" | `Tooltip` | — |
| Кнопки `Найти` / `Сбросить` | `Button` (`primary` / `secondary`) | — |

### 6.5 FilterField — контролы по типам

| Тип поля | Компонент | Заметки |
|---|---|---|
| `string` | `Input` | — |
| `number` | `InputNumber` | — |
| `money` | `InputNumber` + `Select` (валюта) | — |
| Оператор сравнения | `Select` | Слева от value-инпута |
| `date` (одиночная) | `InputDate` | — |
| `daterange` с пресетами | `Select` + `Calendar` снизу при выборе "Точная дата" | `InputDate` сам не даёт пресетов |
| `time` | `InputTime` | — |
| `select` (одиночный) | `Select` или `SelectMenu` | `SelectMenu` если нужен поиск |
| `multiselect` с чипами | `SelectMenu` (multiple) или `InputTags` | — |
| `boolean` | `RadioGroup` или `Select` | — |
| `custom` | через слот `#field-{type}` | Потребитель сам решает |

**Кастомные типы (вне ядра, рекомендуемые рецепты):**
- `user` → `SelectMenu` (multiple, кастомный `#item`) + `User` / `Avatar` / `AvatarGroup`.
- `entity` (сделка / контакт / компания) → `SelectMenu` с async-загрузкой.
- Файл → `FileUpload` (если вообще нужно).
- Цвет → `ColorPicker`.
- CRM-стадии с подвидами → `SelectMenu` с группами + `Tabs`.

### 6.6 Системные элементы

| Что | Компонент / композабл |
|---|---|
| Уведомление "Фильтр сохранён" | `useToast` + `Toast` (вызывает потребитель) |
| Скелетон при загрузке | `Skeleton` |
| Пустое состояние | `Empty` |
| Программное открытие модалок | `useOverlay` |
| Адаптив popover ↔ drawer | `useDevice` |
| Хоткеи (Esc закрыть, Enter применить) | `defineShortcuts` |
| Прокрутка длинного списка с тенью | `useScrollShadow` |

---

## 7. Drag-and-drop

В b24ui нет sortable-компонента. Нужен **и для пресетов, и для полей**.

Варианты:

1. **`@vueuse/integrations/useSortable`** (на базе SortableJS) — рекомендую. Легковесно, touch-support.
2. **`vue-draggable-plus`** — если нужен декларативный синтаксис.
3. Свой на HTML5 Drag API — не советую.

DnD оборачиваем тонким внутренним компонентом `<FilterSortableList>`, чтобы потом легко заменить реализацию.

---

## 8. Композиция компонентов

```
<Filter>                                  ← корневой
├── <FilterBar>
│   └── InputTags                         ← один компонент вместо склейки
│       ├── v-model: [preset tag, condition tag, condition tag, condition tag, +N counter]
│       ├── input внутри (поиск)
│       └── trailing slot: Button × N (лупа, ×, шестерёнка)
│
└── <Popover> | <Drawer>                  ← по useDevice
    └── <FilterPanel>
        ├── <FilterPresets>
        │   ├── NavigationMenu        ← обёрнут в FilterSortableList
        │   ├── DropdownMenu (на каждом пресете)
        │   ├── Input (inline-сохранение/переименование)
        │   └── Button (+ Сохранить фильтр)
        │
        └── <Form>                        ← вся правая часть
            └── <FilterFieldsEditor>
                ├── ScrollArea
                │   └── FilterSortableList
                │       └── <FilterField> × N
                │           ├── FormField
                │           ├── [Input | InputNumber | InputDate | Select | SelectMenu | slot]
                │           └── DropdownMenu (...)
                ├── Button (Добавить поле) ──► CommandPalette в Popover/Drawer
                ├── Button (Вернуть по умолчанию)
                └── Button × 2 (Найти, Сбросить)
```

---

## 9. TypeScript-интерфейсы

### 9.1 Базовые типы

```ts
import type { IconComponent } from '@bitrix24/b24icons-vue'
import type { AvatarProps } from '@bitrix24/b24ui-nuxt'

/**
 * Типы полей, поддерживаемые в ядре.
 * Расширение — через тип 'custom' + слот `field-{type}`.
 */
export type FieldType =
  | 'string'
  | 'number'
  | 'money'
  | 'date'
  | 'time'
  | 'select'
  | 'multiselect'
  | 'boolean'
  | 'custom'

/**
 * Операторы фильтрации.
 * `filled` / `empty` — состояние данных в записи (значение есть / нет), не UI-режим.
 */
export type FilterOperator =
  | 'eq'          // равно
  | 'neq'         // не равно
  | 'gt'          // больше
  | 'gte'         // больше или равно
  | 'lt'          // меньше
  | 'lte'         // меньше или равно
  | 'between'     // диапазон [from, to]
  | 'in'          // одно из значений (для multiselect)
  | 'contains'    // содержит подстроку (для string)
  | 'startsWith'  // начинается с (для string)
  | 'filled'      // в записи поле заполнено
  | 'empty'       // в записи поле пустое
```

### 9.2 FieldConfig — конфигурация одного поля

```ts
export interface FieldOption {
  value: string | number
  label: string
  icon?: IconComponent
  avatar?: AvatarProps
  disabled?: boolean
}

export interface FieldConfig {
  /** Уникальный id поля */
  id: string
  /** Заголовок над контролом */
  label: string
  /** Тип контрола */
  type: FieldType

  /** Группа для пикера полей. Любое строковое разделение (системные/пользовательские, сущности и т.д.) */
  group?: string
  /** Видимое название группы (если отличается от id) */
  groupLabel?: string

  /** Поле всегда активно: не удаляется, не сбрасывается "Вернуть по умолчанию" */
  pinned?: boolean
  /** Можно ли удалить из активного набора. По умолчанию true (если не pinned) */
  removable?: boolean

  /** Доступные операторы. Если не задано — берётся дефолт по типу */
  supportedOperators?: FilterOperator[]
  /** Включена ли опция "Заполнено / Не заполнено" в меню `...`. По умолчанию true */
  allowFilled?: boolean

  /** Подсказка в инпуте */
  placeholder?: string
  /** Описание под полем */
  description?: string

  // Тип-специфичные опции
  /** Для select / multiselect */
  options?: FieldOption[]
  /** Для money — фиксированная валюта поля (если на уровне поля). Иначе валюта — в значении */
  currency?: string
  /** Для number / date */
  min?: number | string
  /** Для number / date */
  max?: number | string

  /** Произвольные данные для слота кастомного типа */
  customMeta?: Record<string, unknown>
}
```

### 9.3 FieldCondition + FilterValue

```ts
/**
 * Условие для одного поля = оператор + (опционально) значение.
 * Discriminated union по `operator` для строгой типизации значения.
 */
export type FieldCondition =
  | { operator: 'filled' }
  | { operator: 'empty' }
  | { operator: 'between'; value: [unknown, unknown] }
  | { operator: 'in'; value: unknown[] }
  | {
      operator:
        | 'eq'
        | 'neq'
        | 'gt'
        | 'gte'
        | 'lt'
        | 'lte'
        | 'contains'
        | 'startsWith'
      value: unknown
    }

/**
 * Карта значений: id поля → его условие.
 * Поля без значения в карту НЕ попадают (используем активность через `activeFields`).
 * Счётчик "6" в FilterBar считается по количеству ключей здесь.
 */
export type FilterValue = Record<string, FieldCondition>
```

### 9.4 DateValue — структура значения для типа `date`

Дата отдельным разделом из-за пресетов диапазонов из доки Битрикса.

```ts
/** Битриксовые пресеты диапазонов дат */
export type DatePreset =
  | 'today'
  | 'yesterday'
  | 'tomorrow'
  | 'this-week'
  | 'last-week'
  | 'this-month'
  | 'last-month'
  | 'this-quarter'
  | 'last-quarter'
  | 'this-year'

/**
 * Значение для FieldCondition.value, когда поле типа 'date'.
 */
export type DateValue =
  | { kind: 'any' }
  | { kind: 'preset'; preset: DatePreset }
  | { kind: 'exact'; date: string /* ISO 8601 */ }
  | { kind: 'range'; from: string; to: string }
  | { kind: 'relative'; days: number; direction: 'past' | 'future' }
```

### 9.5 Preset — сохранённый фильтр

```ts
export interface Preset {
  /** Уникальный id */
  id: string
  /** Видимое имя */
  name: string

  /** id полей в активном наборе и их порядок */
  fields: string[]
  /** Значения по полям */
  values: FilterValue
  /** Сохранённый текстовый поиск (опционально) */
  searchQuery?: string

  /** Системный пресет — нельзя удалить и редактировать */
  system?: boolean
  /**
   * Активируется при первой загрузке.
   * В системе ожидается только один pinned пресет (компонент не валидирует — это ответственность потребителя).
   */
  pinned?: boolean
  /** Порядок в списке пресетов */
  order?: number
}
```

### 9.6 FilterBarTag — теги в `InputTags`

```ts
/**
 * Один элемент в массиве v-model компонента InputTags внутри FilterBar.
 * Слот item-text рендерит каждый тег в зависимости от kind.
 */
export type FilterBarTag =
  | {
      kind: 'preset'
      presetId: string
      label: string
    }
  | {
      kind: 'condition'
      fieldId: string
      label: string         // например, "Сумма > 1000"
      condition: FieldCondition
    }
  | {
      kind: 'counter'
      hiddenCount: number   // сколько условий скрыто за "+N"
    }
```

### 9.7 Props компонента `<Filter>`

```ts
export interface FilterProps {
  // схема и пресеты — снаружи иммутабельные
  /** Схема всех доступных полей */
  fields: FieldConfig[]
  /** Сохранённые пресеты */
  presets?: Preset[]

  // v-model (несколько отдельных моделей)
  /** Значения активных полей. v-model */
  modelValue: FilterValue
  /** id активных полей в порядке отображения. v-model:activeFields */
  activeFields: string[]
  /** id активного пресета. null — пресет не выбран. v-model:activePresetId */
  activePresetId: string | null
  /** Текстовый поиск. v-model:searchQuery */
  searchQuery: string

  /** Дефолтный набор полей для "Вернуть по умолчанию" */
  defaultFields?: string[]
  /** Сколько чипов условий видно в FilterBar до сворачивания (default 3) */
  visibleTagsCount?: number
  /** Состояние загрузки "Найти" */
  loading?: boolean

  // ограничения возможностей (по умолчанию все true)
  allowSavePresets?: boolean
  allowEditPresets?: boolean
  allowReorderFields?: boolean
  allowReorderPresets?: boolean
}
```

### 9.8 Emits компонента `<Filter>`

```ts
export type FilterEmits = {
  // v-model updates
  'update:modelValue': [value: FilterValue]
  'update:activeFields': [fields: string[]]
  'update:activePresetId': [id: string | null]
  'update:searchQuery': [query: string]

  // действия
  /** Нажатие "Найти" или Enter в поиске. AND между values и query */
  apply: [payload: { values: FilterValue; query: string; presetId: string | null }]
  /** "Сбросить" — обнуляет значения, не трогает набор полей */
  reset: []
  /** "Вернуть поля по умолчанию" — сбрасывает только набор полей */
  fieldsReset: []

  // управление пресетами
  /** Сохранить текущее состояние как новый пресет */
  presetSave: [payload: { name: string; preset: Omit<Preset, 'id'> }]
  /** Обновить пресет (переименование, pin, порядок) */
  presetUpdate: [payload: { id: string; patch: Partial<Preset> }]
  /** Удалить пресет */
  presetDelete: [id: string]
}
```

### 9.9 Slots компонента `<Filter>`

```ts
export interface FilterSlots {
  /**
   * Кастомный рендерер для конкретного типа поля.
   * Для типа 'custom' — обязателен. Для встроенных типов — опциональное переопределение.
   * Имя слота: `field-{type}`, например `field-user`, `field-entity`.
   */
  [key: `field-${string}`]: (props: {
    field: FieldConfig
    condition: FieldCondition | null
    update: (condition: FieldCondition | null) => void
  }) => any

  /** Дополнительные действия в DropdownMenu пресета */
  'preset-actions'?: (props: { preset: Preset }) => any

  /** Плейсхолдер, когда активных полей нет */
  'empty-fields'?: () => any

  /** Кастомный FilterBar (если хочется свой триггер вместо встроенного InputTags) */
  bar?: (props: {
    tags: FilterBarTag[]
    searchQuery: string
    open: () => void
    apply: () => void
    reset: () => void
  }) => any
}
```

### 9.10 Пример использования

```ts
// Пример FieldConfig
const fields: FieldConfig[] = [
  { id: 'name', label: 'Название', type: 'string', group: 'main' },
  { id: 'amount', label: 'Сумма', type: 'money', group: 'main' },
  {
    id: 'closeDate',
    label: 'Дата завершения',
    type: 'date',
    group: 'main',
  },
  {
    id: 'stageGroup',
    label: 'Группа стадий',
    type: 'multiselect',
    group: 'crm',
    options: [
      { value: 'in-progress', label: 'Сделка в работе' },
      { value: 'won', label: 'Сделка заключена' },
      { value: 'lost', label: 'Сделка провалена' },
    ],
  },
  // Кастомный тип — рендерится через slot field-user
  { id: 'responsible', label: 'Ответственный', type: 'custom', customMeta: { kind: 'user' } },
]

// Пример FilterValue (то, что лежит в v-model)
const value: FilterValue = {
  amount: { operator: 'gt', value: 1000 },
  closeDate: {
    operator: 'eq',
    value: { kind: 'preset', preset: 'this-month' } satisfies DateValue,
  },
  stageGroup: { operator: 'in', value: ['in-progress'] },
  // 'name' заполнено не было → в карте отсутствует
  responsible: { operator: 'filled' },
}

// Пример Preset
const preset: Preset = {
  id: 'deals-in-progress',
  name: 'Сделки в работе',
  fields: ['name', 'amount', 'closeDate', 'stageGroup'],
  values: {
    stageGroup: { operator: 'in', value: ['in-progress'] },
  },
  system: true,
  pinned: true,
}
```

---

## 10. Логика, о которой легко забыть

- **Дебаунс** на `searchQuery`, чтобы не дёргать `@apply` на каждый символ.
- **Грязное состояние**: значения изменены, но "Найти" ещё не нажата — визуально подсветить кнопку.
- **Локализация** операторов и пресетов дат.
- **Доступность**: drag через клавиатуру, ARIA для попапа, фокус-трап в панели. Подробнее — в разделе 12.
- **Валидация диапазонов**: "от" не больше "до" в датах и числах.
- **AND-логика поиска и полей**: в `@apply` всегда уходят оба значения, даже если одно пустое.

---

## 11. Производительность

Перечисляю только то, что легко проворонить именно в этом компоненте.

### Большие схемы полей
- В CRM Битрикс24 у одной сущности могут быть сотни пользовательских полей. Внутри строим `Map<string, FieldConfig>` через `computed` — все обращения по id O(1), никаких `.find()` в шаблонах.
- Пикер полей (`CommandPalette`) — **lazy mount**: рендер и инициализация Fuse.js происходят только при открытии. Индекс пересобираем через `shallowRef` + `watch` на `fields`.
- Виртуализация в `ScrollArea` (для пикера и для списка активных полей) — включаем только когда полей **> 50**. Ниже — без виртуализации, чтобы DnD работал корректно.

### DnD + виртуализация
Это плохо сочетается: SortableJS не видит размонтированных элементов. Решения:
- либо виртуализацию включаем, только если DnD сейчас не активен;
- либо переходим на position-based DnD (drop меняет `order`, список пересортируется сам).

Конкретный выбор — на этапе имплементации, замерим оба.

### FilterBar и пересчёт тегов
- `FilterBarTag[]` — `computed` от `(activeFields, modelValue, activePresetId, visibleTagsCount)`. Не пересчитывается на каждый символ поиска.
- Custom-слот `#item-text` у `InputTags` должен быть лёгким: текст + опциональная иконка. Тяжёлые компоненты сюда не пихать.
- Дебаунс `searchQuery` — отдельно, default 300 ms, настраивается через prop.

### Реактивность FilterValue
- `Record<string, FieldCondition>` — Vue трекает глубоко. При обновлении условия одного поля заменяем **запись целиком** (`{ ...value, [id]: newCondition }`), а не мутируем внутри. Чище и дешевле для трекинга.

### Batching при смене пресета
Применение пресета затрагивает 4 v-model. Эмитить по одному — родитель получит 4 ререндера.

Решение: внутри компонента батчим обновления в `nextTick`, чтобы родитель ререндерился один раз. Или дополнительно экспонируем императивный `applyPreset(id)` через `defineExpose`.

### SSR
- DnD-инстансы создаём только на клиенте через `onMounted`.
- `useDevice` должен возвращать стабильный дефолт на SSR (обычно desktop), иначе будет гидрейшн-мисматч и Drawer/Popover откроется не тот.

---

## 12. Безопасность

### XSS
- **Никакого `v-html` в ядре.** Все внешние строки (`FieldConfig.label`, `Preset.name`, `FieldOption.label`, метки тегов в `FilterBarTag`) — только через интерполяцию. Vue сам экранирует.
- Для авторов слотов кастомных типов это **контрактное требование** — фиксируем в README библиотеки.

### Валидация рантайма
TypeScript защищает только в момент компиляции. На рантайме компонент должен gracefully игнорировать мусор:
- `activeFields` с id, которых нет в `fields` → молча отфильтровать.
- `FilterValue` с неизвестными ключами → не рендерить, но **не выбрасывать** значения (чтобы не терять данные при перемонтировании со старыми пресетами).
- `FieldCondition.operator` не из списка → пропустить условие, в dev-режиме `console.warn`.

### Лимиты размера
Защита от случайного раздутия (например, программная генерация фильтров или ошибки на сервере):
- `maxSearchLength` (default 2000).
- `maxActiveFields` (default 50).
- Размер массива в операторе `in` — рекомендация для потребителя, в ядре soft-check + warn.

Лимиты не хардкодим — настраиваемые через props, дефолты щедрые.

### Prototype pollution
Пресеты часто грузятся с сервера. **Парсинг — ответственность потребителя**: фильтровать ключи `__proto__`, `constructor`, `prototype` перед записью в `FilterValue` / `fields`.

В ядре не делать `Object.assign({}, untrusted)` без фильтрации.

### `customMeta` как вектор атаки
Ядро **не вызывает и не парсит** содержимое `customMeta` — только проксирует в слот. Атаковать через него ядро невозможно, за содержимое отвечает автор слота.

### Изоляция от формы родителя
- Все внутренние `<button>` — `type="button"`. Иначе при встраивании в страничную `<form>` Найти/Сбросить отправят внешнюю форму.
- Внутренний `<Form>` для валидации — без нативного `action`.

### Доступность как риск
DnD без клавиатурной альтернативы — нарушение WCAG (юридический риск для интегратора в ряде юрисдикций).

Реализуем стрелочки "вверх / вниз" в меню `...` каждого поля как клавиатурную альтернативу drag-перетаскиванию. То же — для меню пресета.

### Конфиденциальность (на будущее, к URL sync)
Когда дойдём до URL-синхронизации (см. раздел 14) — добавить prop `urlSync: 'all' | 'safe' | 'none'` и флаг `FieldConfig.sensitive`. В режиме `safe` чувствительные поля исключаются из URL.

### Логирование
В dev-режиме не логировать `FilterValue` целиком — может содержать PII. Логируем только структуру (ключи + типы условий, без `value`).

---

## 13. Что вынести в отдельные компоненты библиотеки

Эти штуки шире фильтра и пригодятся в других местах:

- `DateRangePicker` с битриксовыми пресетами диапазонов.
- `NumberRangeInput` с оператором.
- `SortableList` (для drag-and-drop полей и пресетов).

Не в ядре фильтра, но рекомендуемые рецепты для потребителей:
- `UserPicker` (мультивыбор сотрудников) — реализуется через `custom` тип.
- `EntityPicker` — то же.

---

## 14. Отложено на потом

- **URL-синхронизация** значений фильтра в query string. Сейчас не делаем, потом разберёмся отдельно.

---

## 15. Открытые вопросы

1. **`currency` в схеме денежного поля** — где жить:
   - (a) на `FieldConfig` (как сейчас) — валюта фиксирована за полем;
   - (b) внутри значения, например `value: { amount: number; currency: string }` — пользователь сам выбирает валюту в фильтре.
   Вариант (b) нужен, если в проекте кросс-валютная CRM. Если нет — оставляем (a).
2. **Type guards для `FieldCondition`** — TypeScript нарроужит discriminated union по `operator` хорошо в коде, но в Vue-шаблонах через `v-if` нарроуинг иногда теряется. Возможно, понадобится набор хелперов (`isFilled`, `isRangeOp`, `isInOp` и т.д.). Решаем при имплементации, если столкнёмся.

---

## 16. Зафиксированные решения

- **Теги в FilterBar:** показываем первые **3 активных условия** как отдельные чипы, остальные сворачиваем в один чип-счётчик `+N`. Имя пресета — отдельный (первый) чип, если пресет активен. Реализуется через `InputTags`.
  - Количество видимых тегов выносим в prop `visibleTagsCount` (по умолчанию `3`).
- **"Заполнено / Не заполнено"** — это специальные операторы фильтра (`filled` / `empty`), описывающие состояние данных в записи. Хранятся в `FilterValue` рядом с обычными операторами (`eq`, `gt`, `lt`, `between`). Это **не отдельный UI-режим** — просто значение оператора, на которое реагирует рендер поля (инпут значения скрывается или дизейблится).

---

# Часть II. План разработки

План разбит на фазы. Каждая фаза — самостоятельный коммит (conventional commits), который можно проверить и зареверсить. Все артефакты (компонент, тема, типы, тесты, docs, playground) идут по существующему workflow из `AGENTS.md`.

## Принципы реализации

1. **View-only.** Никаких REST-вызовов внутри. Всё через `props`/`emits`.
2. **Композиция из существующих b24ui-примитивов.** Не пишем своих низкоуровневых компонентов, если есть готовые (`InputTags`, `Popover`, `Drawer`, `CommandPalette`, `NavigationMenu`, `DropdownMenu`, `Form`, `FormField`, `ScrollArea`, `Button`, `Calendar`, `InputDate`, `InputNumber`, `InputTime`, `Select`, `SelectMenu`, `Tooltip`, `Empty`, `Skeleton`).
3. **Один публичный компонент `Filter`** + набор внутренних подкомпонентов, не экспортируемых наружу (пока). Если потребитель захочет частей — экспортируем после того, как API устаканится.
4. **Адаптив:** `useDevice` → `Popover` на desktop, `Drawer` на mobile.
5. **DnD:** обёртка `<FilterSortableList>` поверх `@vueuse/integrations/useSortable`. Если потом понадобится переключиться — меняем одно место.
6. **Темизация:** `tailwind-variants` по конвенции репозитория (`src/theme/filter.ts` + slots для подкомпонентов).
7. **Локализация:** все строки UI («Найти», «Сбросить», «Любая дата», операторы и т.д.) — через `props` с дефолтами на русском. Не хардкодим в шаблонах.

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

## Зависимости и решения, требующие подтверждения

1. **DnD библиотека:** план — `@vueuse/integrations/useSortable` + `sortablejs`. Альтернатива — `vue-draggable-plus`. Решаем на старте Фазы 9.
2. **Currency в `FieldConfig` vs в `FilterValue.value`:** оставляю как в спеке — на `FieldConfig`. Если позже понадобится мульти-валюта — мигрируем через `value: { amount, currency }`.
3. **Экспорт подкомпонентов:** пока только `Filter`. Если потребитель попросит — экспонируем `FilterBar`/`FilterPresets`/`FilterFieldsEditor` позже без breaking change.
4. **URL-синхронизация:** не делаем (раздел 14 спеки — отложено).
5. **`Modal` для confirm удаления:** использовать `useOverlay` + существующий `Modal` (проверить, что он есть).

---

## Граф зависимостей фаз

```
1 (types)
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
