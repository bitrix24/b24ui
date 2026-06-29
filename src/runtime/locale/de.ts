import type { Messages } from '../types/locale'
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
      dots: 'Slide zum Anzeigen auswählen',
      goto: 'Zu {slide} gehen',
      next: 'Weiter',
      prev: 'Zurück'
    },
    chatPrompt: {
      placeholder: 'Geben Sie Ihre Nachricht hier ein…'
    },
    chatPromptSubmit: {
      label: 'Senden'
    },
    colorMode: {
      dark: 'Dunkel',
      light: 'Hell',
      switchToDark: 'Zu Dunkelmodus wechseln',
      switchToLight: 'Zu Hellmodus wechseln',
      system: 'System'
    },
    commandPalette: {
      back: 'Zurück',
      close: 'Schließen',
      noData: 'Keine Daten',
      noMatch: 'Keine Übereinstimmungen gefunden',
      placeholder: 'Befehl eingeben oder suchen…'
    },
    contentSearch: {
      links: 'Ergebnisse',
      search: 'Ergebnisse',
      theme: 'Thema'
    },
    contentSearchButton: {
      label: 'Suchen…'
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
      label: 'Suchen…'
    },
    dashboardSidebarCollapse: {
      collapse: 'Sidebar einklappen',
      expand: 'Sidebar ausklappen'
    },
    dashboardSidebarToggle: {
      close: 'Sidebar schließen',
      open: 'Sidebar öffnen'
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
      caption: 'Preisplan-Vergleich'
    },
    prose: {
      codeCollapse: {
        closeText: 'Ausblenden',
        name: 'Code',
        openText: 'Einblenden'
      },
      collapsible: {
        closeText: 'Ausblenden',
        name: 'Eigenschaften',
        openText: 'Einblenden'
      },
      pre: {
        copy: 'Code in die Zwischenablage kopieren'
      },
      prompt: {
        copy: 'Prompt kopieren',
        openIn: 'In {name} öffnen'
      }
    },
    chatReasoning: {
      thinking: 'Denkt…',
      thought: 'Gedankengang beendet',
      thoughtFor: 'Gedankengang dauerte {duration}'
    },
    sidebar: {
      close: 'Schließen',
      toggle: 'Umschalten'
    },
    selectMenu: {
      create: '"{label}" erstellen',
      noData: 'Keine Daten',
      noMatch: 'Keine Übereinstimmungen gefunden',
      search: 'Suchen…'
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
