import type { Messages } from '../types'
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
      nextMonth: 'Mois suivant',
      nextYear: 'Année suivante',
      prevMonth: 'Mois précédent',
      prevYear: 'Année précédente'
    },
    carousel: {
      dots: 'Sélectionner la diapositive à afficher',
      goto: 'Aller à {slide}',
      next: 'Suivant',
      prev: 'Précédent'
    },
    chatPrompt: {
      placeholder: 'Saisissez votre message ici...'
    },
    chatPromptSubmit: {
      label: 'Envoyer'
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
      placeholder: 'Saisir une commande ou rechercher...'
    },
    contentSearch: {
      links: 'Résultats',
      theme: 'Thème'
    },
    contentSearchButton: {
      label: 'Rechercher...'
    },
    contentToc: {
      title: 'Sur cette page'
    },
    dropdownMenu: {
      noMatch: 'Aucune donnée correspondante',
      search: 'Rechercher…'
    },
    dashboardSearch: {
      theme: 'Thème'
    },
    dashboardSearchButton: {
      label: 'Rechercher...'
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
      noMatch: 'Aucun résultat trouvé'
    },
    inputNumber: {
      decrement: 'Décrémenter',
      increment: 'Incrémenter'
    },
    modal: {
      close: 'Fermer'
    },
    pricingTable: {
      caption: 'Comparaison des offres tarifaires'
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
        copy: 'Copier'
      }
    },
    selectMenu: {
      create: 'Créer "{label}"',
      noData: 'Aucune donnée',
      noMatch: 'Aucun résultat trouvé',
      search: 'Rechercher...'
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
    }
  }
})
