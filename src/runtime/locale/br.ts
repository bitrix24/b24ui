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
      dots: 'Selecionar slide para exibir',
      goto: 'Ir para {slide}',
      next: 'Próximo',
      prev: 'Anterior'
    },
    chatPrompt: {
      placeholder: 'Digite sua mensagem aqui…'
    },
    chatPromptSubmit: {
      label: 'Enviar'
    },
    colorMode: {
      dark: 'Escuro',
      light: 'Claro',
      switchToDark: 'Alternar para o modo escuro',
      switchToLight: 'Alternar para o modo claro',
      system: 'Sistema'
    },
    commandPalette: {
      back: 'Voltar',
      close: 'Fechar',
      noData: 'Sem dados',
      noMatch: 'Nenhum resultado encontrado',
      placeholder: 'Digite um comando ou pesquise…'
    },
    dateTimePicker: {
      backToDate: 'Voltar à data',
      hours: 'Horas',
      minutes: 'Minutos',
      presets: {
        today: 'Hoje',
        tomorrow: 'Amanhã',
        endOfWeek: 'Fim da semana',
        inAWeek: 'Em uma semana',
        endOfMonth: 'Fim do mês'
      }
    },
    contentSearch: {
      links: 'Resultados',
      theme: 'Tema'
    },
    contentSearchButton: {
      label: 'Pesquisar…'
    },
    contentToc: {
      title: 'Nesta página'
    },
    dropdownMenu: {
      noMatch: 'Nenhum dado correspondente',
      search: 'Pesquisar…'
    },
    dashboardSearch: {
      theme: 'Tema'
    },
    dashboardSearchButton: {
      label: 'Pesquisar…'
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
      noData: 'Sem dados',
      noMatch: 'Nenhum resultado encontrado'
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
        copy: 'Copiar código para a área de transferência'
      },
      prompt: {
        copy: 'Copiar prompt',
        openIn: 'Abrir em {name}'
      }
    },
    chatReasoning: {
      thinking: 'Pensando…',
      thought: 'Raciocínio concluído',
      thoughtFor: 'Raciocínio concluído em {duration}'
    },
    sidebar: {
      close: 'Fechar',
      toggle: 'Alternar'
    },
    selectMenu: {
      create: 'Criar "{label}"',
      noData: 'Sem dados',
      noMatch: 'Nenhum resultado encontrado',
      search: 'Pesquisar…'
    },
    slideover: {
      close: 'Fechar'
    },
    table: {
      noData: 'Sem dados'
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
