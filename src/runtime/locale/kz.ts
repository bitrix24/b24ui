import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Қазақша',
  code: 'kz',
  messages: {
    inputMenu: {
      noMatch: 'Сәйкес деректер жоқ',
      noData: 'Деректер жоқ',
      create: '"{label}" жасау'
    },
    calendar: {
      prevYear: 'Алдыңғы жыл',
      nextYear: 'Келесі жыл',
      prevMonth: 'Алдыңғы ай',
      nextMonth: 'Келесі ай'
    },
    inputNumber: {
      increment: 'Өсіру',
      decrement: 'Азайту'
    },
    commandPalette: {
      placeholder: 'Пәрмен теріңіз немесе іздеңіз...',
      noMatch: 'Сәйкес деректер жоқ',
      noData: 'Деректер жоқ',
      close: 'Жабу'
    },
    selectMenu: {
      noMatch: 'Сәйкес деректер жоқ',
      noData: 'Деректер жоқ',
      create: '"{label}" жасау',
      search: 'Іздеу...'
    },
    toast: {
      close: 'Жабу'
    },
    carousel: {
      prev: 'Алдыңғы',
      next: 'Келесі',
      goto: '{slide} слайдқа өту'
    },
    modal: {
      close: 'Жабу'
    },
    slideover: {
      close: 'Жабу'
    },
    alert: {
      close: 'Жабу'
    },
    table: {
      noData: 'Деректер жоқ'
    }
  }
})
