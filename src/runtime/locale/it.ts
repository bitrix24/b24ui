import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Italiano',
  code: 'it',
  locale: 'it',
  messages: {
    alert: {
      close: 'Chiudi'
    },
    authForm: {
      hidePassword: 'Nascondi password',
      showPassword: 'Mostra password',
      submit: 'Continua'
    },
    banner: {
      close: 'Chiudi'
    },
    calendar: {
      nextMonth: 'Mese successivo',
      nextYear: 'Anno successivo',
      prevMonth: 'Mese precedente',
      prevYear: 'Anno precedente'
    },
    carousel: {
      dots: 'Seleziona slide da visualizzare',
      goto: 'Vai a {slide}',
      next: 'Avanti',
      prev: 'Indietro'
    },
    chatPrompt: {
      placeholder: 'Inserisci il tuo messaggio qui...'
    },
    chatPromptSubmit: {
      label: 'Invia'
    },
    colorMode: {
      dark: 'Scuro',
      light: 'Chiaro',
      switchToDark: 'Passa alla modalità scura',
      switchToLight: 'Passa alla modalità chiara',
      system: 'Sistema'
    },
    commandPalette: {
      back: 'Indietro',
      close: 'Chiudi',
      noData: 'Nessun dato',
      noMatch: 'Nessuna corrispondenza trovata',
      placeholder: 'Inserisci comando o effettua una ricerca...'
    },
    contentSearch: {
      links: 'Risultati',
      theme: 'Tema'
    },
    contentSearchButton: {
      label: 'Cerca...'
    },
    contentToc: {
      title: 'In questa pagina'
    },
    dashboardSearch: {
      theme: 'Tema'
    },
    dashboardSearchButton: {
      label: 'Cerca...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Comprimi barra laterale',
      expand: 'Espandi barra laterale'
    },
    dashboardSidebarToggle: {
      close: 'Chiudi barra laterale',
      open: 'Apri barra laterale'
    },
    error: {
      clear: 'Riprova'
    },
    fileUpload: {
      removeFile: 'Rimuovi {filename}'
    },
    header: {
      close: 'Chiudi menu',
      open: 'Apri menu'
    },
    inputMenu: {
      create: 'Crea "{label}"',
      noData: 'Nessun dato',
      noMatch: 'Nessuna corrispondenza trovata'
    },
    inputNumber: {
      decrement: 'Decrementa',
      increment: 'Incrementa'
    },
    modal: {
      close: 'Chiudi'
    },
    pricingTable: {
      caption: 'Confronto piani tariffari'
    },
    prose: {
      codeCollapse: {
        closeText: 'Nascondi',
        name: 'codice',
        openText: 'Mostra'
      },
      collapsible: {
        closeText: 'Nascondi',
        name: 'proprietà',
        openText: 'Mostra'
      },
      pre: {
        copy: 'Copia'
      }
    },
    selectMenu: {
      create: 'Crea "{label}"',
      noData: 'Nessun dato',
      noMatch: 'Nessuna corrispondenza trovata',
      search: 'Cerca...'
    },
    slideover: {
      close: 'Chiudi'
    },
    table: {
      noData: 'Nessun dato'
    },
    toast: {
      close: 'Chiudi'
    },
    sidebarLayout: {
      open: 'Apri navigazione',
      close: 'Chiudi navigazione',
      slideoverTitle: 'Navigazione',
      slideoverDescription: 'Navigazione contenuti'
    }
  }
})
