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
      next: 'Dalej',
      prev: 'Wstecz'
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
      system: 'Systemowy'
    },
    commandPalette: {
      back: 'Wstecz',
      close: 'Zamknij',
      noData: 'Brak danych',
      noMatch: 'Nie znaleziono dopasowań',
      placeholder: 'Wpisz komendę lub wyszukaj...'
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
    dashboardSearch: {
      theme: 'Motyw'
    },
    dashboardSearchButton: {
      label: 'Szukaj...'
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
      noMatch: 'Nie znaleziono dopasowań'
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
    selectMenu: {
      create: 'Utwórz "{label}"',
      noData: 'Brak danych',
      noMatch: 'Nie znaleziono dopasowań',
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
