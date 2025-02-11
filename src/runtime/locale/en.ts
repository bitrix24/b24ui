import { defineLocale } from '../composables/defineLocale'

export default defineLocale({
  name: 'English',
  code: 'en',
  messages: {
    inputMenu: {
      noMatch: 'No matching data',
      noData: 'No data',
      create: 'Create "{label}"'
    },
    inputNumber: {
      increment: 'Increment',
      decrement: 'Decrement'
    },
    commandPalette: {
      placeholder: 'Type a command or search...',
      noMatch: 'No matching data',
      noData: 'No data',
      close: 'Close'
    },
    selectMenu: {
      noMatch: 'No matching data',
      noData: 'No data',
      create: 'Create "{label}"',
      search: 'Search...'
    },
    toast: {
      close: 'Close'
    },
    carousel: {
      prev: 'Prev',
      next: 'Next',
      goto: 'Go to slide {slide}'
    },
    modal: {
      close: 'Close'
    },
    slideover: {
      close: 'Close'
    },
    alert: {
      close: 'Close'
    },
    table: {
      noData: 'No data'
    }
  }
})
