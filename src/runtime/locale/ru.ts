import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Русский',
  code: 'ru',
  locale: 'ru',
  messages: {
    alert: {
      close: 'Закрыть'
    },
    authForm: {
      hidePassword: 'Скрыть пароль',
      showPassword: 'Показать пароль',
      submit: 'Продолжить'
    },
    banner: {
      close: 'Закрыть'
    },
    calendar: {
      nextMonth: 'Следующий месяц',
      nextYear: 'Следующий год',
      prevMonth: 'Предыдущий месяц',
      prevYear: 'Предыдущий год'
    },
    carousel: {
      dots: 'Выберите слайд для отображения',
      goto: 'Перейти к {slide}',
      next: 'Далее',
      prev: 'Назад'
    },
    chatPrompt: {
      placeholder: 'Введите сообщение…'
    },
    chatPromptSubmit: {
      label: 'Отправить'
    },
    colorMode: {
      dark: 'Тёмная',
      light: 'Светлая',
      switchToDark: 'Переключить на тёмную тему',
      switchToLight: 'Переключить на светлую тему',
      system: 'Системная'
    },
    commandPalette: {
      back: 'Назад',
      close: 'Закрыть',
      noData: 'Нет данных',
      noMatch: 'Совпадений не найдено',
      placeholder: 'Введите команду или поиск…'
    },
    dateTimePicker: {
      backToDate: 'К дате',
      openPicker: 'Открыть выбор',
      hours: 'Часы',
      minutes: 'Минуты',
      presets: {
        today: 'Сегодня',
        tomorrow: 'Завтра',
        endOfWeek: 'В конце недели',
        inAWeek: 'Через неделю',
        endOfMonth: 'В конце месяца'
      }
    },
    contentSearch: {
      links: 'Результаты',
      search: 'Результаты',
      theme: 'Тема'
    },
    contentSearchButton: {
      label: 'Поиск…'
    },
    contentToc: {
      title: 'На этой странице'
    },
    dropdownMenu: {
      noMatch: 'Нет подходящих данных',
      search: 'Поиск…'
    },
    dashboardSearch: {
      theme: 'Тема'
    },
    dashboardSearchButton: {
      label: 'Поиск…'
    },
    dashboardSidebarCollapse: {
      collapse: 'Свернуть боковую панель',
      expand: 'Развернуть боковую панель'
    },
    dashboardSidebarToggle: {
      close: 'Закрыть боковую панель',
      open: 'Открыть боковую панель'
    },
    error: {
      clear: 'Попробовать снова'
    },
    fileUpload: {
      removeFile: 'Удалить {filename}'
    },
    header: {
      close: 'Закрыть меню',
      open: 'Открыть меню'
    },
    inputMenu: {
      create: 'Создать "{label}"',
      noData: 'Нет данных',
      noMatch: 'Совпадений не найдено'
    },
    inputNumber: {
      decrement: 'Уменьшить',
      increment: 'Увеличить'
    },
    modal: {
      close: 'Закрыть'
    },
    pricingTable: {
      caption: 'Сравнение тарифов'
    },
    prose: {
      codeCollapse: {
        closeText: 'Скрыть',
        name: 'код',
        openText: 'Показать'
      },
      collapsible: {
        closeText: 'Скрыть',
        name: 'свойства',
        openText: 'Показать'
      },
      pre: {
        copy: 'Скопировать код в буфер обмена'
      },
      prompt: {
        copy: 'Скопировать промпт',
        openIn: 'Открыть в {name}'
      }
    },
    chatReasoning: {
      thinking: 'Размышляет…',
      thought: 'Размышление завершено',
      thoughtFor: 'Размышление заняло {duration}'
    },
    sidebar: {
      close: 'Закрыть',
      toggle: 'Переключить'
    },
    selectMenu: {
      create: 'Создать "{label}"',
      noData: 'Нет данных',
      noMatch: 'Совпадений не найдено',
      search: 'Поиск…'
    },
    slideover: {
      close: 'Закрыть'
    },
    table: {
      noData: 'Нет данных'
    },
    toast: {
      close: 'Закрыть'
    },
    sidebarLayout: {
      open: 'Открыть навигацию',
      close: 'Закрыть навигацию',
      slideoverTitle: 'Навигация',
      slideoverDescription: 'Навигация по содержимому'
    }
  }
})
