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
      dots: 'Seleziona la diapositiva da mostrare',
      goto: 'Vai a {slide}',
      next: 'Successivo',
      prev: 'Precedente'
    },
    chatPrompt: {
      placeholder: 'Scrivi il tuo messaggio qui…'
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
      noMatch: 'Nessun risultato trovato',
      placeholder: 'Inserisci comando o cerca…'
    },
    dateTimePicker: {
      backToDate: 'Torna alla data',
      openPicker: 'Apri selettore',
      hours: 'Ore',
      minutes: 'Minuti',
      presets: {
        today: 'Oggi',
        tomorrow: 'Domani',
        endOfWeek: 'Fine della settimana',
        inAWeek: 'Tra una settimana',
        endOfMonth: 'Fine mese'
      }
    },
    contentSearch: {
      links: 'Risultati',
      search: 'Risultati',
      theme: 'Tema'
    },
    contentSearchButton: {
      label: 'Cerca…'
    },
    contentToc: {
      title: 'In questa pagina'
    },
    dropdownMenu: {
      noMatch: 'Nessun dato corrispondente',
      search: 'Cerca…'
    },
    dashboardSearch: {
      theme: 'Tema'
    },
    dashboardSearchButton: {
      label: 'Cerca…'
    },
    dashboardSidebarCollapse: {
      collapse: 'Comprimi sidebar',
      expand: 'Espandi sidebar'
    },
    dashboardSidebarToggle: {
      close: 'Chiudi sidebar',
      open: 'Apri sidebar'
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
      noMatch: 'Nessun risultato trovato'
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
        copy: 'Copia il codice negli appunti'
      },
      prompt: {
        copy: 'Copia prompt',
        openIn: 'Apri in {name}'
      }
    },
    chatReasoning: {
      thinking: 'Sta pensando…',
      thought: 'Ragionamento completato',
      thoughtFor: 'Il ragionamento ha impiegato {duration}'
    },
    sidebar: {
      close: 'Chiudi',
      toggle: 'Commuta'
    },
    selectMenu: {
      create: 'Crea "{label}"',
      noData: 'Nessun dato',
      noMatch: 'Nessun risultato trovato',
      search: 'Cerca…'
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
