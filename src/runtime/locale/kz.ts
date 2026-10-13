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
      label: 'Оқиға күні',
      monthPicker: 'Айды таңдау',
      nextMonth: 'Келесі ай',
      nextYear: 'Келесі жыл',
      prevMonth: 'Алдыңғы ай',
      prevYear: 'Алдыңғы жыл',
      yearPicker: 'Жылды таңдау'
    },
    carousel: {
      dots: 'Көрсету үшін слайдты таңдаңыз',
      goto: '{slide} слайдына өту',
      next: 'Келесі',
      prev: 'Алдыңғы'
    },
    chatMessages: {
      autoScroll: 'Төмен айналдыру'
    },
    chatPrompt: {
      placeholder: 'Хабарламаңызды осында енгізіңіз…'
    },
    chatPromptSubmit: {
      label: 'Жіберу',
      reload: 'Қайталау',
      stop: 'Генерацияны тоқтату'
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
      placeholder: 'Команда енгізіңіз немесе іздеңіз…',
      results: 'Нәтижелер'
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
    dateTimePicker: {
      backToDate: 'Күнге қайту',
      openPicker: 'Таңдағышты ашу',
      hours: 'Сағат',
      minutes: 'Минут',
      presets: {
        today: 'Бүгін',
        tomorrow: 'Ертең',
        endOfWeek: 'Апта соңы',
        inAWeek: 'Бір аптадан кейін',
        endOfMonth: 'Ай соңы'
      }
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
      noMatch: 'Сәйкестіктер табылмады',
      trigger: 'Нұсқаларды көрсету'
    },
    inputNumber: {
      decrement: 'Кеміту',
      increment: 'Арттыру',
      roledescription: 'сандық өріс'
    },
    listbox: {
      noData: 'Деректер жоқ',
      noMatch: 'Сәйкес деректер жоқ',
      search: 'Іздеу…'
    },
    modal: {
      close: 'Жабу'
    },
    drawer: {
      close: 'Жабу'
    },
    pagination: {
      first: 'Бірінші бет',
      last: 'Соңғы бет',
      next: 'Келесі бет',
      page: '{page}-бет',
      prev: 'Алдыңғы бет'
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
    },
    breadcrumb: {
      label: 'навигациялық жол'
    },
    inputDate: {
      day: 'күн',
      dayPeriod: 'AM/PM',
      era: 'дәуір',
      hour: 'сағат',
      minute: 'минут',
      month: 'ай',
      second: 'секунд',
      timeZoneName: 'уақыт белдеуі',
      year: 'жыл'
    },
    inputRating: {
      rate: '{length} ішінен {value} деп бағалау'
    },
    inputTime: {
      dayPeriod: 'AM/PM',
      hour: 'сағат',
      minute: 'минут',
      second: 'секунд',
      timeZoneName: 'уақыт белдеуі'
    },
    pinInput: {
      input: 'PIN код, {length} ішінен {index}-таңба'
    },
    skeleton: {
      label: 'жүктелуде'
    },
    range: {
      max: 'Максимум',
      min: 'Минимум',
      thumb: 'Жүгірткі',
      value: '{total} ішінен {index}-мән'
    },
    stepper: {
      label: 'прогресс'
    },
    toaster: {
      label: 'Хабарландыру',
      viewport: 'Хабарландырулар ({hotkey})'
    }
  }
})
