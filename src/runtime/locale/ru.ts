import { defineLocale } from '../composables/defineLocale'

export default defineLocale({
  name: 'Русский',
  code: 'ru',
  messages: {
    inputMenu: {
      noMatch: 'Совпадений не найдено',
      noData: 'Нет данных',
      create: 'Создать "{label}"'
    },
    inputNumber: {
      increment: 'Увеличить',
      decrement: 'Уменьшить'
    },
    commandPalette: {
      placeholder: 'Введите команду или выполните поиск...',
      noMatch: 'Совпадений не найдено',
      noData: 'Нет данных',
      close: 'Закрыть'
    },
    selectMenu: {
      noMatch: 'Совпадений не найдено',
      noData: 'Нет данных',
      create: 'Создать "{label}"',
      search: 'Поиск...'
    },
    toast: {
      close: 'Закрыть'
    },
    carousel: {
      prev: 'Назад',
      next: 'Далее',
      goto: 'Перейти к {slide}'
    },
    modal: {
      close: 'Закрыть'
    },
    slideover: {
      close: 'Закрыть'
    },
    alert: {
      close: 'Закрыть'
    },
    table: {
      noData: 'Нет данных'
    }
  }
})
