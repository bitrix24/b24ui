import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'English',
  code: 'en',
  locale: 'en',
  messages: {
    alert: {
      close: 'Close'
    },
    authForm: {
      hidePassword: 'Hide password',
      showPassword: 'Show password',
      submit: 'Continue'
    },
    banner: {
      close: 'Close'
    },
    calendar: {
      nextMonth: 'Next month',
      nextYear: 'Next year',
      prevMonth: 'Previous month',
      prevYear: 'Previous year'
    },
    carousel: {
      dots: 'Select slide to display',
      goto: 'Go to {slide}',
      next: 'Next',
      prev: 'Previous'
    },
    chatPrompt: {
      placeholder: 'Enter your message here...'
    },
    chatPromptSubmit: {
      label: 'Send'
    },
    colorMode: {
      dark: 'Dark',
      light: 'Light',
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode',
      system: 'System'
    },
    commandPalette: {
      back: 'Back',
      close: 'Close',
      noData: 'No data',
      noMatch: 'No matches found',
      placeholder: 'Enter command or search...'
    },
    contentSearch: {
      links: 'Results',
      theme: 'Theme'
    },
    contentSearchButton: {
      label: 'Search...'
    },
    contentToc: {
      title: 'On this page'
    },
    dashboardSearch: {
      theme: 'Theme'
    },
    dashboardSearchButton: {
      label: 'Search...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Collapse sidebar',
      expand: 'Expand sidebar'
    },
    dashboardSidebarToggle: {
      close: 'Close sidebar',
      open: 'Open sidebar'
    },
    error: {
      clear: 'Try again'
    },
    fileUpload: {
      removeFile: 'Remove {filename}'
    },
    header: {
      close: 'Close menu',
      open: 'Open menu'
    },
    inputMenu: {
      create: 'Create "{label}"',
      noData: 'No data',
      noMatch: 'No matches found'
    },
    inputNumber: {
      decrement: 'Decrement',
      increment: 'Increment'
    },
    modal: {
      close: 'Close'
    },
    pricingTable: {
      caption: 'Pricing plans comparison'
    },
    prose: {
      codeCollapse: {
        closeText: 'Hide',
        name: 'code',
        openText: 'Show'
      },
      collapsible: {
        closeText: 'Hide',
        name: 'properties',
        openText: 'Show'
      },
      pre: {
        copy: 'Copy'
      }
    },
    selectMenu: {
      create: 'Create "{label}"',
      noData: 'No data',
      noMatch: 'No matches found',
      search: 'Search...'
    },
    slideover: {
      close: 'Close'
    },
    table: {
      noData: 'No data'
    },
    toast: {
      close: 'Close'
    },
    sidebarLayout: {
      open: 'Open navigation',
      close: 'Close navigation',
      slideoverTitle: 'Navigation',
      slideoverDescription: 'Content navigation'
    }
  }
})
