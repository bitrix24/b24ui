import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'Português (Brasil)',
  code: 'br',
  locale: 'pt-BR',
  messages: {
    alert: {
      close: 'Fechar'
    },
    authForm: {
      hidePassword: 'Ocultar senha',
      showPassword: 'Mostrar senha',
      submit: 'Continuar'
    },
    banner: {
      close: 'Fechar'
    },
    calendar: {
      nextMonth: 'Próximo mês',
      nextYear: 'Próximo ano',
      prevMonth: 'Mês anterior',
      prevYear: 'Ano anterior'
    },
    carousel: {
      dots: 'Selecione um slide para exibir',
      goto: 'Ir para {slide}',
      next: 'Próximo',
      prev: 'Anterior'
    },
    chatPrompt: {
      placeholder: 'Digite sua mensagem aqui...'
    },
    chatPromptSubmit: {
      label: 'Enviar'
    },
    colorMode: {
      dark: 'Escuro',
      light: 'Claro',
      switchToDark: 'Mudar para modo escuro',
      switchToLight: 'Mudar para modo claro',
      system: 'Sistema'
    },
    commandPalette: {
      back: 'Voltar',
      close: 'Fechar',
      noData: 'Nenhum dado encontrado',
      noMatch: 'Nenhuma correspondência encontrada',
      placeholder: 'Digite um comando ou pesquise...'
    },
    contentSearch: {
      links: 'Resultados',
      theme: 'Tema'
    },
    contentSearchButton: {
      label: 'Pesquisar...'
    },
    contentToc: {
      title: 'Nesta página'
    },
    dashboardSearch: {
      theme: 'Tema'
    },
    dashboardSearchButton: {
      label: 'Pesquisar...'
    },
    dashboardSidebarCollapse: {
      collapse: 'Recolher barra lateral',
      expand: 'Expandir barra lateral'
    },
    dashboardSidebarToggle: {
      close: 'Fechar barra lateral',
      open: 'Abrir barra lateral'
    },
    error: {
      clear: 'Tentar novamente'
    },
    fileUpload: {
      removeFile: 'Remover {filename}'
    },
    header: {
      close: 'Fechar menu',
      open: 'Abrir menu'
    },
    inputMenu: {
      create: 'Criar "{label}"',
      noData: 'Nenhum dado encontrado',
      noMatch: 'Nenhuma correspondência encontrada'
    },
    inputNumber: {
      decrement: 'Diminuir',
      increment: 'Aumentar'
    },
    modal: {
      close: 'Fechar'
    },
    pricingTable: {
      caption: 'Comparação de planos de preços'
    },
    prose: {
      codeCollapse: {
        closeText: 'Ocultar',
        name: 'código',
        openText: 'Mostrar'
      },
      collapsible: {
        closeText: 'Ocultar',
        name: 'propriedades',
        openText: 'Mostrar'
      },
      pre: {
        copy: 'Copiar'
      }
    },
    selectMenu: {
      create: 'Criar "{label}"',
      noData: 'Nenhum dado encontrado',
      noMatch: 'Nenhuma correspondência encontrada',
      search: 'Pesquisar...'
    },
    slideover: {
      close: 'Fechar'
    },
    table: {
      noData: 'Nenhum dado encontrado'
    },
    toast: {
      close: 'Fechar'
    },
    sidebarLayout: {
      open: 'Abrir navegação',
      close: 'Fechar navegação',
      slideoverTitle: 'Navegação',
      slideoverDescription: 'Navegação de conteúdo'
    }
  }
})
