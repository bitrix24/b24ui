import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Українська',
  code: 'ua',
  locale: 'uk',
  messages: {
    alert: {
      close: 'Закрити'
    },
    authForm: {
      hidePassword: 'Приховати пароль',
      showPassword: 'Показати пароль',
      submit: 'Продовжити'
    },
    banner: {
      close: 'Закрити'
    },
    calendar: {
      nextMonth: 'Наступний місяць',
      nextYear: 'Наступний рік',
      prevMonth: 'Попередній місяць',
      prevYear: 'Попередній рік'
    },
    carousel: {
      dots: 'Виберіть слайд для відображення',
      goto: 'Перейти до {slide}',
      next: 'Далі',
      prev: 'Назад'
    },
    chatPrompt: {
      placeholder: 'Введіть ваше повідомлення тут...'
    },
    chatPromptSubmit: {
      label: 'Надіслати'
    },
    colorMode: {
      dark: 'Темна',
      light: 'Світла',
      switchToDark: 'Перейти на темну тему',
      switchToLight: 'Перейти на світлу тему',
      system: 'Системна'
    },
    commandPalette: {
      back: 'Назад',
      close: 'Закрити',
      noData: 'Немає даних',
      noMatch: 'Нічого не знайдено',
      placeholder: 'Введіть команду або пошук...'
    },
    contentSearch: {
      links: 'Результати',
      theme: 'Тема'
    },
    contentSearchButton: {
      label: 'Пошук...'
    },
    contentToc: {
      title: 'На цій сторінці'
    },
    dropdownMenu: {
      noMatch: 'Немає відповідних даних',
      search: 'Пошук…'
    },
    dashboardSearch: {
      theme: 'Тема'
    },
    dashboardSearchButton: {
      label: 'Пошук...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Згорнути бічну панель',
      expand: 'Розгорнути бічну панель'
    },
    dashboardSidebarToggle: {
      close: 'Закрити бічну панель',
      open: 'Відкрити бічну панель'
    },
    error: {
      clear: 'Спробувати знову'
    },
    fileUpload: {
      removeFile: 'Видалити {filename}'
    },
    header: {
      close: 'Закрити меню',
      open: 'Відкрити меню'
    },
    inputMenu: {
      create: 'Створити "{label}"',
      noData: 'Немає даних',
      noMatch: 'Нічого не знайдено'
    },
    inputNumber: {
      decrement: 'Зменшити',
      increment: 'Збільшити'
    },
    modal: {
      close: 'Закрити'
    },
    pricingTable: {
      caption: 'Порівняння тарифних планів'
    },
    prose: {
      codeCollapse: {
        closeText: 'Приховати',
        name: 'код',
        openText: 'Показати'
      },
      collapsible: {
        closeText: 'Приховати',
        name: 'властивості',
        openText: 'Показати'
      },
      pre: {
        copy: 'Копіювати'
      }
    },
    sidebar: {
      close: 'Закрити',
      toggle: 'Перемкнути'
    },
    selectMenu: {
      create: 'Створити "{label}"',
      noData: 'Немає даних',
      noMatch: 'Нічого не знайдено',
      search: 'Пошук...'
    },
    slideover: {
      close: 'Закрити'
    },
    table: {
      noData: 'Немає даних'
    },
    toast: {
      close: 'Закрити'
    },
    sidebarLayout: {
      open: 'Відкрити навігацію',
      close: 'Закрити навігацію',
      slideoverTitle: 'Навігація',
      slideoverDescription: 'Навігація по вмісту'
    }
  }
})
