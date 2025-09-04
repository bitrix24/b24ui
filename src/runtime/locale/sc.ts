import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: '中文（简体）',
  code: 'sc',
  locale: 'zh-CN',
  messages: {
    alert: {
      close: '关闭'
    },
    authForm: {
      hidePassword: '隐藏密码',
      showPassword: '显示密码',
      submit: '继续'
    },
    banner: {
      close: '关闭'
    },
    calendar: {
      nextMonth: '下个月',
      nextYear: '下一年',
      prevMonth: '上个月',
      prevYear: '上一年'
    },
    carousel: {
      dots: '选择要显示的幻灯片',
      goto: '转到 {slide}',
      next: '下一步',
      prev: '上一步'
    },
    chatPrompt: {
      placeholder: '在此输入您的消息...'
    },
    chatPromptSubmit: {
      label: '发送'
    },
    colorMode: {
      dark: '深色',
      light: '浅色',
      switchToDark: '切换到深色模式',
      switchToLight: '切换到浅色模式',
      system: '系统'
    },
    commandPalette: {
      back: '返回',
      close: '关闭',
      noData: '无数据',
      noMatch: '未找到匹配项',
      placeholder: '输入命令或搜索...'
    },
    contentSearch: {
      links: '结果',
      theme: '主题'
    },
    contentSearchButton: {
      label: '搜索...'
    },
    contentToc: {
      title: '本页内容'
    },
    dashboardSearch: {
      theme: '主题'
    },
    dashboardSearchButton: {
      label: '搜索...'
    },
    dashboardSidebarCollapse: {
      collapse: '折叠侧边栏',
      expand: '展开侧边栏'
    },
    dashboardSidebarToggle: {
      close: '关闭侧边栏',
      open: '打开侧边栏'
    },
    error: {
      clear: '重试'
    },
    fileUpload: {
      removeFile: '删除 {filename}'
    },
    header: {
      close: '关闭菜单',
      open: '打开菜单'
    },
    inputMenu: {
      create: '创建 "{label}"',
      noData: '无数据',
      noMatch: '未找到匹配项'
    },
    inputNumber: {
      decrement: '减少',
      increment: '增加'
    },
    modal: {
      close: '关闭'
    },
    pricingTable: {
      caption: '价格计划比较'
    },
    prose: {
      codeCollapse: {
        closeText: '隐藏',
        name: '代码',
        openText: '显示'
      },
      collapsible: {
        closeText: '隐藏',
        name: '属性',
        openText: '显示'
      },
      pre: {
        copy: '复制'
      }
    },
    selectMenu: {
      create: '创建 "{label}"',
      noData: '无数据',
      noMatch: '未找到匹配项',
      search: '搜索...'
    },
    slideover: {
      close: '关闭'
    },
    table: {
      noData: '无数据'
    },
    toast: {
      close: '关闭'
    },
    sidebarLayout: {
      open: '打开导航',
      close: '关闭导航',
      slideoverTitle: '导航',
      slideoverDescription: '内容导航'
    }
  }
})
