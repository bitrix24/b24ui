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
      placeholder: 'Wpisz swoją wiadomość…'
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
      noMatch: 'Nie znaleziono pasujących wyników',
      placeholder: 'Wpisz polecenie lub szukaj…'
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
    }
  }
})
