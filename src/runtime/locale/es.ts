import { defineLocale } from '../composables/defineLocale'

export default defineLocale({
  name: 'Español',
  code: 'es',
  messages: {
    inputMenu: {
      noMatch: 'No hay datos coincidentes',
      noData: 'Sin datos',
      create: 'Crear "{label}"'
    },
    inputNumber: {
      increment: 'Incremento',
      decrement: 'Decremento'
    },
    commandPalette: {
      placeholder: 'Escribe un comando o busca...',
      noMatch: 'No hay datos coincidentes',
      noData: 'Sin datos',
      close: 'Cerrar'
    },
    selectMenu: {
      noMatch: 'No hay datos coincidentes',
      noData: 'Sin datos',
      create: 'Crear "{label}"',
      search: 'Buscar...'
    },
    toast: {
      close: 'Cerrar'
    },
    carousel: {
      prev: 'Anterior',
      next: 'Siguiente',
      goto: 'Ir a la diapositiva {slide}'
    },
    modal: {
      close: 'Cerrar'
    },
    slideover: {
      close: 'Cerrar'
    },
    alert: {
      close: 'Cerrar'
    },
    table: {
      noData: 'Sin datos'
    }
  }
})
