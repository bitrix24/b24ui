export type Messages = {
  alert: {
    close: string
  }
  authForm: {
    hidePassword: string
    showPassword: string
    submit: string
  }
  banner: {
    close: string
  }
  calendar: {
    label: string
    monthPicker: string
    nextMonth: string
    nextYear: string
    prevMonth: string
    prevYear: string
    yearPicker: string
  }
  carousel: {
    dots: string
    goto: string
    next: string
    prev: string
  }
  chatMessages: {
    autoScroll: string
  }
  chatPrompt: {
    placeholder: string
  }
  chatPromptSubmit: {
    label: string
    reload: string
    stop: string
  }
  colorMode: {
    dark: string
    light: string
    switchToDark: string
    switchToLight: string
    system: string
  }
  commandPalette: {
    back: string
    close: string
    noData: string
    noMatch: string
    placeholder: string
    results: string
  }
  contentSearch: {
    description?: string
    links: string
    search: string
    theme: string
    title?: string
  }
  contentSearchButton: {
    label: string
  }
  contentToc: {
    title: string
  }
  dateTimePicker: {
    backToDate: string
    openPicker: string
    hours: string
    minutes: string
    presets: {
      today: string
      tomorrow: string
      endOfWeek: string
      inAWeek: string
      endOfMonth: string
    }
  }
  dropdownMenu: {
    noMatch: string
    search: string
  }
  dashboardSearch: {
    description?: string
    theme: string
    title?: string
  }
  dashboardSearchButton: {
    label: string
  }
  dashboardSidebar?: {
    description?: string
    title?: string
  }
  dashboardSidebarCollapse: {
    collapse: string
    expand: string
  }
  dashboardSidebarToggle: {
    close: string
    open: string
  }
  error: {
    clear: string
  }
  fileUpload: {
    removeFile: string
  }
  header: {
    close: string
    description?: string
    open: string
    title?: string
  }
  inputMenu: {
    create: string
    noData: string
    noMatch: string
    trigger: string
  }
  inputNumber: {
    decrement: string
    increment: string
    roledescription: string
  }
  listbox: {
    noData: string
    noMatch: string
    search: string
  }
  modal: {
    close: string
  }
  drawer: {
    close: string
  }
  pagination: {
    first: string
    last: string
    next: string
    page: string
    prev: string
  }
  pricingTable: {
    caption: string
  }
  prose: {
    codeCollapse: {
      closeText: string
      name: string
      openText: string
    }
    collapsible: {
      closeText: string
      name: string
      openText: string
    }
    pre: {
      copy: string
    }
    prompt: {
      copy: string
      openIn: string
    }
  }
  chatReasoning: {
    thinking: string
    thought: string
    thoughtFor: string
  }
  sidebar: {
    close: string
    toggle: string
  }
  selectMenu: {
    create: string
    noData: string
    noMatch: string
    search: string
  }
  slideover: {
    close: string
  }
  table: {
    noData: string
  }
  toast: {
    close: string
  }
  sidebarLayout: {
    open: string
    close: string
    slideoverTitle: string
    slideoverDescription: string
  }
  breadcrumb: {
    label: string
  }
  inputDate: {
    day: string
    dayPeriod: string
    era: string
    hour: string
    minute: string
    month: string
    second: string
    timeZoneName: string
    year: string
  }
  inputRating: {
    rate: string
  }
  inputTime: {
    dayPeriod: string
    hour: string
    minute: string
    second: string
    timeZoneName: string
  }
  pinInput: {
    input: string
  }
  skeleton: {
    label: string
  }
  range: {
    max: string
    min: string
    thumb: string
    value: string
  }
  stepper: {
    label: string
  }
  toaster: {
    label: string
    viewport: string
  }
}

export type Direction = 'ltr' | 'rtl'

export type Locale<M> = {
  name: string
  code: string
  locale: string
  dir: Direction
  messages: M
}
