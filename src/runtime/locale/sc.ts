import type { Messages } from '../types/locale'
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
      label: '事件日期',
      monthPicker: '月份选择器',
      nextMonth: '下个月',
      nextYear: '明年',
      prevMonth: '上个月',
      prevYear: '去年',
      yearPicker: '年份选择器'
    },
    carousel: {
      dots: '选择要显示的幻灯片',
      goto: '转到第 {slide} 张',
      next: '下一步',
      prev: '上一步'
    },
    chatMessages: {
      autoScroll: '滚动到底部'
    },
    chatPrompt: {
      placeholder: '在此输入消息…'
    },
    chatPromptSubmit: {
      label: '发送',
      reload: '重试',
      stop: '停止生成'
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
      noData: '暂无数据',
      noMatch: '未找到匹配项',
      placeholder: '输入命令或搜索…',
      results: '搜索结果'
    },
    contentSearch: {
      links: '结果',
      search: '搜索结果',
      theme: '主题'
    },
    contentSearchButton: {
      label: '搜索…'
    },
    contentToc: {
      title: '本页内容'
    },
    dateTimePicker: {
      backToDate: '返回日期',
      openPicker: '打开选择器',
      hours: '小时',
      minutes: '分钟',
      presets: {
        today: '今天',
        tomorrow: '明天',
        endOfWeek: '本周结束',
        inAWeek: '一周后',
        endOfMonth: '月末'
      }
    },
    dropdownMenu: {
      noMatch: '无匹配数据',
      search: '搜索…'
    },
    dashboardSearch: {
      theme: '主题'
    },
    dashboardSearchButton: {
      label: '搜索…'
    },
    dashboardSidebarCollapse: {
      collapse: '收起侧边栏',
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
      create: '创建"{label}"',
      noData: '暂无数据',
      noMatch: '未找到匹配项',
      trigger: '显示选项'
    },
    inputNumber: {
      decrement: '减少',
      increment: '增加',
      roledescription: '数字输入框'
    },
    listbox: {
      noData: '无数据',
      noMatch: '无匹配数据',
      search: '搜索…'
    },
    modal: {
      close: '关闭'
    },
    drawer: {
      close: '关闭'
    },
    pagination: {
      first: '第一页',
      last: '最后一页',
      next: '下一页',
      page: '第 {page} 页',
      prev: '上一页'
    },
    pricingTable: {
      caption: '价格方案对比'
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
        copy: '复制代码到剪贴板'
      },
      prompt: {
        copy: '复制提示词',
        openIn: '在 {name} 中打开'
      }
    },
    chatReasoning: {
      thinking: '思考中…',
      thought: '思考完成',
      thoughtFor: '思考用时 {duration}'
    },
    sidebar: {
      close: '关闭',
      toggle: '切换'
    },
    selectMenu: {
      create: '创建"{label}"',
      noData: '暂无数据',
      noMatch: '未找到匹配项',
      search: '搜索…'
    },
    slideover: {
      close: '关闭'
    },
    table: {
      noData: '暂无数据'
    },
    toast: {
      close: '关闭'
    },
    sidebarLayout: {
      open: '打开导航',
      close: '关闭导航',
      slideoverTitle: '导航',
      slideoverDescription: '内容导航'
    },
    breadcrumb: {
      label: '面包屑导航'
    },
    inputDate: {
      day: '日',
      dayPeriod: '上午/下午',
      era: '纪元',
      hour: '小时',
      minute: '分钟',
      month: '月',
      second: '秒',
      timeZoneName: '时区',
      year: '年'
    },
    inputRating: {
      rate: '评分 {value} 分，满分 {length} 分'
    },
    inputTime: {
      dayPeriod: '上午/下午',
      hour: '小时',
      minute: '分钟',
      second: '秒',
      timeZoneName: '时区'
    },
    pinInput: {
      input: 'PIN 码，第 {index} 位，共 {length} 位'
    },
    skeleton: {
      label: '加载中'
    },
    range: {
      max: '最大值',
      min: '最小值',
      thumb: '滑块',
      value: '第 {index} 个值，共 {total} 个'
    },
    stepper: {
      label: '进度'
    },
    toaster: {
      label: '通知',
      viewport: '通知（{hotkey}）'
    }
  }
})
