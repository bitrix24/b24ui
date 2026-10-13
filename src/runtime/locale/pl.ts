import type { Messages } from '../types/locale'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Polski',
  code: 'pl',
  locale: 'pl',
  messages: {
    alert: {
      close: 'Zamknij'
    },
    authForm: {
      hidePassword: 'Ukryj hasło',
      showPassword: 'Pokaż hasło',
      submit: 'Kontynuuj'
    },
    banner: {
      close: 'Zamknij'
    },
    calendar: {
      label: 'Data wydarzenia',
      monthPicker: 'Wybór miesiąca',
      nextMonth: 'Następny miesiąc',
      nextYear: 'Następny rok',
      prevMonth: 'Poprzedni miesiąc',
      prevYear: 'Poprzedni rok',
      yearPicker: 'Wybór roku'
    },
    carousel: {
      dots: 'Wybierz slajd do wyświetlenia',
      goto: 'Przejdź do {slide}',
      next: 'Następny',
      prev: 'Poprzedni'
    },
    chatMessages: {
      autoScroll: 'Przewiń na dół'
    },
    chatPrompt: {
      placeholder: 'Wpisz swoją wiadomość…'
    },
    chatPromptSubmit: {
      label: 'Wyślij',
      reload: 'Spróbuj ponownie',
      stop: 'Zatrzymaj generowanie'
    },
    colorMode: {
      dark: 'Ciemny',
      light: 'Jasny',
      switchToDark: 'Przełącz na tryb ciemny',
      switchToLight: 'Przełącz na tryb jasny',
      system: 'Systemowy'
    },
    commandPalette: {
      back: 'Wstecz',
      close: 'Zamknij',
      noData: 'Brak danych',
      noMatch: 'Nie znaleziono pasujących wyników',
      placeholder: 'Wpisz polecenie lub szukaj…',
      results: 'Wyniki'
    },
    contentSearch: {
      links: 'Wyniki',
      search: 'Wyniki',
      theme: 'Motyw'
    },
    contentSearchButton: {
      label: 'Szukaj…'
    },
    contentToc: {
      title: 'Na tej stronie'
    },
    dateTimePicker: {
      backToDate: 'Wróć do daty',
      openPicker: 'Otwórz selektor',
      hours: 'Godziny',
      minutes: 'Minuty',
      presets: {
        today: 'Dzisiaj',
        tomorrow: 'Jutro',
        endOfWeek: 'Koniec tygodnia',
        inAWeek: 'Za tydzień',
        endOfMonth: 'Koniec miesiąca'
      }
    },
    dropdownMenu: {
      noMatch: 'Brak pasujących danych',
      search: 'Szukaj…'
    },
    dashboardSearch: {
      theme: 'Motyw'
    },
    dashboardSearchButton: {
      label: 'Szukaj…'
    },
    dashboardSidebarCollapse: {
      collapse: 'Zwiń panel boczny',
      expand: 'Rozwiń panel boczny'
    },
    dashboardSidebarToggle: {
      close: 'Zamknij panel boczny',
      open: 'Otwórz panel boczny'
    },
    error: {
      clear: 'Spróbuj ponownie'
    },
    fileUpload: {
      removeFile: 'Usuń {filename}'
    },
    header: {
      close: 'Zamknij menu',
      open: 'Otwórz menu'
    },
    inputMenu: {
      create: 'Utwórz "{label}"',
      noData: 'Brak danych',
      noMatch: 'Nie znaleziono pasujących wyników',
      trigger: 'Pokaż opcje'
    },
    inputNumber: {
      decrement: 'Zmniejsz',
      increment: 'Zwiększ',
      roledescription: 'pole liczbowe'
    },
    listbox: {
      noData: 'Brak danych',
      noMatch: 'Brak pasujących danych',
      search: 'Szukaj…'
    },
    modal: {
      close: 'Zamknij'
    },
    drawer: {
      close: 'Zamknij'
    },
    pagination: {
      first: 'Pierwsza strona',
      last: 'Ostatnia strona',
      next: 'Następna strona',
      page: 'Strona {page}',
      prev: 'Poprzednia strona'
    },
    pricingTable: {
      caption: 'Porównanie planów cenowych'
    },
    prose: {
      codeCollapse: {
        closeText: 'Ukryj',
        name: 'kod',
        openText: 'Pokaż'
      },
      collapsible: {
        closeText: 'Ukryj',
        name: 'właściwości',
        openText: 'Pokaż'
      },
      pre: {
        copy: 'Skopiuj kod do schowka'
      },
      prompt: {
        copy: 'Skopiuj prompt',
        openIn: 'Otwórz w {name}'
      }
    },
    chatReasoning: {
      thinking: 'Myśli…',
      thought: 'Myślenie zakończone',
      thoughtFor: 'Myślenie zajęło {duration}'
    },
    sidebar: {
      close: 'Zamknij',
      toggle: 'Przełącz'
    },
    selectMenu: {
      create: 'Utwórz "{label}"',
      noData: 'Brak danych',
      noMatch: 'Nie znaleziono pasujących wyników',
      search: 'Szukaj…'
    },
    slideover: {
      close: 'Zamknij'
    },
    table: {
      noData: 'Brak danych'
    },
    toast: {
      close: 'Zamknij'
    },
    sidebarLayout: {
      open: 'Otwórz nawigację',
      close: 'Zamknij nawigację',
      slideoverTitle: 'Nawigacja',
      slideoverDescription: 'Nawigacja po treści'
    },
    breadcrumb: {
      label: 'ścieżka nawigacji'
    },
    inputDate: {
      day: 'dzień',
      dayPeriod: 'AM/PM',
      era: 'era',
      hour: 'godzina',
      minute: 'minuta',
      month: 'miesiąc',
      second: 'sekunda',
      timeZoneName: 'strefa czasowa',
      year: 'rok'
    },
    inputRating: {
      rate: 'Oceń na {value} z {length}'
    },
    inputTime: {
      dayPeriod: 'AM/PM',
      hour: 'godzina',
      minute: 'minuta',
      second: 'sekunda',
      timeZoneName: 'strefa czasowa'
    },
    pinInput: {
      input: 'kod PIN, znak {index} z {length}'
    },
    skeleton: {
      label: 'ładowanie'
    },
    range: {
      max: 'Maksimum',
      min: 'Minimum',
      thumb: 'Suwak',
      value: 'Wartość {index} z {total}'
    },
    stepper: {
      label: 'postęp'
    },
    toaster: {
      label: 'Powiadomienie',
      viewport: 'Powiadomienia ({hotkey})'
    }
  }
})
