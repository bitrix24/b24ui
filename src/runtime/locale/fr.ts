import type { Messages } from '../types/locale'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Français',
  code: 'fr',
  locale: 'fr',
  messages: {
    alert: {
      close: 'Fermer'
    },
    authForm: {
      hidePassword: 'Masquer le mot de passe',
      showPassword: 'Afficher le mot de passe',
      submit: 'Continuer'
    },
    banner: {
      close: 'Fermer'
    },
    calendar: {
      label: 'Date de l\'événement',
      monthPicker: 'Sélecteur de mois',
      nextMonth: 'Mois suivant',
      nextYear: 'Année suivante',
      prevMonth: 'Mois précédent',
      prevYear: 'Année précédente',
      yearPicker: 'Sélecteur d\'année'
    },
    carousel: {
      dots: 'Sélectionner la diapositive à afficher',
      goto: 'Aller à {slide}',
      next: 'Suivant',
      prev: 'Précédent'
    },
    chatMessages: {
      autoScroll: 'Défiler vers le bas'
    },
    chatPrompt: {
      placeholder: 'Saisissez votre message ici…'
    },
    chatPromptSubmit: {
      label: 'Envoyer',
      reload: 'Réessayer',
      stop: 'Arrêter la génération'
    },
    colorMode: {
      dark: 'Sombre',
      light: 'Clair',
      switchToDark: 'Passer en mode sombre',
      switchToLight: 'Passer en mode clair',
      system: 'Système'
    },
    commandPalette: {
      back: 'Retour',
      close: 'Fermer',
      noData: 'Aucune donnée',
      noMatch: 'Aucun résultat trouvé',
      placeholder: 'Entrez une commande ou recherchez…',
      results: 'Résultats'
    },
    contentSearch: {
      links: 'Résultats',
      search: 'Résultats',
      theme: 'Thème'
    },
    contentSearchButton: {
      label: 'Rechercher…'
    },
    contentToc: {
      title: 'Sur cette page'
    },
    dateTimePicker: {
      backToDate: 'Retour à la date',
      openPicker: 'Ouvrir le sélecteur',
      hours: 'Heures',
      minutes: 'Minutes',
      presets: {
        today: 'Aujourd\'hui',
        tomorrow: 'Demain',
        endOfWeek: 'Fin de la semaine',
        inAWeek: 'Dans une semaine',
        endOfMonth: 'Fin du mois'
      }
    },
    dropdownMenu: {
      noMatch: 'Aucune donnée correspondante',
      search: 'Rechercher…'
    },
    dashboardSearch: {
      theme: 'Thème'
    },
    dashboardSearchButton: {
      label: 'Rechercher…'
    },
    dashboardSidebarCollapse: {
      collapse: 'Réduire la barre latérale',
      expand: 'Développer la barre latérale'
    },
    dashboardSidebarToggle: {
      close: 'Fermer la barre latérale',
      open: 'Ouvrir la barre latérale'
    },
    error: {
      clear: 'Réessayer'
    },
    fileUpload: {
      removeFile: 'Supprimer {filename}'
    },
    header: {
      close: 'Fermer le menu',
      open: 'Ouvrir le menu'
    },
    inputMenu: {
      create: 'Créer "{label}"',
      noData: 'Aucune donnée',
      noMatch: 'Aucun résultat trouvé',
      trigger: 'Afficher les options'
    },
    inputNumber: {
      decrement: 'Décrémenter',
      increment: 'Incrémenter',
      roledescription: 'champ numérique'
    },
    listbox: {
      noData: 'Aucune donnée',
      noMatch: 'Aucune donnée correspondante',
      search: 'Rechercher…'
    },
    modal: {
      close: 'Fermer'
    },
    drawer: {
      close: 'Fermer'
    },
    pagination: {
      first: 'Première page',
      last: 'Dernière page',
      next: 'Page suivante',
      page: 'Page {page}',
      prev: 'Page précédente'
    },
    pricingTable: {
      caption: 'Comparaison des forfaits'
    },
    prose: {
      codeCollapse: {
        closeText: 'Masquer',
        name: 'code',
        openText: 'Afficher'
      },
      collapsible: {
        closeText: 'Masquer',
        name: 'propriétés',
        openText: 'Afficher'
      },
      pre: {
        copy: 'Copier le code dans le presse-papier'
      },
      prompt: {
        copy: 'Copier le prompt',
        openIn: 'Ouvrir dans {name}'
      }
    },
    chatReasoning: {
      thinking: 'Réfléchit…',
      thought: 'Réflexion terminée',
      thoughtFor: 'Réflexion a pris {duration}'
    },
    sidebar: {
      close: 'Fermer',
      toggle: 'Basculer'
    },
    selectMenu: {
      create: 'Créer "{label}"',
      noData: 'Aucune donnée',
      noMatch: 'Aucun résultat trouvé',
      search: 'Rechercher…'
    },
    slideover: {
      close: 'Fermer'
    },
    table: {
      noData: 'Aucune donnée'
    },
    toast: {
      close: 'Fermer'
    },
    sidebarLayout: {
      open: 'Ouvrir la navigation',
      close: 'Fermer la navigation',
      slideoverTitle: 'Navigation',
      slideoverDescription: 'Navigation du contenu'
    },
    breadcrumb: {
      label: 'fil d\'Ariane'
    },
    inputDate: {
      day: 'jour',
      dayPeriod: 'AM/PM',
      era: 'ère',
      hour: 'heure',
      minute: 'minute',
      month: 'mois',
      second: 'seconde',
      timeZoneName: 'fuseau horaire',
      year: 'année'
    },
    inputRating: {
      rate: 'Noter {value} sur {length}'
    },
    inputTime: {
      dayPeriod: 'AM/PM',
      hour: 'heure',
      minute: 'minute',
      second: 'seconde',
      timeZoneName: 'fuseau horaire'
    },
    pinInput: {
      input: 'code PIN, caractère {index} sur {length}'
    },
    skeleton: {
      label: 'chargement'
    },
    range: {
      max: 'Maximum',
      min: 'Minimum',
      thumb: 'Curseur',
      value: 'Valeur {index} sur {total}'
    },
    stepper: {
      label: 'progression'
    },
    toaster: {
      label: 'Notification',
      viewport: 'Notifications ({hotkey})'
    }
  }
})
