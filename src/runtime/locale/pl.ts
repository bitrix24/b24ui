import type { Messages } from '../types'
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
      nextMonth: 'Następny miesiąc',
      nextYear: 'Następny rok',
      prevMonth: 'Poprzedni miesiąc',
      prevYear: 'Poprzedni rok'
    },
    carousel: {
      dots: 'Wybierz slajd do wyświetlenia',
      goto: 'Przejdź do {slide}',
      next: 'Następny',
      prev: 'Poprzedni'
    },
    chatPrompt: {
      placeholder: 'Wpisz swoją wiadomość tutaj...'
    },
    chatPromptSubmit: {
      label: 'Wyślij'
    },
    colorMode: {
      dark: 'Ciemny',
      light: 'Jasny',
      switchToDark: 'Przełącz na tryb ciemny',
      switchToLight: 'Przełącz na tryb jasny',
      system: 'System'
    },
    commandPalette: {
      back: 'Wstecz',
      close: 'Zamknij',
      noData: 'Brak danych',
      noMatch: 'Nie znaleziono pasujących wyników',
      placeholder: 'Wpisz polecenie lub szukaj...'
    },
    contentSearch: {
      links: 'Wyniki',
      theme: 'Motyw'
    },
    contentSearchButton: {
      label: 'Szukaj...'
    },
    contentToc: {
      title: 'Na tej stronie'
    },
    dropdownMenu: {
      noMatch: 'Brak pasujących danych',
      search: 'Szukaj…'
    },
    dashboardSearch: {
      theme: 'Motyw'
    },
    dashboardSearchButton: {
      label: 'Szukaj...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Zwiń pasek boczny',
      expand: 'Rozwiń pasek boczny'
    },
    dashboardSidebarToggle: {
      close: 'Zamknij pasek boczny',
      open: 'Otwórz pasek boczny'
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
      noMatch: 'Nie znaleziono pasujących wyników'
    },
    inputNumber: {
      decrement: 'Zmniejsz',
      increment: 'Zwiększ'
    },
    modal: {
      close: 'Zamknij'
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
        copy: 'Kopiuj'
      }
    },
    sidebar: {
      close: 'Zamknij',
      toggle: 'Przełącz'
    },
    selectMenu: {
      create: 'Utwórz "{label}"',
      noData: 'Brak danych',
      noMatch: 'Nie znaleziono pasujących wyników',
      search: 'Szukaj...'
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
      slideoverDescription: 'Nawigacja treści'
    }
  }
})
