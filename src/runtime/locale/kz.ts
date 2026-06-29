import type { Messages } from '../types/locale'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Қазақша',
  code: 'kz',
  locale: 'kk',
  messages: {
    alert: {
      close: 'Жабу'
    },
    authForm: {
      hidePassword: 'Құпиясөзді жасыру',
      showPassword: 'Құпиясөзді көрсету',
      submit: 'Жалғастыру'
    },
    banner: {
      close: 'Жабу'
    },
    calendar: {
      nextMonth: 'Келесі ай',
      nextYear: 'Келесі жыл',
      prevMonth: 'Алдыңғы ай',
      prevYear: 'Алдыңғы жыл'
    },
    carousel: {
      dots: 'Көрсету үшін слайдты таңдаңыз',
      goto: '{slide} слайдына өту',
      next: 'Келесі',
      prev: 'Алдыңғы'
    },
    chatPrompt: {
      placeholder: 'Хабарламаңызды осында енгізіңіз…'
    },
    chatPromptSubmit: {
      label: 'Жіберу'
    },
    colorMode: {
      dark: 'Қараңғы',
      light: 'Жарық',
      switchToDark: 'Қараңғы режимге ауысу',
      switchToLight: 'Жарық режимге ауысу',
      system: 'Жүйелік'
    },
    commandPalette: {
      back: 'Артқа',
      close: 'Жабу',
      noData: 'Дерек жоқ',
      noMatch: 'Сәйкестіктер табылмады',
      placeholder: 'Команда енгізіңіз немесе іздеңіз…'
    },
    contentSearch: {
      links: 'Нәтижелер',
      search: 'Нәтижелер',
      theme: 'Тақырып'
    },
    contentSearchButton: {
      label: 'Іздеу…'
    },
    contentToc: {
      title: 'Осы бетте'
    },
    dropdownMenu: {
      noMatch: 'Сәйкес дерек жоқ',
      search: 'Іздеу…'
    },
    dashboardSearch: {
      theme: 'Тақырып'
    },
    dashboardSearchButton: {
      label: 'Іздеу…'
    },
    dashboardSidebarCollapse: {
      collapse: 'Бүйірлік тақтаны жию',
      expand: 'Бүйірлік тақтаны кеңейту'
    },
    dashboardSidebarToggle: {
      close: 'Бүйірлік тақтаны жабу',
      open: 'Бүйірлік тақтаны ашу'
    },
    error: {
      clear: 'Қайталап көру'
    },
    fileUpload: {
      removeFile: '{filename} жою'
    },
    header: {
      close: 'Мәзірді жабу',
      open: 'Мәзірді ашу'
    },
    inputMenu: {
      create: '"{label}" жасау',
      noData: 'Дерек жоқ',
      noMatch: 'Сәйкестіктер табылмады'
    },
    inputNumber: {
      decrement: 'Кеміту',
      increment: 'Арттыру'
    },
    modal: {
      close: 'Жабу'
    },
    pricingTable: {
      caption: 'Баға жоспарларын салыстыру'
    },
    prose: {
      codeCollapse: {
        closeText: 'Жасыру',
        name: 'код',
        openText: 'Көрсету'
      },
      collapsible: {
        closeText: 'Жасыру',
        name: 'қасиеттер',
        openText: 'Көрсету'
      },
      pre: {
        copy: 'Кодты алмасу буферіне көшіру'
      },
      prompt: {
        copy: 'Нұсқауды көшіру',
        openIn: '{name} ішінде ашу'
      }
    },
    chatReasoning: {
      thinking: 'Ойлануда…',
      thought: 'Ойлану аяқталды',
      thoughtFor: 'Ойлану {duration} созылды'
    },
    sidebar: {
      close: 'Жабу',
      toggle: 'Ауыстыру'
    },
    selectMenu: {
      create: '"{label}" жасау',
      noData: 'Дерек жоқ',
      noMatch: 'Сәйкестіктер табылмады',
      search: 'Іздеу…'
    },
    slideover: {
      close: 'Жабу'
    },
    table: {
      noData: 'Дерек жоқ'
    },
    toast: {
      close: 'Жабу'
    },
    sidebarLayout: {
      open: 'Навигацияны ашу',
      close: 'Навигацияны жабу',
      slideoverTitle: 'Навигация',
      slideoverDescription: 'Мазмұн навигациясы'
    }
  }
})
