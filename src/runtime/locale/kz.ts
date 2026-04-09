import type { Messages } from '../types'
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
      hidePassword: 'Құпия сөзді жасыру',
      showPassword: 'Құпия сөзді көрсету',
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
      dots: 'Көрсетілетін слайдты таңдау',
      goto: '{slide} слайдына өту',
      next: 'Келесі',
      prev: 'Алдыңғы'
    },
    chatPrompt: {
      placeholder: 'Хабарламаңызды осында енгізіңіз...'
    },
    chatPromptSubmit: {
      label: 'Жіберу'
    },
    colorMode: {
      dark: 'Қараңғы',
      light: 'Ашық',
      switchToDark: 'Қараңғы режимге ауысу',
      switchToLight: 'Ашық режимге ауысу',
      system: 'Жүйе'
    },
    commandPalette: {
      back: 'Артқа',
      close: 'Жабу',
      noData: 'Деректер жоқ',
      noMatch: 'Сәйкестік табылмады',
      placeholder: 'Бұйрық енгізіңіз немесе іздеңіз...'
    },
    contentSearch: {
      links: 'Нәтижелер',
      theme: 'Тақырып'
    },
    contentSearchButton: {
      label: 'Іздеу...'
    },
    contentToc: {
      title: 'Осы бетте'
    },
    dropdownMenu: {
      noMatch: 'Сәйкес деректер жоқ',
      search: 'Іздеу…'
    },
    dashboardSearch: {
      theme: 'Тақырып'
    },
    dashboardSearchButton: {
      label: 'Іздеу...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Бүйір панельді жию',
      expand: 'Бүйір панельді кеңейту'
    },
    dashboardSidebarToggle: {
      close: 'Бүйір панельді жабу',
      open: 'Бүйір панельді ашу'
    },
    error: {
      clear: 'Қайтадан көру'
    },
    fileUpload: {
      removeFile: '{filename} файлын жою'
    },
    header: {
      close: 'Мәзірді жабу',
      open: 'Мәзірді ашу'
    },
    inputMenu: {
      create: '"{label}" жасау',
      noData: 'Деректер жоқ',
      noMatch: 'Сәйкестік табылмады'
    },
    inputNumber: {
      decrement: 'Азайту',
      increment: 'Көбейту'
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
        name: 'сипаттамалар',
        openText: 'Көрсету'
      },
      pre: {
        copy: 'Көшіру'
      }
    },
    chatReasoning: {
      thinking: 'Ойлануда...',
      thought: 'Ой',
      thoughtFor: '{duration} уақыт бойы ойлану'
    },
    sidebar: {
      close: 'Жабу',
      toggle: 'Ауыстыру'
    },
    selectMenu: {
      create: '"{label}" жасау',
      noData: 'Деректер жоқ',
      noMatch: 'Сәйкестік табылмады',
      search: 'Іздеу...'
    },
    slideover: {
      close: 'Жабу'
    },
    table: {
      noData: 'Деректер жоқ'
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
