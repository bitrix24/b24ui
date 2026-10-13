import type { Messages } from '../types/locale'
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
      label: 'Event date',
      monthPicker: 'Month picker',
      nextMonth: 'Next month',
      nextYear: 'Next year',
      prevMonth: 'Previous month',
      prevYear: 'Previous year',
      yearPicker: 'Year picker'
    },
    carousel: {
      dots: 'Select slide to display',
      goto: 'Go to {slide}',
      next: 'Next',
      prev: 'Previous'
    },
    chatMessages: {
      autoScroll: 'Scroll to bottom'
    },
    chatPrompt: {
      placeholder: 'Enter your message here…'
    },
    chatPromptSubmit: {
      label: 'Send',
      reload: 'Retry',
      stop: 'Stop generating'
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
      placeholder: 'Enter command or search…',
      results: 'Results'
    },
    contentSearch: {
      links: 'Results',
      search: 'Results',
      theme: 'Theme'
    },
    contentSearchButton: {
      label: 'Search…'
    },
    contentToc: {
      title: 'On this page'
    },
    dateTimePicker: {
      backToDate: 'Back to date',
      openPicker: 'Open picker',
      hours: 'Hours',
      minutes: 'Minutes',
      presets: {
        today: 'Today',
        tomorrow: 'Tomorrow',
        endOfWeek: 'End of week',
        inAWeek: 'In a week',
        endOfMonth: 'End of month'
      }
    },
    dropdownMenu: {
      noMatch: 'No matching data',
      search: 'Search…'
    },
    dashboardSearch: {
      theme: 'Theme'
    },
    dashboardSearchButton: {
      label: 'Search…'
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
      noMatch: 'No matches found',
      trigger: 'Show options'
    },
    inputNumber: {
      decrement: 'Decrement',
      increment: 'Increment',
      roledescription: 'number field'
    },
    listbox: {
      noData: 'No data',
      noMatch: 'No matching data',
      search: 'Search…'
    },
    modal: {
      close: 'Close'
    },
    drawer: {
      close: 'Close'
    },
    pagination: {
      first: 'First page',
      last: 'Last page',
      next: 'Next page',
      page: 'Page {page}',
      prev: 'Previous page'
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
        copy: 'Copy code to clipboard'
      },
      prompt: {
        copy: 'Copy prompt',
        openIn: 'Open in {name}'
      }
    },
    chatReasoning: {
      thinking: 'Thinking…',
      thought: 'Thought',
      thoughtFor: 'Thought for {duration}'
    },
    sidebar: {
      close: 'Close',
      toggle: 'Toggle'
    },
    selectMenu: {
      create: 'Create "{label}"',
      noData: 'No data',
      noMatch: 'No matches found',
      search: 'Search…'
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
    },
    breadcrumb: {
      label: 'breadcrumb'
    },
    inputDate: {
      day: 'day',
      dayPeriod: 'AM/PM',
      era: 'era',
      hour: 'hour',
      minute: 'minute',
      month: 'month',
      second: 'second',
      timeZoneName: 'timezone',
      year: 'year'
    },
    inputRating: {
      rate: 'Rate {value} out of {length}'
    },
    inputTime: {
      dayPeriod: 'AM/PM',
      hour: 'hour',
      minute: 'minute',
      second: 'second',
      timeZoneName: 'timezone'
    },
    pinInput: {
      input: 'pin input {index} of {length}'
    },
    skeleton: {
      label: 'loading'
    },
    range: {
      max: 'Maximum',
      min: 'Minimum',
      thumb: 'Thumb',
      value: 'Value {index} of {total}'
    },
    stepper: {
      label: 'progress'
    },
    toaster: {
      label: 'Notification',
      viewport: 'Notifications ({hotkey})'
    }
  }
})
