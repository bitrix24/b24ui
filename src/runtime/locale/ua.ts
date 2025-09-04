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
      switchToDark: 'Переключити на темний режим',
      switchToLight: 'Переключити на світлий режим',
      system: 'Системна'
    },
    commandPalette: {
      back: 'Назад',
      close: 'Закрити',
      noData: 'Немає даних',
      noMatch: 'Збігів не знайдено',
      placeholder: 'Введіть команду або виконайте пошук...'
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
      noMatch: 'Збігів не знайдено'
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
        closeText: 'Сховати',
        name: 'код',
        openText: 'Показати'
      },
      collapsible: {
        closeText: 'Сховати',
        name: 'властивості',
        openText: 'Показати'
      },
      pre: {
        copy: 'Скопіювати'
      }
    },
    selectMenu: {
      create: 'Створити "{label}"',
      noData: 'Немає даних',
      noMatch: 'Збігів не знайдено',
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
