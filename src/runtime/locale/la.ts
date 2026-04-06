import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Español',
  code: 'la',
  locale: 'es',
  messages: {
    alert: {
      close: 'Cerrar'
    },
    authForm: {
      hidePassword: 'Ocultar contraseña',
      showPassword: 'Mostrar contraseña',
      submit: 'Continuar'
    },
    banner: {
      close: 'Cerrar'
    },
    calendar: {
      nextMonth: 'Próximo mes',
      nextYear: 'Próximo año',
      prevMonth: 'Mes anterior',
      prevYear: 'Año anterior'
    },
    carousel: {
      dots: 'Seleccionar diapositiva para mostrar',
      goto: 'Ir a {slide}',
      next: 'Siguiente',
      prev: 'Anterior'
    },
    chatPrompt: {
      placeholder: 'Ingresa tu mensaje aquí...'
    },
    chatPromptSubmit: {
      label: 'Enviar'
    },
    colorMode: {
      dark: 'Oscuro',
      light: 'Claro',
      switchToDark: 'Cambiar a modo oscuro',
      switchToLight: 'Cambiar a modo claro',
      system: 'Sistema'
    },
    commandPalette: {
      back: 'Atrás',
      close: 'Cerrar',
      noData: 'Sin datos',
      noMatch: 'No se encontraron coincidencias',
      placeholder: 'Ingresa comando o busca...'
    },
    contentSearch: {
      links: 'Resultados',
      theme: 'Tema'
    },
    contentSearchButton: {
      label: 'Buscar...'
    },
    contentToc: {
      title: 'En esta página'
    },
    dropdownMenu: {
      noMatch: 'No hay datos coincidentes',
      search: 'Buscar…'
    },
    dashboardSearch: {
      theme: 'Tema'
    },
    dashboardSearchButton: {
      label: 'Buscar...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Contraer barra lateral',
      expand: 'Expandir barra lateral'
    },
    dashboardSidebarToggle: {
      close: 'Cerrar barra lateral',
      open: 'Abrir barra lateral'
    },
    error: {
      clear: 'Intentar de nuevo'
    },
    fileUpload: {
      removeFile: 'Eliminar {filename}'
    },
    header: {
      close: 'Cerrar menú',
      open: 'Abrir menú'
    },
    inputMenu: {
      create: 'Crear "{label}"',
      noData: 'Sin datos',
      noMatch: 'No se encontraron coincidencias'
    },
    inputNumber: {
      decrement: 'Decrementar',
      increment: 'Incrementar'
    },
    modal: {
      close: 'Cerrar'
    },
    pricingTable: {
      caption: 'Comparación de planes de precios'
    },
    prose: {
      codeCollapse: {
        closeText: 'Ocultar',
        name: 'código',
        openText: 'Mostrar'
      },
      collapsible: {
        closeText: 'Ocultar',
        name: 'propiedades',
        openText: 'Mostrar'
      },
      pre: {
        copy: 'Copiar'
      }
    },
    selectMenu: {
      create: 'Crear "{label}"',
      noData: 'Sin datos',
      noMatch: 'No se encontraron coincidencias',
      search: 'Buscar...'
    },
    slideover: {
      close: 'Cerrar'
    },
    table: {
      noData: 'Sin datos'
    },
    toast: {
      close: 'Cerrar'
    },
    sidebarLayout: {
      open: 'Abrir navegación',
      close: 'Cerrar navegación',
      slideoverTitle: 'Navegación',
      slideoverDescription: 'Navegación de contenido'
    },
    sidebar: {
      close: 'Cerrar',
      toggle: 'Alternar'
    }
  }
})
