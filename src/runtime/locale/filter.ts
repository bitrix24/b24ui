import type { FilterLocale } from '../types/filter'

/**
 * Default Russian locale strings for the `Filter` component.
 * Override via the `locale` prop.
 */
export const defaultFilterLocale: FilterLocale = {
  actions: {
    apply: 'Найти',
    reset: 'Сбросить',
    addField: 'Добавить поле',
    resetFields: 'Вернуть поля по умолчанию',
    saveFilter: 'Сохранить фильтр',
    cancel: 'Отмена',
    rename: 'Переименовать',
    delete: 'Удалить',
    pin: 'Закрепить по умолчанию',
    unpin: 'Снять закрепление',
    moveUp: 'Переместить вверх',
    moveDown: 'Переместить вниз',
    clearValue: 'Очистить значение',
    fieldFilled: 'Заполнено',
    fieldEmpty: 'Не заполнено'
  },
  operators: {
    eq: 'Точно',
    neq: 'Не равно',
    gt: 'Больше',
    gte: 'Больше или равно',
    lt: 'Меньше',
    lte: 'Меньше или равно',
    between: 'От и до',
    in: 'Одно из',
    contains: 'Содержит',
    startsWith: 'Начинается с',
    filled: 'Заполнено',
    empty: 'Не заполнено'
  },
  datePresets: {
    'any': 'Любая дата',
    'today': 'Сегодня',
    'yesterday': 'Вчера',
    'tomorrow': 'Завтра',
    'this-week': 'На этой неделе',
    'last-week': 'На прошлой неделе',
    'this-month': 'В этом месяце',
    'last-month': 'В прошлом месяце',
    'this-quarter': 'В этом квартале',
    'last-quarter': 'В прошлом квартале',
    'this-year': 'В этом году',
    'exact': 'Точная дата',
    'range': 'Диапазон',
    'relative': 'За N дней'
  },
  boolean: {
    yes: 'Да',
    no: 'Нет',
    any: 'Не важно'
  },
  tooltips: {
    dragField: 'Потяните, чтобы отсортировать список полей',
    removeField: 'Удалить поле',
    search: 'Поиск',
    settings: 'Настройки',
    clear: 'Сбросить фильтр'
  },
  placeholders: {
    search: '+поиск',
    presetName: 'Название фильтра',
    value: ''
  },
  empty: {
    fields: 'Добавьте поля, чтобы настроить фильтр',
    presets: 'Сохранённых фильтров пока нет'
  },
  confirms: {
    deletePreset: 'Удалить этот фильтр?'
  }
}
