import type { Messages } from '../types/locale'
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
      label: 'Fecha del evento',
      monthPicker: 'Selector de mes',
      nextMonth: 'Mes siguiente',
      nextYear: 'Año siguiente',
      prevMonth: 'Mes anterior',
      prevYear: 'Año anterior',
      yearPicker: 'Selector de año'
    },
    carousel: {
      dots: 'Seleccionar diapositiva para mostrar',
      goto: 'Ir a {slide}',
      next: 'Siguiente',
      prev: 'Anterior'
    },
    chatMessages: {
      autoScroll: 'Desplazarse hacia abajo'
    },
    chatPrompt: {
      placeholder: 'Escribe tu mensaje aquí…'
    },
    chatPromptSubmit: {
      label: 'Enviar',
      reload: 'Reintentar',
      stop: 'Detener generación'
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
      placeholder: 'Ingresa un comando o busca…',
      results: 'Resultados'
    },
    contentSearch: {
      links: 'Resultados',
      search: 'Resultados',
      theme: 'Tema'
    },
    contentSearchButton: {
      label: 'Buscar…'
    },
    contentToc: {
      title: 'En esta página'
    },
    dateTimePicker: {
      backToDate: 'Volver a la fecha',
      openPicker: 'Abrir selector',
      hours: 'Horas',
      minutes: 'Minutos',
      presets: {
        today: 'Hoy',
        tomorrow: 'Mañana',
        endOfWeek: 'Final de la semana',
        inAWeek: 'En una semana',
        endOfMonth: 'Fin de mes'
      }
    },
    dropdownMenu: {
      noMatch: 'Sin datos coincidentes',
      search: 'Buscar…'
    },
    dashboardSearch: {
      theme: 'Tema'
    },
    dashboardSearchButton: {
      label: 'Buscar…'
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
      noMatch: 'No se encontraron coincidencias',
      trigger: 'Mostrar opciones'
    },
    inputNumber: {
      decrement: 'Disminuir',
      increment: 'Aumentar',
      roledescription: 'campo numérico'
    },
    listbox: {
      noData: 'Sin datos',
      noMatch: 'No hay datos coincidentes',
      search: 'Buscar…'
    },
    modal: {
      close: 'Cerrar'
    },
    drawer: {
      close: 'Cerrar'
    },
    pagination: {
      first: 'Primera página',
      last: 'Última página',
      next: 'Página siguiente',
      page: 'Página {page}',
      prev: 'Página anterior'
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
        copy: 'Copiar código al portapapeles'
      },
      prompt: {
        copy: 'Copiar prompt',
        openIn: 'Abrir en {name}'
      }
    },
    chatReasoning: {
      thinking: 'Pensando…',
      thought: 'Razonamiento completado',
      thoughtFor: 'Razonamiento tardó {duration}'
    },
    sidebar: {
      close: 'Cerrar',
      toggle: 'Alternar'
    },
    selectMenu: {
      create: 'Crear "{label}"',
      noData: 'Sin datos',
      noMatch: 'No se encontraron coincidencias',
      search: 'Buscar…'
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
    breadcrumb: {
      label: 'ruta de navegación'
    },
    inputDate: {
      day: 'día',
      dayPeriod: 'AM/PM',
      era: 'era',
      hour: 'hora',
      minute: 'minuto',
      month: 'mes',
      second: 'segundo',
      timeZoneName: 'zona horaria',
      year: 'año'
    },
    inputRating: {
      rate: 'Valorar {value} de {length}'
    },
    inputTime: {
      dayPeriod: 'AM/PM',
      hour: 'hora',
      minute: 'minuto',
      second: 'segundo',
      timeZoneName: 'zona horaria'
    },
    pinInput: {
      input: 'código PIN, carácter {index} de {length}'
    },
    skeleton: {
      label: 'cargando'
    },
    range: {
      max: 'Máximo',
      min: 'Mínimo',
      thumb: 'Control deslizante',
      value: 'Valor {index} de {total}'
    },
    stepper: {
      label: 'progreso'
    },
    toaster: {
      label: 'Notificación',
      viewport: 'Notificaciones ({hotkey})'
    }
  }
})
