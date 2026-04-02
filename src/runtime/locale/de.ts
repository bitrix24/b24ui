import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Deutsch',
  code: 'de',
  locale: 'de',
  messages: {
    alert: {
      close: 'Schließen'
    },
    authForm: {
      hidePassword: 'Passwort ausblenden',
      showPassword: 'Passwort anzeigen',
      submit: 'Weiter'
    },
    banner: {
      close: 'Schließen'
    },
    calendar: {
      nextMonth: 'Nächster Monat',
      nextYear: 'Nächstes Jahr',
      prevMonth: 'Vorheriger Monat',
      prevYear: 'Vorheriges Jahr'
    },
    carousel: {
      dots: 'Folie zum Anzeigen auswählen',
      goto: 'Gehe zu {slide}',
      next: 'Weiter',
      prev: 'Zurück'
    },
    chatPrompt: {
      placeholder: 'Geben Sie hier Ihre Nachricht ein...'
    },
    chatPromptSubmit: {
      label: 'Senden'
    },
    colorMode: {
      dark: 'Dunkel',
      light: 'Hell',
      switchToDark: 'Zu dunklem Modus wechseln',
      switchToLight: 'Zu hellem Modus wechseln',
      system: 'System'
    },
    commandPalette: {
      back: 'Zurück',
      close: 'Schließen',
      noData: 'Keine Daten',
      noMatch: 'Keine Übereinstimmungen gefunden',
      placeholder: 'Befehl eingeben oder suchen...'
    },
    contentSearch: {
      links: 'Ergebnisse',
      theme: 'Thema'
    },
    contentSearchButton: {
      label: 'Suchen...'
    },
    contentToc: {
      title: 'Auf dieser Seite'
    },
    dropdownMenu: {
      noMatch: 'Keine passenden Daten',
      search: 'Suchen…'
    },
    dashboardSearch: {
      theme: 'Thema'
    },
    dashboardSearchButton: {
      label: 'Suchen...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Seitenleiste einklappen',
      expand: 'Seitenleiste ausklappen'
    },
    dashboardSidebarToggle: {
      close: 'Seitenleiste schließen',
      open: 'Seitenleiste öffnen'
    },
    error: {
      clear: 'Erneut versuchen'
    },
    fileUpload: {
      removeFile: '{filename} entfernen'
    },
    header: {
      close: 'Menü schließen',
      open: 'Menü öffnen'
    },
    inputMenu: {
      create: '"{label}" erstellen',
      noData: 'Keine Daten',
      noMatch: 'Keine Übereinstimmungen gefunden'
    },
    inputNumber: {
      decrement: 'Verringern',
      increment: 'Erhöhen'
    },
    modal: {
      close: 'Schließen'
    },
    pricingTable: {
      caption: 'Preispläne im Vergleich'
    },
    prose: {
      codeCollapse: {
        closeText: 'Ausblenden',
        name: 'code',
        openText: 'Anzeigen'
      },
      collapsible: {
        closeText: 'Ausblenden',
        name: 'Eigenschaften',
        openText: 'Anzeigen'
      },
      pre: {
        copy: 'Kopieren'
      }
    },
    selectMenu: {
      create: '"{label}" erstellen',
      noData: 'Keine Daten',
      noMatch: 'Keine Übereinstimmungen gefunden',
      search: 'Suchen...'
    },
    slideover: {
      close: 'Schließen'
    },
    table: {
      noData: 'Keine Daten'
    },
    toast: {
      close: 'Schließen'
    },
    sidebarLayout: {
      open: 'Navigation öffnen',
      close: 'Navigation schließen',
      slideoverTitle: 'Navigation',
      slideoverDescription: 'Inhaltsnavigation'
    }
  }
})
